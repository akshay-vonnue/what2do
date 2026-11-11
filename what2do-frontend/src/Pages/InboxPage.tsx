import "./InboxPage.css";
import { useTodo } from "../hooks/useTodo";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import type { Todo } from "../utils/types";

function InboxPage() {
  const { todos, deleteTodo, errorMessages } = useTodo();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>();

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

export default InboxPage;
