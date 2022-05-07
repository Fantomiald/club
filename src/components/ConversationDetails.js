import React, {useContext, useState} from 'react';
import {ConversationContext} from "../context/ConversationContext";
import users from "../data/users";
import ConversationPicture from "./ConversationPicture";
import RoundedInput from "./RoundedInput";

const ConversationDetails = () => {
  const [query, setQuery] = useState({value: ''});
  const {selectedConversation} = useContext(ConversationContext);
  const usersWithoutLogged = selectedConversation.users.filter((e) => e !== 0)
  const usersObj = usersWithoutLogged.map((e) => users.find((user) => e === user.id));

  const getConversationName = () => {
    const names = usersObj.map((e) => e.name);

    return names.join(', ');
  }

  return (
    <div className="px-4 py-6">
      <div className="inline-block flex ml-auto mr-auto justify-center items-center">
        {usersObj && usersObj.length > 0 && (
          <ConversationPicture pictureSize={85} pinSize={16} pictureUrl={usersObj[0].picture}
                               hasPin={usersObj[0].isConnected}/>
        )}
      </div>
      <p className="text-xl mt-4 text-center">{getConversationName()}</p>
      <RoundedInput classes="mt-6" setForm={setQuery} value={query.value} name="value"
                    placeholder="Search a message"/>
    </div>
  );
};

export default ConversationDetails;
