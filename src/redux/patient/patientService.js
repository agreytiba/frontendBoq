import axios from 'axios'

const API_URL = 'http://localhost:5000/api/patients/'

// Create new patient
const createPatient = async (patientData) => {
  const response = await axios.post(API_URL,patientData)

  return response.data
}

// Get all Patients
const getPatients = async () => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

  const response = await axios.get(API_URL)

  return response.data
}
// Get single Patient
const getPatient = async (patientId) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

  const response = await axios.get(API_URL + patientId)

  return response.data
}

// Delete single item
const deletePatient = async (patientId) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

  const response = await axios.delete(API_URL + patientId)

  return response.data
}
// edit single Patient
const updatePatient = async (patientId) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

  const response = await axios.put(API_URL + patientId)

  return response.data
}

const patientService = {
  createPatient,
  getPatients,
  deletePatient,
  updatePatient,
  getPatient
}

export default patientService