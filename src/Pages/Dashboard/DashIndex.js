import React, { useEffect, useState } from "react";
import "./DashIndex.css";
import DashItems from "./DashItems";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddStudent from "./AddStudent";
import EditDashboard from "./EditDashboard";
import DeleteDashboard from "./DeleteDashboard";

const DashIndex = () => {
  const [students, setStudents] = useState([]);
  const [refetcher, setRefetcher] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  useEffect(() => {
    fetch("https://wit-demo-server.herokuapp.com/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
    setRefetcher(false);
  }, [refetcher]);

  const handleAddItemClicks = () => {
    let modal = document.getElementById("modal-holder");
    modal.classList.add("modal-open");
  };

  return (
    <div>
      <div className="menu hidden md:block">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="p-4">
        <div className="title-page flex justify-between items-center">
          <h2 className="font-medium text-lg">Student</h2>
          <label
            htmlFor="addItems"
            className="btn modal-button bg-primary text-white border-0 shadow-sm px-5 py-3"
            onClick={handleAddItemClicks}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="pl-1">Add</span>
          </label>
        </div>
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Result</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <DashItems
                    key={student._id}
                    index={index}
                    student={student}
                    setSelectedItem={setSelectedItem}
                  ></DashItems>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>No.</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Result</th>
                  <th>Score</th>
                  <th>Grade Login</th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <AddStudent setRefetcher={setRefetcher}></AddStudent>
        <EditDashboard
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setRefetcher={setRefetcher}
        ></EditDashboard>
        <DeleteDashboard
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setRefetcher={setRefetcher}
        ></DeleteDashboard>
      </div>
    </div>
  );
};

export default DashIndex;
