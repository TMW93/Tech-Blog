const router = require(`express`).Router();
const {Post} = require(`../../models`);

router.post(`/`, async (req, res) => {
  try {
    const postData = Post.create({
      title: req.body.postTitle,
      content: req.body.postContent,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);

  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
