import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteMap, getAllMaps, reset } from "../../redux/maps/mapsSlice";
import { DeleteOutlined } from "@mui/icons-material";
import { EditOutlined } from "@mui/icons-material";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { API_BASE_URL } from "../../confing.js/baseUrl";
const TypeChecker = () => {
  const [mapId, setMapId] = useState();
	const [newStatus, setNewStatus] = useState("vipimo");
  // State for checkComment input and its visibility
  const [checkComment, setComment] = useState("");
  const [commentPopupOpen, setCommentPopupOpen] = useState(false);
  //colors themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // initiliaze useDispatch && useNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

      //  get user from session store
  const user = JSON.parse(sessionStorage.getItem("user"));

     const config = {
	    headers: {
	      Authorization: `Bearer ${user?.token}`,
	    },
	  }

  //useSelector  containe properties from authSlice
  const { maps, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.map
  );
  // filter data maps which have imetumwa status
  const filtereData = maps.filter((map) => map.status === "imetumwa");

  //useEffect to fetch all users
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // firing get all users
    dispatch(getAllMaps());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  //michoro yote ipo
  const handleUpdateStatus = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }
      const check = window.confirm('unataka kupitisha ramani ?')
      setNewStatus('vipimo')
    
      if (check) {
         const res = await axios.put(API_BASE_URL + `/api/maps/${id}`,{
        status: newStatus,
      },config);

      // Handle successful update (e.g., show a success message or update the state)
      if (res.data) {
        window.location.reload();
      }
      }
     
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error (e.g., show an error message)
    }
  };

// onclick nyingine azipo  button  enable show popup button
  const toggleCommentPopup = (id) => {
    setMapId(id)
    setCommentPopupOpen(!commentPopupOpen);
  };

// onclick submit  in popup
  const handleCommentSubmit = async () => {
    try {
      if (!checkComment) {
        toast.error("weka comment")
      }
      const res = await axios.put(API_BASE_URL + `/api/maps/${mapId}`, { checkComment },config);
      if (res.data) {
        setComment('');
        setCommentPopupOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  // michoro mingine haipo
  // const handleFailed = async (id) => {
    // 	try {
    // setNewStatus("maboresho")
    // 	const res = await axios.put(`https://backendboq.onrender.com/api/maps/${id}`, { status: newStatus });
    //   // Handle successful update (e.g., show a success message or update the state)
    // 	if (res.data) {
    // 		window.location.reload()
    // 	}
    // } catch (error) {
    //   console.error('Error:', error.message);
    //   // Handle error (e.g., show an error message)
    // }
  // };

  // handle get all maps
  const handleAllMap = (mapsData) => {
    navigate("/mymaps", { state: mapsData });
  };
  // header arrangement in data grid
  const columns = [
   	{
			field: '_id',
			headerName: 'Ramani No',
            flex: 0.5,
            textAlign:'center',
			renderCell: (params) => {
			
				return (
					<Typography component={"p"} >
						Rama1{(params.row._id).slice(-3)}
					</Typography>
				);
			}
		},

    {
      field: "startConstruction",
      headerName: "Itajengwa",
      flex: 1,
    },
    {
      field: "region",
      headerName: "mkoa",
      flex: 0.5,
    },
    {
      field: "ramani",
      headerName: "ramani",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <Box>
            {(user?.accessLevel === "admin" ||
              user?.accessLevel === "user" || user?.accessLevel === "typechecker") && (
              <Button
                onClick={() => handleAllMap(params.row)}
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginRight: "3px" }}
              >
                Ramani
              </Button>
            )}
          </Box>
        );
      },
    },
    {
      field: " hali michoro",
      headerName: "hali ya michoro",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <Box>
            <div>
              {(user?.accessLevel === "admin" ||
                user?.accessLevel === "typechecker") && (
                <>
                  {" "}
                  <Button
                    onClick={() => handleUpdateStatus(params.row._id)}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    style={{ marginRight: "3px" }}
                  >
                    zote zipo
                  </Button>
                  <Button
                    onClick={() => toggleCommentPopup(params.row._id)}
                    type="submit"
                    color="danger"
                    variant="contained"
                    style={{ marginRight: "3px", color: "#fff" }}
                  >
                    nyingine azipo
                  </Button>
                </>
              )}
            </div>
          </Box>
        );
      },
    },
  ];

  // define unique id
  const getRowId = (row) => row._id;

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box marginTop="2rem" width="90%">
        <Box marginY="1rem">
          <Typography variant="h3" textAlign="center">
            ukurasa wa kupanga ramani
          </Typography>
        </Box>
        <Box
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[400],
              color: "#333",
              borderBottom: "none",
              textTransform: "uppercase",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "none",
              display: "none",
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid rows={filtereData} columns={columns} getRowId={getRowId} />
        </Box>
        <Dialog
          open={commentPopupOpen}
					 
        >
          <DialogTitle>Add Comment</DialogTitle>
          <DialogContent>
            <TextField
              label="Comment"
              value={checkComment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCommentPopupOpen(false)}>Cancel</Button>
            <Button onClick={() => handleCommentSubmit()}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default TypeChecker;
