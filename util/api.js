import axios from "axios";

const client = axios.create({
  baseURL: process.env.BASE_URL,
});

export const getAllCountries = () => client.get("/country");

export const createCountry = (data) => client.post("/country", data);

export const deleteCountry = (id) => client.delete("/country/" + id);

export const getAllUsers = () => client.get("/user");

export const createUser = (data) => client.post("/user", data);
