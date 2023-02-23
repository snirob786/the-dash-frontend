import React from "react";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashItems = ({ student, index, setSelectedItem }) => {
  let result = "";
  let grade = "";
  if (student.score < 33) {
    result = "Failed";
    grade = "Poor";
  } else if (student.score > 33 && student.score < 80) {
    result = "Passed";
    grade = "Average";
  } else {
    result = "Passed";
    grade = "Excellent";
  }
  const handleEdit = () => {
    let modal = document.getElementById("modal-holder-edit");
    modal.classList.add("modal-open");
    setSelectedItem(student);
  };

  const handleDelete = () => {
    let modal = document.getElementById("modal-holder-delete");
    modal.classList.add("modal-open");
    setSelectedItem(student);
  };
  return (
    <tr className="border">
      <th>{index + 1}</th>
      <td>{student.name}</td>
      <td>{student.stdClass}</td>
      <td>
        <span
          className={
            result === "Passed"
              ? "bg-green-500 text-white px-3 py-1 rounded-full text-center"
              : "bg-red-500 text-white px-3 py-1 rounded-full text-center"
          }
        >
          {result}
        </span>
      </td>
      <td>{student.score}/100</td>
      <td>
        {grade === "Poor" && (
          <span className="text-red-500 font-medium text-sm text-center">
            {grade}
          </span>
        )}

        {grade === "Average" && (
          <span className="text-primary font-medium text-sm text-center">
            {grade}
          </span>
        )}

        {grade === "Excellent" && (
          <span className="text-green-500 font-medium text-sm text-center">
            {grade}
          </span>
        )}
      </td>
      <td className="icon-tool" onClick={handleEdit}>
        <FontAwesomeIcon icon={faPen} />
      </td>
      <td className="icon-tool" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

export default DashItems;
