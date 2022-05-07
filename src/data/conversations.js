const defaultConversations = [
  {
    lastMessageDate: new Date().toISOString(),
    selected: true,
    seen: true,
    id: 1,
    users: [0, 1],
    messages: [
      {creator: 1, content: "Dwight started a fire yesterday..."},
      {creator: 1, content: "He said it was an emergency test and we all failed"},
      {creator: 1, content: "He’s an idiot"},
      {creator: 0, content: "And the song keeps going: 🎶 Ryannn started a fiireee 🎶 You should fire him"},
      {creator: 1, content: "Nahh"},
      {creator: 0, content: "Why?"},
      {creator: 1, content: "He's a good saleman"},
      {creator: 0, content: "Yeah, he is so dedicated…"},
      {creator: 1, content: "That’s what she said 😊"},
    ]
  },
  {
    lastMessageDate: new Date( Date.now() - 30000 * 60).toISOString(),
    selected: false,
    seen: true,
    id: 2,
    users: [0, 2],
    messages: [
      {creator: 2, content: "Gettin' invited to a game, can't wait to participate!"},
    ]
  },
  {
    lastMessageDate: new Date( Date.now() - 26000 * 60).toISOString(),
    selected: false,
    seen: false,
    id: 3,
    users: [0, 3],
    messages: [
      {creator: 3, content: "Prada file, 10min, in my desk"},
    ]
  },
];

export default defaultConversations;
