import { useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate} from "react-router-dom"
import { AddProvider } from '../redux/provider/providerSlice';
import Spinner from "./Spinner"
import {toast} from "react-toastify"
const ProviderInfoForm = ({ setShowSendForm }) => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

		// initiliaze useDispatch && useNavigate
  const dispatch = useDispatch()
  const navigate = useNavigate()
	//useSelector  containe properties from authSlice
  const {provider, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.provider
	)



	const handleFormSubmit = (values) => {
	try {
		dispatch(AddProvider(values))
		setShowSendForm(false);
	} catch (error) {
		toast.success(error)
	}
		
	};
	if (isLoading) {
		return <Spinner/>
	}
	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Box p="20px" backgroundColor="#ddd" borderRadius="10px" maxWidth="800px" minWidth="500px">
				<Box py="10px">
					<Typography variant="h3">taarifa za mtoa huduma</Typography>
				</Box>
				<Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
					{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
						<form onSubmit={handleSubmit}>
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
									label=" jina la biashara"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.name}
									name="name"
									error={!!touched.name && !!errors.name}
									helperText={touched.name && errors.name}
									sx={{ gridColumn: 'span 2' }}
								/>

								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="huduma unayotoa"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.serviceName}
									name="serviceName"
									error={!!touched.serviceName && !!errors.serviceName}
									helperText={touched.serviceName && errors.serviceName}
									sx={{ gridColumn: 'span 2' }}
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
									label="kata"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.area}
									name="area"
									error={!!touched.area && !!errors.area}
									helperText={touched.area && errors.area}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="maelezo ya zaida"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.desc}
									name="desc"
									error={!!touched.desc && !!errors.desc}
									helperText={touched.desc && errors.desc}
									sx={{ gridColumn: 'span 2' }}
								/>
							</Box>
							<Box display="flex" justifyContent="end" mt="20px" columnGap="10px">
								<Button color="primary" variant="contained" onClick={() => setShowSendForm(false)}>
									cancel
								</Button>
								<Button type="submit" color="secondary" variant="contained">
									save
								</Button>
							</Box>
						</form>
					)}
				</Formik>
			</Box>
		</Box>
	);
};

const checkoutSchema = yup.object().shape({
	name: yup.string().required('inahitaji'),
	serviceName: yup.string().required('inahitaji'),
	region: yup.string().required('inahitaji'),
	district: yup.string().required('inahitaji'),
	area: yup.string().required('inahitaji')
});
const initialValues = {
	name: '',
	serviceName: '',
	region: '',
	district: '',
	area: '',
	desc: ''
};

export default ProviderInfoForm;
