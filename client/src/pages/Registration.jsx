/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Typography, Button, TextField, Link, Divider } from "@mui/material";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Cookies from "universal-cookie";

// Updated schema to include confirmPassword validation
const loginSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const cookie = new Cookies();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const validationResult = loginSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!validationResult.success) {
      setErrors(validationResult.error.flatten().fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ general: errorData.error || "Registration failed" });
      } else {
        const data = await response.json();
        cookie.set("user_token", data.token);
        navigate("/signin");
        window.location.reload();
      }
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  return (
    <div css={containerStyle}>
      <div css={imageContainerStyle}>
        <img css={imageStyle} src="/login.png" alt="Login Page Image" />
      </div>
      <div css={formContainerStyle}>
        <Typography css={logoStyle} variant="h5">
          <img src="/music icon.png" alt="music logo" css={logo} />
          Addis-Musix
        </Typography>
        <Typography variant="h6" css={headingStyle}>
          Sign Up
        </Typography>
        <Divider css={dividerStyle} />

        {errors.general && (
          <Typography css={errorTextStyle}>{errors.general}</Typography>
        )}

        <TextField
          id="outlined-email"
          label="Email address"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email?.[0]}
          css={textFieldStyle}
        />

        <TextField
          id="outlined-password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password?.[0]}
          css={textFieldStyle}
        />

        <TextField
          id="outlined-confirm-password"
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.[0]}
          css={textFieldStyle}
        />

        <Button
          css={buttonStyle(isLoading)}
          onClick={isLoading === false && handleLogin}
        >
          {isLoading ? "Signing..." : "Sign Up"}
        </Button>

        <Typography css={signupTextStyle}>
          Already have an account?{" "}
          <Link href="/signIn" css={linkStyle}>
            Sign In
          </Link>
        </Typography>
      </div>
    </div>
  );
};

// Emotion CSS styles
const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const imageContainerStyle = css`
  background: #171b36;
  width: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  height: 50vh;

  @media (min-width: 768px) {
    width: 50%;
    height: 100vh;
    display: flex;
  }
`;

const imageStyle = css`
  width: 70%;
`;

const musicIconStyle = css`
  font-size: 28px;
  color: #ff6347;
`;

const formContainerStyle = css`
  padding: 5%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: auto;

  @media (min-width: 768px) {
    padding: 3%;
    width: 50%;
    height: 100vh;
  }
`;

const logoStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;
const logo = css`
  width: 30px;
  margin-right: 10px;
`;

const headingStyle = css`
  padding: 8px 0;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const dividerStyle = css`
  margin-bottom: 24px;
`;

const errorTextStyle = css`
  color: red;
  text-align: center;
  margin-bottom: 24px;
`;

const textFieldStyle = css`
  margin-bottom: 16px;
  width: 100%;
`;

const buttonStyle = (isLoading) => css`
  background: ${isLoading ? "lightgray" : "#00abff"};
  cursor: ${isLoading ? "not-allowed" : "pointer"};
  color: #fff;
  margin-bottom: 24px;
  width: 100%;

  &:hover {
    background-color: ${isLoading ? "lightgray" : "#446497"};
  }
`;

const signupTextStyle = css`
  text-align: center;
`;

const linkStyle = css`
  text-decoration: none;
  color: #00abff;

  &:hover {
    text-decoration: underline;
  }
`;

export default Registration;
