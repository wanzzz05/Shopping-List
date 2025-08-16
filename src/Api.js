import axios from "axios";
const production_mode = false;

const production = "https://shopping-list-backend-production.up.railway.app/item";
const dev = "http://localhost:8080";

const API_URL = production_mode ? production : dev;

export const getItems = async (userId)=> {
    try {
        const response = await axios.get(`${API_URL}?userId=${userId}`);
        console.log(response);
        return response.data
    } catch (error) {
        console.error('Error fetching items:',error);
        throw error;
    }
};

export const deleteItem = async (itemId)=> {
    try {
        const response = await axios.delete(`${API_URL}/${itemId}`);
        console.log(response);
        return response.data
    } catch (error) {
        console.error('Error fetching items:',error);
        throw error;
    }    
};

export const addItem = async (itemData) => {
    try {
        const response = await axios.post(API_URL, itemData);
        console.log(response);
        return response.data
    } catch (error) {
        console.error('Error fetching items', error)
    }
};

export const editItem = async (editedItemData, itemId) => {
    try {
        const response = await axios.put(`${API_URL}/${itemId}`, editedItemData);
        console.log(response);
        return response.data
    } catch (error) {
        console.error('Error fetching items', error)
    }
};

export const signIn = async (userDetails) => {
    console.log(userDetails);

    try {
        const response = await axios.post(
            `${API_URL}/api/auth/signin`,
            userDetails
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};

export const signUp = async (userDetails) => {
    console.log(userDetails);

    try {
        const response = await axios.post(
            `${API_URL}/api/auth/signup`,
            userDetails
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};