import axios from "./axios";


export const getGeneralReport = async () => axios.get("/report/general");




export const downloadDatabase = async () => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/report/db`, { credentials: "include" })
        if (response.ok) {
            const blob = await response.blob(); // Get the file data as a blob
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob); // Create a temporary URL for the blob
            /* link.download = `${fileName}`; */ // Set the desired download filename
            let filename = `Database` + `_${new Date().toISOString().slice(0, 10)}.xlsx`;

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