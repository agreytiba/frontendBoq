import { useEffect, useContext, useMemo, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { EditOutlined } from '@mui/icons-material';
import AddMaterialForm from '../../components/AddMaterialForm';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {toast} from "react-toastify"
import { deleteMaterial, getAllMaterial, reset } from '../../redux/material/materialSlice';
const Products = () => {

	// useState to show form
	const [showFormAdd,setShowAddForm] =useState(false)
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	 // initiliaze useDispatch && useNavigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

//useSelector  containe properties from authSlice
  const {materials, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.material
  )

  //useEffect to fetch all  materials
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    // firing get all materials
    dispatch(getAllMaterial())

    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch])
	
	
	
	// const handleDelete = (id) => {
	// 	dispatch(deleteMaterial(id))
	// 	window.location.reload()
	// 	toast.success("umefanikiwa kufuta")
		
	// }
	// edit price only
	const handleEditPrice = (item) => {
	
    const newPrice = prompt(`Enter the new price for ${item.material}:`, item.price);
    if (newPrice !== null && newPrice !== '') {
      // Send the request to update the price
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPrice: parseFloat(newPrice) })
      };

      fetch(`http://localhost:5000/api/materials/${item._id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data) {
        toast.success("umefanikiwa kubadilisha bei")
            // Refresh the material list
            dispatch(getAllMaterial());
          } else {
            toast.error(data.message || 'kubadilisha bei imeshindika');
          }
        })
        .catch(error => {
     
          toast.error('kubadilisha bei imeshindika');
        });
    }
  };

	// headers of each column in  the data grid
	const columns = [
		
		{
			field: 'material',
			headerName: 'bidhaa',
			flex: 1,
			cellClassName: 'name-column--cell'
		},

		{
			field: 'unit',
			headerName: 'kipimo',
			flex: 0.5
		},

		{
			field: 'price',
			headerName: 'grahama @ 1',
			flex: 1,
			cellClassName: 'name-column--cell'
		},
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			renderCell: (params) => {
				
			
				return (
					<div>
						<Button
							onClick={() => handleEditPrice(params.row)}
							type="submit"
							color="secondary"
							variant="contained"
							style={{ marginRight: '3px', width: '50%' }}
						>
							<EditOutlined />
						</Button>
						{/* <Button onClick={() => handleDelete( params.row._id )} type="submit" color="danger" variant="contained">
							<DeleteOutlined style={{ color: '#fff' }} />
						</Button> */}
					</div>
				);
			}
		}
	];
	// define unique id
	const getRowId = (row) => row._id;

	return (
		<Box display="flex" justifyContent="center" alignItems="center" py="50px">
		<Box  width="90%" p="15px" boxShadow="0 0 5px #333" borderRadius="10px">
			<Typography style={{ textAlign: 'center', textTransform: 'uppercase' }} variant="h3">
				bidhaa na bei zake
			</Typography>
			<Box>
				<Button
					style={{
						backgroundColor: 'goldenrod',
						color: '#fff',
						width: '150px',
						marginBlock: '15px'
					}}
					onClick={()=>setShowAddForm(true)}
				>
					ongeza bidhaa
				</Button>
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
						backgroundColor: colors.blueAccent[400],
						borderBottom: 'none',
						color: '#fff'
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: colors.primary[400]
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: 'none',
						display: 'none'
					},
					'& .MuiCheckbox-root': {
						color: `${colors.greenAccent[200]} !important`
					},
					'& .MuiDataGrid-toolbarContainer .MuiButton-text': {}
				}}
			>
				<DataGrid
					rows={materials}
					columns={columns}
					getRowId={getRowId}
					components={{ Toolbar: GridToolbar }}
					responsiveLayout={[ 'xs', 'sm' ]}
				/>
			</Box>
			{

				showFormAdd &&
				
			<Box position="absolute" top="0" left="0" right="0" backgroundColor="rgba(0,0,0,0.6)">
<AddMaterialForm setShowAddForm={setShowAddForm}/>
			</Box>
			}
		</Box></Box>
	);
};

export default Products;
