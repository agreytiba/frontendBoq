import axios from 'axios';

const API_URL = 'http://localhost:5000/api/appointments/';

// Create new appointment
const createAppointment = async (appointData) => {
	const response = await axios.post(API_URL, appointData);

	return response.data;
};

// Get all Appointments
const getAppointments = async () => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL);
	return response.data;
};
// Get single Appointment
const getAppointment = async (appointId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL + appointId);

	return response.data;
};

// Delete single  appointment
const deleteAppointment = async (appointId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.delete(API_URL + appointId);

	return response.data;
};
// edit single  appointment
const updateAppointment = async (appointId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.put(API_URL + appointId);

	return response.data;
};

const appointService = {
	createAppointment,
	getAppointments,
	deleteAppointment,
	updateAppointment,
	getAppointment
};

export default appointService;
