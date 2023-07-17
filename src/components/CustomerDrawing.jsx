import { useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../theme';
import Header from './Header';

const CustomerDrawing = () => {
	//colors themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const data = [
		{
			id: 1,
			createdAt: '22/07/2023',
			constructionDate: '11/12/2023',
			regional: 'dar es salaam',
			district: 'ubungo ',
			area: 'mbezi',
			shortDesc: '',
			status: 'pending',
			maps: []
		},
		{
			id: 2,
			createdAt: '11/07/2023',
			constructionDate: '20/12/2023',
			regional: 'mwanza',
			district: 'ilemela ',
			area: 'maduna tisa',
			shortDesc: 'qqkkr r rruruu yeyeyeyye ueuhnfnfns f',
			status: 'onProcess',
			maps: []
		}
	];

	// header arrangement in data grid
	const columns = [
		{ field: 'id', headerName: 'ID' },
		{
			field: 'createdAt',
			headerName: 'ULITUMA',
			flex: 1,
			cellClassName: 'name-column--cell'
		},

		{
			field: 'constructionDate',
			headerName: 'Itajengwa',
			flex: 1
		},
		{
			field: 'regional',
			headerName: 'mkoa',
			flex: 1
		},
		{
			field: 'district',
			headerName: 'wilaya',
			flex: 1
		},
		{
			field: 'area',
			headerName: 'mtaa',
			flex: 1
		},
		{
			field: 'status',
			headerName: 'status',
			flex: 1
		}
	];

	// define unique id
	const getRowId = (row) => row.id;
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
						backgroundColor: colors.blueAccent[300],
						color: '#fff',
            borderBottom: 'none',
            textTransform:"uppercase"
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: colors.primary[400]
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: 'none'
					},
					'& .MuiCheckbox-root': {
						color: `${colors.greenAccent[200]} !important`
					}
				}}
			>
				<DataGrid checkboxSelection rows={data} columns={columns} getRowId={getRowId} />
			</Box>
		</Box>
	);
};

export default CustomerDrawing;
