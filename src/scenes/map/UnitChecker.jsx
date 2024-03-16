import { useEffect, useState } from "react";
import {Box, Typography, Button, useTheme, Dialog,TextField,DialogTitle,DialogContent,DialogActions,} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  getAllMaps, reset } from "../../redux/maps/mapsSlice";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { API_BASE_URL } from "../../confing.js/baseUrl";
const UnitCheker = () => {

  const [mapId, setMapId] = useState();
  // State for unitComment input and its visibility
  const [unitComment, setComment] = useState("");
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
  const filtereData = maps.filter((map) => map.status === "vipimo");

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


  // passs unit check
  const handleMoveToBoq = async (id) => {
    try {
      window.confirm('unataka kupitisha  vipimo vya ramani?')
        const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }
		  const newStatus = 'boq';
      const res = await axios.put(API_BASE_URL + `/api/maps/${id}`, {
        status: newStatus,
      },config);

      // Handle successful update (e.g., show a success message or update the state)
      if (res.data) {
        window.location.reload();
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
      if (!unitComment) {
        toast.error("weka comment")
      }
      const res = await axios.put(API_BASE_URL + `/api/maps/${mapId}`, { unitComment },config);
      if (res.data) {
        setComment('');
        setCommentPopupOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
	// return back to be processed
  // const handleReturnBack = async (id) => {
  //   try {
  //   const newStatus= 'imetumwa';
  //     const res = await axios.put(`https://backendboq.onrender.com/api/maps/${id}`, {
  //       status: newStatus,
  //     });

  //     // Handle successful update (e.g., show a success message or update the state)
  //     if (res.data) {
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     // Handle error (e.g., show an error message)
  //   }
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
            {(user?.accessLevel === "admin"
              || user?.accessLevel === "user" || user?.accessLevel === "unitchecker") && (
              <Button
                onClick={() => handleAllMap(params.row)}
                type="submit"
                color="primary"
                variant="outlined"
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
                user?.accessLevel === "unitchecker") && (
                <>
               
                  {/* <Button
                    onClick={() => handleReturnBack(params.row._id)}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    style={{ marginRight: "3px" }}
                  >
                    anza upya
                  </Button> */}
                  <Button
                    onClick={() => handleMoveToBoq(params.row._id)}
                    type="submit"
                    color="success"
                    variant="outlined"
                    style={{ marginRight: "3px" }}
                  >
                  vipo sawa
                  </Button>
                <Button
                    onClick={() => toggleCommentPopup(params.row._id)}
                    type="submit"
                    color="danger"
                    variant="outlined"
                    style={{ marginRight: "3px", color: "red" }}
                  >
                    kuna tatizo
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

  // on loading state
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box marginTop="2rem" width="95%"  boxShadow={`0 4px 12px rgba(0,0,0,0.3)`} padding={`20px 10px`}>
        <Box
          marginY="1rem"
          padding="20px 10px"
          color="#333"
        >
          <Typography variant="h3" textAlign="center" textTransform="uppercase">
            ukurasa wa kukangua vipimo
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
              backgroundColor:`#3498db`,
              color: "#fff",
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
          {filtereData ? (
            <DataGrid
              rows={filtereData}
              columns={columns}
              getRowId={getRowId}
            />
          ) : (
            <></>
          )}
        </Box>
                <Dialog
          open={commentPopupOpen}
					 
        >
          <DialogTitle>Add Comment</DialogTitle>
          <DialogContent>
            <TextField
              label="Comment"
              value={unitComment}
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

export default UnitCheker;
