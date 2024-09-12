// // import { useEffect, useState } from "react";
// // import AddTransaction from "./AddTransaction";
// // import OverviewComponent from "./OverviewComponent";
// // import TransactionsContainer from "./TransactionsContainer";
// // import "./Tracker.css"; // Import the CSS file

// // const Tracker = () => {
// //   const [toggle, setToggle] = useState(false);
// //   const [transactions, setTransactions] = useState([]);

// //   const [expense, setExpense] = useState(0);
// //   const [income, setIncome] = useState(0);

// //   const AddTransactions = (payload) => {
// //     const transactionArray = [...transactions];
// //     transactionArray.push(payload);
// //     setTransactions(transactionArray);
// //   };

// //   const calculateTransactions = () => {
// //     let exp = 0;
// //     let inc = 0;

// //     transactions.forEach((item) => {
// //       item.transType === "expense"
// //         ? (exp += item.amount)
// //         : (inc += item.amount);
// //     });

// //     setExpense(exp);
// //     setIncome(inc);
// //   };

// //   useEffect(() => {
// //     calculateTransactions();
// //   }, [transactions]);

// //   return (
// //     <div className="container">
// //       <h1 className="heading">Expense Tracker</h1>
// //       <OverviewComponent
// //         toggle={toggle}
// //         setToggle={setToggle}
// //         expense={expense}
// //         income={income}
// //       />

// //       {toggle && (
// //         <AddTransaction
// //           setToggle={setToggle}
// //           AddTransactions={AddTransactions}
// //         />
// //       )}

// //       <div className="transaction-details">
// //         <div className="expense-box">
// //           Expense <span>₹{expense}</span>
// //         </div>

// //         <div className="income-box">
// //           Income <span>₹{income}</span>
// //         </div>
// //       </div>

// //       <TransactionsContainer transactions={transactions} />
// //     </div>
// //   );
// // };

// // export default Tracker;








// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import AddTransaction from "./AddTransaction";
// import OverviewComponent from "./OverviewComponent";
// import TransactionsContainer from "./TransactionsContainer";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Navbar styles
// const Navbar = styled.nav`
//   background-color: #333;
//   padding: 10px 20px;
//   color: white;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const NavLinks = styled.div`
//   display: flex;
//   gap: 15px;
// `;

// const NavLink = styled.a`
//   color: white;
//   text-decoration: none;
//   font-weight: bold;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// // Profile Button with dropdown
// const ProfileContainer = styled.div`
//   position: relative;
//   display: inline-block;
// `;

// const ProfileButton = styled.button`
//   background-color: #333;
//   color: white;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   font-weight: bold;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const DropdownMenu = styled.div`
//   display: ${(props) => (props.isOpen ? "block" : "none")};
//   position: absolute;
//   background-color: #fff;
//   box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
//   padding: 10px;
//   right: 0;
//   z-index: 1;
// `;

// const DropdownItem = styled.a`
//   padding: 8px 16px;
//   display: block;
//   color: #000;
//   text-decoration: none;
//   &:hover {
//     background-color: #f1f1f1;
//   }
// `;

// // Main container styles
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 600px;
//   max-width: 100%;
//   background-color: aliceblue;
//   padding: 30px 20px;
//   border: 1px solid #000;
//   border-radius: 5px;
//   margin-left: 400px;
//   margin-top: 100px;
// `;

// const Heading = styled.h1`
//   font-size: 30px;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const TransactionDetails = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 20px;
//   margin-bottom: 25px;
// `;

// const ExpenseBox = styled.div`
//   flex: 1;
//   border: 1px solid #000;
//   border-radius: 5px;
//   padding: 10px 20px;
//   background-color: #fff;
//   & span {
//     font-weight: bold;
//     font-size: 25px;
//     display: block;
//     color: ${(props) => (props.isExpense ? "red" : "green")};
//   }
// `;

// const IncomeBox = styled(ExpenseBox)``;

// const PreviousTransactions = styled.div`
//   margin-top: 20px;
//   padding: 15px;
//   border-top: 1px solid #ccc;
// `;

// const TransactionItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 10px;
//   border-bottom: 1px solid #ccc;
//   & span {
//     font-weight: bold;
//   }
// `;

