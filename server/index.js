import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 3000;

async function init() {
  try {
    await mongoose.connect(process.env.DB);

    app.listen(PORT, () => {
      console.log('Database connection successful!');
      console.log(`Server running on port ${PORT}...`);
    });
  } catch (error) {
    console.log('ERROR **', error);
  }
}

init();
