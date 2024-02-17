import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography,CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Upload from './Upload';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createMap, getAllMaps, reset } from '../redux/maps/mapsSlice';
import { API_BASE_URL } from '../confing.js/baseUrl';
const SendMapForm = ({ setShowFormMap }) => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	// handle upload of file pdf
	const [ selectedFiles, setSelectedFiles ] = useState([]);
	const [ showForm, setShowForm ] = useState(false);
	const [mapdata, setMapData] = useState();
	const [isLoading, setIsLoading] =useState(false)
	//  hold the response of the pdf
	// const [ mapIds, setMapId ] = useState([]);

	// get user from session storage
	const user = JSON.parse(sessionStorage.getItem('user'));
	const userId = user._id;

	const handleFileChange = (event) => {
		setSelectedFiles([ ...event.target.files ]);
	};

	const handleUpload = async () => {
		const formData = new FormData();
		selectedFiles.forEach((file) => {
			if (file.type === 'application/pdf') {
				formData.append('pdf', file);
				formData.append('userId', userId);
			} else {
				toast.error('file lazima liwe pdf form');
				return; // Skip appending this file and move to the next one
			}
		})
		try {
			setIsLoading(true);
			const res = await axios.post( API_BASE_URL + '/upload-pdf', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			if (res.data) {
				const { maps } = res.data;
				setMapData(maps);
				setIsLoading(false);
				setShowForm(true);
			}
		} catch (error) {
			
			toast.error('umeshindwa upload ramani zako');
		}
	};
	// initiliaze useDispatch && useNavigate
	const dispatch = useDispatch();
	//useSelector  containe properties from authSlice
	const { isError, message } = useSelector((state) => state.map);
	// use effect for handling states
	useEffect(
		() => {
			if (isError) {
				toast.error(message);
			}

			return () => {
				dispatch(reset());
			};
		},
		[ isError, message, dispatch ]
	);

	// handle submit of all data
	const handleFormSubmit = (values) => {
		if (mapdata) {
			const mapIds = [];

			for (let i = 0, len = mapdata.length; i < len; i++) {
				const { _id } = mapdata[i];
				mapIds.push(_id);
			}
			// destructuring   a object values
			const { userName, region, district, ward, startConstruction, desc } = values;
			// creating are new object to submit data
			const data = { userName, region, district, ward, startConstruction, desc, mapIds, userId };
			if (values) {
				dispatch(createMap(data));

				setShowFormMap(false);
				toast.success('umefanikiwa kutuma ramani');
				dispatch(getAllMaps())
			}
		} else {
			toast.error('hakuna ramani jaribu tena');
		}
	};
	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			<Box p="20px" backgroundColor="#ddd" borderRadius="10px" maxWidth="800px" minWidth="400px">
				<Box py="10px" textAlign="center" marginBottom="20px">
					<Typography variant="h3">Tuma ramani</Typography>
				</Box>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					flexDirection="column"
					rowGap="1rem"
					my="0.2rem"
					zIndex="99"
				>
					<label style={{color:"red", textAlign:"start", marginBottom:"5px"}}> upload pdf only</label>
					<input type="file" multiple onChange={handleFileChange} />
					<Button color="success" onClick={handleUpload} variant="contained">
					{isLoading ? <CircularProgress/>: <>Upload</>}
					</Button>
				</Box>
				{showForm && (
					<Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
						{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<Box mt="0.5rem" color="tomato">
									<Typography variant="h5">jaza fomu kukamilisha utumaji ramani</Typography>
								</Box>
								<Box
									display="grid"
									gap="30px"
									gridTemplateColumns="repeat(4, minmax(0, 1fr))"
									sx={{
										'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
									}}
									color="#fff"
								>
									<TextField
										fullWidth
										variant="filled"
										type="text"
										label="jina mtumaji"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.userName}
										name="userName"
										error={!!touched.userName && !!errors.userName}
										helperText={touched.userName && errors.userName}
										sx={{ gridColumn: 'span 4' }}
									/>
									<TextField
										fullWidth
										variant="filled"
										type="text"
										label="mkoa"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.region}
										name="region"
										error={!!touched.region && !!errors.region}
										helperText={touched.region && errors.region}
										sx={{ gridColumn: 'span 2' }}
									/>

									<TextField
										fullWidth
										variant="filled"
										type="text"
										label="wilaya"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.district}
										name="district"
										error={!!touched.district && !!errors.district}
										helperText={touched.district && errors.district}
										sx={{ gridColumn: 'span 2' }}
									/>
									<TextField
										fullWidth
										variant="filled"
										type="text"
										label="ward"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.ward}
										name="ward"
										error={!!touched.ward && !!errors.ward}
										helperText={touched.ward && errors.ward}
										sx={{ gridColumn: 'span 2' }}
									/>
									<TextField
										fullWidth
										variant="filled"
										type="date"
										label="kuanza ujenzi"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.startConstruction}
										name="startConstruction"
										error={!!touched.startConstruction && !!errors.startConstruction}
										helperText={touched.startConstruction && errors.startConstruction}
										sx={{ gridColumn: 'span 2' }}
									/>
									<TextField
										fullWidth
										variant="filled"
										type="text"
										label="maelezo kuhusu nyumba yako na ramani uliotuma"
										multiline
										rows={4}
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.desc}
										name="desc"
										error={!!touched.desc && !!errors.desc}
										helperText={touched.desc && errors.desc}
										sx={{ gridColumn: 'span 4' }}
									/>
								</Box>
								<Box display="flex" justifyContent="end" mt="20px" columnGap="10px">
									<Button
										color="primary"
										variant="contained"
										onClick={() => window.location.reload()}
									>
										cancel
									</Button>
									<Button type="submit" color="secondary" variant="contained">
										save
									</Button>
								</Box>
							</form>
						)}
					</Formik>
				)}
			</Box>
		</Box>
	);
};

const checkoutSchema = yup.object().shape({
	userName: yup.string().required('inahitaji'),
	region: yup.string().required('inahitaji'),
	district: yup.string().required('inahitaji'),
	ward: yup.string().required('inahitaji'),
	startConstruction: yup.string().required('inahitaji'),
	desc: yup.string().required('inahitaji')
});
const initialValues = {
	userName: '',
	region: '',
	district: '',
	ward: '',
	startConstruction: '',
	desc: ''
};

export default SendMapForm;
