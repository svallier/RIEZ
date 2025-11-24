// Navigation entre sections
document.addEventListener('DOMContentLoaded', function() {
    // Chargement de la configuration depuis config.js
    loadGuestName();
    
    // Récupération de la météo pour Saint-Hilaire-de-Riez
    fetchWeather();
    
    // Attendre que QRCode.js soit chargé avant de générer les QR codes
    if (typeof QRCode !== 'undefined') {
        generateQRCodes();
    } else {
        window.addEventListener('load', function() {
            if (typeof QRCode !== 'undefined') {
                generateQRCodes();
            }
        });
    }
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les liens
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Masquer toutes les sections
            sections.forEach(s => s.classList.remove('active'));
            
            // Afficher la section correspondante
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Animation des cartes au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments animables
    const animatedElements = document.querySelectorAll('.activity-card, .info-card, .media-card, .gallery-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Effet de brillance sur les cartes média
    const mediaCards = document.querySelectorAll('.media-card');
    mediaCards.forEach(card => {
        card.classList.add('shine');
    });
    
    // Horloge en temps réel (optionnel - peut être ajouté dans la navbar)
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        // Si vous voulez afficher l'heure, décommentez les lignes suivantes
        // et ajoutez <span id="clock"></span> dans la navbar HTML
        // const clockElement = document.getElementById('clock');
        // if (clockElement) {
        //     clockElement.textContent = timeString;
        // }
    }
    
    updateClock();
    setInterval(updateClock, 60000); // Mise à jour toutes les minutes
    
    // Gestion du clavier pour navigation TV
    document.addEventListener('keydown', function(e) {
        const activeLink = document.querySelector('.nav-link.active');
        const allLinks = Array.from(navLinks);
        const currentIndex = allLinks.indexOf(activeLink);
        
        switch(e.key) {
            case 'ArrowRight':
                // Navigation vers la section suivante
                if (currentIndex < allLinks.length - 1) {
                    allLinks[currentIndex + 1].click();
                }
                break;
            case 'ArrowLeft':
                // Navigation vers la section précédente
                if (currentIndex > 0) {
                    allLinks[currentIndex - 1].click();
                }
                break;
        }
    });
    
    // Auto-démarrage sur la section accueil
    const homeSection = document.getElementById('accueil');
    if (homeSection) {
        homeSection.classList.add('active');
    }
    
    // Message de bienvenue animé (optionnel)
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.animation = 'pulse 2s ease-in-out';
        }
    }, 1000);
    
    // Galerie: agrandissement au clic
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Créer une modal pour afficher l'image en grand
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    cursor: pointer;
                `;
                
                const modalImg = document.createElement('img');
                modalImg.src = img.src;
                modalImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 10px;
                `;
                
                modal.appendChild(modalImg);
                document.body.appendChild(modal);
                
                modal.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
            }
        });
    });
});

// Fonction pour générer les QR codes
function generateQRCodes() {
    // Génération du QR Code pour accès au site (page d'accueil)
    const webappUrl = "https://wonderful-rock-04872af03.3.azurestaticapps.net";
    const qrHomeElement = document.getElementById("qrcode-home");
    if (qrHomeElement) {
        // Vider le contenu avant de générer un nouveau QR code
        qrHomeElement.innerHTML = '';
        new QRCode(qrHomeElement, {
            text: webappUrl,
            width: 180,
            height: 180,
            colorDark: "#2563eb",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
    }
    
    // Génération du QR Code WiFi
    // Les variables sont définies dans config.js
    const wifiSSID = WIFI_SSID;
    const wifiPassword = WIFI_PASSWORD;
    const wifiSecurity = WIFI_SECURITY;
    
    // Mettre à jour l'affichage des informations WiFi
    document.getElementById('wifi-ssid').textContent = wifiSSID;
    document.getElementById('wifi-password').textContent = wifiPassword;
    
    // Générer le QR code WiFi
    // Format: WIFI:T:WPA;S:SSID;P:password;;
    const wifiString = `WIFI:T:${wifiSecurity};S:${wifiSSID};P:${wifiPassword};;`;
    
    const qrWifiElement = document.getElementById("qrcode");
    if (qrWifiElement) {
        // Vider le contenu avant de générer un nouveau QR code
        qrWifiElement.innerHTML = '';
        new QRCode(qrWifiElement, {
            text: wifiString,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

// Animation CSS additionnelle
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Fonction pour récupérer la météo
async function fetchWeather() {
    const latitude = 46.7167; // Saint-Hilaire-de-Riez
    const longitude = -1.9500;
    
    try {
        // Utilisation de l'API Open-Meteo (gratuite, sans clé API)
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Europe/Paris`
        );
        
        if (!response.ok) throw new Error('Erreur API');
        
        const data = await response.json();
        const current = data.current;
        
        // Mapping des codes météo vers emojis et descriptions
        const weatherCodes = {
            0: { icon: '☀️', desc: 'Ciel dégagé' },
            1: { icon: '🌤️', desc: 'Principalement dégagé' },
            2: { icon: '⛅', desc: 'Partiellement nuageux' },
            3: { icon: '☁️', desc: 'Couvert' },
            45: { icon: '🌫️', desc: 'Brouillard' },
            48: { icon: '🌫️', desc: 'Brouillard givrant' },
            51: { icon: '🌦️', desc: 'Bruine légère' },
            53: { icon: '🌦️', desc: 'Bruine modérée' },
            55: { icon: '🌧️', desc: 'Bruine dense' },
            61: { icon: '🌧️', desc: 'Pluie légère' },
            63: { icon: '🌧️', desc: 'Pluie modérée' },
            65: { icon: '🌧️', desc: 'Pluie forte' },
            71: { icon: '🌨️', desc: 'Neige légère' },
            73: { icon: '🌨️', desc: 'Neige modérée' },
            75: { icon: '🌨️', desc: 'Neige forte' },
            80: { icon: '🌦️', desc: 'Averses légères' },
            81: { icon: '🌧️', desc: 'Averses modérées' },
            82: { icon: '⛈️', desc: 'Averses violentes' },
            95: { icon: '⛈️', desc: 'Orage' },
            96: { icon: '⛈️', desc: 'Orage avec grêle' },
            99: { icon: '⛈️', desc: 'Orage violent' }
        };
        
        const weather = weatherCodes[current.weather_code] || weatherCodes[0];
        
        // Mise à jour de l'interface
        document.getElementById('weather-icon').textContent = weather.icon;
        document.getElementById('weather-temp').textContent = `${Math.round(current.temperature_2m)}°C`;
        document.getElementById('weather-desc').textContent = weather.desc;
        document.getElementById('weather-wind').textContent = `💨 ${Math.round(current.wind_speed_10m)} km/h`;
        document.getElementById('weather-humidity').textContent = `💧 ${current.relative_humidity_2m}%`;
        
        // Afficher le contenu et masquer le spinner
        document.querySelector('.weather-loading').style.display = 'none';
        document.querySelector('.weather-content').style.display = 'flex';
        
    } catch (error) {
        console.error('Erreur lors de la récupération de la météo:', error);
        document.querySelector('.weather-loading').innerHTML = '<p style="color: #ef4444;">⚠️ Météo indisponible</p>';
    }
}

// Fonction pour charger le nom du voyageur depuis config.js
function loadGuestName() {
    // Le nom est défini dans config.js
    if (typeof GUEST_NAME !== 'undefined' && GUEST_NAME) {
        document.getElementById('guest-name').textContent = GUEST_NAME;
    } else {
        document.getElementById('guest-name').textContent = '';
    }
}
