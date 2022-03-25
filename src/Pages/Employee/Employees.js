import React, { useState } from "react";

const Employees = () => {
  const claimList = {
    name: "",
    description: "",
    amount: "",
    evidence: "",
    date: "",
    status: "",
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [evidence, setEvidence] = useState("");
  const [date, setDate] = useState("");
  const [staus, setStatus] = useState("PENDING");

  return (
    <>
      <h1>Add A Claim </h1>
      <form>
        {/* Claim Name */}
        <label>Claim Name</label>
        <input
          type="text"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        {/* Claim Description  */}
        <label>Claim Description</label>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        {/* Claim Amount */}
        <label>Claim Amount</label>
        <input
          type="text"
          required
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />

        {/* claim Evidence */}
        <label>Claim Evidence</label>
        <input
          type="text"
          required
          onChange={(e) => {
            setEvidence(e.target.value);
          }}
        />

        {/* claim Date */}
        <label>Claim Date</label>
        <input
          type="date"
          required
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </form>
    </>
  );
};

export default Employees;
