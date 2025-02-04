import fs from 'fs/promises';
import path from 'path';
import packageJson from './package.json' assert { type: 'json' };

// Dynamically resolve the file paths
const versionFilePath = path.resolve('./version.js');

// Function to write the version file
async function generateVersionFile() {
  try {
    const versionContent = `export const SDK_VERSION = '${packageJson.version}';\n`;

    // Write to the version.js file
    await fs.writeFile(versionFilePath, versionContent, { encoding: 'utf8' });

    console.log(`SDK Version: ${packageJson.version}`);
  } catch (error) {
    console.error('Error generating version file:', error);
  }
}

// Run the function
generateVersionFile();
