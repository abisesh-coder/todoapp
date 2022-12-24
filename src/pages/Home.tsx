import React, {useEffect,useState} from 'react'
import axios from "axios";


const Home = () => {
    const [data,setData]=useState([])
    const [message,setMessage]=useState("" as string)

    const fetchData=async () => {
        let response=await axios.get("http://localhost:4000/todos");
        setData(response.data)
    }

    const handleChange=(event:any)=>{
        event.persist();
        setMessage(event.target.value)
    }

    const handleSubmit=async()=>{
        let respnose=await axios.post("http://localhost:4000/todos",{
            message:message,
        });
        fetchData()
    }
    useEffect(() => {
        fetchData();
    }, []);
    
  return (
    <div className='main-wrapper'>
    
        <div className='card-wrapper'>
            {data.map((message:any)=>(
                <div className='card'>
                    <p className='card-message'>{message.message}</p>
                </div>
            ))}
        </div>
        <div className='input-wrapper'>
            <input
                value={message}
                onChange={handleChange}
            
                id="message"
                type="text"/>

        </div>

    </div>
  )
}

export default Home