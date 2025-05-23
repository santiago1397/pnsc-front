import axios from "./axios";


export const createCategory = async (category) => axios.post("/category", category);

export const getCategories = async (skip,limit) => axios.get(`/category/${skip}/${limit}`);

export const deleteCategory  = async (id) => axios.delete(`/category/${id}`);

/* export const editActivity  = async (id, data) => axios.put(`/activities/${id}`, data); */
