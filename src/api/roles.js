import axios from "./axios";


export const getRoles = async () => axios.get("/roles");

/* export const createEntity = async (entity) => axios.post("/entity", entity); */