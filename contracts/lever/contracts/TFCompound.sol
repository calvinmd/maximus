pragma solidity ^0.5.8;

import "./Compound/CErc20.sol";
import "./Compound/EIP20Interface.sol";
import "./Compound/CEther.sol";


contract TFCompound {
  EIP20Interface underlying;
  CErc20 cToken;
  CEther cEther;

  constructor(address _underlying, address _cToken, address payable _cEther) public {
    underlying = EIP20Interface(_underlying);
    cToken = CErc20(_cToken);
    cEther = CEther(_cEther);
  }

  function setTokens(address _underlying, address _cToken, address payable _cEther) public {
    underlying = EIP20Interface(_underlying);
    cToken = CErc20(_cToken);
    cEther = CEther(_cEther);
  }

  function invest(uint _amount) public returns (uint) {
    underlying.approve(address(cToken), _amount);
    cToken.mint(_amount);
    // assert(cToken.mint(_amount) == 0);
    return _amount;
  }

}
