import React from "react";
import Button from "./ui/button";

const todos = (props: any) => {
  const { todos, setTodos, done, deleteTodo } = props;
  return (
    <div className="flex text-white rounded w-screen justify-center h-screen overflow-scroll mt-3">
      <ul className="flex flex-col items-center ">
        {todos.map((item: any, index: any) => (
          <li
            style={{
              backgroundColor: `${
                item.done ? "#60b06073" : "rgb(250 252 255 / 21%)"
              }`,
              border: "1px solid grey",
            }}
            className="flex flex-col w-96 rounded justify-center m-1 p-1 overflow-scroll text-center"
            key={index}
          >
            <div className="flex justify-between">
              <span
                style={{
                  overflow: "scroll",
                  textDecoration: `${item.done ? "line-through" : "none"}`,
                }}
              >
                {item.todo}
              </span>
              <span className=" pl-1 pr-1 text-sm rounded-xl  text-white bg-black border border-solid border-black m-1">
                {item.priority}
              </span>
            </div>
            <div className=" flex justify-end ">
              <Button
                onClick={() => deleteTodo(item.todo)}
                className="text-red-700 rounded p-1 m-1 border border-solid border-red-500"
              >
                Remove
              </Button>

              <Button
                onClick={() => done(item, index)}
                className=" text-yellow-300 border border-yellow-300 border-solid p-1 m-1 rounded"
              >
                {item.done ? "Not Done" : "Done"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default todos;
