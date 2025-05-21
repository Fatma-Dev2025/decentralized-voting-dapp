
# Decentralized Voting DApp

A fully decentralized voting application built with Solidity, Hardhat, and React. Users can securely vote on proposals using their Ethereum wallet like MetaMask.

## Features

- Smart contract-based secure voting
- Transparent vote count
- MetaMask integration
- React frontend with Web3 interaction
- Deployed on Ethereum testnet

---

## Project Structure

Decentralized-Voting-DApp/ │ ├── contracts/          # Smart contracts │   └── Voting.sol │ ├── scripts/            # Deployment scripts │ ├── test/               # Unit tests │ ├── frontend/           # React frontend │ ├── README.md           # Project description │ └── HOW_TO_RUN.md       # Setup instructions

---

## Challenges & Learnings

During the development of this project, some challenges I faced included:

- Implementing secure voting logic to prevent double voting.
- Integrating MetaMask wallet for smooth user authentication and transaction signing.
- Managing asynchronous blockchain interactions within the React frontend.

To overcome these, I:

- Used Solidity's mappings and modifiers to secure voting functions.
- Leveraged Web3.js to handle wallet integration and smart contract calls.
- Implemented proper state management and error handling in React.

This project helped me deepen my understanding of smart contract security, decentralized app architecture, and frontend-blockchain communication.

---

## Future Enhancements

Some possible future improvements include:

- Adding support for multiple voting proposals simultaneously.
- Implementing role-based access control for proposal creation.
- Creating a mobile-friendly interface.
- Integrating with other blockchain networks like Polkadot or Solana.
- Adding off-chain vote tallying with zero-knowledge proofs for privacy.

---

## Smart Contract Code Highlights

- The contract uses Solidity 0.8.x for improved security and features.
- Implemented the Checks-Effects-Interactions pattern to prevent reentrancy attacks.
- Well-commented code explaining key logic such as voting, proposal management, and result tallying.
- Unit tests written with Hardhat ensure contract correctness and edge cases.

---

## Frontend

- Simple React UI that allows users to connect their MetaMask wallet.
- Displays active proposals and current voting results.
- Provides clear feedback during transactions.
- Interacts directly with the deployed smart contract on the Ethereum testnet.

---

## Commit History

- Commit messages are clear and concise.
- Each commit focuses on a single feature or fix.
- Regular commits document progress and changes throughout the project lifecycle.

---

## How to Run

Please refer to [HOW_TO_RUN.md](./HOW_TO_RUN.md) for detailed setup and running instructions.

---

## License

MIT License

---
