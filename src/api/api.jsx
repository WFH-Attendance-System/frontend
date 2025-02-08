import axios from "axios";
import Cookies from "js-cookie";

class Api {
    constructor(baseUrl, token, setToken, navigate) {
        this.token = token;
        this.setToken = setToken;
        this.navigate = navigate;

        const customAxios = axios.create({
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        customAxios.interceptors.response.use(
            (res) => res,
            async (err) => {
                if (axios.isAxiosError(err) && err.response) {
                    const originalConfig = err.config;

                    // retry request when status is 401
                    if (err.response.status === 401 && !originalConfig._retry) {
                        // attach access token when response error data is unauthorized (indicates resource requires access token, but token is not present) and token exists
                        if (
                            err.response.data.error === "unauthorized" &&
                            this.token
                        ) {
                            return customAxios({
                                ...originalConfig,
                                headers: {
                                    ...originalConfig.headers,
                                    Authorization: `Bearer ${this.token}`,
                                },
                            });
                        }

                        // else indicates expired access token, continue to refresh access token
                        originalConfig._retry = true;
                        try {
                            const refreshToken = Cookies.get("refresh-token");
                            if (
                                refreshToken &&
                                refreshToken.split(".").length === 3
                            ) {
                                const res = await customAxios.get(
                                    `/api/refresh-token?refresh_token=${refreshToken}`
                                );
                                Cookies.set(
                                    "refresh-token",
                                    res.data.refresh_token
                                );
                                this.setToken(res.data.access_token);

                                // retry the original request with new access token
                                return customAxios({
                                    ...originalConfig,
                                    headers: {
                                        ...originalConfig.headers,
                                        Authorization: `Bearer ${res.data.access_token}`,
                                    },
                                });
                            }
                        } catch (err) {
                            console.error(
                                "Error refreshing access token: ",
                                err
                            );
                            this.navigate("/login");
                        }
                    }
                }

                // uncaught error is thrown to get caught by await api.method()
                throw err;
            }
        );

        this.axiosInstance = customAxios;
    }

    async request(endpoint, options) {
        const response = await this.axiosInstance.request({
            url: endpoint,
            ...options,
        });
        return response;
    }

    get(endpoint, options) {
        return this.request(endpoint, { ...options, method: "GET" });
    }

    post(endpoint, body, options) {
        return this.request(endpoint, {
            ...options,
            method: "POST",
            data: body,
        });
    }

    put(endpoint, body, options) {
        return this.request(endpoint, {
            ...options,
            method: "PUT",
            data: body,
        });
    }

    patch(endpoint, body, options) {
        return this.request(endpoint, {
            ...options,
            method: "PATCH",
            data: body,
        });
    }

    delete(endpoint, options) {
        return this.request(endpoint, { ...options, method: "DELETE" });
    }
}

export default Api;
