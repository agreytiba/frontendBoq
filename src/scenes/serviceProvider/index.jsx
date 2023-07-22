import { useEffect, useContext, useMemo } from 'react';
import { Box, Typography, Button, useTheme} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { serviceProviders } from '../../data/mockBoq';
import { DeleteOutlined } from '@mui/icons-material';
import { EditOutlined } from '@mui/icons-material';
import ProviderInfoForm from '../../components/ProviderInfoForm';
const ServiceProviders = () => {
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// headers of each column in  the data grid
	const columns = [
		{ field: 'id', headerName: 'ID', flex: 0.5 },

		{
			field: 'name',
			headerName: 'mtoa huduma',
			flex: 1,
			cellClassName: 'name-column--cell'
		},

		{
			field: 'region',
			headerName: 'mkoa',
			flex: 0.5
		},

		{
			field: 'district',
			headerName: 'wilaya',
			flex: 0.5,
			cellClassName: 'name-column--cell'
		},
		{
			field: 'ward',
			headerName: 'kata',
			flex: 0.5,
			cellClassName: 'name-column--cell'
		},
		{
			field: 'status',
			headerName: 'hali ya usaili',
			flex: 1,
			cellClassName: 'name-column--cell'
		},
		{
			field: 'actions',
			headerName: 'Actions',
            flex: 1,
            textAlign:'center',
			renderCell: (params) => {
				const handleEdit = () => {
					console.log(`edit clicked id`);
				};
				const handleDelete = (id) => {
					console.log(`delete clicked id`);
				};
				const handleapprove = (id) => {
					console.log(`delete clicked id`);
				};
				const handleDisApprove = (id) => {
					console.log(`delete clicked id`);
				};
				return (
					<Box  display="flex" columnGap="10px">
						<Button onClick={() => handleapprove()} type="submit" color="secondary" variant="contained"  >
							thibitisha
						</Button>
						<Button onClick={() => handleDisApprove()} type="submit" color="danger" variant="contained" style={{color:"#fff"}}>
	                        batilisha
						</Button>
					</Box>
				);
			}
		}
	];
	// define unique id
	const getRowId = (row) => row.id;

	return (
		 <Box display="flex" justifyContent="center" alignItems="center" py="50px">
		<Box width="90%" p="15px" boxShadow="0 0 5px #333" borderRadius="10px">
			<Typography style={{ textAlign: 'center', textTransform: 'uppercase',padding:"50px 0 20px 0" }} variant="h3">
				watoa huduma
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
					rows={serviceProviders}
					columns={columns}
					getRowId={getRowId}
					components={{ Toolbar: GridToolbar }}
					responsiveLayout={[ 'xs', 'sm' ]}
				/>
			</Box>
			
		</Box></Box>
	);
};

export default ServiceProviders;
