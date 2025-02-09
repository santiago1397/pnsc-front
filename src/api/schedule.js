import axios from "./axios";


export const getSchedules = async (skip,limit) => axios.get(`/schedule/${skip}/${limit}`);
export const getSchedulesFull = async (skip, limit, entity) => axios.get(`/schedule/${skip}/${limit}?entity=${entity}`);
export const createSchedule = async (schedule) => axios.post("/schedule", schedule);
/* export const editUser = async (id) => axios.put(`/user/${id}`); */
export const deleteSchedule = async (id) => axios.delete(`/schedule/${id}`);