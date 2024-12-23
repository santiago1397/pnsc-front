import axios from "./axios";


export const getActivities = async (skip,limit) => axios.get(`/activities/${skip}/${limit}`);

export const createActivity = async (activity) => axios.post("/activities", activity);

export const deleteActivity  = async (id) => axios.delete(`/activities/${id}`);

export const editActivity  = async (id, data) => axios.put(`/activities/${id}`, data);
