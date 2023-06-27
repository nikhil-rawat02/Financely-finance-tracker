import React from 'react'
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
function AddIncome({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish
}) {

  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Income"
      open={isIncomeModalVisible}
      onCancel={()=>{
        form.resetFields();
        handleIncomeCancel();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(value) => {
          onFinish(value, "income");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the  transaction!"
            }
          ]}
        >
          <Input type="text" className="custom_input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the income Amount!"
            }
          ]}
        >
          <Input type="number" className="custom_input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input the income Date!"
            }
          ]}
        >
          <DatePicker format="YYYY-MM-DD" className="custom_input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please select a tag!"
            }
          ]}
        >
          <Select className="select_input_2">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            className="btn btn-bule"
            type="primary"
            htmlType="submit"
          >
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncome
