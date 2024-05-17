import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import authApi from "../../services/auth";

const title = "Reset Password";

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleReset = async (event) => {
    event.preventDefault();

    try {
      const response = await authApi.resetPassword({});

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.access_token)
        );
        message.success("Đăng nhập thành công!");
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.data?.code === "not_found_email") {
        message.error("Vui lòng kiểm tra lại email");
      }
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

            <form className="account-form" onSubmit={handleReset}>
              <div className="form-group">
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password *"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
