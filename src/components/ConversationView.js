import React, {useCallback, useContext, useEffect, useState} from 'react';
import ConversationPicture from "./ConversationPicture";
import {ConversationContext} from "../context/ConversationContext";
import users from "../data/users";
import RoundedInput from "./RoundedInput";
import ConversationOwnMessage from "./ConversationOwnMessage";
import ConversationOtherMessage from "./ConversationOtherMessage";

const ConversationView = () => {
  const [input, setInput] = useState({ message: '' });
  const {selectedConversation, setConversations, conversations} = useContext(ConversationContext);
  const usersWithoutLogged = selectedConversation.users.filter((e) => e !== 0)
  const usersObj = usersWithoutLogged.map((e) => users.find((user) => e === user.id));

  const getConversationName = () => {
    const names = usersObj.map((e) => e.name);

    return names.join(', ');
  }

  const sendMessage = useCallback(() => {
    const selectedId = selectedConversation.id;

    if (!input || input.message.trim() === '') {
      return;
    }
    setConversations((draft) => {
      const conversationMessages = draft.find((e) => e.id === selectedId).messages;
      conversationMessages.push({content: input.message, creator: 0});
    });
    setInput({ message: '' })
  }, [setConversations, input, selectedConversation]);

  const checkEvent = useCallback((event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }, [sendMessage]);

  useEffect(() => {
    document.addEventListener('keydown', checkEvent, false);
    return () => {
      document.removeEventListener('keydown', checkEvent, false);
    }
  }, [checkEvent, input]);

  return (
    <div className="h-full">
      <div className="flex flex-wrap border-b border-gray-300 px-4 py-4 items-center">
        <ConversationPicture pictureSize={50} pictureUrl={usersObj[0].picture}
                             hasPin={usersObj[0].isConnected}/>
        <p className="text-2xl ml-4">{getConversationName()}</p>
      </div>

      <div className="px-2">
        {conversations.find((e) => e.id === selectedConversation.id).messages.map((e, index) => {
          if (e.creator === 0) {
            return <div className="justify-end items-end flex" key={index}><ConversationOwnMessage message={e} /></div>
          } return <div key={index}><ConversationOtherMessage message={e} /></div>
        })}
      </div>

      <div className="flex w-full px-4 pb-2 items-end pt-4">
        <RoundedInput value={input.message} setForm={setInput} name="message" classes="w-full" placeholder={"Aa"}/>
      </div>
    </div>
  );
};

export default ConversationView;
