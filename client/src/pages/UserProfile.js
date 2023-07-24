import React from "react";
import { useSelector } from "react-redux";
import "../resourses/layout.css"

const UserProfile = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="d-flex">
      <div >
        <img className="profile-img" src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
      </div>
      <hr />
      <div>
        <p className="text-lg">Name:{user.name}</p>
        <p className="text-lg">Email:{user.email}</p>
        <p className="text-lg">Role:{user.isAdmin ? "Admin" : "User"}</p>
      </div>
    </div>
  );
};

export default UserProfile;
