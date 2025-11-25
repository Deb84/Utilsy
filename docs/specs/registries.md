# Class: Registry

## Fields
**store**: *Map*

## Méthodes
`register(k, v):` `Result<void>`  
`unregister(k):` `Result<void>`  
`get(k):` `Result<value>`  
`has(k):` `Result<boolean>`
 
<br>
<br>

# Registries

Catalogue global des registres de la code codebase.

## activeCustomIdRegistry
**Types:** SetRegistry (*string*)  
Store les `customId` actifs. 

## interactionCallbackRegistry
**Types:** MapRegistry (*customId*, *Callback*)  
Store des *callbacks* liées à des *customId* prêtes à être utilisées par le *InteractionHandler*

