// 代码生成时间: 2025-09-11 08:09:56
const fs = require('fs');
const path = require('path');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

// NotificationService class to handle message notifications
class NotificationService {
  constructor() {
    this.fileName = 'notifications.json';
    this.filePath = path.join(process.cwd(), this.fileName);
  }

  // Save notification messages to a file
  async saveNotification(message) {
    try {
      const data = await this.readNotifications();
      data.push(message);
      await writeFileAsync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving notification:', error);
      throw error;
    }
  }

  // Read notification messages from a file
  async readNotifications() {
    try {
      await this.ensureFileExists();
      const data = await util.promisify(fs.readFile)(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading notifications:', error);
      throw error;
    }
  }

  // Ensure the notification file exists, create if it doesn't
  async ensureFileExists() {
    try {
      if (!fs.existsSync(this.filePath)) {
        await writeFileAsync(this.filePath, JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error ensuring file exists:', error);
      throw error;
    }
  }
}

// Example usage
(async () => {
  const notificationService = new NotificationService();
  try {
    // Save a new notification
    await notificationService.saveNotification({
      id: 1,
      message: 'Hello, this is a test notification!',
      timestamp: new Date().toISOString(),
    });

    // Read and display all notifications
    const notifications = await notificationService.readNotifications();
    console.log('Notifications:', notifications);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();