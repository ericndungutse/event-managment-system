import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide your email.'],
      unique: [true, 'Email already in use'],
      lowercase: true,
      trim: true,
    },

    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret._id;
      },
    },
    timestamps: true,
    versionKey: false,
  }
);

// Hash Password
userSchema.pre('save', async function (next) {
  // CHECK IF PASSWORD WAS MODIFIED
  // IF NO, Return AND GO OVER
  if (!this.isModified('password')) return next();

  // IF YES HASH THE PASSWORD
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model('User', userSchema);

export default User;
