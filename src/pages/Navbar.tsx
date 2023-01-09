import {Link} from 'react-router-dom'
import useUser from '../hooks/useUser';

const Navbar = () => {
    const {user, isLoading} = useUser();
    return (
        <nav>
            <ul className="nav-right">
                <li><Link to='/login'>{user ? 'Log Out' : 'Log In'}</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
            </ul>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About Me</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;