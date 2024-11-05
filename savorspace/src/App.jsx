import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/Homepage';
import LandingPage from './components/LandingPage';
import Login from './components/LoginScreen';
import RecipePage from './components/RecipePage';
import Register from './components/SignupScreen';
import './styles/MainStyles.css';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import AdminDashboard from './components/AdminDashboard';
import NotFound from './components/NotFound';
// Navbar Component
const Navbar = ({ profilePic, handleLogout, isAuthenticated}) => {
  const location = useLocation();
  const showNavbar = !['/login', '/register'].includes(location.pathname);
  const isMainPage = ['/homepage', '/recipes', '/community', '/aboutus'].includes(location.pathname);

  const activeLinkStyle = { color: '#D6589F', fontWeight: 'bold' };

  const [showDropdown, setShowDropdown] = useState(false);  
  const toggleDropdown = useCallback((e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setShowDropdown(prevState => !prevState);
    console.log('Toggle dropdown called');
  }, []);

  // Close the dropdown when clicking outside (optional)
  const handleOutsideClick = useCallback((e) => {
    if (!e.target.closest('.profile-pic-container')) {
      setShowDropdown(false);
    }
  }, []);
  

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    console.log('Current path:', location.pathname);
    console.log('isMainPage:', isMainPage);
    console.log('showNavbar:', showNavbar);
    console.log('showDropdown:', showDropdown);
  }, [location.pathname, isMainPage, showNavbar, showDropdown]);

  return (
    <>
      {showNavbar && (
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src="/src/images/savorspaceLogo.png" alt="SavorSpace Logo" className="logo" />
          </Link>
          <h1>
            Savor<span className='highlight'>Space</span>
          </h1>
          <ul>
            <li className={location.pathname === '/homepage' ? 'active' : ''}>
              <Link to="/homepage" style={location.pathname === '/homepage' ? activeLinkStyle : {}}>Home</Link>
            </li>
            <li className={location.pathname === '/recipes' ? 'active' : ''}>
              <Link to="/recipes" style={location.pathname === '/recipes' ? activeLinkStyle : {}}>Recipes</Link>
            </li>
            <li className={location.pathname === '/community' ? 'active' : ''}>
              <Link to="/community" style={location.pathname === '/community' ? activeLinkStyle : {}}>Community</Link>
            </li>
            <li className={location.pathname === '/aboutus' ? 'active' : ''}>
              <Link to="/aboutus" style={location.pathname === '/aboutus' ? activeLinkStyle : {}}>About Us</Link>
            </li>
          </ul>
          { isAuthenticated && isMainPage ? (
            <div className="mainpage-buttons">
              <div className="profile-pic-container">
                <img 
                  src={profilePic || "/src/images/defaultProfile.png"} 
                  alt="Profile" 
                  className="navbar-profile-pic" 
                  onClick={toggleDropdown}
                />
                {showDropdown && (
                  <div className="dropdown-profile">
                    <button onClick={() => console.log('Edit Profile Clicked')}>Edit Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link to="/register" className="signup-btn">Sign up</Link>
          )}
        </nav>
      )}
    </>
  );
};

Navbar.propTypes = {
  profilePic: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const App = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchProfilePic = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:8080/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProfilePic(`http://localhost:8080${data.imageURL}`);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

  useEffect(() => {
    fetchProfilePic();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setProfilePic(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const handleLogin = () => {
    fetchProfilePic();
  };

  return (
    <Router>
      <div>
        <Navbar profilePic={profilePic} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path='/404' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
