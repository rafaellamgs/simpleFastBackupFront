import api from "../../services/api";

export async function getUser(codigo) {
    try {
        const data = await api.get(`/${codigo}`);
        return data && data.data
            ? data.data
            : {
                  codigo: 0,
                  nome: "",
                  usuario: "",
                  ip: "",
                  origem_bkp: "",
                  uso_max_armaz: 0,
                  porc_uso_armaz: 0,
                  perm_alerta: 0,
                  perm_bkp_autm: 0,
                  hora_bkp_autm: 0,
                  apto_backup: 0,
                  user_block: 0,
              };
    } catch (erro) {
        return erro?.message;
    }
}
