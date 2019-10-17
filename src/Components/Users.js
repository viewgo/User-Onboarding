import React from "react";
import moment from "moment";

function Users(props) {
  let userSince = props.user.createdAt;
  console.log(userSince);
  userSince = moment(props.user.createdAt).format("MMMM Do YYYY");
  console.log(userSince);

  return (
    <div className="user-card">
      <h3>{props.user.name}</h3>
      <div className="user-info">
        <p>User ID</p>
        <p>#{props.user.id}</p>
      </div>
      <div className="user-info">
          <p>Email</p>
        <p>{props.user.email}</p>
      </div>
      <div className="user-info">
          <p>Password</p>
        <p>{props.user.password}</p>
      </div>
      <div className="user-info">
        <p>Joined</p>
        <p> {moment(props.user.createdAt).format("MMMM Do YYYY")}</p>
      </div>
    </div>
  );
}

export default Users;
