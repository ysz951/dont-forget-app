export default {
    // API_ENDPOINT: "http://localhost:8000/api",
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || "https://damp-atoll-19992.herokuapp.com/api",
    TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY,
};