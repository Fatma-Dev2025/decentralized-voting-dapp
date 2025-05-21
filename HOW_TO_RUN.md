
# How to run Decentralized Voting DApp

This document provides clear, step-by-step instructions to set up and run the Decentralized Voting DApp locally on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:  
- Node.js (LTS version recommended)  
- npm (comes with Node.js) or Yarn  
- MetaMask wallet extension installed in your browser or mobile app  
- Hardhat installed as a dev dependency (`npm install --save-dev hardhat`)  

## Steps to run

**1. Clone the Repository:**  

```bash
git clone https://github.com/YourGitHubUsername/decentralized-voting-dapp.git
cd decentralized-voting-dapp


---

2. Install Dependencies:

npm install

> If your frontend is in a separate folder with its own package.json, run:

cd frontend
npm install
cd ..




---

3. Configure Environment Variables:

Create a .env file in the root directory with the following content:

PRIVATE_KEY="YOUR_METAMASK_PRIVATE_KEY_HERE"
SEPOLIA_URL="YOUR_ALCHEMY_OR_INFURA_SEPOLIA_URL_HERE"

> Important: Never commit .env to GitHub. Make sure .env is in .gitignore.




---

4. Compile Smart Contracts:

npx hardhat compile


---

5. Deploy the Smart Contract on a Test Network (e.g., Sepolia):

npx hardhat run scripts/deploy.js --network sepolia

> Copy the deployed contract address from the console output for frontend integration.




---

6. Update Frontend with Contract Address and ABI:

Find the contract address from deployment step.

Find the ABI in artifacts/contracts/Voting.sol/Voting.json.

Update your frontend config file (e.g., frontend/src/config.js) with the address and ABI.



---

7. Run the React Frontend:

cd frontend
npm start


---

8. Open the Application in Your Browser:

Go to http://localhost:3000

Connect your MetaMask wallet to the same test network (Sepolia)

Start interacting with the DApp!
