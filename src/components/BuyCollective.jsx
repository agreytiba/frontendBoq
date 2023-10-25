import { useEffect, useContext, useMemo, useState } from "react";
import { Box, Typography, Button,TextField,Dialog,DialogActions,DialogContent,DialogTitle,useMediaQuery,Grid} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {deletePurchase,getAllPurchase,reset} from "../redux/purchase/purchaseSlice";
import Spinner from "../components/Spinner";
import { DeleteOutlined } from "@mui/icons-material";
import { addOrder } from "../redux/order/orderSlice";
const BuyCollective = () => {
  // use state to handle get oda info
  const [purchaseId, setPurchaseId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderInfo, setOrderInfo] = useState({userName: "",phoneNumber: "",quantity: "", });
  // useState to get  single map on click ramani no
  const [purchaseInfo, setPurchaseInfo] = useState()
  const [purchPopupOpen, setPurchPopupOpen]= useState(false)
   //media query
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // 
  // color themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // initiliaze useDispatch && useNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //useSelector  containe properties from authSlice
  const { purchases, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.purchase
  );

  //useEffect to fetch all users
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // firing get all users
    dispatch(getAllPurchase());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  // deleting row
  const handleDelete = (id) => {
    dispatch(deletePurchase(id));
    window.location.reload();
    toast.success("umefanikiwa kufuta");
  };

  // handle  onclick weka oda
  const handlePlaceOrder = (id) => {
    setPurchaseId(id);
    setOpenDialog(true);
  };

  // close dialog
  const handleDialogClose = () => {
    setOrderInfo({
      userName: "",
      phoneNumber: "",
      quantity: "",
    });
    setOpenDialog(false);
  };

  // handle submit the   popup form
  const handleOrderSubmit = () => {
    if (!orderInfo.userName || !orderInfo.phoneNumber || !orderInfo.quantity) {
      toast.error("jaza nafasi zote");
      return;
    }
    try {
    const data = { ...orderInfo, purchaseId };
    dispatch(addOrder(data))
      handleDialogClose();
      toast.success('umefanikiwa kuweka order')
      
    } catch (error) {
  toast.error(error)
    }
    
	};
	

  const handleAllOrders = (purchId) => {
    console.log(purchId)
	navigate('/orders', { state:purchId});
	}
  // get user from local
  const user = JSON.parse(sessionStorage.getItem("user"));
 // handle get single map information for display 
  const handleShowAll = (info) => {
  setPurchaseInfo(info)
  setPurchPopupOpen(true)
  }
  // headers of each column in  the data grid
  const columns = [
    {
      field: "material",
      headerName: "material",
      flex: 0.5,
        renderCell: (params) => {
        return (
          <Typography onClick={()=>handleShowAll(params.row)} >
             {params.row.material}
          </Typography>
        );
      },
    },

    {
      field: "quantity",
      headerName: "idadi",
      flex: 0.5,
    },

    {
      field: "price",
      headerName: "bei(Tsh)",
      flex: 0.5,
    },
    {
      field: "payBefore",
      headerName: "Lipa kabla ya",
      flex: 1,
    },
    {
      field: "deliveryRange",
      // change to date range 
      headerName: "utaletewa site",
      flex: 1,
    },
    {
      field: "transport",
      headerName: "usafiri",
      flex: 0.5,
    },

    {
      field: "orderStatus",
      headerName: "updates",
      flex: 0.5,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            {user?.accessLevel === "admin" && (
              <div>
                <Button
                  onClick={() => handleDelete(params.row._id)}
                  type="submit"
                  color="danger"
                  variant="contained"
                >
                  <DeleteOutlined style={{ color: "#fff" }} />
                </Button>
              </div>
            )}
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "hali ya oda",
      flex: 1.2,
      textAlign: "center",
      renderCell: (params) => {
      

        return (
          <Box display="flex" columnGap="10px">
            <Button
              onClick={() => handlePlaceOrder(params.row._id)}
              type="submit"
              color="secondary"
              variant="contained"
            >
              weka oda
            </Button>
            {user?.accessLevel === "admin" && <Button
              onClick={() => handleAllOrders(params.row._id)}
              type="submit"
              color="warning"
              variant="contained"
              style={{ marginRight: "3px", width: "50%" }}
            >
              orders
            </Button>}
          </Box>
        );
      },
    },
  ];
  // define unique id
  const getRowId = (row) => row._id;

  // filter column on different screen size
    const filteredColumns = isMobile
    ? columns.filter((column) => column.field !== "quantity" && column.field !== "price" && column.field !== "payBefore" && column.field !== "transport" && column.field !=="deliveryRange"&& column.field !== "price" && column.field !== "payBefore" && column.field !== "transport" && column.field !=="actions"&& column.field !== "price" && column.field !== "payBefore" && column.field !== "transport" && column.field !=="orderStatus")
    : columns;

  // on loading state
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Box p="10px">
      <Typography
        style={{ textAlign: "center", textTransform: "uppercase" }}
        variant="h3"
      >
        manunuzi ya pamoja
      </Typography>

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
            borderBottom: "none",
            color: "#fff",
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {},
        }}
      >
        <DataGrid
          rows={purchases}
          columns={filteredColumns}
          getRowId={getRowId}
          components={{ Toolbar: GridToolbar }}
          responsiveLayout={["xs", "sm"]}
        />
		  </Box>
		  {/* pop up form onclick weka oda */}
      <Box>
        <Dialog open={openDialog}>
          <DialogTitle>Place Order</DialogTitle>
          <DialogContent>
            <TextField
              label="User Name"
              fullWidth
              value={orderInfo.userName}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, userName: e.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={orderInfo.phoneNumber}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, phoneNumber: e.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Quantity"
              fullWidth
              value={orderInfo.quantity}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, quantity: e.target.value })
              }
              margin="normal"
              type="number"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose} variant="contained"color="secondary">
              Cancel
            </Button>
            <Button onClick={handleOrderSubmit} variant="contained" color="primary">
              Submit Order
            </Button>
          </DialogActions>
        </Dialog>
           <Dialog open={purchPopupOpen}>
            <DialogTitle
              style={{
                textAlign: "center",
                paddingBlock: "10px",
                backgroundColor: "goldenrod",
              }}
            >
              taarifa za offa
            </DialogTitle>
           {purchaseInfo ?   <DialogContent style={{ color: "#333", width: "80%",paddingTop:"10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                  Material  : {purchaseInfo.material}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Idadi: {purchaseInfo.quantity}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    bei(Tsh): {purchaseInfo.price}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Lipa  kabla ya: {purchaseInfo.payBefore}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    usafiri: {purchaseInfo.transport}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    updates: {purchaseInfo.orderStatus}
                  </Typography>
                </Grid>
                
              </Grid>
          </DialogContent> :
            <Typography variant="h5">
                   taarifa za offa hazipo kwenye mfumo
                  </Typography> }
            <DialogActions>
              <Button onClick={() => setPurchPopupOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
      </Box>
    </Box>
  );
};

export default BuyCollective;
