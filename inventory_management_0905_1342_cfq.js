// 代码生成时间: 2025-09-05 13:42:30
const fs = require('fs');
const path = require('path');

// Define the InventoryItem class
class InventoryItem {
  constructor(id, name, quantity, price) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  // Update the quantity of an item
  updateQuantity(newQuantity) {
    if (newQuantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
    this.quantity = newQuantity;
  }
}

// Define the Inventory class
class Inventory {
  constructor() {
    this.items = [];
  }

  // Add an item to the inventory
  addItem(item) {
    if (!(item instanceof InventoryItem)) {
      throw new Error('Invalid item');
    }
    this.items.push(item);
  }

  // Remove an item from the inventory
  removeItem(itemId) {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index === -1) {
      throw new Error('Item not found');
    }
    this.items.splice(index, 1);
  }

  // Update the quantity of an item in the inventory
  updateItemQuantity(itemId, newQuantity) {
    const item = this.items.find(item => item.id === itemId);
    if (!item) {
      throw new Error('Item not found');
    }
    item.updateQuantity(newQuantity);
  }
}

// Helper function to save the inventory to a file
function saveInventoryToFile(inventory, filePath) {
  fs.writeFileSync(filePath, JSON.stringify(inventory.items, null, 2));
}

// Helper function to load the inventory from a file
function loadInventoryFromFile(inventory, filePath) {
  try {
    const fileContent = fs.readFileSync(filePath);
    inventory.items = JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading inventory from file:', error.message);
  }
}

// Example usage
const inventoryFilePath = path.join(__dirname, 'inventory.json');

const inventory = new Inventory();

// Load existing inventory from file
loadInventoryFromFile(inventory, inventoryFilePath);

// Add new items
inventory.addItem(new InventoryItem(1, 'Apple', 100, 0.50));
inventory.addItem(new InventoryItem(2, 'Banana', 150, 0.20));

// Update quantity of an item
inventory.updateItemQuantity(1, 120);

// Remove an item
inventory.removeItem(2);

// Save inventory to file
saveInventoryToFile(inventory, inventoryFilePath);

// Error handling example
try {
  inventory.updateItemQuantity(3, 10); // Item with ID 3 does not exist
} catch (error) {
  console.error(error.message);
}
