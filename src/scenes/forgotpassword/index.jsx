import { useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { toast } from 'react-toastify';

const ForgotPassword = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
  const navigate = useNavigate()
  const dispatch = useDispatch()


//  handle submission of the form
	const handleFormSubmit = (values) => {

	};
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box m="20px" display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Formik onSubmit={handleFormSubmit}
				initialValues={initialValues}
				validationSchema={checkoutSchema}>
				{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
					<form
						onSubmit={handleSubmit}
						style={{
							
							width: '350px',
					       border:"1px solid #333",
							borderRadius: '10px',
							padding:"20px"
						}}
					>
						<Typography variant="h5" textAlign="center">
							weka email uliotumia kujisajiri kwenye mfumo
						</Typography>
						<Box
							
							color="#fff"
							padding="20px"
						>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="email"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.email}
								name="email"
								error={!!touched.email && !!errors.email}
								helperText={touched.email && errors.email}
								sx={{ gridColumn: 'span 4' }}
							/>
					
						</Box>
						<Box display="flex" justifyContent="flex-end"  padding="10px">
							<Button
								type="submit"
								color="firstColor"
								variant="contained"
								style={{ width: '100px', height: '40px', color: '#fff' }}
							>
								submit
							</Button>
						</Box>
						<Box display="flex" justifyContent="center" mt="10px" padding="10px">
				        <Link to="/forgotpassword"> nimesahau password</Link>
			        </Box>
					</form>
				)}
			</Formik>
			
		</Box>
	);
};

const passwordRegExp = /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/;
const checkoutSchema = yup.object().shape({
	email: yup.string().email('invalid email').required('required'),
	password: yup
		.string()
		.required('required')
});
const initialValues = {
	email: '',
};

export default ForgotPassword;
