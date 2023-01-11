import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from "react-bootstrap";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleUsernameChange(e: any) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e: any) {
        setPassword(e.target.value);
    }

    async function logIn() {
        try {
            await signInWithEmailAndPassword(getAuth(), username, password)
            navigate('/articles')
        }
        catch(e: any) {
            setError(e.message);
        }
    }

    return (
        <>
            <h1>Log In</h1>
            {error && <div className="error">{error}</div>}
            <div>
                <label htmlFor="username">Username: </label>
                <input
                    name="username"
                    type="email"
                    value={username}
                    placeholder="Your email address"
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Your password"
                    onChange={handlePasswordChange}
                />
            </div>
            <div>
                <Button className="mt-3" onClick={logIn}>Log In</Button>
                <Link style={{paddingLeft: '10px'}} to={"/signup"}>Don't have an account? Create one here.</Link>
            </div>
        </>
    )
}

export default LoginPage;