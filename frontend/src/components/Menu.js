import "../styles/homepage-header.scss";
import { Link } from 'react-router-dom';


function Menu() {
    return (
        <div className="menu">
            <div className="home">
                <Link to="/"><span className="homeText">Home</span></Link>
            </div>
            <div className="commission">
                <Link to="/Commission"><span className="commissionText">Commission</span></Link>
            </div>
            <div className="templates">
                <Link to="/Info"><span className="templatesText">Info</span></Link>
            </div>
            <div className="report">
                <Link to="/Report"><span className="reportText">Report</span></Link>
            </div>
            <div className="profileName">
                <Link to="/Profile"><span className="profileText">Profile</span></Link>
            </div>
        </div>
    );
}

export default Menu;