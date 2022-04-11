import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import "./Employees.css";
import { Link } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import PopUP from "../../components/PopUP/PopUP";
import Message from "../../components/Message/Message";

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
  const [newEvidence, setEvidence] = useState("https://receipt001.netlify.app");
  const [newDate, setDate] = useState("");
  const [newStatus, setStatus] = useState("PENDING");
  const [comm, setComm] = useState("NONE ");
  const [emptyClaim, setEmptyClaim] = useState(false);

  // hold all the users
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [buttonPopUp2, setButtonPopUp2] = useState(true);

  const [currencyGained, setCurrencyGained] = useState(0);
  const AddClaim = async () => {
    if (newName === "" || newDescription === "" || newAmount === "") {
      setEmptyClaim(!emptyClaim);
    } else {
      await addDoc(usersCollectionRef, {
        name: newName,
        description: newDescription,
        // amount: newAmount,
        amount: currencyGained === 0 ? newAmount : currencyGained,
        evidence: newEvidence,
        date: newDate,
        status: newStatus,
        comments: comm,
      });
      window.location.reload();
    }
  };

  // newName === "" || newDescription === "" || newAmount === ""
  //   ?  setEmptyClaim(!emptyClaim)
  //   : await addDoc(usersCollectionRef, {
  //       name: newName,
  //       description: newDescription,
  //       // amount: newAmount,
  //       amount: currencyGained === 0 ? newAmount : currencyGained,
  //       evidence: newEvidence,
  //       date: newDate,
  //       status: newStatus,
  //     });
  // window.location.reload();

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
    <div className="employyes">
      {emptyClaim === false ? (
        <>
          <Link className="link" to="/">
            <span>LOG OUT</span>
          </Link>
          <h1>Add A Claim </h1>
          <form>
            {/* Claim Name */}
            <label>Claim Name</label>
            <input
              type="text"
              required
              // required
              // value={newName}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            {/* Claim Description  */}
            <label>Claim Description</label>
            <textarea
              className="claim-desc"
              // value={newDescription}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            {/* Claim Amount */}

            <div className="claim-section">
              <label>Claim Amount</label>
              <div className="s1">
                <input
                  className="claim-amount-input"
                  // value={newAmount}
                  type="number"
                  // value={newAmount}
                  value={currencyGained === 0 ? newAmount : currencyGained}
                  // required
                  onChange={(e) => {
                    currencyGained === 0
                      ? setAmount(e.target.value)
                      : setCurrencyGained(currencyGained);
                  }}
                />

                <div className="s2">
                  {/* Convert cuurency PopUp  */}
                  <button
                    className="convert-currency"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setButtonPopUp(true);
                    }}
                  >
                    Convert Currency
                    <div className="tool-tips">
                      This allows you to convert your claim amount into any
                      currency you want
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <PopUP trigger={buttonPopUp} setTrigger={setButtonPopUp}>
              <p>
                You can convert your claim amount into any currency you want
              </p>
              <div>
                <div className="first">
                  <p>Currency you gained the expense in: </p>
                  <select className="first-select">
                    <option value="0">Currency:</option>
                    <option value="1">EUR</option>
                    <option value="2">GBP</option>
                    <option value="2">USD</option>
                  </select>
                  <label>Amount</label>
                  <input
                    // value={currencyGained}
                    onChange={(e) => {
                      setCurrencyGained(e.target.value * 0.84);
                      console.log(currencyGained);
                    }}
                    type="number"
                    placeholder="Amount"
                  />
                </div>
                <div className="second">
                  <p>Currency you want to covert the expense to</p>
                  <select>
                    <option value="0">Currency:</option>
                    <option value="1">EUR</option>
                    <option value="2">GBP</option>
                    <option value="2">USD</option>
                  </select>
                </div>
              </div>
            </PopUP>

            {/* claim Evidence */}
            <label>Claim Evidence (VAT receipt)</label>
            <input
              className="claim-evidence-text-box"
              // value={newEvidence}
              type="file"
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
            <button
              className="add-claim-button"
              type="button"
              onClick={AddClaim}
            >
              Add Claim
            </button>
          </form>
          <h1>Pending</h1>
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
                  return user.status === "PENDING";
                })
                .map((user) => {
                  return (
                    <tr key={user.id}>
                      <td> {user.name}</td>
                      <td>{user.description}</td>
                      <td>£ {user.amount}</td>
                      {/* <p>Evidence - {user.evidence} </p> */}
                      <td
                        onClick={() => {
                          // window.location.href = "http://domain.com";
                          window
                            .open("https://receipt001.netlify.app", "_blank")
                            .focus();
                        }}
                      >
                        <span className="image-link">receipt001 </span>
                      </td>
                      {/* <p>{(window.location.href = 'http://domain.com';)}</p> */}

                      <td>{user.date}</td>
                      <td> {user.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <h1>Added Claims</h1>
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
                    user.status === "DECLINED " ||
                    user.status === "PROCESSED" ||
                    user.status === "APPROVED"
                  );
                })
                .map((user) => {
                  return (
                    <tr key={user.id}>
                      <td> {user.name}</td>
                      <td> {user.description}</td>
                      <td>£ {user.amount}</td>
                      {/* <p>Evidence - {user.evidence} </p> */}
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
                      {/* <p>{(window.location.href = 'http://domain.com';)}</p> */}

                      <td> {user.date}</td>
                      <td> {user.status}</td>
                      <td>{user.comments}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : (
        <Message>
          <>
            <p>Cannot Add empty claim</p>
            <button
              onClick={() => {
                setEmptyClaim(!emptyClaim);
              }}
            >
              Try again
            </button>
          </>
        </Message>
      )}
    </div>
  );
};

export default Employees;
