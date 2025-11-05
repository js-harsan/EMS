// src/api.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/employees";

export const getEmployees = () => axios.get(BASE_URL);
export const addEmployee = (employee) => axios.post(BASE_URL, employee);
export const updateEmployee = (id, employee) => axios.put(`${BASE_URL}/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`);
