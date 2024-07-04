import { createContext, useState } from "react";

export const GlobalContext = createContext(null);
import { Navigate, useNavigate } from "react-router-dom";

export default function GlobalState({ children }) {
  const [searchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeData, setRecipeData] = useState(null);
  const [favoritesList, setFavoriteList] = useState([]);
  const Navigate = useNavigate()
  const handleAddToFavorites = (getCurrentItem) => {
    let CopyFavoritesList = [...favoritesList];
    const index = CopyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      CopyFavoritesList.push(getCurrentItem);
    } else {
      CopyFavoritesList.splice(index);
    }
    setFavoriteList(CopyFavoritesList);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`
      )
        .then((res) => {
          setLoading(true);
          return res.json();
        })
        .then((data) => {
          setRecipeList(data.data.recipes);
          setLoading(false);
          setSearchParams("");
          Navigate("/")
          // console.log(data.data.recipes)
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setSearchParams("");
    }
  }
  return (
    <GlobalContext.Provider
      value={{
        searchParams,
        setSearchParams,
        loading,
        recipeList,
        handleSubmit,
        recipeData,
        setRecipeData,
        handleAddToFavorites,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
