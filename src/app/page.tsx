"use client";
import React, { useEffect, useState } from "react";
import Input from "./components/ui/input";
import Button from "./components/ui/button";
import RadioGroup from "./components/ui/RadioGroup";
import Todos from "./components/todos";
import Chatbot from "./components/bot/chatbot";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  interface Todos {
    todo: String;
    priority: String;
    isDone: Boolean;
  }
  const [todos, setTodos] = useState<Todos[]>([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("low");

  async function addTodo() {
    const token = Cookies.get("token");
    const userId = Cookies.get("user_id");

    try {
      if (input.trim() !== "") {
        const todoExist = todos.some(
          (item) => item.todo.toLowerCase() === input.toLowerCase()
        );
        if (!todoExist) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          setTodos([
            ...todos,
            {
              todo: input,
              priority: priority,
              isDone: false,
            },
          ]);

          // const response = await axios.post("./api/todos/addTodo", {
          const response = await axios.post(
            "http://localhost:8000/todo/new",
            {
              userId: userId,
              todo: input,
              priority: priority,
              isDone: false,
            },
            config
          );

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
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // await axios.patch("/api/todos/updateTodo", {
      await axios.patch("http://localhost:8000/todo/update", {
        todo: item.todo,
        isDone: !item.isDone,
      },config);
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
    document.title = "Smart Todo";
    const token = Cookies.get("token");
    const userId = Cookies.get("user_id");

    async function getTodo() {
      try {
        if (!token || !userId) {
          console.error("Token or user ID is missing from cookies.");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId,
          },
        };

        // const tempTodo = await axios.get('./api/todos/getTodo')
        const tempTodo = await axios.request({
          method: "post",
          url: "http://localhost:8000/todo/list",
          ...config,
        });
        console.log("Todo from be",tempTodo);
        
        setTodos(tempTodo.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    getTodo();
  }, []);
  const radioOptions = [
    { label: "High", value: "high", color: "#d26565" },
    { label: "Medium", value: "medium", color: "#b9b941" },
    { label: "Low", value: "low", color: "#3db13d" },
  ];
  const removeTodo = async (todoItem:any) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { todo: todoItem }, // include the data within the config
  };

  await axios.delete("http://localhost:8000/todo/delete", config);

  const temp = todos.filter((item) => item.todo !== todoItem);
  setTodos(temp);
};

  async function logout() {
   
    const token = Cookies.get("token")
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.get("http://localhost:8000/user/logout", header);
    
    Cookies.remove("token");
    Cookies.remove("user_id");
    router.push('/user/login')
  }

  return (
    <div>
      <Button
        onClick={logout}
        className=" fixed top-6 right-10 bg-white text-black p-1 rounded"
      >Log out</Button>
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
