import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Slide, toast } from "react-toastify";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const[user, setUser]=useState()
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    blogTitle: "",
    blogDrescription: "",
    image: null,
  });
  const navigate = useNavigate();

useEffect(()=>{
  const getAllBlog= async ()=>{
    try {
      const allblog= await axios.get("http://localhost:4000/getAllblog")
      setBlogs(allblog.data.data);
      
    } catch (error) {
      console.log("error from get all blog", error);
      
    }
  }
  getAllBlog()
},[refresh]);

useEffect(() => {
  const getUser = async () => {
    try {
      const id = localStorage.getItem("userId"); // ✅ Get from storage

      if (!id) {
        console.error("No user ID found. User might not be logged in.");
        return;
      }

      const res = await axios.get(`http://localhost:4000/me/${id}`);
      setUser(res.data.data); // adjust according to your response format

    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  getUser();
}, []);
 
 const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  
     
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const fromdata= new FormData();
    fromdata.append("blogTitle", formData.blogTitle);
    fromdata.append("blogDrescription", formData.blogDrescription);
    fromdata.append("image", formData.image);
    fromdata.append("userId", user._id);

    const response= await axios.post("http://localhost:4000/create-blog", fromdata)
  
   if(response.status==201){
     toast.success(`🦄 Blog create succesfully!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
setFormData({
        blogTitle: "",
        blogDrescription: "",
        image: null,
      });

      setRefresh(!refresh)
    }
  
  }

  const handleViewBtn = (id) => {
    navigate(`/blogdetails/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100 p-5 gap-5">
      {/* Form Section */}
      <div className="w-full sm:w-[30%]">
        <div className="w-full bg-white px-5 py-8 rounded-xl shadow-md sticky top-5 left-0">
          <h2 className="text-xl font-bold mb-4">Create a Blog</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <input
              type="text"
              name="blogTitle"
              placeholder="Blog Title"
              value={formData.blogTitle}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              name="blogDrescription"
              placeholder="Blog Description"
              value={formData.blogDrescription}
              onChange={handleChange}
              rows="4"
              className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 cursor-pointer"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600"
            >
              Submit Blog
            </button>
          </form>
        </div>
      </div>

      {/* Blog List Section */}
      <div className="w-full sm:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-5">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative"
          >
            <button
              onClick={() => handleViewBtn(blog._id)}
              className="absolute top-3 right-3 bg-blue-500 text-white text-sm px-3 py-1 rounded-xl hover:bg-blue-600"
            >
              View
            </button>
            <img
              src={blog.image}
              alt="Banner"
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{blog.blogTitle}</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">
                {blog.blogDrescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
