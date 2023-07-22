import { useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../theme';


const Walling = () => {
	//colors themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const data = [
		{
			id: 1,
            material: "cement", 
            manufacturer: "dangote",
            unit: "bag",
            quantity: 100,
            price: 15000,
		},
		{
				id: 2,
            material: "brick", 
            manufacturer: "",
		    unit: "one",
            quantity: 1000,
            price: 500,
		}
	];

	// header arrangement in data grid
	const columns = [
		
		{
			field: 'material',
			headerName: 'bidhaa',
			flex: 1,
			cellClassName: 'name-column--cell'
		},

		{
			field: 'manufacturer',
			headerName: 'from',
			flex: 1
		},
		{
			field: ' unit',
			headerName: 'kipimo',
			flex: 1
		},
		{
			field: 'quantity',
			headerName: 'qauntity',
			flex: 0.5
		},
	
           {
      field: 'total',
      headerName: 'Total',
      type: 'number',
     flex: 1,
      valueGetter: (params) => {
        return params.row.quantity * params.row.price;
      },
    },
	
	];

	// define unique id
    const getRowId = (row) => row.id;
    
    //  calculate the total Amount
	const totalAmount = data.reduce((total, row) => total + row.quantity * row.rate, 0);
	return (
		<Box >
			<Box
				
				height="100%"
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
						backgroundColor: colors.greenAccent[300],
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
				<DataGrid components={{ Toolbar: GridToolbar }} rows={data} columns={columns} getRowId={getRowId} />
			</Box>
		</Box>
	);
};

export default Walling;
