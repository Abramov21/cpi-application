const { Command } = require("commander");
const method = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await method.listContacts();
      console.table(list);
      break;

    case "get":
      console.log(await method.getContactById(id));
      break;

    case "add":
      const newContact = await method.addContact(name, email, phone);
      console.log("The contact added");
      console.log(newContact);
      break;

    case "remove":
      await method.removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
