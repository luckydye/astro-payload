/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    pages: Page;
    media: Media;
    todos: Todo;
    users: User;
  };
  globals: {
    theme: Theme;
  };
}
export interface Page {
  id: string;
  title: string;
  slug: string;
  layout: {
    richText: {
      [k: string]: unknown;
    }[];
    id?: string;
    blockName?: string;
    blockType: 'Text';
  }[];
  _status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}
export interface Media {
  id: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    card?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    tablet?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
export interface Todo {
  id: string;
  listName?: string;
  tasks?: {
    name?: string;
    complete?: boolean;
    id?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
export interface User {
  id: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
}
export interface Theme {
  id: string;
  name?: string;
  logo?: string | Media;
}