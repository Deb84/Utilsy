import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url) // get the file path in url and convert it in path
const __dirname = path.dirname(__filename) // get the parent dir path of this file

const projectRoot = path.resolve(__dirname, '../../') // get the path of this project

export default (actualPath: string) => {
    return path.resolve(projectRoot, actualPath)
}