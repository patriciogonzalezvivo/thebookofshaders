## How to run the examples on a RaspberryPi?

A few years ago, taking for granted that everybody have a computer with a GPU was a long shot. Now, most computers have a graphic unit, but is a high bar for a requirement in for example a course or class. 

Thanks to the [RaspberryPi project](http://www.raspberrypi.org/) a new type of small and cheap generation of computers (around $35 each) has found its way into  classrooms. More importantly for the purposes of this book, the [RaspberryPi](http://www.raspberrypi.org/) comes with a decent Bradcom GPU card that can be accessed directly from the console. I made a [flexible GLSL live coding tool call **glslViewer**](https://github.com/patriciogonzalezvivo/glslViewer) that runs all the examples on this book. This program also is hable to update automatically the changes the user makes when they save it. What that means? you can edit the shader and every time you save it, the shader will be re-compile and rendered for you.

By making a local copy of the repository of this book (see the above section) and having [```glslViewer``` installed](https://github.com/patriciogonzalezvivo/glslViewer), users can run the examples with ```glslviewer```. Also by using the ```-l``` flag they can render the example on a corner of the screen while they modify it with any text editor (like ```nano```, ```pico```, ```vi```, ```vim``` or ```emacs```). This also works if the user is connected through ssh/sftp.

To install and set this all up on the RaspberryPi after installing the OS and logging in, type the following commands:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core
cd ~ 
git clone http://github.com/patriciogonzalezvivo/glslViewer.git
cd glslViewer
make
make install
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```