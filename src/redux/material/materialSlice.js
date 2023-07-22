import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import materialService from './materialService';

const initialState = {
    materials: [],
    material:[],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// add new material details
export const AddMaterial = createAsyncThunk('materials/create', async (materialData, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await materialService.AddMaterial(materialData);
	} catch (error) {
		const message =
			'error'(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get all materials
export const getAllMaterial = createAsyncThunk('materials/getAll', async (_, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await materialService.getAllMaterial();
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Get single material
export const getMaterial = createAsyncThunk('materials/getOne', async (materialId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await materialService.getMaterial(materialId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//edit  material details
export const updateMaterial = createAsyncThunk('materials/edit', async (materialId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await materialService.updateAppointment(materialId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Delete material details
export const deleteMaterial = createAsyncThunk('materials/delete', async (materialId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await materialService.deleteMaterial(materialId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const materialSlice = createSlice({
	name: 'material',
	initialState,
  reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
    builder
      
			// STATES FOR CREATE MATERIAL
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(AddMaterial.pending, (state) => {
				state.isLoading = true;
			})
			// state on  success fullfilled of request
			.addCase(AddMaterial.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.materials.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(AddMaterial.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET ALL MATERIALS
			//state on waiting for response get materials from the server
			.addCase(getAllMaterial.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getAllMaterial.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.materials = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllMaterial.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET SINGLE  MATERIAL DETAILS
			//state on waiting for response get patient from the server
			.addCase(getMaterial.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getMaterial.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.material = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getMaterial.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR DELETE MATERIAL
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deleteMaterial.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request for delete  material was successful
			.addCase(deleteMaterial.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.materials = state.materials.filter((material) => material._id !== action.payload.id);
			})
			//the states when request for deleting patient  is rejected and reason for rejection
			.addCase(deleteMaterial.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			//STATES FOR EDIT MATERIAL
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(updateMaterial.pending, (state) => {
				state.isLoading = true;
      })
      // states when the request is successful
			.addCase(updateMaterial.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.materials = state.materials.filter((material) => material._id !== action.payload.id);
      })
      //states when the request is rejected with reason for rejection
			.addCase(updateMaterial.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = materialSlice.actions;
export default materialSlice.reducer;
