import React, { useEffect, useRef, useState } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./chatBox.css";
const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const online = false;
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("s");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);

        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  // useEffect(() => {
  //   if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
  //     setMessages((prevMessages) => [...prevMessages, receiveMessage]);
  //   }
  // }, [receiveMessage]);
  useEffect(() => {
    console.log("Message Arrived: ", receiveMessage);
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);
  //
  const handleSent = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      // setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className="rounded-2xl grid grid-rows-[14vh 60vh 13vh] ">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="p-[1rem 1rem 0rem 1rem] flex flex-col row-start-1">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.user?.profilePicture
                        ? userData?.user?.profilePicture
                        : "defaultProfile.png"
                    }
                    alt=""
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>{userData?.user?.username}</span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="flex flex-col gap-2 p-6 overflow-scroll">
              {messages &&
                messages?.map((message) => (
                  <>
                    <div
                      ref={scroll}
                      className={
                        message.senderId === currentUser
                          ? "place-items-end grid-cols-[1fr auto] grid gap-x-3 pt-1 pb-1 "
                          : "place-items-start grid-cols-[1fr auto] grid gap-x-3 pt-1 pb-1 "
                      }
                    >
                      <div className=" relative block w-fit px-4 py-2 max-w-[90%] min-h-8 min-w-8 backdrop-blur-sm text-slate-500 bg-white/30 rounded-3xl ">
                        <span>{message.text}</span>{" "}
                      </div>
                      <div className="chat-header">
                        <time className="text-xs opacity-50">
                          {format(message.createdAt)}
                        </time>
                      </div>
                    </div>
                  </>
                ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div
                className="button p-6 cursor-pointer text-lg bg-gradient-to-r from-l-pink to-l-blue text-white font-medium rounded-md"
                onClick={handleSent}
              >
                Send
              </div>
              <input type="file" name="" id="" style={{ display: "none" }} />
            </div>{" "}
          </>
        ) : (
          <span className="h-[100vh] chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
      <div id="root"></div>
    </>
  );
};

export default ChatBox;
