import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//Get user from localStorage
const user = JSON.parse(sessionStorage.getItem('user'));

// reducer initila state
const initialState = {
	user: user ? user : null,
	users:{},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
	success:''
};

// Get all user
export const getAllUsers = createAsyncThunk('auth/getAll', async (_, thunkAPI) => {
	try {
		return await authService.allUsers();
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
	try {
		return await authService.register(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Register user
export const createUser = createAsyncThunk('auth/user', async (user, thunkAPI) => {
	try {
		return await authService.createUser(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// logout
export const logout = createAsyncThunk('auth/logout', async () => {
	sessionStorage.removeItem("user")
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// reset state to the initial state
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
			state.success = '';
		}
	},
	extraReducers: (builder) => {
		builder
			// get all user pending, fulfilled,rejected
			.addCase(getAllUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.users=(action.payload);
			})
			.addCase(getAllUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
			})
			// register user pending, fulfilled,rejected
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
			
			})
			// create user pending, fulfilled,rejected
			.addCase(createUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.success="successful registered"
				state.users = action.payload;
			})
			.addCase(createUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
				state.users = null;
				
			})
			// login user  pending, fulfilled,rejected
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isRegistered = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
				state.user = null;
			})
			// logout fulfilled
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	}
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
