import React, { useEffect, useState }  from 'react'
import './index.css'
import Header from '../../Components/Header'
import Cards from '../../Components/Card'
import AddIncome from '../../Components/Modals/addIncome';
import AddExpense from '../../Components/Modals/addExpense';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import {toast} from 'react-toastify'
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment/moment';
function Dashboard() {
  const [user] = useAuthState(auth);

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  }

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  }

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  }

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values, type) => {
    const newTransaction = {
      amount : values.amount,
      type : type,
      date: moment(values.date).format("YYYY-MM-DD"),
      tag:values.tag,
      name:values.name
    }
    addTransaction(newTransaction);
  }

  async function addTransaction (transaction){
    try{
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      let newArray = transactions;
      newArray.push(transaction);
      setTransactions(newArray);
      console.log("newArray",newArray);
      calculateBalance();
      toast.success(`${transaction.type} Added!`)
    }catch(error){
      console.log("Error code => ", error.code)
      console.log("Error message => ", error.message)
    }
  }
  
  async function fetchTransactions () {
    setLoading(true);
    console.log(user);
    if(user){
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnap = await getDocs(q);
      setTransactions(prev => []);
      console.log(querySnap);
      querySnap.forEach(doc => {
        setTransactions(prev => [...prev, doc.data()])
      })
    }
    setLoading(false);
  }
  console.log(transactions);

  useEffect(()=>{
    try{
        fetchTransactions();
      console.log("calling fetch transaction") 
    }catch(error){
      console.log("Error Code => ", error.code);
      console.log("Error Message => ", error.message);
    }
  },[]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach(trans => {
      if(trans.type === "income"){
        incomeTotal += parseFloat(trans.amount);
      }else if(trans.type === 'expense'){
        expenseTotal += parseFloat(trans.amount);
      }
    })
    setIncome(incomeTotal);
    setExpense(expenseTotal);  
  }
  useEffect(()=>{
    calculateBalance();
  },[transactions]);

  return (
    <div>
      <Header />
      <div className="account_details_cards_container">
        <Cards
          showExpenseModal={showExpenseModal}
          showIncomeModal={showIncomeModal}
          income={income}
          expense={expense}
        />
      </div>

      <AddIncome
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
        />
      <AddExpense
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
    </div>
  )
}

export default Dashboard
