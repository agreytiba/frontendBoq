import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Typography, Button, useTheme, List, ListItem, ListItemText } from '@mui/material';
import { tokens } from '../theme';
import { getAllUsers, reset } from '../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';

const UserChecker = ({ singleMap}) => {

	//colors themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// initiliaze useDispatch && useNavigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//useSelector  containe properties from authSlice
	const { users, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	//useEffect to fetch all users
	useEffect(() => {
			if (isError) {
				toast.error(message);
			}
			// firing get all users
			dispatch(getAllUsers());

			return () => {
				dispatch(reset());
			};
		},
		[ navigate, isError, message, dispatch ]
	);
const handleAssigment = async(id) => {
		try {
            const res = await axios.put(`https://backendboq.onrender.com/api/maps/${singleMap._id}`,{assignTo:id})
        if (res.status === 200) {
            toast.success("successful assigned")
            }
        else {
            toast.error("failed to assign")
     }
        } catch (error) {
             toast.error(error)
        }
    
    };
    
	const onlyChecker = users?.filter((user) => user.accessLevel === 'checker');
    console.log(users)
    // when on loadind state show this spinner
	// if (isLoading) {
	// 	return <Spinner />;
	// }
	return (
		<Box backgroundColor="grey" color="#fff" maxWidth="300px">
			<List>
				{onlyChecker.map((checker) => (
					<ListItem key={checker._id} onClick={()=>handleAssigment(checker._id)}>
						<ListItemText primary={checker.name} />
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default UserChecker;
