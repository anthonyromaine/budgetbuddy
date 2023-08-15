import { useState } from "react";
import { Modal } from 'antd';
import deleteTransaction from "@wasp/actions/deleteTransaction";

type ConfirmDeleteModalProps = {
    open: boolean,
    deleteId: number | null,
    closeModal: () => void,
}

export default function ConfirmDeleteModal({ open, deleteId, closeModal }: ConfirmDeleteModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  if (!deleteId){
    closeModal();
  }

  async function handleOk() {
    setConfirmLoading(true);
    try {
      await deleteTransaction({
        id: deleteId!
      });
      setConfirmLoading(false);
      closeModal();
    } catch (err: any){
        setConfirmLoading(false);
        closeModal();
        window.alert('Error: Could not delete transaction');
    }
  }

  function handleCancel() {
    closeModal();
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