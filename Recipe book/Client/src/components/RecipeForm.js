import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeForm({ onSubmit }) {
  const [title, setTitle] = useState('');

  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleIngredientsChange = (e) => {
    setIngredients(e.target.value.split(','));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { title, ingredients };
    onSubmit(newRecipe);
    navigate('/');
  }

return (
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Create Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input type="text" name="title" id="title" value={title} onChange={handleTitleChange} required className="w-full border-gray-300 rounded-md shadow-sm mb-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
              <textarea name="ingredients" id="ingredients" value={ingredients.join(', ')} onChange={handleIngredientsChange} required className="w-full border-gray-300 rounded-md shadow-sm mb-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <p className="text-xs text-gray-500">Separate each ingredient with a comma (,)</p>
            </div>
            <div>
              <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
);
}

export default RecipeForm;