import "./page.css";
import "./LoginPage.css";
import { useState } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log(import.meta.env.VITE_API_BASE_URL);

  const fetchData = async () => {
    const result = await fetch(`/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await result.json();
    console.log(data);

    if (result.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } else {
      setErrorMessage(data.message);
    }
  };

  function handleLogin(e: React.SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      fetchData();
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="center-content login-wrapper">
      <h2>login</h2>
      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleLogin}>
        {loading ? "Loading..." : "Login"}
      </button>
      <div className="login-error-message">
        {errorMessage && `${errorMessage}`}
      </div>
    </div>
  );
}

export default LoginPage;
