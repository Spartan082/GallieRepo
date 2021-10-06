import "../styles/menu.scss";

function Menu() {
    return (
        <div className="menu">
            <div className="home">
                <span className="homeText">Home</span>
            </div>
            <div className="commission">
                <span className="commissionText">Commission</span>
            </div>
            <div className="templates">
                <span className="templatesText">Templates</span>
            </div>
            <div className="report">
                <span className="reportText">Report</span>
            </div>
            <div className="profileName">
                <span className="profileText">Profile</span>
            </div>
        </div>
    );
}

export default Menu;