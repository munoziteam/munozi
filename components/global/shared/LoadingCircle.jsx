// Import the CSS file for custom styles

const LoadingCircle = (className) => {
  return (
    <div
      className={`loader ${
        typeof className === "string" ? className : " border-t-white"
      }`}
    ></div>
  );
};

export default LoadingCircle;
