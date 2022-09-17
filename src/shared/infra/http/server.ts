import app from './app';

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${SERVER_PORT}`);
});
