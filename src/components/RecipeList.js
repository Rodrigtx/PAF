import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/recipesSlice';
import UserContext from '../context/UserContext';
import SearchBar from './SearchBar'; 
import './RecipeList.css';
import { Navbar } from './Navbar';

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const [sortDirection] = useState('asc');
  const [sortBy, setSortBy] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { user } = useContext(UserContext);
  const [showFavoriteRecipes, setShowFavoriteRecipes] = useState(false);
  // eslint-disable-next-line
  const [searchTerm, setSearchTerm] = useState('');
  const [maxCalories, setMaxCalories] = useState(''); 

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);


  const handleToggleFavorite = (recipe) => {
    const isFavorite = favoriteRecipes.some((favRecipe) => favRecipe.recipe.label === recipe.recipe.label);

    if (isFavorite) {
      setFavoriteRecipes(favoriteRecipes.filter((favRecipe) => favRecipe.recipe.label !== recipe.recipe.label));
    } else {
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    }
    setShowFavoriteRecipes(true);
  };

  const sortByAlphabetAscending = (arr) => {
    return arr.sort((a, b) => a.recipe.label.localeCompare(b.recipe.label));
  };

  const sortByAlphabetDescending = (arr) => {
    return arr.sort((a, b) => b.recipe.label.localeCompare(a.recipe.label));
  };

  const sortByCaloriesAscending = (arr) => {
    return arr.sort((a, b) => {
      const caloriesPerServingA = a.recipe.calories / a.recipe.yield;
      const caloriesPerServingB = b.recipe.calories / b.recipe.yield;
      return caloriesPerServingA - caloriesPerServingB;
    });
  };

  const sortByCaloriesDescending = (arr) => {
    return arr.sort((a, b) => {
      const caloriesPerServingA = a.recipe.calories / a.recipe.yield;
      const caloriesPerServingB = b.recipe.calories / b.recipe.yield;
      return caloriesPerServingB - caloriesPerServingA;
    });
  };

  let filteredRecipes = [...recipes];
  if (sortDirection === 'asc') {
    if (sortBy === 'alphabetical') {
      filteredRecipes = sortByAlphabetAscending(filteredRecipes);
    } else if (sortBy === 'calories') {
      filteredRecipes = sortByCaloriesAscending(filteredRecipes);
    } else if (sortBy === 'reverseAlphabet') {
      filteredRecipes = sortByAlphabetDescending(filteredRecipes);
    }
  } else {
    if (sortBy === 'alphabetical') {
      filteredRecipes = sortByAlphabetDescending(filteredRecipes);
    } else if (sortBy === 'calories') {
      filteredRecipes = sortByCaloriesDescending(filteredRecipes);
    } else if (sortBy === 'reverseAlphabet') {
      filteredRecipes = sortByAlphabetAscending(filteredRecipes);
    }
  }

  if (maxCalories && !isNaN(maxCalories)) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      const caloriesPerServing = recipe.recipe.calories / recipe.recipe.yield;
      return caloriesPerServing <= parseFloat(maxCalories);
    });
  }

  const hasFavoriteRecipes = favoriteRecipes.length > 0;

  const handleRemoveFavorite = (favoriteRecipe) => {
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((favRecipe) => favRecipe.recipe.label !== favoriteRecipe.recipe.label)
    );
  };

  return (
    <div >
      <Navbar/> <br></br>
      <div id="recetas">
      <h1>Recetas App</h1>    
      <SearchBar onSearch={setSearchTerm} /> <br></br><br></br> 
      <input id="orde"
          type="number"
          placeholder="Max Calories"
          value={maxCalories}
          onChange={(e) => setMaxCalories(e.target.value)}/>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Ordenacion</option>
        <option value="alphabetical">Orden alfabetico (A-Z)</option>
        <option value="reverseAlphabet">Orden alfabetico (Z-A)</option>
        <option value="calories">Ordenar por calorias</option>
      </select>

      </div>

      {user && hasFavoriteRecipes && showFavoriteRecipes && (
        <div>
          <h2>Recetas Favoritas</h2>
          <ul>
            {favoriteRecipes.map((favoriteRecipe) => (
              <li key={favoriteRecipe.recipe.label}>
                <h3>{favoriteRecipe.recipe.label}</h3>
                <div className="button-container">
                  <button onClick={() => handleRemoveFavorite(favoriteRecipe)}>Eliminar</button>
                  <button onClick={() => window.open(favoriteRecipe.recipe.url, '_blank', 'noopener noreferrer')}>
                    Ver Receta
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul>
        {filteredRecipes.map((recipe) => {
          const caloriesPerServing = recipe.recipe.calories / recipe.recipe.yield;
          const cholesterolPerServing = recipe.recipe.totalNutrients.CHOLE.quantity / recipe.recipe.yield;
          const potassiumPerServing = recipe.recipe.totalNutrients.K.quantity / recipe.recipe.yield;
          const sodiumPerServing = recipe.recipe.totalNutrients.NA.quantity / recipe.recipe.yield;
          const calciumPerServing = recipe.recipe.totalNutrients.CA.quantity / recipe.recipe.yield;
          const magnesiumPerServing = recipe.recipe.totalNutrients.MG.quantity / recipe.recipe.yield;

          return (
            <li key={recipe.recipe.label}>
              <h3>{recipe.recipe.label}</h3>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <p>Fuente: {recipe.recipe.source}</p>
              <p>Porciones: {recipe.recipe.yield}</p>
              <p>Etiquetas de salud: {recipe.recipe.healthLabels.join(', ')}</p>
              <p>Calorias/porcion: {caloriesPerServing.toFixed(2)}</p>
              <p>Proteinas/porcion: {recipe.recipe.totalNutrients.PROCNT.quantity.toFixed(0)} g</p>
              <p>Grasa: {recipe.recipe.totalNutrients.FAT.quantity.toFixed(0)} g </p>
              <p>Carbohidratos: {recipe.recipe.totalNutrients.CHOCDF.quantity.toFixed(0)} g</p>
              <p>Colesterol: {cholesterolPerServing.toFixed(0)} {recipe.recipe.totalNutrients.CHOLE.unit}</p>
              <p>Sodio: {sodiumPerServing.toFixed(0)} {recipe.recipe.totalNutrients.NA.unit}</p>
              <p>Calcio: {calciumPerServing.toFixed(0)} {recipe.recipe.totalNutrients.CA.unit}</p>
              <p>Magnesio: {magnesiumPerServing.toFixed(0)} {recipe.recipe.totalNutrients.MG.unit}</p>
              <p>Potasio: {potassiumPerServing.toFixed(2)} {recipe.recipe.totalNutrients.K.unit}</p>
              <p>Hierro: {recipe.recipe.totalNutrients.FE.quantity.toFixed(2)} {recipe.recipe.totalNutrients.FE.unit}</p>
              {user && (
                <>
                  <button onClick={() => window.open(recipe.recipe.url, '_blank', 'noopener noreferrer')}>
                    Ver Receta
                  </button>
                  <button onClick={() => handleToggleFavorite(recipe)}>
                    {favoriteRecipes.some((favRecipe) => favRecipe.recipe.label === recipe.recipe.label)
                      ? 'Quitar Favorito'
                      : 'Agregar Favorito'}
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecipeList;