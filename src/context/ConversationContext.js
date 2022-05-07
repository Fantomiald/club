import React, {useState} from 'react';
import defaultConversations from "../data/conversations";
import {useImmer} from "use-immer";

export const ConversationContext = React.createContext();

export const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useImmer(defaultConversations);
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  const value = {setSelectedConversation, selectedConversation, conversations, setConversations};

  return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
};
