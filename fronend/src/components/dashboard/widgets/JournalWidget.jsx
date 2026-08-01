import { useEffect, useState } from "react";
import Card from "../../common/Card";

function formatToday() {
  const d = new Date();
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function JournalWidget() {
  const [entries, setEntries] = useState(() => {
    try {
      const raw = localStorage.getItem("journalEntries");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [todayContent, setTodayContent] = useState(() => {
    try {
      return localStorage.getItem("journalTodayContent") || "";
    } catch (e) {
      return "";
    }
  });

  const [expandedId, setExpandedId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showAllModal, setShowAllModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("journalEntries", JSON.stringify(entries));
      localStorage.setItem("journalTodayContent", todayContent);
    } catch (e) {}
  }, [entries, todayContent]);

  function addNewEntry() {
    const newId = entries.length ? Math.max(...entries.map((e) => e.id)) + 1 : 1;
    const newEntry = { id: newId, date: formatToday(), content: todayContent };
    setEntries([newEntry, ...entries]);
    setTodayContent("");
  }

  function openEntryForEdit(id) {
    const entry = entries.find((e) => e.id === id);
    setEditingText(entry ? entry.content : "");
    setExpandedId(id);
  }

  function saveEntry(id) {
    setEntries(entries.map((e) => (e.id === id ? { ...e, content: editingText } : e)));
    setExpandedId(null);
    setEditingText("");
  }

  function deleteEntry(id) {
    setEntries(entries.filter((e) => e.id !== id));
    if (expandedId === id) setExpandedId(null);
  }

  return (
    <Card title="Journal" className="p-6">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-[#F2D5A5] bg-[#FFF8EF] p-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Today's Reflection</p>
            <p className="mt-2 text-sm font-semibold text-[#2D4C59]">{formatToday()}</p>

            <div className="mt-4">
              <textarea
                value={todayContent}
                onChange={(e) => setTodayContent(e.target.value)}
                className="h-40 w-full rounded-lg border border-[#E8DCCF] bg-white p-3 text-sm text-[#5E6F78]"
              />
            </div>

            <div className="mt-4">
              <button onClick={addNewEntry} className="rounded-full border border-[#F2D5A5] bg-white px-3 py-1 text-[11px] font-semibold text-[#5E6F78] hover:bg-[#FFFDF8]">
                New Entry
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#F2D5A5] bg-[#FFFDF8] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Past Reflections</p>
          <div className="mt-4 space-y-4">
            {entries.length === 0 ? (
              <p className="text-sm text-[#5E6F78]">No entries yet.</p>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="rounded-3xl border border-[#F2D5A5] bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#2D4C59]">{entry.date}</p>
                      {expandedId === entry.id ? (
                        <textarea value={editingText} onChange={(e) => setEditingText(e.target.value)} className="mt-2 w-full rounded-md border border-[#E8DCCF] p-2 text-sm text-[#5E6F78]" />
                      ) : (
                        <p className="mt-2 text-sm text-[#5E6F78]">{entry.content.split("\n")[0]}</p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {expandedId === entry.id ? (
                        <>
                          <button onClick={() => saveEntry(entry.id)} className="text-[11px] font-semibold text-[#2D4C59]">Save</button>
                          <button onClick={() => deleteEntry(entry.id)} className="text-[11px] text-[#C84D38]">Delete</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => openEntryForEdit(entry.id)} className="text-[11px] font-semibold text-[#5E6F78]">Open</button>
                          <button onClick={() => deleteEntry(entry.id)} className="text-[11px] text-[#C84D38]">Delete</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-5 text-right">
            <button onClick={() => setShowAllModal(true)} className="text-[11px] font-semibold text-[#5E6F78] hover:text-[#2D4C59]">
              View All Entries →
            </button>
          </div>
        </div>
      </div>

      {showAllModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#2D4C59]">All Journal Entries</h3>
              <button onClick={() => setShowAllModal(false)} className="text-sm font-semibold text-[#C84D38]">Close</button>
            </div>
            <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto">
              {entries.length === 0 ? (
                <p className="text-sm text-[#5E6F78]">No entries yet.</p>
              ) : (
                entries.map((entry) => (
                  <div key={entry.id} className="rounded-3xl border border-[#F2D5A5] bg-[#FFF8EF] p-4">
                    <p className="text-sm font-semibold text-[#2D4C59]">{entry.date}</p>
                    <p className="mt-2 text-sm text-[#5E6F78] whitespace-pre-line">{entry.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
