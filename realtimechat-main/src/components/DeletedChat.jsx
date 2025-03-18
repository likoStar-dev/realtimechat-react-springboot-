/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useRef } from "react";
import "./css/style.css";
import axios from "axios";
import { formatRelativeTime } from "./utils/timeUtils";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useUserStore } from "./auth/stores/useStore";
import { FaInbox } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdRefresh } from "react-icons/io";
import { FaArchive } from "react-icons/fa";

const DeletedChat = () => {
  const user = useUserStore((state) => state.user);
  const [deletedMessages, setDeletedMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch deleted messages
  const getDeletedMessages = async () => {
    const userId = user.id;
    setIsLoading(true);

    if (userId) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/messages/deleted?userId=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setDeletedMessages(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching deleted messages:", error);
        setIsLoading(false);
      }
    }
  };

  // Handle message search
  const handleMessageSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter messages based on content or username
    const filtered = deletedMessages.filter(
      (message) =>
        message.content.toLowerCase().includes(term) ||
        message.senderName.toLowerCase().includes(term)
    );

    setFilteredMessages(filtered);
  };

  // Restore deleted message
  const handleRestoreMessage = async (messageId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/messages/${messageId}/restore`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Remove the restored message from the list
      setDeletedMessages(
        deletedMessages.filter((message) => message.id !== messageId)
      );

      // If the restored message was selected, clear selection
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error restoring message:", error);
    }
  };

  // Permanently delete message
  const handlePermanentDelete = async (messageId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/messages/${messageId}/permanent`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Remove the deleted message from the list
      setDeletedMessages(
        deletedMessages.filter((message) => message.id !== messageId)
      );

      // If the deleted message was selected, clear selection
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error permanently deleting message:", error);
    }
  };

  // Use filteredMessages when search term is not empty, otherwise use original messages list
  const displayMessages = searchTerm ? filteredMessages : deletedMessages;

  useEffect(() => {
    getDeletedMessages();
  }, []);

  // Set first message as selected when messages load
  useEffect(() => {
    if (deletedMessages.length > 0 && !selectedMessage) {
      setSelectedMessage(deletedMessages[0]);
    }
  }, [deletedMessages]);

  return (
    <div className="">
      {/* <!-- main contents --> */}
      <main>
        <div className="relative overflow-hidden border dark:border-slate-700">
          <div className="flex bg-white dark:bg-dark2">
            {/* <!-- sidebar --> */}
            <div className="md:w-[360px] relative border-r dark:border-slate-700">
              <div
                id="side-chat"
                className="top-0 left-0 z-50 bg-white max-md:fixed max-md:w-5/6 max-md:h-screen max-md:shadow max-md:-translate-x-full dark:bg-dark2"
              >
                {/* <!-- heading title --> */}
                <div className="p-4 border-b dark:border-slate-700">
                  <div className="flex items-center justify-between mt-2">
                    <h2 className="ml-1 text-2xl font-bold text-black dark:text-white">
                      {" "}
                      Deleted Chats{" "}
                    </h2>

                    {/* <!-- right action buttons --> */}
                    <div className="flex items-center gap-2.5">
                      <button className="group" onClick={getDeletedMessages}>
                        <IoMdRefresh className="flex text-2xl" />
                      </button>
                      <div
                        className="md:w-[270px] w-full"
                        uk-dropdown="pos: bottom-left; offset:10; animation: uk-animation-slide-bottom-small"
                      >
                        <nav>
                          <a href="#">
                            {" "}
                            <FaInbox /> Inbox{" "}
                          </a>
                          <a href="#">
                            {" "}
                            <GrSend /> Sent{" "}
                          </a>
                          <a href="#">
                            {" "}
                            <FaArchive /> Archived{" "}
                          </a>
                          <a href="#">
                            {" "}
                            <RiDeleteBin6Line /> Deleted{" "}
                          </a>
                        </nav>
                      </div>
                      {/* <!-- mobile toggle menu --> */}
                      <button
                        type="button"
                        className="md:hidden"
                        uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full"
                      >
                        <ion-icon name="chevron-down-outline"></ion-icon>
                      </button>
                    </div>
                  </div>

                  {/* <!-- search --> */}
                  <div className="relative mt-4">
                    <div className="absolute flex translate-y-1/2 left-3 bottom-1/2">
                      <ion-icon name="search" className="text-xl"></ion-icon>
                    </div>
                    <input
                      type="text"
                      placeholder="Search deleted messages"
                      value={searchTerm}
                      onChange={handleMessageSearch}
                      className="w-full !pl-10 !py-2 !rounded-lg"
                    />
                  </div>
                </div>

                {/* <!-- deleted messages list --> */}
                <div className="space-y-2 p-2 overflow-y-auto md:h-[calc(100vh-199px)] h-[calc(100vh-190px)]">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="w-8 h-8 border-4 border-t-4 rounded-full border-gray-200 border-t-blue-600 animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      {displayMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery ${
                            selectedMessage && selectedMessage.id === message.id
                              ? "bg-secondery"
                              : ""
                          }`}
                          onClick={() => setSelectedMessage(message)}
                        >
                          <div className="relative w-14 h-14 shrink-0">
                            <img
                              src={
                                message.senderAvatar ||
                                `/src/assets/images/avatars/avatar-1.jpg`
                              }
                              alt=""
                              className="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="mr-auto text-sm font-medium text-black dark:text-white">
                                {message.senderName}
                              </div>
                              <div className="text-xs font-light text-gray-500 dark:text-white/70">
                                {formatRelativeTime(
                                  message.deletedAt || message.timestamp
                                )}
                              </div>
                            </div>
                            <div className="overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap opacity-70">
                              {message.content}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Show message when no deleted messages found */}
                      {displayMessages.length === 0 && (
                        <div className="py-4 text-center text-gray-500">
                          {searchTerm
                            ? `No deleted messages found matching "${searchTerm}"`
                            : "No deleted messages found"}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              {/* <!-- overly --> */}
              <div
                id="side-chat"
                className="fixed inset-0 z-40 w-full h-full bg-slate-100/40 backdrop-blur dark:bg-slate-800/40 max-md:-translate-x-full md:hidden"
                uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full"
              ></div>
            </div>
            {/* <!-- message details center --> */}
            <div className="flex-1">
              {selectedMessage ? (
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-4 border-b dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10">
                          <img
                            src={
                              selectedMessage.senderAvatar ||
                              `/src/assets/images/avatars/avatar-1.jpg`
                            }
                            alt=""
                            className="object-cover w-full h-full rounded-full"
                          />
                        </div>
                        <div>
                          <div className="text-base font-medium text-black dark:text-white">
                            {selectedMessage.senderName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-white/80">
                            Deleted{" "}
                            {formatRelativeTime(
                              selectedMessage.deletedAt ||
                                selectedMessage.timestamp
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="flex items-center gap-1.5 py-1.5 px-3 rounded-md bg-blue-50 text-blue-500 dark:bg-slate-700"
                          onClick={() =>
                            handleRestoreMessage(selectedMessage.id)
                          }
                        >
                          <IoMdRefresh className="text-xl" />
                          <span>Restore</span>
                        </button>
                        <button
                          className="flex items-center gap-1.5 py-1.5 px-3 rounded-md bg-red-50 text-red-500 dark:bg-slate-700"
                          onClick={() =>
                            handlePermanentDelete(selectedMessage.id)
                          }
                        >
                          <RiDeleteBin6Line className="text-xl" />
                          <span>Delete Forever</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="max-w-3xl mx-auto">
                      <div className="p-4 mb-4 bg-gray-100 rounded-lg dark:bg-slate-700">
                        <div className="text-sm text-gray-500 dark:text-white/70 mb-2">
                          Original message from{" "}
                          {formatRelativeTime(selectedMessage.timestamp)}
                        </div>
                        <div className="text-black dark:text-white">
                          {selectedMessage.content}
                        </div>
                      </div>

                      {selectedMessage.attachments &&
                        selectedMessage.attachments.length > 0 && (
                          <div className="mt-4">
                            <h3 className="mb-2 text-sm font-medium">
                              Attachments
                            </h3>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                              {selectedMessage.attachments.map(
                                (attachment, index) => (
                                  <div
                                    key={index}
                                    className="p-2 border rounded-md"
                                  >
                                    <div className="text-sm truncate">
                                      {attachment.name}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      <div className="p-4 mt-6 border-t dark:border-slate-700">
                        <div className="text-sm text-gray-500">
                          This message was deleted on{" "}
                          {new Date(
                            selectedMessage.deletedAt ||
                              selectedMessage.timestamp
                          ).toLocaleString()}
                          . You can restore it or permanently delete it.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <RiDeleteBin6Line className="text-5xl text-gray-300 mb-4" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700 dark:text-white">
                    No Deleted Message Selected
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a deleted message from the sidebar to view details.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeletedChat;
