import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getById,
  deletePost,
  clearSelectedPost,
} from "../redux/features/post/postSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RecipeDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPost, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch]);

  // delete recipe
  const handleDelete = () => {
    dispatch(deletePost(id))
      .unwrap()
      .then(() => {
        toast.success("Recipe deleted successfully!", {
          position: "bottom-right",
        });
        navigate("/recipes");
      })
      .catch((error) =>
        toast.error(`Failed to delete: ${error}`, { position: "bottom-right" })
      );
  };

  // error,loading message
  if (loading) return <h2 className="text-center">Loading recipe...</h2>;
  if (error)
    return <h2 className="text-center text-red-500">Error: {error}</h2>;
  if (!selectedPost) return <h2 className="text-center">No recipe found</h2>;

  return (
    <div className="container mt-12 mx-auto p-4">
      <button
        onClick={() => navigate("/recipes")}
        className="bg-glacier-700 hover:bg-glacier-900 text-white px-4 py-2 rounded hover:bg-tapestry-900"
      >
        Back to Recipes
      </button>
      <div className="mt-6 border rounded shadow-lg">
        <div className="h-10 bg-chestnut-rose-600">
          <h2 className="text-center text-white font-semibold p-2">
            {selectedPost.title}
          </h2>
        </div>

        <div className="p-6">
        <h3 className="mt-3 font-semibold">Ingredients:</h3>
        <ul className="list-disc ml-5">
          {selectedPost.ingredients.map((ingredient, index) => (
            <div key={index}>{ingredient}</div>
          ))}
        </ul>
        <h3 className="mt-3 font-semibold">Instructions:</h3>
        <ul className="list-decimal ml-5">
          {selectedPost.instructions.map((step, index) => (
            <div key={index}>{step}</div>
          ))}
        </ul>
        <div className="flex justify-around mt-4">
          <button className="bg-glacier-700 hover:bg-glacier-900 text-white px-4 py-2 rounded" onClick={() => navigate(`/${id}/edit`)}>Edit</button>
          <button
            onClick={handleDelete}
            className="bg-chestnut-rose-600 hover:bg-chestnut-rose-800 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};
