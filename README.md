<img src="https://media4.giphy.com/media/ArVhgElNEc42Q/giphy.gif?cid=ecf05e47n3mzafao2rtng7900jihcj6xoyndx1yj7if2vufh&rid=giphy.gif&ct=g" widt="100%">

# Guess who

A modest try to make a modern take on the classic "Guess who?"-game. Made with PixiJs and Socket.io.

# Installation

1. Clone the repo
2. Run 'npm install' in the root folder
    - Run 'npm install' in packages/client and packages/server.
3. Start a localhost by running 'npm start' from root.
4. Test game by using two browsers, one being in incognito mode.

# Changelog

-   [#13 - More deploy stuff.](https://github.com/chrs-m/guess-who/pull/13)
-   [#12 - Update Readme and some server stuff.](https://github.com/chrs-m/guess-who/pull/12)
-   [#11 - Deploy stuff.](https://github.com/chrs-m/guess-who/pull/11)
-   [#10 - Guess logic + visual updates.](https://github.com/chrs-m/guess-who/pull/10)
-   [#9 - Fix issues when merging to one file.](https://github.com/chrs-m/guess-who/pull/9)
-   [#8 - Choose character.](https://github.com/chrs-m/guess-who/pull/8)
-   [#7 - Turn based logic now in place.](https://github.com/chrs-m/guess-who/pull/7)
-   [#6 - New board design + imgs.](https://github.com/chrs-m/guess-who/pull/6)
-   [#5 - New chat w/ socket.io.](https://github.com/chrs-m/guess-who/pull/5)
-   [#4 - Add WebSockets w/ chat.](https://github.com/chrs-m/guess-who/pull/4)
-   [#3 - Add initial clickevent on cards.](https://github.com/chrs-m/guess-who/pull/3)
-   [#2 - Displaying characters.](https://github.com/chrs-m/guess-who/pull/2)
-   [#1 - Add Vite and some boiler stuff.](https://github.com/chrs-m/guess-who/pull/1)

# Code Review by Albin Andersson and Emma Hansson

1. `vite.config.js` - This file is not in use, please remove.
2. `LICENSE: 1` - Wrong date on the year.
3. `characters.js: 4-24` - File name on imported characters are not using the same case as in the public/assets/img/characters.
4. `characters.js: 77` - ’class’ might be a bit too generic. It doesn’t tell what it is suppose to do.
5. `endTurn.js: 45` - Suddently snake case. Perhaps be more consistent.
6. `indexScript.js: 6 ` - Function call is empty.
7. `main.js: 2` - ’Spritesheet’ is declared but its value is never read.
8. `socker.js: 1` - 'Socket' is declared but its value is never read.
9. `index.html: 68` - The module timer.js is empty but still imported.
10. `index.html: 19` - ’Opponent’ is misspelled.
11. `server.js: 3` - 'Socket' is declared but its value is never read.
12. `server.js: 26` - Is this console.log connected to the server to log usefull information? Otherwise remove. Same with row 77, 80, 88, 107.
13. `Overall` - What does the pack-result folder in root do? Is it needed, since there is another on in the packages/client/public/assets folder
14. `Overall` - There are commented-out code that could be removed.

# Testers

Tested by the following people:

1. Theo
2. Patrik
3. Neo
4. Erik

Tested by the following muggles (non-coders):

1. Johanna
2. Filiph
3. Andreas
4. Carro
