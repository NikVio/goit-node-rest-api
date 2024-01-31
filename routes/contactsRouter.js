const express = require("express");

const contacts = require("../services/contactsServices");

// const {
//   getAllContacts,
//   getOneContact,
//   deleteContact,
//   createContact,
//   updateContact,
// } = require("../controllers/contactsControllers.js");

const contactsRouter = express.Router();

contactsRouter.get("", async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
});

// contactsRouter.get("/", getAllContacts);

// contactsRouter.get("/:id", getOneContact);

// contactsRouter.delete("/:id", deleteContact);

// contactsRouter.post("/", createContact);

// contactsRouter.put("/:id", updateContact);

module.exports = contactsRouter;
