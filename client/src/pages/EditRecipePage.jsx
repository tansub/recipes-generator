import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getById, updatePost } from "../redux/features/post/postSlice";
import { toast } from "react-toastify";

export const EditRecipePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // recipe from Redux store
  const selectedPost = useSelector((state) => state.post.selectedPost);
  const loading = useSelector((state) => state.post.loading);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  // fetching recipe
  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setDescription(selectedPost.description);
      setIngredients(selectedPost.ingredients);
      setInstructions(selectedPost.instructions);
    }
  }, [selectedPost]);

  // form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        title,
        description,
        ingredients,
        instructions,
      };

      // dispatch update
      const resultAction = await dispatch(
        updatePost({ id, updatedData })
      ).unwrap();

      if (resultAction._id) {
        toast.success("Recipe updated successfully!", {
          position: "bottom-right",
        });

        navigate(`/recipe/${id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update recipe", { position: "bottom-right" });
    }
  };

  if (loading)
    return (
      <h2 className="text-center text-xl text-gray-600 mt-10">
        Loading recipe...
      </h2>
    );

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 bg-white shadow-md rounded-lg">
      <h2 className="text-center text-3xl font-bold mb-6 text-[#C84B4B]">
        Edit Recipe
      </h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        {/* title */}
        <div>
          <label className="block text-gray-800 font-bold mb-2">Title</label>
          <input
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring focus:ring-red-200"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* description */}
        <div>
          <label className="block text-gray-800 font-bold mb-2">
            Description
          </label>
          <textarea
            className="w-full h-32 px-4 py-3 border rounded-lg shadow-sm focus:ring focus:ring-red-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* ingredients */}
        <div>
          <label className="block text-gray-800 font-bold mb-2">
            Ingredients
          </label>
          <textarea
            className="w-full h-32 px-4 py-3 border rounded-lg shadow-sm focus:ring focus:ring-red-200"
            value={ingredients.join("\n")}
            onChange={(e) => setIngredients(e.target.value.split("\n"))}
            required
          />
        </div>

        {/* instructions */}
        <div>
          <label className="block text-gray-800 font-bold mb-2">
            Instructions
          </label>
          <textarea
            className="w-full h-32 px-4 py-3 border rounded-lg shadow-sm focus:ring focus:ring-red-200"
            value={instructions.join("\n")}
            onChange={(e) => setInstructions(e.target.value.split("\n"))}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#C84B4B] hover:bg-[#A53A3A] text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};
