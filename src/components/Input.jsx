import { useRef } from "react";
import ReactDOM from "react-dom";
import { AiOutlineLink, AiOutlineSearch } from "react-icons/ai";

const Input = (props) => {
  const { setLoading } = props;
  const inputRef = useRef();

  const getImageLink = async () => {
    setLoading(true);
    await fetch(
      `https://api.trace.moe/search?url=${encodeURIComponent(
        `${inputRef.current.value}`
      )}`
    ).then((e) => e.json().then((item) => props.getImage(item.result)));
    setLoading(false);
  };

  return ReactDOM.createPortal(
    <form onSubmit={getImageLink}>
      <div
        className="url-container"
        onClick={() => window.scrollBy(0, -window.innerHeight)}
      >
        <AiOutlineLink />
        <input
          ref={inputRef}
          type="text"
          placeholder="Drop or Enter the image link..."
        />
        <button type="submit">
          <AiOutlineSearch className="cursor-pointer" />
        </button>
      </div>
    </form>,
    document.getElementById("dialog")
  );
};

export default Input;
