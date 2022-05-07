import React from 'react';
import users from "../data/users";

const ConversationOtherMessage = ({message}) => {
  const user = users.find((e) => message.creator === e.id);

  return (
    <div className="inline-block my-1">
      <div className="flex flex-wrap items-center">
        <img src={user.picture} className="rounded-full mr-2" style={{width: 30, height: 30}}/>
        <div className="rounded-full px-4 py-1 bg-gray-100" style={{maxWidth: 500}}>
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationOtherMessage;
