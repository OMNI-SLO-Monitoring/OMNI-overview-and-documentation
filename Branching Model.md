#Branching Model

1. Es gibt pro Repositorie **zwei** permanente Zweige *master* und *dev*.

2. Default branch ist *dev*.

3. Für die Entwicklung eines neuen Features **muss** ein branch vom aktuellen *dev* branch des Repos abgezweigt werden.

4. Der Name des Featurebranches **muss** sich am jeweiligen Ticktnamen orientieren

4. Zur Vermeidung von großen Mergekonflikten können zwischenzeitlich abgeschlossene Änderungen vom *dev* in den Featurebranch gezogen werden.

5. Ist die Arbeit an einem Featurebranch abgeschlossen **muss** eine Pull-Request auf den *dev* branch gestellt werden.

6. Pull-Requests **müssen** von mindestens einem Entwickler überprüft werden und die Qualitätsprüfung durch  Sarah Stieß bestehen.

7. Zum Sprintende werden die werden die fertigen Features vom *dev* in den *master* gemergt und mit einem dem Sprint entsprechenden Tag versehen werden
