import { Link } from 'react-router-dom'
import useUser from '../hooks/useUser';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();
    return (
        <nav>
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
                <div className="nav-right">
                    {user
                        ? <button onClick={() => {
                            signOut(getAuth())
                        }}>Log Out</button>
                        : <button onClick={() => {
                            navigate('/login')
                        }}>Log In</button>
                    }
                    <button onClick={() => {
                        navigate('/signup')
                    }}>Sign Up</button>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar;