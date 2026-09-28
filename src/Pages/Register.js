import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../Api/Auth";

import "./Register.scss";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmpassword: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  /*
  |--------------------------------------------------------------------------
  | HANDLE INPUT
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /*
  |--------------------------------------------------------------------------
  | HANDLE REGISTER
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    /*
    |--------------------------------------------------------------------------
    | Frontend password validation
    |--------------------------------------------------------------------------
    */

    if (
      formData.password !==
      formData.confirmpassword
    ) {
      setError(
        "Password and confirm password do not match."
      );

      return;
    }

    if (formData.password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );

      return;
    }

    setLoading(true);

    try {
      await register(formData);

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      /*
      |--------------------------------------------------------------------------
      | Redirect to Login
      |--------------------------------------------------------------------------
      */

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );

      const detail =
        error?.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(
          detail
            .map(
              (item) =>
                item.msg
            )
            .join(", ")
        );
      } else {
        setError(
          detail ||
          error?.message ||
          "Registration failed. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="register-page">

      <div className="register-container">

        {/* Brand */}

        <div className="register-brand">

          <div className="register-logo">
            G
          </div>

          <h1>
            Create your account
          </h1>

          <p>
            Join Glōvia and discover
            beautiful salon experiences.
          </p>

        </div>


        {/* Error */}

        {error && (
          <div className="register-error">
            <span>!</span>

            <p>{error}</p>
          </div>
        )}


        {/* Success */}

        {success && (
          <div className="register-success">
            {success}
          </div>
        )}


        {/* Registration Form */}

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          {/* Username */}

          <label>
            Username

            <input
              type="text"
              name="username"
              value={
                formData.username
              }
              onChange={
                handleChange
              }
              placeholder="Enter your username"
              minLength={3}
              maxLength={100}
              required
            />
          </label>


          {/* First + Last Name */}

          <div className="name-row">

            <label>
              First Name

              <input
                type="text"
                name="firstname"
                value={
                  formData.firstname
                }
                onChange={
                  handleChange
                }
                placeholder="First name"
                minLength={2}
                maxLength={50}
                required
              />
            </label>


            <label>
              Last Name

              <input
                type="text"
                name="lastname"
                value={
                  formData.lastname
                }
                onChange={
                  handleChange
                }
                placeholder="Last name"
                minLength={2}
                maxLength={50}
                required
              />
            </label>

          </div>


          {/* Password */}

          <label>
            Password

            <input
              type="password"
              name="password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              placeholder="Create a password"
              minLength={8}
              maxLength={128}
              required
            />

            <small>
              Minimum 8 characters
            </small>
          </label>


          {/* Confirm Password */}

          <label>
            Confirm Password

            <input
              type="password"
              name="confirmpassword"
              value={
                formData.confirmpassword
              }
              onChange={
                handleChange
              }
              placeholder="Confirm your password"
              minLength={8}
              maxLength={128}
              required
            />
          </label>


          {/* Sign Up */}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </button>

        </form>


        {/* Login */}

        <div className="register-login">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Log in
          </Link>

        </div>


        <p className="register-note">
          Customer account
        </p>

      </div>

    </div>
  );
}

export default Register;