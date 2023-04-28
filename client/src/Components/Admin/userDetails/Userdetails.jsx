import React, { useEffect, useState } from "react";
import { Modal, useMantineTheme, ScrollArea } from "@mantine/core";
import { useDispatch } from "react-redux";
// import Swal from 'sweetalert2';
// import { getPosts } from '../../api/request';


import "./userdetail.scss";
import { blockUser } from "../api/request";
// import { blockUser } from '../../slice/Adminslice';

const Userdetails = ({ user, modal, setModal }) => {
  const theme = useMantineTheme();
  const [posts, setPosts] = useState([]);
  const [block, setBlock] = useState(user?.isAllowed);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const getpost = async () => {
  //       const { data } = await getPosts(user._id)
  //       setPosts(data)
  //   };
  //   return () => getpost();
  // }, []);
  const blockuser = (id) => {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: `You want to ${block?"unblock":"block"} this user!`,
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: `Yes, ${block?"unblock":"block"} it!`
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     // dispatch(blockUser((id)))
    //     setBlock(!block)
    //   }
    // })
    blockUser(id);
    setBlock(!block);
  };
  const customTitle = (
    <div className="userdetailsheader">
      <div>
        <p style={{ fontSize: "17px", color: "#171717" }}>
          {user.username} details
        </p>
      </div>
      <div>
        <button
          className={block ? "button-block" : "button-unblock"}
          onClick={() => {
            blockuser(user._id);
          }}
        >
          {block ? "block" : "unblock"}
        </button>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size="80%"
        opened={modal}
        onClose={() => setModal(false)}
        scrollAreaComponent={ScrollArea.Autosize}
        title={customTitle}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <ScrollArea h={450}>
          <div className="userdetails">
            <div>
              {/* <div>
                <img src={profile} alt='profile' />
              </div> */}
              <div className="userinfo">
                <div>
                  <div>
                    <span>User Name</span>
                    <span>Email</span>
                    <span>Country</span>
                  </div>
                  <div>
                    <span>{user.username}</span>
                    <span>{user.email}</span>
                    <span>{user.country || "not added"}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>livesin</span>
                    <span>worksAt</span>
                    <span>relationShip</span>
                  </div>
                  <div>
                    <span>{user.livesin || "not added"}</span>
                    <span>{user.worksAt || "not added"}</span>
                    <span>{user.relationShip || "not added"}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>followers</span>
                    <span>{user.followers.length}</span>
                  </div>
                  <div>
                    <span>followings</span>
                    <span>{user.following.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="Posts">
            {posts.map((post, index) => (
              <Userposts key={index} data={post} />
            ))}
          </div> */}
        </ScrollArea>
      </Modal>
    </>
  );
};

export default Userdetails;
