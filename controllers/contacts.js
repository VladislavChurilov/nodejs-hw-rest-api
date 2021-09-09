const Contacts = require("../model/contacts");
const mongoose = require("mongoose");

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.listContacts(userId);

    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const userId = req.user.id;
      const contact = await Contacts.getContactById(req.params.id, userId);

      if (contact) {
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          message: "Not Found",
        });
      }
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "such id does not exist",
    });
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });

    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (err) {
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const userId = req.user.id;
      const contact = await Contacts.removeContact(req.params.id, userId);

      if (contact) {
        return res.json({
          status: "success",
          code: 200,
          message: "contact deleted",
        });
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
      }
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "such id does not exist",
    });
  }
};

const updateContact = async (req, res, next) => {
  if (req.body && mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const userId = req.user.id;
      const contact = await Contacts.updateContact(
        req.params.id,
        req.body,
        userId
      );

      if (contact) {
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
      }
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "such id does not exist",
    });
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
