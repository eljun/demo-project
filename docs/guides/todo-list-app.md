# Next.js Todo List Application Guide

> A simple, browser-based todo management application with authentication and persistent storage.

## Quick Start

The Todo List App is a web application that lets you manage tasks with a clean, modern interface. Log in with the demo credentials, add tasks, mark them complete, and everything is automatically saved.

**Demo Credentials:**
- Email: `user@example.com`
- Password: `password123`

---

## For Users

### Getting Started

1. Open the application in your web browser
2. You'll see the login page
3. Enter the demo credentials above
4. Click "Sign in"
5. You're now on the todo list page

### How to Add a Todo

1. Look for the text input field at the top of the page
2. Type your task description (e.g., "Buy groceries")
3. Click the "Add" button or press Enter
4. Your task appears in the list below

### How to Mark a Todo Complete

1. Find the todo you want to mark as done
2. Click the checkbox next to the task text
3. The task text will appear crossed out
4. Click the checkbox again to mark it incomplete

### How to Delete a Todo

1. Find the todo you want to remove
2. Click the trash can icon on the right side
3. The task is immediately deleted

### How to Logout

1. Click the "Logout" button in the top right corner
2. You'll be returned to the login page

### Tips

- All your todos are automatically saved in your browser
- If you refresh the page, your todos will still be there
- Logout clears your session but keeps your todos (for next login)
- For a fresh start, clear your browser's localStorage for this site

---

## FAQ

**Q: Will my todos be saved if I close the browser?**
A: Yes! Your todos are saved in your browser's local storage and will persist even after closing and reopening the browser.

**Q: Can I use different credentials?**
A: For this demo app, only `user@example.com` / `password123` are valid. In a production app, you'd connect to a real authentication system.

**Q: Can I sync todos across devices?**
A: Not with this version. Todos are stored locally on each device. To sync across devices, you'd need a backend server and cloud storage.

**Q: What happens if I clear my browser cache?**
A: Your todos will be deleted since they're stored in local storage. Be careful when clearing browser data!

**Q: Can I export my todos?**
A: This version doesn't have export functionality, but you can take a screenshot of your list.

**Q: Is this app secure?**
A: This is a demo app with hardcoded credentials for learning purposes. Never use this authentication pattern for real applications.

---

## Troubleshooting

**Issue:** I'm stuck on the login page and can't log in
**Solution:** Make sure you're using the exact credentials: `user@example.com` and `password123`. Check for extra spaces. Try refreshing the page.

**Issue:** My todos disappeared after I logged out
**Solution:** Your todos are still saved! Log back in with the same credentials and they'll reappear.

**Issue:** The page looks broken or buttons aren't responding
**Solution:** Try refreshing the page. If the issue persists, clear your browser cache and log in again.

**Issue:** I forgot to logout and closed the browser
**Solution:** Simply reopen the app and log in again. Your todos will still be there.

**Issue:** Some todos are missing
**Solution:** Check if they're scrolled off-screen. The app stores everything you add until you delete it.

---

## Related Guides
- Authentication (hardcoded demo credentials)
- Browser Local Storage (how data persists)
