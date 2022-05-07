import React from 'react';
import users from "../data/users";

const ConversationOwnMessage = ({message}) => {
  const user = users.find((e) => message.creator === e.id);

  return (
    <div className="inline-block my-1">
      <div className="flex flex-wrap items-center">
        <div className="rounded-full px-4 py-1 text-white"
             style={{maxWidth: 500, backgroundColor: '#4C734C'}}>
          <p>{message.content}</p>
        </div>
        <img src={user.picture} className="rounded-full ml-2" style={{width: 30, height: 30}}/>
      </div>
    </div>
  );
};

export default ConversationOwnMessage;
