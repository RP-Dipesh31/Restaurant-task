
import axios from "axios";

const createRestaurant = async (formData: FormData) => {
    try {
        const response = await axios.post("http://localhost:7000/api/restaurants", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export default createRestaurant;

