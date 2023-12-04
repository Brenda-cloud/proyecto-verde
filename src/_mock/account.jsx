
// // ----------------------------------------------------------------------
// const data = localStorage.getItem('user');
// const dataJS = JSON.parse(data);

// const userId = dataJS.id;
// const username = dataJS.username;
// const avatarUrl = dataJS.avatar_url;
// const emails = dataJS.email;

// export const account = {
//   displayName: username,
//   email: emails,
//   // photoURL: '/assets/images/avatars/avatar_20.jpg',
//   photoURL: avatarUrl,
// };



const data = localStorage.getItem('user');
let dataJS = {
  id: '100',
  username: 'None',
  avatar_url: 'abc.noHay',
  email: 'nohay@no.com',
};
if (data) {
  dataJS = JSON.parse(data);
}

const userId = dataJS.id;
const username = dataJS.username;
const avatarUrl = dataJS.avatar_url;
const emails = dataJS.email;

export const account = {
  displayName: username,
  email: emails,
  photoURL: avatarUrl,
};
