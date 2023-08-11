import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import { TransactionType } from '../types/TransactionType';
import dayjs, {type Dayjs} from "dayjs";
import createTransaction from "@wasp/actions/createTransaction";
import CategorySelect from './CategorySelect';
import TagSelect from './TagSelect';
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

  async function handleSubmit(values: FieldType){
    setConfirmLoading(true);
    try {
      await createTransaction({
        description: values.description || "",
        amount: Number(values.amount) || 0.00,
        date: values.date.toDate() || new Date(),
        categoryName: values.category,
        notes: values.notes || "",
        tags: values.tags || [],
        type: values.type
      })
      setOpen(false);
    } catch (err: any){
      window.alert("Error: Could not create transaction.")
      setConfirmLoading(false);
    }
  }

  function handleSubmitFailed(){
    
  }

  const typeOptions = Object.entries(TransactionType).map(v => ({label: v[0], value: v[1]}));

  type FieldType = {
    description: string,
    amount: string,
    category: string,
    date: Dayjs,
    notes: string,
    tags: string[],
    type: string
  }

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

          <Form.Item<FieldType> name="description" label="Description" rules={
            [
              {required: true, message: "Description must not be empty",validator(_rule, value) {
                if (value.trim()){
                  return Promise.resolve()
                } else {
                  return Promise.reject(new Error('Description must not be empty.'))
                }
              }}
            ]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> name="amount" label="Amount" rules={[{required: true, message: "Amount must not be empty"}]}>
            <InputNumber min="0.00" step="0.01" stringMode precision={2}/>
          </Form.Item>

          <Form.Item<FieldType> name="type" label="Type" rules={[{required: true, message: "Type must not be empty"}]}>
            <Select options={typeOptions} />
          </Form.Item>

          <Form.Item<FieldType> name="date" label="Date" rules={[{required: true, message: "Date must not be empty"}]}>
            <DatePicker />
          </Form.Item>

          <CategorySelect />

          <TagSelect />

          <Form.Item<FieldType> name="notes" label="Notes">
            <TextArea />
          </Form.Item>

        </Form>
      </Modal>
    </>
  )
}