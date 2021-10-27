import "../styles/menu.scss";
import logo from "../images/logo.jpg";
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div className='navigation'>
            <img className="logo" src={logo} alt="gallie logo" />
            <div className="menu">
                <div class="links">
                    <Link to="/"><span className="#">Home</span></Link>
                </div>
                <div class="dropdown">
                    <div class="links">Commission</div>
                    <div class="dropdown-content">
                        <Link to="/Create Request"><span className="#">Create Request</span></Link>
                        <Link to="/View Request"><span className="#">View Request</span></Link>
                </div>
                </div>
                <div class="links">
                        <Link to="/Template"><span className="#">Template</span></Link>
                </div>
                <div class="dropdown">
                    <div class="links">Profile</div>
                    <div class="dropdown-content">
                        <Link to="/Login"><span className="#">Login</span></Link>
                        <Link to="/Create Account"><span className="#">Create Account</span></Link>
                        <Link to="/Logout"><span className="#">Logout</span></Link>
                        <Link to="/Artwork"><span className="#">Artwork</span></Link>
                        <Link to="/Rates"><span className="#">Rates</span></Link>
                    </div>
                </div>
                <div class="links">
                    <Link to="/Message"><span className="#">Message</span></Link>
                </div>
                <div class="dropdown">
                    <div class="links">Invoices</div>
                    <div class="dropdown-content">
                        <Link to="/Create Invoice"><span className="#">Create Invoice</span></Link>
                        <Link to="/View Invoice"><span className="#">View Invoice</span></Link>                        </div>
                </div>
                <div class="dropdown">
                    <div class="links">Community Management</div>
                    <div class="dropdown-content">
                        <Link to="/Create Report"><span className="#">Create Report</span></Link>
                        <Link to="/View Report"><span className="#">View Report</span></Link>
                        <Link to="/Place Strike"><span className="#">Place Strike</span></Link>
                        <Link to="/Remove Profile"><span className="#">Remove Profile</span></Link>
                        <Link to="/Pending Invoice"><span className="#">Pending Invoice</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;