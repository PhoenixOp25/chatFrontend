// avatar = [],
//   name,
//   _id,
//   groupChat = false,
//   sameSender,
//   isOnline,
//   newMessageAlert,
//   index = 0,
//   handleDeleteChat,

export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },

  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Boi",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
];
export const sampleUsers = [
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "John Doe",
      _id: "1",
    },
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "John Boi",
      _id: "2",
    },
  ];

 export const sampleNotification=[
    {
        sender:{
            avatar:["https://www.w3schools.com/howto/img_avatar.png",
    ],
    name:"opop",
        },
        _id:"1",
    },{
        sender:{
            avatar:["https://www.w3schools.com/howto/img_avatar.png",
    ],
    name:"hero",
        },
        _id:"2",
    }
 ]

 export const sampleMessage = [
    {
      attachments: [],
      content: "L*uda ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        _id: "user._id",
        name: "Chaman ",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  
    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "sfnsdjkfsdnfkdddjsbnd",
      sender: {
        _id: "sdfsdfsdf",
        name: "Chaman  2",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ];