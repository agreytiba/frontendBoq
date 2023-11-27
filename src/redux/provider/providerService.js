import axios from 'axios';
import { API_BASE_URL } from '../../confing.js/baseUrl';

const API_URL = API_BASE_URL + '/api/providers/';

// add new provider
const AddProvider = async (data) => {
	const response = await axios.post(API_URL, data);

	return response.data;
};

// Get all providers
const getAllProviders = async () => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL);
	return response.data;
};
// Get single provider
const getProvider = async (providerId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL + providerId);

	return response.data;
};

// Delete single  appointment
const deleteProvider = async (providerId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.delete(API_URL + providerId);

	return response.data;
};
// edit single provider 
const updateProvider = async (providerId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.put(API_URL + providerId);

	return response.data;
};

const providerService = {
	AddProvider,
	getAllProviders,
	deleteProvider,
	updateProvider,
	getProvider
};

export default providerService;
