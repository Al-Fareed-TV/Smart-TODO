import React, { useState } from "react";
import { HiChat } from "react-icons/hi";
import { HiXCircle } from "react-icons/hi";
import Input from "../ui/input";
const Chatbot = () => {
    interface ChatHistory{
        userPrompt: String,
        response:String
    }
  const [isChatOpen, setIsChatOpen] = useState(false);
    const [chats, setChats] = useState<ChatHistory[]>([
        {
            userPrompt: "Hi",
            response:"Hi there, how can I help you"
        },
    {
            userPrompt: "Nothing",
            response:"Toh gaand mara"
        },
    {
            userPrompt: "Tu mara bhsdk",
            response:"Baap se aise baath kartha hai kya.."
        },
    ]);
    
  function enableChatBot() {
    setIsChatOpen(!isChatOpen);
  }
  function handleSubmit() {}
  return (
    <div className="flex flex-col fixed bottom-16 right-6 items-center">
      {isChatOpen && (
        <div className="flex flex-col bg-white h-72 text-black p-4 rounded-lg mb-8 shadow-lg w-64">
          <div className=" bg-black text-white overflow-scroll rounded h-72 overflow-y-scroll">
            <ul>
              {chats.map((chat, index) => (
                <li key={index} className="">
                  <div>{chat.userPrompt}</div>
                  <div>{chat.response}</div>
                </li>
              ))}
            </ul>
          </div>
          <Input
            placeholder="Type Hi..."
            className="flex relative top-auto bottom-3 rounded text-black border  border-solid border-black"
          />
        </div>
      )}
      <div
        onClick={enableChatBot}
        className="flex cursor-pointer items-center justify-center text-black bg-white w-10 h-10 rounded-full shadow-md"
      >
        {!isChatOpen ? <HiChat size={24} /> : <HiXCircle size={30} />}
      </div>
    </div>
  );
};

export default Chatbot;
