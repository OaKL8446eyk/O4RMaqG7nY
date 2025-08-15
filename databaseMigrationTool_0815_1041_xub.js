// 代码生成时间: 2025-08-15 10:41:00
 * It includes error handling, comments, and follows JS best practices for maintainability and scalability. */

// Import necessary modules and dependencies
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Define the migration directory path
const migrationDir = path.join(__dirname, 'migrations');

// Function to run a single migration file
function runMigration(migrationFile) {
  return new Promise((resolve, reject) => {
    // Construct the full path to the migration file
    const filePath = path.join(migrationDir, migrationFile);

    // Check if the migration file exists
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`Migration file ${migrationFile} does not exist.`));
    }

    // Execute the migration file
    exec(`node ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      console.log(`Migration ${migrationFile} executed successfully:
${stdout}`);
      resolve();
    });
  });
}

// Function to migrate up (apply all pending migrations)
async function migrateUp() {
  try {
    // List all migration files
    const migrations = fs.readdirSync(migrationDir)
      .filter(file => file.endsWith('.js'))
      .sort(); // Ensure migrations are applied in order

    // Apply each migration
    for (const migration of migrations) {
      await runMigration(migration);
    }
    console.log('All migrations have been applied.');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

// Function to migrate down (revert the last migration)
async function migrateDown() {
  try {
    // List all migration files
    const migrations = fs.readdirSync(migrationDir)
      .filter(file => file.endsWith('.js'))
      .sort();

    // Check if there are any migrations to revert
    if (migrations.length === 0) {
      console.log('No migrations to revert.');
      return;
    }

    // Revert the last migration
    const lastMigration = migrations.pop();
    await runMigration(lastMigration);
    console.log(`Migration ${lastMigration} has been reverted.');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

// Export the migration functions
module.exports = {
  migrateUp,
  migrateDown
};