const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) res.status(404).send('No users found');

    res.status(200).json(users);
  } catch (e) {
    // console.error(e);
     res.status(500).send('Internal server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal server error');
  }
});


router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log();

    if (!newUser) res.status(500).send('Unable to create user');

    res.status(201).json(newUser);
  } catch (e) {
    // console.error(e);
     res.status(500).send('Internal server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) res.status(404).send('User not found');

    const updateUser = await user.update(req.body);
    res.status(200).json(updateUser);
  } catch (e) {
    // console.error(e);
     res.status(500).send('Internal server error');
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.destroy();
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
