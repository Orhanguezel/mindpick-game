Elbette! Aşağıda projenin **güncellenmiş ve detaylandırılmış** `README.md` yapısını bulabilirsin. Hem **backend** hem de **frontend** tarafındaki son gelişmeler ve yapılar dahil edilmiştir:

---

# 🧠 mindpick-game

---

## 📌 **Projektname:** `MindPick` – Ein interaktives Multiple-Choice-Quizspiel mit Punkte- & Auswertungsfunktion

### 👥 Team: 4 Personen  
### 🧠 Projektleiter: **Orhan**

---

## ✅ **Aufgabenzuweisung**

### 👨‍💼 **Projektleiter – Orhan**  
- GitHub Repository & Branch-Struktur  
- Technische Architektur (Frontend + Backend)  
- Merge-Prozesse & Code Review  
- Feature-Planung via Issues / GitHub Projects  
- Teamkoordination & Aufgabenverteilung  

---

### 👨‍💻 **Backend – Orhan und Bassam**  
- MongoDB-Verbindung & Mongoose-Setup  
- Datenmodelle: `User`, `Question`, `Answer`  
- Seed-Skripte: Benutzer, Fragen, automatische Antworten  
- Punktesystem in der Datenbank  
- Benutzerantworten speichern & Punktzahl live aktualisieren
- REST API mit Express.js  
  - `GET /api/questions/random` → Zufällige Frage  
  - `GET /api/questions` → Alle Fragen  
  - `POST /api/answers` → Antwort speichern & Punkte prüfen  
  - `GET /api/answers/:userId` → Alle Antworten eines Users  
- Error Handling & Statuscodes  
- Benutzer Punktestand abrufen  
- Tests der API-Endpunkte (Postman)

---

### 👩‍🎨 **Frontend – Dennis und Radoslava**  
- React + Vite Projektsetup  
- Quiz-Logik: Fragekarten, Fortschritt, Punkteanzeige  
- Antwortübertragung via `fetch()`  
- QuizEnde-Logik & Weiterleitung  
- Zustandverwaltung über `useState`, `useEffect`
- Responsive Design mit CSS  
- Komponentengestaltung: Header, QuestionCard, Leaderboard  
- Ergebnisanzeige nach Quizabschluss  
- UX-Verbesserungen (Animationen, Buttons, Feedbackfarben)  
- Benutzerfreundliche Navigation (Header-Navigation, Logout, etc.)

---

## 🧩 **Technische Struktur**

### 🛠️ **Backend**
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- Struktur:
  ```
  backend/
    ├── models/            → User, Question, Answer
    ├── controllers/       → Logic für Anfragen
    ├── routes/            → /api/users, /api/questions, /api/answers
    ├── seederUser.js      → Dummy-User
    ├── seederQuestion.js  → Dummy-Fragen
    ├── seederAnswer.js    → Automatisch Antworten einfügen
    └── server.js          → Server-Setup
  ```

### 💻 **Frontend**
- **React 18 + Vite**
- **React Router DOM** für Navigation  
- **Fetch API** für Datenabruf & Antwortübermittlung  
- Struktur:
  ```
  src/
    ├── pages/             → Home, Login, Register, Results
    ├── components/        → QuestionCard, Answer, Header, QuizSummary
    ├── services/          → API-Fetch-Helper
    └── App.jsx            → Routing Setup
  ```

---

## ✅ **API-Endpunktübersicht**

> 🟢 **Base URL:** `http://localhost:5011/api`

---

### 👤 **[Benutzer-Routen]** `/api/users`

| Methode | Endpoint                | Beschreibung                                       |
|---------|-------------------------|----------------------------------------------------|
| POST    | `/users/register`       | Benutzer registrieren                              |
| POST    | `/users/login`          | Login ohne Token                                   |
| GET     | `/users/:userId/score`  | Punktestand abrufen                                |
| GET     | `/users`                | Alle Benutzer auflisten (inkl. Punktestand)        |

---

### ❓ **[Fragen-Routen]** `/api/questions`

| Methode | Endpoint               | Beschreibung                                         |
|---------|------------------------|------------------------------------------------------|
| GET     | `/questions/random`    | Eine zufällige Frage abrufen                         |
| GET     | `/questions`           | Alle Fragen abrufen                                  |
| POST    | `/questions`           | Neue Frage erstellen                                 |

---

### ✅ **[Antwort-Routen]** `/api/answers`

| Methode | Endpoint                    | Beschreibung                                                            |
|---------|-----------------------------|-------------------------------------------------------------------------|
| POST    | `/answers`                  | Antwort speichern & Punktestand aktualisieren                          |
| GET     | `/answers/:userId`          | Alle Antworten eines Benutzers abrufen                                 |

---

## 📜 Beispiel: Antwort senden

```json
POST /api/answers

{
  "questionId": "65f0f9e21450f54a7c123456",
  "userId": "65f1050a1450f54a7c789abc",
  "selectedOption": "Berlin"
}
```

---

## 🖥️ Beispiel-Frontend-Flow

1. User öffnet `/` → Willkommen + Login/Register Button  
2. Nach Login → "Quiz starten"-Button  
3. `/questions` zeigt Fragen nacheinander  
4. Nach 10 Fragen → automatische Anzeige:
   - Punkte
   - Bestehende Antworten
   - Leaderboard  
5. `/results` → Ergebnisse jederzeit erneut aufrufbar

---

## 🔐 Authentifizierung (Basic)

- Kein JWT/Token-System (nur localStorage mit `userId`)  
- Für produktive Nutzung JWT dringend empfohlen  
- Backend ist bereit für Auth-Upgrade (Modularisierung vorhanden)

---

## 🚀 Weitere Features (optional / geplant)

- JWT-Login & geschützte Routen  
- Frage-Schwierigkeitsgrade  
- Admin-Modul zur Fragenspeicherung  
- Antwort-Zeitmessung & Zeitbonus  
- Dark-Mode & Sprachumschaltung

