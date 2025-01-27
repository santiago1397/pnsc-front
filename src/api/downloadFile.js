import axios from "./axios";

export const downloadExcel = async (noteId, fileName) => {

  try {
    /* axios.interceptors.request.use(config => {
      config.responseType = 'blob'
      config.params = {
        ...config.params,
        timestamp: new Date().getTime(),
      };
      return config;
    });

    axios.get(`/downloadFile/${noteId}/${fileName}`).then((dat) => {
      const url = 0

      const a = document.createElement('a')
      a.href = URL.createObjectURL(dat.data)
      a.download = `${fileName}`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(a.href)
      console.log(a.href)
      console.log(a)
      localStorage.removeItem('download')
    }) */
    const response = await fetch(`${import.meta.env.VITE_API_URL}/excel`, { credentials : "include" })
    if (response.ok) {
      const blob = await response.blob(); // Get the file data as a blob
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob); // Create a temporary URL for the blob
      /* link.download = `${fileName}`; */ // Set the desired download filename
      link.download = `formato_carga_pnsc.xlsx`;
      link.click();
      URL.revokeObjectURL(link.href); // Revoke the temporary URL after download
    } else {
      throw new Error('Download failed');
    }
  } catch (error) {
    console.log(error)
  }
}