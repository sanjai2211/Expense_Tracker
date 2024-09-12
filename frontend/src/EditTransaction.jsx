// EditTransaction.js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get transaction id
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  max-width: 100%;
  background-color: aliceblue;
  padding: 30px 20px;
  border: 1px solid #000;
  border-radius: 5px;
  margin-left: 400px;
  margin-top: 100px;
`;

const Heading = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #000;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const EditTransaction = () => {
  const [transaction, setTransaction] = useState({
    details: "",
    amount: "",
    transType: "",
  });
  const { id } = useParams(); // Get transaction id from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the transaction by id from backend or local storage
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`/api/transactions/${id}`);
        const data = await response.json();
        setTransaction(data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await fetch(`/api/transactions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      toast.success("Transaction updated!");
      setTimeout(() => navigate("/"), 1000); // Redirect back to home page
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <Container>
      <Heading>Edit Transaction</Heading>
      <Input
        type="text"
        name="details"
        value={transaction.details}
        onChange={handleChange}
        placeholder="Transaction Details"
      />
      <Input
        type="number"
        name="amount"
        value={transaction.amount}
        onChange={handleChange}
        placeholder="Amount"
      />
      <Input
        type="text"
        name="transType"
        value={transaction.transType}
        onChange={handleChange}
        placeholder="Type (income/expense)"
      />
      <Button onClick={handleUpdate}>Update Transaction</Button>
      <ToastContainer />
    </Container>
  );
};

export default EditTransaction;
