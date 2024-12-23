import axios from "./axios";


export const getUsers = async () => axios.get("/user");
export const createUser = async (user) => axios.post("/user", user);
export const editUser = async (id) => axios.put(`/user/${id}`);
export const deleteUser = async (id) => axios.delete(`/user/${id}`);