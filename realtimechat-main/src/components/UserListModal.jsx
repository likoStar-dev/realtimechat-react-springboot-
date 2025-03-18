import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addWindow } from "../store/actions/windowActions";
import axios from "axios";
import { useUserStore } from "../auth/stores/useStore";

const UserListModal = (contactUserData) => {
  const user = useUserStore((state) => state.user);
  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const [contactUsers, setContactUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userId = user.id;
      if (userId) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users?myId=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const contacts = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}/contacts`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setContactUsers(contacts.data);
        setUsers(
          response.data.filter((user) => {
            return contacts.data.includes(user.userId);
          })
        );
      }
    })();
  }, [contactUsers]);

  const handleUserClick = (receiverId) => {
    dispatch(
      addWindow({
        senderId: 1,
        receiverId,
        receivedUser: users.filter((user) => user.userId === receiverId)[0],
      })
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0px",
        right: "0px",
        width: "300px",
        height: isExpanded ? "550px" : "50px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px",
          borderBottom: isExpanded ? "1px solid #eee" : "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <span style={{ fontWeight: "bold" }} className="text-white">
          Messages
        </span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white"
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: "5px",
            marginLeft: isExpanded ? "0" : "0",
            marginRight: isExpanded ? "0" : "0",
          }}
        >
          {isExpanded ? "◀" : "▶"}
        </button>
      </div>

      {/* User List */}
      {isExpanded && (
        <div
          style={{
            height: "calc(100% - 50px)",
            overflow: "auto",
            padding: "10px",
          }}
        >
          {users.map((user, index) => (
            <div
              key={index}
              onClick={() => handleUserClick(user.userId)}
              className="flex items-center justify-between"
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#f8f9fa",
                },
              }}
            >
              <div className="flex items-center">
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#e9ecef",
                    marginRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {user.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>
                    {user.username || "User " + user.id}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c757d" }}>
                    {user.status || "Online"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#28a745",
                    marginLeft: "auto",
                  }}
                />
                {/* <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete all messages with ${user.username}?`
                      )
                    ) {
                      dispatch(deleteAllMessages(user.userId));
                    }
                  }}
                  className="cusror-pointer text-[white] bg-red-500 rounded-md px-2 py-1"
                >
                  Delete
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserListModal;
