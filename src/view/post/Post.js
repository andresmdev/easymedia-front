import React, { useState } from 'react';
import { Container, Spinner, FormGroup, Label, Input, Button, Card, CardHeader, CardBody, Modal, ModalBody } from 'reactstrap';
import Header from './../../components/Header';
import { getValueToken } from '../../utils/token';
import { createPostData } from '../../api/request';

export default function Post() {
  const [loading , setLoading] = useState(false);
  const [title , setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [error, setError] = useState(false);

  const createPost = async () => {
    setLoading(true);
    
    if(String(title).trim() === "" || String(message).trim() === "") {
      setModalMessage("Please fill in all fields");
      setModal(true);
      setError(true);
    }
    else if(String(title).length > 30) {
      setModalMessage("Title must be less than 30 characters");
      setModal(true);
      setError(true);
    }
    else if(String(message).length > 300) {
      setModalMessage("Message must be less than 300 characters");
      setModal(true);
      setError(true);
    }
    else {
      const data = {
        "title": title,
        "message": message,
      }

      const res = await createPostData(data);

      if(res.success === true) {
        setModalMessage("Post Created");
        setModal(true);
        setError(false);
      }
      else {
        setModalMessage("Uppss Try Later");
        setModal(true);
        setError(true);
      }
    }
    setLoading(false);
  }

  return (
    <>
      <Header />

      <Container>
        <h1 
          style={{
            color: "#fff", 
            textAlign: "center"
          }}> Create message </h1>
        <br />

        <div>
          <FormGroup>
            <Label for="title" style={{ fontWeight: 'bold'}}>
              Title messages
            </Label>
            <Input
              id="title"
              placeholder="Your post title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div style={{
              textAlign: "right"
            }}> 
              <small style={{
                color: (String(title).length > 30) ? "red" : "black"
              }}>
                {String(title).length}
              </small> / 30
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="title" style={{ fontWeight: 'bold'}}>
              Messages
            </Label>
            <Input
              id="messages"
              type="textarea"
              value={message}
              style={{
                height: "100px"
              }}
              onChange={e => setMessage(e.target.value)}
              placeholder="Create message for share with your friends"
            />
             <div style={{
              textAlign: "right"
            }}> 
              <small style={{
                color: (String(message).length > 300) ? "red" : "black"
              }}>
                {String(message).length}
              </small> / 300
            </div>
          </FormGroup>

          <div style={{
            textAlign: "right",
            marginBottom: "40px"
          }}>
            {
              (loading) ? <>
                <Spinner style={{
                  color: "#57bbdb"
                }} /> 
              </> : <>
                <Button 
                  style={{
                    borderRadius: "20px",
                    width: "120px",
                    border: "0px",
                  }}
                  className="gradient"
                  onClick={() => createPost()}
                >
                  SHARE
                </Button>
              </>
            }
          </div>
        </div>
        

        <Card
          style={{
            width: '100%',
            border: "1px solid #666666"
          }}
        >
          <CardHeader style={{
            backgroundColor: "#57bbdb ",
            color: "#fff",
          }}>
            {(String(title) === "") ? "Your post title" : title}
          </CardHeader>
          <CardBody style={{
            backgroundColor: "#666666",
            color: "#fff",
          }}>
            <div>
              {(String(message) === "") ? "Create message for share with your friends" : message}
              <br /> <br />
            </div>
            <div>
              <ul style={{
                listStyle: "none",
                padding: "0px",
                margin: "0px",
                display: "flex",
                justifyContent: "space-between"
              }}>
                <li>
                  {
                    new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
                  }
                </li>
                <li>{ getValueToken('name') }</li>
              </ul>
            </div>
          </CardBody>
        </Card>
        
      </Container>

      <Modal size='sm' isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalBody style={{ textAlign: "center" }}>
          {
            (error) ? <>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#c646aa" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
            </> : <>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#57bbdb" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
            </>
          }
          <br /> <br />
          {modalMessage}
          <div style={{
            textAlign: "right",
            marginTop: "20px"
          }}>
            <Button 
              style={{
                borderRadius: "20px",
                width: "120px",
                border: "0px",
              }}
              className='gradient' 
              onClick={() => setModal(!modal)}>
              OK
            </Button>

          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
