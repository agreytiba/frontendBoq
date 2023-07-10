import { useContext } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockDoctors } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import { useEffect } from "react";
import {toast} from "react-toastify"
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import {getPatients, reset} from "../../redux/patient/patientSlice"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../useContextApi/AppContext";
import PatientList from "../../components/PatientList";
import DoctorsList from "../../components/DoctorsList";
import AppointmentsList from "../../components/AppointmentList";

const Dashboard = () => {
  // colors themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 // get user from local 
  const user = JSON.parse(localStorage.getItem('user'));
    // use context api
  const { totalPatients,totalDoctors,totalAppoints } = useContext(AppContext);
  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="10px">
            <Header title="DASHBOARD" subtitle=""/>
            <Typography variant="h5">Welcome <span style={{color:"blue"}}>{user?.name}</span> to your dashboard</Typography>
        
        </Box>

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalPatients}
            subtitle="Patient"
           icon={
              <PeopleOutlineIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalDoctors}
            subtitle="Our Doctors"
            icon={
              <SupervisorAccountIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalAppoints}
            subtitle="Appointment"
          
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="20"
            subtitle="Todos"
            icon={
              <AirlineSeatFlatIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
      
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Activity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true}  />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
           display="none"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
           
          >
            <Typography color={colors.grey[400]} variant="h5" fontWeight="600">
              List of Doctors
            </Typography>
          </Box>
         
          <DoctorsList/>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="hidden"
          p="20px"
          mt="20px"
        >
          <Typography variant="h5" fontWeight="600">
             patient list
          </Typography>
          <Box
         
          >
          <PatientList/>
          </Box>
        </Box>
        
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="hidden"
          p="20px"
          mt="20px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
           appointments
          </Typography>
          <Box  >
           <AppointmentsList/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
