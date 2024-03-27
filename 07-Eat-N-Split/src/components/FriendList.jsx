import React from "react";
import { Friend } from "./Friend";

const FriendList = ({ friend, onSelectedFriend, selectedFriend }) => {
  return (
    <ul>
      {friend?.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectedFriend={onSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};
export default FriendList;
