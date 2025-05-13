import axios from "./axios";

export const UploadImage = async (fileName, file) => {
  const apiurl = import.meta.env.VITE_API_URL
  const chunkSize = 1024 * 20;
  const totalChunks = Math.ceil(file.size / chunkSize);
  const chunkProgress = 100 / totalChunks;


  const sendChunk = async (start, end) => {

    const fileData = new FormData();
    const blobSlice = file.slice(start, end);

    console.log(fileName)
    fileData.append('file', blobSlice, file.name);
    fileData.append('name', fileName);
    return await axios.post(apiurl + '/uploadImage', fileData)
  }

  console.log(totalChunks)

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = (i + 1) * chunkSize;
    await sendChunk(start, end);
  }


}

export const downloadImage = async (fileName) => {

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/image/${fileName}`, { credentials : "include" })
    if (response.ok) {
      const blob = await response.blob(); // Get the file data as a blob
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob); // Create a temporary URL for the blob
      link.download = `${fileName}`; // Set the desired download filename
      /* link.download = `formato_carga_pnsc.xlsx`; */
      link.click();
      URL.revokeObjectURL(link.href); // Revoke the temporary URL after download
    } else {
      throw new Error('Download failed');
    }
  } catch (error) {
    console.log(error)
  }
}