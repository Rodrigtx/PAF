import { createContext, useState } from "react";

const UserContext = createContext();

const initialUser = {
  id: 1,
  name: "Grupo 05",
  favoriteRecipes: [],
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);

  const login = () => {
    setUser(initialUser); 
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavoriteRecipe = (recipeId) => {
    const isFavorite = user.favoriteRecipes.includes(recipeId);
    const favoriteRecipes = isFavorite
      ? user.favoriteRecipes.filter((favRecipeId) => favRecipeId !== recipeId)
      : [...user.favoriteRecipes, recipeId];

    setUser({
      ...user,
      favoriteRecipes,
    });
  };

  const data = { user, login, logout, toggleFavoriteRecipe };

  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
