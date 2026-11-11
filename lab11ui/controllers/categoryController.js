const Category = require('../models/Category');

module.exports = {
  showCreateForm: (req, res) => {
    res.render('categories/create', {
      status: req.query.status || null,
      message: req.query.message || null
    });
  },

  createCategory: (req, res) => {
    const { name } = req.body;
    const { status, message } = Category.create(name);

    console.log('is_created:', status);
    console.log('Creating Category:', name);

    const statusParam = status ? 'success' : 'error';
    res.redirect(
      `/categories/new?status=${statusParam}&message=${encodeURIComponent(message)}`
    );
  }
};
