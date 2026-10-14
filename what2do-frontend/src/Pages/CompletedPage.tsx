import "./InboxPage.css";
import { useEffect, useState } from "react";
import type { Todo } from "../utils/types";
import { useTodo } from "../hooks/useTodo";

function CompletedPage() {
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [currentTodo, setCurrentTodo] = useState<Todo>();

  const { deleteTodo, errorMessages } = useTodo();

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/todo/?status=DONE`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (res.ok) {
        setTodos(data);
      }
    };

    fetchTodos();
  }, [token, deleteTodo]);

  if (todos.length === 0) {
    return <div className="center-not-found">No todo records</div>;
  }

  const handleDelete = (
    _e: React.SyntheticEvent<HTMLImageElement>,
    id: number,
  ) => {
    deleteTodo(String(id));
  };

  // const handleModalOpen = (
  //   _e: React.SyntheticEvent<HTMLImageElement>,
  //   todo: Todo,
  // ) => {
  //   setCurrentTodo(todo);
  //   setModalOpen(true);
  // };

  // const handleStatusChange = (
  //   _e: React.SyntheticEvent<HTMLImageElement>,
  //   todoId: number,
  // ) => {
  //   updateStatus(String(todoId));
  // };
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={String(todo.id)} className="todo-item">
          <div className="todo-data">
            <div className="todo-title">{todo.title}</div>
            <div className="todo-description">{todo.description}</div>
          </div>
          <div className="todo-buttons">
            {/* <img
              className="delete-icon"
              src="edit.png"
              alt=""
              onClick={(e) => handleModalOpen(e, todo)}
            />
            <div className="icon-spacer"></div> */}
            <img
              className="delete-icon"
              src="delete.png"
              alt=""
              onClick={(e) => handleDelete(e, todo.id)}
            />
            <div className="icon-spacer"></div>
            {/* <img
              className="delete-icon"
              src="check.png"
              alt=""
              onClick={(e) => handleStatusChange(e, todo.id)}
            /> */}
          </div>
        </div>
      ))}
      <div className="login-error-message">
        {errorMessages && `${errorMessages}`}
      </div>
    </div>
  );
}

export default CompletedPage;
