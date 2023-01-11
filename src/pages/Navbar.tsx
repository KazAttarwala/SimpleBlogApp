import { Link } from 'react-router-dom'
import useUser from '../hooks/useUser';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa';

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
                        ? <><span><FaRegUser /> {user['email']}</span>
                            <Button variant="link" className='login-btn' onClick={() => {
                            signOut(getAuth())
                        }}>Log Out</Button>
                        </>
                        : <Button variant='link' className='login-btn' onClick={() => {
                            navigate('/login')
                        }}>Log In</Button>
                    }
                    <Button hidden={!!user} variant="outline-dark" onClick={() => {
                        navigate('/signup')
                    }}>Sign Up</Button>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar;