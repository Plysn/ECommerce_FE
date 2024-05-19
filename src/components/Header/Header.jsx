import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFiexd, setHeaderFiexd] = useState(false);
  const userCookie = Cookies.get('userInfo');
  const accessTokenCookie = Cookies.get('access_token');
  console.log(userCookie, accessTokenCookie);
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleAdmin = () => {
    navigate("/admin");
  };
  const handleOrder = () => {
    navigate("/cart-page");
  };
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFiexd(true);
    } else {
      setHeaderFiexd(false);
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    navigate("/");
    window.location.reload();
  };

  let storedUser;
  const userFromStorage = localStorage.getItem("user");
  if (userFromStorage !== "undefined" && userFromStorage !== null) {
    storedUser = JSON.parse(userFromStorage);
  } else {
    console.log("No user data in local storage");
  }

  return (
    <header
      className={`header-section style-4 ${headerFiexd ? "header-fixed fadeInUp" : ""
        }`}
    >
      {/* ---header botton starts */}
      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            {/* logo  */}
            <div className="logo-search-acte">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>

            {/* menu area */}
            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link to="/" className="hover:link-warning">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    {" "}
                    <NavLink to="/about">About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">Contact</NavLink>
                  </li>
                  <li>
                    <NavLink to="/cart-page">Cart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orders">Orders</NavLink>
                  </li>
                </ul>
              </div>

              {/* users when user available */}
              {storedUser ? (
                <>
                  <div>
                    <img
                      src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
                      className="nav-profile"
                    />
                  </div>
                  <NavDropdown>
                    <NavDropdown.Item>
                      Hi! {storedUser?.username}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleProfile}>
                      Profile
                    </NavDropdown.Item>

                    {storedUser?.role === "admin" && (
                      <NavDropdown.Item onClick={handleAdmin}>
                        Admin
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item onClick={handleOrder}>
                      Order
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-up"
                    className="lab-btn me-3 d-none d-md-block"
                  >
                    <span>Create Account</span>
                  </Link>
                  <Link to="/sign-in" className="d-none d-md-block">
                    Log In
                  </Link>
                </>
              )}

              {/* menu toggle btn */}
              <div
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
                onClick={() => setMenuToggle(!menuToggle)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              {/* social toggler */}
              <div
                className="ellepsis-bar d-md-none"
                onClick={() => setSocialToggle(!socialToggle)}
              >
                <i className="icofont-info-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* header botton ends */}
    </header>
  );
};

export default NavItems;
