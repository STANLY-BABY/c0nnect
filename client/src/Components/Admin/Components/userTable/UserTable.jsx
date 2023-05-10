import React, { useMemo, useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import { userColumnTitle } from "../../data/tablecln.js";
import { Box, IconButton } from "@mui/material";
// import { Delete as DeleteIcon, LockPersonIcon, InfoIcon } from '@mui/icons-material';
import InfoIcon from "@mui/icons-material/Info";
import {
  getUserData,
  getUserSearchData,
  getUserDataPage,
} from "../../api/request.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Userdetails from "../../userDetails/Userdetails.jsx";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const UserTable = () => {
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  let searchQuery;
  let pageQuery = 1;
  let location = useLocation();
  let [totalPages, setTotalPages] = useState(1);
  if (location.search) {
    // searchQuery = location.search.split("=")[1];
    try {
      searchQuery = location.search.match(/search=([^&]+)/)[1];
    } catch (error) {
      // searchQuery = ""
    }
  } else {
    // searchQuery = "";
  }
  try {
    if (location.search.match(/page=([^&]+)/)[1]) {
      pageQuery = location.search.match(/page=([^&]+)/)[1];
    }
  } catch (error) {}


  const [search, setSearch] = useState(searchQuery);
  // useEffect(() => {
  //   setSearch(searchQuery);
  // }, [searchQuery]);
  // const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      try {
        let { data } = await getUserDataPage(pageQuery);
        setData(data.users);
        setTotalPages(data.totalPages);
      } catch (e) {
        if (e.response) {
          console.log("error from server");
        }
      }
    };
    getUsers();
  }, [pageQuery]);
  const columns = useMemo(userColumnTitle, []);

  const handleUser = ({ original }) => {
    setUser(original);
    setModal(true);
  };
  async function handleSubmit() {
    let response = await getUserSearchData(search);
    setTotalPages(response.data.totalPages)
    setData(response.data.users);
    // navigate(`/admin/users?search=${search}`);
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="submit">search</button>
      </form>
      <Pagination
        count={totalPages}
        page={pageQuery}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/admin/users?page=${item.page}`}
            {...item}
          ></PaginationItem>
        )}
      />
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
          </Box>
        )}
      />
      {modal ? (
        <Userdetails user={user} modal={modal} setModal={setModal} />
      ) : null}
    </>
  );
};

export default UserTable;
