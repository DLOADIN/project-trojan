"use client"

import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const date = new Date();
const TodayDate = date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });

export function UserNav() {
  const router = useRouter(); 

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('sessionToken') ?? '' // Include the session token
        },
        credentials: 'include', // Include cookies if using session-based authentication
      });

      if (response.ok) {
        localStorage.removeItem('sessionToken'); // Example: Remove session token from localStorage
        localStorage.removeItem('user'); // Example: Remove user data from localStorage

        router.push('../'); 
        window.history.replaceState(null, '', '../Login'); 
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button className="relative rounded-full p-2 hover:bg-[#f8f9fa]"></button>
      <span className="text-sm text-[#1a1d1f]">{TodayDate}</span>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="bg-gray-900 text-white rounded-full px-6 py-2.5 text-[13px]"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}