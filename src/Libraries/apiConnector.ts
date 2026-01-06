import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Type for supported HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Type for the API request configuration
export interface ApiRequestConfig {
    url: string;
    method: HttpMethod;
    maxRetries?: number;
    delayBetweenRetries?: number;
    data?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
}

// Create a pre-configured Axios instance for API requests
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3007',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response Interceptor for handling common response logic, such as error mediation
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Optionally transform all responses here
        return response.data;
    },
    (error: any) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized - redirecting to login');
        } else if (error.response && error.response.status === 500) {
            console.error('Server error');
        } else if (error.response && error.response.status === 400) {
            console.error('Bad request');
        }
        // Always propagate the error to the caller
        return Promise.reject(error);
    }
);

/**
 * Makes an API request using the provided configuration and handles retries.
 *
 * @param config - Configuration for the API request.
 * @returns Promise resolving to the API response data.
 * @throws Error If the config contains invalid properties or the request fails after retries.
 */
export async function handleApiRequest(config: ApiRequestConfig): Promise<any> {
    const allowedProperties = ['url', 'method', 'maxRetries', 'delayBetweenRetries', 'data', 'params', 'headers'];

    // Validate the config object for allowed properties
    for (const prop in config) {
        if (!allowedProperties.includes(prop)) {
            throw new Error(`Invalid property in the config object: ${prop}`);
        }
    }

    const {
        url,
        method,
        maxRetries = 2,
        delayBetweenRetries = 1,
        data,
        params,
        headers
    } = config;

    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            switch (method.toUpperCase()) {
                case 'GET':
                    return await axiosInstance.get(url, { params, headers });
                case 'POST':
                    return await axiosInstance.post(url, data, { headers });
                case 'PUT':
                    return await axiosInstance.put(url, data, { headers });
                case 'PATCH':
                    return await axiosInstance.patch(url, data, { headers });
                case 'DELETE':
                    return await axiosInstance.delete(url, { headers });
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }
        } catch (error) {
            lastError = error;
            if (attempt < maxRetries) {
                await new Promise(res => setTimeout(res, delayBetweenRetries * 1000));
            } else {
                console.log('max retry reached', error);
                if (axios.isAxiosError(error)) {
                    throw new Error(JSON.stringify(error.response?.data || error.message));
                } else {
                    throw error;
                }
            }
        }
    }
}
