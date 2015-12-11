# Code Challenge AngularJS and Elixir

This repository demonstrates a very simple web application  written in Angular2 Alpha 50 with [TypeScript](http://www.typescriptlang.org/) and a RESTful API written in [Elixir](http://elixir-lang.org/), a functional language on top of the Erlang VM.

The goal was to learn two new languages for the web - TypeScript on one side, giving us type-safe object oriented programming on the client side. In combination with the upcoming Angular2, it allows us to create well-structured and thus easily testable client-code. 

On the other side we have Elixir , a functional language based on the Erlang VM known for its capability to build low-latency, distributed and fault-tolerant systems. 

While building and testing the REST API in Elixir was quite straight-forward, thanks to the excellent documentation of the both Elixir as well as the [maru](https://github.com/falood/maru) framwork, that wasn't the case with Angular2. Even though the framwork is already in Developer Preview it still is in Alpha and mostly lacks of good, coherent documentation. Angular2 has been quite popular ever since it was announced over a year ago, and lots of blog posts can be found - most of them being based on out-dated versions. Even during one week breaking changes where still introduced.
However, besides the lack of documentation and some slight breaking changes I found the developer experience, especially in combination with the TypeScript language pretty good and didn't find any bugs. In combination Angular2 and TypeScript have the power
to lead to a well-structured and maintenanable codebase. 

Note that focus has been on code architecture. The graphical design of the front-end really is, err, not existant. However, thanks to the Angular2 Components the HTML is cleanly separated and styling can be applied easily by a HTML/CSS wizzard.  

#Testing and running
I usually provide a Dockerfile for easy deploying of the sample. I didn't find the time for now, so running the sample
still  necessites manual steps. The code has been developed and tested with Elixir version 1.1.1 and npm version 2.5.1.

	
For running the project, clone the repository, change into the `user` directory and run 

	mix deps.get, deps.compile 	# installs and compiles the missing dependencies
	iex -S mix 					# runs the backend and spans into Elixir interactive console
	
On a secone console, go back into the top-level directory of the repository and execute run
	
	npm install					# installs the missing dependencies
	npm run tsc					# starts the typescript compiler
	npm start					# starts the live-server and opens browser window


You should be all settled by now.
If you want to run the unit tests, run

	iex -S mix test
	
for the backend tests, and go to `src/unit-tests.html` to run the front-end tests in the browser. In an ideal world the front-end tests would
be automated with karma, however it is yet quite an adventure to do so with Angular2.


