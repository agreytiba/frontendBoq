import React from 'react';
import { Box, useTheme, Button, Typography } from '@mui/material';
import { tokens } from '../../theme';
import OrderPlaced from '../../components/OrderPlaced';
import BlogPosts from '../../components/BlogPosts';

const SellerPage = () => {
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box p="20px">
			   	<Box>
				<Button
					style={{
						backgroundColor: 'blue',
						color: '#fff',
						width: '150px',
                        marginBlock:"15px"
					}}
				>
					 Tuma taarifa
				</Button>
            </Box>
            <Box>
                <Typography style={{textTransform:"uppercase"}} variant="h3"><strong>manunuzi ya pamoja: bidhaa zinahitajika</strong></Typography>
                <OrderPlaced/>
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
		
		</Box>
	);
};

export default SellerPage;
