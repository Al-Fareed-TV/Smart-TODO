"use client";
import React, { useEffect, useState } from "react";
import Input from "./components/ui/input";
import Button from "./components/ui/button";
import RadioGroup from "./components/ui/RadioGroup";
import Todos from "./components/todos";
import Chatbot from "./components/bot/chatbot";
import axios from "axios";
const Page = () => {
  interface Todos {
    todo: String;
    priority: String;
    isDone: Boolean;
  }
  const [todos, setTodos] = useState<Todos[]>([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("low");

  async function addTodo() {
    try {
      if (input.trim() !== "") {
        const todoExist = todos.some((item) => item.todo.toLowerCase() === input.toLowerCase());
        if (!todoExist) {
          setTodos([
            ...todos,
            {
              todo: input,
              priority: priority,
              isDone: false,
            },
          ]);
          const response = await axios.post("./api/todos/addTodo", {
            todo: input,
            priority: priority,
            isDone: false,
          });
          console.log(response);
        } else {
          alert("Todo exist..!");
        }
        setInput("");
      } else {
        alert("Cannot add empty todo..!");
      }
    } catch (error: any) {
      console.log("Add todo error : ", error.message);
    } finally {
      setInput("");
    }
  }

  async function isDoneButtonHandler(item: any, index: any) {
    try {
      await axios.patch("/api/todos/updateTodo", {
        todo: item.todo,
        isDone: !item.isDone,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo, i) =>
          i === index ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    } catch (error: any) {
      console.log("Update todo error: ", error.message);
    }
  }

  useEffect(() => {
    document.title = "Smart Todo"

    async function getTodo() {
      const tempTodo = await axios.get('./api/todos/getTodo')
      setTodos(tempTodo.data.data)
    }
    getTodo();
  },[])
  const radioOptions = [
    { label: "High", value: "high", color: "#d26565" },
    { label: "Medium", value: "medium", color: "#b9b941" },
    { label: "Low", value: "low", color: "#3db13d" },
  ];
  const removeTodo = async(todoItem: any) => {
    await axios.delete("./api/todos/removeTodo", { data: { todo: todoItem } });
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
      <Todos
        todos={todos}
        deleteTodo={removeTodo}
        isDone={isDoneButtonHandler}
      />
      <Chatbot todos={todos} />
    </div>
  );
};

export default Page;
