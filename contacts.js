const fs = require('fs').promises
const path = require('path')
const crypto = require('crypto')
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

async function writeFile(data) {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
        console.log("List has been updated".green)
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
}

async function getContactById(contactId) {
    try {
    const contacts = await readFile()
    searchedContact = contacts.find(contact => contact.id === contactId)
    return searchedContact
        ? console.table(searchedContact)
        : console.log('No such contact!'.red)
    }
    catch(error) {
        console.log("Error while trying to get the contact by ID!".red, error)
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await readFile()
        const filteredContacts = contacts.filter(contact => contact.id !== contactId)
        if (filteredContacts.length < contacts.length) {
            await console.log(`Contact with ID:`.green, `${contactId}`,'removed.'.green)
            await writeFile(filteredContacts)
        } else {
            console.log(`Contact with ID:${contactId} not found!`.red)
        }
    }
    catch(error) {
        console.log("Error while trying to remove the contact!".red, error)
    }

}

async function addContact(name, email, phone) {
    try {
        const contacts = await readFile()
        const newContact = {
        id: crypto.randomUUID(),
        name,
        email,
        phone
        };
        const filteredContact = contacts.filter(contact => contact.name === name) 
        if (!filteredContact[0]) {
            contacts.push(newContact)
            await writeFile(contacts)
            console.log(`${name} has been added to your contact list.`)
        } else {
            console.log(`The name:${name} is already used in database.`.yellow)
        }
        //why oh why spread operator leaves only first array index??
    }
    catch(error) {
        console.log('Error while trying to add a contact'.red, error)
    }
} 

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}