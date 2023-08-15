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

  // get user from local
  const user = JSON.parse(sessionStorage.getItem("user"));

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
		  const newStatus = 'boq';
      const res = await axios.put(`http://localhost:5000/api/maps/${id}`, {
        status: newStatus,
      });

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
      const res = await axios.put(`http://localhost:5000/api/maps/${mapId}`, { unitComment });
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
  //     const res = await axios.put(`http://localhost:5000/api/maps/${id}`, {
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
      field: "_id",
      headerName: "Ramani no",
      flex: 1,
      cellClassName: "name-column--cell",
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
              user?.accessLevel === "user") && (
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
                    color="secondary"
                    variant="contained"
                    style={{ marginRight: "3px" }}
                  >
                  vipo sawa
                  </Button>
                <Button
                    onClick={() => toggleCommentPopup(params.row._id)}
                    type="submit"
                    color="danger"
                    variant="contained"
                    style={{ marginRight: "3px", color: "#fff" }}
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
      <Box marginTop="2rem" width="90%">
        <Box
          marginY="1rem"
          backgroundColor={colors.blueAccent[400]}
          padding="20px 10px"
          color="#fff"
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
              backgroundColor: "#333",
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
