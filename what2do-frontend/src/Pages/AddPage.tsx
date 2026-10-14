import { useState } from "react";
import "./AddPage.css";

const token = localStorage.getItem("token");

function AddPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scheduled_at: "",
  });

  console.log(token);

  const pushDate = async () => {
    const date = formData.scheduled_at
      ? new Date(formData.scheduled_at).toISOString()
      : null;
    const res = await fetch(`/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        scheduled_at: date,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMessage(data.message);
    }
  };

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
    pushDate();
    console.log(formData.title, formData.description, formData.scheduled_at);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="addPage">
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
          value={formData.scheduled_at}
          onChange={handleChange}
        />

        <div className="addTodo-buttons">
          <button type="reset">cancel</button>
          <button className="add-button" type="submit">
            {loading ? "loading..." : "Add"}
          </button>
        </div>
        <div className="login-error-message">
          {errorMessage && `${errorMessage}`}
        </div>
      </form>
    </div>
  );
}

export default AddPage;
