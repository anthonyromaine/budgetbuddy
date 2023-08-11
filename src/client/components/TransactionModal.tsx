import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import { TransactionType } from '../types/TransactionType';
import dayjs from "dayjs";
const { TextArea } = Input;

export default function TransactionModal(){
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    form.resetFields();
    setOpen(true);
  };

  const handleOk = () => {
    form.submit();
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  function handleSubmit(values: any){
    setConfirmLoading(true);
    console.log('submitted')
  }

  function handleSubmitFailed(){
    
  }

  const typeOptions = Object.entries(TransactionType).map(v => ({label: v[0], value: v[1]}));

  return (
    <>
      <Button type="primary" className="bg-blue-600" onClick={showModal}>
        Add Transaction
      </Button>
      <Modal
        title="New Transaction"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{className: "bg-blue-600"}}
        okText="Save"
      >
        <Form
          form={form}
          autoComplete='off'
          autoCorrect='off'
          layout='vertical'
          initialValues={{type: typeOptions[0].value, date: dayjs()}}
          onFinish={handleSubmit}
          onFinishFailed={handleSubmitFailed}
        >

          <Form.Item name="description" label="Description" rules={[{required: true}]}>
            <Input />
          </Form.Item>

          <Form.Item name="amount" label="Amount" rules={[{required: true}]}>
            <InputNumber min="0.00" step="0.01" stringMode precision={2}/>
          </Form.Item>

          <Form.Item name="type" label="Type" rules={[{required: true}]}>
            <Select options={typeOptions} />
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[{required: true}]}>
            <DatePicker />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{required: true}]}>
            <Select options={[]} />
          </Form.Item>

          <Form.Item name="tags" label="Tags">
            <Select mode="multiple" options={[]} />
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <TextArea />
          </Form.Item>

        </Form>
      </Modal>
    </>
  )
}