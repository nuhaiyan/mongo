import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="h-[64px] bg-slate-700 flex px-10 justify-end">
        <ul className="flex items-center gap-6">
          <li>
            <Link to={"/"} className="text-lg text-white">Home</Link>
          </li>
          <li>
            <Link  className="text-lg text-white" to={"/employlist"}>BLOG LIST</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;