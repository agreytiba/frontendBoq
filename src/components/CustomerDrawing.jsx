import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,useMediaQuery,Grid
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteMap, getAllMaps, reset } from "../redux/maps/mapsSlice";
import { DeleteOutlined } from "@mui/icons-material";

import Spinner from "./Spinner";
const CustomerDrawing = () => {
  //usestate for get data
  const [data, setData] = useState();
  // useState for show dialog box on click status button
  const [openDialog, setOpenDialog] = useState(false);
 
  // useState for show dialog content depend on the status value
  const [statusContent, setStatusContent] = useState("");
// useState to get  single map on click ramani no
  const [mapInfo, setMapInfo] = useState()
  const [mapPopupOpen, setMapPopupOpen]= useState(false)
  //media query
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // 
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

  // filter data to get all maps upload by the user
  const filtereData = maps.filter((map) => map.userId === user?._id);

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

  // handle delete  row
  const handleDelete = (id) => {
    dispatch(deleteMap(id));
    window.location.reload();
    toast.success("umefanikiwa kufuta");
  };

  // handle show the  boq created
  const handleGetBoq = (id) => {
    navigate("userboq", {state:id});
  };
  // handle get all maps
  const handleAllMap = (mapsData) => {
    navigate("/mymaps", { state: mapsData });
  };

  // handle get single map information for display 
  const handleShowAll = (info) => {
    setMapInfo(info)
    setMapPopupOpen(true)
  }

  // header arrangement in data grid
  const columns = [
  	{
			field: 'mapName',
			headerName: 'Ramani No',
            flex: 1,
            textAlign:'center',
			renderCell: (params) => {
			
				return (
					<Typography component={"p"} onClick={()=>handleShowAll(params.row)}>
						Rama{(params.row._id).slice(-4)}
					</Typography>
				);
			}
		},
    {
      field: "createdAt",
      headerName: "ULITUMA",
      flex: 1,
       renderCell: (params) => {
        return (
          <Box>
          {params.value.slice(0,10)}
          </Box>
        );
      },
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
      field: "district",
      headerName: "wilaya",
      flex: 1,
    },
    {
      field: "ward",
      headerName: "mtaa",
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "status",
      flex: 0.7,
      // action  to be done on click status button
      renderCell: (params) => {
        const handleStatusClick = () => {
          // Set the appropriate content based on the status value
          switch (params.value) {
            case "imetumwa":
              setStatusContent(
                "ramani yako imetumwa na tumeipokea tuendele kuifanyia kazi"
              );

              break;
            case "vipimo":
              setStatusContent("ramani yako inakaguliwa vipimo");

              break;
            case "maboresho":
              setStatusContent(
                "ramani yako inachagamoto  ipo kwenye kitengo cha maboresho.tutakupa report kamili tukimaliza"
              );

              break;
            case "boq":
              setStatusContent("ramani zako ziko vizuri.tunakutengezea boq");

              break;
            default:
              setStatusContent(
                " ramani yako imeshindwa kufika vigezo vya kufangiwa"
              );
              break;
          }
          setOpenDialog(true); // Open the dialog when the status field is clicked
        };

        return (
          <div>
            <Button
              onClick={handleStatusClick}
              color={params.value ==="maboresho" ? "danger" : "success"}
            
            >
            {params.value}
            </Button>
          </div>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.7,
      // actions to be performed 
      renderCell: (params) => {
        return (
          <Box>
            <div>
              {(user?.accessLevel === "admin" ||
                user?.accessLevel === "user") && (
                <>
                  {" "}
                  <Button
                    onClick={() => handleAllMap(params.row)}
                    type="submit"
                    color="primary"
                    variant="outlined"
                    style={{ marginRight: "3px" }}
                  >
                    Ramani
                  </Button>
                  <Button
                    onClick={()=>handleGetBoq(params.row._id)}
                    type="submit"
                    color="primary"
                    variant="outlined"
                    style={{ marginRight: "3px" }}
                  >
                    boq
                  </Button>
                </>
              )}
              {user?.accessLevel === "admin" && (
                <Button
                  onClick={() => handleDelete(params.row._id)}
                  type="submit"
                  color="danger"
                  variant="outlined"
                >
                  <DeleteOutlined style={{ color: "red" }} />
                </Button>
              )}
            </div>
          </Box>
        );
      },
    },
  ];

  // filter column on different screen size
    const filteredColumns = isMobile
    ? columns.filter((column) => column.field !== "region" && column.field !== "district" && column.field !== "ward" && column.field !== "actions"&& column.field !== "createdAt" && column.field !=="startConstruction")
    : columns;

  // define unique id
  const getRowId = (row) => row._id;

  // onloading state
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box
        // overide the default data grid styles
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
            backgroundColor: `#3498db`,
            color: "#fff",
            borderBottom: "none",
            textTransform: "uppercase",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            // borderTop: "none",
            // backgroundColor: "none",
            // display: "none",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {user?.accessLevel === "user" ? (
          <DataGrid rows={filtereData} columns={filteredColumns} getRowId={getRowId} />
        ) : (
            <DataGrid rows={maps} columns={filteredColumns} getRowId={getRowId} />
        )}
      </Box>
      {/* popup dialog on click the status to show statu of the map*/}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ color: "goldenrod", textAlign: "center" }}>
          HALI YA RAMANI
        </DialogTitle>
        <DialogContent>
          <Typography>{statusContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

             <Dialog open={mapPopupOpen}>
            <DialogTitle
              style={{
                textAlign: "center",
                paddingBlock: "10px",
                backgroundColor: "goldenrod",
              }}
            >
              taarifa za ramani
            </DialogTitle>
           {mapInfo ?   <DialogContent style={{ color: "#333", width: "80%",paddingTop:"10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                  Ulitumwa  : {(mapInfo.createdAt).slice(0,10)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">mkoa: {mapInfo.region}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    district: {mapInfo.district}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    ward: {mapInfo.district}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    status: {mapInfo.status}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    maelezo: {mapInfo.desc}
                  </Typography>
                </Grid>
                <Grid item xs={12}>{
                 mapInfo.suggestionOnMap && <Typography variant="body1">
                    mapendekezo: {mapInfo.suggestionOnMap}
                  </Typography>} 
            </Grid>
                <Grid item xs={12}>{
                 mapInfo.unitComment && <Typography variant="body1">
                    hali ya michoro: {mapInfo.unitComment}
                  </Typography>}
                </Grid>
                <Grid item xs={12}>{
                 mapInfo.checkComment && <Typography variant="body1">
                      comment: {mapInfo.checkComment}
                  </Typography>}
            </Grid>
              </Grid>
          </DialogContent> :
            <Typography variant="h5">
                   taarifa za ramani hazipo kwenye mfumo
                  </Typography> }
            <DialogActions>
              <Button onClick={() => setMapPopupOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
    </Box>
  );
};

export default CustomerDrawing;
