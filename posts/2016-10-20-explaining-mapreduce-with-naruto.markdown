---
title: Explaining MapReduce with Naruto
---

I recently started rewatching Naruto Shippuden. I love the story arc of the show--even though the flashbacks make it agonizingly slow. I just got to the episode where Naruto needs to learn change in chakra nature in a short period of time (starting at episode 54). Kikashi has a brilliant idea to reduce the amount of time it would take to learn the technique. He proceeds to explain a perfect example of a MapReduce algorithm. 

## Shadow Clones

![Naruto makes shadow clones gif](http://67.media.tumblr.com/tumblr_mbyut0e5Wa1qcsesho1_500.gif)

If you don't watch Naruto, the basic idea is that Naruto (the main character) needs to learn something in a few months what would normally take decades. Naruto is really good at creating clones of himself. These clones, called shadow clones, can act independently. Shadow clones are pretty lame by themselves, but Kikashi (his teacher) has the insight that once these clones are dispatched the original Naruto retains the memories of the clones. 

## Taking action

I perked up around the time when each clone starts experimenting. Each clone attempts to perform a step in learning this new technique, splitting a leaf with chakra.


![Naruto splits leaf](http://ibdp.huluim.com/video/14169190?size=960x540)


As soon as one of the clones made progress in splitting the leaf Naruto would dispatch the clones and combine each of the clones' individual experiences into one Naruto.

## The Algorithm

There are two parts to a MapReduce algorithm. They are simply called "map" and "reduce". The map phase is all about doing work on a number of things. The reduce phase is all about combining those things. 

Using Narutos, the map phase is when each Naruto takes a leaf and attempts to split it using chakra. The reduce phase is when Naruto dispatches the clones. In doing so he combines the experiences of the other Narutos.

## The Point

Doing MapReduce using one Naruto is pointless. If one Naruto tried to split each leaf, it would take decades. It's the same thing with single threaded processing. MapReduce using one thread of execution is pointless. But, if you happen to have hundreds of servers (or can make hundreds of Naruto clones), you can process many more items in the same time. Naruto can learn his trump card move fast enough to take down Sasuke and you can search terrabytes fast enough to yield relevant results.
