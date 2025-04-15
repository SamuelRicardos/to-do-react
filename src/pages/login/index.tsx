import { useState } from "react"
import "./styles.css"

export default function Login() {

    const [name, setName] = useState("");

    return(
        <div className="container_login">
            <div className="card_login">
                <h1>Informe seu nome</h1>
                <div className="container_form">
                <input type="text" onChange={(evento)=> setName(evento.target.value)} placeholder="Digite aqui" />
                <button>Entrar</button>
                </div>
            </div>
        </div>
    )
}