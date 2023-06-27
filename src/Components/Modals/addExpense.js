import React from 'react';
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
function AddExpense({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      open={isExpenseModalVisible}
      onCancel={()=>{
        form.resetFields();
        handleExpenseCancel();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
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
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            className="btn btn-bule"
            type="primary"
            htmlType="submit"
          >
            Add Expense
          </Button>
        </Form.Item>
      </Form>

    </Modal>
  )
}

export default AddExpense
