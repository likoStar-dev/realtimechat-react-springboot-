import React from "react";

const UserList = ({ users, onContact, contactUsers }) => {
  return (
    <div className="user-list w-[500px] px-10">
      <header>
        <h2 className="text-lg font-bold">User List</h2>
      </header>
      <body>
        <ul className="p-0 overflow-y-auto list-none h-96">
          {users.map((user) => (
            <li
              key={user.userId}
              className="flex items-center justify-between p-2 border-b"
            >
              <div className="flex items-center">
                <img
                  src={`/src/assets/images/avatars/avatar-1.jpg`}
                  alt={user.username}
                  className="w-10 h-10 mr-2 rounded-full"
                />
                <span>{user.username}</span>
              </div>
              <button
                onClick={() => onContact(user.userId)}
                className={`px-4 py-2 text-white ${
                  contactUsers.includes(user.userId)
                    ? "bg-green-500"
                    : "bg-blue-500"
                } rounded`}
              >
                Contact
              </button>
            </li>
          ))}
        </ul>
      </body>
    </div>
  );
};

export default UserList;
