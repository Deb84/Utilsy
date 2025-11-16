# Utilsy

Utilsy is a Discord bot written in TypeScript. The runtime is centered around a small Inversify container that wires the Discord client, REST helper, access handling, event routing, and command declaration. The current codebase focuses on the backbone (handlers, resolvers, and utilities) rather than feature-complete commands.

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file (or export environment variables) with `AUTH` set to your bot token.
3. Run the bot with tsx or another TypeScript runner. For example:
   ```bash
   npx tsx src/index.ts
   ```

## Key components
- **Bootstrap container** (`src/bootstrap/index.ts`): builds the Discord client and REST client, registers core services (access resolver, command registrar, error handling utilities), then starts event handling and slash-command declaration before logging in the client.
- **Event and interaction handling** (`src/handlers`): routes Discord events and interactions to the appropriate modules loaded from the filesystem.
- **Command declaration** (`src/services/discord/commandDeclaration`): discovers commands and registers them via the REST API, respecting access rules.
- **Access and error utilities** (`src/services` and `src/utils`): provide helpers for permission checks and consistent embed-based error replies.

## Documentation
Additional focused notes live in this folder:
- `Routing.md` covers the event-loading path.
- `command.md` summarizes access levels and command types used by the command system.
