import React, { useMemo, useEffect, useState, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch } from "react-redux";
import LockPersonIcon from "@mui/icons-material/LockPerson";
// import Swal from 'sweetalert2';
import { fetchblockedUsers, blockUser } from "../api/request.js";

import Userdetails from "../userDetails/Userdetails.jsx";
import { blockedUsers } from "../data/tablecln";

const BlockedUsers = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getBlockedUsers = async () => {
      const { data } = await fetchblockedUsers();
      setData(data);
    };
    getBlockedUsers();
  }, []);
  const columns = useMemo(blockedUsers, []);
  const handleUser = ({ original }) => {
    setUser(original);
    setModal(true);
  };
  const unBlockeuser = useCallback(
    (row) => {
      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: "You want to unblock this user!",
      //   showCancelButton: true,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: 'Yes, unblock it!'
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     dispatch(blockUser(row.original._id));
      //     setData((prevData) => prevData.filter((item) => item._id !== row.original._id));
      //   }
      // })
      blockUser(row.original._id);
      setData((prevData) =>
        prevData.filter((item) => item._id !== row.original._id)
      );
    },
    [dispatch]
  );
  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
            <IconButton color="secondary" onClick={() => handleUser(row)}>
              <InfoIcon />
            </IconButton>
            <IconButton color="error" onClick={() => unBlockeuser(row)}>
              <LockPersonIcon />
            </IconButton>
          </Box>
        )}
      />
      {modal ? (
        <Userdetails user={user} modal={modal} setModal={setModal} />
      ) : null}
    </div>
  );
};

export default BlockedUsers;
