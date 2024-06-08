const router = require(`express`).Router();
const {User} = require(`../models`);
const {Post} = require(`../models`);
const withAuth = require(`../utils/auth`);

router.get(`/`, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{model: User}],
      order: [['date_created', 'ASC']],
      limit: 5
    }); 
    
    const posts = postData.map((data) => data.get({plain: true}));

    res.render(`homepage`, {posts, logged_in: req.session.logged_in, logged_in_username: req.session.username});

  } catch (error) {
    res.status(500).json(error);
  }
});

router.get(`/dashboard`, withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {user_id: req.session.user_id,},
      include: [{model: User}],
      limit: 5
    }); 
    
    const posts = postData.map((data) => data.get({plain: true}));

    res.render(`dashboard`, {posts, logged_in: req.session.logged_in, logged_in_username: req.session.username});

  } catch (error) {
    res.status(500).json(error);
  }
});

router.get(`/addpost`, withAuth, async (req, res) => {
  try {
    res.render(`addpost`, {logged_in: req.session.logged_in, logged_in_username: req.session.username});

  } catch (error) {
    res.status(500).json(error)
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