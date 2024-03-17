import axios from 'axios';
import { API_BASE_URL } from '../../confing.js/baseUrl';

const API_URL = API_BASE_URL + '/api/maps/';

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
// Get all map under failure check
const getAllFailedCheck = async (token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.get(API_URL+`failedCheck`,config);
	return response.data;
};
// Get all map under failure check
const getAllFailed = async (token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.get(API_URL+`failed`,config);
	return response.data;
};

// get all under type check
const getAllTypeCheck = async (token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.get(API_URL+`typeCheck`,config);
	return response.data;
};

// get all under type check 
const getAllUnitCheck = async (token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.get(API_URL+`unitCheck`,config);
	return response.data;
};
// get all under type check 
const getAllPassed = async (token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.get(API_URL+`successful`,config);
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
	getMap,
	getAllFailedCheck,
	getAllTypeCheck,
	getAllUnitCheck,
	getAllFailed,
	getAllPassed
};

export default mapsService;
