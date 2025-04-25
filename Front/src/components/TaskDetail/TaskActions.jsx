import Modal from "../Modal/Modal";

const TaskActions = ({ taskId, deleteTask, isModalOpen, closeModal }) => (
  <>
  {/* Se podrian agregar los iconos y botnoes del resto de las acciones y quitar el modal */}
    <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={() => deleteTask(taskId)} />
  </>
);

export default TaskActions