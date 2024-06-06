const router = require(`express`).Router();
const {User} = require(`../models`);
const withAuth = require(`../utils/auth`);

router.get(`/`, withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((data) => data.get({ plain: true }));

    res.render('homepage', {users , logged_in: req.session.logged_in, logged_in_username: req.session.username});

  } catch (error) {
    res.status(500).json(error);
  }
});

router.get(`/login`, (req, res) => {
  if(req.session.logged_in) {
    res.redirect(`/`);
    return;
  }

  res.render(`login`);
});

router.get(`/signup`, (req, res) => {
  if(req.session.logged_in) {
    res.redirect(`/`);
    return;
  }

  res.render(`signup`);
});

module.exports = router;