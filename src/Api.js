import axios from "axios";

const API_URL = "https://shopping-list-backend-production.up.railway.app/item";

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

export const deleteItem = async (itemId)=> {
    try {
        const response = await axios.delete(`${API_URL}/${itemId}`);
        console.log(response);
        return response.data
    } catch (error) {
        console.error('Error fetching items:',error);
        throw error;
    }    
}

export const addItem = async (itemData) => {
    try {
        const response = await axios.post(API_URL, itemData);
        console.log(response);
        return response.data
    } catch (error) {
        console.error('Error fetching items', error)
    }
}

export const editItem = async (editedItemData, itemId) => {
    try {
        const response = await axios.put(`${API_URL}/${itemId}`, editedItemData);
        console.log(response);
        return response.data
    } catch (error) {
        console.error('Error fetching items', error)
    }
}