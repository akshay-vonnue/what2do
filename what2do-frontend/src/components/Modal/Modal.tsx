import "./Modal.css";
import type { Todo } from "../../utils/types";
import { useTodo } from "../../hooks/useTodo";
import { useState } from "react";

type ModalProps = {
  todo: Todo;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ todo, setModalOpen }: ModalProps) {
  const { updateTodo, errorMessages } = useTodo();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description,
    scheduled_at: todo.scheduled_at,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setModalOpen(false)
    }, 1000);

    updateTodo(String(todo.id), {
      title: formData.title,
      description: formData.description,
      scheduled_at: new Date(formData.scheduled_at),
    });
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div className="modal">
      <div className="form-wrapper">
        <form className="addtodo-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label htmlFor="scheduled_at">Scheduled At</label>
          <input
            type="datetime-local"
            id="scheduled_at"
            name="scheduled_at"
            value={
              formData.scheduled_at
                ? new Date(formData.scheduled_at).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleChange}
          />

          <div className="addTodo-buttons">
            <button type="button" onClick={handleCancel}>
              cancel
            </button>
            <button className="add-button" type="submit">
              {loading ? "loading..." : "Update"}
            </button>
          </div>
          <div className="login-error-message">
            {errorMessages && `${errorMessages}`}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
