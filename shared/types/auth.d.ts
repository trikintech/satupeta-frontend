import "next-auth";

import { Role } from "./role";

// Extend the built-in session types
declare module "next-auth" {
  /**
   * Penambahan property untuk User
   */
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username: string;
    role: Role;
    access_token: string;
    refresh_token: string;
    accessTokenExpires: number;
  }

  /**
   * Penambahan property untuk Session
   */
  interface Session {
    access_token: string;
    refresh_token: string;
    error?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username: string;
      role: string;
    };
  }
}

// Extend JWT untuk menyimpan data token
declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT type
   */
  interface JWT {
    access_token: string;
    refresh_token: string;
    accessTokenExpires: number;
    error?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username: string;
      role: Role;
    };
  }
}
