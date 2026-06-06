Dokumentace: Úklidové služby Třebechovice1. 
1. Účel aplikace
Web slouží jako moderní vizitka a rezervační systém pro lokální úklidovou firmu. Klientům umožňuje:
Prohlížet nabídku služeb a ceník.
Odeslat poptávku přes formulář (s ochranou proti ztrátě dat při zavření prohlížeče).
Číst a přidávat hodnocení.
Používat web i offline (jako aplikaci v mobilu/PC).

2. Struktura projektu
index.html: Hlavní strana (služby, ceník, kontaktní formulář).
recenze.html: Formulář pro přidání nového hodnocení.
styles.css: Vzhled webu a přizpůsobení pro mobily.
script.js: Logika hlavní strany, načítání recenzí z API, odesílání poptávek, ukládání rozepsaného textu.
recenze.js: Logika odesílání nového hodnocení na API.manifest.
json & sw.js: Soubory zajišťující fungování jako instalovatelná aplikace (PWA) a offline režim.

3. Použitá API (MockAPI)
Metoda  Endpoint  Účel
GET  /recenze  Načte všechna hodnocení pro zobrazení na webu.
POST  /recenze  Odešle nové hodnocení od zákazníka.
POST  /Contact  Odešle data z kontaktního formuláře (poptávku).

4. Jak aplikace funguje
Chytrý kontaktní formulář
    Při psaní do formuláře se text průběžně ukládá do paměti prohlížeče (localStorage).
    Pokud uživatel stránku omylem zavře, text tam po návratu najde. Po úspěšném odeslání
    se paměť smaže.
Dynamické recenze
    Web si stahuje recenze z API. Při každém načtení stránky se náhodně vybere a zobrazí 3 z nich.
    Pokud API nefunguje, zobrazí se připravené ukázkové recenze.
Offline režim a instalace (PWA)
    Díky Service Workeru (sw.js) a manifestu se web chová jako aplikace. Nejdůležitější
    soubory se uloží do mezipaměti, takže web se načte, i když uživatel nemá internet.
