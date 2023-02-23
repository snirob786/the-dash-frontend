import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DeleteDashboard = ({ selectedItem, setSelectedItem, setRefetcher }) => {
  const [customName, setCustomName] = useState("");
  const [customClass, setCustomClass] = useState("");
  useEffect(() => {
    setCustomName(selectedItem.name);
    setCustomClass(selectedItem.stdClass);
  }, [selectedItem]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const hideModal = () => {
    let modal = document.getElementById("modal-holder-delete");
    modal.classList.remove("modal-open");
  };

  const onSubmit = (data) => {
    let modal = document.getElementById("modal-holder-delete");
    modal.classList.remove("modal-open");
    fetch(
      `https://wit-demo-server.herokuapp.com/students/${selectedItem._id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        toast.success(`${selectedItem.name} is deleted successfully.`);
        setRefetcher(true);
      });
  };
  return (
    <div>
      <div
        id="modal-holder-delete"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box relative">
          <h3 className="font-bold text-lg pb-5 border-b">Remove student</h3>
          <h2 className="font-medium text-md pt-5">
            Are you sure you want to remove the current student from the list?
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text flex items-center justify-center">
                  Student Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Ex. John Doe"
                className="input input-bordered w-full"
                value={customName}
                {...register("stuName")}
                disabled
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text flex items-center justify-center">
                  Class
                </span>
              </label>
              <input
                type="text"
                placeholder="Ex. John Doe"
                className="input input-bordered w-full"
                value={customClass}
                {...register("class")}
                disabled
              />
            </div>

            <div className="modal-action border-t pt-5">
              <label
                htmlFor="addItems"
                className="btn bg-white btn-md border-1 border-primary text-primary right-2 top-2"
                onClick={hideModal}
              >
                Cancel
              </label>
              <input
                className="modal-toggle btn btn-md border-0 bg-red-500 text-white relative min-w-max h-100 opacity-100"
                type="submit"
                value="Remove"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteDashboard;
