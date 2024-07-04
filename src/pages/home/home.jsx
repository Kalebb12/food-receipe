import { useContext } from "react";
import { GlobalContext } from "../../context/context";
import RecipeItem from "../../components/recipeItem/recipeItem";

const Home = () => {
  const { recipeList, loading } = useContext(GlobalContext);
  // if (loading) return <div>loading... please wait!</div>;
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem item={item} key={item.id} />)
      ) : null}
      {loading && <div className="block">loading... please wait!</div>}
      {!recipeList.length  && <div className="lg:text-4xl text-xl text-center text-black font-extrabold ">
          Nothing to show .please search somthing
        </div>}
    </div>
  );
};

export default Home;
