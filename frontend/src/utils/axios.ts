import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor Request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Tambahkan logika sebelum request dikirim
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor Response
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
