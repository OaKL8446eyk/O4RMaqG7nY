// 代码生成时间: 2025-08-14 11:51:49
const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');

// Configuration for the audit log
const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = 'audit.log';

// Ensure the log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// Function to log an audit entry
function logAuditEntry(userId, action, description) {
  try {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      userId,
      action,
      description
    };
    const logData = JSON.stringify(logEntry, null, 2);
    const logFilePath = path.join(LOG_DIR, LOG_FILE);

    // Append the log entry to the log file
    fs.appendFileSync(logFilePath, logData + '
', 'utf8');
  } catch (error) {
    console.error('Failed to log audit entry:', error);
  }
}

// Function to generate a hash for sensitive data
function hashSensitiveData(data) {
  return createHash('sha256').update(data).digest('hex');
}

// Example usage of logging an audit entry
function logUserAction(userId, action, description) {
  logAuditEntry(
    userId,
    action,
    // Sensitive data should be hashed before logging
    hashSensitiveData(description)
  );
}

// Export the functions for use in other parts of the Gatsby project
module.exports = {
  logAuditEntry,
  logUserAction
};