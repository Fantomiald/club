import React from 'react';
import ConversationsList from "../components/ConversationsList";
import ConversationDetails from "../components/ConversationDetails";
import ConversationView from "../components/ConversationView";

const Main = () => {
  return (
    <div className="w-screen h-screen flex">
      <div className="lg:w-1/5 md:w-1/4 border-r border-gray-300">
        <ConversationsList />
      </div>
      <div className="lg:w-3/5 md:w-2/4">
        <ConversationView />
      </div>
      <div className="lg:w-1/5 md:w-1/4 border-l border-gray-300 hidden md:block">
        <ConversationDetails />
      </div>
    </div>
  );
};

export default Main;

