import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";


const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const handleLogout = async ()=>{
        axios.defaults.withCredentials = true;

        try{
            const userLogout = await axios.post(BASE_URL+"/logout", {}, {withCredentials:true});
            dispatch(removeUser(userLogout.data));
           // Cookies.remove('token');
            navigate("/login");
        }
        catch(err){
            console.log(err);
        }
    }
    return(
            <div className="navbar bg-base-100 z-10 fixed top-0 left-0">
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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/requests">Requests</Link></li>
                    <li><Link to="/connections">Connections</Link></li>
                </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-3xl italic font-extralight leading-loose ">bookmyheart</a>
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
                <button className="btn btn-ghost btn-circle dropdown">
                <div  tabIndex={1} role="button" className="indicator ">
                <div className="avatar online">
                    <div className="w-10 rounded-full">
                        <img src={user.photoUrl} />
                        <ul
                    tabIndex={1}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><button type="button" onClick={handleLogout} href="">Logout</button></li>
                </ul>
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