import React, { Component, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { Button } from 'react-bootstrap';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useSelector } from 'react-redux';


const MailboxEditor =(props)=>{
    const toRef=useRef();
    const subjectRef=useRef();
    const history=useHistory()
    const userEmail=useSelector(state=>state.auth.email)
    const [emailContent,setEmailContent]=useState()
    const goBack=()=>{
        history.replace('/Mailbox')
    }
    const outputValue= (event)=>{
        // console.log(event.blocks[0].text)
        setEmailContent(event.blocks[0].text)   
    }


    const submitHandler=(event)=>{
        event.preventDefault();
        console.log(emailContent)
        const enteredToEmail=toRef.current.value;
        const enteredSubject=subjectRef.current.value;
        let email = enteredToEmail.replace(/[^a-zA-Z0-9 ]/g, "")
        let uemail=userEmail.replace(/[^a-zA-Z0-9 ]/g, "")

        fetch(`https://client-email-61813-default-rtdb.firebaseio.com/${email}/received.json`, {
            method: "POST",
            body: JSON.stringify({
              email: enteredToEmail,
              subject: enteredSubject,
              content: emailContent,
              isRead:false,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          }).then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = "Sending Email failed";
                throw new Error(errorMessage);
              });
            }
          }).then((data)=>{
            window.alert('Email Sent Successfully')
            console.log(data)
            history.replace('/Mailbox')
          })
          fetch(`https://client-email-61813-default-rtdb.firebaseio.com/${uemail}/sent.json`, {
            method: "POST",
            body: JSON.stringify({
              email: enteredToEmail,
              subject: enteredSubject,
              content: emailContent,
              isRead:false,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          })
    }
    return(
    <div>
    <form onSubmit={submitHandler}>
     <div style={{textAlign:'left'}}>
          <label htmlFor="email" >To:</label>
          <input type="email" id="email" ref={toRef} required style={{padding:'10px 20px',widows:'80%',border:'none', borderBottom: '2px solid', width:'90%',marginLeft:'50px'}}/>
        </div><br></br>
        <div style={{textAlign:'left'}}> 
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" ref={subjectRef} reuired style={{padding:'10px 20px',widows:'80%',border:'none', borderBottom: '2px solid', width:'90%',marginLeft:'20px'}} />
        </div><br></br> <br></br>
    <div><Editor onChange={outputValue}/></div>
    <div style={{textAlign:'left'}}><Button variant='primary' type='submit'> Send</Button> <Button variant='danger' onClick={goBack}> Cancel</Button></div>
    </form>

    </div>)
}

export default MailboxEditor;