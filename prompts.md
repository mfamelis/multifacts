# 1

Create a browser game, where the user is presented with a multiplicaiton fact question (e.g., "7 8 ?") for the multiplication tables between 1 and 10 and a button that reveals the answer.

after the answer is revealed, another button lets me continue.

The multiplication facts questions should appear randomized and in randomized order. 

For example:

6 8
3 4
8 5
2 9
8 6

# 2

When an answer is revealed, the box changes height and the button moves to the bottom. Make it have the same height in both states. For example, in the question state, just make the spot where the answer will appear empty (but included).

# 3

Make it so that I can advance at each step by pressing space bar

# 4

Now add to the side a version of this reduced table. At the start of the game, only the row and column labels should appear in the table (the first column and the last row). The rest of the cells should be empty. Each time the player answers a question, the appropriate cell value is revealed (so after answering the question for 6 7, the appropriate cell should show 42). When the entire table is filled, a button underneath should ask "go again?" to restart.

# 5

Let's change the spec a bit. I want the multiplication tables from 2 to 9 (so not 1 or 10).

Also, move the triangular table in its own box to the right of the question box. And add borders to all of its cells. The cells shoudl have a constant size (so don't resize when a new number appears).

# 6

Make the two panels (the question and the triangle) appear side by side, as opposed to vertically on top of each other

