import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
const BlogPosts = () => {
	const data = [
		{
			id: 1,
			img:
				'https://media.istockphoto.com/id/836219748/photo/set-of-construction-materials.webp?b=1&s=170667a&w=0&k=20&c=jKE5JexWggDmk6CPY0xd1Yg7APOLK8sRLJPrE93cANY=',
			title: 'our project at mbuyuni',
			createdAt: '23/06/2023'
		},
		{
			id: 2,
			img:
				'https://media.istockphoto.com/id/836219790/photo/set-of-construction-materials.jpg?s=612x612&w=0&k=20&c=msBOhHQPAyTryVYHnfPBftiA6ZUgVuKoh2FoYwgA3to=',
			title: 'easy way to build a home at low cost',
			createdAt: '14/07/2023'
		},
		{
			id: 3,
			img:
				'https://media.istockphoto.com/id/505517898/photo/building-and-construction-concept.jpg?s=612x612&w=0&k=20&c=Me149ivxxaGyfIUcGGzOZUR6rkfyP6PgV2--vIxf0y8=',
			title: 'build material',
			createdAt: '14/07/2023'
		}
	];
	return (
		<Box display="flex" justifyContent="space-between" textAlign="center">
			{data.map((post) => {
			
				return (
					<Card key={post.id} style={{ width: '300px' }}>
						<CardMedia component="img" alt="image blog" height="200" width="250" image={post.img} />
						<CardContent>
							<Typography variant="h5" component="h2" style={{color:"green"}}>
								{post.title}
							</Typography>
							<Typography variant="h5" component="h2">
								{post.createdAt}
							</Typography>
						</CardContent>
					</Card>
				);
			})}
		</Box>
	);
};
export default BlogPosts;
