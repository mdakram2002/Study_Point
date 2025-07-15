
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

import "video-react/dist/video-react.css";
import { Player } from "video-react";

export const FileUpload = ({
  label,
  name,
  register,
  setValue,
  errors,
  videoFile = false,
  viewData = false,
  editData = null,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  // const inputRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    if (register) {
      register(name, { required: true });
    }
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, name, setValue]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !videoFile
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-[15px] text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pure-reds-300">*</sup>
      </label>
      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {/* <input {...getInputProps()} ref={inputRef} /> */}
        <input {...getInputProps()} />
        {previewSource ? (
          <div className="flex w-full flex-col p-5">
            {videoFile ? (
              <Player
                playsInline
                src={previewSource}
                className="h-full w-full rounded-md"
              />
            ) : (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => {
                setPreviewSource("");
                setSelectedFile(null);
                setValue(name, null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="mt-3 text-richblack-400 underline"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an image, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors?.[name] && (
        <span className="text-[15px] tracking-wide text-richblack-5">
          {label} is required
        </span>
      )}
    </div>
  );
};