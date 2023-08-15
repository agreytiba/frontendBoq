import { useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../redux/auth/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
  const navigate = useNavigate()
  const dispatch = useDispatch()

	// get all  properties from react reduc state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
	)
// const me= localStorage.getItem("user")
 useEffect(() => {
    if (isError) {
     toast.error(message);
    }

	
    if ((isSuccess || user?.token)&&( (user?.accessLevel) === "admin")) {
      navigate('/dashboard')
    }
    if ((isSuccess || user?.token)&&( (user?.accessLevel) === "user")) {
      navigate('/mteja')
    }
    if ((isSuccess || user?.token)&&( (user?.accessLevel) === "boq")) {
      navigate('/boq')
    }
    if ((isSuccess || user?.token)&&( (user?.accessLevel) === "typechecker")) {
      navigate('/pangaramani')
    }
    if ((isSuccess || user?.token)&&( (user?.accessLevel) === "unitchecker")) {
      navigate('/vipimo')
    }
    if ((isSuccess || user?.token)&&( (user?.accessLevel) === "failedchecker")) {
      navigate('/suggestion')
    }
    if ((isSuccess || user?.token)&&( (user?.accessLevel) === "pricetag")) {
      navigate('/bidhaa')
    }
    if ((isSuccess || user?.token)&&( (user?.accessLevel) === "seller")) {
      navigate('/mtoahuduma')
    }

   
  }, [user, isError, isSuccess, message, navigate, dispatch])
  
 
//  handle submission of the form
	const handleFormSubmit = (values) => {

		dispatch(login(values))
	
	};
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
if (isLoading) {
	return <h1>loading ....</h1>
}
	return (
		<Box m="20px" display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Formik onSubmit={handleFormSubmit}
				initialValues={initialValues}
				validationSchema={checkoutSchema}>
				{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
					<form
						onSubmit={handleSubmit}
						style={{
							boxShadow: '0 0 10px #000',
							width: '350px',
							paddingBlock: '20px',
							borderRadius: '10px'
						}}
					>
						<Typography variant="h2" textAlign="center">
							Login
						</Typography>
						<Box
							display="grid"
							gap="30px"
							gridTemplateColumns="repeat(4, minmax(0, 1fr))"
							sx={{
								'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
							}}
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
							<TextField
								fullWidth
								variant="filled"
								type="password"
								label="password"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								name="password"
								error={!!touched.password && !!errors.password}
								helperText={touched.password && errors.password}
								sx={{ gridColumn: 'span 4' }}
							/>
						</Box>
						<Box display="flex" justifyContent="flex-end" mt="20px" padding="20px">
							<Button
								type="submit"
								color="firstColor"
								variant="contained"
								style={{ width: '100%', height: '40px', color: '#000' }}
							>
								Login
							</Button>
						</Box>
						<Box display="flex" justifyContent="center" mt="10px" padding="10px">
				        <Link to="/forgot"> nimesahau password</Link>
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
	password: ''
};

export default Login;
