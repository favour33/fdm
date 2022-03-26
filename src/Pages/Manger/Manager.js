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
  // useEffect(() => {
  //   const getUsers = async () => {
  //     // Making a call to the firestore database
  //     const data = await getDocs(usersCollectionRef);
  //     console.log(data);
  //     const data1 = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     console.log(data1);
  //     setUsers([...users, data1]);
  //   };

  //   getUsers();
  // }, []);

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
      <Link to="/">LOG OUT </Link>
      <h1>Claims yet to be approvved</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Image Evidence</th>
            <th>Date</th>
            <th>Status</th>
            <th>Approve/Decline</th>
          </tr>
        </thead>
      </table>
      <tbody>
        {users
          .filter((user) => {
            return user.status === "PENDING";
          })
          .map((user) => {
            return (
              <tr key={user.id}>
                <td>Name - {user.name}</td>
                <td>Description - {user.description}</td>
                <td>Amount - {user.amount}</td>
                <td
                  className="tol"
                  onClick={() => {
                    // window.location.href = "http://domain.com";
                    window
                      .open("https://receipt001.netlify.app", "_blank")
                      .focus();
                  }}
                >
                  Image Evdience
                </td>
                <td>Date - {user.date}</td>
                <td>Status - {user.status}</td>
                <td>
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
                </td>
              </tr>
            );
          })}
      </tbody>
      {/*  */}
      <h1>Approved/declined Claims</h1>
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
              return user.status === "APPROVED " || user.status === "DECLINED ";
            })
            .map((user) => {
              return (
                <tr key={user.id}>
                  <td>Name - {user.name}</td>
                  <td>Description - {user.description}</td>
                  <td>Amount - {user.amount}</td>
                  <td
                    className="tol"
                    onClick={() => {
                      // window.location.href = "http://domain.com";
                      window
                        .open("https://receipt001.netlify.app", "_blank")
                        .focus();
                    }}
                  >
                    Image Evdience
                  </td>
                  <td>Date - {user.date}</td>
                  <td>Status - {user.status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Manager;
