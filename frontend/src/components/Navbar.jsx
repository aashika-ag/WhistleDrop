import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ onSettingsClick }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <Link
                to="/"
                className="logo"
                onClick={closeMenu}
            >
                <span className="logo-mark">W</span>
                <span>WhistleDrop</span>
            </Link>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/report">Submit Report</Link>
                <Link to="/track">Track Report</Link>
                <Link to="/moderator">Moderator</Link>
            </div>

            <div className="nav-actions">
                <button
                    className="icon-button mobile-menu-button"
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    aria-label="Open navigation menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

                <button
                    className="icon-button settings-button"
                    onClick={onSettingsClick}
                    aria-label="Open settings"
                    title="Settings"
                >
                    ⚙
                </button>
            </div>

            {menuOpen && (
                <div className="mobile-nav-menu">
                    <Link
                        to="/"
                        onClick={closeMenu}
                    >
                        Home
                    </Link>

                    <Link
                        to="/report"
                        onClick={closeMenu}
                    >
                        Submit Report
                    </Link>

                    <Link
                        to="/track"
                        onClick={closeMenu}
                    >
                        Track Report
                    </Link>

                    <Link
                        to="/moderator"
                        onClick={closeMenu}
                    >
                        Moderator
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;