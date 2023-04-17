import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <ul>
      {results.map((recipe) => (
        <li key={recipe.id}>
          <a href={`/recipes/${recipe.id}`}>{recipe.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;