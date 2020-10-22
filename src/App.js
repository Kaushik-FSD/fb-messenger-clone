import React, {useState, useEffect} from 'react';
import { FormControl,Input } from '@material-ui/core';
import './App.css';
import Message from './Message'
import db from './firebase'
import firebase  from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/SendRounded';
import { IconButton } from '@material-ui/core';


function App() {
  
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, SetUsername] = useState('')

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])

  useEffect(() => {
   SetUsername(prompt('Enter user Name'));
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    //logic to send a message goes here

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // setMessages([
    //   ...messages, 
    //   {username: username, message: input}])
    setInput('')
  }

  return (
    <div className="App">
      <div className='app__head'>
        <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=80&h=10" alt="messenger"/>
        <h1>FACEBOOK-MESSENGER-CLONE</h1>
      </div>
      <h2>Hello {username}</h2>
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input className='app__input' placeholder='Enter a message...' value={input} onChange={e => setInput(e.target.value)}/>
            <IconButton className='app__iconButton' disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
              <SendIcon/>
            </IconButton>
        </FormControl>
      </form>
   
      <FlipMove>
        {messages.map(({id, message}) => (
          <Message key={id} username = {username} message = {message}/>
        ))}
      </FlipMove>
 
   

    </div>
  );
}

export default App;
