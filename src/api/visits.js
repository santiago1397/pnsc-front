import axios from "./axios";

export const createVisit = async (visit) => axios.post("/visits", visit);
export const getVisits = async (skip,limit) => axios.get(`/visits/${skip}/${limit}`);