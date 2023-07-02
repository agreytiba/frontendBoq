import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockDoctors, mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 // get user from local 
  const user = JSON.parse(localStorage.getItem('user'));
  
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
            title="30"
            subtitle="New patient"
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
            title="10"
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
            title="10"
            subtitle="Today operation"
          
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
            subtitle="available room"
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
          {mockDoctors.map((doctor, i) => (
            <Box
              key={`${doctor.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {doctor.id}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {doctor.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{doctor.age}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {doctor.dept}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          marginTop="30px"
        >
          <Typography variant="h5" fontWeight="600">
             new patient list
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
          marginY="30px"
          >
            list of patient on the system
          </Box>
        </Box>
        
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
           appointments
          </Typography>
          <Box height="100px">
           
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
