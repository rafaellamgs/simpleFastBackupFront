import * as React from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { getUser } from "../../data/remote/getUser";
import { getCodigo } from "../../services/auth";
import "./style.css";
import "./tema.css";
import Logo from "../../assets/logo_SFB.png";
import {
    ativarBackup,
    ativarNotificacoes,
    updateHoraBackup,
} from "../../data/remote/actions";
import { Formik } from "formik";
import Switch from "react-switch";
import CustomSwitch from "../../componets/Switch";
import TimePicker from "rc-time-picker";
import moment from "moment";
import "rc-time-picker/assets/index.css";
export default function Dashboard(props) {
    const [client, setClient] = React.useState({
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
    });

    const [disableInputs, setDisableInputs] = React.useState(false);
    const [codigo, setCodigo] = React.useState(0);
    const [alerta, setAlerta] = React.useState(false);
    const [bkpAutm, setBkpAutm] = React.useState(false);
    const [horaBackup, setHoraBackup] = React.useState("");

    React.useEffect(() => {
        setCodigo(Number(getCodigo()));
        getUser(getCodigo())
            .then((data) => {
                console.log("data :", data);
                setClient(data);
                setAlerta(data.perm_alerta === 1 ? true : false);
                setBkpAutm(data.perm_bkp_autm === 1 ? true : false);
                setHoraBackup(data.hora_bkp_autm);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleAlerta(value) {
        ativarNotificacoes(codigo, value ? 1 : 0)
            .then((response) => {
                if (!response.error) {
                    setAlerta(value);
                }
            })
            .finally(() => {
                setDisableInputs(false);
            });
    }

    function handleBackupAutomatico(value) {
        console.log("horaBackup :", horaBackup);
        console.log("horaBackup :", moment(horaBackup, "DD/MM/YYYY hh:mm:ss"));
        ativarBackup(codigo, value ? 1 : 0)
            .then((response) => {
                if (!response.error) {
                    setBkpAutm(value);
                }
            })
            .finally(() => {
                setDisableInputs(false);
            });
    }

    function handleHoraBAckup() {
        console.log("horaBackup :", horaBackup);
        updateHoraBackup(codigo, horaBackup)
            .then((response) => {
                if (!response.error) {
                    //
                }
            })
            .finally(() => {
                setDisableInputs(false);
            });
    }

    function handleBackup() {
        realizarBackup(codigo)
            .then((response) => {
                if (!response.error) {
                    //
                }
            })
            .finally(() => {
                setDisableInputs(false);
            });
    }

    function bytesToSize(bytes, seperator = "") {
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        if (bytes == 0) return "n/a";
        // @ts-ignore
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        if (i === 0) return `${bytes}${seperator}${sizes[i]}`;
        return `${(bytes / 1024 ** i).toFixed(1)}${seperator}${sizes[i]}`;
    }

    return (
        <div id="app">
            <section className="section">
                <div className="dashboard">
                    <div className="is-title-bar">
                        <div className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <h1 className="title">Olá {client.nome}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tile is-ancestor">
                        <div className="tile is-parent">
                            <div className="card tile is-child d-flex justify-content-center ">
                                <div className="card-content">
                                    <div className="level">
                                        <div className="level-item">
                                            <div className="is-widget-label w-100">
                                                <h3 className="subtitle is-spaced">
                                                    Espaço utilizado:
                                                </h3>
                                                <div className="w-100">
                                                    <ProgressBar
                                                        animated
                                                        now={
                                                            client.porc_uso_armaz
                                                        }
                                                        variant={
                                                            client.porc_uso_armaz >
                                                            90
                                                                ? "warning"
                                                                : "info"
                                                        }
                                                        label={`${client.porc_uso_armaz}%`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <div className="card tile is-child d-flex justify-content-center ">
                                <div className="card-content">
                                    <div className="level">
                                        <div className="level-item has-widget-icon">
                                            <div className="is-widget-icon">
                                                <span className="icon has-text-info is-large">
                                                    <img
                                                        src={Logo}
                                                        alt="SFB logo"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="level-item">
                                            <div className="is-widget-label w-100">
                                                <h3 className="subtitle is-spaced">
                                                    Espaço contratado:
                                                </h3>
                                                <code>
                                                    {bytesToSize(
                                                        client.uso_max_armaz
                                                    )}
                                                </code>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <div className="card tile is-child d-flex justify-content-center ">
                                <div className="card-content">
                                    <div className="level">
                                        <div className="level-item">
                                            <div className="is-widget-label w-100">
                                                <CustomSwitch
                                                    label="Notificações"
                                                    onChange={handleAlerta}
                                                    checked={alerta}
                                                    id="perm_alerta"
                                                    disabled={disableInputs}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tile is-ancestor">
                        <div className="tile is-parent" style={{ flex: "0.6" }}>
                            <div className="card tile is-child d-flex justify-content-center ">
                                <div className="card-content">
                                    <div className="level">
                                        <div className="level-item">
                                            <div className="is-widget-label w-100">
                                                <CustomSwitch
                                                    label="Backup Automatico"
                                                    onChange={
                                                        handleBackupAutomatico
                                                    }
                                                    checked={bkpAutm}
                                                    id="perm_bkp_autm"
                                                    disabled={disableInputs}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <div className="card tile is-child d-flex justify-content-center ">
                                <div className="card-content">
                                    <div className="level">
                                        <div className="level-item">
                                            <div className="is-widget-label w-100">
                                                {horaBackup && (
                                                    <TimePicker
                                                        defaultValue={moment(
                                                            `${moment().format(
                                                                "DD/MM/YYYY"
                                                            )} ${horaBackup}`,
                                                            "DD/MM/YYYY hh:mm:ss"
                                                        )}
                                                        format="hh:mm"
                                                        showSecond={false}
                                                        onChange={(event) => {
                                                            setHoraBackup(
                                                                event.format(
                                                                    "hh:mm:ss"
                                                                )
                                                            );
                                                        }}
                                                    />
                                                )}
                                                <Button
                                                    style={{
                                                        marginLeft: "16px",
                                                    }}
                                                    onClick={handleHoraBAckup}
                                                    variant="outline-primary"
                                                >
                                                    Salvar Hora do Backup
                                                    Automático
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tile is-parent" style={{ flex: "0.4" }}>
                            <div className="card tile is-child d-flex justify-content-center ">
                                <div className="card-content">
                                    <div className="level">
                                        <div className="level-item">
                                            <div className="is-widget-label w-100">
                                                <Button
                                                    style={{
                                                        marginLeft: "16px",
                                                    }}
                                                    onClick={handleBackup}
                                                    variant="outline-primary"
                                                >
                                                    Realizar Backup
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tile is-ancestor">
                        <div
                            className="tile is-parent"
                            style={{ flex: "0.6" }}
                        ></div>
                    </div>
                </div>
            </section>
        </div>
    );
}
