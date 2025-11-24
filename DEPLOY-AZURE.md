# 🚀 Déploiement sur Azure Web App

Guide complet pour déployer votre application Airbnb TV sur Azure.

## 📋 Prérequis

1. **Compte Azure** - [Créer un compte gratuit](https://azure.microsoft.com/free/)
2. **Azure CLI** - [Installer Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli)

### Installation d'Azure CLI (PowerShell)

```powershell
# Windows avec winget
winget install -e --id Microsoft.AzureCLI

# Ou via MSI
Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi
Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'
```

## 🎯 Méthode 1: Déploiement Automatique (Recommandé)

### Étape 1: Connexion à Azure

```powershell
az login
```

### Étape 2: Configurer vos identifiants WiFi

Éditez `script.js` et remplacez les identifiants WiFi :

```javascript
const wifiSSID = "VotreNomWiFi"; // À MODIFIER
const wifiPassword = "VotreMotDePasseWiFi"; // À MODIFIER
```

### Étape 3: Ajouter vos photos

Placez vos photos dans le dossier `images/` :
- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`
- etc.

### Étape 4: Lancer le déploiement

```powershell
.\deploy-to-azure.ps1 -ResourceGroupName "rg-airbnb-tv" -WebAppName "airbnb-tv-riez"
```

**Options disponibles :**

```powershell
# Avec région spécifique
.\deploy-to-azure.ps1 -ResourceGroupName "rg-airbnb-tv" -WebAppName "airbnb-tv-riez" -Location "francecentral"

# Avec SKU différent (F1=Gratuit, B1=Basic, S1=Standard)
.\deploy-to-azure.ps1 -ResourceGroupName "rg-airbnb-tv" -WebAppName "airbnb-tv-riez" -Sku "B1"
```

### Étape 5: Accéder à votre application

Votre application sera disponible à : `https://airbnb-tv-riez.azurewebsites.net`

## 🎯 Méthode 2: Déploiement Manuel via Azure Portal

### 1. Créer une Web App

1. Connectez-vous au [Portail Azure](https://portal.azure.com)
2. Cliquez sur **"Créer une ressource"**
3. Recherchez **"Web App"**
4. Remplissez les informations :
   - **Nom** : `airbnb-tv-riez` (doit être unique)
   - **Publier** : Code
   - **Pile d'exécution** : HTML
   - **Système d'exploitation** : Windows
   - **Région** : France Central
   - **Plan** : Free F1 (gratuit)

### 2. Déployer les fichiers

**Option A : Via FTP**

1. Dans votre Web App → **Centre de déploiement**
2. Choisissez **"FTP"** → **Tableau de bord**
3. Notez les identifiants FTP
4. Utilisez FileZilla ou un client FTP pour uploader :
   - `index.html`
   - `styles.css`
   - `script.js`
   - `web.config`
   - Dossier `images/`

**Option B : Via ZIP Deploy**

```powershell
# Créer le ZIP
Compress-Archive -Path index.html,styles.css,script.js,web.config,images -DestinationPath deploy.zip

# Déployer
az webapp deployment source config-zip `
    --resource-group rg-airbnb-tv `
    --name airbnb-tv-riez `
    --src deploy.zip
```

**Option C : Via GitHub Actions** (voir section ci-dessous)

## 🔄 Déploiement Continu avec GitHub Actions

### 1. Pousser le code sur GitHub

```powershell
git init
git add .
git commit -m "Initial commit - Airbnb TV App"
git branch -M main
git remote add origin https://github.com/votre-username/airbnb-tv.git
git push -u origin main
```

### 2. Configurer le déploiement GitHub

1. Dans Azure Portal → Votre Web App
2. **Centre de déploiement** → **GitHub**
3. Autorisez Azure à accéder à votre GitHub
4. Sélectionnez votre repository
5. Azure créera automatiquement un workflow GitHub Actions

### 3. Le workflow sera créé automatiquement

À chaque `git push`, votre application sera automatiquement déployée !

## ⚙️ Configuration Azure

### Variables d'environnement (optionnel)

Si vous souhaitez gérer le WiFi via des variables d'environnement :

```powershell
az webapp config appsettings set `
    --resource-group rg-airbnb-tv `
    --name airbnb-tv-riez `
    --settings WIFI_SSID="VotreWiFi" WIFI_PASSWORD="VotreMotDePasse"
```

### Domaine personnalisé (optionnel)

1. Azure Portal → Votre Web App → **Domaines personnalisés**
2. Ajoutez votre domaine (ex: `tv.votrelocation.com`)
3. Configurez les enregistrements DNS chez votre registrar
4. Activez le **certificat SSL gratuit**

### Activer HTTPS obligatoire

```powershell
az webapp update `
    --resource-group rg-airbnb-tv `
    --name airbnb-tv-riez `
    --https-only true
```

## 📊 Monitoring et Logs

### Voir les logs en temps réel

```powershell
az webapp log tail --name airbnb-tv-riez --resource-group rg-airbnb-tv
```

### Activer Application Insights (optionnel)

```powershell
az monitor app-insights component create `
    --app airbnb-tv-insights `
    --location francecentral `
    --resource-group rg-airbnb-tv
```

### Redémarrer l'application

```powershell
az webapp restart --name airbnb-tv-riez --resource-group rg-airbnb-tv
```

## 💰 Coûts

### Tier Gratuit (F1)
- ✅ **Gratuit**
- ⚠️ Limitations :
  - 60 minutes CPU/jour
  - 1 GB de stockage
  - Pas d'AlwaysOn (l'app peut "dormir")
  - Domaine : `*.azurewebsites.net`

### Tier Basic (B1)
- 💵 **~13€/mois**
- ✅ Avantages :
  - CPU et mémoire dédiés
  - AlwaysOn activé
  - Domaines personnalisés + SSL
  - Meilleure performance

### Recommandation
Pour un écran TV en location Airbnb, le **tier gratuit F1** est suffisant ! L'application est légère et statique.

## 🛠️ Commandes Utiles

```powershell
# Voir toutes vos Web Apps
az webapp list --output table

# Obtenir l'URL de l'application
az webapp show --name airbnb-tv-riez --resource-group rg-airbnb-tv --query defaultHostName --output tsv

# Mettre à jour les fichiers
az webapp deployment source config-zip --resource-group rg-airbnb-tv --name airbnb-tv-riez --src deploy.zip

# Voir les métriques
az monitor metrics list --resource /subscriptions/SUBSCRIPTION_ID/resourceGroups/rg-airbnb-tv/providers/Microsoft.Web/sites/airbnb-tv-riez

# Supprimer complètement
az group delete --name rg-airbnb-tv --yes
```

## 🔒 Sécurité

### Bonnes pratiques

1. **HTTPS Obligatoire** ✅ (configuré dans `web.config`)
2. **Pas d'informations sensibles** dans le code
3. **Mise en cache** activée pour performances
4. **En-têtes de sécurité** configurés

### Restreindre l'accès (optionnel)

Si vous voulez limiter l'accès :

```powershell
# Autoriser uniquement certaines IPs
az webapp config access-restriction add `
    --resource-group rg-airbnb-tv `
    --name airbnb-tv-riez `
    --rule-name 'AllowMyIP' `
    --action Allow `
    --ip-address 'VOTRE_IP/32' `
    --priority 100
```

## 📱 Configuration pour TV

### 1. Sur la TV, ouvrir le navigateur

Sur votre Smart TV :
1. Ouvrir le navigateur web
2. Aller sur : `https://airbnb-tv-riez.azurewebsites.net`
3. Mettre en favoris / Épingler
4. Passer en mode plein écran (F11)

### 2. Configuration automatique au démarrage

Selon la marque de TV :
- **Samsung Tizen** : Définir comme page d'accueil
- **LG webOS** : Créer un launcher
- **Android TV** : Installer "Fully Kiosk Browser" et configurer en kiosque

### 3. Alternative : Raspberry Pi / Mini PC

Pour un contrôle total :
1. Connecter un Raspberry Pi à la TV
2. Installer Chromium en mode kiosque
3. Lancer automatiquement l'URL au démarrage

## 🐛 Dépannage

### L'application ne se charge pas
```powershell
# Vérifier les logs
az webapp log tail --name airbnb-tv-riez --resource-group rg-airbnb-tv

# Redémarrer
az webapp restart --name airbnb-tv-riez --resource-group rg-airbnb-tv
```

### Les images ne s'affichent pas
- Vérifier que le dossier `images/` est bien déployé
- Vérifier les noms de fichiers (photo1.jpg, photo2.jpg, etc.)
- Vérifier les permissions

### Le QR Code ne fonctionne pas
- Vérifier que vous avez modifié les identifiants WiFi dans `script.js`
- Vérifier que le CDN QRCode.js est accessible

## 📞 Support

Pour plus d'aide :
- [Documentation Azure Web Apps](https://docs.microsoft.com/azure/app-service/)
- [Azure Support](https://azure.microsoft.com/support/)
- [Forums Azure](https://docs.microsoft.com/answers/products/azure)

---

**🎉 Votre application TV Airbnb est maintenant en ligne sur Azure !**
