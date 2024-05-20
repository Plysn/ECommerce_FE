import React, { useState } from "react";
import { useParams } from "react-router-dom";
import blogList from "../../data/blog.json";
import MostPopularPost from "./MostPopularPost";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { CalendarOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';

import { Link } from "react-router-dom";
const socialList = [
  {
    link: "#",
    iconName: "icofont-facebook",
    className: "facebook",
  },
  {
    link: "#",
    iconName: "icofont-twitter",
    className: "twitter",
  },
  {
    link: "#",
    iconName: "icofont-linkedin",
    className: "linkedin",
  },
  {
    link: "#",
    iconName: "icofont-instagram",
    className: "instagram",
  },
  {
    link: "#",
    iconName: "icofont-pinterest",
    className: "pinterest",
  },
];

const SingleBlog = () => {
  const [blog, setBlog] = useState(blogList);
  const { id } = useParams();
  const result = blog.filter((p) => p.id === Number(id));

  return (
    <div>
      <BreadCrumb title={"Single Blog Pages"} curPage={<Link to="/blog">Blog</Link>} addi={"Blog Details"} />
      <div className="blog-section blog-single padding-tb section-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="section-wrapper">
                  <div className="row row-cols-1 justify-content-center g-4">
                    <div className="col">
                      <div className="post-item style-2">
                        <div className="post-inner">
                          {result.map((item) => (
                            <div key={item.id}>
                              <div className="post-thumb">
                                <img
                                  src={item.imgUrl}
                                  alt="blog thumb rajibraj91"
                                  className="w-100"
                                />
                              </div>
                              <div className="post-content">
                                <h2>{item.title}</h2>
                                <div className="meta-post">
                                  <ul className="lab-ul">
                                    <li style={{ display: 'flex', alignItems: 'center' }}>
                                      <CalendarOutlined style={{ marginRight: '8px' }} />
                                      April 23, 2021
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center' }}>
                                      <UserOutlined  style={{ marginRight: '8px' }} />
                                      Haaland
                                    </li>
                                  </ul>
                                </div>
                                <p>
                                  Serenity hasir taken poseson mying entre soung
                                  these sweet morngs sprng whch enoywith whole
                                  heart create am alones and feel the charm of
                                  exstenceth spot whch the blissouls like
                                  mineing am soo happy my dearsi frend absoribed
                                  the exquste sense enjoy my whole hearts alone
                                  and fee the charm of exstenceths spotsi whch
                                  was the blis of soulis mineing amsoing dear
                                  frend soingu absoribed the exqust sense
                                  tranqui existence neglect my talentsr should
                                  ncapable ofing is drawng singe wonderful
                                  serenty has taken possesison of my entre
                                  soulng these sweet present moment and yet feel
                                  that never was greater artst
                                </p>

                                <blockquote>
                                  <p>
                                    Dynamically recaptiualize distributed
                                    technologies is wherease turnkey channels
                                    and onotonectally provide access to resource
                                    leveling expertise vias worldwide
                                    deliverables uolisticly extend aserser are
                                    diverse vortals.{" "}
                                  </p>
                                </blockquote>

                                <p>
                                  whole heart create am alones and feel the
                                  charm of exstenceth spot whch the blissouls
                                  like mineing am soo happy my dearsi frend
                                  absoribed the exquste sense enjoy my whole
                                  hearts alone and fee the charm of exstenceths
                                  spotsi whch was the blis of soulis mineing
                                  amsoing dear frend soingu absoribed the exqust
                                  sense tranqui existence neglect my talentsr
                                  should ncapable ofing is drawng singe
                                  wonderful serenty has taken possesison of my
                                  entre soulng these sweet present moment and
                                  yet feel that never was greater artst
                                </p>

                                {/* <img
                                  src="/src/assets/images/blog/single/01.jpg"
                                  alt="rajibraj91"
                                /> */}

                                <p>
                                  Serenity hasir taken poseson mying entre soung
                                  these sweet morngs sprng whch enoywith whole
                                  heart create am alones and feel the charm of
                                  exstenceth spot whch the blissouls like
                                  mineing am soo happy my dearsi frend absoribed
                                  the exquste sense enjoy my whole hearts alone
                                  and fee the charm of exstenceths spotsi whch
                                  was the blis of soulis mineing amsoing dear
                                  frend soingu absoribed the exqust sense
                                  tranqui existence neglect my talentsr should
                                  ncapable ofing is drawng singe wonderful
                                  serenty has taken possesison of my entre
                                  soulng these sweet present moment and yet feel
                                  that never was greater artst
                                </p>

                                <div className="video-thumb">
                                  {/* <img
                                    src="/src/assets/images/blog/single/02.jpg"
                                    alt="video"
                                  /> */}
                                  {/* <a
                                    href="https://youtu.be/2qWo6W5Wn8Q"
                                    className="video-button popup"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="icofont-ui-play"></i>
                                  </a> */}
                                </div>

                                <p>
                                  whole heart create am alones and feel the
                                  charm of exstenceth spot whch the blissouls
                                  like mineing am soo happy my dearsi frend
                                  absoribed the exquste sense enjoy my whole
                                  hearts alone and fee the charm of exstenceths
                                  spotsi whch was the blis of soulis mineing
                                  amsoing dear frend soingu absoribed the exqust
                                  sense tranqui existence neglect my talentsr
                                  should ncapable ofing is drawng singe
                                  wonderful serenty has taken possesison of my
                                  entre soulng these sweet present moment and
                                  yet feel that never was greater artst
                                </p>

                                <div className="tags-section">
                                  <ul className="tags lab-ul">
                                    <li>
                                      <a href="#">Agency</a>
                                    </li>
                                    <li>
                                      <a href="#">Business</a>
                                    </li>
                                    <li>
                                      <a href="#">Personal</a>
                                    </li>
                                  </ul>
                                  {/* <ul className="lab-ul social-icons">
                                    {socialList.map((val, i) => (
                                      <li key={i}>
                                        <a
                                          href={val.link}
                                          className={val.className}
                                        >
                                          <i className={val.iconName}></i>
                                        </a>
                                      </li>
                                    ))}
                                  </ul> */}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* <div className="navigations-part">
                        <div className="left">
                          <a href="#" className="prev">
                            <i></i>Previous
                            Article
                          </a>
                          <a href="#" className="title">
                          </a>
                        </div>
                        <div className="right">
                          <a href="#" className="prev">
                            Next Article<i></i>
                          </a>
                          <a href="#" className="title">
                          </a>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <MostPopularPost />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;