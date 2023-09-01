import { useEffect } from "react";
import { Box, Button, TextField,Select, FormControl,InputLabel,MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch,useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../../redux/auth/authSlice";
import {toast} from "react-toastify"
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";

const Register = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
// initiliaze useDispatch && useNavigate
    const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success("umefanikiwa kujisajiri")
      navigate('/')
    }

   
  return () => {
    dispatch(reset())
    }
    
    
  }, [user,isError,isSuccess, message, navigate, dispatch])


  const handleFormSubmit = (values) => {
    dispatch(register(values))

  };
  if (isLoading) {
    return <Spinner/>
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box>
<Header
        title="JISAJIRI"
      subtitle="Jaza fomu kujisajiri"/>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="user name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
                />
                 <FormControl fullWidth style={{width:"150px"}}>
								<InputLabel id="accessLevel">Huduma</InputLabel>
								<Select
                labelId="accessLevel"
                onBlur={handleBlur}
								onChange={handleChange}
								value={values.accessLevel}
								name="accessLevel"
						    error={!!touched.accessLevel && !!errors.accessLevel}
                helperText={touched.accessLevel && errors.accessLevel}
                sx={{ gridColumn: "span 4" }}
								
								>
							  <MenuItem   defaultValue="" disabled>select account</MenuItem>
									<MenuItem value="user">mteja</MenuItem>
									<MenuItem value="seller">Mtoa huduma</MenuItem>
									<MenuItem value="admin">Admin</MenuItem>
							
								</Select>
							</FormControl>
          
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
                />
               
           {/*        <TextField
                fullWidth
                variant="filled"
                type="text"
                label="access level"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.accessLevel}
                name="accessLevel"
                error={!!touched.accessLevel && !!errors.accessLevel}
                helperText={touched.accessLevel && errors.accessLevel}
                sx={{ gridColumn: "span 4" }}
                /> */}
            
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="confirm password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"

                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" >
                Jisajiri
              </Button>
            </Box>
          </form>
        )}
        </Formik>
        <Typography>ulishajisajiri? <Link to="/login" style={{fontWeight:"bold", textDecoration:"none", color:"#333"}}>Login</Link></Typography>
      </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  accessLevel:yup.string().required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'),null], 'password must match')
    .required("required")
});
const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  accessLevel:""
};

export default Register;
