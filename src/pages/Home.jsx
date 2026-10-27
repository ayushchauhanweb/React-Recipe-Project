import axios from "axios";
import React, { use, useEffect, useState } from "react";

import RecipeCard from "../components/RecipeCard";
import useLoading from "../hook/useLoading";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [errorMsg, SetErrorMsg] = useState("");
  const [searchquery, setSearchquery] = useState("");
  const { loading, startLoading, stopLoading } = useLoading();

  async function fetchRecipes(skipCount, query) {
    startLoading();
    try {
      let url = `https://dummyjson.com/recipes?limit=9&skip=${skipCount}`;
      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=9&skip=${skipCount}&q=${query}`;
      }
      const { data } = await axios.get(url);
      setRecipes((prev) =>
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes],
      );
      setTotal(data.total);
    } catch (error) {
      SetErrorMsg("Please try again later.");
    }
    stopLoading();
  }

  useEffect(() => {
    fetchRecipes(0);
  }, []);

  function handelSearch(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const query = form.get("query").trim();
    setSearchquery(query);

    fetchRecipes(0, query);
  }

  if (errorMsg) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-accent text-center">{errorMsg}</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <form
        className="flex gap-2 max-w-md mx-auto mb-8"
        onSubmit={handelSearch}
      >
        <input
          type="text"
          name="query"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium"
        >
          Search
        </button>
      </form>

      {loading && <div className="loader text-center py-6"></div>}

      {!loading && recipes.length === 0 && (
        <p className="text-center py-6 text-muted">
          {`No recipes found for '${searchquery}`}'
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {recipes.length < total && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => fetchRecipes(recipes.length, searchquery)}
            className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

export default Home;