// const Tracker = () => {
//   const [toggle, setToggle] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [previousTransactions, setPreviousTransactions] = useState([]); // For fetched transactions from the backend

//   const [expense, setExpense] = useState(0);
//   const [income, setIncome] = useState(0);
//   const [isProfileOpen, setIsProfileOpen] = useState(false); // For profile dropdown

//   // Fetch transactions from the backend
//   const fetchPreviousTransactions = async () => {
//     try {
//       const response = await fetch("/api/transactions"); // Adjust URL based on your API
//       const data = await response.json();
//       setPreviousTransactions(data);
//     } catch (error) {
//       console.error("Error fetching previous transactions:", error);
//     }
//   };

//   // Function to save transactions to localStorage
//   const saveTransactionsToLocalStorage = (transactions) => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   };

//   // Function to load transactions from localStorage
//   const loadTransactionsFromLocalStorage = () => {
//     const storedTransactions = localStorage.getItem("transactions");
//     if (storedTransactions) {
//       setTransactions(JSON.parse(storedTransactions));
//     }
//   };

//   const AddTransactions = async (payload) => {
//     const transactionArray = [...transactions, payload];
//     setTransactions(transactionArray);

//     // Show a toast message when a transaction is added
//     toast.success("Transaction added successfully!", {
//       position: "bottom-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });

//     // Save transactions to localStorage
//     saveTransactionsToLocalStorage(transactionArray);

//     // Save new transaction to the backend
//     try {
//       await fetch("/api/transactions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//     } catch (error) {
//       console.error("Error saving transaction:", error);
//     }
//   };

//   const calculateTransactions = () => {
//     let exp = 0;
//     let inc = 0;

//     transactions.forEach((item) => {
//       item.transType === "expense"
//         ? (exp += item.amount)
//         : (inc += item.amount);
//     });

//     setExpense(exp);
//     setIncome(inc);
//   };

//   // Logout functionality
//   const handleLogout = () => {
//     // Clear any session or token if using authentication
    
//     localStorage.clear();
//     toast.info("Logged out successfully", {
//       position: "bottom-right",
//       autoClose: 3000,

//     });
//     // You can also redirect to login page if needed
//     // window.location.href = '/login';
//   };

//   useEffect(() => {
//     loadTransactionsFromLocalStorage(); // Load existing transactions on component mount
//     fetchPreviousTransactions(); // Fetch previous transactions from the backend
//   }, []);

//   useEffect(() => {
//     calculateTransactions();
//   }, [transactions]);

//   return (
//     <>
//       {/* Navbar Component */}
//       <Navbar>
//         <Heading>Expense Tracker</Heading>
//         <NavLinks>
//           {/* <NavLink href="#">Home</NavLink> */}
//           {/* <NavLink href="#">Overview</NavLink>
//           <NavLink href="#">Transactions</NavLink> */}
//         </NavLinks>

//         {/* Profile Dropdown */}
//         <ProfileContainer>
//           <ProfileButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
//             Profile
//           </ProfileButton>
//           <DropdownMenu isOpen={isProfileOpen}>
//             <DropdownItem href="login" onClick={handleLogout}>
//               Logout
//             </DropdownItem>
//           </DropdownMenu>
//         </ProfileContainer>
//       </Navbar>

//       {/* Main Container */}
//       <Container>
//         <OverviewComponent
//           toggle={toggle}
//           setToggle={setToggle}
//           expense={expense}
//           income={income}
//         />

//         {toggle && (
//           <AddTransaction
//             setToggle={setToggle}
//             AddTransactions={AddTransactions}
//           />
//         )}

//         <TransactionDetails>
//           <ExpenseBox isExpense>
//             Expense <span>₹{expense}</span>
//           </ExpenseBox>

//           <IncomeBox>
//             Income <span>₹{income}</span>
//           </IncomeBox>
//         </TransactionDetails>

//         <TransactionsContainer transactions={transactions} />

//         {/* Previous Transactions Section */}
//         <PreviousTransactions>
//           <h2>Previous Transactions</h2>
//           {previousTransactions.map((transaction) => (
//             <TransactionItem key={transaction.id}>
//               <span>{transaction.details}</span>
//               <span>
//                 {transaction.transType === "expense" ? "-" : "+"}₹
//                 {transaction.amount}
//               </span>
//             </TransactionItem>
//           ))}
//         </PreviousTransactions>

