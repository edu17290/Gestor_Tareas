import Header from "../Header/Header";
import TaskList from "../TasksList/TasksList";

const DashboardContainer = () => {
  return (
    <>
      <div
        className="container mt-2 p-0"
        style={{ width: "55%" }}
      >
        <Header />
        <TaskList />
      </div>
    </>
  );
};
export default DashboardContainer;
