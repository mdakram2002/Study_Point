# Fix Login 403 Error - Steps

## Plan Overview
Fix client API endpoint casing: `/auth/logIn` → `/auth/login` to match server route `/api/v1/auth/login`.

## Steps
- [x] Step 1: Confirmed issue in apis.jsx - LOGIN_API uses 'logIn' (capital 'I')
- [x] Step 2: Edit Study_Point/client/src/services/apis.jsx - changed LOGIN_API from '/auth/logIn' to '/auth/login'
- [x] Step 3: Create TODO.md - done
- [ ] Step 4: Test login in browser after client restart (`cd Study_Point/client && npm run dev`)
- [ ] Step 5: Verify network tab shows 200 OK for /auth/login
- [ ] Step 6: Complete task

Current: Editing apis.jsx...
