import React, {useEffect,useState} from 'react'
import axios from "axios";

interface ITodo{
    id:number;
    message:string;
}
const Home = () => {
    const [data,setData]=useState([] as ITodo[])
    const [editedTodo,setEditedTodo]=useState({} as ITodo)
    const [message,setMessage]=useState("" as string)

    const fetchData=async () => {
        let response=await axios.get("http://localhost:4000/todos");
        setData(response.data)
    }

    const handleChange=(event:any)=>{
        event.persist();
        setMessage(event.target.value)
    }

    const handleEditChange=(event:any)=>{
        event.persist();
        setEditedTodo({
            ...editedTodo,
            message:event.target.value,
        })
    }

    const handleSubmit=async()=>{
        let respnose=await axios.post("http://localhost:4000/todos",{
            message:message,
        });
        fetchData()
    }
    

    const handleTodoEdit=async()=>{
        let response=await axios.patch(
            `http://localhost:4000/todos/${editedTodo.id}`,
            {
                message:editedTodo.message,
            }
        );
        fetchData();
    }

    const handleCardEdit=async(id:number)=>{
        let response=await axios.get(
            `http://localhost:4000/todos/${id}`);
            setEditedTodo(response.data);
    }

    const deleteTodo=async(id:number)=>{
        let response=await axios.delete( `http://localhost:4000/todos/${id}`);
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, []);


        
  return (
    
    <div className='main-wrapper'>
    
        <div className='card-wrapper'>
            {data.map((message:any)=>(
                <div className='card'>
                    <p onClick={()=>{
                        handleCardEdit(message.id)
                    }} className="card-message">{message.message}</p>
                
                <div>
                <button onClick={()=>{deleteTodo(message.id)}}>D</button>
                </div>
                </div>
            ))}
        </div>
        <div className='input-wrapper'>
            <input
                value={message}
                onChange={handleChange}
            
                id="message"
                type="text"/>
            <button onClick={handleSubmit}>Add Message</button>

        </div>

        <div className='input-wrapper'>
            <input
                value={editedTodo.message}
                onChange={handleEditChange}
            
                id="message"
                type="text"/>
            <button onClick={handleTodoEdit}>Edit Message</button>

        </div>
        </div>
 )
}

export default Home;