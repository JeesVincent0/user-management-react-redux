import { toast } from "react-toastify";
import { logoutUser } from "../redux/middleware/logoutUserThunk";

const BASE_URL = `http://localhost:3000`;

const fetchData = async (url: string, options = {}) => {

    const response = await fetch(BASE_URL + url, {
        ...options,
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok && data?.validation === 'failed') {
        const refreshResponse = await fetch(BASE_URL + `/api/refresh`, {
            method: 'POST',
            credentials: 'include',
        })

        if (refreshResponse.ok) {
            return await fetchData(url, options);
        } else {
            toast.error("Please login again...")
            logoutUser();
            return data
        }
    } else {
        return data;
    }
}

export default fetchData;