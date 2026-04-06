# Travel Agency Website - Plan de Acțiune

## 1. OBJECTIVE
Crearea unei aplicații web complete pentru o agenție de turism, cu:
- Frontend în React
- Backend în PHP
- Bază de date MySQL

Funcționalități principale:
- Portofoliu oferte turistice (poze, prețuri, promo, locuri disponibile)
- Sistem de rezervări pentru clienți
- Panel de administrare pentru gestionare oferte și rezervări
- Sistem de plăți (card direct + OP)

## 2. CONTEXT SUMMARY

### Tech Stack
- **Frontend**: React (Vite)
- **Backend**: PHP (Laravel sau vanilla PHP)
- **Baza de date**: MySQL
- **Host**: work-1 și work-2 (porturi 12000, 12001)

### Repo existent
- Clone din: radubo2000-star/travel (branch main)

### Componente Identificate
- Site clienți (public)
- Portal admin (protecționat)
- API backend
- Database schema

### Referințe din industrie (Best Practices 2024)
- Căutare și disponibilitate în timp real
- Checkout pentru oaspeți (fără cont obligatoriu)
- Afișare detaliată tarife (inclusiv taxe)
- Mobile-first design
- Accesibilitate WCAG 2.1 AA
- Securitate plăți PCI-DSS
- Mulțilimbă și multi-valută

## 3. APPROACH OVERVIEW

Abordare: Dezvoltare în faze, începând cu MVP-ul care include funcționalitățile esențiale:
1. Setup proiect și infrastructură
2. Funcționalități pentru clienți (vizualizare oferte, rezervări)
3. Panou admin pentru gestionare
4. Sistem de plăți integrat

Vom clona repo-ul existent radubo2000-star/travel pentru a continua dezvoltarea.

## 4. IMPLEMENTATION STEPS

### Step 1: Clone și Analiză Repo Existent
- **Goal**: Clone repo radubo2000-star/travel și analiză structură existentă
- **Method**: Git clone și inspectare conținut
- **Reference**: /workspace/project

### Step 2: Setup Infrastructură
- **Goal**: Configurare mediu de dezvoltare
- **Method**: Setup Docker/Local environment pentru React + PHP + MySQL
- **Reference**: work-1 (port 12000), work-2 (port 12001)

### Step 3: Frontend - Setup React
- **Goal**: Configurare proiect React cu Vite
- **Method**: npm create vite@latest, instalare dependențe
- **Reference**: frontend/

### Step 4: Backend - Setup PHP
- **Goal**: Configurare API backend PHP
- **Method**: Setup Laravel sau vanilla PHP + MySQL connection
- **Reference**: backend/

### Step 5: Database Schema
- **Goal**: Creare schema baza de date pentru oferte, rezervări, plăți
- **Method**: MySQL cu tabele: offers, bookings, payments, users
- **Reference**: database/

### Step 6: Funcționalități Client - Oferte
- **Goal**: Afișare oferte cu poze, prețuri, promo, locuri disponibile
- **Method**: React components + API calls
- **Reference**: frontend/src/pages/

### Step 7: Funcționalități Client - Rezervări
- **Goal**: Formular rezervare și procesare
- **Method**: React form + backend endpoint
- **Reference**: frontend/src/components/BookingForm.jsx

### Step 8: Sistem de Plăți
- **Goal**: Integrare plăți card + OP
- **Method**: Stripe/mobilPay integration + OP manual
- **Reference**: backend/api/payments/

### Step 9: Panou Admin
- **Goal**: Dashboard pentru gestionare oferte, rezervări, plăți
- **Method**: React admin pages + protected routes
- **Reference**: frontend/src/pages/admin/

### Step 10: Testing și Validare
- **Goal**: Verificare funcționalități complete
- **Method**: Testare end-to-end a fluxurilor principale
- **Reference**: -

## 5. TESTING AND VALIDARE

Succesul va fi validat prin:
1. Clonare și rulare repo existent
2. Afișare oferte pe frontend cu toate detaliile (poze, preț, promo, locuri)
3. Proces de rezervare funcțional
4. Vizualizare și gestionare oferte din admin
5. Vizualizare rezervări și plăți în admin
6. Integrare plăți (card direct + OP)

**Expected outputs:**
- Aplicație React funcțională pe work-1:12000
- API PHP funcțional pe work-2:12001
- Bază de date MySQL cu date de test
- Flux complet: vizualizare → rezervare → plată → confirmare
