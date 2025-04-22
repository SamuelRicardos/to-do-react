import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./styles.css"

export default function Login() {

    const [name, setName] = useState("");
    const navigate = useNavigate();

function handleNavigate() {
    navigate("/home")
}

    return(
        <div className="container_login">
            <div className="card_login">
                <h1>Informe seu nome</h1>
                <div className="container_form">
                <input type="text" onChange={(evento)=> setName(evento.target.value)} placeholder="Digite aqui" />
                <button onClick={handleNavigate}>Entrar</button>
                </div>
            </div>
        </div>
    )
}