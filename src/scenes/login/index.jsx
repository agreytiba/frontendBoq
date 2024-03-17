
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../redux/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from "../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
 const navigate =useNavigate()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

 useEffect(() => {
    if (isError) {
     toast.error(message);
    }	
    if (isSuccess && user) {
      navigate('/')
    }


   
  }, [user, isError, isSuccess, message, navigate, dispatch])
  

  const handleFormSubmit = (values) => {
    dispatch(login(values));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box m="20px" display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <Box    style={{
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              width: '350px',
              paddingBlock: '20px',
              borderRadius: '10px'
            }}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
         
          >
            <Typography variant="h2" textAlign="center">
              Login
            </Typography>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            //   sx={{
            //     '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
            //   }}
              color="#fff"
              padding="20px"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
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
                type={showPassword ? 'text' : 'password'}
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt="20px" padding="20px">
              <Button
                type="submit"

                variant="contained"
                style={{ width: '100%', height: '40px', color: '#fff', backgroundColor:`#3498db` }}
              >
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
       <Typography p='20px' fontWeight={'400'} > kama hauna account? <Link to="/register" style={{fontWeight:"bold"}}>Jisajiri</Link></Typography>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup
    .string()
    .required('Required'),
});

const initialValues = {
  email: '',
  password: ''
};

export default Login;
