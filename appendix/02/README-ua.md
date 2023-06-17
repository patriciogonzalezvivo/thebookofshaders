## Як надрукувати цю книгу?

Скажімо, вам не потрібна навігація по тексту чи взаємодія з інтерактивними прикладами, а просто потрібна книга, яку ви зможете читати на пляжі або під час поїздок. У такому випадку ви можете надрукувати її.


#### Встановлення glslViewer

Щоб надрукувати цю книгу, її потрібно спочатку розпарсити. Для цього вам знадобиться [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer) - консольний інструмент, який компілює та перетворює приклади шейдерів у зображення.

На **MacOSX** переконайтесь, що у вас встановлено [homebrew](http://brew.sh/) і потім виконайте у терміналі наступну команду:

```bash
brew install glslviewer
```

На **Raspberry Pi** установіть [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) - дистрибутив Linux на основі Debian, створений для Raspberry Pi, а потім виконайте такі дії:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Встановлення Python 3, Latex Engine і Pandoc

Для розбору розділів Markdown-розмітки у Latex, а потім у PDF-файл, ми будемо використовувати Xetex Latex Engine і Pandoc.

На **MacOSX**:

Завантажте та встановіть MacTeX:

```bash
brew install --cask mactex-no-gui
```

а потім інсталюйте [Pandoc](http://johnmacfarlane.net/pandoc/) і Python 3 за допомогою команди:

```bash
brew install pandoc python
```

На **Raspberry Pi** (Raspbian):

```bash
sudo apt-get install texlive-xetex pandoc python2.7
```

#### Зберіть книгу у pdf-формат та роздрукуйте її

Тепер, коли у вас є все необхідне, настав час клонувати [репозиторій цієї книги](https://github.com/patriciogonzalezvivo/thebookofshaders) та скомпілювати його.

Для цього ще раз відкрийте термінал і виконайте наступні команди:

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean pdf
```

Якщо все пройде добре, ви побачите файл `book.pdf`, який можна прочитати на своєму улюбленому пристрої або роздрукувати.

#### Зберіть книгу в epub-формат для використання з Kindle

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean epub
```

Згенерований файл `book.epub` можна використовувати безпосередньо або конвертувати у формат `.mobi` для використання з Kindle за допомогою конвертера, наприклад Calibre.
