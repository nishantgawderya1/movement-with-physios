# Backend Integration Guide — Movement With Physios

> This guide is for the **backend developer** who will replace mock API calls
> with real endpoints. The frontend UI is complete — you should **never** need
> to modify any screen, component, hook, or navigation file.

---

## 1. Your Files

You only need to work in these 2 files:

| File | Purpose |
|------|---------|
| `src/services/auth/AuthService.js` | Mock API calls → replace with real `fetch()` calls |
| `src/services/auth/tokenStorage.js` | In-memory token storage → replace with `expo-secure-store` |

**Do not modify** anything in `src/components/`, `src/screens/`, `src/hooks/`,
`src/navigation/`, `src/constants/`, or `src/utils/`.

---

## 2. Response Contract

Every API endpoint **must** return JSON matching one of these two shapes.
The frontend depends on this exact structure — do not change the keys.

### Success

```json
{
  "success": true,
  "data": {
    // endpoint-specific payload
  }
}
```

### Failure

```json
{
  "success": false,
  "error": "Human-readable error message shown to the user"
}
```

---

## 3. API Endpoints Needed

### POST `/auth/login`

**Request body:**

```json
{
  "email": "sarah@movementwithphysios.com",
  "password": "securePass123"
}
```

**Success response (200):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "therapist": {
      "id": "t_001",
      "name": "Dr. Sarah Mitchell",
      "email": "sarah@movementwithphysios.com",
      "role": "therapist"
    }
  }
}
```

**Failure response (401):**

```json
{
  "success": false,
  "error": "Invalid credentials. Please check your email and password."
}
```

---

### POST `/auth/forgot`

**Request body:**

```json
{
  "email": "sarah@movementwithphysios.com"
}
```

**Success response (200):**

```json
{
  "success": true,
  "data": {
    "message": "Password reset email sent to sarah@movementwithphysios.com"
  }
}
```

**Failure response (404):**

```json
{
  "success": false,
  "error": "No account found with that email address."
}
```

---

### POST `/auth/register`

**Request body:**

```json
{
  "name": "Dr. Sarah Mitchell",
  "email": "sarah@movementwithphysios.com",
  "password": "securePass123",
  "specialization": "Sports Physiotherapy"
}
```

**Success response (201):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "therapist": {
      "id": "t_002",
      "name": "Dr. Sarah Mitchell",
      "email": "sarah@movementwithphysios.com",
      "role": "therapist"
    }
  }
}
```

**Failure response (409):**

```json
{
  "success": false,
  "error": "An account with this email already exists."
}
```

---

## 4. How to Replace Each Mock

### Step 1 — Set the API base URL

Open `src/services/auth/AuthService.js` and set the real URL:

```js
const API_BASE_URL = 'https://your-real-api.com/api';
```

### Step 2 — Replace the `login()` function body

Delete everything between the braces of `login()` and replace with:

```js
export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();
  if (!response.ok) {
    return { success: false, error: json.error || 'Login failed' };
  }
  return { success: true, data: json.data };
}
```

### Step 3 — Replace the `forgotPassword()` function body

```js
export async function forgotPassword(email) {
  const response = await fetch(`${API_BASE_URL}/auth/forgot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const json = await response.json();
  if (!response.ok) {
    return { success: false, error: json.error || 'Request failed' };
  }
  return { success: true, data: json.data };
}
```

### Step 4 — Replace the `register()` function body

```js
export async function register(therapistData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(therapistData),
  });
  const json = await response.json();
  if (!response.ok) {
    return { success: false, error: json.error || 'Registration failed' };
  }
  return { success: true, data: json.data };
}
```

---

## 5. Token Storage

Replace the in-memory mock in `src/services/auth/tokenStorage.js` with
`expo-secure-store` for secure, persistent token storage on-device.

### Install

```bash
npx expo install expo-secure-store
```

### Replace the 3 functions

```js
import * as SecureStore from 'expo-secure-store';

export async function saveToken(token) {
  await SecureStore.setItemAsync('auth_token', token);
}

export async function getToken() {
  return await SecureStore.getItemAsync('auth_token');
}

export async function removeToken() {
  await SecureStore.deleteItemAsync('auth_token');
}
```

Remove the `let _token = null;` line and all `console.log` calls.

---

## 6. Testing

You can test each endpoint **without changing any UI code** by using the
mock credentials already built into `AuthService.js`:

| Action | Mock credentials |
|--------|-----------------|
| Login (success) | email: `test@mwp.com`, password: `password123` |
| Login (failure) | Any other email/password combination |
| Forgot password (success) | email: `test@mwp.com` |
| Forgot password (failure) | Any other email |
| Register (success) | Any email except `test@mwp.com` |
| Register (failure) | email: `test@mwp.com` |

### How to verify after connecting real API:

1. Replace mock bodies with real `fetch()` calls (see Step 2–4 above).
2. Start the app: `npx expo start`
3. Open on device via Expo Go or simulator.
4. Try logging in — the UI will show loading spinner for the real request
   duration, then display success or the error message from your API.
5. Check the console for `[MOCK]` log lines — if you still see them,
   a mock is still active and needs replacing.
6. All error messages returned in `{ success: false, error: "..." }` are
   displayed directly to the user, so make them human-friendly.
