import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api/complaints';

export async function submitComplaint(data: any) {
  return axios.post(API_URL, data);
}

export async function getComplaint(id: string) {
  return axios.get(`${API_URL}/${id}`);
}

export async function listComplaints() {
  return axios.get(API_URL);
}

export async function updateComplaint(id: string, update: any) {
  return axios.patch(`${API_URL}/${id}`, update);
}
