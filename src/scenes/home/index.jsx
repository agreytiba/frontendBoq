import { List, ListItem, ListItemText, Typography, Box, Button } from '@mui/material';
import React from 'react';
import CustomerDrawing from '../../components/CustomerDrawing';
import { Link } from 'react-router-dom';
const Home = () => {
	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			<Box width="80%"  >
				<Box display="flex" justifyContent="space-between" my="25px" flexWrap="wrap" rowGap="2rem">
					<Box>
						<Typography variant="h3" style={{ fontWeight: 'bold' }}>
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
						<Typography variant="h5" style={{ fontWeight: 'bold' }}>
							HUDUMA HII NI BURE
						</Typography>
					</Box>
					<Box alignSelf="center">
						<Link to="/register">
							<Button color="primary" variant="contained" style={{ width: '150px', height: '50px' }}>
								JISAJIRI
							</Button>
						</Link>
					</Box>
					<Box>
						<Typography variant="h3" style={{ fontWeight: 'bold' }}>
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
						<Typography variant="h5" style={{ fontWeight: 'bold' }}>
							HUDUMA HII NI BURE
						</Typography>
					</Box>
				</Box>
				<Box>
					<Box py="3rem" border="1px solid #333" px="10px" borderRadius="10px">
						<Typography variant="h3" textAlign="center" style={{ marginBlock: '5px' }}>
							Ramani zilizotumwa
						</Typography>
						<CustomerDrawing />
					</Box>
					<Box py="2rem" mt="1.5rem" border="1px solid #333" px="10px" borderRadius="10px">
						<Typography variant="h3" textAlign="center">
							Boq zilizokamilika
						</Typography>
						<CustomerDrawing />
					</Box>
        </Box>
        	<Box height="100px" backgroundColor="#333" mt="20px" color="#fff">
				<List style={{ display: 'flex' }}>
					<ListItem>
						<ListItemText primary="privacy" />
					</ListItem>
					<ListItem>
						<ListItemText primary="terms" />
					</ListItem>
					<ListItem>
						<ListItemText primary="contact" />
					</ListItem>
				</List>
			</Box>
			</Box>
		
		</Box>
	);
};

export default Home;
