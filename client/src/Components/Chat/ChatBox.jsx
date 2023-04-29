import React, { useEffect, useState } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./chatBox.css";
function ChatBox({ chat, currentUser, setSendMessage, receiveMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
      console.log("data received", receiveMessage);
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);
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

  //
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
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
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
      console.log(data, "dataaaa", messages);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
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
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>{userData?.username}</span>
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
                      className={
                        message.senderId === currentUser
                          ? "place-items-end grid-cols-[1fr auto] grid gap-x-3 pt-1 pb-1 "
                          : "place-items-start grid-cols-[1fr auto] grid gap-x-3 pt-1 pb-1 "
                      }
                    >
                      <div className="relative block w-fit px-4 py-2 max-w-[90%] min-h-8 min-w-8 bg-slate-600 rounded-3xl ">
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
              <div className="send-button button cursor-pointer" onClick={handleSent}>
                Send
              </div>
              <input type="file" name="" id="" style={{ display: "none" }} />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
      <div id="root"></div>
    </>
  );
}

export default ChatBox;