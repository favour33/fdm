import React, { useState } from "react";

const Employees = () => {
  const claimList = {
    name: "",
    desritpon: "",
    amount: "",
    evidence: "",
    date: "",
    stats: "",
  };

  const [name, setName] = useState("");
  const [desritpon, setDesritpon] = useState("");
  const [amount, setAmount] = useState("");
  const [evidence, setEvidence] = useState("");
  const [date, setDate] = useState("");
  const [stats, setStats] = useState("PENDING");

  return (
    <>
      <h1>Add A Claim </h1>
      <form>
        <label htmlFor="name">Claim Name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <hr />
        <label htmlFor="desc">Claim Name</label>
        <textarea
          id="desc"
          onChange={(e) => {
            setDesritpon(e.target.value);
          }}
          value={desritpon}
        ></textarea>
        <hr />
        <label htmlFor="amount">Claim Amount</label>
        <input
          type="text"
          id="amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount}
        />
        <hr />
        {/* <input type="file" /> */}
        <label htmlFor="image">Add Image</label>
        <input
          type="text"
          id="image"
          onChange={(e) => {
            setEvidence(e.target.value);
          }}
          value={evidence}
        />
        <hr />
        <input
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
        />
        <hr />
        <button>ADD CLAIM</button>
      </form>
      <h1>All sent Claims </h1>
      <p>Name: {name}</p>
      <p>desritpon: {desritpon}</p>
      <p>amount: {amount}</p>
      <p>evidence: {evidence}</p>
      <p>date: {date}</p>
      <p>status: {stats}</p>
    </>
  );
};

export default Employees;
