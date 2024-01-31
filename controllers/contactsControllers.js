const contactsService = require("../services/contactsServices");
const HttpError = require("../helpers/HttpError");

const controllersWrapper = require("../helpers/controllersWrapper");

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const result = await contactsService.updateById({ id, name, email, phone });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: controllersWrapper(getAllContacts),
  getOneContact: controllersWrapper(getOneContact),
  deleteContact: controllersWrapper(deleteContact),
  createContact: controllersWrapper(createContact),
  updateContact: controllersWrapper(updateContact),
};
