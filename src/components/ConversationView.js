import React, {useCallback, useRef, useContext, useEffect, useState} from 'react';
import ConversationPicture from "./ConversationPicture";
import {ConversationContext} from "../context/ConversationContext";
import users from "../data/users";
import RoundedInput from "./RoundedInput";
import ConversationOwnMessage from "./ConversationOwnMessage";
import ConversationOtherMessage from "./ConversationOtherMessage";

const ConversationView = () => {
  const messagesView = useRef(null);
  const [input, setInput] = useState({message: ''});
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
      draft.find((e) => e.id === selectedId).lastMessageDate = new Date();
    });
    setInput({message: ''});
    messagesView.current.scrollTop = messagesView.current.scrollHeight;
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
    <div className="h-screen max-h-screen flex flex-grow flex-col" style={{flexBasis: 0}}>
      <div className="flex flex-wrap border-b border-gray-300 px-4 py-4 items-center">
        <ConversationPicture pictureSize={50} pictureUrl={usersObj[0].picture}
                             hasPin={usersObj[0].isConnected}/>
        <p className="text-2xl ml-4">{getConversationName()}</p>
      </div>

      <div ref={messagesView} className="flex-grow overflow-y-scroll" style={{flexBasis: 0}}>
        <div className="px-3 py-2 flex-grow flex flex-col chat">
          {conversations.find((e) => e.id === selectedConversation.id).messages.map((e, index) => {
            if (e.creator === 0) {
              return <div className="message justify-end items-end flex" key={index}><ConversationOwnMessage
                message={e}/></div>
            }
            return <div className="message" key={index}><ConversationOtherMessage message={e}/></div>
          })}
        </div>
      </div>
      <div className="flex w-full px-4 pb-2 pt-4">
        <RoundedInput value={input.message} setForm={setInput} name="message" classes="w-full"
                      placeholder={"Aa"}/>
      </div>
    </div>
  );
};

export default ConversationView;
