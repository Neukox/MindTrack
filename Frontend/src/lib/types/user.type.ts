export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Profile extends User {
  createdAt: string;
}
