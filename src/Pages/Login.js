import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../Api/Auth";

import "./Login.scss";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response =
        await login({
          username,
          password,
        });

      console.log(
        "Customer login successful:",
        response
      );

      /*
      |--------------------------------------------------------------------------
      | CustomerWeb redirect
      |--------------------------------------------------------------------------
      |
      | During development, replace this URL
      | with your customerweb URL.
      |
      */

      window.location.href =
        "http://localhost:3001/";

    } catch (error) {
      console.error(
        "Login failed:",
        error
      );

      setError(
        error?.response?.data?.detail ||
        error?.message ||
        "Login failed. Please check your credentials."
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-brand">

          <div className="login-logo">
            G
          </div>

          <h1>
            Welcome to Glōvia
          </h1>

          <p>
            Sign in to continue to
            your Glōvia experience.
          </p>

        </div>


        {error && (
          <div className="login-error">
            <span>!</span>

            <p>{error}</p>
          </div>
        )}


        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <label>
            Username

            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(
                  event.target.value
                )
              }
              placeholder="Enter your username"
              required
            />
          </label>


          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter your password"
              required
            />
          </label>


          <div className="login-options">

            <label className="remember">

              <input
                type="checkbox"
              />

              Remember me

            </label>


            <button
              type="button"
              className="forgot-password"
            >
              Forgot password?
            </button>

          </div>


          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>


        {/* Register */}

        <div className="login-register">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Sign up
          </Link>

        </div>


        <p className="login-note">
          Customer login only
        </p>

      </div>

    </div>
  );
}

export default Login;