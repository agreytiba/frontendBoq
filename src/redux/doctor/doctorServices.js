import axios from 'axios'

const API_URL = 'http://localhost:5000/api/doctors/'

// Create new doctor
const createDoctor = async (doctorData) => {
  const response = await axios.post(API_URL,doctorData)

  return response.data
}

// Get all Doctors
const getDoctors = async () => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

  const response = await axios.get(API_URL)

  return response.data
}
// Get single Doctor
const getDoctor = async (doctorId) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

  const response = await axios.get(API_URL + doctorId)

  return response.data
}

// Delete single  doctor
const deleteDoctor = async (doctorId) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

  const response = await axios.delete(API_URL + doctorId)

  return response.data
}
// edit single  Doctor
const updateDoctor = async (doctorId) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

  const response = await axios.put(API_URL + doctorId)

  return response.data
}

const doctorService = {
  createDoctor,
  getDoctors,
  deleteDoctor,
  updateDoctor,
  getDoctor
}

export default doctorService