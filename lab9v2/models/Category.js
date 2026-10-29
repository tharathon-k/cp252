class CategoryManager {
  constructor() {
    this.categories = ['Electronics', 'Clothing', 'Books'];
  }

  getAll() {
    return this.categories;
  }

  create(name) {
    console.time("createCategory");
    let is_success = false;
    if (!this.categories.includes(name)) {
      this.categories.push(name);
      is_success = true;
    }
    console.timeEnd("createCategory");
    return is_success; // 0.009ms
  }
}

// Export a single instance of the manager
module.exports = new CategoryManager();