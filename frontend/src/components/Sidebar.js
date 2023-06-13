import React from 'react'

import { Col, ListGroup, Row } from "react-bootstrap";
import { ChatTwoTone, CodeSharp } from '@material-ui/icons';
import { Person } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from '../myContext/myContext';
import { addNotif,resetNotif } from '../toolsx/mySlice';
import { useContext,useEffect } from 'react';
import './Sidebar.css'


function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);


  function joinRoom(room, isPublic = true) {
    if (!user) {
        return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
        setPrivateMemberMsg(null);
    }
    // dispatch for notifications
    dispatch(resetNotif(room));
}


  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotif(room));
});

socket.off("new-user").on("new-user", (payload) => {
  setMembers([...payload]);


});


useEffect(() => {
  if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
  }
}, []);


function getRooms() {
  fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
}

function handlePrivateMemberMsg(member) {
  setPrivateMemberMsg(member);
  const roomId = orderIds(user._id, member._id);
  joinRoom(roomId, false);
}
function orderIds(id1, id2) {
  if (id1 > id2) {
      return id1 + "-" + id2;
  } else {
      return id2 + "-" + id1;
  }
}











  if (!user) {
    return <></>;
}

 


  
  return (
  <>

    <h2>Available rooms   <ChatTwoTone/></h2> 
    <ListGroup>
                {rooms.map((room, idx) => (
                    <ListGroup.Item onClick={() => joinRoom(room)} active={room == currentRoom} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                        {room} {currentRoom !== room && <span className="badge rounded-pill bg-primary">{user.newMessages[room]}</span>}
                    </ListGroup.Item>
                ))}
            </ListGroup>
  
            <ListGroup>
            <h2>Members <Person/></h2>
            {members.map((member) => (
                <ListGroup.Item key={member.id} style={{ cursor: "pointer" }} active={privateMemberMsg?._id == member?._id} onClick={() => handlePrivateMemberMsg(member)} disabled={member._id === user._id}>
                    <Row>
                        <Col xs={2} className="member-status">
                            <img src={member.picture} className="member-status-img" />
                            {member.status == "online" ? (<i className="fa fa-circle sidebar-online-status"></i>) : (<i className="fa fa-circle sidebar-offline-status"></i>)}
                        </Col>
                        <Col xs={9}>
                            {member.name}
                            {member._id === user?._id && " (You)"}
                            {member.status == "offline" && " (Offline)"}
                        </Col>
                        <Col xs={1}>
                            <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
           
             </ListGroup>
  </>
  )
}

export default Sidebar
