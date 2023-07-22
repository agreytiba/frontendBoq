import { useState } from 'react';
import { Box, useTheme, Button, Typography } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import CustomerDrawing from '../../components/CustomerDrawing';
import BlogPosts from '../../components/BlogPosts';
import BuyCollective from '../../components/BuyCollective';
import Upload from '../../components/Upload';
import AddCollectiveBuying from '../../components/AddCollectiveBuying';
import SendMapForm from '../../components/SendMapForm';
const UserPage = () => {
	// useState
	const [ showFormBuy, setShowFormBuy ] = useState(false);
	const [ showFormMap, setShowFormMap ] = useState(false);
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	// get user from local
	const user = JSON.parse(localStorage.getItem('user'));
	return (
		<Box display="flex" justifyContent="center" alignItems="center">
		<Box width="90%" boxShadow="0 0 5px #333" p="10px 15px" my="50px" borderRadius="10px">
			
				<Box>
					<Box textAlign="center" p="20px 0 10px 0">
						<Header title="Mteja" subtitle="" />
					</Box>
					
					<Typography variant="h5">
						karibu kwenye mfumo wetu
						<span style={{ color: 'blue', textTransform: 'uppercase', marginLeft: '5px' }}>
							{user.name}
						</span>{' '}
						karibu tukuhudumie
					</Typography>
				</Box>

				<Box p="10px" border="1px solid #333" mb="4rem">
					<Box>
						<Button
							style={{ backgroundColor: 'rgb(0,0,255)', color: '#fff' }}
							onClick={() => setShowFormMap(true)}
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
				<Box border="1px solid #000" p="10px">
					<Box>
						<Button
							style={{
								backgroundColor: 'goldenrod',
								color: '#fff',
								width: '150px',
								marginBlock: '15px'
							}}
							onClick={() => setShowFormBuy(true)}
						>
							ongeza vifaa
						</Button>
					</Box>
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
				{/* show the add collective buy form  */}
				{showFormBuy && (
					<Box
						position="absolute"
						top="0"
						left="0"
						right="0"
						bottom="0"
						backgroundColor="rgba(0,0,0,0.7)"
						display="flex"
						justifyContent="center"
						alignItems="center"
						minHeight="120vh"
					>
						<AddCollectiveBuying setShowFormBuy={setShowFormBuy} />
					</Box>
				)}
				{/*  show map upload form with other inputs */}
				{showFormMap && (
					<Box
						position="absolute"
						top="0"
						left="0"
						right="0"
						bottom="0"
						backgroundColor="rgba(0,0,0,0.7)"
						display="flex"
						justifyContent="center"
						alignItems="center"
						minHeight="120vh"
					>
						<SendMapForm setShowFormMap={setShowFormMap} />
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default UserPage;
