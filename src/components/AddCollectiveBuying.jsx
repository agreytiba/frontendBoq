import { useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createPurchase,getAllPurchase,reset } from '../redux/purchase/purchaseSlice';
import {useDispatch, useSelector } from "react-redux"
import {toast} from "react-toastify"
const AddCollectiveBuying = ({ setShowFormBuy }) => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	// initiliaze useDispatch && useNavigate
  const dispatch = useDispatch()
	//useSelector  containe properties from authSlice
  const {purchase, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.purchase
	)

// use effect for handling states
  useEffect(() => {
    if (isError) {
      toast.error(message)
	  }
	

    return () => {
      dispatch(reset())
    }
  }, [ isError, message, dispatch])

	const handleFormSubmit = (values) => {
	try {
			dispatch(createPurchase(values))
		setShowFormBuy(false);
		toast.success("umefanikiwa")
		dispatch(getAllPurchase())
		
	} catch (error) {
		toast.error(error)
	}
	

		
		
		
	};
	return (
		<Box display="flex" justifyContent="center" alignItems="center" >
			<Box p="20px" backgroundColor="#ddd" borderRadius="10px" maxWidth="800px" minWidth="500px">
				<Box py="10px" textAlign="center" marginBottom="20px">
					<Typography variant="h3">Ongeza manunuzi ya pamoja</Typography>
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
                                
                             
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="jina la bidhaa"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.material}
									name="material"
									error={!!touched.material && !!errors.material}
									helperText={touched.material && errors.material}
									sx={{ gridColumn: 'span 4' }}
								/>

								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="idadi"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.quantity}
									name="quantity"
									error={!!touched.quantity && !!errors.quantity}
									helperText={touched.quantity && errors.quantity}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="gharama"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.price}
									name="price"
									error={!!touched.price && !!errors.price}
									helperText={touched.price && errors.price}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="date"
									label="lipa kabla ya"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.payBefore}
									name="payBefore"
									error={!!touched.payBefore && !!errors.payBefore}
									helperText={touched.payBefore && errors.payBefore}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="utaletewa site"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.deliveryRange}
									name="deliveryRange"
									error={!!touched.deliveryRange && !!errors.deliveryRange}
									helperText={touched.deliveryRange && errors.deliveryRange}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="usafiri"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.transport}
									name="transport"
									error={!!touched.transport && !!errors.transport}
									helperText={touched.transport && errors.transport}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="updates"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.orderStatus}
									name="orderStatus"
									error={!!touched.orderStatus && !!errors.orderStatus}
									helperText={touched.orderStatus && errors.orderStatus}
									sx={{ gridColumn: 'span 2' }}
								/>
							</Box>
							<Box display="flex" justifyContent="end" mt="20px" columnGap="10px">
								<Button color="primary" variant="contained" onClick={() => setShowFormBuy(false)}>
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
	material: yup.string().required('inahitaji'),
	quantity: yup.string().required('inahitaji'),
	price: yup.string().required('inahitaji'),
	payBefore: yup.string().required('inahitaji'),
	deliveryRange: yup.string().required('inahitaji'),
	transport: yup.string().required('inahitaji'),
	orderStatus: yup.string().required('inahitaji')
});
const initialValues = {
	material: '',
	quantity: '',
	price: '',
	payBefore: '',
	deliveryRange: '',
    transport: '',
    orderStatus:''
};

export default AddCollectiveBuying;
