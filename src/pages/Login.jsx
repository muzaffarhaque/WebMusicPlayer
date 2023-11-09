import React, { useState } from "react";
import { Image } from "react-bootstrap";
import flag from "../assets/images/india-flag-icon.png";
import { toast } from "react-toastify";
import { OTP } from "../utils/constant";
import { useNavigate  } from "react-router-dom";
import axiosInstance from "../components/Interceptor";
import commonPostApi from "../server/Api";

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [requestId, setRequestId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState({ one: "", two: "", three: "", four: "" });
  const { one, two, three, four } = otp;
  async function submithandler(e) {
    e.preventDefault();
    const info = {
      phoneNumber: "+91" + phoneNumber,
    };
    if (phoneNumber.length < 10) {
      toast.error("Enter valid phone number Length ");
    } else {
      const responce = await commonPostApi("/auth/login", JSON.stringify(info));
      // console.log(responce);
      if (responce.status === 200) {
        setShow(false);
        console.log('OTP is = 5678');
        setRequestId(responce.data.requestId);
        toast.success(responce.data.message);
      } else {
        toast.error(responce.response.data.message);
      }
    }
  }
  const verifyOtpHandler = (e) => {
    e.preventDefault();
    const otp = one + two + three + four;
    if (otp == OTP) {
      navigate("/");
    } else {
      toast.error(`${otp} Invaled Opt`);
    }
    setOtp({ one: "", two: "", three: "", four: "" });
  };
  const optChangeHandler = (e) => {
    e.preventDefault();
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };
  return (
    <section className="login-section d-flex align-items-center justify-content-center vh-100 w-100">
      {show ? (
        <form onSubmit={submithandler}>
          <div className="sign-in-box">
            <h4 className=" fs-38 fw-medium primary ">Sign In</h4>
            <p className=" fs-12 fw-normal black-101 ">
              Please enter your mobile number to login. We will send an OTP to
              verify your number.
            </p>
            <div className="sigin-input-number-frame">
              <Image src={flag} alt="" className="flag-image" />
              <span className="fs-18 fw-normal"> +19</span>
              <input
                type="number"
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                maxLength="10"
                required
                placeholder="8475637939"
                className="fs-18 fw-normal input-box-button"
              />
            </div>
            <button className="primary-btn w-100" type="submit">
              {" "}
              Sign In{" "}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={verifyOtpHandler}>
          <div className="otp-box">
            <h4 className=" fs-38 fw-medium primary ">Sign In</h4>
            <p className=" fs-12 fw-normal black-101 ">
              Please enter your mobile number to login. We will send an OTP to
              verify your number.
            </p>
            <div className="input-fiels-frame">
              <input
                type="number"
                onChange={optChangeHandler}
                required
                name="one"
                value={one}
                className="otp-input-box"
              />
              <input
                type="number"
                onChange={optChangeHandler}
                required
                name="two"
                value={two}
                className="otp-input-box"
              />
              <input
                type="number"
                onChange={optChangeHandler}
                required
                name="three"
                value={three}
                className="otp-input-box"
              />
              <input
                type="number"
                onChange={optChangeHandler}
                required
                name="four"
                value={four}
                className="otp-input-box"
              />
            </div>
            <button className="primary-btn w-100" type="submit">
              {" "}
              Verify{" "}
            </button>
            <p className="text-center mb-13 fs-16 fw-light mt-16">
              {" "}
              <span onClick={submithandler} className="fs-16 fw-light text-decoration-underline black-101 pointer">
                {" "}
                Resend OTP{" "}
              </span>{" "}
            </p>
            <p className="text-center fs-16 fw-light">
              {" "}
              <span
                className="fs-16 fw-light text-decoration-underline black-101 pointer"
                onClick={() =>{setShow(true);setPhoneNumber('')}}
              >
                {" "}
                Use another number{" "}
              </span>{" "}
            </p>
          </div>
        </form>
      )}
    </section>
  );
}
