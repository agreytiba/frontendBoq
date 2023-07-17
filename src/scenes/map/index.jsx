import { useEffect, useContext, useMemo } from 'react';
import { Box, Typography, Button, useTheme} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mapsdetails } from '../../data/mockBoq';
import { DeleteOutlined } from '@mui/icons-material';
import { EditOutlined } from '@mui/icons-material';
const Maps = () => {
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// headers of each column in  the data grid
	const columns = [
		{ field: 'id', headerName: 'ID', flex: 0.5 },

		{
			field: 'mapNo',
			headerName: 'Ramani NO',
			flex: 1,
			cellClassName: 'name-column--cell'
		},

		{
			field: 'uploadedDate',
			headerName: 'tarehe iliyotumwa',
			flex: 1
		},

		
		{
			field: 'actions',
			headerName: 'hali ya michoro',
            flex: 1,
            textAlign:'center',
			renderCell: (params) => {
			
				const handleapprove = (id) => {
					console.log(`delete clicked id`);
				};
				const handleDisApprove = (id) => {
					console.log(`delete clicked id`);
				};
				return (
					<Box  display="flex" columnGap="10px">
						<Button onClick={() => handleapprove()} type="submit" color="secondary" variant="contained"  >
							inafaa
						</Button>
						<Button onClick={() => handleDisApprove()} type="submit" color="danger" variant="contained" style={{color:"#fff"}}>
	                        inamatatizo
						</Button>
					</Box>
				);
			}
		}
	];
	// define unique id
	const getRowId = (row) => row.id;

	return (
		<Box p="10px" mt="20px">
			<Typography style={{ textAlign: 'center', textTransform: 'uppercase' }} variant="h3">
				Ramani
			</Typography>
		
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
					rows={mapsdetails}
					columns={columns}
					getRowId={getRowId}
					components={{ Toolbar: GridToolbar }}
					responsiveLayout={[ 'xs', 'sm' ]}
				/>
			</Box>
		</Box>
	);
};

export default Maps;
