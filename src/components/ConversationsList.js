import React, {useEffect, useState, useContext, useCallback} from 'react';
import RoundedInput from "./RoundedInput";
import ConversationListElement from "./ConversationListElement";
import users from "../data/users";
import {ConversationContext} from "../context/ConversationContext";

const ConversationsList = () => {
  const [query, setQuery] = useState({value: ''});
  const {selectedConversation, conversations, setConversations} = useContext(ConversationContext);
  const [sortedConversations, setSortedConversations] = useState(conversations);
  const authenticatedUser = users[0];

  const filterConversations = useCallback(() => {
    if (!query || query.value.trim() === '') {
      return setSortedConversations(conversations);
    }
    const sortedByName = conversations.filter((e) => {
      const usersWithoutLogged = e.users.filter((e) => e !== 0)
      const usersObj = usersWithoutLogged.map((e) => users.find((user) => e === user.id));
      const names = usersObj.map((e) => e.name);
      const joined = names.join(', ');

      return joined.toLowerCase().includes(query.value);
    })
    setSortedConversations(sortedByName);
  }, [conversations, query]);

  useEffect(() => {
    filterConversations();
  }, [query, filterConversations])

  useEffect(() => {
    const selectedId = selectedConversation.id;

    setConversations((draft) => {
      const newSelected = draft.find((e) => e.id === selectedId);
      newSelected.seen = true;
    });
  }, [selectedConversation, setConversations, filterConversations]);

  useEffect(() => {
    setConversations((draft) => {
      draft.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.lastMessageDate) - new Date(a.lastMessageDate);
      });
    })
  }, [conversations])

  return (
    <div className="md:px-4 py-6">
      <img alt="Club" className="md:block hidden ml-auto mr-auto" src={'./logo.png'} style={{width: 110}}/>
      <div className="justify-between items-center mt-4 md:flex hidden">
        <img alt="Profile" style={{height: 35, width: 35}} className="rounded-full object-cover"
             src={authenticatedUser.picture}/>
        <p>{sortedConversations.length} {sortedConversations.length === 1 ? 'chat' : 'chats'}</p>
      </div>

      <RoundedInput name="value" value={query.value} setForm={setQuery} classes="mt-4 mb-4 md:block hidden"
                    placeholder="Search a person"/>

      {sortedConversations.map((e) => {
        return (
          <div key={e.id} className="mb-1"><ConversationListElement conversationId={e.id}/></div>)
      })}
    </div>
  );
};

export default ConversationsList;
