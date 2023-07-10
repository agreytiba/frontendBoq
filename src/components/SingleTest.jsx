import React from 'react';
import { useFormik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField, Button } from '@mui/material';
 import {AdapterDateFns} from "@mui/x-date-pickers"
import { format } from 'date-fns';
const SingleTest = () => {
  const formik = useFormik({
    initialValues: {
      date: null,
    },
    onSubmit: (values) => {
      console.log(values.date); // Handle the selected date here
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={formik.values.date}
          onChange={(date) => formik.setFieldValue('date', date)}
          renderInput={(props) => <TextField {...props} />}
        />
      </LocalizationProvider>

      <Button type="submit">Submit</Button>
    </form>
  );
};
export default SingleTest