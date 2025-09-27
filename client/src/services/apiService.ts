import { toast } from "react-toastify";

const BASE_URL = `http://localhost:3000`;

const fetchData = async (url: string, options = {}) => {

    const response = await fetch(BASE_URL + url, {
        ...options,
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok && !data?.validation) {
        const refreshResponse = await fetch(BASE_URL + `/api/refresh`, {
            method: 'POST',
        })

        if (refreshResponse.ok) {
            console.log("Refresh token is valid")
            return await fetchData(url, options);
        } else {
            toast.dismiss();
            return data
        }
    } else {
        return data;
    }
}

export default fetchData;