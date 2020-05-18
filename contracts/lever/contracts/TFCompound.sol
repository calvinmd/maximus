pragma solidity ^0.5.8;

import "./Compound/MErc20.sol";
import "./Compound/EIP20Interface.sol";
import "./Compound/MEther.sol";


contract TFCompound {
  EIP20Interface underlying;
  MErc20 cToken;
  MEther mEther;

  constructor(address _underlying, address _cToken, address payable _mEther) public {
    underlying = EIP20Interface(_underlying);
    cToken = MErc20(_cToken);
    mEther = MEther(_mEther);
  }

  function setTokens(address _underlying, address _cToken, address payable _mEther) public {
    underlying = EIP20Interface(_underlying);
    cToken = MErc20(_cToken);
    mEther = MEther(_mEther);
  }

  function invest(uint _amount) public returns (uint) {
    underlying.approve(address(cToken), _amount);
    cToken.mint(_amount);
    // assert(cToken.mint(_amount) == 0);
    return _amount;
  }

}
