import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Upload from './Upload';

const SendMapForm = ({ setShowFormMap }) => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const handleFormSubmit = (values) => {
		console.log(values);
		setShowFormMap(false);
	};
	return (
		<Box display="flex" justifyContent="center" alignItems="center" >
			<Box p="20px" backgroundColor="#ddd" borderRadius="10px" maxWidth="800px" minWidth="500px">
				<Box py="10px" textAlign="center" marginBottom="20px">
					<Typography variant="h3">Tuma ramani</Typography>
				</Box>
				<Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
					{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Box
								display="grid"
								gap="30px"
								gridTemplateColumns="repeat(4, minmax(0, 1fr))"
								sx={{
									'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
								}}
								color="#fff"
                            >
                                <Box
                                    sx={{ gridColumn: 'span 4' }}
                                >
                                    <Upload/>
                                </Box>
                             
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="jina mtumaji"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.name}
									name="name"
									error={!!touched.name && !!errors.name}
									helperText={touched.name && errors.name}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="mkoa"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.region}
									name="region"
									error={!!touched.region && !!errors.region}
									helperText={touched.region && errors.region}
									sx={{ gridColumn: 'span 2' }}
								/>

								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="wilaya"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.district}
									name="district"
									error={!!touched.district && !!errors.district}
									helperText={touched.district && errors.district}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="kata"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.kata}
									name="kata"
									error={!!touched.kata && !!errors.kata}
									helperText={touched.kata && errors.kata}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="lipa kabla ya"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.desc}
									name="desc"
									error={!!touched.desc && !!errors.desc}
									helperText={touched.desc && errors.desc}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="utaletewa site"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.status}
									name="status"
									error={!!touched.status && !!errors.status}
									helperText={touched.status && errors.status}
									sx={{ gridColumn: 'span 2' }}
								/>
							
							</Box>
							<Box display="flex" justifyContent="end" mt="20px" columnGap="10px">
								<Button color="primary" variant="contained" onClick={() => setShowFormMap(false)}>
									cancel
								</Button>
								<Button type="submit" color="secondary" variant="contained">
									save
								</Button>
							</Box>
						</form>
					)}
				</Formik>
			</Box>
		</Box>
	);
};

const checkoutSchema = yup.object().shape({
	region: yup.string().required('inahitaji'),
	district: yup.string().required('inahitaji'),
	kata: yup.string().required('inahitaji'),
	desc: yup.string().required('inahitaji'),
	status: yup.string().required('inahitaji'),
	
});
const initialValues = {
    name:'',
	region: '',
	district: '',
	kata: '',
	desc: '',
	status: '',
   maps:[]
};

export default SendMapForm;
