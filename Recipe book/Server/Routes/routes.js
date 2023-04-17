const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single recipe by id
router.get('/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});


// Create a recipe
router.post('/', async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients.split(',').map(i => i.trim()),
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a recipe
router.put('/:id', getRecipe, async (req, res) => {
  if (req.body.title != null) {
    res.recipe.title = req.body.title;
  }

  if (req.body.ingredients != null) {
    res.recipe.ingredients = req.body.ingredients.split(',').map(i => i.trim());
  }

  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a recipe
router.delete('/:id', getRecipe, async (req, res) => {
  try {
    await res.recipe.remove();
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get recipes by keyword (title or ingredient)
router.get('/search/:keyword', async (req, res) => {
  const keyword = req.params.keyword;
  const regex = new RegExp(keyword, 'i');

  try {
    const recipes = await Recipe.find({ $or: [{ title: regex }, { ingredients: regex }] });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get recipes sorted by number of ingredients (ascending or descending)
router.get('/sort/:order', async (req, res) => {
  const order = req.params.order === 'asc' ? 1 : -1;

  try {
    const recipes = await Recipe.find().sort({ 'ingredients.length': order });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a recipe by id
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.recipe = recipe;
  next();
}

module.exports = router;