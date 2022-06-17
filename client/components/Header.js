import { Menu } from "semantic-ui-react";
import Link from "next/link";
import { useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const Header = () => {
  const [currentAccount, setCurrentAccount] = useState();

  const handleLogInClick = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("You don't have a metamsk :(");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount("Logged in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menu class="menu">
      <Link href="/">
        <Menu.Item class="menu-item">Main</Menu.Item>
      </Link>
      <Link href="/add">
        <Menu.Item class="menu-item">Add</Menu.Item>
      </Link>
      <Link href="/show">
        <Menu.Item class="menu-item">Find </Menu.Item>
      </Link>
      {/* <Link href="/user">
        <Menu.Item class="menu-item">Change </Menu.Item>
      </Link> */}

      <Menu.Item class=" " position="right">
        {!currentAccount ? (
          <button class="menu-button menu-item" onClick={handleLogInClick}>
            Log in
          </button>
        ) : (
          <Link href="/user">
            <button onClick={handleLogInClick}>
              <Jazzicon
                diameter={45}
                seed={jsNumberForAddress(currentAccount)}
              />
            </button>
          </Link>
        )}
      </Menu.Item>
    </Menu>
  );
};

export default Header;
