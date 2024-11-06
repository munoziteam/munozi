import { account, client, ID } from "./config";

type authType = {
  user: any;
  sessionCookie: any;
  sendEmailOtp: any;
  createSession: any;
  getUser: any;
  deleteSession: any;
};

const auth = {
  sendEmailOtp: async (email: any) => {
    try {
      const sessionToken = await account.createEmailToken(ID.unique(), email);
      console.log("OTP sent:", sessionToken);
      return sessionToken.userId; // This contains the userId
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  },

  createSession: async (userId: any, otp: any) => {
    try {
      const session = await account.createSession(userId, otp);
      console.log("session", session);
      client.setSession(session.secret);
      return session;
    } catch (error) {
      console.log("🚀 ~ createSession: ~ error:", error);
      throw error;
    }
  },

  getUser: async () => {
    try {
      const user = await account.get();
      return user;
    } catch (err) {
      console.log("🚀 ~ getUser: ~ err:", err);
      return null;
    }
  },

  deleteSession: async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log("🚀 ~ deleteSession: ~ error:", error);
      throw error;
    }
  },
} as authType;

export default auth;
