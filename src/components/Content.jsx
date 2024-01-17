import React from "react";
import "../styles/style.css";

const Content = ({ image }) => {
  console.log(image);
  return (
    <div className="content-container">
      {image.map((item, index) => (
        <div key={index} className="content-card">
          <img src={item.image} />
          <div className="content-info">
            <h1 className="heading">
              <span>Anilist:</span> {item.anilist}
            </h1>
            <h1 className="single-line">
              <span>File:</span> {item.filename}
            </h1>
            <h1>
              <span>Episode:</span> {item.episode || "NULL"}
            </h1>
            <h1>
              <span>Similarity:</span> {(item.similarity * 10).toFixed(2)}
            </h1>
            <h1>
              <span>From:</span> {item.from}s
            </h1>
            <h1>
              <span>To:</span> {item.to}s
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
