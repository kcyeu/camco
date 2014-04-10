TARGET=camco.zip

clean:
	rm -f ${TARGET}

commit:
	git add .
	git commit

all: clean commit
	zip ${TARGET} extension/* 
