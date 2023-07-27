export const filterRecipesByAlphabeticalOrder = (recipes, ascending) => {
    const sortedRecipes = [...recipes].sort((a, b) => {
      const labelA = a.recipe.label.toLowerCase();
      const labelB = b.recipe.label.toLowerCase();
      if (labelA < labelB) {
        return ascending ? -1 : 1;
      }
      if (labelA > labelB) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
    return sortedRecipes;
  };
  
  // Función para filtrar las recetas por calorías
  export const filterRecipesByCalories = (recipes, ascending) => {
    const sortedRecipes = [...recipes].sort((a, b) => {
      const caloriesPerServingA = a.recipe.calories / a.recipe.yield;
      const caloriesPerServingB = b.recipe.calories / b.recipe.yield;
      return ascending ? caloriesPerServingA - caloriesPerServingB : caloriesPerServingB - caloriesPerServingA;
    });
    return sortedRecipes;
  };
  