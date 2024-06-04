const router = require(`express`).Router();
const {User} = require(`../models`);

router.get(`/`, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    // const users = userData.map((data) => {
    //   data.get({plain: true});
    // });

    const users = userData.map((data) => data.get({ plain: true }));

    res.render('homepage', {users});

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;