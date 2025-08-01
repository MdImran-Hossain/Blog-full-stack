import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate()
  const inputField = [
    { id: 1, name: "userName", place: "Full Name" },
    { id: 2, name: "email", place: "Email Address" },
    { id: 3, name: "phoneNumber", place: "Phone Number" },
    { id: 4, name: "password", place: "Password" },
  ];

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };
const handleSubmit= async(e)=>{
  e.preventDefault();
  const {userName, email, phoneNumber, password}=formData

  const userData={
    userName: userName,
    email: email,
    phoneNumber:phoneNumber,
    password:password

  }


 const response= await axios.post("http://localhost:4000/registion", userData)
   if(response.status==201){
    navigate("/singin");
   }
   
   
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
                      : field.name === "userName"
                      ? "text"
                      : field.name === "phoneNumber"
                      ? "number"
                      : "password"
                  }
                  placeholder={field.place}
                  name={field.name}
                  value={formData[field.name] || ""}
                  className="p-3 border-2 border-black rounded-2xl w-full"
                  onChange={handleOnchange}
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

export default Signup;
