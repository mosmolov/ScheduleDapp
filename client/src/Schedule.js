import React from "react";
import { useEffect, useState } from "react";
import {
  scheduleContract,
  connectWallet,
  updateSchedule,
  loadCurrentSchedule,
  getCurrentWalletConnected,
} from "./util/interact.js";

const Schedule = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [newEventName, setNewEventName] = useState("");
  const [newEventStartTime, setNewEventStartTime] = useState();
  const [newEventEndTime, setNewEventEndTime] = useState();
  const [newEventOrder, setNewEventOrder] = useState();
  //called only once
  useEffect(() => {
    async function fetchData() {
      const schedule = await loadCurrentSchedule();
      setSchedule(schedule);
      addSmartContractListener();
  
      const { address, status } = await getCurrentWalletConnected();
  
      setWallet(address);
      setStatus(status);
  
      addWalletListener();
    }
    fetchData();
  }, []);
  function addSmartContractListener() {
    scheduleContract.events.updatedSchedule({}, (error, data) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        setSchedule(data);
        setNewEventName("");
        setNewEventOrder("");
        setNewEventStartTime("");
        setNewEventEndTime("");
        setStatus("🎉 Your schedule has been updated!");
      }
    });
  }
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onUpdatePressed = async () => {
    const { status } = await updateSchedule(
      walletAddress,
      newEventOrder,
      newEventStartTime,
      newEventEndTime,
      newEventName
    );
    setStatus(status);
  };
  //the UI of our component
  return (
    <div id="container">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <div>
        {walletAddress.length > 0 ? (
          <div>
            <h1>{schedule[0]}</h1>
            <h2>{schedule[1]}</h2>
          </div>
        ) : (
          <span>Connect Wallet to Import Schedule</span>
        )}
      </div>
      <h2>Current Schedule:</h2>
      <div>
        {walletAddress.length > 0 ? (
          <div>
            {schedule[2].map((event) => (
              <div>
                {" "}
                <p>
                  {event[1]}-{event[2]} : {event[3]}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <span></span>
        )}
      </div>
      <h2 style={{ paddingTop: "18px" }}>Add Event:</h2>

      <div>
        <input
          type="text"
          placeholder="New Event Name"
          onChange={(e) => setNewEventName(e.target.value)}
          value={newEventName}
        />
        <input
          type="number"
          placeholder="Order of the Event"
          onChange={(e) => setNewEventOrder(e.target.value)}
          value={newEventOrder}
        />
        <input
          type="number"
          placeholder="Event Start Time"
          onChange={(e) => setNewEventStartTime(e.target.value)}
          value={newEventStartTime}
        />
        <input
          type="number"
          placeholder="Event End Time"
          onChange={(e) => setNewEventEndTime(e.target.value)}
          value={newEventEndTime}
        />
        <p id="status">{status}</p>

        <button id="publish" onClick={onUpdatePressed}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Schedule;
