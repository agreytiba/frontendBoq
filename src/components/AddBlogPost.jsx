import { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { createBlogPost,getBlogPosts,reset } from "../redux/blog/blogSlice";

const AddBlogPost = ({ setShowAddForm }) => {
    


  const isNonMobile = useMediaQuery("(min-width:600px)");

  
	// initiliaze useDispatch && useNavigate
  const dispatch = useDispatch()
  const navigate = useNavigate()
	//useSelector  containe properties from authSlice
  const {blogPost, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.blog
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
	if (values) {
		dispatch(createBlogPost(values))
    setShowAddForm(false);
		toast.success("umefanikiwa")
    dispatch(getBlogPosts())
		
    }
    
 
		
		
	};
    return (
<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Box p="20px" backgroundColor="#ddd" maxWidth="800px" >
          <Box py="10px">
          <Typography variant="h3">ongea kwenye bidhaa kwenye mfumo</Typography>
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                  color="#fff"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="kichwa cha makala"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
    
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="weka picha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.img}
                name="img"
                error={!!touched.img && !!errors.img}
                helperText={touched.img && errors.img}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                    type="maelezo ya makala"
                    multiline
                    rows={6}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.article}
                name="article"
                error={!!touched.article && !!errors.article}
                helperText={touched.article && errors.article}
                sx={{ gridColumn: "span 4" }}
              />
           
         
       
         
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" columnGap="10px">
              <Button  color="primary" variant="outlined" onClick={()=>window.location.reload()}>
                cancel
              </Button>
              <Button type="submit" color="success" variant="contained">
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
  title: yup.string().required("inahitaji"),


});
const initialValues = {
  title: "",
  img: "",
  article: ""
};

export default AddBlogPost;
