.PHONY: default clean all epub pdf tex

default: clean all

clean:
	rm -rf */tmp.md
	rm -rf */tmp*.png
	rm -rf book.*

all:
	python2.7 src/parseBook.py  -f tex -f pdf -f epub

epub:
	python2.7 src/parseBook.py -f epub

pdf:
	python2.7 src/parseBook.py -f pdf

tex:
	python2.7 src/parseBook.py -f tex
