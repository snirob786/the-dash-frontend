import { faL, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditDashboard = ({ selectedItem, setSelectedItem, setRefetcher }) => {
  const [customName, setCustomName] = useState("");
  const [customClass, setCustomClass] = useState("");
  const [customScore, setCustomScore] = useState("");
  const [errorHandler, setErrorHandler] = useState(false);

  useEffect(() => {
    setCustomName(selectedItem.name);
    setCustomClass(selectedItem.stdClass);
    setCustomScore(selectedItem.score);
  }, [selectedItem]);

  useEffect(() => {
    if (customName === "" || customClass === "" || customScore === "") {
      setErrorHandler(true);
    } else {
      setErrorHandler(false);
    }
  }, [customName, customClass, customScore]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const hideModal = () => {
    let modal = document.getElementById("modal-holder-edit");
    modal.classList.remove("modal-open");
  };

  const onSubmit = (data) => {
    let modal = document.getElementById("modal-holder-edit");
    if (errorHandler === false) {
      const studentDetails = {
        name: customName,
        stdClass: customClass,
        score: customScore,
      };

      modal.classList.remove("modal-open");
      fetch(
        `https://wit-demo-server.herokuapp.com/students/${selectedItem._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(studentDetails),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRefetcher(true);
          if (data.modifiedCount > 0) {
            toast.success("Your data updated successfully.");
          }
        });
    }
  };

  return (
    <div>
      <div
        id="modal-holder-edit"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box relative">
          <h3 className="font-bold text-lg">Edit Student</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text flex items-center justify-center">
                  Student Name
                  <p className="pl-1" style={{ fontSize: "5px" }}>
                    <FontAwesomeIcon icon={faStar} />
                  </p>
                </span>
              </label>
              <input
                type="text"
                placeholder="Ex. John Doe"
                className="input input-bordered w-full max-w-xs"
                value={customName}
                {...register("stuName")}
                onChange={(e) => setCustomName(e.target.value)}
              />
              {customName === "" && (
                <p className="text-red-500">
                  Error: Name field cannot be left blank
                </p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text flex items-center justify-center">
                  Class
                  <p className="pl-1" style={{ fontSize: "5px" }}>
                    <FontAwesomeIcon icon={faStar} />
                  </p>
                </span>
              </label>
              <input
                type="text"
                placeholder="Ex. 7th, 8th, 9th..."
                className="input input-bordered w-full max-w-xs"
                value={customClass}
                {...register("class")}
                onChange={(e) => setCustomClass(e.target.value)}
              />
              {customClass === "" && (
                <p className="text-red-500">
                  Error: Please input values between 1st to 12th
                </p>
              )}
              <label className="label">
                <span className="label-text-alt">
                  Please input values between 1st, 2nd, 3rd,...,12th
                </span>
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text flex items-center justify-center">
                  Score
                  <p className="pl-1" style={{ fontSize: "5px" }}>
                    <FontAwesomeIcon icon={faStar} />
                  </p>
                </span>
              </label>
              <input
                type="number"
                placeholder="Ex. 0,1,2,...,100"
                className="input input-bordered w-full max-w-xs"
                value={customScore}
                {...register("score")}
                onChange={(e) => setCustomScore(e.target.value)}
              />
              {customScore === "" && (
                <p className="text-red-500">
                  Error: Score field cannot be left blank
                </p>
              )}
              <label className="label">
                <span className="label-text-alt">
                  Please input values between 0 to 100
                </span>
              </label>
            </div>

            <div className="modal-action">
              <label
                htmlFor="addItems"
                className="btn bg-white btn-md border-1 border-primary text-primary right-2 top-2"
                onClick={hideModal}
              >
                Cancel
              </label>
              <input
                className="modal-toggle btn btn-md border-0 bg-primary text-white relative min-w-max h-100 opacity-100"
                type="submit"
                value="Confirm"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDashboard;
