import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import UserListModal from "./components/UserListModal";
import CollapsibleWindow from "./components/CollapsibleWindow";
import { useUserStore } from "./auth/stores/useStore";
import { useState, useEffect } from "react";
import Avatar from "./assets/images/avatars/avatar-2.jpg";
import UserList from "./components/UserList";
import MessageModal from "./components/MessageModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addWindow } from "./store/actions/windowActions";
import MenuBar from "./components/MenuBar";
import { MdNotificationsActive } from "react-icons/md";
import { BiSolidMessageAltDetail } from "react-icons/bi";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [contactUsers, setContactUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const windows = useSelector((state) => state.windows.windows);
  const location = useLocation();
  const isMessagePage = location.pathname === "/message";
  const checkAuth = useUserStore((state) => state.isAuthenticated);
  const logOut = useUserStore((state) => state.logOut);
  const [contactUserId, setContactUserId] = useState(null);

  const getUsersWithLastMessage = async () => {
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
      setUsers(response.data);
      const contacts = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}/contacts`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setContactUsers(contacts.data);
    }
  };

  useEffect(() => {
    getUsersWithLastMessage();
    (async () => {
      setIsAuthenticated(await checkAuth());
      setLoading(false);
    })();
  }, []);

  const onSignOut = () => {
    logOut();
    navigate("sign-in");
  };

  if (loading) {
    return <div>Loading!</div>;
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to={"/sign-in"} />;
  }

  const handleContact = (userId) => {
    if (contactUsers.includes(userId)) {
      dispatch(
        addWindow({
          senderId: 1,
          receiverId: userId,
          receivedUser: users.filter((user) => user.userId === userId)[0],
        })
      );
    } else {
      setContactUserId(userId);
      setIsModalOpen(true);
    }
  };

  const handleSendMessage = () => {
    getUsersWithLastMessage();
  };

  const handleUserClick = (receiverId) => {
    console.log("Go to receiverId User's conversation", receiverId);
    // dispatch(
    //   addWindow({
    //     senderId: 1,
    //     receiverId,
    //     receivedUser: users.filter((user) => user.userId === receiverId)[0],
    //   })
    // );
  };

  return (
    <div className="relative">
      <header className="z-[1000] h-[--m-top] w-full relative flex items-center bg-white/80 sky-50 backdrop-blur-xl border-b border-slate-200 dark:bg-dark2 dark:border-slate-800">
        <div className="flex items-center w-full px-2 xl:px-6 max-lg:gap-10">
          <div className="relative flex-1">
            <div className="max-w-[1220px] mx-auto flex items-center">
              <div className="absolute flex items-center gap-2 text-black -translate-y-1/2 sm:gap-4 right-5 top-1/2 text-2xl">
                <div className="rounded-full bg-secondery text-center sm:w-9 sm:h-9">
                  +
                </div>{" "}
                <div className="rounded-full bg-secondery place-content-center justify-items-center sm:w-9 sm:h-9">
                  <MdNotificationsActive />
                </div>{" "}
                <div className="rounded-full cursor-pointer bg-secondery place-content-center justify-items-center sm:w-9 sm:h-9">
                  <BiSolidMessageAltDetail />
                </div>
                <div
                  className="hidden left-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50"
                  uk-drop="offset:6;pos: bottom-right;animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
                >
                  {/* Dialog Header */}
                  <div className="p-4 border-gray-200">
                    <h2 className="text-lg font-bold">Chats</h2>
                  </div>

                  {/* Search Bar */}
                  <div className="p-4 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Chat List */}

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

                  {/* See All Messages */}
                  <div className="p-4">
                    <p
                      className="text-sm text-blue-500 cursor-pointer"
                      onClick={() => navigate("/message")}
                    >
                      See all Messages
                    </p>
                  </div>
                </div>
                <div className="relative rounded-full cursor-pointer bg-secondery shrink-0">
                  <img
                    src={Avatar}
                    alt=""
                    className="rounded-full shadow sm:w-9 sm:h-9 w-7 h-7 shrink-0"
                  />
                </div>
                <div
                  className="hidden w-64 bg-white rounded-lg drop-shadow-xl dark:bg-slate-700 border2"
                  uk-drop="offset:6;pos: bottom-right;animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
                >
                  <a href="timeline.html">
                    <div className="flex items-center gap-4 p-4 py-5">
                      <img
                        src={Avatar}
                        alt=""
                        className="w-10 h-10 rounded-full shadow"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-black">
                          {user.firstName} {user.lastName}
                        </h4>
                        <div className="mt-1 text-sm font-light text-blue-600 dark:text-white/70">
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </a>
                  <nav className="p-2 text-sm font-normal text-black dark:text-white">
                    <hr className="my-2 -mx-2 dark:border-gray-600/60" />
                    <div onClick={onSignOut} className="cursor-pointer">
                      <div className="flex items-center gap-2.5 hover:bg-secondery p-2 px-2.5 rounded-md dark:hover:bg-white/10">
                        <svg
                          className="w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          ></path>
                        </svg>
                        Log Out
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
      {!isMessagePage && (
        <>
          <div className="flex items-center justify-center w-full py-20">
            <UserList
              users={users}
              onContact={handleContact}
              contactUsers={contactUsers}
            />
          </div>

          {/* MessageModal for all screens */}
          <div
            className={`fixed inset-0 z-50 ${isModalOpen ? "block" : "hidden"}`}
          >
            <MessageModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSend={handleSendMessage}
              contactUserId={contactUserId}
            />
          </div>

          {/* UserListModal hidden on mobile screens */}
          <div className="hidden md:block">
            <UserListModal contactUserData={contactUsers} />
          </div>

          <div className="w-full overflow-y-scroll">
            {windows.map((window, index) => (
              <CollapsibleWindow
                key={`${window.senderId}-${window.receiverId}`}
                senderId={window.senderId}
                receiverId={window.receiverId}
                position={index}
                receivedUser={window.receivedUser}
                isCollapsed={window.isCollapsed}
              />
            ))}
          </div>
        </>
      )}
      <div className="fixed w-full bottom-0 md:hidden p-5 back bg-white border">
        <div className="border rounded-xl shadow-xl py-2 min-w-96">
          <MenuBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
