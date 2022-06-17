import { useRef, useState } from "react";
import { Form, Message } from "semantic-ui-react";
import getContactByAddress from "../utils/getContactByAddress";

const ShowContact = () => {
  const [telegram, setTelegram] = useState();
  const [discord, setDiscord] = useState();
  const [desc, setDesc] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const addressRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const address = addressRef.current.value;
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
      setTelegram(contact.telegram);
      setDiscord(contact.discord);
      setDesc(contact.desc);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 class="show-address">Write down an address</h2>
      <Form error={!!errorMessage} onSubmit={handleSubmit}>
        <Form.Field class="form">
          <input class="form-input" ref={addressRef} placeholder="Right here" />
        </Form.Field>
        <button class="form-button" loading={isLoading} type="submit">
          Show me contacts
        </button>
        <Message error header="There was an error" content={errorMessage} />
      </Form>
      {telegram && (
        <h2 class="result">
          Telegram:{" "}
          <a target="_blank" href="https://www.t.me/{telegram}">
            {" "}
            {telegram}
          </a>
        </h2>
      )}
      {discord && (
        <h2 class="result">
          Discord:{" "}
          <a target="_blank" href="https://discordapp.com/users/{discord}">
            {discord}
          </a>
          {}
        </h2>
      )}

      {desc && <h2 class="result">Description: {desc}</h2>}
    </>
  );
};

export default ShowContact;
