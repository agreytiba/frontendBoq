import { useState } from 'react';
import { Box, useTheme, Button, Typography } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import CustomerDrawing from '../../components/CustomerDrawing';
import BlogPosts from '../../components/BlogPosts';
import BuyCollective from '../../components/BuyCollective';
import Upload from '../../components/Upload';
const UserPage = () => {

	// useState
	const [ showUpload, setShowUpload ] = useState(false);
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	// get user from local
	const user = JSON.parse(localStorage.getItem('user'));
	return (
		<Box p="20px">
			<Box>
				<Header title="Mteja" subtitle="" />
				<Typography variant="h5">
					karibu kwenye mfumo wetu
					
					<span style={{ color: 'blue', textTransform: 'uppercase', marginLeft:"5px" }}>{user.name}</span> karibu tukuhudumie
				</Typography>
			</Box>

			<Box minWidth="600px" p="10px" m="10px" border="1px solid #333">
				<Box>
					<Button
						style={{ backgroundColor: 'rgb(0,0,255)', color: '#fff' }}
						onClick={() => setShowUpload(true)}
					>
						TUMA RAMANI
					</Button>

                   
				</Box>

				<Box my="10px" textAlign="center">
					<Typography variant="h3">ulizotuma</Typography>{' '}
				</Box>
				<CustomerDrawing />
			</Box>

			{/* collective buy material */}
			<Box minWidth="600px" p="10px">
				
				<BuyCollective />
			</Box>

			{/* blog posts */}
			<Box my="4em">
				<Box textAlign="center" mb="1rem">
					<Typography variant="h2">Lastest blog posts</Typography>
				</Box>

				
				<Box border="1px solid #333" p="10px">
					<BlogPosts />
					<Box display="flex" justifyContent="center" mt="1em">
						<Button style={{ backgroundColor: '#333', color: '#fff' }}>more blog post</Button>
					</Box>
				</Box>
			</Box>
			  {/* form for upload map in pdf form */}
						{showUpload && (
						<Box width="80vw" height="100vh" position="absolute" top="0" backgroundColor="rgba(0,0,0,0.7)" display="flex" justifyContent="center" alignItems="center">
							<Box width="300px" height="500px">
								<Upload setShowUpload={setShowUpload } />
							</Box>
						</Box>
					)}
		</Box>
	);
};

export default UserPage;
