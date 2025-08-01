import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Signin = () => {
  const nevigate= useNavigate()
  const inputField = [
    { id: 2, name: "email", place: "Email Address" },
    { id: 4, name: "password", place: "Password" },
  ];

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleOnchangelogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };
const handleSubmit= async(e)=>{
  e.preventDefault();
  const {email,password}=loginData
 const longData={
    email: email,
    password:password

  }


  const longinResponse = await axios.post("http://localhost:4000/login", longData)
   if(longinResponse.status==200){
    nevigate("/blog");
   }
console.log(longinResponse);
}

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="w-[500px] bg-white shadow-2xl rounded-2xl p-[20px]">
          <h2 className="text-[50px] font-bold text-black text-center">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-items-stretch">
            {inputField.map((field) => (
              <div key={field.id} className="p-[10px] w-full">
                <input
                  type={
                    field.name.toLowerCase() === "email"
                      ? "email"
                      : field.name === "fullName"
                      ? "text"
                      : field.name === "phone_number"
                      ? "number"
                      : "password"
                  }
                  placeholder={field.place}
                  name={field.name}
                  value={loginData[field.name] || ""}
                  className="p-3 border-2 border-black rounded-2xl w-full"
                  onChange={handleOnchangelogin}
                />
              </div>
            ))}
            <button
               type="submit"
              className="px-6 py-3 rounded-2xl bg-blue-400 text-2xl font-medium"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
