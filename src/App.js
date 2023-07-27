import React from 'react';
import RecipeList from './components/RecipeList';
import './App.css';

import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <div>
      <UserProvider>
        <RecipeList />
      </UserProvider>
    </div>
  );
};

export default App;
