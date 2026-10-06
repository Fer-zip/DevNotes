import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.listen(PORT, () => {

  console.log(`
  🚀 SERVER READY
  ---------------------------------
  Local: http://localhost:${PORT}
  Mode:  ${process.env.NODE_ENV || 'development'}
  ---------------------------------
  `);
});
