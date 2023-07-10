
import { Box } from "@mui/material";
import Header from "../../components/Header";
import AppointmentsForm from "../../components/AppointmentForm";
import AppointmentsList from "../../components/AppointmentList";
const Appointments = () => {
  
  return (
    <Box m="20px">
      <Box>
      <Header title="make appointment" subtitle="Fill the form below to make appointment" />
      </Box>
      <AppointmentsForm />
       <Box borderTop="2px #000 solid" mt="30px" p="15px">
          <Header title="list of appointment" subtitle="list of appointment attended or on wait" />
         
        <AppointmentsList />
        </Box>
    </Box>
   
  );
};

export default Appointments;
