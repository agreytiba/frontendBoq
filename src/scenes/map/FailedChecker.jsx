import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllMaps, reset } from "../../redux/maps/mapsSlice";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { API_BASE_URL } from "../../confing.js/baseUrl";
const FailedChecker = () => {
  // show popup comment form
  const [commentPopupOpen, setCommentPopupOpen] = useState(false);
  const [info, setInfo] = useState();
  // show popup sender infomation
  const [userPopupOpen, setUserPopupOpen] = useState(false);
  const [userInfo, setUseInfo] = useState();

  // failed map suggestions
  const [mapId, setMapId] = useState();
  const [newStatus, setNewStatus] = useState("vipimo");
  // State for checkComment input and its visibility
  const [suggestionOnMap, setSuggestionOnMap] = useState("");
  const [PopupOpen, setPopupOpen] = useState(false);

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
  const filtereData = maps.filter((map) => map.status === "maboresho");

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

  // pass to boq
  const handleMoveToBoq = async (id) => {
    
    try {
      window.confirm("unataka kupitisha ramani ?")
      const newStatus = "boq";
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

  // handle get all maps
  const handleAllMap = (mapsData) => {
    navigate("/mymaps", { state: mapsData });
  };

  // onclick hapana  button  enable show popup button
  const toggleSuggestionPopup = (id) => {
    setMapId(id);
    setPopupOpen(!commentPopupOpen);
  };

  // onclick submit   popup suggestion form
  const handleSuggestionSubmit = async () => {
    try {
      if (!suggestionOnMap) {
        toast.error("weka suggestion");
      }
      const res = await axios.put(API_BASE_URL + `/api/maps/${mapId}`, {
        suggestionOnMap,
      },config);
      if (res.data) {
        setSuggestionOnMap("");
        setPopupOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // handle show comment field
  const handleComment = (data) => {
    setInfo(data);
    setCommentPopupOpen(true);
  };

  const showUser = async (userid) => {
    try {
      setUserPopupOpen(true);
      const res = await axios.get(API_BASE_URL + `/api/users/${userid}`,config);
      // Handle successful update (e.g., show a success message or update the state)
      if (res.data) {
        setUseInfo(res.data);
      }
    } catch (error) {
      toast.error(error.message);
      // Handle error (e.g., show an error message)
    }
  };

  // header arrangement in data grid
  const columns = [
    {
      field: "mapName",
      headerName: "Ramani No",
      flex: 0.5,
      textAlign: "center",
      renderCell: (params) => {
        return (
          <Typography
            component={"p"}
            onClick={() => showUser(params.row.userId)}
          >
            Rama{params.row._id.slice(-4)}
          </Typography>
        );
      },
    },

    {
      field: "startConstruction",
      headerName: "Itajengwa",
      flex: 0.7,
    },
    {
      field: "region",
      headerName: "mkoa",
      flex: 0.5,
    },
    {
      field: "comment",
      headerName: "comment",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              onClick={() => handleComment(params.row)}
              type="submit"
              color="danger"
            >
              comment
            </Button>
          </Box>
        );
      },
    },
    {
      field: "ramani",
      headerName: "ramani",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Box>
            {(user?.accessLevel === "admin" ||
            user?.accessLevel === "failedchecker") && (
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
                user?.accessLevel === "failedchecker") && (
                <>
                  <Button
                    onClick={() => handleMoveToBoq(params.row._id)}
                    type="submit"
                    color="success"
                    variant="outlined"
                    style={{ marginRight: "3px" }}
                  >
                    unaweza kufanya Boq
                  </Button>
                  <Button
                    onClick={() => toggleSuggestionPopup(params.row._id)}
                    type="submit"
                    color="danger"
                    variant="contained"
                    style={{ marginRight: "3px", color: "#fff" }}
                  >
                    hapana
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
      <Box marginTop="2rem" width="95%"  boxShadow={`0 4px 12px rgba(0,0,0,0.3)`} padding={`20px 10px`}>
        <Box marginY="1rem">
          <Typography variant="h3" textAlign="center">
            ukurusa wa maboresho
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
            <Box>no data available</Box>
          )}
        </Box>

        {/* show comment produced from typeChecker, unitChecker*/}
        <Dialog open={commentPopupOpen}>
          <DialogTitle
            style={{
              textAlign: "center",
              paddingBlock: "10px",
              backgroundColor: "goldenrod",
            }}
          >
            MAPUNGUFU
          </DialogTitle>
          <DialogContent style={{ color: "tomato", width: "250px" }}>
            {info?.checkComment && (
              <Typography component={"p"}>{info.checkComment}</Typography>
            )}
            <br />
            {info?.unitComment && (
              <Typography component={"p"}>{info.unitComment}</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCommentPopupOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
        {/* user information */}
      
          <Dialog open={userPopupOpen}>
            <DialogTitle
              style={{
                textAlign: "center",
                paddingBlock: "10px",
                backgroundColor: "goldenrod",
              }}
            >
              taarifa za mteja
            </DialogTitle>
           {userInfo ?   <DialogContent style={{ color: "#333", width: "250px",paddingTop:"10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Email: {userInfo.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Name: {userInfo.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Phone: {userInfo.phone}
                  </Typography>
                </Grid>
              </Grid>
          </DialogContent> :
            <Typography variant="h5">
                   taarifa za mteja hazipo kwenye mfumo
                  </Typography> }
            <DialogActions>
              <Button onClick={() => setUserPopupOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
       
        {/*  popup to write suggestion on the map */}
        <Dialog open={PopupOpen}>
          <DialogTitle>Add Comment</DialogTitle>
          <DialogContent>
            <TextField
              label="Comment"
              value={suggestionOnMap}
              onChange={(e) => setSuggestionOnMap(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPopupOpen(false)}>Cancel</Button>
            <Button onClick={() => handleSuggestionSubmit()}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default FailedChecker;
