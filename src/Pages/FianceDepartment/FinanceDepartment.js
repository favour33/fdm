import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const FinanceDepartment = () => {
  const [newStatus, setStatus] = useState("PENDING");

  // hold all the users
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  // We want to get the list of users as sound as someone opens up the website
  useEffect(() => {
    const getUsers = async () => {
      // Making a call to the firestore database
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const ProcessClaim = async (id, status) => {
    const userDoc = doc(db, "users", id);
    const newStatus = { status: "PROCESSED" };
    await updateDoc(userDoc, newStatus);
  };
  return (
    <>
      <Link to="/">RETURN </Link>

      <h1>Claims to be processed</h1>
      <div>
        {users
          .filter((user) => {
            return user.status === "APPROVED ";
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
                <button
                  onClick={() => {
                    ProcessClaim(user.id, user.status);
                  }}
                >
                  Process Claim
                </button>
              </div>
            );
          })}
      </div>
      <div>
        <h1>Processed claims</h1>
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
      </div>
    </>
  );
};

export default FinanceDepartment;
