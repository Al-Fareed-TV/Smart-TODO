"use client";
import React, { useState } from "react";
import { HiChat } from "react-icons/hi";
import { HiXCircle } from "react-icons/hi";
import Input from "../ui/input";
import { Message, useCompletion } from "ai/react";

const Chatbot = (props: any) => {
  interface ChatHistory {
    userPrompt: String;
    aiResponse: String;
  }

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chats, setChats] = useState<ChatHistory[]>([]);
  const { completion, input, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      onFinish: (prompt: string, completion: string) => {
        setChats((prevChats) => [
          ...prevChats,
          {
            userPrompt: input,
            aiResponse: completion,
          },
        ]);
        setInput("");
      },
    });

  console.log(chats);

  function enableChatBot() {
    setIsChatOpen(!isChatOpen);
  }

  function handleSend() {
    if (input.trim() !== "") {
      setInput("");
      handleSubmit();
    }
  }

  return (
    <div className="flex flex-col fixed bottom-16 right-6 items-center">
      {isChatOpen && (
        <div className="flex flex-col bg-white h-72 text-black p-4 rounded-lg mb-8 shadow-lg w-64">
          <div className="text-black overflow-scroll rounded h-72 overflow-y-scroll">
            <ul>
              {chats.map((chat, index) => (
                <li key={index} className="">
                  <div className="font-bold">{chat.userPrompt}</div>
                  <div className="rounded overflow-clip w-full bg-gray-200 p-1 mb-4">
                    {chat.aiResponse}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Input
            placeholder="Type Hi..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e: any) => e.key === "Enter" && handleSend()}
            className="flex relative top-auto bottom-3 rounded text-black border border-solid border-black"
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
