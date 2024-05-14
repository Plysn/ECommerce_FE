import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import "../../assets/css/profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: 'User Name',
    email: 'user@example.com',
  });

  const [changeInfoAble, setChangeInfoAble] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleOk = () => {

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleInputChange = (event) => {
    if (changeInfoAble) {
      setChangeInfoAble(false);
      setUser({
        ...user,
        [event.target.name]: event.target.value,
      });
    }
    else {
      setChangeInfoAble(true);

    }
  };

  const handleSubmit = () => {
  };

  console.log("changeInfoAble", changeInfoAble);

  return (
    <div class="container-fluid overcover">
      <div class="container profile-box">
        <div id="about" class="home row">
          <div class="image-box">
            <img src="https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*" alt="avt-user" />
          </div>
        </div>
        <div class="basic-detail row">
          <div class="col-md-8 detail-col">
            <h2>Nguyen Thi Phuong Ly</h2>
            <div class="btn-cover">
              <button class="btn btn-success" onClick={() => handleInputChange()}>
                {changeInfoAble ? <span>Lưu thay đổi</span> : <span>Chỉnh sửa thông tin</span>
                }
              </button>
              <button class="btn btn-success" onClick={showModal}>Thay đổi mật khẩu</button>

              <Modal title="Thay đổi mật khẩu" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <form name="changePassword">
                  <table class="change-password-list">
                    <tbody>
                      <tr>
                        <th>Mật khẩu cũ</th>
                        <td style={{ display: "flex", gap: 10 }}>
                          <input
                            type={showPassword1 ? "text" : "password"}
                            name="older-password"
                            placeholder="Mật khẩu cũ *"
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
                  {passwordMismatch && <span style={{ color: "red", padding: "13px 10px" }}>Mật khẩu mới không trùng khớp!</span>}
                </form>
              </Modal>
            </div>
          </div>

        </div>


        <section id="profile" class="home-dat">
          <div class="row no-margin home-det">

            <div class="col-md-12 home-dat">
              <div class="jumbo-address">
                <div class="row no-margin">
                  <div class="col-lg-12 no-padding">
                    <form name="profile" visiable={changeInfoAble}>

                      <table class="addrss-list">
                        <tbody>
                          <tr>
                            <th>Họ và tên</th>
                            <td> <input
                              type="name"
                              name="name"
                              placeholder="Họ và tên *"
                              disabled={!changeInfoAble}
                            /> </td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td><input
                              type="email"
                              name="email"
                              placeholder="Email *"
                              disabled={!changeInfoAble}
                            /> </td>
                          </tr>
                          <tr>
                            <th>Số điện thoại</th>
                            <td> <input
                              type="phone"
                              name="phone"
                              placeholder="Phone *"
                              disabled={!changeInfoAble}
                            /> </td>
                          </tr>
                          <tr>
                            <th>Địa chỉ giao hàng</th>
                            <td>
                              <select disabled={!changeInfoAble} style={{ marginBottom: 10 }}>
                                <option value="volvo">Hà Nội</option>
                                <option value="saab">Hồ Chí Minh</option>
                                <option value="saab">Đà Nẵng</option>
                                <option value="saab">Khác</option>
                              </select>
                              <select disabled={!changeInfoAble} style={{ marginBottom: 10 }}>
                                <option value="volvo">Đống Đa</option>
                                <option value="saab">Thanh Xuân</option>
                                <option value="saab">Hai Bà Trưng</option>
                                <option value="saab">Ba Đình</option>
                                <option value="saab">Hoang Mai</option>
                              </select>
                              <select disabled={!changeInfoAble} style={{ marginBottom: 10 }}>
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
                              /> </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section id="contact" class="contact-tab">
          <div class="row no-margin">
            <div class="col-md-6 no-padding">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176144.0450019627!2d-107.79423426090409!3d38.97644533805396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874014749b1856b7%3A0xc75483314990a7ff!2sColorado%2C+USA!5e0!3m2!1sen!2sin!4v1547222354537" frameborder="0" style={{ border: 0 }} allowfullscreen></iframe>
            </div>
            <div class="col-md-6">
              <div class="row cont-row no-margin">
                <div class="col-sm-6">
                  <input placeholder="Enter Full Name" type="text" class="form-control form-control-sm" />
                </div>
                <div class="col-sm-6">
                  <input placeholder="Enter Email Address" type="text" class="form-control form-control-sm" />
                </div>
              </div>
              <div class="row cont-row no-margin">
                <div class="col-sm-6">
                  <input placeholder="Enter Mobile Number" type="text" class="form-control form-control-sm" />
                </div>

              </div>
              <div class="row cont-row no-margin">
                <div class="col-sm-12">
                  <textarea placeholder="Enter your Message" class="form-control form-control-sm" rows="10"></textarea>
                </div>

              </div>
              <div class="row cont-row no-margin">
                <div class="col-sm-6">
                  <button class="btn btn-sm btn-success">Send Message</button>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div >
    </div >
  );
};

export default Profile;