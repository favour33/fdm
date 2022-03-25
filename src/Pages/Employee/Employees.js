import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import "./Employees.css";
import { Link } from "react-router-dom";

const Employees = () => {
  const claimList = {
    name: "",
    description: "",
    amount: "",
    evidence: "",
    date: "",
    status: "",
  };

  // information states
  const [newName, setName] = useState("");
  const [newDescription, setDescription] = useState("");
  const [newAmount, setAmount] = useState(0);
  const [newEvidence, setEvidence] = useState("");
  const [newDate, setDate] = useState("");
  const [newStatus, setStatus] = useState("PENDING");

  // hold all the users
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const AddClaim = async () => {
    // object of the new data we want to add
    const payload = {
      name: newName,
      description: newDescription,
      amount: newAmount,
      evidence: newEvidence,
      date: newDate,
      status: newStatus,
    };
    await addDoc(usersCollectionRef, payload);
  };

  // We want to get the list of users as sound as someone opens up the website
  useEffect(() => {
    const getUsers = async () => {
      // Making a call to the firestore database
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <>
      <Link to="/">RETURN </Link>
      <h1>Add A Claim </h1>
      <form>
        {/* Claim Name */}
        <label>Claim Name</label>
        <input
          type="text"
          // required
          // value={newName}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        {/* Claim Description  */}
        <label>Claim Description</label>
        <textarea
          // value={newDescription}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        {/* Claim Amount */}
        <label>Claim Amount</label>
        <input
          // value={newAmount}
          type="number"
          // required
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />

        {/* claim Evidence */}
        <label>Claim Evidence</label>
        <input
          // value={newEvidence}
          type="text"
          // required
          onChange={(e) => {
            setEvidence(e.target.value);
          }}
        />

        {/* claim Date */}
        <label>Claim Date</label>
        <input
          // value={newDate}
          type="date"
          // required
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <button type="button" onClick={AddClaim}>
          Add Claim
        </button>
      </form>
      <h1>Pending</h1>
      {users
        .filter((user) => {
          return user.status === "PENDING";
        })
        .map((user) => {
          return (
            <div key={user.id}>
              <p>Name - {user.name}</p>
              <p>Description - {user.description}</p>
              <p>Amount - {user.amount}</p>
              <p>Evidence - {user.evidence} </p>
              <p>Date - {user.date}</p>
              <p>Status - {user.status}</p>
            </div>
          );
        })}
      <h1>Added Claims</h1>
      {users
        .filter((user) => {
          return user.status === "PROCESSED";
        })
        .map((user) => {
          return (
            <div key={user.id}>
              <p>Name - {user.name}</p>
              <p>Description - {user.description}</p>
              <p>Amount - {user.amount}</p>
              <p>Evidence - {user.evidence} </p>
              <p>Date - {user.date}</p>
              <p>Status - {user.status}</p>
            </div>
          );
        })}
    </>
  );
};

export default Employees;
