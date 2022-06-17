import { useState } from "react";
import { Form, Input, Message } from "semantic-ui-react";
import provider from "../provider";
import contactFactory from "../contactFactory";

const AddContact = () => {
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSeccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSeccessMessage("");
    if (!telegram) {
      setErrorMessage("Write down at least the telegram...");
    }
    const signer = provider.getSigner();
    const contactFactoryWithSigner = contactFactory.connect(signer);
    console.log("func: ", contactFactoryWithSigner.functions);
    try {
      let response;
      if (discord) {
        response = await contactFactoryWithSigner[
          "createContact(string,string)"
        ](telegram, discord);
      } else {
        response = await contactFactoryWithSigner["createContact(string)"](
          telegram
        );
      }
      console.log("respose: ", response);
      setSeccessMessage("The Transaction hash is " + response.hash);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Form
      error={!!errorMessage}
      success={!!successMessage}
      onSubmit={handleSubmit}
    >
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Telegram"
          value={telegram}
          onChange={(event) => setTelegram(event.target.value)}
          placeholder="@telegram"
        />
        <Form.Field
          control={Input}
          label="Discord"
          value={discord}
          onChange={(event) => setDiscord(event.target.value)}
          placeholder="discord#666"
        />
      </Form.Group>
      <Form.TextArea label="About" placeholder="Tell us more about you..." />
      <button class="form-button">Save</button>
      <Message
        style={{ wordBreak: "break-word" }}
        error
        header="Try again!"
        content={errorMessage}
      />
      <Message success header="Success!" content={successMessage} />
    </Form>
  );
};

export default AddContact;
