const fs = require('fs').promises // importing FileSystem module, "promise" version
const path = require('path')
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
const contacts = require('./db/contacts.json')

// fs.readFile(filename, [options]) // reading file
// fs.writeFile(filename, data, [options]) // writing file 
// fs.appendFile(filename, data, [options]) // adding to file
// fs.rename(oldpath, newpath) // changing file name
// fs.unlink(path, callback) // deleting file

//error handling - then, catch 

// fs.readFile('readme.txt')
//     .then(data => console.log(data.toString()))
//     .catch(error => console.log(error.message))

// __dirname reads all the files in current directory 

fs.readFile(contacts)
    .then(data => {
        return Promise.all(
            data.map(async contact => {
                const stats = await fs.stat(contact);
                return {
                    id: stats.id,
                    Name: stats.name,
                    Email: stats.email,
                    Phone: stats.phone
                }
            })
        )
    })
    .then(result => console.table(result))

// const fs = require('fs').promises;

// fs.readdir(__dirname)
//   .then(files => {
//     return Promise.all(
//       files.map(async filename => {
//         const stats = await fs.stat(filename);
//         return {
//           Name: filename,
//           Size: stats.size,
//           Date: stats.mtime,
//         };
//       }),
//     );
//   })
//   .then(result => console.table(result));