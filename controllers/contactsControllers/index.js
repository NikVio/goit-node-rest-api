const controllersWrapper = require("../../helpers/controllersWrapper");
const getAll = require("./getAll");
const Delete = require("./delete");
const create = require("./create");
const getOne = require("./getOne");
const update = require("./update");
const updateStatus = require("./updateStatus");

module.exports = {
  getAllContacts: controllersWrapper(getAll),
  getOneContact: controllersWrapper(getOne),
  deleteContact: controllersWrapper(Delete),
  createContact: controllersWrapper(create),
  updateContact: controllersWrapper(update),
  updateStatusContact: controllersWrapper(updateStatus),
};
