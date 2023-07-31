export const userDetailsHandler = (data, setAuth, setCookie) => {
  const userDetails = {
    idx: data.idx,
    fullName: data.first_name + " " + data.last_name,
    avatar: data.avatar,
    email: data.email,
    username: data.username,
    notifications: data.notifications,
  };

  setAuth((auth) => ({ ...auth, ...userDetails }));
  setCookie("userDetails", userDetails, {
    path: "/",
  });
};
