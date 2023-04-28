import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, useMantineTheme } from "@mantine/core";
import { updateCoverePic, updateProfilePic } from "../../../actions/userAction";

// import { UpdateCoverPicture, UpdateProfilePicture } from '../../../../../server/Controller/UserController';

const UpdateUserImages = ({ showModal, setShowModal, image, cover }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const theme = useMantineTheme();
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
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={showModal}
      onClose={() => setShowModal(false)}
    >
      <div className="changeImage">
        <h1>hh</h1>
        <img src={URL.createObjectURL(image)} alt="" />
        {cover ? (
          <button onClick={handleChangeCover}>Update</button>
        ) : (
          <button onClick={handleChangeProfile}>Update</button>
        )}
      </div>
    </Modal>
  );
};

export default UpdateUserImages;
