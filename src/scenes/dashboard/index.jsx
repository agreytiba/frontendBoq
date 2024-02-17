import { useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { Book, PagesOutlined, Topic } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../confing.js/baseUrl";

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
            Authorization: `Bearer ${user.token}`,
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
    <Box m="20px" position="relative">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="10px">
          <Header title="DASHBOARD" subtitle="" />
          <Typography variant="h5">
            umeingia kwenye mfumo kwa jina{" "}
            <span style={{ color: "blue", textTransform: "uppercase" }}>
              {user.name}
            </span>
          </Typography>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        sx={{}}
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => {
            navigate("/maps");
          }}
        >
          <StatBox
            title={mapCount}
            subtitle="ramani"

            // icon={<PagesOutlined sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => {
            navigate("/bidhaa");
          }}
        >
          <StatBox
            title={matCount}
            subtitle="bidhaa"
            icon={
              <Topic
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
          <StatBox title={customerCount} subtitle="wateja" />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3"
            subtitle="watoa huduma"
            icon={
              <Book sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
            }
          />
        </Box>
      </Box>
      {/* row 2  BARCHART
		      <Box height="300px" mt="10px">
				<BarChart />
				
          </Box> */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        sx={{}}
      >
        {/* ROW  3*/}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="20"
            subtitle="BOQ"
            icon={
              <PagesOutlined
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
            title={workersCount}
            subtitle="huduma kwa wateja"
            icon={
              <Topic
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
          onClick={() => {
            navigate("/users");
          }}
        >
          <StatBox title={usersCount} subtitle="watumiaji  mfumo" />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox title="40" subtitle="fedha" />
        </Box>

        <Box
          display="center"
          justifyContent="flex-end"
          alignItems="center"
          mt="20px"
          width="100px"
        ></Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
