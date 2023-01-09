import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [confirmPW, setConfirmPW] = useState("");
    const navigate = useNavigate();

    function handleUsernameChange(e: any) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e: any) {
        setPassword(e.target.value);
    }

    function handleConfirmPW(e: any) {
        setConfirmPW(e.target.value);
    }

    async function createAccount() {
        try {
            if (confirmPW !== password) {
                setError("Password and confirm password do not match!");
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), username, password)
            navigate('/articles')
        }
        catch(e: any) {
            setError(e.message);
        }
    }

    return (
        <>
            <h1>Create Account</h1>
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
                <label htmlFor="confirmPW">Confirm Password: </label>
                <input
                    name="confirmPW"
                    type="password"
                    value={confirmPW}
                    placeholder="Reenter your password"
                    onChange={handleConfirmPW}
                />
            </div>
            <div>
                <button onClick={createAccount}>Create</button>
                <Link style={{paddingLeft: '10px'}} to={"/login"}>Already have an account? Log in here.</Link>
            </div>
        </>
    )
}

export default CreateAccountPage;