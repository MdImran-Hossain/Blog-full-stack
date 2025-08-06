import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Slide, toast } from "react-toastify";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    blogTitle: "",
    blogDrescription: "",
    image: null,
  });

  const { id } = useParams();

  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const selectedBlog = await axios.get(
          `http://localhost:4000/getSingleblog/${id}`
        );
        const data = selectedBlog?.data?.data;
        setBlog(data);
        setFormData({
          title: data.title,
          description: data.description,
          banner: data.banner,
        });
      } catch (error) {
        console.log("error from get single blog", error);
      }
    };
    getSingleBlog();
  }, [id]);
  console.log(blog);

const handleDaletBlog = async()=>{
  try {
    const response= await axios.delete(`http://localhost:4000/daleteBlog/${id}`)
  
   if(response.status==201){
     toast.success(`🦄 Blog dalete succesfully!`, {
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
          navigate('/blog')
    }
  } catch (error) {
     toast.error("Failed to delete blog.");
        console.error("Update failed:", error);
  }
}
  return (
    <>
      <div className="w-full min-h-screen flex justify-center py-10">
        <div className="max-w-2xl mx-auto bg-white p-6">
          <h1 className="text-3xl font-bold p-2 pb-4 text-center">
            {blog.blogTitle}
          </h1>
          <img
            src={blog.image || ""}
            alt="Blog Banner"
            className="w-full object-cover rounded-xl mb-6"
          />
          <p className="text-gray-700 text-lg leading-relaxed">
            {blog.blogDrescription}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={()=> handleEditeBlog(blog._id)} className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition duration-300 cursor-pointer">
              Edit Blog
            </button>
            <button onClick={()=> handleDaletBlog(blog._id)}  className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition duration-300 cursor-pointer">
              Delete Blog
            </button>
            <Link to={'/blog'} className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 transition duration-300 cursor-pointer">
              Go back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
