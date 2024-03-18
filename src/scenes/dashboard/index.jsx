import { useEffect } from "react";
import { Alert, Box, Button, Grid, ListItem, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import {
  ArchitectureOutlined,
  Book,
  Collections,
  Error,
  Map,
  PagesOutlined,
  Person,
  PostAdd,
  ProductionQuantityLimits,
  ProductionQuantityLimitsTwoTone,
  Topic,
} from "@mui/icons-material";
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
  const [failedCount, setFailedCount] = useState(0);
  const [pangaRamaniCount, setPangaRemaniCount] = useState(0);
  const [vipimoCount, setVipimoCount] = useState(0);
  const [maboreshoCount, setMaboreshoCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
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
        const response = await axios.get(
          API_BASE_URL + "/api/maps/count",
          config
        ); // Adjust the API endpoint accordingly
        const maps = response.data;
        setMapCount(maps);
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
          API_BASE_URL + "/api/materials/count",
          config
        ); // Adjust the API endpoint accordingly
        const materials = response.data;
        setMatCount(materials);
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
        const response = await axios.get(
          API_BASE_URL + "/api/users/countCustomer",
          config
        ); // Adjust the API endpoint accordingly
        const users = response.data;
        setCustomerCount(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    const fetchUnderPangaRamani = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const response = await axios.get(
          API_BASE_URL + "/api/maps/typeCheck/count",
          config
        ); // Adjust the API endpoint accordingly
        setPangaRemaniCount(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    const fetchUnderVipimo = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const response = await axios.get(
          API_BASE_URL + "/api/maps/unitCheck/count",
          config
        ); // Adjust the API endpoint accordingly
        setVipimoCount(response.data);
      } catch (error) {
        console.error("Error fetching type check:", error);
      }
    };
    const fetchUnderBoqCreate = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const response = await axios.get(
          API_BASE_URL + "/api/maps/successful/count",
          config
        ); // Adjust the API endpoint accordingly
        setVipimoCount(response.data);
      } catch (error) {
        console.error("Error fetching type check:", error);
      }
    };
    const fetchFailed = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const response = await axios.get(
          API_BASE_URL + "/api/maps/failed/count",
          config
        ); // Adjust the API endpoint accordingly
        setFailedCount(response.data);
      } catch (error) {
        console.error("Error fetching failed count:", error);
      }
    };
    const fetchCountMaboresho = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const response = await axios.get(
          API_BASE_URL + "/api/maps/failed/count",
          config
        ); // Adjust the API endpoint accordingly
        setMaboreshoCount(response.data);
      } catch (error) {
        console.error("Error fetching maboresho count:", error);
      }
    };
    const fetchCountPosts = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const response = await axios.get(
          API_BASE_URL + "/api/blog/count",
          config
        ); // Adjust the API endpoint accordingly
        setPostsCount(response.data);
      } catch (error) {
        console.error("Error fetching maboresho count:", error);
      }
    };
    fetchCountPosts();
    fetchMaps();
    fetchMaterials();
    fetchUsers();
    fetchUnderPangaRamani();
    fetchUnderVipimo();
    fetchUnderBoqCreate();
    fetchFailed();
    fetchCountMaboresho();
  }, []);

  return (
    <Box
      p="20px"
      position="relative"
      boxShadow={`0 4px 12px rgba(0,0,0,0.3)`}
      borderRadius={`10px`}
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="10px" textAlign={`center`}>
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
          <Link to="/ramani" style={{ textDecoration: `none` }}>
            <StatBox
              title={mapCount}
              subtitle="Ramani"
              icon={
                <Book
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Link>
        </Grid>

        <Grid sm={6} md={3.5}>
          <Link to="/pangaramani" style={{ textDecoration: `none` }}>
            <StatBox
              title={pangaRamaniCount}
              subtitle="Panga Ramani"
              icon={
                <Map
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Link>
        </Grid>

        <Grid sm={6} md={3.5}>
          <Link to="/boq" style={{ textDecoration: `none` }}>
            <StatBox
              title="20"
              subtitle="Kwenye Boq"
              icon={
                <PagesOutlined
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/vipimo" style={{ textDecoration: `none` }}>
            <StatBox
              title={vipimoCount}
              subtitle="Kwenye Vipimo"
              icon={
                <ArchitectureOutlined
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/suggestion" style={{ textDecoration: `none` }}>
            <StatBox
              title={maboreshoCount}
              subtitle="Kwenye Maboresho"
              icon={
                <Collections
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/failed" style={{ textDecoration: `none` }}>
            <StatBox title={failedCount} subtitle="Zilizo Faili"
              icon={
                <Error
                  sx={{ color: `red`, fontSize: "26px" }}
                />
              }
            />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/bidhaa" style={{ textDecoration: `none` }}>
            <StatBox
              title={matCount}
              subtitle="Bidhaa"
              icon={
                <ProductionQuantityLimitsTwoTone
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/users" style={{ textDecoration: `none` }}>
            <StatBox title={customerCount} subtitle="Wateja"
                  icon={
                <Person
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/blog" style={{ textDecoration: `none` }}>
            <StatBox title={postsCount} subtitle="Blog Posts"
                  icon={
                <PostAdd
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
