const router = require(`express`).Router();
const {Post} = require(`../../models`);

// creating a new post
router.post(`/`, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.postTitle,
      content: req.body.postContent,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);

  } catch (error) {
    res.status(400).json(error);
  }
});

// updating a post based on its id
router.put(`/:id`, async (req, res) => {
  try {
    const postData = await Post.update(
    {content: req.body.updateContent},  
    {where: {id: req.params.id}},
    );

    res.status(200).json(postData);
    
  } catch (error) {
    res.status(500).json(error);
  }
});

// deleting a post based on its id
router.delete(`/:id`, async (req, res) => {
  try {
    await Post.destroy({
      where: {id: req.params.id},
    });

    res.status(200);
    
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
