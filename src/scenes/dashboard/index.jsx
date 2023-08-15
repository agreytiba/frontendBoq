import { useContext } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import StatBox from '../../components/StatBox';
import { Book, PagesOutlined, Topic } from '@mui/icons-material';
import { useState } from 'react';



const Dashboard = () => {
	// colors themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// get user from local
	const user = JSON.parse(sessionStorage.getItem('user'));

	return (
		<Box m="20px" position="relative">
			{/* HEADER */}
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Box mb="10px">
					<Header title="DASHBOARD" subtitle="" />
					<Typography variant="h5">
						 umeingia kwenye mfumo kwa jina <span style={{ color: 'blue', textTransform:"uppercase" }}>{user.name }</span>
					</Typography>
				</Box>
			</Box>

			{/* GRID & CHARTS */}
			<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px" sx={{}}>
				{/* ROW 1 */}
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title="20"
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
				>
					<StatBox
						title="23"
						subtitle="bidhaa"
						icon={<Topic sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox title="50" subtitle="wateja" />
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
						icon={<Book sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
					/>
				</Box>

				
				
			</Box>
			{/* row 2  BARCHART
		      <Box height="300px" mt="10px">
				<BarChart />
				
          </Box> */}
			<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px" sx={{}}>
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
						icon={<PagesOutlined sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
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
						title="23"
						subtitle="huduma kwa wateja"
						icon={<Topic sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox title="80" subtitle="watumiaji  mfumo" />
				</Box>
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title="40"
						subtitle="fedha"
						
					/>
				</Box>

				<Box display="center" justifyContent="flex-end" alignItems="center" mt="20px" width="100px">
				
				</Box>
				
			</Box>

	
		</Box>
	);
};

export default Dashboard;
