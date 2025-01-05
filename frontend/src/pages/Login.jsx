import logo from "../images/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import rightIMG from "../images/loginRight.png";
import { useState } from "react";
import { api_base_url } from "../Helper";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const login = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          setTimeout(() => {
            navigate("/");
          }, 10);
        } else {
          setError(data.message);
        }
      });
  };
  return (
    <>
      <div className="flex overflow-hidden items-center w-screen justify-center flex-col h-screen bg-[#F0F0F0]">
        <div className="flex w-full items-center ">
          <div className="left w-[30%] flex flex-col ml-[100px] ">
            <img className="w-[250px]" src={logo} alt="" />
            <form className=" pl-3 mt-5 " action="" onSubmit={login}>
              <div className="inputContainer">
                <p className="text-[15px] text-black">Email</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <MdEmail />
                  </i>
                  <input
                    type="email"
                    placeholder="Email"
                    id="Email"
                    name="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    required
                  />
                </div>
              </div>
              <div className="inputContainer">
                <p className="text-[15px] text-black">Password</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <RiLockPasswordFill />
                  </i>
                  <input
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password"
                  id="Password"
                  name="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <i
                  className="cursor-pointer !mr-3 !text-[25px]"
                  onClick={() => setShowPassword(!showPassword)} 
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </i>
                </div>
              </div>
              <p className="text-red-500 text-[15px] my-2">{error}</p>
              <p>
                Dont have an Account?{" "}
                <Link to="/signUp" className="text-blue-500">
                  Signup
                </Link>
              </p>
              <button className="p-[10px] bg-green-500 transition-all hover:bg-green-700 text-white rounded-lg w-full border-0">
                Login
              </button>
            </form>
          </div>
          <div className="right flex items-end justify-end">
            <img src={rightIMG} alt="" className="w-[45vw] " />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
