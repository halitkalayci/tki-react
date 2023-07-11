"use client"
import React, { useEffect, useState } from 'react'
import * as signalR from "@microsoft/signalr";
function Chat() {
    const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("")
  useEffect(() => {
    createConnection();
  },[]);

  const createConnection = () => {
    let connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5210/api/chathub").build();

    setConnection(connection);

   
  }
  useEffect(() => {
    if(!connection) return;
    connection.on('MessageReceived', (message) => {
        console.log("BACKENDDEN MESAJ ALINDI:",message);
    })
    connection.start().then(() => {
        console.log(connection.connectionId);
    });
  }, [connection])

  return (
    <div>Chat
        <input value={message} onChange={(e) => {setMessage(e.target.value)}}/>
        <button onClick={() => {
            connection.invoke("SendMessageAsync",message);
        }}>Mesaj Gönder</button>
    </div>
  )
}

export default Chat
