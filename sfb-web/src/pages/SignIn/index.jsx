import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/logo_SFB.png";
import api from "../../services/api";
import { autenticar } from "../../data/remote/login";

import { Form, Container } from "./styles";
import { login } from "../../services/auth";

class SignIn extends Component {
    state = {
        client: "",
        password: "",
        error: "",
    };

    handleSignIn = async (e) => {
        e.preventDefault();
        const { client, password } = this.state;
        if (!client || !password) {
            this.setState({
                error: "Preencha usuário e senha para continuar!",
            });
        } else {
            try {
                const response = await autenticar(password, client);
                console.log("response :", response);
                login(response.token, response.codigo);
                this.props.history.push("/app");
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais.",
                });
            }
        }
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSignIn}>
                    <img src={Logo} alt="SFB logo" />
                    {this.state.error && <p>{this.state.error}</p>}
                    <input
                        placeholder="Usuário"
                        onChange={(e) =>
                            this.setState({ client: e.target.value })
                        }
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={(e) =>
                            this.setState({ password: e.target.value })
                        }
                    />
                    <button type="submit">Entrar</button>
                    <hr />
                </Form>
            </Container>
        );
    }
}

export default withRouter(SignIn);
