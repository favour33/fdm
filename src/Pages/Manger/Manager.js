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

const Manager = () => {
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

  const approve = async (id, status) => {
    const userDoc = doc(db, "users", id);
    const newStatus = { status: "APPROVED " };
    await updateDoc(userDoc, newStatus);
  };

  const decline = async (id, status) => {
    const userDoc = doc(db, "users", id);
    const newStatus = { status: "DECLINED " };
    await updateDoc(userDoc, newStatus);
  };

  return (
    <div>
      <Link to="/">RETURN </Link>
      <h1>Claims yet to be approvved</h1>
      <div>
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
                <button
                  onClick={() => {
                    approve(user.id, user.status);
                  }}
                >
                  Approved
                </button>
                <button
                  onClick={() => {
                    decline(user.id, user.status);
                  }}
                >
                  Declined
                </button>
              </div>
            );
          })}
      </div>
      {/*  */}
      <h1>Approved/declined Claims</h1>
      <div>
        {users
          .filter((user) => {
            return user.status === "APPROVED " || user.status === "DECLINED ";
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
    </div>
  );
};

export default Manager;
