const Item = require('../../models/item');

async function index(req, res) {
  const items = await Item.find({}).sort('name').populate('category').exec();
  // re-sort based upon the sortOrder of the populated categories
  items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
  res.json(items);
}

async function show(req, res) {
  const item = await Item.findById(req.params.id);
  res.json(item);
}

async function getReviewsForItem(req, res) {
  try {
    const item = await Item.findById(req.params.itemId).populate('reviews');
    res.json(item.reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  index,
  show,
  getReviewsForItem
};