import React, { useEffect, useState } from "react";
import { Form, Modal, Skeleton, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "../../assets/css/profile.css";
import usersApi from "../../services/users";

const Profile = () => {
  const [user, setUser] = useState({
    name: "User Name",
    email: "user@example.com",
  });

  const [changeInfoAble, setChangeInfoAble] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      const parsedUser = JSON.parse(storedUserId);
      setUserId(parsedUser.id);
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    // Code to upload the file goes here
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    setPasswordMismatch(newPassword !== confirmPassword);
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await usersApi.getUserInfo(userId);
        setUserInfo(response.data.data);
      } catch (error) {
        message.error(error);
      }
    };

    fetchData();
  }, [userId]);

  console.log(oldPassword);

  const handleOk = async () => {
    try {
      const response = await usersApi.updatePassword(userId, {
        oldPassword,
        newPassword,
        confirmPassword
      });
      console.log(response);
    } catch (error) {
      if (error.response.status === 422) {
        setErrorMessage("Mật khẩu cũ không chính xác! Vui lòng thử lại.");
      }
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (event) => {
    if (changeInfoAble) {
      setChangeInfoAble(false);
      setUser({
        ...user,
        [event.target.fullname]: event.target.value,
      });
    } else {
      setChangeInfoAble(true);
    }
  };

  const handleSubmit = () => { };

  return (
    <div className="container-fluid overcover">
      <div className="container profile-box">
        <div id="about" className="home row">
          <div className="image-box">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*"
              alt="avt-user"
            />
          </div>
        </div>
        <div className="basic-detail row">
          <div className="col-md-8 detail-col">
            <h2>Nguyen Thi Phuong Ly</h2>
            <div className="btn-cover">
              <button
                className="btn btn-success"
                onClick={() => handleInputChange()}
              >
                {changeInfoAble ? (
                  <span>Lưu thay đổi</span>
                ) : (
                  <span>Chỉnh sửa thông tin</span>
                )}
              </button>
              <button className="btn btn-success" onClick={showModal}>
                Thay đổi mật khẩu
              </button>

              <Modal
                title="Thay đổi mật khẩu"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <form name="changePassword">
                  <table className="change-password-list">
                    <tbody>
                      <tr>
                        <th>Mật khẩu cũ</th>
                        <td style={{ display: "flex", gap: 10 }}>
                          <input
                            type={showPassword1 ? "text" : "password"}
                            name="older-password"
                            placeholder="Mật khẩu cũ *"
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                          <EyeOutlined onClick={togglePasswordVisibility1} />
                        </td>
                      </tr>
                      <tr>
                        <th>Mật khẩu mới</th>
                        <td style={{ display: "flex", gap: 10 }}>
                          <input
                            type={showPassword2 ? "text" : "password"}
                            name="new-password"
                            placeholder="Mật khẩu mới *"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                          />
                          <EyeOutlined onClick={togglePasswordVisibility2} />
                        </td>
                      </tr>
                      <tr>
                        <th>Nhập lại mật khẩu mới</th>
                        <td style={{ display: "flex", gap: 10 }}>
                          <input
                            type={showPassword3 ? "text" : "password"}
                            name="new-password-confirmation"
                            placeholder="Nhập lại mật khẩu mới *"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                          />
                          <EyeOutlined onClick={togglePasswordVisibility3} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {passwordMismatch && (
                    <span style={{ color: "red", padding: "13px 10px" }}>
                      Mật khẩu mới không trùng khớp!
                    </span>
                  )}
                  {errorMessage && (
                    <div style={{ color: "red", padding: "13px 10px" }}>
                      {errorMessage}
                    </div>
                  )}
                </form>
              </Modal>
            </div>
          </div>
        </div>
        {userInfo ? (
          <section id="profile" className="home-dat">
            <div className="row no-margin home-det">
              <div className="col-md-12 home-dat">
                <div className="jumbo-address">
                  <div className="row no-margin">
                    <div className="col-lg-12 no-padding">
                      <Form
                        name="profile"
                        visiable={changeInfoAble}
                        initialValues={userInfo}
                      >
                        <table className="addrss-list">
                          <tbody>
                            <tr>
                              <th>Họ và tên</th>
                              <td>
                                <input
                                  type="name"
                                  name="fullname"
                                  placeholder="Họ và tên *"
                                  disabled={!changeInfoAble}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Email *"
                                  disabled={!changeInfoAble}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Số điện thoại</th>
                              <td>
                                <input
                                  type="phone"
                                  name="phone"
                                  placeholder="Phone *"
                                  disabled={!changeInfoAble}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Địa chỉ giao hàng</th>
                              <td>
                                <select
                                  disabled={!changeInfoAble}
                                  style={{ marginBottom: 10 }}
                                >
                                  <option value="volvo">Hà Nội</option>
                                  <option value="saab">Hồ Chí Minh</option>
                                  <option value="saab">Đà Nẵng</option>
                                  <option value="saab">Khác</option>
                                </select>
                                <select
                                  disabled={!changeInfoAble}
                                  style={{ marginBottom: 10 }}
                                >
                                  <option value="volvo">Đống Đa</option>
                                  <option value="saab">Thanh Xuân</option>
                                  <option value="saab">Hai Bà Trưng</option>
                                  <option value="saab">Ba Đình</option>
                                  <option value="saab">Hoang Mai</option>
                                </select>
                                <select
                                  disabled={!changeInfoAble}
                                  style={{ marginBottom: 10 }}
                                >
                                  <option value="volvo">Bách Khoa</option>
                                  <option value="saab">Bạch Mai</option>
                                  <option value="saab">Thanh Nhàn</option>
                                  <option value="saab">Phố Huế</option>
                                  <option value="saab">Lê Đại Hành</option>
                                </select>
                                <input
                                  type="address"
                                  name="address"
                                  placeholder="Street *"
                                  disabled={!changeInfoAble}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <Skeleton />
        )}

        <section id="contact" className="contact-tab">
          <div className="row no-margin">
            <div className="col-md-6 no-padding">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176144.0450019627!2d-107.79423426090409!3d38.97644533805396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874014749b1856b7%3A0xc75483314990a7ff!2sColorado%2C+USA!5e0!3m2!1sen!2sin!4v1547222354537"
                frameborder="0"
                style={{ border: 0 }}
                allowfullscreen
              ></iframe>
            </div>
            <div className="col-md-6">
              <div className="row cont-row no-margin">
                <div className="col-sm-6">
                  <input
                    placeholder="Enter Full Name"
                    type="text"
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    placeholder="Enter Email Address"
                    type="text"
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="row cont-row no-margin">
                <div className="col-sm-6">
                  <input
                    placeholder="Enter Mobile Number"
                    type="text"
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="row cont-row no-margin">
                <div className="col-sm-12">
                  <textarea
                    placeholder="Enter your Message"
                    className="form-control form-control-sm"
                    rows="10"
                  ></textarea>
                </div>
              </div>
              <div className="row cont-row no-margin">
                <div className="col-sm-6">
                  <button className="btn btn-sm btn-success">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
