TARGET=camco.zip

clean:
	rm -f ${TARGET}

commit:
	git add .
	git commit

zip: clean
	zip -r ${TARGET} extension/* 

all: clean commit zip

