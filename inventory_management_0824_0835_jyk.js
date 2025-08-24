// 代码生成时间: 2025-08-24 08:35:20
const fs = require('fs');
const path = require('path');

// 定义库存管理类
class InventoryManager {
  // 构造函数，初始化库存文件
  constructor(filePath) {
    this.filePath = filePath;
    this.inventory = this.loadInventory();
  }

  // 加载库存数据
  loadInventory() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to load inventory:', error);
      return {};
    }
  }

  // 保存库存数据
  saveInventory() {    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.inventory, null, 2), 'utf8');
    } catch (error) {
      console.error('Failed to save inventory:', error);
    }
  }

  // 添加商品
  addItem(sku, quantity) {
    if (!sku || typeof quantity !== 'number') {
      throw new Error('Invalid item or quantity');
    }
    this.inventory[sku] = (this.inventory[sku] || 0) + quantity;
    this.saveInventory();
  }

  // 移除商品
  removeItem(sku, quantity) {
    if (!sku || typeof quantity !== 'number') {
      throw new Error('Invalid item or quantity');
    }
    if (this.inventory[sku] < quantity) {
      throw new Error('Not enough inventory');
    }
    this.inventory[sku] -= quantity;
    this.saveInventory();
  }

  // 获取商品数量
  getItemQuantity(sku) {
    if (!sku) {
      throw new Error('Invalid item');
    }
    return this.inventory[sku] || 0;
  }
}

// 使用示例
const inventoryFilePath = path.join(__dirname, 'inventory.json');
const inventory = new InventoryManager(inventoryFilePath);

// 添加商品
inventory.addItem('A001', 10);

// 移除商品
inventory.removeItem('A001', 5);

// 获取商品数量
const quantity = inventory.getItemQuantity('A001');
console.log(`Quantity of A001: ${quantity}`);
