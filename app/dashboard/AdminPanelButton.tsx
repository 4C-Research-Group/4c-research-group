"use client";
import { useState } from "react";

export default function AdminPanelButton({ isAdmin }: { isAdmin: boolean }) {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!isAdmin) {
      e.preventDefault();
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    }
    // If admin, allow navigation
  };

  return (
    <div>
      <a
        href={isAdmin ? "/admin" : "#"}
        onClick={handleClick}
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded border border-blue-700 hover:bg-blue-700 transition-colors font-medium mb-2 cursor-pointer"
      >
        Visit Admin Panel
      </a>
      {showMessage && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800 mt-2">
          You do not have access to the admin panel. Please contact your admin
          to grant you access.
        </div>
      )}
    </div>
  );
}
