import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import { TransactionType } from '../types/TransactionType';
import dayjs, {type Dayjs} from "dayjs";
import createOrUpdateTransaction from "@wasp/actions/createOrUpdateTransaction";
import CategorySelect from './CategorySelect';
import TagSelect from './TagSelect';
import { TransactionWTag } from '../utils';
const { TextArea } = Input;

export type TransactionModalHandle = {
  openModal: (transaction: TransactionWTag | null) => void,
}

type FieldType = {
  description: string,
  amount: string,
  category: string,
  date: Dayjs,
  notes: string,
  tags: string[],
  type: string
}

function formInitValues(transaction: TransactionWTag){
  return [
    {
      name: "description",
      value: transaction.description
    },
    {
      name: "amount",
      value: transaction.amount
    },
    {
      name: "category",
      value: transaction.categoryName
    },
    {
      name: "date",
      value: dayjs(transaction.date)
    },
    {
      name: "notes",
      value: transaction.notes
    },
    {
      name: "tags",
      value: transaction.tags.map(tag => tag.name)
    },
    {
      name: "type",
      value: transaction.type
    }
  ]
}

function TransactionModal({}, ref: React.ForwardedRef<TransactionModalHandle>){
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState<TransactionWTag|null>(null);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: (transaction: TransactionWTag | null = null) => {
      setTransaction(transaction);
      form.resetFields();
      if (transaction){
        form.setFields(formInitValues(transaction))
      }
      setOpen(true);
    }
  }));

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
    setTransaction(null);
  };

  async function handleSubmit(values: FieldType){
    setConfirmLoading(true);
    try {
      await createOrUpdateTransaction({
        id: transaction ? transaction.id : -1,
        description: values.description || "",
        amount: Number(values.amount) || 0.00,
        date: values.date.toDate() || new Date(),
        categoryName: values.category,
        notes: values.notes || "",
        tags: values.tags || [],
        type: values.type
      })
      setConfirmLoading(false);
      setOpen(false);
      setTransaction(null);
    } catch (err: any){
      window.alert(`Error: Could not ${transaction ? "edit" : "create"} transaction.`);
      setConfirmLoading(false);
      setOpen(false);
      setTransaction(null);
    }
  }

  const typeOptions = Object.entries(TransactionType).map(v => ({label: v[0], value: v[1]}));

  return (
    <>
      
      <Modal
        title={transaction ? "Edit Transaction" : "New Transaction"}
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

export default forwardRef(TransactionModal)