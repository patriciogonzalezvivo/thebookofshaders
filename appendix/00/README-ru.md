## Как читать книгу оффлайн?

Предположим, вы отправились в длительное путешествие, и хотите немного подучить программирование шейдеров за это время. В этом случае вы можете скопировать книгу к себе на компьютер и запустить сервер локально.

Для этого понадобится только PHP, Python 3 и git-клиент. На MacOS и Raspberry Pi Python установлен по умолчанию, но PHP и Git придётся установить следующим образом:

На **MacOSX** убедитесь, что у вас установлен [homebrew](http://brew.sh/) и выполните следующие команды в терминале:

```bash
brew update
brew upgrade
brew install git php
```

На **Raspberry Pi** установите [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) - дистрибутив Linux  для Raspberry Pi, основанный на Debian, и выполните:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer php
```

Когда всё установлено, остаётся последний шаг:

```bash
cd ~
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git submodule init && git submodule update
php -S localhost:8000
```

Теперь откройте в браузере адрес [`http://localhost:8000/`](http://localhost:8000/)
