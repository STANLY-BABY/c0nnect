import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "@mantine/core";
import { updateCoverePic, updateProfilePic } from "../../../actions/userAction";

const UpdateUserImages = ({ showModal, setShowModal, image, cover }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChangeProfile = () => {
    const data = new FormData();
    data.append("file", image);
    dispatch(updateProfilePic(user._id, data));
    setShowModal(false);
  };
  const handleChangeCover = () => {
    const data = new FormData();
    data.append("file", image);
    dispatch(updateCoverePic(user._id, data));
    setShowModal(false);
  };

  return (
    <Modal size="55%" opened={showModal} onClose={() => setShowModal(false)}>
      <div className="changeImage">
        {cover ? (
          <h1 className="text-center mb-5 text-2xl font-semibold">
            Update Cover Picture
          </h1>
        ) : (
          <h1 className="text-center mb-5 text-2xl font-semibold">
            Update Profile Picture
          </h1>
        )}
        <img src={URL.createObjectURL(image)} alt="" />
        {cover ? (
          <button
            className=" mt-2 bg-[#a974ff] text-white font-medium py-1 px-2 w-20 border  border-white rounded"
            onClick={handleChangeCover}
          >
            Update
          </button>
        ) : (
          <button
            className="mt-2 bg-[#a974ff] text-white font-medium py-1 px-2 w-20 border  border-white rounded"
            onClick={handleChangeProfile}
          >
            Update
          </button>
        )}
      </div>
    </Modal>
  );
};

export default UpdateUserImages;
