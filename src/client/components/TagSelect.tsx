import React, { useState, useRef, useEffect } from 'react';
import { Divider, Input, Select, Space, Button, Form, message } from 'antd';
import type { InputRef } from 'antd';
import getTags from "@wasp/queries/getTags";
import createTag from '@wasp/actions/createTag';
import { useQuery } from '@wasp/queries';

export default function TagSelect() {
  const { data: tags, isLoading, error } = useQuery(getTags);
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
        await createTag({ name: newName });
    } catch (err: any){
      window.alert("Error: Could not make tag.");
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Form.Item name="tags" label="Tags">
    <Select
      mode="multiple"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Tag Name"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
            />
            <Button type="text" className='bg-gray-200' onClick={addItem} disabled={name.trim() ? false : true}>
              Add Tag
            </Button>
          </Space>
        </>
      )}
      options={tags?.map((tag) => ({ label: tag.name, value: tag.name }))}
    />
    </Form.Item>
  );
};