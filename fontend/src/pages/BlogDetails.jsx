import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    banner: null,
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

//   const handleSave = async () => {
//     try {
//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("description", formData.description);
//       if (formData.banner && typeof formData.banner !== "string") {
//         data.append("banner", formData.banner);
//       }

//       await axios.put(`http://localhost:4000/update-blog/${id}`, data);

//       const updated = await axios.get(
//         `http://localhost:4000/selected-blog/${id}`
//       );
//       const updatedData = updated.data.data;

//       setBlog(updatedData);
//       setFormData({
//         title: updatedData.title,
//         description: updatedData.description,
//         banner: updatedData.banner,
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.log("Error updating blog", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;

//     if (type === "file") {
//       const file = files[0];
//       if (file) {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: file,
//         }));
//       }
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       title: blog.title,
//       description: blog.description,
//       banner: blog.banner,
//     });
//     setIsEditing(false);
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:4000/delete-blog/${id}`);
//       alert("Blog deleted successfully!");
//       navigate("/blogs");
//     } catch (error) {
//       console.log("Error deleting blog", error);
//     }
//   };

  return (
    <div className="w-full min-h-screen flex justify-center py-10">
      <div className="max-w-2xl mx-auto bg-white p-6">
        {!isEditing ? (
          // View Mode
          <>
            <h1 className="text-3xl font-bold p-2 pb-4 text-center">
              {blog.title}
            </h1>
            <img
              src={blog.banner || ""}
              alt="Blog Banner"
              className="w-full object-cover rounded-xl mb-6"
            />
            <p className="text-gray-700 text-lg leading-relaxed">
              {blog.description}
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition duration-300 cursor-pointer"
                
              >
                Edit Blog
              </button>
              <button
               
                className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition duration-300 cursor-pointer"
              >
                Delete Blog
              </button>
              <button
             
                className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 transition duration-300 cursor-pointer"
              >
                Go back
              </button>
            </div>
          </>
        ) : (
          // Edit Mode
          <div className="">
            {/* for title */}
            <input
              type="text"
              name="title"
              value={formData.title}
              className="w-full text-3xl font-bold text-center border-1 p-2 mb-4 rounded-xl outline-none"
            />
            {/* for banner */}
            <div className="relative w-full mb-6 group">
              {formData.banner && (
                <img
                  src={
                    typeof formData.banner === "string"
                      ? formData.banner
                      : URL.createObjectURL(formData.banner)
                  }
                  alt="Preview"
                  className="w-full object-cover rounded-xl"
                />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0000006c] rounded-xl flex items-center justify-center transition duration-300">
                <button
                  type="button"
                 
                  className="bg-white text-black px-4 py-2 rounded-lg font-semibold cursor-pointer"
                >
                  Replace
                </button>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                id="bannerUpload"
                name="banner"
                accept="image/*"
                className="hidden"
              />
            </div>
            {/* for description*/}
            <textarea
              name="description"
              rows="6"
              value={formData.description}
              className="w-full border rounded-xl p-3 text-lg leading-relaxed"
            />
            {/* save and cancel button */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition duration-300"
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;