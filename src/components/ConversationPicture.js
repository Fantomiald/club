import React from 'react';

const ConversationPicture = ({pictureSize, hasPin, pictureUrl, pinSize}) => {
  return (
    <div className="relative justify-center items-center flex">
      <img src={pictureUrl} style={{width: pictureSize || 50, height: pictureSize || 50}}
           className="rounded-full bg-gray-200"/>
      {hasPin && (
        <div className="rounded-full absolute bg-green-400 border border-white"
             style={{bottom: 2, right: 2, height: pinSize || 12, width: pinSize || 12}}/>)}
    </div>
  );
};

export default ConversationPicture;
