import React, { useEffect, useRef, useState } from "react";

// user input
const RecipeCard = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState("");

  // form submission
  const handleSubmit = () => {
    const recipeData = {
      ingredients,
    };
    onSubmit(recipeData);
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-8 text-chestnut-rose-600">Create a recipe!</div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ingredients"
          >
            Ingredients:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ingredients"
            type="text"
            placeholder="Enter ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

        <div className="flex justify-center px-6 py-4">
          <button
            className=" bg-chestnut-rose-600 hover:bg-chestnut-rose-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Generate Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

// ai response
export function RecipeGenerator({ submitHandler }) {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const [output, setOutput] = useState(false);

  // streaming
  let eventSourceRef = useRef(null);

  useEffect(() => {
    closeEventStream();
  }, []);

  useEffect(() => {
    if (recipeData) {
      closeEventStream();
      initializeEventStream();
    }
  }, [recipeData]);

  const initializeEventStream = () => {
    const recipeInputs = { ...recipeData };
    setOutput(true);

    const queryParams = new URLSearchParams(recipeInputs).toString();
    const url = `http://localhost:3003/recipeStream?${queryParams}`;
    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log(data);

      if (data.action === "close") {
        closeEventStream();
      } else if (data.action === "chunk") {
        setRecipeText((prev) => prev + data.chunk);
      }
    };

    // server message
    eventSourceRef.current.onerror = () => {
      eventSourceRef.current.close();
    };
  };

  const closeEventStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  // recipe submission
  async function onSubmit(data) {
    setRecipeText("");
    setRecipeData(data);
  }

  return (
    <div className="flex flex-column">
      <div className="w-full h-full my-4 gap-2 justify-center">
        <RecipeCard onSubmit={onSubmit} />
        {output && (
          <div>
            <div className="w-full h-[400px] mt-9 text-xs text-gray-600 p-4 border rounded-lg shadow-xl whitespace-pre-line overflow-y-auto">
              {recipeText}
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="mx-auto bg-chestnut-rose-600 hover:bg-chestnut-rose-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                type="button"
                onClick={() => submitHandler(recipeText)}
              >
                Save Recipe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
