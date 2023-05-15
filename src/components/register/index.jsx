import { useRef, useState, useEffect,axios } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import registerStyle from "./registerStyle.module.css"
import CryptoJS from 'crypto-js';
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user1, setUser1] = useState(null);

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const axios = require('axios').default;
    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

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
            setSuccess(true)
            const v1 = USER_REGEX.test(user);
            const v2 = PWD_REGEX.test(pwd);
            if (!v1 || !v2) {
                setErrMsg("Invalid Entry");
                return;
            }
            const password = pwd;
            const salt = 'a1b2c3d4'; // salt ngẫu nhiên
            const pepper = 'e5f6g7h8'; // pepper bí mật
    
            const saltedPassword = password + salt;
            const pepperedSaltedPassword = saltedPassword + pepper;
    
            const hash = CryptoJS.SHA256(pepperedSaltedPassword).toString();
            axios.post('https://6312bc98b466aa9b038d6e93.mockapi.io/accout',
            {
              user : user,
              password : hash,
              role : "user"
            }
            )
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        // if button enabled with JS hack
        // const v1 = USER_REGEX.test(user);
        // const v2 = PWD_REGEX.test(pwd);
        // if (!v1 || !v2) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }
        // const password = pwd;
        // const salt = 'a1b2c3d4'; // salt ngẫu nhiên
        // const pepper = 'e5f6g7h8'; // pepper bí mật

        // const saltedPassword = password + salt;
        // const pepperedSaltedPassword = saltedPassword + pepper;

        // const hash = CryptoJS.SHA256(pepperedSaltedPassword).toString();
        // axios.post('https://6312bc98b466aa9b038d6e93.mockapi.io/accout',
        // {
        //   user : user,
        //   password : hash,
        //   role : "user"
        // }
        // )
        // alert("Đăng ký thành công")
        //     //setSuccess(true);
        //     setUser('');
        //     setPwd('');
        //     setMatchPwd('');
    }

    return (
        <div className={registerStyle.app}>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div id="recaptcha-container"></div>
            {success ? (
              <section  >
                <h2 style={{display : "flex", justifyContent : "center", alignItems : "center" , marginTop : "50px" , marginBottom : "50px" , fontSize : "30px"}} className="text-center text-white font-medium text-2xl">
                👍Register Success
                </h2>
                <a style={{display : "flex", justifyContent : "center", alignItems : "center" , marginBottom : "50px" , fontSize : "30px"}} href="/">Sign In</a>
              </section>
            ) : (
            <div>
                {showOTP ? (
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
                ) : (
                    <section>  
                    <p ref={errRef} className={errMsg ? registerStyle.errmsg : registerStyle.offscreen} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={onSignup}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? registerStyle.valid : registerStyle.hide} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? registerStyle.hide : registerStyle.invalid} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? registerStyle.instructions : registerStyle.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? registerStyle.valid : registerStyle.hide} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !registerStyle.pwd ? registerStyle.hide : registerStyle.invalid} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? registerStyle.instructions : registerStyle.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a<br />
                            number and a special character.Allowed special<br /> 
                            characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? registerStyle.valid : registerStyle.hide} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? registerStyle.hide : registerStyle.invalid} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        {/* <p id="confirmnote" className={matchFocus && !validMatch ? registerStyle.instructions : registerStyle.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        <label htmlFor="Telephone_Number">
                            Telephone Number:
                        </label>
                        <PhoneInput  country={"in"} value={ph} onChange={setPh} /> */}
                        <div>
        <div id="recaptcha-container"></div>
              <>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
              </>
          </div>
                        {/* <button  
                        disabled={!validName || !validPwd || !validMatch ? true : false}
                        >Sign Up</button> */}
                    </form>
                    <button  onClick={onSignup}
                        disabled={!validName || !validPwd || !validMatch ? true : false}
                        >Sign Up</button>
                    {/* <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button> */}
                    <p>
                        Already registered?<br />
                        <span className={registerStyle.line}>
                            {/*put router link here*/}
                            <a href="/">Sign In</a>
                        </span>
                    </p>
                    </section>
                )}
          </div>
        )}
        </div>
    )
}

export default Register