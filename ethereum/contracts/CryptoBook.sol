//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContactFactory {
    mapping (address => address) public ownerToContact;

    modifier noRecord() {
        require(ownerToContact[msg.sender] == address(0), "You have alreade left your contacts!");
        _;
    }

    function createContact(string memory _telegram, string memory _discord) public noRecord {
        Contact contact = new Contact(msg.sender, _telegram, _discord);
        ownerToContact[msg.sender] = address(contact);
    }

    function createContact(string memory _telegram) public noRecord {
        Contact contact = new Contact(msg.sender, _telegram,"");
        ownerToContact[msg.sender] = address(contact);
    }
}

contract Contact {

    address public owner;
    string public telegram;
    string public  discord;
    string public description;

    modifier onlyOwner() {
        require(owner == msg.sender, 'You are not an owner!');
        _;
    }

    constructor(address _owner, string memory _telegram, string memory _discord) {
        owner = _owner;
        telegram = _telegram;
        discord = _discord;
    }

    function setTelegram(string memory _telegram) public onlyOwner {
        telegram = _telegram;
    }

    function setDiscord(string memory _discord) public onlyOwner {
        discord = _discord;
    }

    function setDescription(string memory _description) public onlyOwner {
        description = _description;
    }

}