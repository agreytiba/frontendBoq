import { useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { DataGrid,GridToolbar} from '@mui/x-data-grid';
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
			region: 'dar es salaam',
			district: 'ubungo ',
			kata: 'mbezi',
			desc: '',
			status: 'imepokelewa',
			maps: []
		},
		{
			id: 2,
			createdAt: '11/07/2023',
			constructionDate: '20/12/2023',
			region: 'mwanza',
			district: 'ilemela ',
			kata: 'maduna tisa',
			desc: 'qqkkr r rruruu yeyeyeyye ueuhnfnfns f',
			status: 'imepokelewa',
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
			field: 'region',
			headerName: 'mkoa',
			flex: 1
		},
		{
			field: 'district',
			headerName: 'wilaya',
			flex: 1
		},
		{
			field: 'kata',
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

export default CustomerDrawing;
