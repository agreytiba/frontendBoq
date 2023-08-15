import { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AddMaterial ,reset} from "../redux/material/materialSlice";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const AddBoqData = ({ setShowForm }) => {
    


  const isNonMobile = useMediaQuery("(min-width:600px)");

  


	const handleFormSubmit = (values) => {
	
		
		
	};
    return (
<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Box p="20px" backgroundColor="#ddd" maxWidth="800px" >
          <Box py="10px">
          <Typography variant="h3">ongea bidhaa kwenye bidhaa</Typography>
</Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                  }}
                  color="#fff"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="bidhaa"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.material}
                name="material"
                error={!!touched.material && !!errors.material}
                helperText={touched.material && errors.material}
                sx={{ gridColumn: "span 2" }}
              />
    
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="kipimo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.unit}
                name="unit"
                error={!!touched.unit && !!errors.unit}
                helperText={touched.unit && errors.unit}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="gharama @ 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rate}
                name="rate"
                error={!!touched.rate && !!errors.rate}
                helperText={touched.rate && errors.rate}
                sx={{ gridColumn: "span 2" }}
              />
           
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="aina"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 4" }}
              />
           
         
       
         
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" columnGap="10px">
              <Button  color="primary" variant="contained" onClick={()=>setShowForm(false)}>
                cancel
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                save
              </Button>
              
            </Box>
          </form>
        )}
      </Formik>
    </Box></Box>
  );
};


const checkoutSchema = yup.object().shape({
  material: yup.string().required("inahitaji"),
  unit: yup.string().required("inahitaji"),
  rate: yup
    .string()
    .required("inahitaji"),
    
    type: yup
      .string()
      .required("inahitaji"),
});
const initialValues = {
  material: "",
  unit: "",
    rate: "",
    quantity: "",
  type: ""
};

export default AddBoqData;
