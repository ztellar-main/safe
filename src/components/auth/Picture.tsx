import { useRef, useState } from "react";

type Props = {
  readablePicture: any;
  setPicture: any;
  setReadablePicture: any;
};

const Picture = ({
  readablePicture,
  setPicture,
  setReadablePicture,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");

  const handlePicture = async (e: any) => {
    const pic = e.target.files[0];
    // check picture type
    if (
      pic.type !== "image/png" &&
      pic.type !== "image/jpg" &&
      pic.type !== "image/jpeg" &&
      pic.type !== "image/webp" &&
      pic.type !== "image/svg"
    ) {
      setError(`${pic.name} format is not supported`);
      return;
    }
    // check picture size
    if (pic.size > 1024 * 1024 * 10) {
      setError(`${pic.name} is too large, maximum 10mb is allowed`);
      return;
    }
    // set the picture
    setError("");
    setPicture(pic);
    const reader = new FileReader();
    reader.readAsDataURL(pic);
    reader.onload = (e: any) => {
      if (e) {
        setReadablePicture(e.target.result);
      }
    };
  };

  //   Handle change pic
  const handleChangePic = () => {
    setPicture("");
    setReadablePicture("");
  };
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="picture"
            className="w-20 h-20 object-cover rounded-full"
          />
          {/* Change pic */}
          <div
            onClick={handleChangePic}
            className="w-20 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer mt-2 p-1"
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.click();
            }
          }}
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
        >
          Upload Picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpg,image/jpeg,image/svg,image/webp"
        onChange={handlePicture}
      />
      {
        <div className="mt-2">
          <p className="text-red-400">{error}</p>
        </div>
      }
    </div>
  );
};

export default Picture;
