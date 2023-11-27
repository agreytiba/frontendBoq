import axios from 'axios';
import { API_BASE_URL } from '../../confing.js/baseUrl';

const API_URL = API_BASE_URL + '/api/orders/';

// add new order
const addOrder = async (orderData) => {
	const response = await axios.post(API_URL, orderData);

	return response.data;
};

// Get all orders
const getAllorders = async () => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL);
	return response.data;
};
// Get single order
const getOrder = async (orderId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL + orderId);

	return response.data;
};

// Delete single  appointment
const deleteOrder = async (orderId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.delete(API_URL + orderId);

	return response.data;
};
// edit single order 
const updateOrder = async (orderId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.put(API_URL + orderId);

	return response.data;
};

const orderservice = {
	addOrder,
	getAllorders,
	deleteOrder,
	updateOrder,
	getOrder
};

export default orderservice;
