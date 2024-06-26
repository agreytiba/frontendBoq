import { useEffect, useContext, useMemo } from 'react';
import { Box, Typography, Button, useTheme} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllMaps, getAllSuccess, reset } from '../../redux/maps/mapsSlice';
import Spinner from '../../components/Spinner';
const Passed = () => {
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);


    // initiliaze useDispatch && useNavigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

//useSelector  containe properties from authSlice
  const {maps, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.map
    )
// filter to get passed to boq maps 
//  const filtereData = maps.filter((map) => map.status === "boq");
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
	
	// headers of each column in  the data grid
	const columns = [
		

		{
			field: 'mapName',
			headerName: 'Ramani No',
            flex: 1,
            textAlign:'center',
			renderCell: (params) => {
			
				return (
					<Typography component={"p"}>
						Rama{(params.row._id).slice(-4)}
					</Typography>
				);
			}
		}
,
		{
			field: 'userName',
			headerName: 'tarehe iliyotumwa',
			flex: 1
		},
		{
			field: 'createdAt',
			headerName: 'tarehe iliyotumwa',
			flex: 1
		},

		
	
	];
	// define unique id
    const getRowId = (row) => row._id;
    if (isLoading) {
        return <Spinner/>
    }

	return (
		<Box p="10px" mt="20px" boxShadow={`0 4px 12px rgba(0,0,0,0.3)`} borderRadius={`10px`}>
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
						backgroundColor: `#3498db`,
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
					rows={maps}
					columns={columns}
					getRowId={getRowId}
					components={{ Toolbar: GridToolbar }}
					responsiveLayout={[ 'xs', 'sm' ]}
				/>
			</Box>
		</Box>
	);
};

export default Passed;
