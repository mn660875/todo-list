"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("loggedIn");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 cursor-pointer py-2 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  );
}
