import React from 'react';
import { Box, useTheme, Button, Typography, Card, CardHeader,CardContent,CardMedia } from '@mui/material';
import { tokens } from '../../theme';
import { useLocation} from 'react-router-dom';
const SingleBlog = () => {
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// initializa  useLocation
	const location = useLocation();
	
	// destructuring of the location to get the property received from navigation state
    const {title,img,createdAt,article} =location.state
	

	return (
		<Box  display="flex" justifyContent="center" alignItems="center" p="20px" >
		      <Card style={{maxWidth:"800px",padding:"20px"}}>
                <Box  fontWeight="bold" textTransform="uppercase" textAlign="center" >
                    <Typography variant="h2" component="h2" style={{justifySelf:"center"}}>
								{title}
                    </Typography>
                    <Typography variant="h5" component="h2">
								{createdAt.slice(0,10)}
							</Typography>
                </Box>	
						
						<CardContent>
							<CardMedia component="img" alt="image blog" height="400"  image={img} />
							<Typography variant="p" component="p">
							{article}
							</Typography>
				</CardContent>
				<Button onClick={()=>window.history.back()} variant='contained' color="primary">back</Button>
					</Card>
        </Box>
	);
};

export default SingleBlog;
