// v1.0에서 달라진 점은
// ICT 컨트랙 불러올 때 CA를 Incheon_Coffeebak_Token가 아닌 인터페이스 형태로 감싼 것

// ICT 컨트랙과 상호작용 잘 되는지 확인한 방법 
// ICT 컨트랙에서 오너 계정으로 transferfrom() 트잭을 날려서 이 컨트랙으로 토큰을 보내고
// transfer_test() 함수를 실행시키면 v1.0과 v1.1 모두 문제 없이 잘 되는 것을 확인할 수 있다.

// File: @openzeppelin/contracts/token/ERC20/IERC20.sol

// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.19;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 * ERC20 토큰 표준에 정의된 IERC20 인터페이스를 정의한 것으로 ERC20 토큰을 구현하기 위한 기본적인 함수와 이벤트를 정의하고 있습니다.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
}


// File: @openzeppelin/contracts/utils/Context.sol

// OpenZeppelin Contracts (last updated v5.0.0) (utils/Context.sol)

pragma solidity ^0.8.19;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 * 이 Context 컨트랙트는 현재 실행 컨텍스트에 대한 정보를 제공하며, 메타 트랜잭션과 같이 트랜잭션 송신자와 실행자가 다른 경우에도 송신자의 주소와 트랜잭션 데이터를 안전하게 관리할 수 있습니다.
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// File: @openzeppelin/contracts/access/Ownable.sol

// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)

pragma solidity ^0.8.19;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 * 이 Ownable 컨트랙트는 기본적인 접근 제어 메커니즘을 제공하며, 다른 컨트랙트가 상속받아 사용할 수 있고, 특정 함수에 대한 접근을 소유자만 가능하게 제한하는 기능을 제공합니다.
 *
 * The initial owner is set to the address provided by the deployer. This can
 * later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. `address(0)`)
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Coffeebak_Emission is Ownable {
    //
    address private _token_ca;
    uint256 public total_emission_count;
    uint256 public total_emission_amount;

    // 커피박 1 kg당 인센티브로 지급해주는 ICT 토큰 단위
    // 현재로서는 1 kg당 30 ICT 지급 예정
    uint256 public coffeebak_insentive_unit;

    // 카페의 지갑 주소를 바탕으로 해당 배출 데이터를 배열로 저장한다.
    struct emission_data {
        string cafe_name;
        string collector_name;
        string verification_date;
        uint256 coffeebak_amount;
    }

    // 매핑 객체 cafe_emission_data에는 커피박을 배출한 모든 카페의 지갑 주소가 담겨 있고
    // 각 카페별로 배출 데이터의 배열이 담겨 있다.
    mapping(address => emission_data[]) public cafe_emission_data;

    // 여기서 msg.sender는 배포자
    // 오로지 배포자만이 오너가 될 수 있다.
    constructor(
        address _ICT_CA,
        uint256 _coffeebak_insentive_unit
    ) Ownable(_msgSender()) {
        //
        _token_ca = _ICT_CA;
        coffeebak_insentive_unit = _coffeebak_insentive_unit;
    }

    function transfer_test(
        uint256 _token_amount,
        address _to
    ) public {
        //
        IERC20 token = IERC20(_token_ca);
        token.transfer(_to, _token_amount);
    }
}
