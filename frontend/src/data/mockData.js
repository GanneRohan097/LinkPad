export const files = [
  { name: "Q3 product roadmap.pdf", type: "PDF document", size: "2.8 MB", time: "Today, 10:42 AM", source: "MacBook Pro", kind: "pdf" },
  { name: "Homepage concepts.fig", type: "Figma file", size: "18.4 MB", time: "Yesterday", source: "MacBook Pro", kind: "figma" },
  { name: "Meeting notes — Oct 4.docx", type: "Word document", size: "248 KB", time: "Yesterday", source: "iPhone 15", kind: "word" },
  { name: "Campaign photos.zip", type: "Archive", size: "64.2 MB", time: "Oct 3, 2026", source: "MacBook Pro", kind: "zip" },
  { name: "Budget overview.xlsx", type: "Spreadsheet", size: "1.2 MB", time: "Oct 2, 2026", source: "MacBook Pro", kind: "sheet" },
  { name: "Brand guidelines.pdf", type: "PDF document", size: "6.1 MB", time: "Oct 1, 2026", source: "iPhone 15", kind: "pdf" },
];

export const devices = [
  { name: "MacBook Pro", type: "Laptop · macOS", active: "Active now", online: true, icon: "laptop" },
  { name: "iPhone 15", type: "Phone · iOS", active: "Synced 12 min ago", online: true, icon: "phone" },
  { name: "iPad Air", type: "Tablet · iPadOS", active: "Last seen Oct 2", online: false, icon: "tablet" },
];

export const notes = [
  { title: "Ideas for the new homepage", preview: "Keep the first screen focused. Lead with the workspace, then give people a clear place to start.", updated: "Updated today", pinned: true, color: "blue" },
  { title: "Weekend reading list", preview: "The Creative Act · Ruined by Design · A few essays from the Are.na channel.", updated: "Updated yesterday", pinned: true, color: "amber" },
  { title: "October goals", preview: "Get outside more, finish the portfolio refresh, and make time for a proper long weekend.", updated: "Updated Oct 3", pinned: false, color: "green" },
];

export const activities = [
  { title: "Uploaded Q3 product roadmap.pdf", detail: "from MacBook Pro", time: "10:42 AM", kind: "upload" },
  { title: "Updated Ideas for the new homepage", detail: "note", time: "Yesterday", kind: "note" },
  { title: "Connected iPhone 15", detail: "new device", time: "Oct 3", kind: "device" },
  { title: "Completed Review launch checklist", detail: "task", time: "Oct 2", kind: "task" },
];

export const tasks = [
  { title: "Review launch checklist", status: "Completed", due: "Oct 4, 2026", priority: "Medium", completed: true },
  { title: "Share updated mockups with the team", status: "In progress", due: "Today", priority: "High", completed: false },
  { title: "Send invoice to Northstar Studio", status: "To do", due: "Oct 7, 2026", priority: "Medium", completed: false },
  { title: "Book a room for the planning session", status: "To do", due: "Oct 9, 2026", priority: "Low", completed: false },
  { title: "Organize research references", status: "Completed", due: "Oct 1, 2026", priority: "Low", completed: true },
];
