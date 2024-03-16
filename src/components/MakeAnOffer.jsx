import { useEffect, useContext, useMemo, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';


const MakeAnOffer = () => {
	// use state to show  order needed
	const [ showOrder, setShowOrder ] = useState(false);
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const data = [
		{
			id:1,
		material: "tofali",
		quantity: 21000,
		maxDate: "1 may 2023",
		area: "kimbiji, kisarwe II",
		costWithoutTrasport: "",
		costWithTransport: "",
	},
		{
			id: 2,
		material: "cement",
		quantity: 1000,
		maxDate: "12 oct 2023",
		area: "ubungo, kimara mwisho",
		costWithoutTrasport: "",
		costWithTransport: "",
	},
	]

	// headers of each column in  the data grid
	const columns = [
		{ field: 'id', headerName: 'ID', flex: 0.5 },

		{
			field: 'material',
			headerName: 'bidhaa',
			flex: 1,
			cellClassName: 'name-column--cell'
		},

		{
			field: 'quantity',
			headerName: ' idadi',
			flex: 0.5
		},
		{
			field: 'maxDate',
			headerName: 'idadi',
			flex: 1,
			cellClassName: 'name-column--cell'
		},
		{
			field: 'area',
			headerName:'itapelekwa',
			flex: 1,
			cellClassName: 'name-column--cell'
		},
	{
			field: 'actions',
			headerName: 'tuma ofa',
            flex: 1,
            textAlign:'center',
			renderCell: (params) => {
			
				const handleSubmit = (id) => {
					console.log(`delete clicked id`);
				};
				
				return (
					<Box textAlign="center" display="flex" justifyContent="center">
						<Button
							style={{
								backgroundColor: 'green',
								color: '#fff',
								
							}}
                           onClick={handleSubmit}
						>
							Tuma ofa
						</Button>
					</Box>
				);
			}
		}
	];
	// define unique id
	const getRowId = (row) => row.id;



	return (
		<Box border="1px solid #333" p="10px" mt="10px">
		

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
							backgroundColor: colors.grey[700],
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
						rows={data}
						columns={columns}
						getRowId={getRowId}
						//   components={{ Toolbar: GridToolbar }}
						responsiveLayout={[ 'xs', 'sm' ]}
					/>
					{/* <Box
						display="flex"
						justifyContent="space-between"
						backgroundColor="#333"
						p="10px 20px"
						color="white"
					>
						<Typography>total</Typography>
						<Typography>Tsh {totalAmount}</Typography>
					</Box> */}

					
				</Box>
		
		</Box>
	);
};

export default MakeAnOffer;
