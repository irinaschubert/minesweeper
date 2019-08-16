# Minesweeper
Die Webapplikation stellt eine browserbasierte Version des bekannten Minesweeper-Spiels dar.

# Requirements
*  Das Spiel funktioniert nach den bekannten Spielregeln (dokumentiert z.B. hier: https://www.bernhard-gaul.de/spiele/minesweeper/minesweeper-spielregel.html).
*  Der Spieler kann das Spiel jederzeit neu starten.
*  Der Spieler kann Felder aufdecken (Linksklick) oder als Mine markieren (Rechtsklick).
*  Das Spiel endet, wenn alle Felder, die keine Minen enthalten, aufgedeckt sind (= Sieg) oder auf ein Feld geklickt wurde, das eine Mine enthält (= Niederlage).
*  Hat der Spieler gewonnen, wird als Belohnung ein xkcd-Comic gezeigt. Die Anzahl Sekunden, die der Spieler bis zum Sieg gebraucht hat, bestimmt den gezeigten Comic (=ID des Backends)
*  Das Spiel zählt während des Spiels die Anzahl Markierungen, die der Spieler vorgenommen hat, um Minen zu kennzeichnen und zeigt diese Zahl stets an.
*  Das Spiel zeigt anhand einer aufwärts zählenden Zahl an, wie viele Sekunden seit dem Start bereits vergangen sind.

# During the game
![first version][version1]<br/>

# After the game
![xkcd][comic]<br/>


[version1]: /minesweeper_start.PNG "first version"
[comic]: /minesweeper_xkcd.PNG "reward"
