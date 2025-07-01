import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';

async function findFilesWithExportConst(dir, maxResults = 10) {
  const results = [];
  
  async function searchDirectory(currentDir) {
    if (results.length >= maxResults) return;
    
    try {
      const entries = await readdir(currentDir);
      
      for (const entry of entries) {
        if (results.length >= maxResults) break;
        
        const fullPath = join(currentDir, entry);
        const stats = await stat(fullPath);
        
        if (stats.isDirectory()) {
          await searchDirectory(fullPath);
        } else if (entry.endsWith('.tsx')) {
          try {
            const content = await readFile(fullPath, 'utf-8');
            if (content.includes('export const')) {
              results.push(fullPath);
            }
          } catch (error) {
            console.error(`Error reading file ${fullPath}:`, error.message);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${currentDir}:`, error.message);
    }
  }
  
  await searchDirectory(dir);
  return results;
}

// Run the search
findFilesWithExportConst('src/components/apps', 10)
  .then(files => {
    files.forEach(file => console.log(file));
  })
  .catch(error => {
    console.error('Search failed:', error.message);
    process.exit(1);
  });