default: clean all

clean: 
	rm -rf */tmp.md
	rm -rf */tmp*.png
	rm -rf book.*

all:
	python src/parseBook.py