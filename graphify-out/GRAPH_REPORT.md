# Graph Report - apps/therapist (excl. ios)  (2026-04-18)

## Corpus Check
- 80 files · ~53,848 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 195 nodes · 171 edges · 65 communities detected
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Architecture & Docs Hub|Architecture & Docs Hub]]
- [[_COMMUNITY_Backend Stubs & OTP|Backend Stubs & OTP]]
- [[_COMMUNITY_Chat UI Components|Chat UI Components]]
- [[_COMMUNITY_Schedule & Calendar|Schedule & Calendar]]
- [[_COMMUNITY_Assignment Review|Assignment Review]]
- [[_COMMUNITY_OTP Service Backend|OTP Service Backend]]
- [[_COMMUNITY_App Icons & Assets|App Icons & Assets]]
- [[_COMMUNITY_Chat Screen|Chat Screen]]
- [[_COMMUNITY_Auth Service|Auth Service]]
- [[_COMMUNITY_Validators|Validators]]
- [[_COMMUNITY_Splash Screen|Splash Screen]]
- [[_COMMUNITY_Login Screen|Login Screen]]
- [[_COMMUNITY_Verification Scheduling|Verification Scheduling]]
- [[_COMMUNITY_Exercise Detail|Exercise Detail]]
- [[_COMMUNITY_Typing Indicator|Typing Indicator]]
- [[_COMMUNITY_OTP Service Client|OTP Service Client]]
- [[_COMMUNITY_Mock Auth Service|Mock Auth Service]]
- [[_COMMUNITY_Auth Controller|Auth Controller]]
- [[_COMMUNITY_Therapist Controller|Therapist Controller]]
- [[_COMMUNITY_Therapist Service|Therapist Service]]
- [[_COMMUNITY_Auth Navigator|Auth Navigator]]
- [[_COMMUNITY_Root Navigator|Root Navigator]]
- [[_COMMUNITY_Assign Flow Navigator|Assign Flow Navigator]]
- [[_COMMUNITY_App Navigator|App Navigator]]
- [[_COMMUNITY_Messages Screen|Messages Screen]]
- [[_COMMUNITY_Select Client Screen|Select Client Screen]]
- [[_COMMUNITY_Registration Next Step|Registration Next Step]]
- [[_COMMUNITY_Clerk Auth Screen|Clerk Auth Screen]]
- [[_COMMUNITY_Booking Confirmed|Booking Confirmed]]
- [[_COMMUNITY_Gov ID Verification|Gov ID Verification]]
- [[_COMMUNITY_Onboarding|Onboarding]]
- [[_COMMUNITY_Therapist Portal|Therapist Portal]]
- [[_COMMUNITY_Profile Photo|Profile Photo]]
- [[_COMMUNITY_Register Screen|Register Screen]]
- [[_COMMUNITY_Personal Info|Personal Info]]
- [[_COMMUNITY_Dashboard|Dashboard]]
- [[_COMMUNITY_All Clients Screen|All Clients Screen]]
- [[_COMMUNITY_Pending Verification|Pending Verification]]
- [[_COMMUNITY_Exercise Library|Exercise Library]]
- [[_COMMUNITY_App Button|App Button]]
- [[_COMMUNITY_Input Field|Input Field]]
- [[_COMMUNITY_Bottom Tab Bar|Bottom Tab Bar]]
- [[_COMMUNITY_Exercise Select Modal|Exercise Select Modal]]
- [[_COMMUNITY_Quick Replies Sheet|Quick Replies Sheet]]
- [[_COMMUNITY_Composer Bar|Composer Bar]]
- [[_COMMUNITY_Reply Preview Bar|Reply Preview Bar]]
- [[_COMMUNITY_Attachment Tray|Attachment Tray]]
- [[_COMMUNITY_Reaction Picker|Reaction Picker]]
- [[_COMMUNITY_Client Card|Client Card]]
- [[_COMMUNITY_Step Progress Bar|Step Progress Bar]]
- [[_COMMUNITY_Login Form Hook|Login Form Hook]]
- [[_COMMUNITY_Auth Middleware|Auth Middleware]]
- [[_COMMUNITY_Rate Limiter|Rate Limiter]]
- [[_COMMUNITY_App Entry Point|App Entry Point]]
- [[_COMMUNITY_Fonts Constants|Fonts Constants]]
- [[_COMMUNITY_Colors Constants|Colors Constants]]
- [[_COMMUNITY_Routes Constants|Routes Constants]]
- [[_COMMUNITY_Strings Constants|Strings Constants]]
- [[_COMMUNITY_Auth Service Clerk|Auth Service Clerk]]
- [[_COMMUNITY_Therapist Model|Therapist Model]]
- [[_COMMUNITY_User Model|User Model]]
- [[_COMMUNITY_Auth Routes|Auth Routes]]
- [[_COMMUNITY_Therapist Routes|Therapist Routes]]
- [[_COMMUNITY_Index Entry Point|Index Entry Point]]
- [[_COMMUNITY_Splash Icon Asset|Splash Icon Asset]]

## God Nodes (most connected - your core abstractions)
1. `Dev Log 2026-03-06` - 13 edges
2. `Dev Log 2026-03-05` - 10 edges
3. `Documentation Index` - 8 edges
4. `TherapistPortalScreen` - 7 edges
5. `MobileVerificationScreen (OTP)` - 7 edges
6. `Navigation Architecture` - 6 edges
7. `AuthService.js` - 6 edges
8. `Authentication System Feature` - 5 edges
9. `API Integration Strategy` - 5 edges
10. `Mock-First Backend Pattern` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Movement With Physios Brand Logo` --conceptually_related_to--> `Teal Brand Color #1A5C4A`  [INFERRED]
  apps/therapist/assets/logo.png → apps/therapist/docs/dev-log/2026-03-05.md
- `Splash Screen Feature` --references--> `Movement With Physios Brand Logo`  [EXTRACTED]
  apps/therapist/docs/features/splash-screen.md → apps/therapist/assets/logo.png
- `App Icon (Expo Default Blue A-Shape)` --semantically_similar_to--> `Favicon (Blue A-Shape on Light Blue)`  [INFERRED] [semantically similar]
  apps/therapist/assets/icon.png → apps/therapist/assets/favicon.png
- `Android Icon Foreground (Blue A-Shape)` --semantically_similar_to--> `App Icon (Expo Default Blue A-Shape)`  [INFERRED] [semantically similar]
  apps/therapist/assets/android-icon-foreground.png → apps/therapist/assets/icon.png
- `Android Icon Monochrome (Grey A-Shape)` --semantically_similar_to--> `Android Icon Foreground (Blue A-Shape)`  [INFERRED] [semantically similar]
  apps/therapist/assets/android-icon-monochrome.png → apps/therapist/assets/android-icon-foreground.png

## Communities

### Community 0 - "Architecture & Docs Hub"
Cohesion: 0.12
Nodes (30): API Integration Strategy, Folder Structure Architecture, Navigation Architecture, Movement With Physios Brand Logo, AppNavigator (NavigationContainer Root), AuthNavigator Stack, Expo SDK 54 Managed Workflow, Welcome Screen Feature Cards (Made for India, Scale Fast, Secure) (+22 more)

### Community 1 - "Backend Stubs & OTP"
Cohesion: 0.23
Nodes (15): Backend authController.js (Stub), Backend authMiddleware.js JWT (Stub), Backend rateLimiter.js Middleware (Stub), Backend therapistController.js (Stub), OTP Authentication Flow, Dev Test Credentials (phone 9876543210, OTP 123456), Therapist Onboarding Navigation Chain, Dev Log 2026-03-06 (+7 more)

### Community 2 - "Chat UI Components"
Cohesion: 0.25
Nodes (2): formatTime(), VoiceRecorder()

### Community 3 - "Schedule & Calendar"
Cohesion: 0.43
Nodes (5): CalendarPicker(), formatDate(), getDaysInMonth(), getFirstDayOfWeek(), SetScheduleScreen()

### Community 4 - "Assignment Review"
Cohesion: 0.5
Nodes (2): formatDate(), ReviewAssignmentScreen()

### Community 5 - "OTP Service Backend"
Cohesion: 0.4
Nodes (0): 

### Community 6 - "App Icons & Assets"
Cohesion: 0.4
Nodes (5): Android Icon Background (Safe Zone Grid), Android Icon Foreground (Blue A-Shape), Android Icon Monochrome (Grey A-Shape), App Icon (Expo Default Blue A-Shape), Favicon (Blue A-Shape on Light Blue)

### Community 7 - "Chat Screen"
Cohesion: 0.5
Nodes (0): 

### Community 8 - "Auth Service"
Cohesion: 0.5
Nodes (0): 

### Community 9 - "Validators"
Cohesion: 0.67
Nodes (0): 

### Community 10 - "Splash Screen"
Cohesion: 0.67
Nodes (1): SplashScreen()

### Community 11 - "Login Screen"
Cohesion: 0.67
Nodes (0): 

### Community 12 - "Verification Scheduling"
Cohesion: 0.67
Nodes (0): 

### Community 13 - "Exercise Detail"
Cohesion: 0.67
Nodes (0): 

### Community 14 - "Typing Indicator"
Cohesion: 0.67
Nodes (0): 

### Community 15 - "OTP Service Client"
Cohesion: 0.67
Nodes (0): 

### Community 16 - "Mock Auth Service"
Cohesion: 0.67
Nodes (0): 

### Community 17 - "Auth Controller"
Cohesion: 0.67
Nodes (0): 

### Community 18 - "Therapist Controller"
Cohesion: 0.67
Nodes (0): 

### Community 19 - "Therapist Service"
Cohesion: 0.67
Nodes (0): 

### Community 20 - "Auth Navigator"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Root Navigator"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Assign Flow Navigator"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "App Navigator"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Messages Screen"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Select Client Screen"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Registration Next Step"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Clerk Auth Screen"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Booking Confirmed"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Gov ID Verification"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Onboarding"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Therapist Portal"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Profile Photo"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Register Screen"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Personal Info"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Dashboard"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "All Clients Screen"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Pending Verification"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Exercise Library"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "App Button"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Input Field"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Bottom Tab Bar"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Exercise Select Modal"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Quick Replies Sheet"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Composer Bar"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Reply Preview Bar"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Attachment Tray"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Reaction Picker"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Client Card"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Step Progress Bar"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Login Form Hook"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Auth Middleware"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "Rate Limiter"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "App Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Fonts Constants"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Colors Constants"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Routes Constants"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Strings Constants"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Auth Service Clerk"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Therapist Model"
Cohesion: 1.0
Nodes (0): 

### Community 60 - "User Model"
Cohesion: 1.0
Nodes (0): 

### Community 61 - "Auth Routes"
Cohesion: 1.0
Nodes (0): 

### Community 62 - "Therapist Routes"
Cohesion: 1.0
Nodes (0): 

### Community 63 - "Index Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 64 - "Splash Icon Asset"
Cohesion: 1.0
Nodes (1): Splash Screen Icon (Safe Zone Guide)

