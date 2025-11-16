## Event routing

Example for the `clientReady` event:

```
index.ts
└── load
    └── src/handlers/eventHandler.ts (sets up client.on & once)
        └── load and execute src/events/clientReady.ts
```
