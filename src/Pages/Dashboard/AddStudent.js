import React from "react";
import { useForm } from "react-hook-form";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

const AddStudent = ({ setRefetcher }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const hideModal = () => {
    let modal = document.getElementById("modal-holder");
    modal.classList.remove("modal-open");
  };

  const onSubmit = (data) => {
    let modal = document.getElementById("modal-holder");
    modal.classList.remove("modal-open");

    let sendData = {
      name: data.stuName,
      stdClass: data.class,
      score: data.score,
    };

    fetch("https://wit-demo-server.herokuapp.com/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    }).then((data) => {
      if (data.status === 200) {
        reset();
        toast.success("Your data added successfully.");
        setRefetcher(true);
      }
    });
  };
  return (
    <div>
      <div id="modal-holder" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <h3 className="font-bold text-lg">Add Student</h3>
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
                {...register("stuName", { required: true })}
              />
              {errors.stuName && (
                <p className="text-red-500">Student name is required.</p>
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
                {...register("class", { required: true })}
              />
              {errors.class && (
                <p className="text-red-500">Student name is required.</p>
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
                {...register("score", { required: true })}
              />
              {errors.score && (
                <p className="text-red-500">Student name is required.</p>
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

export default AddStudent;
