## How to run the examples on a Raspberry Pi?

A few years ago, assuming that everybody has a computer with a graphical processing unit was a long shot. Now, most computers have a GPU, but it's still a high bar for a requirement in a workshop or class, for example.

Thanks to the [Raspberry Pi Foundation](http://www.raspberrypi.org/) a new type of small and cheap generation of computers (around $35 each) has found its way into classrooms. More importantly for the purposes of this book, the [Raspberry Pi](http://www.raspberrypi.org/) comes with a decent Broadcom GPU that can be accessed directly from the console. I made a [flexible GLSL live coding tool call **glslViewer**](https://github.com/patriciogonzalezvivo/glslViewer) that runs all the examples in this book. This program also has the ability to update automatically when the user saves a change to their code. What does this mean? You can edit the shader and every time you save it, the shader will be re-compile and render for you.

By making a local copy of the repository of this book (see the above section) and having [`glslViewer` installed](https://github.com/patriciogonzalezvivo/glslViewer), users can run the examples with `glslviewer`. Also by using the `-l` flag they can render the example in a corner of the screen while they modify it with any text editor (like `nano`, `pico`, `vi`, `vim` or `emacs`). This also works if the user is connected through ssh/sftp.

To install and set this all up on the Raspberry Pi after installing [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), a Debian-based Linux distribution made for Raspberry Pi, and logging in, type the following commands:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```
