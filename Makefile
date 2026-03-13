.PHONY: default clean all epub pdf tex

default: clean all

clean:
	rm -rf */tmp.md
	rm -rf */tmp*.png
	rm -rf book.*

ifeq ($(OS),Windows_NT)
PYTHON_SCRIPT = python3 src/parseBookWindows.py
else
PYTHON_SCRIPT = python3 src/parseBook.py
endif

all:
	$(PYTHON_SCRIPT) -f tex -f pdf -f epub

epub:
	$(PYTHON_SCRIPT) -f epub

pdf:
	$(PYTHON_SCRIPT) -f pdf

tex:
	$(PYTHON_SCRIPT) -f tex
