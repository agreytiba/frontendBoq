import { useEffect, useState,useContext} from 'react';
import { Box, Typography, Button, useTheme} from '@mui/material';
import { DataGrid,GridToolbar} from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { useDispatch,useSelector} from "react-redux";
import {useNavigate}  from "react-router-dom"
import { toast } from "react-toastify"
import {AppContext} from '../../useContextApi/AppContext'
import { deleteMap, getAllMaps, getAllSuccess, reset } from '../../redux/maps/mapsSlice';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { API_BASE_URL } from '../../confing.js/baseUrl';
const Boq = () => {

	// use context 
	const {setShowBoq} =useContext(AppContext)

	//colors themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);


// initiliaze useDispatch && useNavigate
  const dispatch = useDispatch()
	const navigate = useNavigate()
// // get the values from context apia
// 	  const {setPreMapData } = useContext(AppContext);

// get user from local
	const user = JSON.parse(sessionStorage.getItem('user'));
	const admin = user?.accessLevel === 'admin'
 const config = {
	    headers: {
	      Authorization: `Bearer ${user?.token}`,
	    },
	  }
//useSelector  containe properties from authSlice
  const {maps, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.map
  )
	// const filtereData = maps.filter((map) => map.status === "boq")


  //useEffect to fetch all users
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    // firing get all users
    dispatch(getAllSuccess())

    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch])
const createBoq =async (data) => {
	try {
		const mapId = data._id
      const response = await axios.post(API_BASE_URL + "/api/savedpres",{ mapId},config);
		if (response.data) {
		    const combinedData = {...data,savedPreId: response.data._id // Add the savedPreId to the combined data
			};
		 localStorage.setItem('mapData', JSON.stringify(combinedData));
		 navigate("/pre")
			
	  }
    } catch (error) {
      toast.error("Error creating saved pre:", error.response.data);
    }
	
 }



	// handle get all maps
	const handleAllMap = (mapsData) => {
	
		navigate("/mymaps", { state:mapsData})
	}
	// header arrangement in data grid
	const columns = [
	  	{
			field: '_id',
			headerName: 'Ramani No',
            flex: 1,
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
			field: 'startConstruction',
			headerName: 'Itajengwa',
			flex: 1
		},
		{
			field: 'region',
			headerName: 'mkoa',
			flex: 0.5
		},
		{
			field: 'ramani',
			headerName: 'ramani',
			flex: 1.5,
			renderCell: (params) => {
				
			
				return (
				<Box>
					 
							{(user?.accessLevel === "admin" || user?.accessLevel === "boq") &&
						<Button
							onClick={()=>handleAllMap(params.row)}
							type="submit"
							color="primary"
							variant="outlined"
							style={{ marginRight: '3px' }}
							>
						 Ramani
						</Button>
						}
				
			
					</Box>
				);
			}
		},
		{
			field: ' hali michoro',
			headerName: 'hali ya michoro',
			flex: 1.5,
			renderCell: (params) => {
		
				return (
				<Box>
					 <div>
							{(user?.accessLevel === "admin" || user?.accessLevel === "boq"|| user?.accessLevel === "pricetag") &&
						<>	<Button
							onClick={()=>createBoq(params.row)}
							type="submit"
							color="success"
							variant="contained"
							style={{ marginRight: '3px' }}
							>
						  create  boq
						</Button>
							
								</>}
				
						</div>
					</Box>
				);
			}
		}
	];




	// define unique id
	const getRowId = (row) => row._id;

	if (isLoading) {
		return <Spinner/>
	}
	// handle back to admin page
	const backToAdminPage = () => {
		setShowBoq(false)
		navigate("/")
	}

	return (
		<Box display="flex" justifyContent="center" alignItems="center" >
			
			<Box   marginTop="2rem"
        width="90%" boxShadow={`0 4px 12px rgba(0,0,0,0.3)`} padding={`20px 10px`} borderRadius={`10px`}>
				<Box marginY="1rem">
				{admin &&	<Button onClick={backToAdminPage} variant='contained' sx={{backgroundColor:`${colors.greenAccent[400]}`}}>Back To Admin </Button>}
        <Typography variant='h3' textAlign="center" >
           Ukurasa wa kutengeneza ramani
          </Typography>
        </Box>
      <Box
				
    
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none'
					},
					'& .MuiDataGrid-cell': {
						borderBottom: 'none'
					},
					'& .name-column--cell': {
						color: colors.greenAccent[300]
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: `#3498db`,
						color: '#fff',
            borderBottom: 'none',
            textTransform:"uppercase"
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: colors.primary[400]
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: 'none',
						display:"none"
					},
					'& .MuiCheckbox-root': {
						color: `${colors.greenAccent[200]} !important`
					}
				}}
			>
			
					<DataGrid rows={maps} columns={columns} getRowId={getRowId} /> 
			
        </Box>
      </Box>
		</Box>
	);
};

export default Boq;
