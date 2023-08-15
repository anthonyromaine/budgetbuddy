import { useState, ForwardedRef, useImperativeHandle, forwardRef } from "react";
import { Modal } from 'antd';
import deleteTransaction from "@wasp/actions/deleteTransaction";

export type ConfirmDeleteModalHandle = {
    openModal: (deleteId: number) => void
}

function ConfirmDeleteModal({}, ref: ForwardedRef<ConfirmDeleteModalHandle>) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number|null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: (deleteId: number) => {
        setId(deleteId);
        setOpen(true);
    }
  }))

  async function handleOk() {
    setConfirmLoading(true);
    try {
      if (!id){
        throw new Error('No ID defined!');
      }
      await deleteTransaction({
        id
      });
      setConfirmLoading(false);
      setOpen(false);
    } catch (err: any){
        setConfirmLoading(false);
        setOpen(false);
        window.alert('Error: Could not delete transaction');
    }
  }

  function handleCancel() {
    setId(null);
    setOpen(false);
  }

  return (
    <>
      <Modal
        title="Delete Transaction"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Yes"
        okButtonProps={{ className: "btn-danger"}}
        cancelText="No"
      >
        <p>Are you sure you want to delete this transaction? This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export default forwardRef(ConfirmDeleteModal);