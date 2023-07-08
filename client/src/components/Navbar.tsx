import LinkScissorLogo from '../assets/images/logo.svg';
import { logout } from "../services/auth";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


const Navbar = ({ logged_in }: { logged_in: boolean }) => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className='navbar flex items-center justify-between px-6 py-6'>
      <a href="/" className='flex justify-between my-auto'>
        <img src={LinkScissorLogo} className="w-8 h-8" alt="Logo" />
        <h1 className='bold text-xl my-auto mx-4'>LinkScissors</h1>
      </a>


      {!logged_in &&
        <ul className="flex">
          <li key={1}>
            <Link className=" border px-12 p-2 rounded-lg bg-[#efefef] hover:bg-[#0087cb]" to="/login">
              Login
            </Link>
          </li>

          <li key={2}>
            <Link className=" border px-12 p-2 mx-4 rounded-lg bg-[#efefef] hover:bg-[#0087cb]" to="/register">Sign Up
            </Link>
          </li>
        </ul>

      }


      {logged_in &&
        <ul className="flex">
          <li key={1}>
            <Link to="/links"className="hover:cursor-pointer border px-12 p-2 rounded-lg bg-[#efefef] hover:bg-[#0087cb]">
              My Links
            </Link>
          </li>

          <li key={2}>
            <button className="hover:cursor-pointer mx-4 border px-12 p-2 rounded-lg bg-[#efefef] hover:bg-[#0087cb]" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      }
    </nav >
  );
};

const mapStateToProps = (state: any) => {
  return {
    logged_in: state.logged_in,
  };
};

export default connect(mapStateToProps)(Navbar);