import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

// get all user user
const allUsers = async () => {
  const response = await axios.get(API_URL)
  return response.data
}
// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  return response.data
}


// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
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
  allUsers
}

export default authService