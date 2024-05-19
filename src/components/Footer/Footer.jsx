/* eslint-disable react/jsx-no-target-blank */

import { Link } from "react-router-dom";
import { TwitterOutlined } from '@ant-design/icons';
import { EnvironmentOutlined } from '@ant-design/icons';
import { PhoneOutlined } from '@ant-design/icons';
import { MailOutlined } from '@ant-design/icons';
const title = "About ShopCart";
const desc =
  "Nestled in the bustling Dai Co Viet street lies CartShop – a shoe haven. Its vibrant displays showcase a diverse range of footwear, from trendy sneakers to timeless classics.";
const ItemTitle = "Categories";
const quickTitle = "Quick Links";
const tweetTitle = "Recent Tweets";

const addressList = [
  {
    //iconName: "icofont-google-map",
    icon: <EnvironmentOutlined/>,
    text: " Hanoi, Vietnam",
  },
  {
    //iconName: "icofont-phone",
    icon: <PhoneOutlined/>,
    text: " +84969776495",
  },
  {
    //iconName: "icofont-envelope",
    icon: <MailOutlined/>,
    text: " info@shopcart.com",
  },
];

const ItemList = [
  {
    text: "All Products",
    link: "/shop",
  },
  {
    text: "Shop",
    link: "/shop",
  },
  {
    text: "Blog",
    link: "/blog",
  },
  {
    text: "About",
    link: "/about",
  },
  {
    text: "Contact",
    link: "/contact",
  },
];

const quickList = [
  {
    text: "Summer Sessions",
    link: "#",
  },
  {
    text: "Events",
    link: "#",
  },
  {
    text: "Gallery",
    link: "#",
  },
  {
    text: "Forums",
    link: "#",
  },
  {
    text: "Privacy Policy",
    link: "#",
  },
  {
    text: "Terms of Use",
    link: "#",
  },
];

const tweetList = [
  {
    iconName: <TwitterOutlined/>,
    desc: (
      <p>
        Kevin De Bruyne
        <p>Grab your item, 50% Big Sale Offer !! </p>
      </p>
    ),
  },
  {
    iconName: <TwitterOutlined/>,
    desc: (
      <p>
        Harry Kane
        <p>Grab your item, New Products come !! </p>
      </p>
    ),
  },
];

const footerbottomList = [
  {
    text: "Faculty",
    link: "#",
  },
  {
    text: "Staff",
    link: "#",
  },
  {
    text: "Students",
    link: "#",
  },
  {
    text: "Alumni",
    link: "#",
  },
];

const Footer = () => {
  return (
    <footer className="style-2">
      <div className="footer-top dark-view padding-tb">
        <div className="container">
          <div className="row g-4 row-cols-xl-4 row-cols-sm-2 row-cols-1 justify-content-center">
            <div className="col">
              <div className="footer-item our-address">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>{title}</h4>
                    </div>
                    <div className="content">
                      <p>{desc}</p>
                      <ul className="lab-ul office-address">
                        {addressList.map((val, i) => (
                          <li key={i}>
                            {val.icon}
                            {val.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="footer-item">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>{ItemTitle}</h4>
                    </div>
                    <div className="content">
                      <ul className="lab-ul">
                        {ItemList.map((val, i) => (
                          <li key={i}>
                            <a href={val.link}>{val.text}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="footer-item">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>{quickTitle}</h4>
                    </div>
                    <div className="content">
                      <ul className="lab-ul">
                        {quickList.map((val, i) => (
                          <li key={i}>
                            <a href={val.link}>{val.text}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="footer-item twitter-post">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>{tweetTitle}</h4>
                    </div>
                    <div className="content">
                      <ul className="lab-ul">
                        {tweetList.map((val, i) => (
                          <li key={i}>
                            {/* {val.iconName} */}
                            {val.desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