## Knowledge Gaps
- **10 isolated node(s):** `Splash Screen Icon (Safe Zone Guide)`, `Favicon (Blue A-Shape on Light Blue)`, `Android Icon Background (Safe Zone Grid)`, `Android Icon Monochrome (Grey A-Shape)`, `Rationale: Mock-First for Frontend Independence` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Auth Navigator`** (2 nodes): `AuthNavigator.jsx`, `AuthNavigator()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Navigator`** (2 nodes): `RootNavigator.jsx`, `RootNavigator()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Assign Flow Navigator`** (2 nodes): `AssignFlowNavigator.js`, `AssignFlowNavigator()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Navigator`** (2 nodes): `AppNavigator()`, `AppNavigator.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Messages Screen`** (2 nodes): `MessagesScreen.jsx`, `MessagesScreen()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Select Client Screen`** (2 nodes): `SelectClientScreen.js`, `SelectClientScreen()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Registration Next Step`** (2 nodes): `RegistrationNextStep.jsx`, `RegistrationNextStep()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Clerk Auth Screen`** (2 nodes): `ClerkAuthScreen.jsx`, `ClerkAuthScreen()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Booking Confirmed`** (2 nodes): `BookingConfirmedScreen.jsx`, `BookingConfirmedScreen()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Gov ID Verification`** (2 nodes): `GovernmentIDVerificationScreen.jsx`, `GovernmentIDVerificationScreen()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Onboarding`** (2 nodes): `OnboardingNext.jsx`, `OnboardingNext()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Therapist Portal`** (2 nodes): `TherapistPortalScreen.jsx`, `TherapistPortalScreen()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Profile Photo`** (2 nodes): `ProfilePhotoScreen.jsx`, `ProfilePhotoScreen()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Register Screen`** (2 nodes): `RegisterScreen.jsx`, `RegisterScreen()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Personal Info`** (2 nodes): `PersonalInfoScreen.jsx`, `PersonalInfoScreen()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dashboard`** (2 nodes): `DashboardScreen.jsx`, `DashboardScreen()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `All Clients Screen`** (2 nodes): `AllClientsScreen()`, `AllClientsScreen.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pending Verification`** (2 nodes): `PendingVerificationDashboard.jsx`, `PendingVerificationDashboard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Exercise Library`** (2 nodes): `ExerciseLibraryScreen.jsx`, `ExerciseLibraryScreen()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Button`** (2 nodes): `AppButton()`, `AppButton.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Input Field`** (2 nodes): `InputField.jsx`, `InputField()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bottom Tab Bar`** (2 nodes): `BottomTabBar.jsx`, `BottomTabBar()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Exercise Select Modal`** (2 nodes): `ExerciseSelectModal.jsx`, `ExerciseSelectModal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Quick Replies Sheet`** (2 nodes): `QuickRepliesSheet.jsx`, `QuickRepliesSheet()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Composer Bar`** (2 nodes): `ComposerBar.jsx`, `ComposerBar()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Reply Preview Bar`** (2 nodes): `ReplyPreviewBar.jsx`, `ReplyPreviewBar()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Attachment Tray`** (2 nodes): `AttachmentTray.jsx`, `AttachmentTray()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Reaction Picker`** (2 nodes): `ReactionPicker.jsx`, `ReactionPicker()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Client Card`** (2 nodes): `ClientCard.js`, `ClientCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Step Progress Bar`** (2 nodes): `StepProgressBar.js`, `StepProgressBar()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Login Form Hook`** (2 nodes): `useLoginForm.js`, `useLoginForm()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Middleware`** (2 nodes): `authMiddleware.js`, `authMiddleware()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Rate Limiter`** (2 nodes): `rateLimiter.js`, `otpRateLimiter()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Entry Point`** (2 nodes): `App()`, `App.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fonts Constants`** (1 nodes): `fonts.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Colors Constants`** (1 nodes): `colors.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Routes Constants`** (1 nodes): `routes.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Strings Constants`** (1 nodes): `strings.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Service Clerk`** (1 nodes): `AuthService.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Therapist Model`** (1 nodes): `TherapistModel.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `User Model`** (1 nodes): `UserModel.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Routes`** (1 nodes): `authRoutes.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Therapist Routes`** (1 nodes): `therapistRoutes.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Index Entry Point`** (1 nodes): `index.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Splash Icon Asset`** (1 nodes): `Splash Screen Icon (Safe Zone Guide)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MobileVerificationScreen (OTP)` connect `Backend Stubs & OTP` to `Architecture & Docs Hub`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `MobileVerificationScreen (OTP)` (e.g. with `OTP Authentication Flow` and `Therapist Onboarding Navigation Chain`) actually correct?**
  _`MobileVerificationScreen (OTP)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Splash Screen Icon (Safe Zone Guide)`, `Favicon (Blue A-Shape on Light Blue)`, `Android Icon Background (Safe Zone Grid)` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Architecture & Docs Hub` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._