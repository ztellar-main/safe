export const getConversationId = (user: any, users: any) => {
  if (users[0]._id == user) {
    return users[1];
  } else {
    return users[0];
  }
};
