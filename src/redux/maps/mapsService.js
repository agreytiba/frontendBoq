import axios from 'axios';

const API_URL = 'http://localhost:5000/api/maps/';

// Create new map detail
const createMap = async (mapData) => {
	const response = await axios.post(API_URL, mapData);

	return response.data;
};

// Get all map
const getAllMaps = async () => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL);
	return response.data;
};
// Get single map
const getMap = async (mapId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL + mapId);

	return response.data;
};

// Delete single  map detail
const deleteMap = async (mapId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.delete(API_URL + mapId);

	return response.data;
};
// edit single map datail
const updateMap = async (mapId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.put(API_URL + mapId);

	return response.data;
};

const mapsService = {
	createMap,
	getAllMaps,
	deleteMap,
	updateMap,
	getMap
};

export default mapsService;
