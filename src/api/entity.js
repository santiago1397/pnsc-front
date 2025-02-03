import axios from "./axios";


export const getEntities = async (skip, limit) => axios.get(`/entity/${skip}/${limit}`);

export const createEntity = async (entity) => axios.post("/entity", entity);

export const editEntity  = async (id, data) => axios.put(`/entity/${id}`, data);