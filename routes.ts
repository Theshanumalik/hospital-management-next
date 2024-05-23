/**
 * These are the routes that are public and do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/appointment"];

/**
 * These are auth routes that are used for authentication
 * These are redirect authenticated routes DEFAULT: /dashboard
 * @type {string[]}
 */

export const authRoutes = ["/register", "/sign-in"];

/**
 * This is the prefix for the api auth routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * This is the default redirect route after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
