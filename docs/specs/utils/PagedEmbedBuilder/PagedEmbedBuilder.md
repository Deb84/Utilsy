# Class: PagedEmbedBuilder

Orchestrer la création et le comportement d'un emned paginé pour une interface utilisateur par message sur discord.

## Propriétés
- `pages: PagedEmbedPageBuilder[]` - Une liste des pages d'embed à afficher.
- `currentPageIndex: number` - L'index de la page actuellement affichée.
- `authorId: string` - L'ID de l'utilisateur qui a initié la session paginée.
- `messageId: string | null` - L'ID du message Discord contenant l'embed paginé. Null avant l'envoi.

## Méthodes
- `constructor(interaction: Interaction)` - Initialise une nouvelle instance
-
- `addPage(page: PagedEmbedPageBuilder): void` - Ajoute une page à la liste des pages.
- `setPages(pages: PagedEmbedPageBuilder[]): void` - Définit la liste des pages.
- `getCurrentPage(): PagedEmbedPageBuilder` - Récupère la page actuellement affichée.
- `nextPage(): void` - Passe à la page suivante.
- `previousPage(): void` - Revient à la page précédente.
- `goToPage(index: number): void` - Va à une page spécifique par index.

## Classes liées
- `PagedEmbedPageBuilder` - Représente une page individuelle dans l'embed.
- `PagedEmbedInteraction` - Gère les interactions utilisateur pour la navigation entre les pages.



## Fonctionnement
1. Instance de `PagedEmbedBuilder` créée.
2. Ajout des pages via `addPage` ou `setPages`.
4. Enregistrement des interactions et callback via custom IDs au près InteractionHandler (k=id, v=callback).
5. Envoi de l'embed paginé dans un message Discord.
6. Après un timeout, suppression des interactions et callback du InteractionHandler.

## Options
- `authorOnly: boolean` - Si vrai, seules les interactions de l'auteur initial sont acceptées.

