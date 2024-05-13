

const router = require('express').Router();
const Fruit = require('../models/Fruit');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const fruits = await Fruit.findAll();

    if (!fruits) res.status(404).send('Fruits not found');

    res.status(200).json(fruits);
  } catch (e) {
    console.error(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const fruit = await Fruit.findByPk(id);
    if (!id || !fruit === null)
      res.status(404).send(`Fruit with ID ${id} not found`);

    res.status(200).json(fruit);
  } catch (e) {
    console.error(e);
  }
});

router.post(
  '/',
  [
    check('color').trim().notEmpty().withMessage('Color must not be empty'),
    check('name')
      .trim()
      .notEmpty()
      .withMessage('Name must not be empty')
      .isLength({ min: 5, max: 20 })
      .withMessage('Name must be between 5 and 20 characters'),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(400).json({ error: error.array() });

      const newFruit = await Fruit.create(req.body);
      if (newFruit === null) res.status(400).send('Cannot create fruit');

      res.status(201).json(newFruit);
    } catch (e) {
      console.error(e);
    }
  }
);

router.put(
  '/:id',
  [check('color').trim().notEmpty().withMessage('Color must not be empty')],
  [check('name').trim().notEmpty().withMessage('Name must not be empty')],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(400).json({ error: error.array() });
      const { id } = req.params;

      const fruit = await Fruit.findByPk(id);
      if (fruit) {
        await fruit.update(req.body);
        res.status(200).json(fruit);
      } else {
        res.status(404).json({ error: 'Fruit not found' });
      }
    } catch (e) {
      console.error(e);
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const fruit = await Fruit.findByPk(id);
    if (fruit) {
      await fruit.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Fruit not found' });
    }
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
