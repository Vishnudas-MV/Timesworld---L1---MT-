import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import loginImg from "../Assets/Images/LoginImg.png";
import view from "../Assets/Images/view.png";
import hide from "../Assets/Images/hide.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    // Password validation using Regex

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include 1 capital letter, 1 number, and 1 symbol";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Show loading toast to stimulate API calls.
      const toastId = toast.loading("Logging in...");

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        toast.success("Login successful!", { id: toastId });
        navigate("/landing");
        // Navigating to Landing / Countries page
      } catch (err) {
        toast.error("Something went wrong!", { id: toastId });
      }
    }
  };

  // Used React-Bootstrap and external CSS for styling
  return (
    <Container fluid className="vh-100 d-flex">
      <Row className="login-row">
        <Col
          sm={12}
          md={8}
          lg={6}
          style={{ width: "300px", margin: "auto" }}
          className="d-flex flex-column justify-content-center "
        >
          <h3 className="login-signin">Sign In</h3>
          <p className="login-newuser">
            New user?
            <a href="#" className="login-createaccount">
              Create an account
            </a>
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="form-field"
                type="email"
                placeholder="Username or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div style={{ position: "relative", width: "100%" }}>
                <Form.Control
                  className="form-field"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                  style={{ paddingRight: "40px", position: "relative" }} // space for the icon
                />
                <Button
                  variant="link"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "26px",
                    right: errors.password ? "30px" : "10px", // always fixed
                    transform: "translateY(-50%)",
                    padding: "0",
                    fontSize: "0.9rem",
                    zIndex: 2,
                  }}
                >
                  {showPassword ? (
                    <img src={hide} height="24px" />
                  ) : (
                    <img src={view} height="24px" />
                  )}
                </Button>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  {errors.password}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center">
              <Form.Check
                type="checkbox"
                label="Keep me signed in"
                className="form-field-checkbox"
              />
            </Form.Group>

            <Button className="login-signin-btn" type="submit">
              Sign In
            </Button>
          </Form>

          <div className="login-divider">
            <p>Or Sign In With</p>
          </div>

          {/* Social Icons */}

          {/* Added Dummy links for social media icons */}
          <div className="d-flex justify-content-center gap-3">
            <Button
              as="a"
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-dark"
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
            >
              <i className="bi bi-google"></i>
            </Button>

            <Button
              as="a"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-dark"
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
            >
              <i className="bi bi-facebook"></i>
            </Button>

            <Button
              as="a"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-dark"
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
            >
              <i className="bi bi-linkedin"></i>
            </Button>

            <Button
              as="a"
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-dark"
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
            >
              <i className="bi bi-twitter"></i>
            </Button>
          </div>
        </Col>

        <Col
          sm={12}
          md={4}
          lg={6}
          style={{ margin: "auto" }}
          className="d-none d-md-flex justify-content-center align-items-center login-img-div"
        >
          <img src={loginImg} alt="login Page Image" />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
