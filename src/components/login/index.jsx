import { useRef, useState, useEffect, useContext,axios } from 'react';
import loginStyle from "./loginStyle.module.css"
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import CryptoJS from 'crypto-js';
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
const Login = (props) => {
    let {accout} = props;
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [ph, setPh] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [user1, setUser1] = useState(null);
    const [role, setRole] = useState("");
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    const obj = [];
    const axios = require('axios').default;

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
      }

    function onSignup() {
        setLoading(true);
        onCaptchVerify();
    
        const appVerifier = window.recaptchaVerifier;
    
        const formatPh = "+" + ph;
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setShowOTP(true);
            toast.success("OTP sended successfully!");
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    
      function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
          .confirm(otp)
          .then(async (res) => {
            console.log(res);
            setUser1(res.user1);
            if(role=='user')
                navigate('/homeUser');
            else if(role=='admin')
            navigate('/homeAdmin');
            alert("Đăng nhập thành công")
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let check =1
        for(let i=0;i<accout.length;i++)
            {
                console.log(pwd)
                const password = pwd;
                const salt = 'a1b2c3d4'; // salt ngẫu nhiên
                const pepper = 'e5f6g7h8'; // pepper bí mật

                const saltedPassword = password + salt;
                const pepperedSaltedPassword = saltedPassword + pepper;

                const hash = CryptoJS.SHA256(pepperedSaltedPassword).toString();

                if(user==accout[i].user && hash==accout[i].password)
                {
                    //navigate('/homeUser');
                    setPh(accout[i].phone);
                    setRole(accout[i].role)
                    console.log(ph)
                    onSignup();
                    check=0
                }
            }
        if(check==1)
        {
            alert("Sai tài khoản hoặc mặt khẩu")
        }
      
    }
    return (
        <div className={loginStyle.app}>
             <Toaster toastOptions={{ duration: 4000 }} />
            <div id="recaptcha-container"></div>
            {showOTP ? 
            (
                    <section >
                <div style={{display : "flex", justifyContent : "center", alignItems : "center" , marginBottom : "20px" , fontSize : "30px"}}  className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                  style={{display : "flex", justifyContent : "center", alignItems : "center" , marginBottom : "50px" , fontSize : "30px"}}
                >
                  Enter your OTP
                </label>
                <OtpInput
                  style={{display : "flex", justifyContent : "center", alignItems : "center" , marginBottom : "50px", marginLeft : "10px" , fontSize : "30px"}}
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
                    </section>
            ) 
            : 
            (
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
                        {/* <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={handleCaptchaVerify}
                            // onExpired={this.handleCaptchaExpire}
                            // ref={this.recaptchaRef}
                            /> */}
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