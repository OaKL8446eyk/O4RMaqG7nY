// 代码生成时间: 2025-09-24 05:01:07
// dataModel.js
// This file defines the data models for a Gatsby application.

// Define a User model
class UserModel {
  // Constructor for User
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // Method to display user details
  displayDetails() {
    console.log(`User ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`);
  }
}

// Define a Post model
class PostModel {
  // Constructor for Post
  constructor(id, title, content, authorId) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }

  // Method to display post details
  displayDetails() {
    console.log(`Post ID: ${this.id}, Title: ${this.title}, Author ID: ${this.authorId}`);
  }
}

// Export the models for use in other parts of the application
module.exports = { UserModel, PostModel };
