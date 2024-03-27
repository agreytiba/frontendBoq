import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../confing.js/baseUrl";
import { Book, Map, PagesOutlined, ArchitectureOutlined, Collections, Error, ProductionQuantityLimitsTwoTone, Person, PostAdd } from "@mui/icons-material";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
  const [mapCount, setMapCount] = useState(0);
  const [pangaRamaniCount, setPangaRamaniCount] = useState(0);
  const [vipimoCount, setVipimoCount] = useState(0);
  const [maboreshoCount, setMaboreshoCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [matCount, setMatCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  const navigate = useNavigate();

  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url);
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };
 const user = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    fetchData(`${API_BASE_URL}/api/maps/count`, setMapCount);
    fetchData(`${API_BASE_URL}/api/maps/typeCheck/count`, setPangaRamaniCount);
    fetchData(`${API_BASE_URL}/api/maps/unitCheck/count`, setVipimoCount);
    fetchData(`${API_BASE_URL}/api/maps/failed/count`, setFailedCount);
    fetchData(`${API_BASE_URL}/api/materials/count`, setMatCount);
    fetchData(`${API_BASE_URL}/api/users/countCustomer`, setCustomerCount);
    fetchData(`${API_BASE_URL}/api/blog/count`, setPostsCount);
    fetchData(`${API_BASE_URL}/api/maps/failedCheck/count`, setMaboreshoCount);
  }, []);
console.log(mapCount)
  return (
    <Box p="20px" position="relative" boxShadow={`0 4px 12px rgba(0,0,0,0.3)`} borderRadius={`10px`}>
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
      {/* <Grid container gap={`15px`}>
        <Grid sm={6} md={3.5}>
          <Link to="/ramani" style={{ textDecoration: `none` }}>
          
            <StatBox title={mapCount} subtitle="Ramani" icon={<Book />} />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/pangaramani" style={{ textDecoration: `none` }}>
           
            <StatBox title={pangaRamaniCount} subtitle="Panga Ramani" icon={<Map />} />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/boq" style={{ textDecoration: `none` }}>
            <StatBox title={pangaRamaniCount} subtitle="Kwenye Boq" icon={<PagesOutlined />} />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/vipimo" style={{ textDecoration: `none` }}>
            <StatBox title={vipimoCount} subtitle="Kwenye Vipimo" icon={<ArchitectureOutlined />} />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/suggestion" style={{ textDecoration: `none` }}>
            <StatBox title={maboreshoCount} subtitle="Kwenye Maboresho" icon={<ArchitectureOutlined />} />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/failed" style={{ textDecoration: `none` }}>
            
            <StatBox title={failedCount} subtitle="Zilizo Faili" icon={<Error />} />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/bidhaa" style={{ textDecoration: `none` }}>
            <StatBox title={matCount} subtitle="Bidhaa" icon={<ProductionQuantityLimitsTwoTone />} />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/users" style={{ textDecoration: `none` }}>
            <StatBox title={customerCount} subtitle="Wateja" icon={<Person />} />
          </Link>
        </Grid>
        <Grid sm={6} md={3.5}>
          <Link to="/blog" style={{ textDecoration: `none` }}>
            <StatBox title={postsCount} subtitle="Blog Posts" icon={<PostAdd />} />
          </Link>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default Dashboard;
