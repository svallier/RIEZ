// Déploiement Infrastructure as Code pour l'application Airbnb TV
@description('Nom de l\'application')
param appName string = 'airbnb-tv-riez'

@description('Localisation des ressources')
param location string = resourceGroup().location

@description('SKU du App Service Plan')
@allowed([
  'F1'  // Free
  'B1'  // Basic
  'S1'  // Standard
])
param sku string = 'F1'

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: '${appName}-plan'
  location: location
  sku: {
    name: sku
    tier: sku == 'F1' ? 'Free' : (sku == 'B1' ? 'Basic' : 'Standard')
  }
  properties: {
    reserved: false
  }
}

// Web App
resource webApp 'Microsoft.Web/sites@2022-09-01' = {
  name: appName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      alwaysOn: sku != 'F1' // AlwaysOn non disponible en Free tier
      http20Enabled: true
      minTlsVersion: '1.2'
      ftpsState: 'Disabled'
      defaultDocuments: [
        'index.html'
      ]
    }
  }
}

// Configuration de l'application
resource webAppConfig 'Microsoft.Web/sites/config@2022-09-01' = {
  parent: webApp
  name: 'web'
  properties: {
    numberOfWorkers: 1
    defaultDocuments: [
      'index.html'
    ]
    netFrameworkVersion: 'v4.0'
    requestTracingEnabled: false
    remoteDebuggingEnabled: false
    httpLoggingEnabled: true
    detailedErrorLoggingEnabled: true
  }
}

// Outputs
output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
output webAppName string = webApp.name
output resourceGroupName string = resourceGroup().name
