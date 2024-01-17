export const MESSAGER_LOGIN_SUCCESS = "You have successfully logged in!";
export const MESSAGER_LOGIN_FAILED = "Login failed. Please try again.";
export const MESSAGER_REGISTER_SUCCESS = "You have successfully registered!";
export const MESSAGER_REGISTER_FAILED = "Register failed. Please try again.";
export const MESSAGER_SENDMAIL_SUCCESS = "You have successfully Send mail!";
export const MESSAGER_SENDMAIL_FAILED = "Send mail failed. Please try again.";
export const icons = ["👍", "👎", "❤️", "😆", "😠", "😍"];

export const generateAxiosConfig = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      token: `${localStorage.getItem("token")}`,
    },
  };
};

export const getFormattedTime = (time: any) => {
  const postTime = new Date(time).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - postTime;
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));

  if (minutesAgo < 1) {
    return "just now";
  } else if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (minutesAgo < 24 * 60) {
    const hoursAgo = Math.floor(minutesAgo / 60);
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else if (minutesAgo < 24 * 60 * 2) {
    return "Yesterday";
  } else {
    const daysAgo = Math.floor(minutesAgo / (24 * 60));
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  }
};

export const setCountReactions = (reactions: any) => {
  const uniqueTypes = reactions?.filter(
    (value: any, index: any, self: any) =>
      self.findIndex((item: any) => item.type === value.type) === index
  );

  return uniqueTypes;
};

export const isFriend = (idToFind: any, listFriend: any) => {
  if (listFriend) {
    const foundFriend = listFriend.find(
      (friend: { friend: { id: any } }) => friend.friend.id === idToFind
    );

    if (foundFriend) {
      return true;
    } else {
      return false;
    }
  }
};
