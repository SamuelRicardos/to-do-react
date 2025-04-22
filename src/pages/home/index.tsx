import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "../home/styles.css"

interface Task {
    title: string,
    category: string,
    description: string,
    date: string,
    id: string
}

export default function Home() {
    const [titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [id, setId] = useState("");

    const [tarefas, setTarefas] = useState<Task[]>([]);

    useEffect(() => {
        const tasksSalvas = localStorage.getItem("@tasks")

        if(tasksSalvas) {
            setTarefas(JSON.parse(tasksSalvas));
        }
    }, [])

    function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(id) {
            editTask();
        } else {
            const novaTarefa: Task = {
                id: Date.now().toString(),
                title: titulo,
                category: categoria,
                date: data,
                description: descricao
            };
            const novasTarefas = [...tarefas, novaTarefa];

            setTarefas(novasTarefas);

            localStorage.setItem("@tasks", JSON.stringify(novasTarefas))
    
            setTitulo("")
            setDescricao("")
            setData("")
            setCategoria("")

        }

    }

    function preencheEstados(tarefa: Task) {
        setTitulo(tarefa.title);
        setCategoria(tarefa.category);
        setData(tarefa.date);
        setDescricao(tarefa.description);
        setId(tarefa.id)
    }

    function editTask(){
        const posicaoArray = tarefas.findIndex((tarefa) => tarefa.id == id);

        const copiaTarefas = [...tarefas]

        copiaTarefas[posicaoArray] = {
            id: id,
            title: titulo,
            category: categoria,
            date: data,
            description: descricao
        };

        setTarefas(copiaTarefas);

        localStorage.setItem("@tasks", JSON.stringify(copiaTarefas))

        setTitulo("")
        setDescricao("")
        setId("");
        setData("")
        setCategoria("")
    }

    function apagarTarefa(id: string) {

        const arrayFiltrado = tarefas.filter((tarefa) => tarefa.id != id)

        localStorage.setItem("@tasks", JSON.stringify(arrayFiltrado))

        setTarefas(arrayFiltrado)
    }

    return(
        <div className="container_home"> 
            <div className="form">
                <form onSubmit={submitForm}>
                    <h2>Cadastrar tarefa</h2>
                    <input 
                    type="text" 
                    placeholder="Título"
                    value={titulo}
                    onChange={(event) => setTitulo(event.target.value)}
                    />

                    <select
                    aria-placeholder="Categoria"
                    value={categoria}
                    onChange={(event) => setCategoria(event.target.value)}
                    >
                        <option value=""></option>
                        <option value="Trabalho">Trabalho</option>
                        <option value="Estudo">Estudo</option>
                    </select>

                    <input 
                    type="date" 
                    placeholder="Data"
                    value={data}
                    onChange={(event) => setData(event.target.value)}
                     />

                    <textarea 
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                    ></textarea>

                    <button type="submit">Salvar</button>
                </form>
            </div>

            <div className="container_tasks">
                <h2>Lista de tarefas - Total: {tarefas.length}</h2>

                {tarefas.length < 1 && "Nenhuma tarefa cadastrada"}

                <ul>
                    {tarefas.map((tarefa) => (
                        <li>
                            <h4>{tarefa.title} - {tarefa.id}</h4>
                            <p>{tarefa.category}</p>
                            <p>{tarefa.date}</p>
                            <p>{tarefa.description}</p>
                            <div>
                            <MdEdit color="green" size={30} onClick={() => preencheEstados(tarefa)} />
                            <MdDelete color="red" size={30} onClick={() => apagarTarefa(tarefa.id)} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}