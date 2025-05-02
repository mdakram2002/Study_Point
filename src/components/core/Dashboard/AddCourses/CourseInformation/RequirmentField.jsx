/*
 * @Important @Code / @SaveThisCodeForFuture
 */
import React, { useEffect, useState } from "react";

export const RequirmentField = ({
  name,
  label,
  error,
  setValue,
  getValues,
  register,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  return (
    <div>
      <label htmlFor={name}  className="text-richblack-25 text-[16px]">{label}<sup className="text-pure-reds-300">*</sup></label>
      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full bg-richblack-700 placeholder:text-richblack-300 rounded-md p-1 mt-1"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="text-yellow-50 font-semibold mt-2"
        >
          Add
        </button>
      </div>
      {/* remove or clear logic  */}
      {requirementList.length > 0 && (
        <ul className="text-white">
          {requirementList.map((requirement, index) => (
            <li
              key={index}
              className="flex gap-2 items-start text-richblack-50"
            >
              <sapn>{requirement}</sapn>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-richblack-300 text-sm  py-0.5 px-2 rounded-md bg-richblack-700"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {error[name] && <span>{label} is required</span>}
    </div>
  );
};
