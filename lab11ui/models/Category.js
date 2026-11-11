
class CategoryManager {
  constructor() {
    this.categories = ['Electronics', 'Clothing', 'Books'];
  }

  getAll() {
    return this.categories;
  }

  create(name) {
    // Remove unnecessary whitespace
    name = name.trim();

    // Check for an existing category (case-insensitive)
    const exists = this.categories.some(
      category => category.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      return {
        status: false,
        message: `The category "${name}" already exists.`
      };
    }

    this.categories.push(name);

    return {
      status: true,
      message: `Category "${name}" was created successfully.`
    };
  }
}

// Export a single instance of the manager
module.exports = new CategoryManager();