import HomePage from "./pages/homePage/homePage";
import ExplorePage from "./pages/explorepage/explorepage";
import BookmarksPage from "./pages/bookmarkspage/bookmarkspage";
import LoginPage from "./pages/login/login";
import Callback from "./pages/login/callback";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignupPage from "./pages/auth/signup";
import ProfilePage from "./pages/profile/profile";
import UpdateProfilePage from "./pages/updateprofile/updateprofile";
import { connect } from "react-redux";
import User from "./pages/User/User";
import React, {useState} from "react";
import FullPostPage from "./pages/fullpostpage/fullpostpage";
import UAuth from '@uauth/js'

const mapDispatchToProps = (dispatch) => {
  return {
    refresh: () => dispatch({ type: "REFRESH" }),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: null,
  };
};


const uauth = new UAuth({
  clientID: "2d318556-af36-419c-a8ba-67ad6562fc38",
  redirectUri: "http://localhost:3000/callback",
  scope: "openid wallet"
});

const Tweeter = (props) => {
  let location = useLocation();

  const [auth, setAuth] = useState();

  return (
    <Routes>
      <Route path="register" element={<Navigate to="/signup" />} />
      {
        auth ? <Route path="signup" element={<Navigate to="/settings" />} />
          :
          <Route path="signup" element={<SignupPage />} />

      }
      {auth ? (
        <Route exact path="/" element={<HomePage />} />
      ) : (
        <Route
          path="/"
          element={<Navigate to="/signin" state={{ from: location }} />}
        />
      )}
      {auth ? (
        <Route path="/explore" element={<ExplorePage />} />
      ) : (
        <Route
          path="/explore"
          element={<Navigate to="/signin" state={{ from: location }} />}
        />
      )}
      {auth ? (
        <Route path="/bookmarks" element={<BookmarksPage />} />
      ) : (
        <Route
          path="/bookmarks"
          element={<Navigate to="/signin" state={{ from: location }} />}
        />
      )}
      {auth ? (
        <Route path="/profile" element={<User />} />
      ) : (
        <Route
          path="/profile"
          element={<Navigate to="/signin" replace state={{ from: location }} />}
        />
      )}
      {auth ? (
        <Route path="/settings" element={<ProfilePage />} />
      ) : (
        <Route
          path="/settings"
          element={<Navigate to="/signin" replace state={{ from: location }} />}
        />
      )}
      {auth ? (
        <Route path="/updateprofile" element={<UpdateProfilePage />} />
      ) : (
        <Route
          path="/updateprofile"
          element={<Navigate to="/signin" replace state={{ from: location }} />}
        />
      )}
      {auth ? (
        <Route
          path="/login"
          element={<Navigate to="/" replace state={{ from: location }} />}
        />
      ) : (
        <Route path="/login" element={<LoginPage uauth={uauth}/>} />
      )}
      <Route
        path='/callback*'
        element={<Callback uauth={uauth} setAuth={setAuth} />}
      />
      {auth ? (
        <Route path="/:username/:post_id" element={<FullPostPage />} />
      ) : (
        <Route
          path="/:username/:post_id"
          element={<Navigate to="/signin" replace state={{ from: location }} />}
        />
      )}
      {auth ? (
        <Route
          path="/profile/:exact/:user_id"
          element={<User />}
          key={location.key}
        />
      ) : (
        <Route
          path="/profile/:exact/:user_id"
          element={<Navigate to="/signin" replace state={{ from: location }} />}
        />
      )}
      <Route path="/signin" element={<LoginPage uauth={uauth} />} />
      <Route />
    </Routes>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tweeter);
