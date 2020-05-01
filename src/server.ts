import app from "./app";

// const port = process.env.PORT || 7000;
const port = process.env.MYAPP_PORT;

app.listen(port, () => {
  console.log(`started auth-server on port ${port}`);
});
