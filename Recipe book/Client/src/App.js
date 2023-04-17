import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './pages/RecipeDetail';
import SearchResults from './pages/SearchResults';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch all recipes from the API
    axios.get('/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCreate = (newRecipe) => {
    // Add a new recipe to the API
    axios.post('/recipes', newRecipe)
      .then(response => {
        setRecipes([...recipes, response.data]);
      })
      .catch(error => console.error(error));
  };

  const handleUpdate = (updatedRecipe) => {
    // Update an existing recipe in the API
    axios.put(`/recipes/${updatedRecipe.id}`, updatedRecipe)
      .then(response => {
        const updatedRecipes = recipes.map(r => r.id === response.data.id ? response.data : r);
        setRecipes(updatedRecipes);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (recipeId) => {
    // Delete a recipe from the API
    axios.delete(`/recipes/${recipeId}`)
      .then(response => {
        const updatedRecipes = recipes.filter(r => r.id !== recipeId);
        setRecipes(updatedRecipes);
      })
      .catch(error => console.error(error));
  };

  const handleSearch = (query) => {
    // Search for recipes by keyword
    axios.get(`/recipes/search?q=${query}`)
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => console.error(error));
  };

  const handleSort = () => {
    // Sort recipes by number of ingredients
    const sortedRecipes = [...recipes].sort((a, b) => a.ingredients.length - b.ingredients.length);
    setRecipes(sortedRecipes);
    };
    
    const handleRandom = () => {
    // Get a random recipe from the API
    axios.get('/recipes/random')
    .then(response => {
    // Redirect to the recipe detail page for the random recipe
    const randomRecipeId = response.data.id;
    window.location.href = `/recipes/${randomRecipeId}`;
    })
    .catch(error => console.error(error));
    };
    
    return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar onSearch={handleSearch} onSort={handleSort} onRandom={handleRandom} />
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<RecipeList recipes={recipes} onDelete={handleDelete} />} />
                <Route path="/recipes/new" element={<RecipeForm onSubmit={handleCreate} />} />
                <Route path="/recipes/:id" element={<RecipeDetail onUpdate={handleUpdate} />} />
                <Route path="/search" element = {<SearchResults recipes={recipes} />} />
              </Routes>
        </div>
      </div>
    </Router>
    );
    }
    
    export default App;