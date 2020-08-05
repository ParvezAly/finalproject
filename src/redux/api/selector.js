const setToken = (token) => {
    localStorage.setItem("token", token)
};
const setUserName = (name) => {
    localStorage.setItem("user_name", name)
};
const setUserEmail = (email) => {
    localStorage.setItem("email", email)
};
const getToken = () => {
    return localStorage.getItem("token");
};
const getUserName = () => {
    return localStorage.getItem("user_name");
};
const getUserEmail = () => {
    return localStorage.getItem("email");
};

const removeToken = () => {
    return localStorage.removeItem("token")
};
const removeUserName = () => {
    return localStorage.removeItem("user_name");
};
const removeUserEmail = () => {
    return localStorage.removeItem("email");
};

export {
    setToken,
    setUserName,
    setUserEmail,
    getUserName,
    getUserEmail,
    getToken,
    removeToken,
    removeUserName,
    removeUserEmail
}