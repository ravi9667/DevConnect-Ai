import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            minLength: 3,
            maxLength: 50,
        },

        username: {
            type: String,
            required: [true, "userName is required"],
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 3,
            maxLength: 30,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: true,
        },

        password: {
            type: String,
            required: function () {
                return this.authProvider === "local";
            },
            trim: true,
            minLength: 8,
            maxLength: 100,
            select: false,
        },

        authProvider: {
            type: String,
            enum: ["local", "google", "github"],
            default: "local",
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        emailVerificationToken: {
            type: String,
            default: null,
            select: false,
        },

        emailVerificationExpires: {
            type: Date,
            default: null,
            select: false,
        },

        refreshToken: {
            type: String,
            default: null,
            select: false,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        isActive: {
            type: Boolean,
            default: true
        },

    },
    { timestamps: true }
);

// pre("save") middleware =>
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return;
    
    this.password = await bcrypt.hash(this.password, 12);
});

// methods =>
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema);