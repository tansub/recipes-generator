import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/post/postSlice";
import { RecipeGenerator } from "../components/RecipeGenerator";
import { toast } from "react-toastify";

export const AddRecipePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); 

  // Parsing recipe text into structured format
  function parseRecipeText(recipeText) {
    const recipe = {
      title: "",
      description: "",
      ingredients: [],
      instructions: [],
    };

    const titleRegex = /Title:\s*(.*?)(?=\n|$)/;
    const descriptionRegex = /Description:\s*(.*?)(?=\n|$)/;
    const ingredientsRegex = /Ingredients:\s*([\s\S]*?)(?=\n\s*Instructions:|$)/;
    const instructionsRegex = /Instructions:\s*([\s\S]*)/;

    recipe.title = recipeText.match(titleRegex)?.[1]?.trim() || "";
    recipe.description = recipeText.match(descriptionRegex)?.[1]?.trim() || "";
    recipe.ingredients = recipeText.match(ingredientsRegex)?.[1]
      ?.split("\n")
      .map((ingredient) => ingredient.trim())
      .filter(Boolean) || [];
    recipe.instructions = recipeText.match(instructionsRegex)?.[1]
      ?.split("\n")
      .map((step) => step.trim())
      .filter(Boolean) || [];

    return recipe;
  }

  // Handling form submission
  const submitHandler = async (recipeText) => {
    if (!user) {
      toast.error("You must be logged in to add a recipe!", { position: "bottom-right" });
      return;
    }

    try {
      const parsedRecipe = parseRecipeText(recipeText);

      const newRecipe = {
        title: parsedRecipe.title,
        description: parsedRecipe.description,
        ingredients: parsedRecipe.ingredients,
        instructions: parsedRecipe.instructions,
        userId: user._id, // Ensure recipe is linked to the user
      };

      const resultAction = await dispatch(createPost(newRecipe)).unwrap();

      if (resultAction._id) {
        toast.success("Recipe added successfully!", { position: "bottom-right" });
        navigate(`/recipe/${resultAction._id}`);
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
      toast.error(error.message || "Failed to add recipe", { position: "bottom-right" });
    }
  };

  return (
    <form className="w-2/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <RecipeGenerator submitHandler={submitHandler} />
    </form>
  );
};
