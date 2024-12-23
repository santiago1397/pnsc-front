import axios from "./axios";


export const getEntities = async () => axios.get("/entity");

export const createEntity = async (entity) => axios.post("/entity", entity);