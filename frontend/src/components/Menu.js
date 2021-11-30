import "../styles/menu.scss";
import logo from "../images/logo.jpg";
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import React, { useEffect, useState } from 'react';

function Menu() {
    const linkStyle = {
        textDecoration: "none",
        color: '#FFFDFD'
      };

    const [loginStatus, setLoginStatus] = useState(false);
    const [profileStatus, setProfileStatus] = useState('');
    const [autoRefresh, setAutoRefresh] = useState(true)

    useEffect(() => {
        let interval 
        const fetchData = () => { 
            axios.get(process.env.REACT_APP_IP_ADDRESS + '/login')
            .then((res) => {
                console.log(res.data)
                //if user is logged in set the profileId
                if (res.data.loggedIn === true)
                {
                setLoginStatus(true);
                setProfileStatus(res.data.user[0].status);
                console.log(loginStatus);
                console.log(profileStatus);
                }
                else {
                    setLoginStatus(false);
                }
            }).catch((error) => {
                console.log(error)
            });
        }   

        if (loginStatus) {
            fetchData();
        }

        if (autoRefresh) {
            interval = setInterval(() => {
              fetchData();
            }, 5 * 1000)
          }
      
          return () => {
            clearInterval(interval)
          }
    }, [autoRefresh, loginStatus]);

    if (loginStatus && profileStatus === 'Moderator') {
        return (
            <div className='navigation'>
                <img className="logo" src={logo} alt="gallie logo" />
                <div className="menu">
                    <div class="links">
                        <Link to="/" style={linkStyle}><span className="#">Home</span></Link>
                    </div>
                    <div class="dropdown">
                        <div class="links" style={linkStyle}>Commission</div>
                        <div class="dropdown-content">
                            <Link to="/Create Request"><span className="#">Create Request</span></Link>
                            <Link to="/View Request"><span className="#">View Request</span></Link>
                    </div>
                    </div>
                    <div class="links">
                            <Link to="/Template" style={linkStyle}><span className="#">Template</span></Link>
                    </div>
                    <div class="dropdown">
                        <div class="links" style={linkStyle}>Profile</div>
                        <div class="dropdown-content">
                            <Link to="/Logout"><span className="#">Logout</span></Link>
                            <Link to="/UploadArtwork"><span className="#">Upload Artwork</span></Link>
                            <Link to="/RemoveArtwork"><span className="#">Remove Artwork</span></Link>
                            <Link to="/Rates"><span className="#">Rates</span></Link>
                        </div>
                    </div>
                    {/* <div class="links">
                        <Link to="/Message" style={linkStyle}><span className="#">Message</span></Link>
                    </div> */}
                    <div class="dropdown">
                        <div class="links" style={linkStyle}>Invoices</div>
                        <div class="dropdown-content">
                            <Link to="/Create Invoice"><span className="#">Create Invoice</span></Link>
                            <Link to="/View Invoice"><span className="#">View Invoice</span></Link>                        </div>
                    </div>
                    <div class="dropdown">
                        <div class="links" style={linkStyle}>Community Management</div>
                        <div class="dropdown-content">
                            <Link to="/Create Report"><span className="#">Create Report</span></Link>
                            <Link to="/View Report"><span className="#">View Report</span></Link>
                            <Link to="/View Strike"><span className="#">View Strike</span></Link>
                            <Link to="/Remove Profile"><span className="#">Remove Profile</span></Link>
                            <Link to="/Pending Invoice"><span className="#">Pending Invoice</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else if (loginStatus && profileStatus === 'Artist') {
        return (
            <div className='navigation'>
                <img className="logo" src={logo} alt="gallie logo" />
                <div className="menu">
                    <div class="links">
                        <Link to="/" style={linkStyle}><span className="#">Home</span></Link>
                    </div>
                    <div class="dropdown">
                        <div class="links" style={linkStyle}>Commission</div>
                        <div class="dropdown-content">
                            <Link to="/Create Request"><span className="#">Create Request</span></Link>
                            <Link to="/View Request"><span className="#">View Request</span></Link>
                    </div>
                    </div>
                    <div class="links">
                            <Link to="/Template" style={linkStyle}><span className="#">Template</span></Link>
                    </div>
                    <div class="dropdown">
                        <div class="links" style={linkStyle}>Profile</div>
                        <div class="dropdown-content">
                            <Link to="/Logout"><span className="#">Logout</span></Link>
                            <Link to="/UploadArtwork"><span className="#">Upload Artwork</span></Link>
                            <Link to="/RemoveArtwork"><span className="#">Remove Artwork</span></Link>
                            <Link to="/Rates"><span className="#">Rates</span></Link>
                        </div>
                    </div>
                    {/* <div class="links">
                        <Link to="/Message" style={linkStyle}><span className="#">Message</span></Link>
                    </div> */}
                    <div class="dropdown">
                        <div class="links" style={linkStyle}>Invoices</div>
                        <div class="dropdown-content">
                            <Link to="/Create Invoice"><span className="#">Create Invoice</span></Link>
                            <Link to="/View Invoice"><span className="#">View Invoice</span></Link>                        </div>
                    </div>
                    <div class="dropdown">
                        <div class="links" style={linkStyle}>Community Management</div>
                        <div class="dropdown-content">
                            <Link to="/Create Report"><span className="#">Create Report</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='navigation'>
                <img className="logo" src={logo} alt="gallie logo" />
                <div className="menu">
                    <div class="links">
                        <Link to="/" style={linkStyle}><span className="#">Home</span></Link>
                    </div>
                    <div class="dropdown">
                        <div class="links" style={linkStyle}>Commission</div>
                        <div class="dropdown-content">
                            <Link to="/Create Request"><span className="#">Create Request</span></Link>
                        </div>
                    </div>
                    <div class="links">
                            <Link to="/Template" style={linkStyle}><span className="#">Template</span></Link>
                    </div>
                    <div class="dropdown">
                        <div class="links" style={linkStyle}>Profile</div>
                        <div class="dropdown-content">
                            <Link to="/Login"><span className="#">Login</span></Link>
                            <Link to="/Create Account"><span className="#">Create Account</span></Link>
                        </div>
                    </div>
                    {/* <div class="links">
                        <Link to="/Message" style={linkStyle}><span className="#">Message</span></Link>
                    </div> */}
                    <div class="dropdown">
                        <div class="links" style={linkStyle}>Community Management</div>
                        <div class="dropdown-content">
                            <Link to="/Create Report"><span className="#">Create Report</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
   
}

export default Menu;