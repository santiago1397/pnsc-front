import axios from "./axios";


export const getDpt = async (payload) => axios.post(`/mydpt`, payload);
export const validateDpt = async (payload) => axios.post(`/mydpt/validate`, payload);