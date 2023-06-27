import { Card, Col, Row } from 'antd';
import React from 'react';
import Button from '../Button';
import './index.css'
const Cards = ({ showExpenseModal, showIncomeModal, income, expense }) => (
  <Row gutter={16} style={{ flexWrap: "wrap" }} >
    <Col span={8}>
      <Card style={{ boxShadow: "var(--shadow-box)", minWidth: "90px" }} title="Current Balance" bordered={true}>
        <p style={income - expense < 0 ? { color: "red" } : { color: "black" }}
        >
          {`$ ${income - expense}`}
        </p>
        <Button text="Reset Balance" onClick={null} blue={true} />
      </Card>
    </Col>
    <Col span={8}>
      <Card style={{ boxShadow: "var(--shadow-box)", minWidth: "90px" }} title="Total Income" bordered={true}>
        <p style={{ marginLeft: "1.1rem" }}>{`$ ${income}`}</p>
        <Button text="Add Income" onClick={showIncomeModal} blue={true} />
      </Card>
    </Col>
    <Col span={8}>
      <Card style={{ boxShadow: "var(--shadow-box)", minWidth: "90px" }} title="Total Expenses" bordered={true}>
        <p style={{ marginLeft: "1.1rem" }}>{`$ ${expense}`}</p>
        <Button text="Add Expenses" onClick={showExpenseModal} blue={true} />
      </Card>
    </Col>
  </Row>
);

export default Cards;