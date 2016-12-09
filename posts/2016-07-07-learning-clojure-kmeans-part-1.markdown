Learning Clojure: K-Means (Part 1)
==================================

I've been passively interested in clojure for quite awhile. The idea of immutable state and pure expressions are really attractive. On the other hand I'm concerned that writing anything "real" in clojure would result in a totally unreadable mess. I worry I'd have to drop down to Java to get anything done. So I have avoided clojure until now.

In order to test out my assumptions (fears) I decided to write a fairly simple algorithm I was familiar with in clojure. I settled on k-means. K-means is an unsupervised machine learning algorithm. It takes data points and puts them into k clusters, where k is some constant known a head of time. It's a fairly simple iterative algorithm. It starts by create k random means, then assign the point to the nearest mean, then update the means to be the centroid of the clusters, lather, rinse, repeat. Eventually the clusters will converge until there are no more reassignments, this is when we say we're done.

To start I mocked out the skeleton: 

```
(defn helper [k points means] ())

(defn k-means [k points] (helper k points 
         (repeat k (random-means points))))
```

`k-means` take a k and a list of points. I decided to keep it to 2 dimensions to make it easy. It then calls a helper function with some random means.

This part was pretty simple. I liked how easy it was to mock out stuff I would fill in later. Next I moved on to implementing the `random-means` functions.

```
(defn random-mean [points] (let [xs (map first points)
                                 ys (map second points)
                                 xd (- (apply max xs) (apply min xs))
                                 yd (- (apply max ys) (apply min ys))
                                 x (+ (* xd (rand)) (apply min xs))
                                 y (+ (* yd (rand)) (apply min ys))]
                                 (list x y)))
```

It took a little while to find out the apply trick to chance a collection into a list of args. Luckily the clojure docs are amazing! This is a big plus for the language as a whole. This was my first working version. I'm not sure about stylistic concerns yet but I feel like really long let lists are probably a bad code smell. Let's see if I can fix that and implement the nearest means assignment for part 2.