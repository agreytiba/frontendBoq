import React,{useEffect,useState,useContext} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, ButtonGroup, Typography,Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import { getAllPre, reset, updatePre } from '../../redux/pre/preSlice';
import { toast } from "react-toastify";
import axios from 'axios';
import { Edit } from '@mui/icons-material';
import { API_BASE_URL } from '../../confing.js/baseUrl';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
   backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bolder",
  fontSize:"14px"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Preliminilaries = ({setIsSidebar}) => {
  // edit rate useState
  const [editingRate, setEditingRate] = useState(null);
  const [newRate, setNewRate] = useState(null);
  // use state to get savedpre data
   const [savedPre, setSavedPre] = useState(null); 

  // get  quantity
  const [editingQuantity, setEditingQuantity] = useState(null); // Add state for editing quantity
  const [quantity, setQuantity] = useState(""); // Add state for new quantity
  // initiliaze useDispatch && useNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const user = JSON.parse(sessionStorage.getItem("user"));

   const config = {
	    headers: {
	      Authorization: `Bearer ${user?.token}`,
	    },
	  }
const mapData = JSON.parse(localStorage.getItem("mapData"))
  //useSelector  containe properties from pre
  const {pres, isLoadingPre, isErrorPre, isSuccessPre, messagePre } = useSelector(
    (state) => state.pre
  );

  //useEffect to fetch all pre data
  useEffect(() => {
    if (isErrorPre) {
      toast.error(messagePre);
    }
    // firing get all  get all pre
    dispatch(getAllPre());
    return () => {
      dispatch(reset());
    };
  }, [navigate, isErrorPre, messagePre, dispatch]);


  //useSelector  containe properties from  savedPre
  const {savepre, isLoadinSaved, isErrorSaved,messageSaved} = useSelector(
    (state) => state.savedpre

  );

// fetch SavedPre by Id
       const fetchSavedPre = async () => {
      try {
      
        if (mapData.savedPreId) {
          const response = await axios.get(API_BASE_URL + `/api/savedpres/${mapData.savedPreId}`,config);
          setSavedPre(response.data);
        }
      } catch (error) {
        toast.error('Error fetching savedPre:', error);
      }
    };

  //  use effect to get savedPre by id
  useEffect(() => {
    fetchSavedPre();
  }, [mapData.savedPreId]);

  // handle update rate
  const handleRateUpdate = async(materialId) => {
    if (newRate !== null) {
    
      try {
        const response = await axios.put(API_BASE_URL + `/api/pre/${materialId}`,{newRate:newRate},config)
       setNewRate(null)
        if (response.data) {
          dispatch(getAllPre())
          setEditingRate(null)
          
        } else {
          toast.error('Failed to update rate in the backend');
        }
      } catch (error) {
        toast.error(`kuna matatizo katika kubadilisha bei, ${error}` )
      }
      setEditingRate(null);
    }
  };



  const handleQuantityUpdate = async (materialId) => {
    if (quantity !== "" ) {
      try {
        const response = await axios.put(API_BASE_URL + `/api/savedpres/${mapData?.savedPreId}`, {
          quantity: Number(quantity), // Convert to number
          materialId
        },config);

        if (response.data) {
          setQuantity(""); // Reset the quantity input
          setEditingQuantity(false)
          fetchSavedPre()
        } else {
          toast.error('Failed to update quantity in the backend');
        }
      } catch (error) {
        toast.error(`Error updating quantity: ${error}`);
      }
    }
  };
 
// Calculate the total amount of the pre items
const totalAmount = savedPre?.preData.reduce((total, data) => {
  const material = pres.find(row => row._id === data.materialId);
  if (material) {
    const amount = material.rate * data.quantity;
    return total + amount;
  }
  return total;
}, 0);
  
  // go back to boq
  const goBack = () => {
    navigate(-1)
  }
  return (
    <Box p={`20px`} boxShadow={`0 4px 10px rgba(0,0,0,0.3)`} borderRadius={`10px`}>
      <Box>
    <Button color="primary" variant={"outlined"}style={{marginBlock:"30px"}} onClick={goBack}> Go Back</Button>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <Typography variant={"h3"} paddingY="10px"width={"100%"} fontWeight="800"  color={"primary" } >A. PRELIMINARIES</Typography>
            </TableRow>
          <TableRow style={{ marginBottom:"5px"}} >
            <StyledTableCell>material</StyledTableCell>
            <StyledTableCell align="center">unit</StyledTableCell>
            <StyledTableCell align="center">quantity</StyledTableCell>
            <StyledTableCell align="center">rate&nbsp;(tsh)</StyledTableCell>
            <StyledTableCell align="center">Amount&nbsp;(tsh)</StyledTableCell>
          </TableRow>
        </TableHead>
       {pres ? <TableBody>
          {pres.map((row) => (
            <StyledTableRow
              key={row.material}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.material}
              </StyledTableCell>
              <StyledTableCell  align='center'>
                {row.unit}
              </StyledTableCell>
              <StyledTableCell align="center">

                {savedPre?.preData !== null ? <Box> {savedPre?.preData.map((data) => {
                  if (row._id === data.materialId) {
                    return <>
                      <span key={data.materialId}>{data.quantity}</span>
                    </>
                  }
                      
                      
                })}</Box>: <span> 0 </span>}
                  {editingQuantity === row.material ? ( <div>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        style={{ height: "50px", width: "50px" }}
                      />
                      <button onClick={() => handleQuantityUpdate(row._id)}>Submit</button>
                    </div>
                ) : (<>{(user?.accessLevel === "admin" || user?.accessLevel === "boq") &&
                  <Box onClick={() => setEditingQuantity(row.material)}>
                    <Edit />
                     
                  </Box>}</>
                  )}
              </StyledTableCell>
              <StyledTableCell align="center">
                 {editingRate === row.material ? (
                 <div>
                      <input
                        type="number"
                        value={newRate}
                      onChange={(e) => setNewRate(e.target.value)}
                      style={{height:"50px", width:"50px"}}
                    />
                    {row.quantity}
                      <button onClick={() => handleRateUpdate(row._id)}>Submit</button>
                    </div>) : (
                    <span style={{display:"flex", justifyContent:"center",columnGap:"10px"}}>
                     {row.rate}{(user?.accessLevel === "admin" || user?.accessLevel === "pricetag") && <Edit onClick={() => setEditingRate(row.material)} />}
                    </span>
                  )}
              </StyledTableCell>
            
              <StyledTableCell align="center">
  {savedPre?.preData.map((data) => {
    if (row._id === data.materialId) {
      return <span key={data.materialId}>{row.rate * data.quantity}</span>;
    }
    return null; // Return null for non-matching rows
  })}
</StyledTableCell>

              
              
            </StyledTableRow>
            
          ))}
             <StyledTableRow   style={{border:"4px solid #333",marginBlock:"10px"}}>
              <StyledTableCell variant="dark"
              >
                <Typography variant='h4' color={"primary"}>  Total Amount
                </Typography>
              </StyledTableCell>
          
          <StyledTableCell align="center"></StyledTableCell>
          
          <StyledTableCell align="center"></StyledTableCell>
          
          <StyledTableCell align="center"></StyledTableCell>
          
              <StyledTableCell fontWeight='800'>{ totalAmount}</StyledTableCell>
            </StyledTableRow>
            
        </TableBody> :<Typography >hakuna data</Typography>}
      </Table>
      </TableContainer>
      </Box>
</Box>
  )
}

export default Preliminilaries