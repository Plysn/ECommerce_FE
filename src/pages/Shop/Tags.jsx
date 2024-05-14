const title = "Our Popular Tags";

const tagsList = [
  {
    link: "#",
    text: "envato",
  },
  {
    link: "#",
    text: "themeforest",
  },
  {
    link: "#",
    text: "codecanyon",
  },
  {
    link: "#",
    text: "videohive",
  },
  {
    link: "#",
    text: "audiojungle",
  },
  {
    link: "#",
    text: "3docean",
  },
  {
    link: "#",
    text: "3docean",
  },
  {
    link: "#",
    text: "gsan",
  },
  {
    link: "#",
    text: "gadean",
  },
  {
    link: "#",
    text: "gasdfavan",
  },
];

const Tags = () => {
  return (
    // <div className="widget widget-tags">
    <div className="tags-category">
      {/* <div className="widget-header"> */}
      <h5 className="title">{title}</h5>
      {/* </div> */}
      <ul>
        {tagsList.map((val, i) => (
          <li key={i}>
            <a href={val.link}>{val.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;