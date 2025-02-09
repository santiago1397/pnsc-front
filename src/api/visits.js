import axios from "./axios";

export const createVisit = async (visit) => axios.post("/visits", visit);
export const getVisits = async (skip,limit) => axios.get(`/visits/${skip}/${limit}`);
export const getVisitsFull = async (skip, limit, entity) => axios.get(`/visits/${skip}/${limit}?entity=${entity}`);
export const verifyStudents = async (visit) => axios.post("/visits/verify", visit);
export const deleteVisit = async (id) => axios.delete(`/visits/${id}`);



export const getVisitReport = async (entity, id) => {

	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/visits/visit/${entity}/${id}`, { credentials: "include" })
		if (response.ok) {
			const blob = await response.blob(); // Get the file data as a blob
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob); // Create a temporary URL for the blob
			/* link.download = `${fileName}`; */ // Set the desired download filename
			let filename = `${id}.xlsx`;

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