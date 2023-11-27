import axios from 'axios';
import { API_BASE_URL } from '../../confing.js/baseUrl';

const API_URL = API_BASE_URL + '/api/materials/';

// add new material
const AddMaterial = async (materialData) => {
	const response = await axios.post(API_URL, materialData);

	return response.data;
};

// Get all materials
const getAllMaterial = async () => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL);
	return response.data;
};
// Get single material
const getMaterial = async (materialId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL + materialId);

	return response.data;
};

// Delete single  appointment
const deleteMaterial = async (materialId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.delete(API_URL + materialId);

	return response.data;
};
// edit single material 
const updateMaterial = async (materialId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.put(API_URL + materialId);

	return response.data;
};

const materialService = {
	AddMaterial,
	getAllMaterial,
	deleteMaterial,
	updateMaterial,
	getMaterial
};

export default materialService;
