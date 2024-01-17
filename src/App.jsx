import React, { useState } from "react";
import "./styles/style.css";
import Input from "./components/Input";
import Content from "./components/Content";
import File from "./components/FileUpload";
import Loader from "./components/Loader";

const App = () => {
  const [image, setImage] = useState();
  const [toggleSection, setToggleSection] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const getImageLink = (e) => {
    setImage(e);
    setToggleSection(false);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  if (isLoading) return <Loader />;
  return (
    <>
      {toggleSection && (
        <>
          <section className="main-container" onDragOver={handleDragOver}>
            <div></div>
          </section>
          <div className="container-collection">
            <Input getImage={getImageLink} setLoading={setLoading} />
          </div>
        </>
      )}
      {image && (
        <section onDragOver={handleDragOver}>
          <Content image={image} />
        </section>
      )}
      <File
        getImage={getImageLink}
        handleDragLeave={handleDragLeave}
        isDragOver={isDragOver}
        setIsDragOver={setIsDragOver}
        handleDragOver={handleDragOver}
        setLoading={setLoading}
      />
    </>
  );
};

export default App;
