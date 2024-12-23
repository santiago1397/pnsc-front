import axios from "./axios";


export const getDpt = async (payload) => axios.post(`/mydpt`,payload );