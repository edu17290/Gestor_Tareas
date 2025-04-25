import Modal from "../Modal/Modal";

const TaskActions = ({ taskId, deleteTask, isModalOpen, closeModal }) => (
  <>
    <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={() => deleteTask(taskId)} />
  </>
);

export default TaskActions