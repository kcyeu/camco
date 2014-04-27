TARGET=camco.zip

clean:
	rm -f ${TARGET}

commit:
	git add .
	git commit

zip:
	zip ${TARGET} extension/* 

all: clean commit zip

