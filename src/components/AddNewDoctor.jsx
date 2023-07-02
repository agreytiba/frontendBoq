import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createDoctor } from "../redux/doctor/doctorSlices";

const AddNewDoctor = ({ setShowAddForm }) => {
    

    const {doctors, isSuccess,isError,message} = useSelector((state)=>state.doctor)
//   initialize useDispatch
    const dispatch = useDispatch()
  const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
    console.log(values)
      
  try {
      dispatch(createDoctor(values))
      setShowAddForm(false)
      toast.success("doctor added successful")
  } catch (error) {
    
  }
      
  };
console.log()
  return (
    <Box p="20px" backgroundColor="#ddd">
      <Header title="Add New Doctor" subtitle="add new doctor details" />

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
                label="doctor Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.doctorName}
                name="doctorName"
                error={!!touched.doctorName && !!errors.doctorName}
                helperText={touched.doctorName && errors.doctorName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="registrar number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerId}
                name="registerId"
                error={!!touched.registerId && !!errors.registerId}
                helperText={touched.registerId && errors.registerId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label=" working status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.workingStatus}
                name="workingStatus"
                error={!!touched.workingStatus && !!errors.workingStatus}
                helperText={touched.workingStatus && errors.workingStatus}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
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
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  doctorName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  registerId: yup.string().required("required")
});
const initialValues = {
  doctorName: "",
  email: "",
  phone: "",
  registerId: "",
    workingStatus: "",
  department:"",
};

export default AddNewDoctor;
