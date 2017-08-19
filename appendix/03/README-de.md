## Wie kann ich zu diesem Buch beitragen?

Schön, dass Du Interesse hast, an diesem Buch mitzuwirken. Zahlreiche Möglichkeiten bieten sich dafür an. Du kannst ...

- Inhalte übersetzen
- Das [```Glossar```](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/glossary) verbessern
- Fehler bereinigen
- Deine eigenen GLSL-Shader über den [Online Editor](http://editor.thebookofshaders.com/) mit anderen teilen

### Inhalte übersetzen

Der Quelltext dieses Buches wurde in [Markdown](https://daringfireball.net/projects/markdown/syntax) verfasst. Dadurch ist es sehr einfach, den Text zu bearbeiten und zu erweitern.

1. Besuche zunächst die Internet-Ablage dieses Buches bei [Github unter ```github.com/patriciogonzalezvivo/thebookofshaders```](https://github.com/patriciogonzalezvivo/thebookofshaders). Verschaffe Dir einen Überblick über die verschiedenen Verzeichnisse und die darin enthaltenen Dateien. Du wirst feststellen, dass die eigentlichen Textinhalte des Buches jeweils in der Datei ```README.md``` und in anderen Dateien enthalten sind, die Großbuchstaben im Namen tragen. Beispiele dafür sind etwa ```TITLE.md```, ```SUMMARY.md``` usw. Die Übersetzungen dieser Texte stecken in Dateien, die am Ende des Namens ein Kürzel für die jeweilige Sprache tragen, also z.B. ```README-jp.md```, ```README-es.md``` usw.

2. Lege einen Fork der Ablage an und klone den Fork auf Deinen Computer.

3. Lege jeweils eine Kopie der Datei an, die Du übersetzen möchtest, und vergiss dabei nicht, das Sprachkürzel im Dateinamen zu ergänzen.

4. Übersetze den Inhalt des Dokuments Zeile für Zeile (siehe dazu auch die **Übersetzungshinweise** unten).

5. Überprüfe den Inhalt hinsichtlich der Rechtschreibung und der korrekten Anzeige im Browser (siehe unten unter **Testen**).

6. Lade die veränderten Dateien in Deinen Fork hoch und setze einen [Pull Request](https://help.github.com/articles/using-pull-requests/) ab.

#### Übersetzungshinweise

Lösche und verändere nichts an der Einbindung der Beispielprogramme innerhalb des Quelltextes. Dieses sehen wie folgt aus:

```html
    <div class="codeAndCanvas" data="grid-making.frag"></div>
```

oder

```html
<div class="simpleFunction" data="y = mod(x,2.0);"></div>
```

#### Testen

Starte auf Deinem lokalen Rechner einen PHP-Server innerhalb des Verzeichnisses, in das Du das Buch geklont hast:

```bash
php -S localhost:8000
```

Rufe dann in Deinem Internet-Browser die URL ```localhost:8000``` auf. Klicke Dich bis zu dem Kapitel durch, an dem Du gerade arbeitest. Füge der angezeigten URL in der Adresszeile des Browsers den Zusatz ```?lan=``` hinzu, gefolgt von dem Sprachenkürzel, das Du bei der Benennung der jeweiligen Datei verwendet hast.

Um ein Beispiel zu nennen: Wenn Du gerade das Kapitel ```03``` ins Französische übersetzt und dabei mit der Datei ```03/README-fr.md``` arbeitest, kannst Du diese Datei anzeigen, indem Du folgende URL eingibst: ```http://localhost:8000/03/?lan=fr```

### Verbesserungen am Glossar

Das Glossar befindet sich noch in Arbeit. Wir freuen uns über Vorschläge, wie man das Glossar zu einem wertvollen Bestandteil des Buches ausbauen kann. Schick uns einfach eine Nachricht an [@bookofshaders](https://twitter.com/bookofshaders).

### Fehler bereinigen

Irren ist menschlich! Wenn Dir ein Fehler auffällt, bereinige die Stelle und setze einfach einen entsprechenden Pull Request auf Github ab, oder eröffnete dort eine Diskussion zu dem Thema. Vielen Dank!

### Teile Deine Shader mit Anderen

Du wirst im Quelltext des Buches bei den Beispielen viele Verweise auf den [Online-Editor](http://editor.thebookofshaders.com/) sehen.
Sobald Du einen Shader entwickelt hast, auf den Du stolz bist, klicke auf die „Export“-Schaltfläche (bzw. das ```⇪```-Symbol) und kopiere anschließend die im Editor angezeigte „URL to code...“. Sende diese URL an [@bookofshaders](https://twitter.com/bookofshaders) oder an [@kyndinfo](https://twitter.com/kyndinfo). Wir freuen uns auf tolle Shader und werden diese gerne unserer [Galerie mit Beispielen](https://thebookofshaders.com/examples/) hinzufügen.
