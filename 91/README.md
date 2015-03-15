## How to use this book in a classroom with RaspberryPi?

A classroom can be a hard place to teach shaders because of technical limitations. A few years ago, taking for granted that all the students would have a computer with a modern graphic card was a long shot, but not today. Thanks to the [RaspberryPi project](http://www.raspberrypi.org/) a new type of small and cheap generation of computers ($35) has found its way into  classrooms. Most importantly for the purposes of this book, the [RaspberryPi](http://www.raspberrypi.org/) comes with a decent Bradcom GPU card that can be accessed directly from the console. I made a [flexible GLSL live coding tool](https://github.com/patriciogonzalezvivo/glslViewer) that runs all the examples in this book while also updating automatically the changes the user makes when they save it. By making a local copy of the repository of this book (see the above section) and having the [```glslViewer``` app installed](https://github.com/patriciogonzalezvivo/glslViewer), students can read the chapters using any console text reader (like ```less```, ```nano``` or ```vim```), run the examples (with ```glslviewer```), and modify them with their favorite text editor (like ```nano```, ```pico```, ```vi```, ```vim``` or ```emacs```).

To install and set this all up on the RaspberryPi after installing the OS and logging in, type the following commands:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core libfreeimage
cd ~ 
git clone http://github.com/patriciogonzalezvivo/glslViewer.git
cd glslViewer
make
make install
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd GLSL-Book
```

At the end of each section you will find code and non-code based exercises to give to your students. They are designed to help students immediately put concepts into practice, making concrete the abstract principles of parallel programming.

