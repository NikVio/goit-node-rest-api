const HttpError = require("../../helpers/HttpError");
const Contact = require("../../models/contactsModel");

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = deleteContact;
