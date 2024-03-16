import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Grid
        container
        item
        alignItems={`center`}
        justifyContent={`space-between`}
        height={`90vh`}
      >
        <Grid sm={12} md={6}>
          <Box lineHeight={`4`}>
            <Typography variant="h2" sx={{ color: `#3498db`, marginY: `10px` }}>
              Unahitaji kujenga nyumba? Fahamu gharama za kujenga bure.
            </Typography>
            <Typography variant="h5" marginY={`10px`}>
              Hapa utafaha mu gharama za kujenga pamoja na wauzaji wa bidhaa kwa
              gharama elekezi.
            </Typography>

            <Button
              variant="contained"
              color="success"
              sx={{ height: `45px`, width: `50%` }}
            >
              Register Now
            </Button>
          </Box>
        </Grid>
        <Grid sm={12} md={4} item>
          <Box marginTop={`10%`}>
            <img
              src="image/hero-img.png"
              class="img-fluid"
              alt="home"
              style={{ width: `350px`, height: `300px` }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="space-between"
        my="25px"
        flexWrap="wrap"
        rowGap="2rem"
        px={2}
        py={6}
        boxShadow={`0 3px 10px rgba(0,0,0,0.2)`}
        color={`#fff`}
        sx={{backgroundColor:`#444`}}
      >
        <Box>
          <Typography variant="h4" style={{ fontWeight: "bold" ,color:`#3498db`}}>
            KUPATA MAKADILIO(BOQ)
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="1. JISAJIRI" />
            </ListItem>
            <ListItem>
              <ListItemText primary="2. TUMA RAMANI" />
            </ListItem>
            <ListItem>
              <ListItemText primary="3. SUBIRI BOQ IKAMILIKE" />
            </ListItem>
          </List>
          <Typography variant="h5" style={{ fontWeight: "bold" ,color:`#3498db`}}>
            HUDUMA HII NI BURE
          </Typography>
        </Box>
        {/* <Box alignSelf={`center`} >
          <Button variant="contained" sx={{width:`200px`, height:`50px`}} color="success">Jisajiri</Button>
</Box> */}
        <Box>
          <Typography variant="h3" style={{ fontWeight: "bold" ,color:`#3498db`}}>
            KUTOA HUDUMA
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="1. JISAJIRI" />
            </ListItem>
            <ListItem>
              <ListItemText primary="2. TUMA TAARIFA ZA HUDUMA" />
            </ListItem>
            <ListItem>
              <ListItemText primary="3. SUBIRI KAZI IKIPATIKANA" />
            </ListItem>
          </List>
          <Typography variant="h5" style={{ fontWeight: "bold" ,color:`#3498db`}}>
            HUDUMA HII NI BURE
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
