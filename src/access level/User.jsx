import { Box} from "@mui/material";
import Header from "../components/Header";
import AppointmentsForm from "../components/AppointmentForm";
import AppointmentsList from "../components/AppointmentList";
import { mockDataAppointment} from "../data/mockData";

const User = () => {

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

export default User;
