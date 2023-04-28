import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/postAction.js";
import Createpost from "../../Components/user/createPost/Createpost";
import Post from "../../Components/user/Post/Post";
import Statusbar from "../../Components/user/status/Statusbar";
import { Player } from "@lottiefiles/react-lottie-player";
import ErrorBoundary from "../../Components/user/error/ErrorBoundary.jsx";
function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const { posts, loading } = useSelector((state) => state?.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  return (
    <div className="myflex flex-col">
      <Statusbar />
      <Createpost />

      <div>
        <ErrorBoundary>
          {posts && posts.length !== 0 ? (
            posts.map((post, id) => {
              return <Post data={post} id={id} />;
            })
          ) : (
            <div>
              <Player
                autoplay
                loop
                src="https://assets10.lottiefiles.com/packages/lf20_WpDG3calyJ.json"
                style={{ height: "300px", width: "300px" }}
              ></Player>
              <p>NO POST FOUND</p>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default Home;
