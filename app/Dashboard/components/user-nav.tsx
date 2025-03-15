"use client";

import { useRouter } from "next/navigation"; 
const date = new Date();
const TodayDate = date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });

export function UserNav() {
  const router = useRouter(); 

  const handleLogout = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken');
      console.log('Session token:', sessionToken);

      if (!sessionToken) {
        console.error('No session token found');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': sessionToken,
      };
      console.log('Headers:', headers);

      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers,
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Logout successful:', data);
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('user');
        router.push('../Login'); 
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
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
