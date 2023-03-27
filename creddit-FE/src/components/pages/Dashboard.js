import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import { useTable } from "react-table";

const Styles = styled.div`
  background: #293225;
  height: 83.3vh;
  
  input {
    margin: 1em;
    padding: 5px;
    width: 10em;
    border-radius: 3px;
    border: 1px solid #dcdcdc;
}
  form {
  display: flex;
}
  .modal-block{
    background: white;
    display: grid;
    // grid-gap: 2px;
    border-radius: 25px;
    margin-left: 351.708px;
    margin-right: 6em;
    margin-bottom: 1em;
    padding: 2em;
    height: 21em;
  }
  .button-60{
    background-color: #fff;
    border: 1px solid #dbdbdb;
    box-sizing: border-box;
    color: #363636;
    cursor: pointer;
    border-radius: .375em;
    padding: calc(.5em - 1px) 0.75em;
    height: 2.5em;
  }
  `
const Tab = styled.button`
font-size: 15px;
padding: 10px;
cursor: pointer;
opacity: 0.6;
background: white;
border: 0;
outline: 0;

${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`
const TabGroup = styled.div`
  display: flex;
`
const types = ['Payment', 'Transfer', 'Withdraw', 'Deposit'];

export const Dashboard = () => {
  const debitData = [
    {
      debitCard: "Chequing",
      cardId: "1234 5678 9012 3456",
      totalAmount: 1000
    },
    {
      debitCard: "Savings",
      cardId: "9876 5432 1098 7654",
      totalAmount: 500
    }
  ];

  const creditData = [
    {
      card: "Creddit",
      cardId: "567890",
      totalAmount: 2000
    },
    {
      card: "Creddit",
      cardId: "432109",
      totalAmount: 800
    }
  ]

  const newDebitData = [];
  debitData.forEach((cardObj) => {
    newDebitData.push({
      debitCard: cardObj.debitCard,
      cardId: cardObj.cardId,
      totalAmount: cardObj.totalAmount
    });
  });

  const newCreditData = [];
  creditData.forEach((cardObj) => {
    newCreditData.push({
      card: cardObj.card,
      cardId: cardObj.cardId,
      totalAmount: cardObj.totalAmount
    })
  })

  const debitColumns = React.useMemo(
    () => [
      {
        Header: "Debit Cards",
        accessor: "debitCard"
      },
      {
        Header: "Card Number",
        accessor: "cardId"
      },
      {
        Header: "Total Amount",
        accessor: "totalAmount"
      }
    ],
    []
  );

  const creditColumns = React.useMemo(
    () => [
      {
        Header: "Creddit Cards",
        accessor: "card"
      },
      {
        Header: "Card Number",
        accessor: "cardId"
      },
      {
        Header: "Total Amount",
        accessor: "totalAmount"
      }
    ],
    []
  );

  const {
    getTableProps: getDebitTableProps,
    getTableBodyProps: getDebitTableBodyProps,
    headerGroups: debitHeaderGroups,
    rows: debitRows,
    prepareRow: prepareDebitRow
  } = useTable({ columns: debitColumns, data: newDebitData });

  const {
    getTableProps: getCreditTableProps,
    getTableBodyProps: getCreditTableBodyProps,
    headerGroups: creditHeaderGroups,
    rows: creditRows,
    prepareRow: prepareCreditRow
  } = useTable({ columns: creditColumns, data: newCreditData });

  const [active, setActive] = useState(types[0]);
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <>
      <Sidebar />
      <Styles>
        <div className="modal-block">
          <h1>Account Summary</h1>
          <table {...getDebitTableProps()}>
            <thead>
              {debitHeaderGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getDebitTableBodyProps()}>
              {debitRows.map((row, i) => {
                prepareDebitRow(row);
                return (
                  <tr {...row.getRowProps()} onClick={() => console.log(row.original)}>
                    {row.cells.map((cell, j) => {
                      return (
                        <td
                          rowSpan={cell.rowSpan}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <table {...getCreditTableProps()}>
            <thead>
              {creditHeaderGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getCreditTableBodyProps()}>
              {creditRows.map((row, i) => {
                prepareCreditRow(row);
                return (
                  <tr {...row.getRowProps()} onClick={() => console.log(row.original)}>
                    {row.cells.map((cell, j) => {
                      return (
                        <td
                          rowSpan={cell.rowSpan}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="modal-block">
          <TabGroup>
            {types.map((type) => (
              <Tab
                key={type}
                active={active === type}
                onClick={() => setActive(type)}
              >
                {type}
              </Tab>
            ))}
          </TabGroup>
          <p />
          {active === 'Payment' && (
            <form onSubmit={(event) => {
              event.preventDefault();
              console.log('Submitting cash form with data:', formData);
              // TODO: Add code to submit form data to server or perform other actions
            }}>
              <div>
                <label>
                  From Account:
                  <input
                    type="text"
                    name="fromAccount"
                    value={formData.fromAccount || ''}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Account Type:
                  <input
                    type="text"
                    name="accountType"
                    value={formData.accountType || ''}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button type="submit" className="button-60">Submit</button>
              </div>
              <div>
                <label>
                  To:
                  <input
                    type="text"
                    name="sendee"
                    value={formData.sendee || ''}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Amount:
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount || ''}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </form>
          )}
          {active === 'Transfer' && (
            <form onSubmit={(event) => {
              event.preventDefault();
              console.log('Submitting cash form with data:', formData);
              // TODO: Add code to submit form data to server or perform other actions
            }}>
              <div>
                <label>
                  From Account:
                  <input
                    type="text"
                    name="fromAccount"
                    value={formData.fromAccount || ''}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Account Type:
                  <input
                    type="text"
                    name="accountType"
                    value={formData.accountType || ''}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button type="submit" className="button-60">Submit</button>
              </div>
              <div>
                <label>
                  To:
                  <input
                    type="text"
                    name="sendee"
                    value={formData.sendee || ''}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Amount:
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount || ''}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

            </form>
          )}
          {active === 'Withdraw' && (
            <form onSubmit={(event) => {
              event.preventDefault();
              console.log('Submitting cash form with data:', formData);
              // TODO: Add code to submit form data to server or perform other actions
            }}>
              <div>
                <label>
                From Account:
                <input
                  type="text"
                  name="fromAccount"
                  value={formData.fromAccount || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Account Type:
                <input
                  type="text"
                  name="accountType"
                  value={formData.accountType || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Amount:
                <input
                  type="text"
                  name="amount"
                  value={formData.amount || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <button type="submit" className="button-60">Submit</button>
              </div>
            </form>
          )}
          {active === 'Deposit' && (
            <form onSubmit={(event) => {
              event.preventDefault();
              console.log('Submitting cash form with data:', formData);
              // TODO: Add code to submit form data to server or perform other actions
            }}>
              <div>
                <label>
                From Account:
                <input
                  type="text"
                  name="fromAccount"
                  value={formData.fromAccount || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                To:
                <input
                  type="text"
                  name="sendee"
                  value={formData.sendee || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Amount:
                <input
                  type="text"
                  name="amount"
                  value={formData.amount || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <button type="submit" className="button-60">Submit</button>
              </div>
            </form>
          )}
        </div>
      </Styles>
    </>
  )
}
