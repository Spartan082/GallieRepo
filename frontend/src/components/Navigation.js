import "../styles/navigation.scss";
import logo from "../images/logo.jpg";
import searchIcon from "../images/search_icon.png";
import Menu from "./Menu.js";

function Navigation() {
    return (
        <div className="navigation">
            <img className="logo" src={logo} alt="gallie logo" />
            <div className="search">
                <img className="searchIcon" src={searchIcon} alt="search icon" />
                <span className="searchText">Search</span>
            </div>
            <Menu />
        </div>
    );
}

export default Navigation;