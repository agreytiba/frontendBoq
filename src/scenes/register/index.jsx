import { Box} from "@mui/material";
import Header from "../../components/Header";
import RegisterForm from "../../components/RegisterForm";
const Register = () => {


  return (
    <Box m="20px" >
      <Header title="Register pateint" subtitle="register patient to our system" />

      <RegisterForm/>
    </Box>
  );
};



export default Register;
