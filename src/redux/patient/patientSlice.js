import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import patientService from './patientService';

const initialState = {
  patients: [],
  patient:[],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// Create new patient
export const createPatient = createAsyncThunk('patients/create', async (patientData, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await patientService.createPatient(patientData);
	} catch (error) {
		const message =
			'error'(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get all patients
export const getPatients = createAsyncThunk('patients/getAll', async (_, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await patientService.getPatients();
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Get single patient
export const getPatient = createAsyncThunk('patients/getOne', async (patientId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await patientService.getPatient(patientId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//edit  patient
export const editPatient = createAsyncThunk('patients/edit', async (patientId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await patientService.updatePatient(patientId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Delete patient
export const deletePatient = createAsyncThunk('patients/delete', async (patientId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await patientService.deletePatient(patientId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const patientSlice = createSlice({
	name: 'patient',
	initialState,
  reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
    builder
      
			// STATES FOR CREAT PATIENT
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(createPatient.pending, (state) => {
				state.isLoading = true;
			})
			// state on  success fullfilled of request
			.addCase(createPatient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.patients.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(createPatient.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET ALL PATIENTS
			//state on waiting for response get patient from the server
			.addCase(getPatients.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getPatients.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.patients = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getPatients.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET SINGLE  PATIENT
			//state on waiting for response get patient from the server
			.addCase(getPatient.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getPatient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.patient = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getPatient.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR DELETE PATIENT
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deletePatient.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request for delete patient was successful
			.addCase(deletePatient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.patients = state.patients.filter((patient) => patient._id !== action.payload.id);
			})
			//the states when request for deleting patient  is rejected and reason for rejection
			.addCase(deletePatient.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			//STATES FOR EDIT CUSTOMER
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(editPatient.pending, (state) => {
				state.isLoading = true;
      })
      // states when the request is successful
			.addCase(editPatient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.patients = state.patients.filter((patient) => patient._id !== action.payload.id);
      })
      //states when the request is rejected with reason for rejection
			.addCase(editPatient.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = patientSlice.actions;
export default patientSlice.reducer;
