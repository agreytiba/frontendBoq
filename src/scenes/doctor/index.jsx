import { useState } from "react";
import { Box, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import AddNewDoctor from "../../components/AddNewDoctor";
import DoctorsList from "../../components/DoctorsList";
const Doctor = () => {
  //  useState for display add doctor form
  const [showAddForm, setShowAddForm] = useState(false)
  
  // color themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" position="relative">
      <Header
        title="Doctor"
        subtitle="List of  doctors"
      />
      <Box display="center" justifyContent="flex-end" alignItems="center" mt="20px" >
        <Button style={{backgroundColor:"rgb(0,0,255)", color:"#fff"}} onClick={()=>setShowAddForm(true)}>New</Button>
      </Box>
      <DoctorsList/>
          {
        showAddForm &&
        <Box position="absolute" top="0" left="0" p="20px" right="0" backgroundColor="rgba(0,0,0,0.5)" minHeight="100vh">
          
              <AddNewDoctor setShowAddForm={setShowAddForm} />
            
      </Box>
      }
    </Box>
  );
};

export default Doctor;
