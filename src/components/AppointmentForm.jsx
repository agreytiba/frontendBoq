import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const AppointmentsForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="20px">
     

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
              color="#fff"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="patient name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.patientName}
                name="patientName"
                error={!!touched.patientName && !!errors.patientName}
                helperText={touched.patientName && errors.patientName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label=" Doctor Name"
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
                type="date"
                label="appointment date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="appointment time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="time"
                error={!!touched.time && !!errors.time}
                helperText={touched.time && errors.time}
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
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="reason for appointment"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.desc}
                name="desc"
                error={!!touched.desc && !!errors.desc}
                helperText={touched.desc && errors.desc}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
             <Box display="flex" justifyContent="flex-end" mt="20px" >
               <Button type="submit" color="primary" variant="contained">
                Add Appointment
              </Button>
           </Box>
           
          </form>
        )}
      </Formik>

    </Box>
   
  );
};

const checkoutSchema = yup.object().shape({
  patientName: yup.string().required("required"),
  doctorName: yup.string().required("required"),
  date: yup.string().required("required"),
  time: yup
    .string()
    .required("required"),
  department: yup.string().required("required"),
  desc: yup.string().required("required"),
});
const initialValues = {
  patientName: "",
  doctorName: "",
  date: "",
  time: "",
  department: "",
  desc: "",
};

export default AppointmentsForm;
