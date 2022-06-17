import { useState } from "react";
import { Form, Input, Message } from "semantic-ui-react";
import provider from "../provider";
import Contact from "../Contact.js";
import contactFactory from "../contactFactory";
import getContactByAddress from "../utils/getContactByAddress";

const UserPage = () => {
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [desc, setDesc] = useState("");
  const [showTelegram, setShowTelegram] = useState("");
  const [showDiscord, setShowDiscord] = useState("");
  const [showDesc, setShowDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSeccessMessage] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setLoading] = useState(false);

  // const signer = provider.getSigner();
  // address = await signer.getAddress();
  // setShowTelegram("");
  // setShowDiscord("");
  // setDiscord("");
  // setShowDesc("");
  // setLoading(true);
  // try {
  //   const contact = await getContactByAddress(address);
  //   setShowTelegram(contact.telegram);
  //   setShowDiscord(contact.discord);
  //   setShowDesc(contact.desc);
  // } catch (error) {
  //   console.error(error);
  //   setErrorMessage(error.message);
  // } finally {
  //   setLoading(false);
  // }

  const handleShow = async (event) => {
    event.preventDefault();
    const signer = provider.getSigner();
    address = await signer.getAddress();
    setErrorMessage("");
    setTelegram("");
    setDiscord("");
    setDesc("");
    if (!address) {
      setErrorMessage("We need the ethereum address...");
      return;
    }
    setLoading(true);
    try {
      const contact = await getContactByAddress(address);
      setShowTelegram(contact.telegram);
      setShowDiscord(contact.discord);
      setShowDesc(contact.desc);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTelegramSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSeccessMessage("");
    if (!telegram) {
      setErrorMessage("Write down the telegram...");
    }
    const signer = provider.getSigner();
    setAddress = await signer.getAddress();
    console.log("signer: ", signer);
    console.log("signer address: ", address);
    const contactContractAddress = await contactFactory.ownerToContact(address);
    const contactContract = Contact(contactContractAddress);
    const contactWithSigner = contactContract.connect(signer);
    console.log("func: ", contactWithSigner.functions);
    try {
      const response = await contactWithSigner["setTelegram(string)"](telegram);
      console.log("respose: ", response);
      setSeccessMessage("The Transaction hash is " + response.hash);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleDiscordSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSeccessMessage("");
    if (!discord) {
      setErrorMessage("Write down the discord...");
    }
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log("signer: ", signer);
    console.log("signer address: ", address);
    const contactContractAddress = await contactFactory.ownerToContact(address);
    const contactContract = Contact(contactContractAddress);
    const contactWithSigner = contactContract.connect(signer);
    console.log("func: ", contactWithSigner.functions);
    try {
      const response = await contactWithSigner["setDiscord(string)"](discord);
      console.log("respose: ", response);
      setSeccessMessage("The Transaction hash is " + response.hash);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleDescriptionSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSeccessMessage("");
    if (!desc) {
      setErrorMessage("Write down the description...");
    }
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log("signer: ", signer);
    console.log("signer address: ", address);
    const contactContractAddress = await contactFactory.ownerToContact(address);
    const contactContract = Contact(contactContractAddress);
    const contactWithSigner = contactContract.connect(signer);
    console.log("func: ", contactWithSigner.functions);
    try {
      const response = await contactWithSigner["setDescription(string)"](desc);
      console.log("respose: ", response);
      setSeccessMessage("The Transaction hash is " + response.hash);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div class="user">
      <div class="show-user">
        <h2 class="change"> These are your contacts:</h2>
        <label class="label">Telegram </label>
        <h2 class="show-row">{showTelegram}</h2>
        <label class="label">Discord</label>

        <h2 class="show-row">{showDiscord}</h2>
        <label class="label">Description </label>

        <h2 class="show-row">{showDesc}</h2>
        <button class="form-button-show " onClick={handleShow}>
          Show my contacts
        </button>
      </div>
      <div class="change-user">
        <h2 class="change"> Change your contacts here!</h2>
        <Form error={!!errorMessage} success={!!successMessage}>
          <div class="row">
            <Form.Field
              class="wide-row"
              control={Input}
              label="Telegram"
              value={telegram}
              onChange={(event) => setTelegram(event.target.value)}
              placeholder="my_telegram"
            />{" "}
            <button
              class="form-button button-change"
              onClick={handleTelegramSubmit}
            >
              Change
            </button>
          </div>
          <div class="row">
            <Form.Field
              class="wide-row"
              control={Input}
              label="Discord"
              value={discord}
              onChange={(event) => setDiscord(event.target.value)}
              placeholder="discord#666"
            />{" "}
            <button
              class="form-button button-change"
              onClick={handleDiscordSubmit}
            >
              Change
            </button>
          </div>
          <div class="row">
            <Form.Field
              class="wide-row"
              control={Input}
              label="Description"
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
              placeholder="Tell about yourself..."
            />{" "}
            <button
              class="form-button button-change"
              onClick={handleDescriptionSubmit}
            >
              Change
            </button>
          </div>
          <Message
            style={{ wordBreak: "break-word" }}
            error
            header="Try again!"
            content={errorMessage}
          />
          <Message success header="Success!" content={successMessage} />
        </Form>
      </div>
    </div>
  );
};
export default UserPage;
