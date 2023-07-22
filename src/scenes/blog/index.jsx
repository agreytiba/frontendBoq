import React from 'react';
import { Box, useTheme, Button, Typography } from '@mui/material';
import { tokens } from '../../theme';

import BlogPosts from '../../components/BlogPosts';

import { useState } from 'react';

import AddBlogPost from '../../components/AddBlogPost';

const Blog = () => {
	const [showSendForm, setShowSendForm] =useState(false)
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box  display="flex" justifyContent="center" alignItems="center" py="50px">
		<Box width="90%" p="10px" boxShadow="0 0 5px #333">
			   	<Box>
				<Button
					style={{
						backgroundColor: 'blue',
						color: '#fff',
						width: '150px',
                        marginBlock:"15px"
					}}
					onClick={()=>setShowSendForm(true)}
				>
				weka post
				</Button>
            </Box>
          
            	<Box my="4em">
				<Box textAlign="center" mb="1rem">
					<Typography variant="h2"> blog posts</Typography>
				</Box>
				<Box border="1px solid #333" p="10px">
					<BlogPosts />
					<Box display="flex" justifyContent="center" mt="1em">
						<Button style={{ backgroundColor: '#333', color: '#fff' }}>more blog post</Button>
					</Box>
				</Box>
				
			</Box>
			{showSendForm &&<Box   minHeight="100vh" position="absolute" top="0" left="0" right="0" backgroundColor="rgba(0,0,0,0.7)" >
						<AddBlogPost  />
					</Box>

				}
				
		
		</Box></Box>
	);
};

export default Blog;
