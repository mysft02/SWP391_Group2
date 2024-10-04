// src/config/AxiosConfig.js
import React, { createContext, useContext } from 'react';
import axios from 'axios';

// Tạo cấu hình Axios
const config = {
    baseURL: "https://localhost:44361/",
    headers: {
        "Content-Type": "application/json",
    },
};

// Tạo instance Axios
const api = axios.create(config);

// Tạo context để cung cấp instance Axios
const AxiosContext = createContext(api);

// Tạo provider cho Axios
export const AxiosProvider = ({ children }) => {
    return (
        <AxiosContext.Provider value={api}>
            {children}
        </AxiosContext.Provider>
    );
};

// Custom hook để sử dụng Axios instance
export const useAxios = () => {
    return useContext(AxiosContext);
};

// Component để hiển thị thông tin cấu hình Axios (có thể tùy chọn)
const AxiosConfig = () => {
    return (
        <div>
            <h2>Axios Configuration</h2>
            <p>Base URL: {config.baseURL}</p>
        </div>
    );
};

// Xuất Axios instance và component AxiosConfig
export { AxiosConfig, api };
