# mindpick-game

---

## 📌 **Projektname:** `MindPick` – Ein einfaches Multiple-Choice-Quizspiel  
### 👥 Team: 4 Personen  
### 🧠 Projektleiter: Orhan

---

## ✅ **Aufgabenzuweisung**

### 👨‍💼 **Projektleiter (Orhan)**  
- Repository-Verwaltung (GitHub)  
- Technische Struktur & Architektur  
- Code-Reviews und Merge-Prozesse  
- Fortschritt und Kommunikation im Team koordinieren  
- Issue-Tracking & GitHub Projects erstellen

---

### 👨‍💻 **Backend: Orhan**  
- MongoDB-Verbindung einrichten  
- Datenmodelle erstellen: `User`, `Question`, `Answer`  
- Seed-Skripte erstellen (User, Frage, Antwort)  
- Punktesystem im Modell integrieren  
- Benutzer-Punktzahl berechnen und aktualisieren

### 👨‍💻 **Backend: Bassam**  
- REST API mit Express.js entwickeln  
  - `GET /api/questions/random` → zufällige Frage  
  - `POST /api/answers` → Antwort speichern & Punktzahl prüfen  
  - `GET /api/users/:id/score` → Punktestand abrufen  
- Error Handling und Statuscodes korrekt implementieren
- Unit Tests für API-Endpunkte (optional)

---

### 👩‍🎨 **Frontend: Dennis**  
- Benutzeroberfläche mit React + Vite  
- Fragen und Antworten anzeigen (4 Optionen pro Frage)  
- Antwort senden per `fetch()`  
- Punktzahl anzeigen  
- Loading-/Fehlerstatus behandeln

### 👩‍🎨 **Frontend: Radoslava**  
- Styling & Responsiveness  
- Komponentendesign (Fragekarte, Ergebnisanzeige etc.)  
- UX-Verbesserung (z. B. Fortschrittsanzeige, Animationen)  
- Punktesystem visuell darstellen  
- Optionale Komponenten wie Leaderboard oder Quiz-Statistik

---

## 🔧 **Technische Struktur (Backend)**

- **Node.js + Express** als Webserver  
- **MongoDB + Mongoose** als Datenbank  
- **Drei Hauptmodelle**:
  - `User`: username, password, score
  - `Question`: text, options (4), correctOption
  - `Answer`: questionId, userId, selectedOption, isCorrect
- Seed-Skripte: Benutzer, Fragen, Antworten generieren
- Punktzahl wird automatisch überprüft und beim Speichern erhöht

---

## ✅ **API-Endpunktübersicht**

> 🟢 **Basis-URL:** `http://localhost:5011/api`

### 👤 **[Benutzer-Routen]** `/api/users`

| Methode | Endpunkt                | Beschreibung                                      |
|---------|-------------------------|---------------------------------------------------|
| POST    | `/users/register`       | Neuen Benutzer registrieren                      |
| POST    | `/users/login`          | Benutzer-Login (ohne Passwortverschlüsselung)    |
| GET     | `/users/:userId/score`  | Punktzahl eines bestimmten Benutzers abrufen     |
| GET     | `/users`                | Alle Benutzer auflisten (ohne Passwortdaten)     |

### ❓ **[Fragen-Routen]** `/api/questions`

| Methode | Endpunkt               | Beschreibung                                             |
|---------|------------------------|----------------------------------------------------------|
| GET     | `/questions/random`    | Zufällige Frage abrufen                                  |
| GET     | `/questions`           | Alle Fragen abrufen                                      |
| POST    | `/questions`           | Neue Frage erstellen (Fragetext, 4 Optionen, richtige)   |

### ✅ **[Antwort-Routen]** `/api/answers`

| Methode | Endpunkt          | Beschreibung                                                   |
|---------|-------------------|----------------------------------------------------------------|
| POST    | `/answers`        | Antwort absenden (prüft Richtigkeit und erhöht ggf. Punktzahl) |

---

## 📜 Beispiel: Antwort senden (`/api/answers`)

```json
{
  "questionId": "65f0f9e21450f54a7c123456",
  "userId": "65f1050a1450f54a7c789abc",
  "selectedOption": "Berlin"
}
```

---

## 🔐 Authentifizierung
> Momentan wird keine Authentifizierung verwendet (z. B. kein JWT). 
> Benutzer werden über `userId` direkt identifiziert. 
> 
> Für den produktiven Einsatz empfiehlt sich die Integration von Token-basiertem Login (JWT).

---

