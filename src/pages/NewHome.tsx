import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  Form,
  FormControl,
  Modal,
  Nav,
  Navbar,
} from "react-bootstrap";


interface ITodo {
  id: number;
  message: string;
}

const NewHome = () => {
  const [data, setData] = useState([] as ITodo[]);
  const [newMessage, setNewMessage] = useState("" as string);
  const [showModal, setShowModal] = useState(false as boolean);
  const [editedMessage, setEditedMessage] = useState({} as ITodo);
  const [pageHeading, setPageHeading] = useState("" as string);

  const fetchData = async () => {
    let response = await axios.get("http://localhost:4000/todos");
    setData(response.data);
  };
  const deleteTodo = async (id: number) => {
    let response = await axios.delete(`http://localhost:4000/todos/${id}`);
    fetchData();
  };

  const handleMessageInput = (event: any) => {
    event.persist();
    setNewMessage(event.target.value);
  };

  const handleMessageSubmit = async (event: any) => {
    let response = await axios.post("http://localhost:4000/todos", {
      message: newMessage,
    });
    setNewMessage("");
    fetchData();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleTodoEditChange = (event: any) => {
    event.persist();
    setEditedMessage({ ...editedMessage, message: event.target.value });
  };

  const handleEditSubmit = async () => {
    const response = await axios.patch(
      `http://localhost:4000/todos/${editedMessage.id}`,
      editedMessage
    );
    fetchData();
    setShowModal(false);
  };

  const fetchTitle = async () => {
    const response = await axios.get("http://localhost:4000/title");
    console.log("============", response.data.heading);
    setPageHeading(response.data.heading);
  };

  useEffect(() => {
    fetchTitle();
    fetchData();
  }, []);
  return (
    
    <>
      <h3>{pageHeading}</h3>
      <div className="list-wrapper">
        {data.map((message: ITodo) => (
          <Card style={{ minWidth: "10rem" }}>
            <Card.Body>
              <Card.Text>
                {message.message} ---- {message.id}
              </Card.Text>
              <Button
                onClick={() => {
                  setEditedMessage(message);
                  setShowModal(true);
                }}
                variant="primary"
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  deleteTodo(message.id);
                }}
                variant="danger"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}

        <Card style={{ minWidth: "10rem" }}>
          <Card.Body>
            <Card.Text>Add Todo</Card.Text>

            <Form.Control
              value={newMessage}
              onChange={handleMessageInput}
              name="message"
              type="text"
              placeholder="Enter Message"
            />

            <Button onClick={handleMessageSubmit} variant="success">
              AdD
            </Button>
          </Card.Body>
        </Card>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-form-wrapper">
            <input
              onChange={handleTodoEditChange}
              value={editedMessage.message}
              placeholder="Enter new Message"
              name="message"
              type="text"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  
</>
  );
};

export default NewHome;
