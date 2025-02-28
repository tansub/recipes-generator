import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../redux/features/post/postSlice";  // Import user-specific action
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RecipesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts = [], loading, error } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth); 

  // Fetching user-specific recipes
  useEffect(() => {
    if (user) {
      dispatch(getMyPosts())  
        .unwrap()
        .catch((err) => {
          toast.error(`${err}`, { position: "bottom-right" });
        });
    }
  }, [dispatch, user]);

  // if (!user) return <h2 className="text-center text-red-500">Please log in to view your recipes.</h2>;
  if (loading) return <h2 className="text-center">Loading recipes...</h2>;
  if (error) return <h2 className="text-center text-red-500">Error: {error}</h2>;

  return (
    <div className="container mx-auto mt-10 p-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-glacier-600">Your Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="border p-4 rounded shadow-lg">
              <h2 className="text-xl font-semibold text-glacier-500">{post.title}</h2>
              <p className="text-gray-600 mt-2 h-3/6">{post.description}</p>
              <div className="flex">
                <button
                  onClick={() => navigate(`/recipe/${post._id}`)}
                  className="mx-auto mt-3 bg-chestnut-rose-600 hover:bg-chestnut-rose-800 text-white px-4 py-2 rounded"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center col-span-3">No recipes found</h2>
        )}
      </div>
    </div>
  );
};
