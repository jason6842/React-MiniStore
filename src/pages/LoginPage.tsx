import React, { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../api/auth";
import { toast } from "react-toastify";
import { log } from "console";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("Login Response:", data);
      console.log("access_token", data.access_token)
      login(data.access_token); // Save to contextApi + localStorage
      localStorage.setItem("refresh_token", data.refresh_token);
      navigate("/products-list"); // Redirect products page
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Page</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
      />
      <br />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
      {error && <p>Login Failed</p>}
    </form>
  );
}
