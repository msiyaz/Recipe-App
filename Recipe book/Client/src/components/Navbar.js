import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onSearch, onSort, onRandom }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    navigate('/search');
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-indigo-600">Recipes</Link>
            </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline">
                        <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700">All Recipes</Link>
                        <Link to="/recipes/new" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700">Create Recipe</Link>
                        <form onSubmit={handleSearch} className="ml-4 flex-shrink-0 flex">
                            <input type="text" placeholder="Search by title or ingredient" className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={(e) => setQuery(e.target.value)} />
                            <button type="submit" className="inline-flex items-center px-4 py-2 ml-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
                <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                        <button onClick={onSort} className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700">Sort by Number of Ingredients</button>
                        <button onClick={onRandom} className="ml-4 px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Random Recipe</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
);
}

export default Navbar;