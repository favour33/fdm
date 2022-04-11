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
import Message from "../../components/Message/Message";
import "./Manager.css";

const Manager = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [declineButtonClaim, setDeclineButtonClaim] = useState(false);
  const [newComment1, setNewComment] = useState("");

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
    window.location.reload();
  };

  // const decline = async (id, status, comments) => {
  //   const userDoc = doc(db, "users", id);
  //   //
  //   const newStatus = { status: "DECLINED " };
  //   await updateDoc(userDoc, newStatus);
  //   //
  //   const newComment = { comments: extraComments };
  //   await updateDoc(userDoc, newComment);

  //   setDeclineMessage(!declineMessage);
  //   // window.location.reload();
  // };

  const decline = async (id, status) => {
    const userDoc = doc(db, "users", id);
    const newStatus = { status: "DECLINED " };
    await updateDoc(userDoc, newStatus);
  };

  const comment_ = async (id, comments) => {
    const userDoc = doc(db, "users", id);
    const newCo = { comments: newComment1 };
    await updateDoc(userDoc, newCo);
  };

  return (
    <div className="manger-container">
      <div>
        <Link className="link" to="/">
          LOG OUT{" "}
        </Link>
        <h1>Claims yet to be Approved</h1>
        <table>
          <thead>
            <tr>
              <th className="th-name">Name</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Image Evidence</th>
              <th>Date</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Decline</th>
            </tr>
          </thead>

          <tbody>
            {users
              .filter((user) => {
                return user.status === "PENDING";
              })
              .map((user) => {
                return (
                  <>
                    <tr key={user.id}>
                      <td> {user.name}</td>
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
                      <td>
                        {" "}
                        <button
                          className="approve-claim"
                          onClick={() => {
                            approve(user.id, user.status);
                          }}
                        >
                          Approve
                        </button>
                      </td>
                      <td>
                        {" "}
                        <button
                          className="decline-claim"
                          onClick={() => {
                            decline(user.id, user.status);
                            setDeclineButtonClaim(!declineButtonClaim);
                          }}
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                    <div>
                      {declineButtonClaim === false ? (
                        ""
                      ) : (
                        <>
                          <p>Reason for Declining the claim?</p>
                          <textarea
                            className="claim-desc1"
                            onChange={(e) => {
                              setNewComment(e.target.value);
                            }}
                          />
                          <button
                            onClick={(e) => {
                              // call the extra comment feature
                              comment_(user.id, user.comments);
                              window.location.reload();
                            }}
                          >
                            Submit
                          </button>
                        </>
                      )}
                    </div>
                  </>
                );
              })}
          </tbody>
        </table>

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
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => {
                return (
                  user.status === "APPROVED " ||
                  user.status === "DECLINED " ||
                  user.status === "PROCESSED"
                );
              })
              .map((user) => {
                return (
                  <tr key={user.id}>
                    <td> {user.name}</td>
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
                    <td>{user.date}</td>
                    <td> {user.status}</td>
                    <td>{user.comments}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manager;