//         {/* Toast Container */}
//         <ToastContainer />
//       </Container>
//     </>
//   );
// };

// export default Tracker;







import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import styled from "styled-components";
import AddTransaction from "./AddTransaction";
import OverviewComponent from "./OverviewComponent";
import TransactionsContainer from "./TransactionsContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Navbar styles
const Navbar = styled.nav`
  background-color: #333;
  padding: 10px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const DropdownMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: #fff;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  padding: 10px;
  right: 0;
  z-index: 1;
`;

const DropdownItem = styled.a`
  padding: 8px 16px;
  display: block;
  color: #000;
  text-decoration: none;
  &:hover {
    background-color: #f1f1f1;
  }
`;

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

const TransactionDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
`;

const ExpenseBox = styled.div`
  flex: 1;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: #fff;
  & span {
    font-weight: bold;
    font-size: 25px;
    display: block;
    color: ${(props) => (props.isExpense ? "red" : "green")};
  }
`;

const IncomeBox = styled(ExpenseBox)``;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #f4f4f4;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.edit ? "#4CAF50" : "#f44336")};
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Tracker = () => {
  const [toggle, setToggle] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [previousTransactions, setPreviousTransactions] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Edit mode
  const [currentTransaction, setCurrentTransaction] = useState(null); // Current transaction being edited
  const navigate = useNavigate();

  // Fetch transactions from the backend
  const fetchPreviousTransactions = async () => {
    try {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      setPreviousTransactions(data);
    } catch (error) {
      console.error("Error fetching previous transactions:", error);
    }
  };

  const loadTransactionsFromLocalStorage = () => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  };

  const AddTransactions = async (payload) => {
    const transactionArray = [...transactions, payload];
    setTransactions(transactionArray);
    saveTransactionsToLocalStorage(transactionArray);

    try {
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast.success("Transaction added!");
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const saveTransactionsToLocalStorage = (transactions) => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  };

  const handleEdit = (transaction) => {
    setIsEditing(true);
    setCurrentTransaction(transaction);
  };

  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter((item) => item.id !== id);
    setTransactions(updatedTransactions);
    saveTransactionsToLocalStorage(updatedTransactions);

    toast.success("Transaction deleted successfully!");

    // Optional: Send DELETE request to the backend
    fetch(`/api/transactions/${id}`, { method: "DELETE" });
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out successfully!");
    setTimeout(() => navigate("/login", { replace: true }), 1000);
  };

  useEffect(() => {
    loadTransactionsFromLocalStorage();
    fetchPreviousTransactions();
  }, []);

  useEffect(() => {
    let exp = 0, inc = 0;
    transactions.forEach((item) => {
      item.transType === "expense" ? (exp += item.amount) : (inc += item.amount);
    });
    setExpense(exp);
    setIncome(inc);
  }, [transactions]);

  return (
    <>
      <Navbar>
        <Heading>Expense Tracker</Heading>
        <NavLinks>
          <NavLink href="#">Overview</NavLink>
          <NavLink href="#">Transactions</NavLink>
        </NavLinks>
        <ProfileContainer>
          <ProfileButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
            Profile
          </ProfileButton>
          <DropdownMenu isOpen={isProfileOpen}>
            <DropdownItem href="#" onClick={handleLogout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </ProfileContainer>
      </Navbar>

      <Container>
        <OverviewComponent toggle={toggle} setToggle={setToggle} expense={expense} income={income} />
        {toggle && <AddTransaction setToggle={setToggle} AddTransactions={AddTransactions} />}
        <TransactionDetails>
          <ExpenseBox isExpense>Expense <span>₹{expense}</span></ExpenseBox>
          <IncomeBox>Income <span>₹{income}</span></IncomeBox>
        </TransactionDetails>
        
        {/* Table for Previous Transactions */}
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Details</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.details}</TableCell>
                <TableCell>₹{transaction.amount}</TableCell>
                <TableCell>{transaction.transType}</TableCell>
                <TableCell>
                  <Button edit onClick={() => handleEdit(transaction)}>Edit</Button>
                  <Button onClick={() => handleDelete(transaction.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>

        {/* Toast notifications */}
        <ToastContainer />
      </Container>
    </>
  );
};

export default Tracker;