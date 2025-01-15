## 1. Inhaltsverzeichnis

- [2. Architektur](#2-architektur)
  - [Einstiegspunkt](#einstiegspunkt)
  - [Global](#global)
  - [App-Struktur](#app-struktur)
  - [Admin-Funktionen](#admin-funktionen)
  - [Übersicht der Komponenten](#übersicht-der-komponenten)
- [3. Navigationswege](#3-navigationswege)
- [4. Testlauf](#4-testlauf)
  - [Aufgabe 1 Login / Logout](#aufgabe-1-login--logout)
  - [Aufgabe 2 Feiertage und Schulferien](#aufgabe-2-feiertage-und-schulferien)
  - [Aufgabe 3 Haltestellen bearbeiten](#aufgabe-3-haltestellen-bearbeiten)
  - [Aufgabe 4 Routen erstellen](#aufgabe-4-routen-erstellen)
  - [Aufgabe 5 Haltestellen suchen](#aufgabe-5-haltestellen-suchen)
  - [Aufgabe 6 Fahrplanabfragen](#aufgabe-6-fahrplanabfragen)
  - [Aufgabe 7 Anzeigetafeln](#aufgabe-7-anzeigetafeln)
  - [Aufgabe 10 Verspätungsstatistik Tabelle](#aufgabe-10-verspätungsstatistik-tabelle)
  - [Aufgabe 11 Verspätungsstatistik Diagramme](#aufgabe-11-verspätungsstatistik-diagramme)
- [5. Diverse Fragen](#5-diverse-fragen)
  - [5.a) URL Änderung](#5a-url-änderung)
  - [5.b) Bestimmte Seiten nur nach Login zugreifbar](#5b-bestimmte-seiten-nur-nach-login-zugreifbar)
  - [5.c) Validierung Dateneingabe](#5c-validierung-dateneingabe)
  - [5.d) Backend Fehler](#5d-backend-fehler)
- [6. Setup](#6-setup)
  - [Technologien und Werkzeuge](#technologien-und-werkzeuge)
  - [Ausführung](#ausführung)
- [7. Externe Teile](#7-externe-teile)
  - [Angular Core Modules](#angular-core-modules)
  - [Angular Material](#angular-material)
  - [RxJS](#rxjs)
  - [HTTP-Client](#http-client)
  - [Keycloak](#keycloak)
- [8. Nicht implementierte Features](#8-nicht-implementierte-features)


## 2. Architektur

Die Anwendung ist eine webbasierte Plattform, entwickelt mit Angular, und dient der 
Verwaltung von Fahrplänen, Haltestellen und Routen für den öffentlichen Nahverkehr.

**Einstiegspunkt**

* `main.ts`: Startet die Anwendung mithilfe der Angular-Funktion `bootstrapApplication`, 
die die `AppComponent` als Root-Komponente verwendet.

**Global**

* `styles.css`: Definiert globale Styling-Einstellungen. Vor allem für die Navigationsleiste 
links, die auf allen Seiten vorhanden ist.
* `app.component.html` und `app.component.ts`: Enthalten den Code für die linke Navigationsleiste, 
die zu allen anderen Seiten führt.
* `app.routes.ts`: Definiert alle Routen.

**App-Struktur**

*	`Ordner components`: Hier befinden sich die Angular Komponenten. Dort findet man den HTML-Code
angereichert mit den Angular-Funktionen für die Darstellung. In der dazugehörigen TypeScript-Datei die 
ganzen Importe, Variablen, Formen, viel Validierungslogik und der Aufruf des Service um mit dem Backend zu kommunizieren.
*	`Ordner services`: Hier befinden sich die Angular Services. Hier sind die Methoden für die 
Kommunikation mit dem Backend definiert wie create, update, delete etc. Trennen die Geschäftslogik von den Komponenten, um eine klare wiederverwendbare Architektur zu gewährleisten.
* `Ordner routing`: Hier befinden sich der Code zur Verwaltung der Routen. Mit Hilfe von Guards wurden die URLs auch abgesichert gegen unzulässigen Zugriff durch falsche Benutzer.

**Admin-Funktionen**

*	Dateien und Ordner mit dem Präfix `admin-` sind ausschließlich für angemeldete Administratoren von Transportfirmen zugänglich.
*	Diese Komponenten und Services verwalten administrative Aufgaben, wie das Hinzufügen von Haltestellen oder das Bearbeiten von Routen.

**Übersicht der Komponenten**

![component_tree.png](component_tree.png)

## 3. Navigationswege

Durch die globale Navigationsleiste links, ist jede Seite von jeder Seite aus erreichbar. 
Diese Leiste lässt sich durch einen Klick auf den Hamburger Menu Button ein- und ausblenden.

<img src="navigation_menu.png" alt="Navigation Menu" width="200"/>

![routes.png](routes.png)

## 4. Testlauf

Aufgabe 8 und 9 fehlen hier absichtlich.
Aufgabe 8 gibt es nur im Backend. Aufgabe 9 ist nur eine Information, die
Verspätungen auch in den anderen Aufgaben zu berücksichtigen.

### Aufgabe 1 Login / Logout

Navigationsleiste, noch nicht angemeldet:

![login.png](login.png)

Login Dialog über Authentifizierungsservice Keycloak:

![login_dialog.png](login_dialog.png)

Navigationsleiste angemeldet:

![logout.png](logout.png)

### Aufgabe 2 Feiertage und Schulferien

Die Liste der Feiertage erscheint automatisch als Tabelle, wenn man die entsprechende Seite öffnet 
und wird auch nach jeder schreibenden Aktion aktualisiert.

![get_holidays.png](get_holidays.png)

Neuer Feiertag erstellt und wird automatisch in der Tabelle unten angezeigt:

![post_holiday.png](post_holiday.png)

Hier wird ein Feiertag bearbeitet und der Name geändert:

![put_holiday.png](put_holiday.png)

Eine besondere Komfort-Funktion in der Tabelle ist, dass man eine Zeile anklicken kann und
die Daten dann automatisch in die Eingabefelder geladen werden. So kann man sehr einfach
Feiertage editieren:

![select_row_holiday.png](select_row_holiday.png)

Neuen Feiertag wieder löschen:

![delete_holiday.png](delete_holiday.png)

### Aufgabe 3 Haltestellen bearbeiten

Auf dieser Seite kann man Haltestellen erstellen und bearbeiten. Hier wird eine neue Haltestelle 
erstellt:

![stops_create.png](stops_create.png)

Als Komfort-Funktion, zeige ich auch unter den beiden Buttons eine Tabelle mit allen 
Haltestellen an, damit man sich gleich überzeugen kann, dass diese auch wirklich eingefügt wurde.
Hier kann man auch nach dem Namen suchen.

![stops_create2.png](stops_create2.png)

Bearbeiten geht natürlich auch.

![stops_update.png](stops_update.png)

![stops_update2.png](stops_update2.png)

Für das Bearbeiten gibt es eine Komfort-Funktion, dass man Einträge in der Tabelle anklicken kann und
dann die Daten automatisch in die Eingabefelder übertragen werden, um ein einfaches anpassen zur ermöglichen.

![stops_update3.png](stops_update3.png)

### Aufgabe 4 Routen erstellen

Auf dieser Seite kann man Routen erstellen. Dabei gibt man zuerst die Daten der Route selbst an.
Danach kann man mit dem Button "Haltestellen hinzufügen" weitere Haltestellen ergänzen.
Sollte man einen Fehler gemacht haben, kann man mit dem Button "Entfernen" jede Haltestelle
auch einzeln wieder entfernen.

![route.png](route.png)

### Aufgabe 5 Haltestellen suchen

Auf dieser Seite können Haltestellen nach dem Namen gesucht werden. Dabei muss der Name nicht
exakt richtig geschrieben werden. Es wird der levenshtein-Algorithmus verwendet mit einer
eingestellen Distanz von 2. Es darf also zwei Änderungen geben (Zeichen hinzugefügt, entfernt oder
verändert). Dadurch matchen mehrere Test Hagenberg Einträge. Die Ergebnisse werden laufend beim
Tippen aktualisiert mit einer Debounce-Time von 300ms.

![stop_search_byname.png](stop_search_byname.png)

Durch ein Synonym-Wörterbuch werden auch unterschiedliche Schreibarten wie St. und Sankt erkannt:

![stop_search_byname2.png](stop_search_byname2.png)

Durch einen Radio Button kann man zur Suche nach dem Standort wechseln. Hier werden dann 10
der nähesten Haltestellen zurückgeliefert und nach der Entfernung sortiert. Bei der Distanzberechnung
wurde sogar die Erdkrümmung berücksichtigt.

![stop_search_bylocation.png](stop_search_bylocation.png)

### Aufgabe 6 Fahrplanabfragen

Auf dieser Seite können Fahrplanabfragen durchgeführt werden. Dabei wird angezeigt, wie die Route
der Verbindung heißt und wann die Abfahrtszeit auf der Start-Haltestelle ist und die Ankunftszeit
bei der End-Haltestelle.

![timetable.png](timetable.png)

### Aufgabe 7 Anzeigetafeln

Auf dieser Seite kann man sich die nächsten Abfahrten für eine Haltestelle anzeigen lassen, 
inklusive aktueller Verspätung.

![departures.png](departures.png)

### Aufgabe 10 Verspätungsstatistik Tabelle

Auf dieser Seite sieht man die Verspätungsstatistiken. Hierbei muss man ein Start- und 
Enddatum auswählen, dann erhält man die Daten für alle Routen. Wenn man optional eine Route-ID
angibt, erhält man die Statistik für nur diese eine Route.

![statistic.png](statistic.png)

### Aufgabe 11 Verspätungsstatistik Diagramme

Auf derselben Statistikseite, unter der Tabelle sieht man die grafischen Darstellungen der 
Verspätungsstatistiken. Zuerst sieht man in einem Balkendiagramm die durchschnittliche Verspätung 
aller Routen im Vergleich. Danach folgen Tortendiagramme um zu sehen wie viele CheckIns wie stark
verspätet waren. 

Durch das auszuwählende Start- und Enddatum kann man auch leicht sich Auswertungen einer bestimmten
Woche, Monat oder Jahr anzeigen lassen.

![statistic2.png](statistic2.png)

![statistic3.png](statistic3.png)



## 5. Diverse Fragen

### 5.a) URL Änderung
Falls sich die URLs ändern, wäre der notwendige Eingriff minimal invasiv. 
Im Ordner `app` sind in der Datei `app.routes.constant.ts` die URLs 
als Konstanten definieren udn global exportiert. Diese Konstanten werden
dann in den entsprechenden Klassen verwendet. Somit ist nur eine Ändderung an einer Stelle notwendig.

Globale Konstanten:

![routes_constants.png](routes_constants.png)

Beispielhaft die Verwendung in `app.component.ts`:

![update_page_title.png](update_page_title.png)

### 5.b) Bestimmte Seiten nur nach Login zugreifbar

Durch die Methode `getRole()` im `authentication.service.ts` wird die aktuell angemeldete Rolle 
aus dem JWT Token ausgelesen. Durch Route-Guards in `app.routes.ts` wird sichergestellt, 
dass bestimmte Seiten nur erreichbar sind, wenn ein Admin angemeldet ist.

![guards.png](guards.png)


Weiters werden in der UI, die Buttons zu diesen Seiten ausgeblendet, wenn kein entsprechender Benutzer
angemeldet ist.

![guards_nav_menu.png](guards_nav_menu.png)

Außerdem wird man bei einem Wechsel der Rolle zuerst einmal automatisch auf eine Seite
weitergeleitet, die öffentlich zugänglich ist.

### 5.c) Validierung Dateneingabe

In der Anwendung gibt es viele Validierungsmechanismen um eine korrekte Dateneingabe
durch den User zu gewährleisten. 

Eine verwendete Möglichkeit sind benutzerdefinierte Methode, die entweder eine
Fehlermeldung als String zurückliefern oder null wenn kein Fehler vorliegt.
Hier ein Beispiel aus `stops.component.ts`:

![latitude_error.png](latitude_error.png)

Das wie folgt in `stops.component.html` verwendet wird:

![latitude_error_html.png](latitude_error_html.png)

Somit wird in der UI sofort bei der Eingabe eine sinnvolle Fehlermeldung angezeigt 
und der Suchen-Button deaktiviert. Diese Kombination aus eindeutiger Fehlermeldung bei
der Eingabe und deaktivieren des Buttons liefert eine sehr hohe Benutzerfreundlichkeit.

![ui_latitude_error.png](ui_latitude_error.png)

Gültige Eingabe:

![ui_latitude_success.png](ui_latitude_success.png)

Eine weitere Möglichkeit, die ich ausprobiert habe, war es eine FormGroup in
der UI zu verwenden und dort für die Eingabe-Felder Validatoren hinzuzufügen.

In dem folgenden Beispiel aus `admin-stops.component.ts` sieht man derren 
Verwendung. Es wurden sowohl vorhandene Methoden genutzt wie `min()` und
`max()` als auch eine benutzerdefinierte Methode `noSpecialCharsValidator` 
mit regex Ausdruck.

![form_validators.png](form_validators.png)

Diese Validierung wird dann im HTML-Code mit `.invalid` auf Gültigkeit abgefragt
und mit `.touched` ob der Fokus bereits im Eingabefeld war. Hier kann dann auch 
im `<mat-error/>` Tag eine benutzerdefinierte Fehlermeldung ausgegeben werden.

![form_validators_html.png](form_validators_html.png)

Hier sieht das Ergebnis in der UI. Was mir an dieser Lösung besonders gefällt,
ist dass man auch abfragen kann ob der Fokus schon einmal im Eingabefeld war mit
`.touched`. Dadurch kann man sehr gut erforderliche Felder markieren die übersprungen wurden.

![form_validators_ui.png](form_validators_ui.png)

### 5.d) Backend Fehler

Im Backend wurde versucht, möglichst viele Fehler- und Spezialfälle zu berücksichtigen. 
In diesen Fall, sollte eine sinnvolle Fehlermeldung und Status-Code als Response 
zurückgeliefert werden. Beispielweise beim Einfügen einer Haltestelle existiert diese
ID bereits:

![backend_error_api.png](backend_error_api.png)

Hier wird beispielweise in `admin-stops.component.ts` bei einem Fehler der Statuscode 
unterschieden und eine entsprechende Fehlermeldung gesetzt.

![backend_error_code.png](backend_error_code.png)

Diese wird dann natürlich auch im UI angezeigt:

![backend_error_html.png](backend_error_html.png)

![backend_error_ui.png](backend_error_ui.png)

## 6. Setup

### Technologien und Werkzeuge

**Framework:** Angular v19.0.6

**Programmiersprache:** Typescript und HTML

**IDE/Editor:** WebStorm v2024.3

**Laufzeitumgebung:** Node.js v22.11.0

**Packetmanager:** npm v10.9.0

### Ausführung

Im Projekt wird die Anwendung mit folgendem Befehl ausgeführt:

`ng server`

Die Anwendung wird standardmäßig unter `http://localhost:4200` bereitgestellt.

## 7. Externe Teile

In der Anwendung wurden folgende externe Abhängigkeiten verwendet:

### Angular Core Modules

* `@angular/route`: Für die Navigation und das Routing innerhalb der Anwendung
* `@angular/forms`: Für die Verwaltung von Formularen und Validierungen.

### Angular Material

Wurde verwendet für UI-Komponenten wie `MatSidenav`, `MatTable` und `MatFormField`
für eine moderne Benutzeroberfläche. Dabei wurde das Theme `indigo-punkt` verwendet.

### RxJS

Für die Verarbeitung von Observables und asynchronen Datenströmen, z.B. für die
`debounceTime` bei der Vorschlagsuche nach Haltestellen. Dadurch wird nicht sofort 
bei jedem Tastenschlag ein Request abgeschickt.

### HTTP-Client

Angulars `HttpClientModule` wird verwendet, um die API-Aufrufe zu realisieren in den
verschiedenen Services wie `stop.service.ts`.

### Keycloak

Keycloak wird verwendet, um die Authentifizierung und Autorisierung in der 
Anwendung zu implementieren. Es ermöglicht Single Sign-On (SSO) und 
rollenbasierte Zugriffskontrolle. Bestimmte Routen und Funktionen werden
basierend auf Benutzerrollen geschützt.

## 8. Nicht implementierte Features

Ich habe noch einmal gründlich die Angabe durchgelesen und mit meiner Lösung verglichen. Ich hoffe, ich habe nichts übersehen aber ich denke es ist soweit alles umgesetzt worden.
