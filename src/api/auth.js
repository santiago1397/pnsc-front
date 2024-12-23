import axios from "./axios";


export const registerRequest = async (user) => axios.post("/auth/register",user);

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);

export const emailConfirmation = async (user,token) => axios.get(`/auth/${user}/verify/${token}`);

export const forgotPassword = async (email) => axios.post(`/auth/forgot-password`, { email: email });

export const resetPassword = async (data) => axios.post(`/auth/reset-password`, data);


