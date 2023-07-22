import { useEffect, useContext, useMemo, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import { products } from '../../data/mockBoq';
import { DeleteOutlined } from '@mui/icons-material';
import { EditOutlined } from '@mui/icons-material';
import AddMaterialForm from '../../components/AddMaterialForm';
const Products = () => {

	// useState to show form
	const [showFormAdd,setShowAddForm] =useState(false)
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// headers of each column in  the data grid
	const columns = [
		{ field: 'id', headerName: 'ID', flex: 0.5 },

		{
			field: 'materialName',
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
			field: 'rate',
			headerName: 'grahama @ 1',
			flex: 1,
			cellClassName: 'name-column--cell'
		},
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			renderCell: (params) => {
				const handelEdit = () => {
					console.log(`edit clicked id`);
				};
				const handeldDelete = (id) => {
					console.log(`delete clicked id`);
				};
				return (
					<div>
						<Button
							onClick={() => handelEdit()}
							type="submit"
							color="secondary"
							variant="contained"
							style={{ marginRight: '3px', width: '50%' }}
						>
							<EditOutlined />
						</Button>
						<Button onClick={() => handeldDelete()} type="submit" color="danger" variant="contained">
							<DeleteOutlined style={{ color: '#fff' }} />
						</Button>
					</div>
				);
			}
		}
	];
	// define unique id
	const getRowId = (row) => row.id;

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
					rows={products}
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
