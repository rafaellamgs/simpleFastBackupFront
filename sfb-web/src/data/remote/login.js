import api from "../../services/api";

export async function autenticar(password_call, nome) {
    try {
        const data = await api.put("/login", { password_call, nome });
        return data && data.data ? data.data : { cliente: [] };
    } catch (erro) {
        return erro?.message;
    }
}
