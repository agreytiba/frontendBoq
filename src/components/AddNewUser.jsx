import { Box, Button, TextField,FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {  createUser} from "../redux/auth/authSlice";

const AddNewUser = ({ setShowAddForm }) => {
    
    const { isSuccess,isError,message} = useSelector((state)=>state.auth)
//   initialize useDispatch
    const dispatch = useDispatch()
  const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
    console.log(values)
      
      if (isError) {
        toast.error(message)
      }
      if(isSuccess) {
         dispatch(createUser(values))
        setShowAddForm(false)
        toast.success("user added successful")
        window.location.reload()
      }
      else {
        toast.error("failed to create the user")
      }
      
  };
  return (
    <Box p="20px" backgroundColor="#ddd" maxWidth="800px" >
      <Header title="Add New User" subtitle="add new user details" />

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
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
    
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
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />
         <FormControl fullWidth style={{width:"100%"}}>
								<InputLabel id="accessLevel">aina ya mtumiaji</InputLabel>
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
									<MenuItem value="typechecker"> mpanga michoro</MenuItem>
									<MenuItem value="unitchecker">mkagua vipimo</MenuItem>
									<MenuItem value="failedchecker">mfanya maboresho</MenuItem>
									<MenuItem value="pricetag">mpangaji bei</MenuItem>
									<MenuItem value="boq">mtengeneza boq</MenuItem>
							
								</Select>
							</FormControl>
         
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
         
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" columnGap="10px">
              <Button  color="primary" variant="contained" onClick={()=>setShowAddForm(false)}>
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
  );
};

const phoneRegExp =
  /^((\+[0-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  accessLevel: yup.string().required("required"),
  password: yup.string().required("required")
});
const initialValues = {
  name: "",
  email: "",
  phone: "",
  accessLevel: "",
  password:""
  
};

export default AddNewUser;
