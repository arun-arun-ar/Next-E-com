// Example of a custom React hook for authentication
import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  // ...add login, logout, check auth status logic here...
  return { user, setUser };
}
