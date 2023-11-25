import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import Logo from "../../images/Logo.svg"


const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src={Logo} /></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Proximos</span></Link>
            </div>
        </div>
    )
}

export default Header;