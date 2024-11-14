import React from 'react';
import axios from 'axios';

const Test2 = () => {
    // Function to fetch and open the file
    const fetchFile = async (fileId) => {
        try {
            const response = await axios.get(`http://localhost:8000/file/${fileId}`, {
                responseType: 'blob'
            });
    
            // Create a URL for the blob (binary data)
            const url = URL.createObjectURL(new Blob([response.data]));
    
            // Create an <a> element to trigger the download
            const link = document.createElement('a');
            link.href = url;
    
            // Determine the correct file extension based on the MIME type
            const mimeToExtension = {
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
                'text/x-python;': 'py',
                // Add more mappings as needed
            };
    
            link.download = response.headers['content-disposition']
                ? response.headers['content-disposition'].split('filename=')[1]
                : `downloaded_file.${mimeToExtension[response.headers['content-type']] || response.headers['content-type'].split('/')[1]}`;
    
            link.click(); // Simulate a click to download the file
            URL.revokeObjectURL(url); // Clean up the URL after the download
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    };
    

    return (
        <div>
            {/* Example button to fetch and open the file */}
            <button onClick={() => fetchFile(1)}>Download File 1</button>
            <button onClick={() => fetchFile(2)}>Download File 2</button>
            <button onClick={() => fetchFile(3)}>Download File 3</button>
            <button onClick={() => fetchFile(4)}>Download File 4</button>
            <button onClick={() => fetchFile(5)}>Download File 5</button>
            {/* Add more buttons for different file IDs if needed */}
        </div>
    );
};

export default Test2;
