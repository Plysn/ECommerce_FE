/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../services/auth";
import { message } from "antd";

const title = "Sign In";
const socialTitle = "Login With Social Media";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await authApi.signin({
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.access_token)
        );
        message.success("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      message.error("Login failed! Please try again.");
      if (error.response) {
        if (error.response.status === 404 || error.response.status === 402) {
          setErrorMessage("Invalid password! Please try again.");
        }
        if (error.response.status === 422) {
          setErrorMessage("Invalid email! Please try again.");
        }
      } else {
        console.log("Error making request:", error);
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const response = await authApi.signinWithGoogle();
      if (response.status === 200) {
        // window.open(`${response.data.data}`, "_blank");
        window.location.href = response.data.data
      }
    } catch (error) {
      message.error("Login failed! Please try again.");
      console.log("Error making request:", error);
    }
  };

  return (
    <div>
      <img
        src="https://accgroup.vn/wp-content/uploads/2023/01/tmdt.jpg.webp"
        alt="Background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "-1",
          filter: "blur(4px)",
        }}
      />
      <div className="login-section padding-tb">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>

            <form className="account-form" onSubmit={handleSignIn}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* showing error message */}
              <div>
                {errorMessage && (
                  <div className="error-message text-danger">
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="form-group">
                <button className="lab-btn">
                  <span>Submit Now</span>
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-10 pb-10">
                <Link to="/forgetpass">Forget Password</Link>
              </span>
              <span className="d-block cate pt-10">
                Don&apos;t Have any Account? <Link to="/sign-up">Sign Up</Link>
              </span>
              <span className="or">
                <span>or</span>
              </span>

              {/* social icons */}
              <h5 className="subtitle">{socialTitle}</h5>
              <button
                className="google-signin-btn"
                onClick={() => handleSignInWithGoogle()}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                    fill="#34A853"
                  />
                  <path
                    d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                    fill="#4A90E2"
                  />
                  <path
                    d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                    fill="#FBBC05"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
