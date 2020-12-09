import api from "../../services/api";

export async function ativarBackup(codigo, ativar) {
    try {
        const data = await api.put(
            `${codigo}/ativar-backup?perm_bkp_autm=${ativar}`
        );
        return data && data.data ? data.data : { error: true };
    } catch (erro) {
        return erro?.message;
    }
}

export async function ativarNotificacoes(codigo, perm_alerta) {
    try {
        const data = await api.put(
            `${codigo}/ativar-notificacao?perm_alerta=${perm_alerta}`
        );
        return data && data.data ? data.data : { error: true };
    } catch (erro) {
        return erro?.message;
    }
}

export async function updateHoraBackup(codigo, time) {
    try {
        const data = await api.put(
            `${codigo}/hora-backup?hora_bkp_autm=${time}`
        );
        return data && data.data ? data.data : { error: true };
    } catch (erro) {
        return erro?.message;
    }
}

export async function realizarBackup(codigo) {
    try {
        const data = await api.put(`${codigo}/realizar-backup`);
        return data && data.data ? data.data : { error: true };
    } catch (erro) {
        return erro?.message;
    }
}
