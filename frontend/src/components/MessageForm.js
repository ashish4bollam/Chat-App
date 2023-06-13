import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import './MessageForm.css'
import { Send } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { AppContext } from "../myContext/myContext";

function MessageForm() {

    const [message, setMessage] = useState("");
    const messageEndRef = useRef(null);

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }


  

    const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const todayDate = getFormattedDate();

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }

    const user = useSelector((state) => state.user);
  function handleSubmit(e) {
    e.preventDefault();

    if(message){
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
      
        socket.emit("message-room", roomId, message, user, time, todayDate);
        setMessage("");

    }
 
}


socket.off("room-messages").on("room-messages", (roomMessages) => {

    setMessages(roomMessages);
    


   

    
    
    
});

function deleteText(content) {
    // console.log(content);
    socket.emit("deleteMessage", content, currentRoom);
  }


  return (
    <>
   <div className="messages-output">
        {!user && <div className="alert alert-danger">Please login</div>}

        {user &&
                    messages.map(({ _id: date, messagesByDate }, idx) => (
                        <div key={idx}>
                            <p className="alert alert-info text-center message-date-indicator">{date}</p>
                            {messagesByDate?.filter(({to})=>{
                              
                                return to==currentRoom;
                            }).map(({ content, time, from: sender,_id }, msgIdx) => (
                                <div className={sender?.email == user?.email ? "message" : "incoming-message"} key={msgIdx}>
                                    
                                    <div className="message-inner">
                                        <div className="d-flex align-items-center mb-3">
                                            <img src={sender.picture} style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} />
                                            <p className="message-sender">{sender._id == user?._id ? "You" : sender.name}</p>
                                        </div>
                                        <p className="message-content">{content}</p>
                                        <p className="message-timestamp-left">{time}</p>
                                        {sender._id == user?._id && (
                            <label onClick={() => deleteText(_id)}>
                              <i className="fa-solid fa-trash-can "></i>
                            </label>
                          )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

   </div>
   <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={11}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Your message"  onChange={(e) => setMessage(e.target.value)} value={message}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button variant="primary" type="submit" style={{ width: "100%", backgroundColor: "orange" }} >
                            <Send/>
                        </Button>
                    </Col>
                </Row>
            </Form>
   </>
  )
}

export default MessageForm