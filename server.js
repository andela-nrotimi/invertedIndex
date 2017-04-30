import express from 'express';
import path from 'path';

const app = express();

// viewed at http://localhost:7075
app.get('/', (req, res) => {
  // res.sendFile(path.join(${dirname}, '/index.html'));
  res.send('Hello World');
});

app.listen(7075);

export default app;
