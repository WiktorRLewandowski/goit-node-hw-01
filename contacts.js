const fs = require('fs').promises
const path = require('path')
require('colors')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')


async function readFile() {   
    try {
        const data = await fs.readFile(contactsPath)
        return JSON.parse(data)
    }
    catch(error) {
        console.log('Error while reading the contacts'.red, error) 
    }
}

async function writeFile() {
    try {
        const data = await fs.writeFile(contactsPath)
        return JSON.stringify(data)
    }
    catch(error) {
        console.log("Error while trying to overwrite the file".red, error)
    }
}

async function listContacts() {
    try {
    const contacts = await readFile()
    console.log("Contacts list:".cyan)
    console.table(contacts)
    }
    catch(error) {
        console.log("Error while listing the contacts:".red, error)
    }
    // fs.readFile(contactsPath)
    // .then(data => (
    //     console.log('Contacts list'.cyan),
    //     console.table(JSON.parse(data))))
    // .catch(error => console.error('Error while listing contacts:', error.red))
}

async function getContactById(contactId) {
    try {
    const contacts = await readFile()
    contacts.find(contact => contact.id === contactId)
    }
    catch(error) {
        console.log("Error while trying to get the contact by ID".red, error)
    }
    // fs.readFile(contactsPath)
    // .then(data => JSON.parse(data).find(contact = contact.id === contactId))
    // .catch(error => console.log("Couldn't find contact with such ID".red, error))
}

// getContactById('AeHIrLTr6JkxGE6SN-0Rw')

async function removeContact(contactId) {
    try {
        const contacts = await readFile()
        const filteredContacts = contacts.filter(contact => contact.id !== contactId)
        if (filteredContacts.length < contacts) {
            await writeFile(filteredContacts)
            console.log(`Contact with ID:${contactID} removed`.green)
        } else {
            console.log(`Contact with ID:${contactId} not found!`.red)
        }
    }
    catch(error) {
        console.log("Error while trying to remove the contact".red, error)
    }

}

function addContact(name, email, phone) {

}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}