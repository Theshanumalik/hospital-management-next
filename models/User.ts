import { Document, models, model, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  role: "moderator" | "admin" | "doctor" | "patient";
  isBanned: boolean;
  isVerified: boolean;
  reset: {
    token: string;
    expiry: Date;
  };
  verification: {
    token: string;
    expiry: Date;
  };
}

export interface IUserDoc extends IUser, Document {
  comparePassword(givenPassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {}

const userSchema = new Schema<IUser, IUserModel>(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      required: [true, "Email is required"],
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid Email",
      },
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["moderator", "admin", "doctor", "patient"],
      default: "patient",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
      select: false,
    },
    reset: {
      token: { type: String, select: false },
      expiry: { type: Date, select: false },
    },
    verification: {
      token: { type: String, select: false },
      expiry: { type: Date, select: false },
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (
  givenPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, this.password);
};

userSchema.pre<IUserDoc>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    return;
  }
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

const User: IUserModel =
  (models.User as IUserModel) || model<IUser, IUserModel>("User", userSchema);

export default User;
