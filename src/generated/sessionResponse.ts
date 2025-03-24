/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * TeaCoder API
 * API for Teacoder educational platform
 * OpenAPI spec version: 1.0.0
 */

export interface SessionResponse {
  /** Unique identifier */
  id: string;
  /** Date and time when the session was created */
  createdAt: string;
  /** Country from which the login occurred */
  country: string;
  /** City from which the login occurred */
  city: string;
  /** Name of the browser used */
  browser: string;
  /** Operating system of the user */
  os: string;
}
