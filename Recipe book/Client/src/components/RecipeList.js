import React from 'react';
import { Link } from 'react-router-dom';

function RecipeList({ recipes, onDelete }) {
  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">All Recipes</h2>
        <ul className="divide-y divide-gray-200">
          {recipes.map(recipe => (
            <li key={recipe.id} className="py-4">
              <div className="flex justify-between items-center">
                <Link to={`/recipes/${recipe.id}`} className="text-lg font-medium text-indigo-600">{recipe.title}</Link>
                <button onClick={() => onDelete(recipe.id)} className="px-3 py-1 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
              </div>
              <div className="mt-2 text-gray-500">
                {recipe.ingredients.join(', ')}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeList;