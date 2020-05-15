import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

pragma solidity ^0.5.2;

contract DAI is ERC20 {
  string public name = "DAI";
  string public symbol = "DAI";
  uint public decimals = 18;

  constructor () public {
    _mint(msg.sender, 22020000000000000000000);
  }

  function mintTokens () public {
    _mint(msg.sender, 10 ether);
  }

  /**
    * @dev Arbitrarily mints tokens to any account
    */
  function allocateTo(address _recipient, uint256 value) public {
    emit Transfer(msg.sender, _recipient, value);
    _mint(_recipient, value);
  }

}
