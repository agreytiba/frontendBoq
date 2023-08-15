import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { deleteBlogPost, getBlogPosts, reset } from '../redux/blog/blogSlice';
import Spinner from '../components/Spinner';

const BlogPosts = () => {
	// const data = [
	// 	{
	// 		id: 1,
	// 		img:
	// 			'https://media.istockphoto.com/id/836219748/photo/set-of-construction-materials.webp?b=1&s=170667a&w=0&k=20&c=jKE5JexWggDmk6CPY0xd1Yg7APOLK8sRLJPrE93cANY=',
	// 		title: 'our project at mbuyuni',
	// 		createdAt: '23/06/2023'
	// 	},
	// 	{
	// 		id: 2,
	// 		img:
	// 			'https://media.istockphoto.com/id/836219790/photo/set-of-construction-materials.jpg?s=612x612&w=0&k=20&c=msBOhHQPAyTryVYHnfPBftiA6ZUgVuKoh2FoYwgA3to=',
	// 		title: 'easy way to build a home at low cost',
	// 		createdAt: '14/07/2023'
	// 	},
	// 	{
	// 		id: 3,
	// 		img:
	// 			'https://media.istockphoto.com/id/505517898/photo/building-and-construction-concept.jpg?s=612x612&w=0&k=20&c=Me149ivxxaGyfIUcGGzOZUR6rkfyP6PgV2--vIxf0y8=',
	// 		title: 'build material',
	// 		createdAt: '14/07/2023'
	// 	}
	// ];

	// initiliaze useDispatch && useNavigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//useSelector  containe properties from blogSlice
	const { blogPosts, isLoading, isError, isSuccess, message } = useSelector((state) => state.blog);

	//useEffect to fetch all blog posts
	useEffect(
		() => {
			if (isError) {
				toast.error(message);
			}
			// firing get all  blog posts
			dispatch(getBlogPosts());

			return () => {
				dispatch(reset());
			};
		},
		[ navigate, isError, message, dispatch ]
	);

	// handle delete post
	const handleDelete = (id) => {
		dispatch(deleteBlogPost(id));
		toast.success('umefanikiwa kufuta');
		dispatch(getBlogPosts())
	};

	// handle  show more on blog post
	const handleShowMore = (post) => {
		navigate(`/blog/${post._id}`, { state: post });
	}

	// get user from local
	const user = JSON.parse(sessionStorage.getItem('user'));
	// on loading state displa the spinner
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<Box display="grid" gridTemplateColumns="repeat(3, 1fr)" rowGap="2em">
			{blogPosts.map((post) => {
				return (
					<Card key={post.id} style={{ position: 'relative', width: '300px', height:"300px" }} >
					{user?.accessLevel === "admin" &&	<Box
							onClick={() => handleDelete(post._id)}
							position="absolute"
							right="0"
							top="0"
							width="20px"
							textAlign="center"
							color="#fff"
							backgroundColor="red"
							cursor="pointer"
						>
							X
						</Box>}
						<CardMedia component="img" alt="image blog" height="200" width="300" image={post.img} />
						<CardContent>
							<Typography variant="h5" component="h2" style={{ color: 'green' }}>
								{post.title}
							</Typography>
							<Typography variant="h5" component="h2">
								{post.createdAt}
							</Typography>
							<Box my="5px">
						<Button variant='contained' color='primary' onClick={()=>handleShowMore(post)}>
                           Read more
						</Button>
						</Box>
						</CardContent>
						
					</Card>
				);
			})}
		</Box>
	);
};
export default BlogPosts;
