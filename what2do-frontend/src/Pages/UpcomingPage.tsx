import "./InboxPage.css";
import { useEffect, useState } from "react";
import Modal from "../components/Modal/Modal";
import type { Todo } from "../utils/types";
import { useTodo } from "../hooks/useTodo";

function UpcomingPage() {
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>();

  const { deleteTodo, errorMessages } = useTodo();

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/todo/?upcoming=true&status=SCHEDULED`,
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
  }, [token,isModalOpen,deleteTodo]);

  if (todos.length === 0) {
    return <div className="center-not-found">No todo records</div>;
  }

  const handleDelete = (
    _e: React.SyntheticEvent<HTMLImageElement>,
    id: number,
  ) => {
    deleteTodo(String(id));
  };

  const handleModalOpen = (
    _e: React.SyntheticEvent<HTMLImageElement>,
    todo: Todo,
  ) => {
    setCurrentTodo(todo);
    setModalOpen(true);
  };

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={String(todo.id)} className="todo-item">
          <div className="todo-data">
            <div className="todo-title">{todo.title}</div>
            <div className="todo-description">{todo.description}</div>
            <div className="todo-date">
              {new Date(todo.scheduled_at).toLocaleString()}
            </div>
          </div>
          <div className="todo-buttons">
            <img
              className="delete-icon"
              src="edit.png"
              alt=""
              onClick={(e) => handleModalOpen(e, todo)}
            />
            <div className="icon-spacer"></div>
            <img
              className="delete-icon"
              src="delete.png"
              alt=""
              onClick={(e) => handleDelete(e, todo.id)}
            />
          </div>
        </div>
      ))}
      <div className="login-error-message">
        {errorMessages && `${errorMessages}`}
      </div>
      {isModalOpen && (
        <Modal todo={currentTodo as Todo} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}

export default UpcomingPage;
