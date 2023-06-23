import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataAppointment} from "../../data/mockData";
import { useTheme } from "@mui/material";

const Appointments = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "patientName",
      headerName: "patient name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "doctorName",
      headerName: "Doctor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "appointmentDate",
      headerName: "appointment Date",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "reason",
      headerName: "reasons",
      flex: 1
    },
  ];

  return (
    <Box m="20px">
      <Header title="make appointment" subtitle="Fill the form below to make appointment" />

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
      <Box borderTop="2px #000 solid" mt="30px" p="20px">
        <Header title="list of appointment" subtitle="list of appointment attended or on wait" />
         <Box
        m="40px 0 0 0"
        height="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.grey[400],
            borderBottom: "none",
            color: "#fff"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor:"none",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataAppointment}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
        
      </Box>
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

export default Appointments;
