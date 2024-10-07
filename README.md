# wp4-2024-starter
# GLITCH

## Overzicht

Dit project maakt gebruik van Docker-containers om meerdere toepassingen te orchestreren, waaronder een database, een Flask API-backend en React-gebaseerde web- en mobiele front-ends. Het heeft tot doel een naadloze ontwikkelings- en implementatieomgeving te bieden.

## Belangrijke opmerkingen!!

1. **URL-aanpassing in constante bestanden**: Zorg ervoor dat u de URL in de constantebestanden van zowel de web- als de mobiele frontend aanpast om overeen te komen met de URL van uw backend.

2. **Problemen met inloggen en CORS**: Als u problemen ondervindt bij het inloggen, moet u mogelijk de CORS-instellingen (Cross-Origin Resource Sharing) op de backend aanpassen om het juiste domein toe te staan.

3. **Gebruik van HTTPS**: Om HTTPS te gebruiken, moet u de "secure session" vlag inschakelen in uw Flask-applicatie en Flask-Talisman configureren om HTTPS af te dwingen.

4. **Talisman en HTTPS**: Als u uw applicatie via HTTPS wilt laten draaien, moet u ervoor zorgen dat Flask-Talisman correct is geconfigureerd om HTTPS te handhaven.

5. **Gebruik aub FireFox**: Gebruik alstublieft Firefox: Gebruik alstublieft Firefox voor testdoeleinden, omdat dit de enige browser is die onbeveiligde cookies ondersteunt.

6. **Inloggen Gebruikgegevens**:
User Name: user1, Password: password1<br/>
User Name: user2, Password: password2<br/>
User Name: user3, Password: password3<br/>
User Name: teacher1, Password: teacherpass<br/>

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

    ```bash
    docker-compose up --build
    ```

    Deze command zal alle containers bouwen en starten die zijn gedefinieerd in het `docker-compose.yml` bestand.

### Toegang tot Toepassingen

- **Flask API-backend**:
  - Poort: 5000
  - Zodra de containers actief zijn, is de Flask API toegankelijk op `http://localhost:<port>`. Vervang `<port>` door de poort die is gespecificeerd in uw `docker-compose.yml`.

- **React-webfrontend**:
  - Poort: 3000
  - Nadat de containers zijn gestart, kunt u de webfrontend openen door naar `http://localhost:<port>` te navigeren in uw webbrowser. Vervang `<port>` door de poort die is gespecificeerd in uw `docker-compose.yml`.

- **React Native mobiele frontend**:
  - Poort: 8081
  - Om de React Native mobiele frontend uit te voeren, volgt u de instructies in de `mobile` map. U moet mogelijk aanvullende configuraties instellen voor uw ontwikkelomgeving.

### Stoppen van de Containers

Om de containers te stoppen, kunt u de volgende command gebruiken:

```bash
docker-compose down
