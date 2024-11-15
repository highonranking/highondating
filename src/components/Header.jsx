import { useSelector } from "react-redux";

const Header = () => {
    const user = useSelector(store => store.user);
    return(
            <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><a href="/">Home</a></li>
                    <li><a>Connections</a></li>
                    <li><a href="/login">Profile</a></li>
                </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-3xl italic font-extralight leading-loose ">highondating</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </button>
                {user &&(
                <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                <div className="avatar online">
                    <div className="w-10 rounded-full">
                        <img src={user.photoUrl} />
                    </div>
                    </div>
                </div>
                </button>
                )}
            </div>
            </div>
    )
}

export default Header;