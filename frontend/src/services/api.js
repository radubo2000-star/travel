import axios from 'axios';

const API_BASE_URL = 'http://localhost:12001/api';

// Get user from localStorage
const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getOffers = async () => {
  const response = await axios.get(`${API_BASE_URL}/offers`);
  return response.data;
};

export const getOffer = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/offers/${id}`);
  return response.data;
};

export const getBookings = async () => {
  const response = await axios.get(`${API_BASE_URL}/bookings`);
  return response.data;
};

export const createBooking = async (bookingData) => {
  const user = getStoredUser();
  const data = user ? { ...bookingData, userId: user.id } : bookingData;
  const response = await axios.post(`${API_BASE_URL}/bookings`, data);
  return response.data;
};

export const updateOffer = async (id, offerData) => {
  const response = await axios.put(`${API_BASE_URL}/offers/${id}`, offerData);
  return response.data;
};

export const deleteOffer = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/offers/${id}`);
  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await axios.put(`${API_BASE_URL}/bookings/${id}/status`, { status });
  return response.data;
};

// Auth API
export const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

export const getMyBookings = async () => {
  const user = getStoredUser();
  if (!user) throw new Error('Nu ești autentificat');
  
  const response = await axios.get(`${API_BASE_URL}/my-bookings`, {
    headers: { 'x-user-id': user.id }
  });
  return response.data;
};