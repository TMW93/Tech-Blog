const router = require(`express`).Router();
const {User} = require(`../models`);
const {Post} = require(`../models`);
const {Comment} = require(`../models`);
const withAuth = require(`../utils/auth`);

router.get(`/`, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{model: User}],
      attributes: {exclude: ['user.password']},
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
      include: [{model: User, attributes: {exclude: ['password']}}],
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

router.get(`/post/:id`, withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{model: User, attributes: {exclude: ['password']}}, {model: Comment, include:[{model: User, attributes: {exclude: ['password']}}]}],
      // include: {all: true, nested: true},
    });

    const post = postData.get({plain: true});

    // console.log(post);
    // console.log(post.comments[1].user.name);

    res.render(`blogpost`, {post, logged_in: req.session.logged_in, logged_in_username: req.session.username});

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