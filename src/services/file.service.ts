// import fs from 'fs/promises';

// export const readJsonFile = async <T>(filePath: string): Promise<T | null> => {
//     try {
//         const fileData = await fs.readFile(filePath, 'utf8');
//         return JSON.parse(fileData) as T;
//     } catch (err) {
//         console.error(`Error reading ${filePath}:`, err);
//         return null;
//     }
// };

// export const writeJsonFile = async <T>(filePath: string, data: T): Promise<void> => {
//     try {
//         await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
//     } catch (err) {
//         console.error(`Error writing to ${filePath}:`, err);
//     }
// };
