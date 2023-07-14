"use client"
import React, { useEffect, useState } from 'react'
import * as signalR from "@microsoft/signalr";
import styles from "../page.module.css"
import { Button } from 'primereact/button';
import './chat.css'
function Chat() {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  useEffect(() => {
    createConnection();
  },[]);

  const createConnection = () => {
    let connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5210/api/chathub").build();

    setConnection(connection);
  }
  useEffect(() => {
    if(!connection) return;
    connection.on('MessageReceived', (messages) => {
        setMessages(messages);
    })
    connection.start().then(() => {
        console.log(connection.connectionId);
    });
  }, [connection])

  return (
    <main className={styles.main}>
        Chat

<div className='w-50'>
    {messages.map(message => 
    <p className={'message-box ' + (message.connectionId == connection.connectionId ? 'message-right' : '')}>{message.detail}</p>
    )}
</div>
<div className='w-50'>
        <input className='form-control' value={message} onChange={(e) => {setMessage(e.target.value)}}/>
        <Button label="Gönder" className='w-100 mt-2' onClick={() => {
            connection.invoke("SendMessageAsync",message,connection.connectionId);
        }}></Button>
        </div>
    </main>
  )
}

export default Chat

// socket.io  => nodejs
// görüntülü live data
