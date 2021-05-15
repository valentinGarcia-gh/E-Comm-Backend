const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
Category.findAll({
  include: {
    model: Product,
    attributes: [
      'id', 
      'product_name', 
      'price', 
      'stock', 
      'category_id'
    ]
  }
})
  .then(modelDbData => {
    if (!modelDbData) {
      res.status(404).json({ message: 'Cannot find Categories!!' });
      return;
    }
    res.json(modelDbData);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err)
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: [
        'id', 
        'product_name', 
        'price', 
        'stock', 
        'category_id'
      ]
    }
  })
    .then(modelDbData => {
      if (!modelDbData) {
        res.status(404).json({ message: 'Cannot find Categories!!' });
        return;
      }
      res.json(modelDbData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(modelDbData => res.json(modelDbData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(modelDbData => {
      if (!modelDbData) {
        res.status(404).json({ message: 'Cannot find category with this ID!!!' });
        return;
      }
      res.json(modelDbData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(modelDbData => {
      if (!modelDbData) {
        res.status(404).json({ message: 'Cannot find category with this ID!!!' });
        return;
      }
      res.json(modelDbData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });

});

module.exports = router;
