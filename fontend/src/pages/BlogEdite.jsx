import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Slide, toast } from "react-toastify";

const BlogEdite = () => {
  const [blog, setBlog] = useState([]);
  const [imagePriview, setImagePriview] = useState(false);
  const [formData, setFormData] = useState({
    blogTitle: "",
    blogDrescription: "",
    image: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const selectedBlog = await axios.get(
          `http://localhost:4000/getSingleblog/${id}`
        );
        const data = selectedBlog?.data?.data;
        setBlog(data);
        setFormData({
          ...formData,
          blogTitle: data.blogTitle,
          blogDrescription: data.blogDrescription,
          image: data.image
        });
      } catch (error) {
        console.log("error from get single blog", error);
      }
    };
    getSingleBlog();
  }, [id]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
   if(files && files[0]){
    const file =files[0];
    const previewUrl= URL.createObjectURL(file)
    setFormData((prev)=>({
      ...prev,
      [name]:file
    }));
    setImagePriview(previewUrl)
   }
   else{
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
   }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        const fromdata= new FormData();
        fromdata.append("blogTitle", formData.blogTitle);
        fromdata.append("blogDrescription", formData.blogDrescription);
        fromdata.append("image", formData.image);
        try {
            const response= await axios.put(`http://localhost:4000/upate-blog/${id}`, fromdata)

       if(response.status==201){
         toast.success(`🦄 Blog update succesfully!`, {
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

               navigate(`/blogdetails/${id}`);
        }
        } catch (error) {
            toast.error("Failed to update blog.");
    console.error("Update failed:", error);
        }

      }

   

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100 p-5 gap-5">
      {/* Form Section */}
      <div className="w-full sm:w-[30%]">
        <div className="w-full bg-white px-5 py-8 rounded-xl shadow-md sticky top-5 left-0">
          <h2 className="text-xl font-bold mb-4">Create a Blog</h2>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-4"
          >
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
            <div>
              <img src={imagePriview?imagePriview:blog.image} alt="" />
            </div>
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
              Update Blog
            </button>
          </form>
        </div>
      </div>

      {/* Blog List Section */}
      {/* <div className="w-full sm:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-5">
        {blog.map((blog) => (
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
      </div> */}
    </div>
  );
};

export default BlogEdite;
