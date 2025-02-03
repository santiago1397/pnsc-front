import axios from "./axios";


export const getUsers = async (skip, limit) => axios.get(`/user/${skip}/${limit}`);
export const getUsersFull = async (skip, limit, entity) => axios.get(`/user/${skip}/${limit}?entity=${entity}`);
export const createUser = async (user) => axios.post("/user", user);
export const editUser = async (id, data) => axios.put(`/user/${id}`, data);
export const deleteUser = async (id) => axios.delete(`/user/${id}`);