"use client";
import React, { useState } from "react";
import Input from "./components/ui/input";
import Button from "./components/ui/button";
import RadioGroup from "./components/ui/RadioGroup";
import Todos from "./components/todos";
import Chatbot from "./components/bot/chatbot";
const Page = () => {
  interface Todos {
    todo: String;
    priority: String;
    isDone: Boolean;
  }
  const [todos, setTodos] = useState<Todos[]>([
    {
      todo: "Sleep",
      priority: "medium",
      isDone: false,
    },
    {
      todo: "Eat",
      priority: "high",
      isDone: false,
    },
    {
      todo: "Code",
      priority: "low",
      isDone: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("low");

  function addTodo() {
    if (input.trim() !== "") {
      const todoExist = todos.some((item) => item.todo === input);
      if (!todoExist) {
        setTodos([
          ...todos,
          {
            todo: input,
            priority: priority,
            isDone: false,
          },
        ]);
      } else {
        alert("Todo exist..!");
      }
      setInput("");
    } else {
      alert("Cannot add empty todo..!");
    }
  }

  function isDoneButtonHandler(item: any, index: any) {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  const radioOptions = [
    { label: "High", value: "high", color: "#d26565" },
    { label: "Medium", value: "medium", color: "#b9b941" },
    { label: "Low", value: "low", color: "#3db13d" },
  ];
  const removeTodo = (todoItem: any) => {
    const temp = todos.filter((item) => item.todo !== todoItem);
    setTodos(temp);
  };

  return (
    <div>
      <div className="flex w-screen justify-center align-middle mt-3.5">
        <Input
          className="text-black rounded p-1 pl-2 h-fit"
          placeholder="Todo..."
          value={input}
          setText={setInput}
          onKeyDown={(e: any) => {
            e.key.toLowerCase() === "enter" && addTodo();
          }}
        />
        <Button
          onClick={addTodo}
          className="text-black rounded bg-green-400 h-fit ml-1 p-1"
        >
          Add Todo
        </Button>
      </div>
      <div className="flex justify-center  mt-3.5">
        <RadioGroup
          options={radioOptions}
          name="priority"
          selectedValue={priority}
          onChange={setPriority}
        />
      </div>
      <Todos todos={todos} deleteTodo={removeTodo} isDone={isDoneButtonHandler} />
      <Chatbot />
    </div>
  );
};

export default Page;
