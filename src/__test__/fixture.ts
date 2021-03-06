import Role from "../model/Role";

const user1 = {
  userContent: {
    id: 1,
    username: "user1",
    email: "user1@hotmail.com",
    role: Role.ADMIN,
    enabled: true,
  },
  password: "user1",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAaG90bWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJlbmFibGVkIjp0cnVlLCJpYXQiOjE1ODg1MTU1MTksImV4cCI6MTYyMDA3MzExOX0.GrskqcBvhHQpuHne-trYORpxIVpyKMy6hLsmANsbRKM",
};

const user2 = {
  userContent: {
    id: 2,
    username: "user2",
    email: "user2@hotmail.com",
    role: Role.USER,
    enabled: true,
  },
  password: "user2",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyMiIsImVtYWlsIjoidXNlcjJAaG90bWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImVuYWJsZWQiOnRydWUsImlhdCI6MTU4ODI0NTYzNywiZXhwIjoxNjE5ODAzMjM3fQ.RM_4U9nUuCsGRBTGcHXFnwShNkcyULCKsTIfQSs_ghs",
};

const user3 = {
  userContent: {
    id: 3,
    username: "user3",
    email: "user3@hotmail.com",
    role: Role.ADMIN,
    enabled: false,
  },
  password: "user3",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ1c2VyMyIsImVtYWlsIjoidXNlcjNAaG90bWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImVuYWJsZWQiOnRydWUsImlhdCI6MTU4ODI0NTYxMSwiZXhwIjoxNjE5ODAzMjExfQ.C9T3RJNSL5y30XeOLR5Q6wjjxcTVAR6TOUPD6ADOItQ",
};

const user4 = {
  userContent: {
    id: 4,
    username: "user4",
    email: "user4@hotmail.com",
    role: Role.USER,
    enabled: false,
  },
  password: "user4",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJ1c2VyNCIsImVtYWlsIjoidXNlcjRAaG90bWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImVuYWJsZWQiOmZhbHNlLCJpYXQiOjE1ODgyNDU1NjIsImV4cCI6MTYxOTgwMzE2Mn0.jdpvZAptjZtFCgOSCjwbTipaNFlF2Qhw9Ajo-ReZ-FY",
};

const user5 = {
  userContent: {
    id: 5,
    username: "user5",
    email: "user5@hotmail.com",
    role: Role.USER,
    enabled: true,
  },
  password: "user5",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJ1c2VyNSIsImVtYWlsIjoidXNlcjVAaG90bWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImVuYWJsZWQiOnRydWUsImlhdCI6MTU4ODc2NjQyNCwiZXhwIjoxNjIwMzI0MDI0fQ.cp9NGCQ70uTgGi92pO3drwwMqMZP_VKhdcIcXM_8uhk",
};

const user6 = {
  userContent: {
    id: 6,
    username: "user6",
    email: "user6@hotmail.com",
    role: Role.ADMIN,
    enabled: true,
  },
  password: "user6",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJ1c2VyNiIsImVtYWlsIjoidXNlcjZAaG90bWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJlbmFibGVkIjp0cnVlLCJpYXQiOjE1ODg2ODE3NjgsImV4cCI6MTYyMDIzOTM2OH0.CNvRkdCk7ManVxinpZsbpUgMyiKO0DfTJbi37-yFzgI",
};

export default {
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
};
