export const useAuth = () => {
    const getUserData = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    };

    const setUserData = (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
    };

    const clearUserData = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
    };

    return { getUserData, setUserData, clearUserData };
}; 