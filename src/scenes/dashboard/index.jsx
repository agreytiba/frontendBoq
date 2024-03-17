import { useEffect } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { Book, PagesOutlined, Topic } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../confing.js/baseUrl";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [mapCount, setMapCount] = useState(0);
  const [matCount, setMatCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [workersCount, setWorkersCount] = useState(0);
  // colors themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //  initial use navigate
  const navigate = useNavigate();

  //  get user from session store
  const user = JSON.parse(sessionStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
  useEffect(() => {
    // Fetch all maps and count them
    const fetchMaps = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(API_BASE_URL + "/api/maps", config); // Adjust the API endpoint accordingly
        const maps = response.data;
        setMapCount(maps.length);
      } catch (error) {
        console.error("Error fetching maps:", error);
      }
    };
    const fetchMaterials = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(
          API_BASE_URL + "/api/materials",
          config
        ); // Adjust the API endpoint accordingly
        const materials = response.data;
        setMatCount(materials.length);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const response = await axios.get(API_BASE_URL + "/api/users", config); // Adjust the API endpoint accordingly
        const users = response.data;
        setUsersCount(users.length);
        //   get all customer
        const filterUsers = users.filter((user) => user.accessLevel === "user");
        setCustomerCount(filterUsers.length);
        //   get all workers
        const filterWorkers = users.filter(
          (user) => user.accessLevel !== "user"
        );
        setWorkersCount(filterWorkers.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchMaps();
    fetchMaterials();
    fetchUsers();
  }, []);

  return (
    <Box p="20px" position="relative" boxShadow={`0 4px 12px rgba(0,0,0,0.3)`} borderRadius={`10px`}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="10px"  textAlign={`center`}>
          <Header title="DASHBOARD" subtitle="" />
          <Typography variant="h5" marginY={`10px`}>
            Umeingia kwenye mfumo kwa jina{" "}
            <span style={{ color: "blue", textTransform: "uppercase" }}>
              {user?.name}
            </span>
          </Typography>
        </Box>
      </Box>

    
      <Grid container gap={`15px`}>
        <Grid sm={6} md={3.5}>
          <Link to="/ramani" style={{textDecoration:`none`}}>
          <StatBox
            title={mapCount}
            subtitle="ramani"

            // icon={<PagesOutlined sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
       </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
           <Link to="/bidhaa" style={{textDecoration:`none`}}>
          <StatBox
            title={matCount}
            subtitle="bidhaa"
            icon={
              <Topic
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          /></Link>
        </Grid>
        <Grid sm={6} md={3.5}>
           <Link to="/users" style={{textDecoration:`none`}}>
            <StatBox title={customerCount} subtitle="wateja" />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
           <Link to="/dashboard" style={{textDecoration:`none`}}>
          <StatBox
            title="3"
            subtitle="watoa huduma"
            icon={
              <Book sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
            }
            />
          </Link>
    </Grid>
   
        <Grid sm={6} md={3.5}>
           <Link to="/boq" style={{textDecoration:`none`}}>
          <StatBox
            title="20"
            subtitle="BOQ"
            icon={
              <PagesOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          /></Link>
        </Grid>
        <Grid sm={6} md={3.5}>
           <Link to="/users" style={{textDecoration:`none`}}>
          <StatBox
            title={workersCount}
            subtitle="huduma kwa wateja"
            icon={
              <Topic
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          /></Link>
      </Grid>
        <Grid sm={6} md={3.5}>
           <Link to="/dashboard" style={{textDecoration:`none`}}>
            <StatBox title={usersCount} subtitle="watumiaji  mfumo" />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
           <Link to="/dashboard" style={{textDecoration:`none`}}>
          <StatBox title="40" subtitle="fedha" /></Link>
     </Grid>
    </Grid>
    </Box>
  );
};

export default Dashboard;
