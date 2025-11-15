# Workspace Staff Manager

Workspace Staff Manager est une application web innovante développée pour **WorkSphere**.  
Elle permet la **gestion visuelle**, **interactive** et **en temps réel** du personnel au sein d’un bâtiment, en respectant les règles métiers liées aux rôles et aux zones accessibles.

L'objectif est de centraliser la gestion du personnel dans une interface moderne et intuitive, intégrant un plan d’étage interactif et des fonctionnalités avancées de manipulation des employés.

---

## 🚀 Fonctionnalités principales

### 🧩 Gestion visuelle du personnel
- Ajout, déplacement et suppression des employés sur un plan d’étage.
- Interface entièrement graphique et interactive.
- Liste “Unassigned Staff” affichant les employés non placés.

### 📍 Plan d’étage interactif
Le bâtiment comporte **6 zones** :
- Salle de conférence  
- Réception  
- Salle des serveurs  
- Salle de sécurité  
- Salle du personnel  
- Salle d’archives  

### 🧪 Validation et règles métier
- Validation des formulaires via **REGEX**.
- Contrôle des dates dans les expériences professionnelles.
- Restrictions logiques selon le rôle :

| Rôle | Zones autorisées |
|------|------------------|
| Réceptionniste | Réception |
| Technicien IT | Salle des serveurs |
| Agent de sécurité | Salle de sécurité |
| Manager | Accès global |
| Nettoyage | Toutes zones sauf archives |
| Autres rôles | Accès libre hors zones restreintes |

### ➕ Ajout et gestion des employés
- Modale d’ajout d’un employé avec :
  - Nom  
  - Rôle  
  - Photo (URL) + prévisualisation  
  - Email  
  - Téléphone  
  - Expériences professionnelles avec formulaire dynamique  
- Bouton “X” pour retirer un employé d'une zone.  
- Bouton “+” dans chaque zone pour ajouter un employé autorisé.

### 👤 Profil détaillé
- Photo grand format  
- Informations personnelles  
- Expériences professionnelles  
- Localisation actuelle  

### 🎨 Interface moderne et responsive
- Versions Desktop & Mobile.
- Utilisation de Flexbox, Grid, palette cohérente et icônes intuitives.
- Animations CSS fluides et boutons colorés (vert, orange, rouge).
- Zones obligatoires vides apparaissant en rouge pâle.

---

