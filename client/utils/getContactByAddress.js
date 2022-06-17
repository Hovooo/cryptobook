import Contact from "../Contact";
import contactFactory from "../contactFactory";

const getContactByAddress = async (address) => {
  console.log("address: ", address);
  const contactAddress = await contactFactory.ownerToContact(address);
  if (contactAddress === "0x0000000000000000000000000000000000000000") {
    throw new Error("There is no contact related to this address yet ...");
  }
  console.log("contactAddress: ", contactAddress);
  const contact = Contact(contactAddress);
  const telegram = await contact.telegram();
  console.log("telegram: ", telegram);
  const discord = await contact.discord();
  console.log("discord: ", discord);
  const desc = await contact.description();
  console.log("desc: ", desc);
  return { telegram, discord, desc };
};

export default getContactByAddress;
