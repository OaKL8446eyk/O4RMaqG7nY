// 代码生成时间: 2025-10-09 01:39:20
const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');

// 定义软件包管理器类
class PackageManager {
  // 构造函数，接收项目根目录
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  // 安装依赖
  async installDependencies() {
    try {
      const packageJsonPath = path.join(this.rootDir, 'package.json');
      if (!await fs.pathExists(packageJsonPath)) {
        throw new Error('package.json not found');
      }

      await execa('npm', ['install'], { cwd: this.rootDir });
      console.log('Dependencies installed successfully');
    } catch (error) {
      console.error('Failed to install dependencies:', error.message);
    }
  }

  // 添加依赖
  async addDependency(dependency, version) {
    try {
      const packageJsonPath = path.join(this.rootDir, 'package.json');
      if (!await fs.pathExists(packageJsonPath)) {
        throw new Error('package.json not found');
      }

      const packageJson = await fs.readJson(packageJsonPath);
      if (!packageJson.dependencies) {
        packageJson.dependencies = {};
      }
      packageJson.dependencies[dependency] = version;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      console.log(`Dependency ${dependency} added successfully`);
    } catch (error) {
      console.error('Failed to add dependency:', error.message);
    }
  }
}

// 导出软件包管理器类
module.exports = PackageManager;