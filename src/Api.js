import axios from "axios";

const API_URL = "http://localhost:8080/item";

export const getItems = async ()=> {
    try {
        const response = await axios.get(API_URL);
        console.log(response);
        return response.data
    } catch (error) {
        console.error('Error fetching items:',error);
        throw error;
    }
}