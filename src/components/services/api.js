import {
    API_KEY,
    MOVIE_BASE_URL,
    TV_BASE_URL,
    SEARCH_BASE_URL,
    SINGLE_BASE_URL
  } from "../config/apiConfig";
  
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.results || data;
};

export const fetchMovies = async (category) => {
  const url = `${MOVIE_BASE_URL}${category}?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

  
export const fetchTV = async (category) => {
  const url = `${TV_BASE_URL}${category}?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const fetchSearch = async (category, query) => {
  const url = `${SEARCH_BASE_URL}${category}?query=${query}&api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};
    
export const fetchSingle = async (type, id) => {
  const url = `${SINGLE_BASE_URL}${type}/${id}?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

