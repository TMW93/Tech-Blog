const router = require(`express`).Router();
const {Comment} = require(`../../models`);

router.post(`/`, async (req, res) => {
  try {

    const parsedId = parseInt(req.body.postId);

    const commentData = await Comment.create({
      content: req.body.commentContent,
      user_id: req.session.user_id,
      post_id: parsedId,
    });

    res.status(200).json(commentData);

  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;