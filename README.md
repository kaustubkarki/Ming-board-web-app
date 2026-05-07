Architecture Overview

Frontend is responsible for UI + local state + optimistic updates.

```
Client (React)
 ├── Zustand Store (source of truth)
 ├── WebSocket Client (event sync)
 ├── Operation Engine (apply/emit)
 └── UI Layer (shadcn components)

Server (Node.js WebSocket)
 ├── Room Manager
 ├── Broadcast System
 ├── Message Validator
 └── Optional Persistence
 ```

Core Principles
Operations > full state sync
Optimistic UI first, server second
Everything is room-based
Never trust client data fully
Separate shared vs local state
Messages must be small and typed
Realtime ≠ persistent state

Message System

All communication follows a strict format:

type (event name, Create/Delete)
roomId (scope)
userId (actor)
payload (data)
timestamp (ordering)

Realtime Flow
User performs action (move/edit/create)
Client applies change immediately (optimistic update)
Client sends operation via WebSocket
Server broadcasts to room
Other clients apply operation
State stays in sync via operations

Realtime Rules
Always deduplicate messages using unique operation IDs
Handle out-of-order messages using timestamps
Ignore stale operations (older timestamp wins rule or version check)
Reconnect automatically and rejoin room
Resync state after reconnect
always use debounce before network operation

Room System
Every session belongs to a room
All WebSocket events are scoped to roomId
Server broadcasts only within room
Clients must rejoin room after reconnect

Client Rules
Never mutate shared state directly in React
Zustand store is the single source of truth
Apply local update BEFORE sending to server
Always throttle high-frequency events (cursor, drag)
Keep WebSocket logic isolated in one module

Reconnection Strategy
Auto reconnect WebSocket on disconnect
Rejoin room after reconnect
Request latest state snapshot (or replay ops)
Deduplicate replayed operations

# Checklist
Setup
 [ ]Vite + React + TS initialized
 [ ]Tailwind configured
 [ ]shadcn/ui installed
 [ ]Zustand store created
WebSocket
[ ] Client connection setup
 [ ] Server room system
 [ ] Broadcast working
 [ ] Message schema enforced
Core Sync
 [ ] Operation system implemented
[ ] Optimistic updates working
[ ] Deduplication added
 [ ] Out-of-order handling
UX
[ ] Drag optimized (no spam events)
[ ] UI state separated from shared state
[ ] Smooth updates (no flicker)
Reliability
[ ] Auto reconnect
[ ] Room rejoin
[ ] Basic resync after reconnect