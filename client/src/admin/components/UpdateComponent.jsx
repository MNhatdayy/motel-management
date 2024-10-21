import { Modal, Button, Radio } from "antd";

const UpdateModal = ({ show, onCancel, onConfirm, statusToUpdate, setStatusToUpdate }) => {
  return (
    <Modal
    open={show}
    title="Cập nhật trạng thái đặt phòng"
    onCancel={onCancel}
    footer={[
      <Button key="cancel" onClick={onCancel}>
        Cancel
      </Button>,
      <Button key="update" type="primary" onClick={onConfirm}>
        Xác nhận
      </Button>,
    ]}
  >
    <p>Xác nhận chuyển trạng thái</p>
  </Modal>
  );
};

export default UpdateModal;