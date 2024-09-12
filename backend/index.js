// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const RegisterModel = require('./models/Registermodel');

// app.use(express.json());
// app.use(cors());

// // MongoDB Atlas connection string
// mongoose.connect("mongodb+srv://sanjaikumar:Sanjai8898@srisakthi.ibhhuk6.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=SriSakthi").then(() => {
//     console.log("Connected to MongoDB Atlas");
// }).catch((err) => {
//     console.error("Error connecting to MongoDB Atlas:", err);
// });

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     RegisterModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 if (user.password == password) {
//                     res.json("success");
//                 } else {
//                     res.json("incorrect password");
//                 }
//             } else {
//                 res.json("user not found");
//             }
//         });
// });

// app.post('/register', (req, res) => {
//     const { email } = req.body;
//     RegisterModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 res.json({ message: "User already registered" });
//             } else {
//                 RegisterModel.create(req.body)
//                     .then(registers => res.json(registers))
//                     .catch(err => res.json(err));
//             }
//         })
//         .catch(err => res.json(err));
// });


// app.listen(3001, () => {
//     console.log("Server is running on port 3001");
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const RegisterModel = require('./models/RegisterModel'); // Registration Model
// const TransactionModel = require('./models/TransactionModel'); // Transaction Model

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB Atlas connection string
// mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/expense-tracker?retryWrites=true&w=majority")
//     .then(() => {
//         console.log("Connected to MongoDB Atlas");
//     })
//     .catch((err) => {
//         console.error("Error connecting to MongoDB Atlas:", err);
//     });

// // USER LOGIN AND REGISTRATION FUNCTIONALITY

// // Login Route
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     RegisterModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 if (user.password === password) {
//                     res.json("success");
//                 } else {
//                     res.json("incorrect password");
//                 }
//             } else {
//                 res.json("user not found");
//             }
//         });
// });

// // Register Route
// app.post('/register', (req, res) => {
//     const { email } = req.body;
//     RegisterModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 res.json({ message: "User already registered" });
//             } else {
//                 RegisterModel.create(req.body)
//                     .then(registers => res.json(registers))
//                     .catch(err => res.json(err));
//             }
//         })
//         .catch(err => res.json(err));
// });

// // TRANSACTION FUNCTIONALITY

// // Add Transaction Route
// app.post('/api/transactions', (req, res) => {
//     const { email, amount, details, transType } = req.body;
//     const newTransaction = new TransactionModel({
//         email,
//         amount,
//         details,
//         transType,
//     });

//     newTransaction.save()
//         .then(transaction => res.status(201).json(transaction))
//         .catch(error => res.status(500).json({ message: "Failed to add transaction", error }));
// });

// // Get Transactions Route
// app.get('/api/transactions', (req, res) => {
//     TransactionModel.find()
//         .then(transactions => res.json(transactions))
//         .catch(error => res.status(500).json({ message: "Failed to fetch transactions", error }));
// });

// // Start the server
// app.listen(3001, () => {
//     console.log("Server is running on port 3001");
// });




const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require('./models/RegisterModel'); // Registration Model
const TransactionModel = require('./models/TransactionModel'); // Transaction Model

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection string
mongoose.connect("mongodb+srv://sanjaikumar:Sanjai8898@srisakthi.ibhhuk6.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=SriSakthi")
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB Atlas:", err);
    });

// USER LOGIN AND REGISTRATION FUNCTIONALITY

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("success");
                } else {
                    res.json("incorrect password");
                }
            } else {
                res.json("user not found");
            }
        });
});

// Register Route
app.post('/register', (req, res) => {
    const { email } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json({ message: "User already registered" });
            } else {
                RegisterModel.create(req.body)
                    .then(registers => res.json(registers))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
});

// TRANSACTION FUNCTIONALITY

// Add Transaction Route
app.post('/api/transactions', (req, res) => {
    const { email, amount, details, transType } = req.body;
    const newTransaction = new TransactionModel({
        email,
        amount,
        details,
        transType,
    });

    newTransaction.save()
        .then(transaction => res.status(201).json(transaction))
        .catch(error => res.status(500).json({ message: "Failed to add transaction", error }));
});

// Get Transactions Route
app.get('/api/transactions', (req, res) => {
    TransactionModel.find()
        .then(transactions => res.json(transactions))
        .catch(error => res.status(500).json({ message: "Failed to fetch transactions", error }));
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});