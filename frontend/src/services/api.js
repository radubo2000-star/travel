import axios from 'axios';

const API_BASE_URL = 'http://localhost:12001/api';

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
  const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
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