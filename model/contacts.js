const Contact = require("./schemas/contact");

const listContacts = async (userId) => {
  const results = await Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "name email phone -_id",
  });

  return results;
};

const getContactById = async (id, userId) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: "owner",
    select: "name email phone -_id",
  });

  return result;
};

const removeContact = async (id, userId) => {
  const result = await Contact.findByIdAndRemove({ id, owner: userId });

  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);

  return result;
};

const updateContact = async (id, body, userId) => {
  const result = await Contact.findByIdAndUpdate(
    { id, owner: userId },
    { ...body },
    { new: true }
  );

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
