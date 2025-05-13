import axios from "./axios";


export const getSchedules = async (skip,limit) => axios.get(`/schedule/${skip}/${limit}`);
export const getSchedulesFull = async (skip, limit, entity) => axios.get(`/schedule/${skip}/${limit}?entity=${entity}`);
export const createSchedule = async (schedule) => axios.post("/schedule", schedule);
/* export const editUser = async (id) => axios.put(`/user/${id}`); */
export const deleteSchedule = async (id) => axios.delete(`/schedule/${id}`);



export const getPdfReport = async (entity) => {

	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/scheduleReport/${entity}`, { credentials: "include" })
		if (response.ok) {
			const blob = await response.blob(); // Get the file data as a blob
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob); // Create a temporary URL for the blob
			/* link.download = `${fileName}`; */ // Set the desired download filename
			let filename = `report` + `_${new Date().toISOString().slice(0, 10)}.pdf`;

			link.download = filename;
			link.click();
			URL.revokeObjectURL(link.href); // Revoke the temporary URL after download
		} else {
			throw new Error('Download failed');
		}
	} catch (error) {
		console.log(error)
	}
}