import { useState } from "react";

export default function NotificationsModal({ onClose }) {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Daily check-in available", message: "Record your mood and activity for today." },
    { id: 2, title: "New skill suggestion", message: "Consider adding TypeScript to your skill matrix." },
  ]);

  const handleClearAll = () => setNotifications([]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#2D4C59]">Notifications</h2>
            <p className="mt-1 text-sm text-[#5E6F78]">Recent updates and reminders.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleClearAll} className="rounded-full border border-[#D1FAE5] bg-[#ECFDF5] px-4 py-2 text-sm font-semibold text-[#166534] shadow-sm">
              Clear all
            </button>
            <button onClick={onClose} className="rounded-full border border-[#F2D5A5] bg-[#FFF1E0] px-4 py-2 text-sm font-semibold text-[#C84D38] shadow-sm">
              Close
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {notifications.length === 0 ? (
            <div className="rounded-3xl border border-[#F2D5A5] bg-[#FFF8EF] p-6 text-center text-sm text-[#5E6F78]">
              No notifications to show. You're all caught up.
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="rounded-3xl border border-[#F2D5A5] bg-[#FFF8EF] p-4">
                <p className="font-semibold text-[#2D4C59]">{notification.title}</p>
                <p className="mt-1 text-sm text-[#5E6F78]">{notification.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
