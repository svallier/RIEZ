# Application TV Airbnb - Studio Saint-Hilaire-de-Riez

## 📱 Description
Application web élégante conçue pour être affichée sur un téléviseur dans votre location Airbnb. Elle offre toutes les informations essentielles pour vos voyageurs.

## ✨ Fonctionnalités

### 🏠 Accueil
- Diaporama automatique des photos du studio
- Message de bienvenue chaleureux
- Navigation intuitive

### 📸 Galerie Photos
- Présentation visuelle du logement
- Agrandissement au clic
- Grille responsive et élégante

### 📶 Connexion WiFi
- QR Code pour connexion automatique
- Affichage des identifiants
- Instructions claires

### 🎯 Activités à Proximité
- Plages (Plage de Riez - 1,5 km)
- Puy du Fou (80 km)
- Pistes cyclables
- Port Olona - Les Sables-d'Olonne (25 km)
- Île de Noirmoutier (45 km)
- Marchés locaux
- École de surf et activités nautiques
- Restaurants et crêperies

### ℹ️ Informations Pratiques
- 🧺 **Laverie** : Laverie automatique en centre-ville
- 🥖 **Distributeur de pain** : Pain frais 24h/24
- 🗑️ **Poubelles** : Container sécurisé avec carte d'accès (11 rue des Galées)
- 🛒 **Commerces** : Supermarché, pharmacie, médecin
- 🚗 **Parking** : Place privée gratuite
- 📞 **Urgences** : Tous les numéros d'urgence

### 🔑 Instructions Checkout
- Heure de départ : 11h00 maximum
- Liste de vérifications avant départ
- Instructions de nettoyage
- Remise des clés
- Message de remerciement

### 📺 Multimédia
- Netflix
- Disney+
- Prime Video
- Orange TV
- Chaînes TNT
- YouTube

## 🚀 Installation

1. **Télécharger tous les fichiers** dans un même dossier :
   - `index.html`
   - `styles.css`
   - `script.js`
   - Dossier `images/`

2. **Ajouter vos photos** dans le dossier `images/` :
   - Renommez vos photos : `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
   - Formats recommandés : JPG ou PNG
   - Résolution conseillée : 1920x1080px minimum pour un affichage TV optimal

3. **Configurer le WiFi** :
   - Ouvrez `script.js`
   - Ligne 50-51, remplacez :
     ```javascript
     const wifiSSID = "LesMouettes";
     const wifiPassword = "LesMouettes85";
     ```
   - Mettez vos véritables identifiants WiFi

4. **Ouvrir sur la TV** :
   - Méthode 1 : Copiez les fichiers sur une clé USB et ouvrez `index.html` depuis le navigateur de la TV
   - Méthode 2 : Hébergez les fichiers sur un serveur web et accédez via l'URL
   - Méthode 3 : Utilisez un Raspberry Pi ou mini PC connecté à la TV

## 🖼️ Photos à Ajouter

Pour obtenir les photos depuis votre annonce Airbnb :
1. Allez sur votre annonce : https://www.airbnb.co.uk/rooms/1543062299237447241
2. Téléchargez toutes les photos
3. Renommez-les : `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`, `photo6.jpg`
4. Placez-les dans le dossier `images/`

**Photos recommandées :**
- photo1.jpg : Vue d'ensemble du studio
- photo2.jpg : Salon
- photo3.jpg : Cuisine équipée
- photo4.jpg : Chambre
- photo5.jpg : Salle de bain
- photo6.jpg : Extérieur/balcon

## ⚙️ Personnalisation

### Modifier les informations WiFi
Fichier : `script.js` (lignes 50-51)

### Ajouter/modifier des activités
Fichier : `index.html` (section `#activites`)

### Changer les couleurs
Fichier : `styles.css` (lignes 2-12, variables CSS)

### Modifier l'heure de checkout
Fichier : `index.html` (cherchez "11h00")

## 🎮 Navigation

### Sur ordinateur/tablette
- Cliquez sur les liens de navigation en haut
- Utilisez la souris pour interagir

### Sur TV avec télécommande
- Flèches ← → pour naviguer entre sections
- Bouton OK/Entrée pour sélectionner

### Navigation automatique
- Le diaporama change automatiquement toutes les 5 secondes
- Les animations se déclenchent au scroll

## 📱 Responsive

L'application s'adapte automatiquement :
- 📺 Grands écrans TV (1920px+) : Interface optimisée
- 💻 Ordinateurs (1024px-1920px) : Interface standard
- 📱 Tablettes et mobiles (< 1024px) : Interface adaptée

## 🔧 Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Animations et design moderne
- **JavaScript** : Interactivité et navigation
- **QRCode.js** : Génération du QR code WiFi

## ⚠️ Important

1. **Remplacez les identifiants WiFi** dans `script.js` avant utilisation
2. **Ajoutez vos propres photos** dans le dossier `images/`
3. **Vérifiez les informations** (horaires, distances, numéros) selon votre situation
4. **Testez sur la TV** avant l'arrivée des voyageurs

## 🌐 Mode Plein Écran (Recommandé pour TV)

Pour un affichage optimal sur TV :
1. Ouvrez `index.html` dans le navigateur de la TV
2. Appuyez sur F11 (ou le bouton plein écran de votre navigateur)
3. L'application occupera tout l'écran

## 💡 Astuces

- **Auto-démarrage** : Configurez la TV pour ouvrir automatiquement l'application au démarrage
- **Économie d'énergie** : Désactivez la mise en veille de l'écran
- **Mise à jour** : Modifiez facilement les informations en éditant les fichiers HTML
- **Plusieurs langues** : Dupliquez le fichier HTML pour créer une version anglaise

## 📝 Licence

Application créée pour un usage personnel dans le cadre d'une location Airbnb.

## 🆘 Support

Pour toute question ou modification, éditez directement les fichiers :
- `index.html` : Contenu et structure
- `styles.css` : Apparence et couleurs
- `script.js` : Fonctionnalités et interactions

---

**Profitez bien de votre studio à Saint-Hilaire-de-Riez ! 🏖️**
