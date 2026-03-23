const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, default: null },   // null for OAuth-only users

  // OAuth
  googleId: { type: String, default: null },
  avatar:   { type: String, default: null },

  // Auth state
  isVerified:      { type: Boolean, default: false },
  refreshTokens:   [{ token: String, createdAt: { type: Date, default: Date.now } }],
}, { timestamps: true });

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = function (plain) {
  if (!this.password) return Promise.resolve(false);
  return bcrypt.compare(plain, this.password);
};

// Never expose sensitive fields
UserSchema.methods.toSafeObject = function () {
  return {
    _id:        this._id,
    name:       this.name,
    email:      this.email,
    avatar:     this.avatar,
    isVerified: this.isVerified,
    createdAt:  this.createdAt,
  };
};

module.exports = mongoose.model('User', UserSchema);
