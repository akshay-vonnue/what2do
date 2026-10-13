import { useEffect, useState } from "react";
import type { Todo } from "../utils/types";

export const useTodo = () => {
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessages, setErrorMessages] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/todo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTodos(data);
      }
    };

    fetchTodos();
  }, [token]);

  const deleteTodo = async (id: string) => {
    console.log("deleting todo with id:", id);
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/todo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setTodos(todos.filter((t) => String(t.id) !== id));
    } else {
      setErrorMessages(data.message);
    }
  };

  const updateTodo = async (id: string, payload: Partial<Todo>) => {
    console.log(payload);
    const { title, description, scheduled_at } = payload;
    const date = scheduled_at?.toISOString();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        scheduled_at: date,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setErrorMessages(data.message);
    }
  };

  return {
    todos,
    errorMessages,
    deleteTodo,
    updateTodo,
  };
};
