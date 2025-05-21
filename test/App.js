// frontend/src/App.js

import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { connectWallet, getVotingContract, fetchProposals, castVote, hasVoted } from "./utils/web3Utils";
import "./styles/App.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [userHasVoted, setUserHasVoted] = useState(false);

  const [web3Provider, setWeb3Provider] = useState(null);
  const [web3Signer, setWeb3Signer] = useState(null);
  const [votingContract, setVotingContract] = useState(null);

  const initializeDApp = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { provider, signer, address } = await connectWallet();
      setCurrentAccount(address);
      setWeb3Provider(provider);
      setWeb3Signer(signer);

      const contractInstance = getVotingContract(signer);
      setVotingContract(contractInstance);

      const hasVotedStatus = await hasVoted(contractInstance, address);
      setUserHasVoted(hasVotedStatus);

      const fetchedProposals = await fetchProposals(contractInstance);
      setProposals(fetchedProposals);

    } catch (err) {
      console.error("Initialization error:", err);
      setError(err.message || "Failed to initialize DApp. Please check MetaMask.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeDApp();

    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          setCurrentAccount(null);
          setUserHasVoted(false);
          setError("Wallet disconnected. Please connect MetaMask.");
        } else {
          setCurrentAccount(accounts[0]);
          initializeDApp();
        }
      };

      const handleChainChanged = () => {
        initializeDApp();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [initializeDApp]);


  const handleVote = async (proposalIndex) => {
    if (!votingContract || !currentAccount || userHasVoted) return;
    setIsVoting(true);
    setError(null);
    try {
      await castVote(votingContract, proposalIndex);
      setUserHasVoted(true);
      const updatedProposals = await fetchProposals(votingContract);
      setProposals(updatedProposals);
      alert("Vote cast successfully! Thanks for voting.");
    } catch (err) {
      console.error("Voting error:", err);
      setError(err.message || "Failed to cast vote.");
    } finally {
      setIsVoting(false);
    }
  };

  if (isLoading) {
    return <div className="app-container">Loading DApp...</div>;
  }

  if (error) {
    return (
      <div className="app-container error">
        <h2>Error:</h2>
        <p>{error}</p>
        <button onClick={initializeDApp}>Try Connecting Again</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Decentralized Voting DApp</h1>
      <p>Connected account: {currentAccount ? currentAccount : "Not connected"}</p>
      {currentAccount && (
        <>
          {userHasVoted && <p className="voted-message">You have already voted. Thanks for your participation!</p>}
          <div className="proposals-list">
            <h2>Proposals:</h2>
            <ul>
              {proposals.map((p) => (
                <li key={p.id} className="proposal-item">
                  <span>{p.name}</span> - <span>Votes: {p.voteCount}</span>
                  {!userHasVoted && (
                    <button
                      onClick={() => handleVote(p.id)}
                      disabled={isVoting}
                    >
                      {isVoting ? "Voting..." : "Vote"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {!currentAccount && (
        <button onClick={initializeDApp} disabled={isLoading}>
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
}

export default App;
        
