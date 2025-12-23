import axios from 'axios';

const PsbApi = axios.create({
    baseURL: 'http://localhost/SantriConnect/backend/app/psb/daftar.php',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
});

PsbApi.interceptors.response.use(
    (response) => response,
    (error) => {
        // Ini akan memunculkan error di Console jika Network gagal
        console.error('PSB API Error Detail:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default PsbApi;