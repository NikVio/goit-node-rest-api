const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "../db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const items = await listContacts();
  const result = items.find((item) => contactId === item.id);
  return result || null;
};

async function removeContact(contactId) {
  const items = await listContacts();
  const index = items.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [result] = items.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(items, null, 2));
  return result;
}

const addContact = async ({ name, email, phone }) => {
  const items = await listContacts();
  const newItem = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  items.push(newItem);
  await fs.writeFile(contactsPath, JSON.stringify(items, null, 2));
  return newItem;
};

const updateById = async ({ id, name, email, phone }) => {
  const items = await listContacts();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(items, null, 2));
  return items[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
