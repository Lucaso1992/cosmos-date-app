import { Link } from "react-router-dom";

import {Login} from "../Login/Login"
import { useAppContext } from '../../flux/AppContext'

import style from "./NavBar.module.css"
import { BiSolidLogInCircle } from "react-icons/bi";
import { BsMoonStars, BsArrowThroughHeartFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";

export const NavBar = () => {
  const value = useAppContext();

  return (
    <>
    <nav className={`${style.navbar} navbar navbar-expand-sm nav-underline`} data-bs-theme="dark">
      <div className='container-fluid'>

        <Link className={`${style.navbarBrand} navbar-brand`} to="/">
          <BsMoonStars className={style.brand_icon}/>
          Dating Stars
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#favoritesDropdown">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="favoritesDropdown">
          <ul className="navbar-nav nav-underline gap-0 ms-auto">
            {
              value.store.token?
              (
                <>
                <li className={`${style.nav_item} nav-item`}>
                  <Link className={`${style.nav_link} nav-link`} to='/Home'>
                    <IoHome className={style.view_icon}/>
                    Home
                  </Link>
                </li>
                <li className={`${style.nav_item} nav-item`}>
                  <Link className={`${style.nav_link} nav-link`} to='/Match'>
                    <BsArrowThroughHeartFill className={style.view_icon} />
                    Match
                  </Link>
                </li>
                <li className={`${style.nav_item} nav-item`}>
                  <Link className={`${style.nav_link} nav-link`} to='/Porfile'>
                  <FaUserTie className={style.view_icon} />
                    Porfile
                  </Link>
                </li>
                </>
              ):('')
            }
            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal">
                {
                  value.store.token?
                  (
                    <>
                      <MdManageAccounts className={style.login_icon}/>
                      Account
                    </>
                    ):(
                    <>
                      <BiSolidLogInCircle className={style.login_icon}/>
                      Login
                    </>
                  )
                }
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
    <Login />
    </>
  )
}
