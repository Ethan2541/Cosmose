# Cosmose

![Bannière Cosmose](https://github.com/Ethan2541/Cosmose/blob/main/Design/Cosmose.png) 

Cosmose est un clone du réseau social `Twitter` réalisé dans le cadre d'un projet de fin de semestre dans le cadre de l'unité d'enseignement `LU3IN017 - Technologies Web` à _Sorbonne Université_. Le framework que nous avons utilisé pour mener à bien ce projet est `React.js`.


## Structure du Projet

### Arborescence

- L'ensemble du contenu `HTML`, `CSS` et `Javascript` est contenu dans le dossier `src` : respectivement `src/pages`, `src/styles` et `src/.`.
- Les icônes et images sont présentes dans le dossier `src/assets`.


### Composants React

La liste des composants React et de leur utilité est la suivante :

- `<Accueil />` : affichage offline des différentes options de connexion / inscription.
- `<Entete />` : barre de navigation utilisée lors des étapes de connexion / inscription.
- `<Inscription />` : contient des composants <Titre /> et <FormInscription /> qui permet d'afficher le formulaire d'inscription, de créer une entrée dans la base de données des utilisateurs, et de basculer sur le fil d'actualité en actualisant le statut utilisateur (déconnecté -> connecté).
- `<Connexion />` : contient des composants <Titre /> et <FormConnexion /> qui permet d'afficher le formulaire de connexion, et de basculer sur le fil d'actualité en actualisant le statut utilisateur (déconnecté -> connecté).
- `<Recherche />` : permet de rechercher et filtrer une liste de messages.
- `<Menu />` : panneau latéral contenant les différents éléments de navigation.
- `<Messages />` : contient un composant <MessageACreer /> qui permet à l'utilisateur de saisir un message à publier, et un composant <ListeMessages /> qui affiche une liste de composants <Messages />. Il est possible de spécifier les auteurs des messages à afficher.
- `<Banniere />` : bannière et photo de profil de l'utilisateur.
- `<Infos />` : contient un composant <Compteurs /> qui affiche les statistiques principales de l'utilisateur, un composant <Stats /> affichant les statistiques annexes de l'utilisateur (temps passé sur `Cosmose`, ...), ainsi qu'un composant <ListeAmis /> qui affiche une liste de composants <Amis /> spécifiques à l'utilisateur.
