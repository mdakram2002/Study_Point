
import React, { useState, useEffect } from "react";

export const TagInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [tags, setTags] = useState([]);

  // Register the field and initialize tags from form data
  useEffect(() => {
    if (!register || !getValues) return;
    register(name, { required: true });

    const existingTags = getValues(name);
    if (Array.isArray(existingTags)) {
      setTags(existingTags);
    } else {
      setTags([]);
    }
  }, [register, name, getValues]);

  // Handle Enter key press to add a tag
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      event.preventDefault();
      const newTag = event.target.value.trim();

      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        setValue(name, updatedTags);
      }
      event.target.value = "";
    }
  };

  // Remove tag function
  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue(name, updatedTags);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}  className="text-richblack-25 text-[16px]">
        {label}
        <sup className="text-pure-reds-300">*</sup>
      </label>
      <div className="flex flex-wrap gap-2 bg-richblack-700 p-2 rounded-md">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-richblack-600 text-white px-2 py-1 rounded-md"
          >
            <span>{tag}</span>
            <button
              type="button"
              className="ml-2 text-pure-reds-400 hover:text-pure-reds-600"
              onClick={() => removeTag(index)}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          id={name}
          placeholder={placeholder}
          className="bg-transparent outline-none text-white flex-1 mt-0"
          onKeyDown={handleKeyDown}
        />
      </div>
      {errors[name] && (
        <span>{label} is required</span>
      )}
    </div>
  );
};
