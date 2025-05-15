import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  console.log("user", user);

  const { logout } = useAuth();

  if (isLoading) return <h2>Loading profile...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <div>
      <h2>Hello, {user.email}</h2>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}
