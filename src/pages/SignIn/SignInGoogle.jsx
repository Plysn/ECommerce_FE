import axios from "axios";
import { useEffect, useState } from "react";
import { message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons"

const SignInGoogle = () => {
    const [codeAuth, setCodeAuth] = useState(null);
    const [err, setErr] = useState(null);

    const api = axios.create({
        baseURL: 'http://localhost:3000/api',
        headers: {
          "accept ": "application/json",
          "Content-Type": "application/json",
        },
      });
      

    const navigate = useNavigate();

    useEffect(() => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const _error = url.searchParams.get('error');
        setErr(_error);
        setCodeAuth(code);
      }, []);

    useEffect(() => {
        if (err) {
            navigate("/sign-in")
            message.error("Login failed! Please try again.");
        };
        if (codeAuth != null && codeAuth != '') {
            const fetchData = async () => {
                try {
                    const response = await api.post('/auth/google/get-infor', {codeAuth: codeAuth});
                    if (response.status === 200) {
                        localStorage.setItem("user", JSON.stringify(response.data.data));
                        localStorage.setItem(
                        "access_token",
                        JSON.stringify(response.data.access_token)
                        );
                        navigate("/");
                        notification.success({
                            message: "Logged in successfully!",
                            placement: 'top'
                        });
                    }
                    else if (response.status === 404) {
                        console.log(response)
                        navigate("/sign-in")
                        notification.success({
                            message: response.data.error
                        })
                    }

                } catch (error) {
                    if (error.response.data.message === "email đã được đăng ký như tài khoản thường.") {
                        message.error("Email đã được đăng ký như tài khoản thường.");
                        navigate("/sign-in")
                    } else {
                        navigate("/sign-in")
                        message.error("Login failed! Please try again.");
                    }
                }
            };
            fetchData();   
        }
    }, [codeAuth, err]);
    return (
        <div className="gg-loading">
            <LoadingOutlined />
        </div>
    )
}

export default SignInGoogle