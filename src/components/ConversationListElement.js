import React, {useContext} from 'react';
import users from "../data/users";
import {ConversationContext} from "../context/ConversationContext";
import ConversationPicture from "./ConversationPicture";

const ConversationListElement = ({conversationId}) => {
  const {
    selectedConversation,
    setSelectedConversation,
    conversations
  } = useContext(ConversationContext);
  const conversation = conversations.find((e) => e.id === conversationId)
  const usersWithoutLogged = conversation.users.filter((e) => e !== 0)
  const usersObj = usersWithoutLogged.map((e) => users.find((user) => e === user.id));

  const getConversationName = () => {
    const names = usersObj.map((e) => e.name);

    return names.join(', ');
  }

  const handlePress = () => {
    setSelectedConversation(conversation);
  }

  return (
    <div onClick={handlePress}
         className={`${selectedConversation.id === conversation.id ? 'bg-gray-100' : 'bg-white'} cursor-pointer hover:opacity-80 flex flex-wrap transition-all p-3 rounded-xl`}>
      {usersObj && usersObj.length > 0 && (
        <ConversationPicture pictureSize={50} pictureUrl={usersObj[0].picture}
                             hasPin={usersObj[0].isConnected}/>)}
      <div className="flex-grow ml-4" style={{flexBasis: 0}}>
        <p className="text-lg line-clamp-1">{getConversationName()}</p>
        <div className="flex flex-wrap">
          <p
            className={`${!conversation.seen ? 'font-semibold' : ''} text-gray-500 line-clamp-1`}>{conversation.messages[conversation.messages.length - 1].creator === 0 ? 'you: ' : ''}{conversation.messages[conversation.messages.length - 1].content}</p>
          <p
            className={`${!conversation.seen ? 'font-semibold' : ''} mt-auto text-gray-500 ml-1 ml-auto`}>Now</p>
        </div>
      </div>
      {!conversation.seen && (
        <div className="justify-center flex items-center ml-4">
          <div className="rounded-full bg-gray-600 h-3 w-3"/>
        </div>)}

    </div>
  );
};

export default ConversationListElement;
