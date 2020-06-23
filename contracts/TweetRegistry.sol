pragma solidity >=0.4.21 <0.6.0;

contract TweetRegistry {

	// mappings to look up account names, account ids and addresses
	mapping (address => string) _addressToAccountName;
	mapping (uint => address) _accountIdToAccountAddress;
	mapping (string => address) _accountNameToAddress;

	// might be interesting to see how many people use the system
	uint _numberOfAccounts;

	// owner
	address payable _registryAdmin;

	// allowed to administrate accounts only, not everything
	address payable _accountAdmin;

	// if a newer version of this registry is available, force users to use it
	bool _registrationDisabled;

	constructor() public {
		_registryAdmin = msg.sender;
		_accountAdmin = msg.sender; // can be changed later
		_numberOfAccounts = 0;
		_registrationDisabled = false;
	}

	function register(string memory name, address accountAddress) public returns (int result) {
		if (_accountNameToAddress[name] != address(0)) {
			// name already taken
			result = -1;
		} else if (bytes(_addressToAccountName[accountAddress]).length != 0) {
			// account address is already registered
			result = -2;
		} else if (bytes(name).length >= 64) {
			// name too long
			result = -3;
		} else if (_registrationDisabled){
			// registry is disabled because a newer version is available
			result = -4;
		} else {
			_addressToAccountName[accountAddress] = name;
			_accountNameToAddress[name] = accountAddress;
			_accountIdToAccountAddress[_numberOfAccounts] = accountAddress;
			_numberOfAccounts++;
			result = 0; // success
		}
	}

	function getNumberOfAccounts() public view returns (uint numberOfAccounts) {
		numberOfAccounts = _numberOfAccounts;
	}

	function getAddressOfName(string memory name) public view returns (address addr) {
		addr = _accountNameToAddress[name];
	}

	function getNameOfAddress(address addr) public view returns (string memory name) {
		name = _addressToAccountName[addr];
	}

	function getAddressOfId(uint id) public view returns (address addr) {
		addr = _accountIdToAccountAddress[id];
	}

	function unregister() public returns (string memory unregisteredAccountName) {
		unregisteredAccountName = _addressToAccountName[msg.sender];
		_addressToAccountName[msg.sender] = "";
		_accountNameToAddress[unregisteredAccountName] = address(0);
		// _accountIdToAccountAddress is never deleted on purpose
	}

	function adminUnregister(string memory name) public {
		if (msg.sender == _registryAdmin || msg.sender == _accountAdmin) {
			address addr = _accountNameToAddress[name];
			_addressToAccountName[addr] = "";
			_accountNameToAddress[name] = address(0);
			// _accountIdToAccountAddress is never deleted on purpose
		}
	}

	function adminSetRegistrationDisabled(bool registrationDisabled) public {
		// currently, the code of the registry can not be updated once it is
		// deployed. if a newer version of the registry is available, account
		// registration can be disabled
		if (msg.sender == _registryAdmin) {
			_registrationDisabled = registrationDisabled;
		}
	}

	function adminSetAccountAdministrator(address payable accountAdmin) public {
		if (msg.sender == _registryAdmin) {
			_accountAdmin = accountAdmin;
		}
	}

	function adminRetrieveDonations() public {
		if (msg.sender == _registryAdmin) {
			_registryAdmin.transfer(address(this).balance);
		}
	}

	function adminDeleteRegistry() public {
		if (msg.sender == _registryAdmin) {
			selfdestruct(_registryAdmin); // this is a predefined function, it deletes the contract and returns all funds to the admin's address
		}
	}
}