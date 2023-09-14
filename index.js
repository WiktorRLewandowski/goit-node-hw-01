const { Command } = require('commander')
const program = new Command();
const { listContacts,
    getContactById,
    removeContact,
    addContact 
} = require('./contacts')

program 
    .option('-a, --action <type>', "choose action")
    .option('-i, --id <type>', "user id")
    .option('-n, --name <type>', "user name")
    .option('-e, --email <type>', "email address")
    .option('-p, --phone <type>', "phone number")

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone}) {
    switch(action) {
        case "list":
            listContacts()
            break;
        case "get":
            getContactById(id)
            break;
        case "add":
            addContact(name, email, phone)
            break;
        case "remove":
            removeContact(id);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!")
    }
}

invokeAction(argv)