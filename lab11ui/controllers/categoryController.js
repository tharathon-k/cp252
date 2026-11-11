const Category = require('../models/Category');

module.exports = {
  showCreateForm: (req, res) => {
    res.render('categories/create', {
      status: req.query.status || null
    });
  },

  createCategory: (req, res) => {
    const { name } = req.body;
    const create_status = Category.create(name);
    console.log("is_created", create_status)
    console.log("Creating Category: "+ name);
    // Redirect to the GET route instead of using res.render()
    const statusParam = create_status ? 'success' : 'error';
    res.redirect(`/categories/new?status=${statusParam}`);
  }
};
