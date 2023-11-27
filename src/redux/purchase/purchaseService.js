import axios from 'axios';
import { API_BASE_URL } from '../../confing.js/baseUrl';

const API_URL = API_BASE_URL + '/api/purchases/';

// Create new purchase detail
const createPurchase = async (data) => {
	const response = await axios.post(API_URL, data);

	return response.data;
};

// Get all purchases
const getAllPurchase = async () => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL);
	return response.data;
};
// Get single map
const getPurchase = async (purchaseId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL + purchaseId);

	return response.data;
};

// Delete single  purchase detail
const deletePurchase = async (purchaseId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.delete(API_URL + purchaseId);

	return response.data;
};
// edit single purchase datail
const updatePurchase = async (purchaseId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.put(API_URL + purchaseId);

	return response.data;
};

const mapsService = {
	createPurchase,
	getAllPurchase,
	deletePurchase,
	updatePurchase,
	getPurchase
};

export default mapsService;
