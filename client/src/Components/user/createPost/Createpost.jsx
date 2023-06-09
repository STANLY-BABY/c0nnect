import React, { useRef, useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../../actions/uploadAction";
function Createpost({ profileData }) {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  // const loading = useSelector((state) => state.upload.uploading)
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const descRef = useRef();
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      if (!validFileTypes.find((type) => type === img.type)) {
      } else {
        setImage(img);
      }
    }
  };

  const reset = () => {
    setImage(null);
    descRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("userId", user._id);
      data.append("desc", descRef.current.value);
      data.append("name", filename);
      data.append("file", image);
      dispatch(uploadPost(data));
    } else {
      const data = new FormData();
      data.append("userId", user._id);
      data.append("desc", descRef.current.value);
      dispatch(uploadPost(data));
    }
    reset();
  };

  return (
    <div className=" bg-white md:mx-0  mx-2 h-auto mb-5 mt-5  pt-3 flex-wrap flex-col rounded-xl shadow-md shadow-grey-500/40 px-2">
      <div className="flex justify-center pt-5 flex-wrap">
        <img
          src={
            user?.profilePicture
              ? user?.profilePicture
              : "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
          }
          alt="..."
          className=" shadow rounded-full border-2 border-pink-400 max-w-full h-14  w-14 mr-5 "
        />
        <input
          ref={descRef}
          required
          className="shadow border-blue-200 appearance-none border rounded-full lg:w-[85%] md:w-[77%] w-[73%] h-12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline font-medium"
          type="text"
          placeholder="Whats on your Mind"
          name="desc"
        />
      </div>
      <div className="flex justify-around m-4 flex-wrap items-center ">
      <div className="flex ">
      <div
          className="flex cursor-pointer "
          onClick={() => imageRef.current.click()}
        >
          <AddPhotoAlternateOutlinedIcon className="mr-2" />
          <p className="xl:mr-10 lg:mr-8 md:mr-6 mr-2">Photo</p>
        </div>
        <div className="flex cursor-pointer">
          <OndemandVideoOutlinedIcon className="mr-2" />
          <p className="xl:mr-20 lg:mr-8 md:mr-6">Video</p>
        </div>

      </div>
        <button
          onClick={handleSubmit}
          type="button"
          className="  xl:ml-60   bg-[#a974ff] text-white font-medium py-1 px-2 w-20 border  border-white rounded"
        >
          Post
        </button>
 
        <div style={{ display: "none" }}>
          <input
            type="file"
            name="myImage"
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>
      </div>
      <div className="flex justify-center">
        {image && (
          <div>
            <div className="imagePreview">
              <CloseIcon
                onClick={() => setImage(null)}
                className="float-right"
              />
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Createpost;
