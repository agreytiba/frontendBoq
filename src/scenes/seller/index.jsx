import React from 'react';
import { Box, useTheme, Button, Typography } from '@mui/material';
import { tokens } from '../../theme';
import BlogPosts from '../../components/BlogPosts';
import ProviderInfoForm from "../../components/ProviderInfoForm"
import { useState } from 'react';
import MakeAnOffer from '../../components/MakeAnOffer';

const SellerPage = () => {
	const [showSendForm, setShowSendForm] =useState(false)
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box  display="flex" justifyContent="center" alignItems="center" py="50px">
		<Box width="100%" p="10px" boxShadow={`0 4px 12px rgba(0,0,0,0.3)`} padding={`20px 10px`}>
			   	<Box>
				<Button
					style={{
						
						
						width: '150px',
                        marginBlock:"15px"
						}}
						color='success'
						variant='contained'
					onClick={()=>setShowSendForm(true)}
				>
					 Tuma taarifa
				</Button>
            </Box>
            <Box>
                <Typography style={{textTransform:"uppercase"}} variant="h3"><strong>manunuzi ya pamoja: bidhaa zinahitajika</strong></Typography>
                <MakeAnOffer/>
            </Box>
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
			{showSendForm &&<Box   minHeight="100vh" position="absolute" top="0" left="0" right="0" backgroundColor="rgba(0,0,0,0.7)" >
						<ProviderInfoForm setShowSendForm={setShowSendForm } />
					</Box>

				}
				
		
		</Box></Box>
	);
};

export default SellerPage;
