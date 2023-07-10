import { useEffect } from "react";
import { Box, Button, TextField, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPatients} from "../redux/patient/patientSlice";
import { getDoctors } from "../redux/doctor/doctorSlices";
const AppointmentsForm = ({}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");


   // initiliaze useDispatch && useNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate()

//  useSelector  containe properties from patientSlice
  const { patients } = useSelector(
    (state) => state.patient
  )
//  useSelector  containe properties from doctorSlice
  const { doctors } = useSelector(
    (state) => state.doctor
  )

  // useEffect to fetch all the patients
  useEffect(() => {
    dispatch(getPatients())
    dispatch(getDoctors())
   
  }, [ navigate, dispatch])

  // handle submit data from  the form
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  //color themes
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
      
        <FormControl>
          <InputLabel>patient Name</InputLabel>
          <Field name="patientName" as={Select} label="patient name">
            {patients.map((patient) => (
              <MenuItem key={patient._id} value={patient._id}>
                {patient.patientName}
              </MenuItem>
            ))}
          </Field>
        </FormControl>


           

          <FormControl>
          <InputLabel>Doctor Name</InputLabel>
          <Field name="doctorName" as={Select} label="doctor name" >
            {doctors?.map((doctor) => (
              <MenuItem key={doctor._id} value={doctor._id}>
                {doctor.doctorName}
              </MenuItem>
            ))}
          </Field>
        </FormControl>
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
                type="time"
                label="start time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startTime}
                name="startTime"
                error={!!touched.startTime && !!errors.startTime}
                helperText={touched.startTime && errors.startTime}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="time"
                label="end time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endStart}
                name="endTime"
                error={!!touched.endTime && !!errors.endTime}
                helperText={touched.endTime && errors.endTime}
                sx={{ gridColumn: "span 1" }}
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
 
  date: yup.string().required("required"),
  department: yup.string().required("required"),
  desc: yup.string().required("required"),
  startTime: yup.string().required("requried"),
  endTime: yup.string().required("required")
});
const initialValues = {
  patientName: "",
  doctorName: "",
  date: "",
  startTime: "",
  endTime:"",
  department: "",
  desc: "",
};

export default AppointmentsForm;
