import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import AddNewPatient from "../../components/AddNewPatient";
import PatientList from "../../components/PatientList";


const Patients = () => {

//  useState to show  add patient form
  const [showAddForm, setShowAddForm] = useState(false)
  // colors themes 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  return (
    <Box m="20px" position="relative">
      <Header
        title="patient"
        subtitle="List Of  Patient Details"
      />
   
      <Box display="center" justifyContent="flex-end" alignItems="center" mt="20px" >
        <Button style={{backgroundColor:"rgb(0,0,255)", color:"#fff"}} onClick={()=>setShowAddForm(true)}>New</Button>
      </Box>

      <Box>
        <Typography variant="h4"> appointments history </Typography>
        <p>lists of appointments made by the user</p>
      </Box>
      <Box>
        <PatientList />
      </Box>
      {
        showAddForm &&
        <Box position="absolute" top="0" left="0" p="20px" right="0" backgroundColor="rgba(0,0,0,0.5)" minHeight="100vh">
          
              <AddNewPatient setShowAddForm={setShowAddForm} />
            
      </Box>
      }
      
    </Box>
  );
};

export default Patients;
