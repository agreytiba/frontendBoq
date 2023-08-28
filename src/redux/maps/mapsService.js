import axios from 'axios';

const API_URL = 'https://backendboq.onrender.com/api/maps/';

// Create new map detail
const createMap = async (mapData,token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }
	const response = await axios.post(API_URL, mapData,config);

	return response.data;
};

// Get all map
const getAllMaps = async (token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.get(API_URL,config);
	return response.data;
};
// Get single map
const getMap = async (mapId,token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.get(API_URL + mapId,config);

	return response.data;
};

// Delete single  map detail
const deleteMap = async (mapId,token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.delete(API_URL + mapId,config);

	return response.data;
};
// edit single map datail
const updateMap = async (mapId,token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.put(API_URL + mapId,config);

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
