const Loader = (props) => {
  var { note } = props;
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      <div className=" ml-3 ">{note && note}</div>
    </div>
  );
};

export default Loader;
