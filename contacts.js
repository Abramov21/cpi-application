const fs = require("fs").promises;
const { readFile, writeFile } = fs;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const listContacts = await readFile(contactsPath, "utf8");
    return JSON.parse(listContacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(id) {
  try {
    const list = await listContacts();
    const contactId = list.find((item) => item.id === id);
    if (!contactId) {
      console.log("No such contact exists");
    }
    return contactId;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const list = await listContacts();
    const newContact = {
      name,
      email,
      phone,
      id: uuidv4(),
    };

    list.push(newContact);
    const newList = JSON.stringify(list, null, "\t");

    await writeFile(contactsPath, newList, "utf8");
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(id) {
  try {
    const list = await listContacts();
    const contactId = list.find((item) => item.id === id);
    if (!contactId) {
      console.log("No such contact exists");
    } else {
      const newList = list.filter((item) => item.id !== id);

      await writeFile(
        contactsPath,
        JSON.stringify(newList, null, "\t"),
        "utf8"
      );

      console.log("Contact removed");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
