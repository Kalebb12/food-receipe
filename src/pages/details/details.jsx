import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/context";

const Details = () => {
  const { id } = useParams();
  const { recipeData, setRecipeData, handleAddToFavorites, favoritesList } =
    useContext(GlobalContext);
  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      if (data?.data) {
        setRecipeData(data?.data);
      }
    }
    getRecipeDetails();
  }, []);
  return (
    <div className="container gap-10 mx-auto py-10 grid grid-cols-1 lg:grid-cols-2">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeData?.recipe?.image_url}
            alt=""
            draggable="false"
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm text-cyan-700 font-medium">
            {recipeData?.recipe?.publisher}
          </span>
          <h3 className="font-bold text-2xl truncate text-black">
            {recipeData?.recipe?.title}
          </h3>
          <div>
            <button
              className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
              onClick={() => {
                handleAddToFavorites(recipeData?.recipe);
              }}
            >
              {favoritesList && favoritesList.length > 0  && favoritesList.findIndex(
                (item) => item.id === recipeData?.recipe?.id
              ) !== -1
                ? "Remove From Favorites"
                : "Add To Favorites"}
            </button>
          </div>
          <div>
            <span className="text-2xl font-semibold text-black">
              Ingredients :
            </span>
            <ul className=" flex flex-col gap-3">
              {recipeData?.recipe?.ingredients.map((ingredient, i) => (
                <li
                  key={i}
                  className="flex flex-row gap-3 items-center text-sm text-gray-700"
                >
                  <span className="flex flex-row gap-3 items-center text-sm text-gray-700 cursor-pointer hover:text-cyan-700 group">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                  <span className="flex flex-row gap-3 items-center text-sm text-gray-700 cursor-pointer hover:text-cyan-700 group">
                    {ingredient.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
