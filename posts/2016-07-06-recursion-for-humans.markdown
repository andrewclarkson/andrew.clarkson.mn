Recursion for Humans
====================

My first formal programming course was almost entirely taught in a functional language, namely scheme. It was taught using Structure and Interpretation of Computer Programs (SICP) a blessing I wouldn't appreciate until much later. Being a functional language, one of the first things I was taught was recursion. It was a real stumbling block for me. Recursion was utterly impenetrable and completely impossible to understand. It seemed so abstract and when it did work it seemed like magic. I had been programming for a while in imperative languages (C and Javascript) and it seemed like for-loops were the natural way to express almost any logic. Recursion seemed only to be a hinderance to doing what I wanted.

I was given the standard lambda calculus explanation of recursion. Simply substitute the return value in the place of the function call and keep track of the stack as you go. This was time consuming and didn't help with what I was actually struggling with. I didn't have a problem with the technical aspects of stack pushing and popping. I did have a problem with how to use that to get a computer to do what I want. I didn't have trouble reading a recursive problem. I had a problem writing recursive programs.

The explanation that finally clicked for me was a simple analogy given to me by a TA. The idea that finally worked for me was the movie Inception. All recursion needs a base case (or end case) otherwise your program will never finish. The base case is analogous to falling in Inception. This kicks the characters up a level. Some recursion goes up through the levels at once like in the movie. This is tail recursion. If you still have work to do on the level above the current level, then it's not this special kind of recursion. A really solid recursive program can generally set it up so all the base cases happen one after another like Inception.

Applying this to a computer science problem you can write this iterative program:

```
function sum(integers) {
    var total = 0;
    for(i = 0; i < integers.length, i++) {
        total += integers[i];
    }
    return total;
}
```

Into this recursive program:

```
(defn sum [integers] 
      (if (empty? integers) 0 
          (+ (first integers) 
             (sum (rest integers)))))
```

But this leaves work (the addition) to be done on each level. This version is tail recursive:

```
(defn sum [integers] ((defn helper [x acc] 
      (if (empty? x) acc 
          (helper (rest x) (+ (first x) acc))))
          integers 0))
```

This version adds an additional variable called `acc` that keeps track of the sum so we don't have any work to do on the level above the current one. We can quickly pop up through all the dream levels in one go.