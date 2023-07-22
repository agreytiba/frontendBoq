import React from 'react';
import { Box, useTheme, Button, Typography } from '@mui/material';
import { tokens } from '../../theme';

import BlogPosts from '../../components/BlogPosts';
import ProviderInfoForm from '../../components/ProviderInfoForm';
import { useState } from 'react';
import MakeAnOffer from '../../components/MakeAnOffer';
import Foundation from '../../components/Foundation';
import Header from '../../components/Header';
import Walling from '../../components/Walling';
import Roufing from '../../components/Roufing';

const SellerPage = () => {
	const [ showSendForm, setShowSendForm ] = useState(false);
	// color themes
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			<Box width="90%" p="10px 20px" my="50px" boxShadow="0 0 5px #333" borderRadius="10px">
				<Box textAlign="center" p="2rem 0 1rem 0">
					<Header title="makadilio(BOQ)" subtitle="makadilio ya msingi,kupandisha ukuta na kupua " />
				   <Typography variant='h4'>ramani No:<strong>rm123</strong> </Typography>
				</Box>
				<Box p="10px" mt="20px" border="1px solid #000">
					<Box py="10px">
						<Typography variant="h3">Makadilio ya msingi</Typography>
					</Box>
					<Foundation />
				</Box>
				<Box p="10px" mt="20px" border="1px solid #000">
					<Box py="10px">
						<Typography variant="h3">Makadilio ya kupandisha ukuta</Typography>
					</Box>
					<Walling />
				</Box>
				<Box p="10px" mt="20px" border="1px solid #000">
					<Box py="10px">
						<Typography variant="h3">Makadilio ya kupaua</Typography>
					</Box>
					<Roufing />
				</Box>
			</Box>
		</Box>
	);
};

export default SellerPage;
