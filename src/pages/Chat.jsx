import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../utils/socket";
// import FileMenu from "../components/dialogs/FileMenu";
// import MessageComponent from "../components/shared/MessageComponent";
 
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
 import { useChatDetailsQuery, useGetMessagesQuery  } from "../redux/api/api";
import {useErrors, useSocketEvents } from "../hooks/hook.jsx";

 import { useInfiniteScrollTop } from "6pp";
 import { useDispatch } from "react-redux";
 import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat.js";
// import { removeNewMessagesAlert } from "../redux/reducers/chat";
// import { TypingLoader } from "../components/layout/Loaders";
// import { useNavigate } from "react-router-dom";

const Chat = ({ chatId,user }) => {
   const socket = getSocket();
   const dispatch = useDispatch();
  // const navigate = useNavigate();

  const containerRef = useRef(null);
  // const bottomRef = useRef(null);

   const [message, setMessage] = useState("");
  // console.log(message)
   const [messages, setMessages] = useState([]);
   const [page, setPage] = useState(1);
   const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

   const [IamTyping, setIamTyping] = useState(false);
   const [userTyping, setUserTyping] = useState(false);
   const typingTimeout = useRef(null);

   const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

   const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];
  
   const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    socket.emit(START_TYPING, { members, chatId });
    // if (!IamTyping) {
    //   socket.emit(START_TYPING, { members, chatId });
    //   setIamTyping(true);
    // }

    // if (typingTimeout.current) clearTimeout(typingTimeout.current);

    // typingTimeout.current = setTimeout(() => {
    //   socket.emit(STOP_TYPING, { members, chatId });
    //   setIamTyping(false);
    // }, [2000]);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };
  
const allMessages=[...oldMessages,...messages]
  useEffect(() => {
    // socket.emit(CHAT_JOINED, { userId: user._id, members });
     dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      //socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  // useEffect(() => {
  //   if (bottomRef.current)
  //     bottomRef.current.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // useEffect(() => {
  //   if (chatDetails.isError) return navigate("/");
  // }, [chatDetails.isError]);

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  // const stopTypingListener = useCallback(
  //   (data) => {
  //     if (data.chatId !== chatId) return;
  //     setUserTyping(false);
  //   },
  //   [chatId]
  // );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    //[ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    //[STOP_TYPING]: stopTypingListener,
  };

   useSocketEvents(socket, eventHandler);

   useErrors(errors);

  // const allMessages = [...oldMessages, ...messages];
// 
  return chatDetails.isLoading ?(
    <Skeleton/>
  ): (
     
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {
          !oldMessagesChunk.isLoading&& oldMessagesChunk.data?.messages?.map((i)=>(
            <MessageComponent key={i._id} message={i} user={user}/>
          ))
        }

        {messages.map((i) => (
          <MessageComponent key={i._id}  message={i} user={user} />
        ))}

        {/* {userTyping && <TypingLoader />}

        <div ref={bottomRef} /> */}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-20deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
{/* chatId={chatId}  */}
      <FileMenu  anchorE1={fileMenuAnchor} chatId={chatId}  />
    </Fragment>
  );
};

export default AppLayout()(Chat);