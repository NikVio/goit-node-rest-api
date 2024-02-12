const HttpError = require("../../helpers/HttpError");
const Contact = require("../../models/contactsModel");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateStatusContact;
