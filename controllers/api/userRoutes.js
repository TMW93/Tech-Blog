const router = require(`express`).Router();
const {User} = require(`../../models`);

router.post(`/`, async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.name;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

  } catch (error) {
    res.status(400).json(error);
  }
});

router.post(`/login`, async (req, res) => {
  try {
    const userData = await User.findOne({where: {id: req.body.username}});

    if(!userData) {
      res.status(400).json({message: `Incorrect Username and/or Password, Please try again.`});
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if(!validPassword) {
      res.status(400).json({message: `Incorrect Username and/or Password, Please try again.`});
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.name;
      req.session.logged_in = true;

      res.json({user: userData, message: `You are now logged in!`});
    });


  } catch (error) {
    res.status(400).json(error);
  }

});

router.post(`/logout`, (req, res) => {
  if(req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(400).end();
  }
});

module.exports = router;