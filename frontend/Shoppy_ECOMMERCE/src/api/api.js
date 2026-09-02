const API_URL = "http://localhost:8000";


export const apiFetch = async (url, options = {}) => {

    // --------------------------------
    // FIRST REQUEST
    // --------------------------------

    let response = await fetch(
        `${API_URL}${url}`,
        {
            ...options,
            credentials: "include"
        }
    );


    // --------------------------------
    // DON'T REFRESH LOGIN REQUEST
    // --------------------------------

    if (
        response.status !== 401 ||
        url === "/user/login" ||
        url === "/user/refresh-access"
    ) {

        return response;

    }


    // --------------------------------
    // ACCESS TOKEN EXPIRED
    // --------------------------------

    const refreshResponse = await fetch(
        `${API_URL}/user/refresh-access`,
        {
            method: "POST",
            credentials: "include"
        }
    );


    // --------------------------------
    // REFRESH TOKEN EXPIRED
    // --------------------------------

    if (!refreshResponse.ok) {

        return response;

    }


    // --------------------------------
    // RETRY ORIGINAL REQUEST
    // --------------------------------

    response = await fetch(
        `${API_URL}${url}`,
        {
            ...options,
            credentials: "include"
        }
    );


    return response;

};