import axios from "axios";

const url = "http://localhost:8080/";

const token = localStorage.getItem("token") || null;

const services = axios.create({
    baseURL: url,
    timeout: 25000,
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

export default services;
