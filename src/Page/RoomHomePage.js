import React, { useMemo, useEffect, useState, useCallback } from "react";
import { Link, useLinkClickHandler, useNavigate } from "react-router-dom";
import "../css/RoomHomeStyle.css";
import axios from "axios";
import RoomCodeEnterModal from "./RoomCodeEnterModal.js";
import Modal from "./Modal.js";
import NavBar1 from "../NavBar1.js";


function RoomHomePage() {
    const colorList = ['#FF8D8D', '#90FF8D', '#FF8DF4', '#FCFF64', '#95CCFF' ];
    const randomIndex = Math.floor(Math.random() * colorList.length);
    var randomColor = []
    for(let i = 0; i < 5; i++){
      var col = colorList.splice(Math.floor(Math.random() * 5), 1)[0]
      if (col != undefined)
        randomColor.push(col)
      else
        i -= 1
    }
    
    console.log(randomColor)

    // const randomColor = colorList[randomIndex];

    const token = localStorage.getItem('token');

    const [roomData, setRoomData] = useState([]);

    const [roomCount, setRoomCount] = useState(0);

    console.log(roomCount)

    const rooms = []

    for(let i = 0; i < roomCount; i++) {
      rooms.push(
        <div key={roomData[i].id} >
          <Link to={`/myrooms/${roomData[i].id}`}>
              <button 
              className="roomTitle-box" 
              style={{backgroundColor:randomColor[i]}}
              >{roomData[i].title}</button>
          </Link>
        </div>
      )
    }


    useEffect(()=> {   
        axios.get(`http://localhost:8000/room/myroomlist/`,
            { headers: {
                Authorization: `Token ${token}`
                }
            }
        )
        .then((response) => {
        setRoomData([]);
        console.log(response.data.my_room_list);
        setRoomData(response.data.my_room_list);
        setRoomCount(response.data.my_room_list.length < 5 ? response.data.my_room_list.length : 5)
        })
        .catch(function (error) {
            console.log(token);
            console.error(error.response.data); 
        });
    },[]);

//   const roomEnterAPI = useCallback(() => {
//     setRoomId();
//     axios
//       .post(
//         `http://localhost:8000/room/enter/`,
//         {
//           room_id: roomId,
//         },
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log("res옴");
//         console.log(response.data);
//         setRoomId(roomId);
//       })
//       .catch(function (error) {
//         console.log("res안옴");
//         console.log(token);
//         console.error(error.response.data);
//       });
//   });


  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
    <NavBar1 />
    <div className="RoomPageContainer">
      <div className="RoomHome">
        <div className="button-box">
          <Link to="/mkroom">
            <button className="mkroomBtn">방 만들기</button>
          </Link>
          <button className="enterBtn" onClick={openModal}>
            참여하기
          </button>
          {modalOpen && (
            <Modal closeModal={() => setModalOpen(!modalOpen)}>
              <RoomCodeEnterModal />
            </Modal>
          )}
        </div>
        <div className="showRoomList">
        {
          rooms
        }
        </div>
      </div>
    </div>
    </>
    );
}

export default RoomHomePage;