import React, { useState, useRef } from 'react';
import { Divider, Input, Select, Space, Button, Form } from 'antd';
import type { InputRef } from 'antd';
import getCategories from "@wasp/queries/getCategories";
import createCategory from '@wasp/actions/createCategory';
import { useQuery } from '@wasp/queries';

export default function CategorySelect() {
  const { data: categories, isLoading, error } = useQuery(getCategories);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    try {
        const newName = name.trim();
        setName('');
        await createCategory({ name: newName });
    } catch (err: any){
        window.alert('Error: Could not create category.');
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Form.Item name="category" label="Category" rules={[{required: true, message: "Category must not be empty"}]}>
    <Select
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Category Name"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
            />
            <Button type="text" className='bg-gray-200' onClick={addItem} disabled={name.trim() ? false : true}>
              Add Category
            </Button>
          </Space>
        </>
      )}
      options={categories?.map((category) => ({ label: category.name, value: category.name }))}
    />
    </Form.Item>
  );
};