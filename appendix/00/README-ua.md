## Як користуватись книгою офлайн?

Припустимо, у вас довга подорож і ви хочете за цей час повчити шейдери. У такому випадку ви можете скопіювати книгу на свій комп'ютер і запустити її на локальному сервері.

Для цього вам потрібні лише PHP, Python 3 і git-клієнт. На комп'ютерах MacOS і Raspberry Pi Python встановлено за замовчуванням, але потрібно ще встановити PHP і git-клієнт. Це можна зробити наступним чином:

Для **MacOSX** переконайтесь, що у вас встановлено [homebrew](http://brew.sh/), після чого в терміналі виконайте наступні команди:

```bash
brew update
brew upgrade
brew install git php
```

На **Raspberry Pi** встановіть [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), дистрибутив Linux для Raspberry Pi на основі Debian, а потім виконайте наступні команди:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer php
```

Після того, як все буде встановлено, склонуйте проєкт та запустіть локальний сервер:

```bash
cd ~
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git submodule init && git submodule update
php -S localhost:8000
```

Потім відкрийте у своєму браузері адресу [`http://localhost:8000/`](http://localhost:8000/)
