import React, { useCallback, useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";

import { Box, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { Delete, Edit } from "@mui/icons-material";
// import PostDetails from "./PostDetails";
import { ReportDetails } from "../data/tablecln";
import { getAllReports, getPost } from "../api/request";
import Post from "../../user/Post/Post";

const GetReports = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const getRepots = async () => {
      const { data } = await getAllReports();
      setReports(data);
    };
    getRepots();
  }, []);
  const [postModal, setPostModal] = useState(false);
  const [post, setPost] = useState({});
  const [postId, setPostId] = useState();
  const columns = useMemo(ReportDetails, []);
  const getPostinfo = async (postId) => {
    const { data } = await getPost(postId);
    setPost(data);
    setPostModal(true);
  };
  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={reports}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
            <IconButton
              color="secondary"
              onClick={() => {
                getPostinfo(row.original.postId);
              }}
            >
              <InfoIcon />
            </IconButton>
          </Box>
        )}
      />
      {postModal ? (
        <Post postModal={postModal} setPostModal={setPostModal} data={post} />
      ) : null}
    </>
  );
};

export default GetReports;
