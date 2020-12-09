export const TOKEN_KEY = "@sfb-Token";
export const isAuthenticated = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return (
        token &&
        token.length > 0 &&
        token !== null &&
        `${token}` !== "undefined"
    );
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getCodigo = () => localStorage.getItem("codigo");

export const login = (token, codigo) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("codigo", codigo);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};
