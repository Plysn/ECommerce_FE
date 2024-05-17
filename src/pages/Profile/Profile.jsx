import { useEffect, useState } from "react";
import { Form, Modal, Skeleton, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "../../assets/css/profile.css";
import usersApi from "../../services/users";

const Profile = () => {
  const [changeInfoAble, setChangeInfoAble] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      const parsedUser = JSON.parse(storedUserId);
      setUserId(parsedUser.id);
    }
    setErrorMessage(null);
  }, []);

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
    setPasswordMismatch(password !== confirmPassword);
  }, [password, confirmPassword]);

  const fetchData = async () => {
    try {
      const response = await usersApi.getUserInfo(userId);
      setUserInfo(response.data.data);
    } catch (error) {
      console.log("An error occurred! Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleOk = async () => {
    try {
      const response = await usersApi.updatePassword(userId, {
        oldPassword,
        password,
        confirmPassword,
      });
      if (response.status === 200) {
        message.success("Password change successful!");
        setIsModalVisible(false);
        fetchData();
      }
    } catch (error) {
      if (error.response.status === 422) {
        setErrorMessage("Old password is incorrect! Please try again.");
      }
      if (error.response.status === 404) {
        setErrorMessage("Invalid password! Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeInfo = async () => {
    try {
      if (changeInfoAble) {
        const { address, email, username, phone, fullname } = userInfo;
        const updatedUserInfo = { address, email, username, phone, fullname };
        const response = await usersApi.updateUserInfo(userId, updatedUserInfo);
        if (response.status === 200) {
          message.success("Updated personal information successfully!");
        }
        setChangeInfoAble(false);
      } else {
        setChangeInfoAble(true);
      }
    } catch (error) {
      message.error("An error occurred! Please try again.");
      window.location.reload();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

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
            <h2>{userInfo?.username}</h2>
            <div className="btn-cover">
              <button
                className="btn btn-success"
                onClick={() => handleChangeInfo()}
              >
                {changeInfoAble ? (
                  <span>Save Information</span>
                ) : (
                  <span>Change Information</span>
                )}
              </button>
              <button className="btn btn-success" onClick={showModal}>
                Change Password
              </button>

              <Modal
                title=" Change Password"
                visible={isModalVisible}
                onOk={() => handleOk()}
                onCancel={handleCancel}
              >
                <form name="changePassword">
                  <table className="change-password-list">
                    <tbody>
                      <tr>
                        <th>Old Password</th>
                        <td style={{ display: "flex", gap: 10 }}>
                          <input
                            type={showPassword1 ? "text" : "password"}
                            name="older-password"
                            placeholder="Old password *"
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                          <EyeOutlined onClick={togglePasswordVisibility1} />
                        </td>
                      </tr>
                      <tr>
                        <th>New password</th>
                        <td style={{ display: "flex", gap: 10 }}>
                          <input
                            type={showPassword2 ? "text" : "password"}
                            name="new-password"
                            placeholder="New password *"
                            value={password}
                            onChange={handleNewPasswordChange}
                          />
                          <EyeOutlined onClick={togglePasswordVisibility2} />
                        </td>
                      </tr>
                      <tr>
                        <th>Confirm new password</th>
                        <td style={{ display: "flex", gap: 10 }}>
                          <input
                            type={showPassword3 ? "text" : "password"}
                            name="new-password-confirmation"
                            placeholder="Confirm new password *"
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
                      Password mismatch!
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
                              <th>Fullname</th>
                              <td>
                                <input
                                  type="text"
                                  name="fullname"
                                  placeholder="Fullname *"
                                  disabled={!changeInfoAble}
                                  value={userInfo ? userInfo.fullname : ""}
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>User name</th>
                              <td>
                                <input
                                  type="text"
                                  name="username"
                                  placeholder="User name *"
                                  disabled={!changeInfoAble}
                                  value={userInfo ? userInfo.username : ""}
                                  onChange={handleInputChange}
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
                                  value={userInfo ? userInfo.email : ""}
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Phone</th>
                              <td>
                                <input
                                  type="tel"
                                  name="phone"
                                  placeholder="Phone *"
                                  disabled={!changeInfoAble}
                                  value={userInfo ? userInfo.phone : ""}
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Address</th>
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
                                  type="text"
                                  name="address"
                                  placeholder="Street *"
                                  disabled={!changeInfoAble}
                                  value={userInfo ? userInfo.address : ""}
                                  onChange={handleInputChange}
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
