# Minesweeper
Die Webapplikation stellt eine browserbasierte Version des bekannten Minesweeper-Spiels dar.

# Anforderungen
*  Das Spiel funktioniert nach den bekannten Spielregeln (dokumentiert z.B. hier: https://www.bernhard-gaul.de/spiele/minesweeper/minesweeper-spielregel.html).
*  Der Spieler kann zwischen 3 Schwierigkeitsstufen (= Grösse des Spielfelds und Anzahl Minen) auswählen.
*  Der Spieler kann das Spiel jederzeit neu starten.
*  Der Spieler kann Felder aufdecken (Linksklick) oder als Mine markieren (Rechtsklick).
*  Das Spiel endet, wenn alle Felder, die keine Minen enthalten, aufgedeckt sind (= Sieg) oder auf ein Feld geklickt wurde, das eine Mine enthält (= Niederlage).
*  Das Spiel informiert den Spieler über das Ende des Spiels und gibt an, ob er gewonnen oder verloren hat.
*  Hat der Spieler gewonnen, wird als Belohnung ein xkcd-Comic gezeigt. Die Anzahl Sekunden, die der Spieler bis zum Sieg gebraucht hat, bestimmt den gezeigten Comic (=ID des Backends)
*  Die bereits gewonnenen Comics bleiben bestehen, bis die Seite geschlossen wird.
*  Das Spiel zählt während des Spiels die Anzahl Markierungen, die der Spieler vorgenommen hat, um Minen zu kennzeichnen und zeigt diese Zahl stets an.
*  Das Spiel zeigt anhand einer aufwärts zählenden Zahl an, wie viele Sekunden seit dem Start bereits vergangen sind.

# Mockup
![mockup][basic]<br/>

# Version 1.0
![first version][version1]<br/>

# Reward xkcd
![comic][comic]<br/>


[basic]: /res/basic.png "basic mockup"
[version1]: /res/minesweeper_start.PNG "first version"
[comic]: /res/minesweeper_xkcd.PNG "reward"