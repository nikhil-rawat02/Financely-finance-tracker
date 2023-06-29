import React, { useEffect, useState } from 'react';
import { Select, Table, Radio } from 'antd';
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';
import Button from "../../Components/Button";
import './style.css';
function TransactionTable({
    transactions,
    addTransaction,
    fetchTransactions
}) {

    const [x, setx] = useState(window.innerWidth);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [mediaScreen, setMediaScreen] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => { setx(window.innerWidth) })
        if (x < 480) {
            setMediaScreen(true);
        } else {
            setMediaScreen(false);
        }
        return window.removeEventListener("resize", () => { setx(window.innerWidth) })
    }, [x])

    const handleImportCSV = (event) => {
        event.preventDefault();
        try {
            parse(event.target.files[0], {
                header: true,
                complete: async function (res) {
                    for (const transaction of res.data) {
                        const newTransaction = {
                            ...transaction,
                            amount: parseInt(transaction.amount),
                        };
                        await addTransaction(newTransaction, true);
                    }
                },
            });
            toast.success("All transaction added");
            fetchTransactions();
            event.target.files = null;
        } catch (error) {
            console.log("Error code => ", error.code);
            console.log("Error message => ", error.message)
        }
    }

    const handleExportCSV = () => {
        var csv = unparse({
            fields: ["name", "type", "tag", "date", "amount"],
            data: transactions
        });
        var blob = new Blob([csv], { type: 'text/csv;charset=uft-8;' })

        var csvURL = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = csvURL;
        link.download = "transaction.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const searchBarStyle = {

        padding: "0.8rem 0",

        outline: "none",
        minWidth: "100px",
        borderRadius: "10px",
        border: "none",
        background: "whitesmoke",


    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",

        },
        {
            title: "Amount",
            dataIndex: "amount",

        },
        !mediaScreen ?
            {
                title: "Tag",
                dataIndex: "tag",

            } : {}
        ,
        {
            title: "Type",
            dataIndex: "type",

        },
        {
            title: "Date",
            dataIndex: "date",

        },
    ]

    let filterTransaction = [];
    let sortedTransaction = [];

    try {
        filterTransaction = transactions.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) &&
            item.type.includes(typeFilter));

        sortedTransaction = filterTransaction && filterTransaction.sort((a, b) => {
            if (sortKey === 'date') {
                return new Date(a.date) - new Date(b.date);
            } else if (sortKey === "amount") {
                return a.amount - b.amount;
            } else {
                return 0;
            }
        });
    } catch (error) {
        console.log("error code => ", error.code);
        console.log("error message => ", error.message);
    }
    return (
        <div className='dashboard-container'>
            <div className="search-bar">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)} placeholder='Search by Name'
                    style={searchBarStyle} />
            </div>
            <Select
                style={{
                    width: "20%",
                    minWidth: "100px", margin: "0.5rem 2.0rem",
                    padding: " 0.6rem 0rem"
                }}
                onChange={value => setTypeFilter(value)}
                placeholder="Filter"
                value={typeFilter}
                allowClear
            >
                <Select.Option value="">All</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
            </Select>
            <div className="filter-csv-container">
                <Radio.Group
                    onChange={e => setSortKey(e.target.value)}
                    value={sortKey}
                    style={{
                        margin: "0.5rem 2rem",
                        padding: " 0.6rem 0rem"
                    }}
                >
                    <Radio.Button value="">No Sort</Radio.Button>
                    <Radio.Button value="amount">Sort by Amount</Radio.Button>
                    <Radio.Button value="date">Sort by Date</Radio.Button>
                </Radio.Group>
                <div className="csv-container">
                    <label
                        className='btn'
                        htmlFor='file-csv'
                    > Import CSV
                    </label>
                    <input type="file"
                        id='file-csv'
                        required
                        onChange={handleImportCSV}
                        style={{ display: "none" }}
                    />
                    <Button text="Export CSV" blue={true} onClick={handleExportCSV} />
                </div>
            </div>
            <Table
                dataSource={sortedTransaction && sortedTransaction} columns={columns}
            />
        </div>
    )
}

export default TransactionTable
