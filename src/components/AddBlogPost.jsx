import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBlogPost, getBlogPosts, reset } from "../redux/blog/blogSlice";
import axios from "axios";
// import {useMediaQuery} from "@mui/material";
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/greyma/upload';
const UPLOAD_PRESET = 'uploads';

const AddBlogPost = ({ setShowAddForm }) => {

  const [img, setImg] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showUploadInput, setShowUploadInput] = useState(true);
// const isNonMobile = useMediaQuery("(min-width:600px)");
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogPost, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const handleFormSubmit = (values) => {
    const data = {
      img: img,
      title: values.title,
      article: values.article
    };
    if (values) {
      dispatch(createBlogPost(data));
      setShowAddForm(false);
      toast.success("umefanikiwa");
      dispatch(getBlogPosts());
    }
  };

  const handleImageUpload = async (event) => {
    setUploadLoading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data) {
        setImg(response.data.secure_url);
        setUploadLoading(false);
        setShowUploadInput(false); // Hide the upload input after successful upload
      }

    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box p="20px" backgroundColor="#ddd" minWidth="300px" >
        <Box py="20px">
          <Typography variant="h3" textAlign={`center`}>Create Blog post</Typography>
        </Box>
        {uploadLoading ? <Box display="flex" justifyContent="center" alignItems="center"> <CircularProgress /> </Box> :
          <>
            {showUploadInput &&
              <Box backgroundColor={`#fff`} p={2} borderRadius={`10px`}>
                <Typography component={`p`} sx={{ marginBlock: `10px` }}>Upload Post image</Typography>
                <input type="file" onChange={handleImageUpload} />
              </Box>
            }
          </>
        }
        {img &&
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
                    "& > div": { gridColumn: "span 4" },
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
                  <Button type="submit" color="success" variant="contained">
                    save
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        }
        <Button color="primary" variant="contained" sx={{ marginBlock: `10px` }} onClick={() => setShowAddForm(false)}>
          cancel
        </Button>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("inahitaji"),
});
const initialValues = {
  title: "",
  article: ""
};

export default AddBlogPost;
