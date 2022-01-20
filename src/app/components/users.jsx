import React from "react";
import User from "./user";

const Users = ({ users, ...rest }) => {
  // console.log(rest);
  return (
    <>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качество</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избраное </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User {...user} {...rest} key={user._id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default Users;
