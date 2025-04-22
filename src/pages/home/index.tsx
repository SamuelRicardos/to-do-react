import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "../home/styles.css"

interface Task {
    title: string,
    category: string,
    description: string,
    date: string,
    id: string
}

const tasks = [
    {
      id: "01",
      title:"Tarefa 1",
      category: "Trabalho",
      description: "Descricao de teste",
      date:"2023-05-03"
    },
    {
      id: "02",
      title:"Tarefa 2",
      category: "Trabalho",
      description: "Descricao de teste 2",
      date:"2023-05-03"
    },
    {
      id: "03",
      title:"Tarefa 3",
      category: "Estudo",
      description: "Descricao de teste 3",
      date:"2023-05-03"
    }
  ];

export default function Home() {
    const [titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [id, setId] = useState("");

    const [tarefas, setTarefas] = useState(tasks);

    function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(id) {
            editTask();
        } else {
            setTarefas([...tarefas, {id: String(Date.now()), title: titulo, category: categoria, date: data, description: descricao}]);
    
            setTitulo("")
            setDescricao("")
            setData("")
            setCategoria("")

        }

        // const copyArray = [...tarefas]
        
        // copyArray.push({id: String(Date.now()),title: titulo, category: categoria, date: data, description: descricao})

        // console.log({titulo, categoria, data, descricao});
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

        setTitulo("")
        setDescricao("")
        setId("");
        setData("")
        setCategoria("")
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
                <h2>Lista de tarefas</h2>

                <ul>
                    {tarefas.map((tarefa) => (
                        <li>
                            <h4>{tarefa.title} - {tarefa.id}</h4>
                            <p>{tarefa.category}</p>
                            <p>{tarefa.date}</p>
                            <p>{tarefa.description}</p>
                            <div>
                            <MdEdit color="green" size={30} onClick={() => preencheEstados(tarefa)} />
                            <MdDelete color="red" size={30} onClick={() => alert("Ok2")} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}