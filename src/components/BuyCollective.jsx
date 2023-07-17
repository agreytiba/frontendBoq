import { useEffect, useContext, useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';
import { mockPreliminaries } from '../data/mockBoq';

const BuyCollective = () => {
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const data = mockPreliminaries.items;

	// headers of each column in  the data grid
	const columns = [
		{ field: 'id', headerName: 'ID', flex: 0.5 },

		{
			field: 'materialName',
			headerName: 'material',
			flex: 1,
			cellClassName: 'name-column--cell'
		},

		{
			field: 'unit',
			headerName: 'kipimo',
			flex: 0.5
		},
		{
			field: 'quantity',
			headerName: 'idadi',
			flex: 1,
			cellClassName: 'name-column--cell'
		},
		{
			field: 'rate',
			headerName: 'grahama @ 1',
			flex: 1,
			cellClassName: 'name-column--cell'
		},
		{
			field: 'amount',
			headerName: 'kiasi',
			valueGetter: (params) => params.row.quantity * params.row.rate,
			flex: 1
		}
	];
	// define unique id
	const getRowId = (row) => row.id;

	//  calculate the total Amount
	const totalAmount = data.reduce((total, row) => total + row.quantity * row.rate, 0);

	return (
    <Box border="1px solid #333" p="10px">
      <Typography style={{textAlign:"center",textTransform:"uppercase"}} variant="h3">manunuzi ya pamoja</Typography>
      	<Box>
				<Button
					style={{
						backgroundColor: 'goldenrod',
						color: '#fff',
						width: '150px',
            marginBlock:"15px"
					}}
				>
					 ongeza  vifaa 
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
					rows={data}
					columns={columns}
					getRowId={getRowId}
					//   components={{ Toolbar: GridToolbar }}
					responsiveLayout={[ 'xs', 'sm' ]}
				/>
				<Box display="flex" justifyContent="space-between" backgroundColor="#333" p="10px 20px" color="white">
					<Typography>total</Typography>
					<Typography>Tsh {totalAmount}</Typography>
				</Box>
			</Box>
			<Box textAlign="center" display="flex" justifyContent="center">
				<Button
					style={{
						backgroundColor: 'green',
						color: '#fff',
						width: '150px',
						height: '50px',
						marginTop: '15px'
					}}
				>
					Weka oda
				</Button>
			</Box>
		</Box>
	);
};

export default BuyCollective;
