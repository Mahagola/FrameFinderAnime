import ReactDOM from "react-dom";
import { useState, useRef } from "react";
import axios from "axios";

const FileUpload = (props) => {
  const {
    handleDragLeave,
    handleDragOver,
    isDragOver,
    setIsDragOver,
    setLoading,
  } = props;
  const [imageFile, setImageFile] = useState();
  const fileInputRef = useRef();
  const acceptedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpeg",
    "image/avif",
  ];

  const getImageHandler = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      setIsDragOver(false);

      const droppedFile = event.dataTransfer.files[0];
      console.log(droppedFile.type);
      if (droppedFile && acceptedImageTypes.includes(droppedFile.type)) {
        const formData = new FormData();
        formData.append("image", droppedFile);

        const response = await axios.post(
          "https://api.trace.moe/search",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const responseData = response.data.result;

        props.getImage(responseData);
      } else {
        console.error("Please select an image file.");
      }
    } catch (error) {
      console.error("Error during Axios request:", error.message);
    }
    setLoading(false);
  };

  const handleFileUpload = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile && acceptedImageTypes.includes(imageFile.type)) {
      setImageFile(imageFile);
    } else {
      console.error("Please select an image file.");
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`dropbox ${isDragOver ? "dragover" : ""}`}
      onDrop={getImageHandler}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <p className="file-name">{imageFile && imageFile.name}</p>
      <input
        className="input-box"
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
    </div>,
    document.getElementById("dialog")
  );
};

export default FileUpload;
