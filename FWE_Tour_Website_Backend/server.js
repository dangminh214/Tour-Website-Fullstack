const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app')

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true
})
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const server = app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
