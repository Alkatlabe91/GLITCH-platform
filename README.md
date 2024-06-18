# Projectnaam:

# GLITCH-platform (GAMIFIED LEARNING INTERFACE THROUGH CHALLENGES AND HEURISTICS)

## Overzicht

Dit project maakt gebruik van Docker-containers om meerdere toepassingen te orchestreren, waaronder een database, een Flask API-backend en React-gebaseerde web- en mobiele front-ends. Het heeft tot doel een naadloze ontwikkelings- en implementatieomgeving te bieden.

## Belangrijke opmerking!!

Het applicatie Moet getest worden op FirFox, Andere browsers staan het opslaan van onveilige sessies aan de clientzijde niet toe, want de applicatie gebruikt CORS.

## Projectstructuur

- **database_**: Bevat bestanden die verband houden met de SQLite-databasecontainer.
  - **Dockerfile**: Configuratie voor het uitvoeren van de SQLite-server.
- **backend**: Bevat de Flask API-backend.
  - **Dockerfile**: Configuratie voor het uitvoeren python.
- **frontend**:
  - **web**: Bevat de op React gebaseerde webfrontend.
  - **Dockerfile**: Configuratie voor het uitvoeren python.
   
  - **mobile**: Bevat de op React Native gebaseerde mobiele frontend.
  - **Dockerfile**: Configuratie voor het uitvoeren python.

## Installatie en Gebruik

### Vereisten

- Docker moet zijn geïnstalleerd op uw systeem. U kunt het downloaden van https://www.docker.com/get-started.

### Het starten van de Containers

1. Kloon deze repository naar uw lokale machine.

2. Navigeer naar de projectdirectory.

3. Gebruik Docker Compose om de containers te bouwen en uit te voeren:

    bash
    docker-compose up --build
    

    Deze opdracht zal alle containers bouwen en starten die zijn gedefinieerd in het `docker-compose.yml` bestand.

### Toegang tot Toepassingen


- **Flask API-backend**:
  - Poort: 5000
  - Zodra de containers actief zijn, is de Flask API toegankelijk op `http://localhost:<port>`. Vervang `<port>` door de poort die is gespecificeerd in uw `docker-compose.yml`.

- **React-webfrontend**:
  - Poort: 3000
  - Nadat de containers zijn gestart, kunt u de webfrontend openen door naar `http://localhost:<port>` te navigeren in uw webbrowser. Vervang `<port>` door de poort die is gespecificeerd in uw `docker-compose.yml`.

- **React Native mobiele frontend**:
  - Poort: 8081
  - Om de React Native mobiele frontend uit te voeren, volgt u de instructies in de `mobile` map. Mogelijk moet u aanvullende configuraties instellen voor uw ontwikkelomgeving.

### Stoppen van de Containers

Om de containers te stoppen, kunt u de volgende opdracht gebruiken:

bash
docker-compose down


Dit zal de containers stoppen en verwijderen die zijn gemaakt door Docker Compose.

## Aanvullende Opmerkingen

- Zorg ervoor dat er geen andere services actief zijn op de poorten die zijn gespecificeerd voor elke toepassing om conflicten te voorkomen.

- Voor gedetailleerde informatie over het configureren van elke toepassing, raadpleegt u de README-bestanden die zich bevinden in hun respectievelijke mappen.


- Je hoeft docker-compose niet te draaien als je aan een component van de applicatie wilt werken. Bijvoorbeeld, als je iets aan de mobiele applicatie wilt aanpassen, navigeer dan naar frontend/mobile en voer npx expo start uit. Dit geldt ook voor andere componenten:
Backend: python app.py
Frontend/web: npm start
Frontend/mobiel: npx expo start || npm start android || npm start ios
## login data
User Name: user1, Password: password1<br/>
User Name: user2, Password: password2<br/>
User Name: user3, Password: password3<br/>
User Name: teacher1, Password: teacher1<br/>