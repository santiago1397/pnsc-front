import axios from "./axios";


export const getUsers = async (skip, limit) => axios.get(`/user/${skip}/${limit}`);
export const createUser = async (user) => axios.post("/user", user);
export const editUser = async (id, data) => axios.put(`/user/${id}`, data);
export const deleteUser = async (id) => axios.delete(`/user/${id}`);