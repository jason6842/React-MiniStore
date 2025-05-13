import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/auth.api";

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

  if (isLoading) return <h2>Loading profile...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <div>
      <h2>Hello, {user.email}</h2>
    </div>
  );
}
