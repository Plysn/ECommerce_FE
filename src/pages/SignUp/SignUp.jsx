import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import GoogleLogin from 'react-google-login';
// import { Button } from "antd";
// import { ReactComponent as IconGoogle } from '../../assets/images/logo/google.svg';

const title = "Register Now";
const socialTitle = "Register With Social Media";
const btnText = "Get Started Now";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form className="account-form">
              <div className="form-group">
                <input type="text" name="username" placeholder="UserName" />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" />
              </div>
              <div className="form-group">
                <input type="password" name="password" placeholder="Password" />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
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
                  <span>{btnText}</span>
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Are you a member? <Link to="/sign-in">Login</Link>
              </span>
              <span className="or">
                <span>or</span>
              </span>

              {/* {/* <h5 className="subtitle">{socialTitle}</h5> */}
              {/* <GoogleLogin
                render={(renderProps) => (
                  <Button
                    htmlType="submit"
                    icon={<IconGoogle />}
                    className="login-form-button login-form-button-google fz-16"
                  >
                    Sign in with Google
                  </Button>
                )}
                buttonText="Sign in with Google"
                cookiePolicy="single_host_origin"
              /> */}
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default SignUp;
