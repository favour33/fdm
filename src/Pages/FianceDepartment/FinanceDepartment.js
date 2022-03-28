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
    window.location.reload();
  };
  return (
    <>
      <Link className="link" to="/">
        LOG OUT{" "}
      </Link>

      <h1>Claims to be processed</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Image Evidence</th>
            <th>Date</th>
            <th>Status</th>
            <th>Process Button</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => {
              return user.status === "APPROVED ";
            })
            .map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.description}</td>
                  <td>£ {user.amount}</td>
                  <td
                    className="tol"
                    onClick={() => {
                      // window.location.href = "http://domain.com";
                      window
                        .open("https://receipt001.netlify.app", "_blank")
                        .focus();
                    }}
                  >
                    <span className="image-link">receipt001 </span>
                  </td>
                  <td>{user.date}</td>
                  <td>{user.status}</td>
                  <td>
                    <button
                      className="process-claim"
                      onClick={() => {
                        ProcessClaim(user.id, user.status);
                      }}
                    >
                      Process Claim
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <h1>Processed claims</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Image Evidence</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => {
              return user.status === "PROCESSED";
            })
            .map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td> {user.description}</td>
                  <td>£ {user.amount}</td>
                  <td
                    className="tol"
                    onClick={() => {
                      // window.location.href = "http://domain.com";
                      window
                        .open("https://receipt001.netlify.app", "_blank")
                        .focus();
                    }}
                  >
                    <span className="image-link">receipt001 </span>
                  </td>
                  <td> {user.date}</td>
                  <td>{user.status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default FinanceDepartment;
