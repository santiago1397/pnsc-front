import axios from "./axios";


export const getCategories = async () => axios.get("/category");
