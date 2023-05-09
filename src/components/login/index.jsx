import { useRef, useState, useEffect, useContext,axios } from 'react';
import loginStyle from "./loginStyle.module.css"
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
const Login = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(user=='Anh08122002' && pwd=='24052002@Phuonn')
            navigate('/homeAdmin');
            if(user=='Anh08122002test' && pwd=='24052002@Phuonn')
            navigate('/homeUser');
      
    }
    const handleCaptchaVerify = async (e) => {
        e.preventDefault();
      setIsVerified(true)
      
    }
    return (
        <div className={loginStyle.app}>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? loginStyle.errmsg : loginStyle.offscreen} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={handleCaptchaVerify}
                            // onExpired={this.handleCaptchaExpire}
                            // ref={this.recaptchaRef}
                            />
                        <button disabled={isVerified}>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className={loginStyle.line}>
                            {/*put router link here*/}
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default Login