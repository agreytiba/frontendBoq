import axios from 'axios'
import { API_BASE_URL } from '../../confing.js/baseUrl'


// get all user user
const allUsers = async () => {
  const response = await axios.get(API_BASE_URL + '/api/users/')
  return response.data
}
// Register user
const register = async (userData) => {
  const response = await axios.post(API_BASE_URL + '/api/users/', userData)

  return response.data
}
// create user
const createUser = async (userData) => {
  const response = await axios.post(API_BASE_URL + '/api/users/', userData)

  return response.data
}


// Login user
const login = async (userData) => {
  const response = await axios.post(API_BASE_URL + '/api/users/' + 'login', userData)
  if (response.data) {
    sessionStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// logout user
const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
  register,
  logout,
  login,
  allUsers,
  createUser
}

export default authService