const HttpError = require("../helpers/HttpError");

const Contact = require("../models/contactsModels");

const controllersWrapper = require("../helpers/controllersWrapper");

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  console.log(result);
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
  updateStatusContact: controllersWrapper(updateStatusContact),
};
