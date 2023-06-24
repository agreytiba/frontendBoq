import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataAppointment} from "../../data/mockData";
import { useTheme } from "@mui/material";
import AppointmentsForm from "../../components/AppointmentForm";
import AppointmentsList from "../../components/AppointmentList";

const Appointments = () => {

  return (
    <Box m="20px">
      <Header title="make appointment" subtitle="Fill the form below to make appointment" />

      <AppointmentsForm/>
      <AppointmentsList
        data={mockDataAppointment}
      />
    </Box>
   
  );
};

export default Appointments;
