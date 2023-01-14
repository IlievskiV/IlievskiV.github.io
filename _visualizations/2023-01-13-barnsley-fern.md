---
layout:      single
title:       "The Barnsley Fern: Ferns Seen as Fractals (not only as plants)"
excerpt:     "Ferns can also be fractals. Generate and plot the Barnsley Fern fractal in Python using Matplotlib"
description: "We learn about and visualize the Barnsley Fern Fractal in Python using Matplotlib"
date:        2023-01-12 09:00:00
classes:     wide
author_profile: true
header:
    teaser: "assets/images/barnsley_fern_teaser.webp"
    image: "assets/images/barnsley_fern_teaser.webp"
    og_image: "assets/images/barnsley_fern_teaser.webp"
---


<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

Ferns are beautiful plants that exhibit a <a href="https://en.wikipedia.org/wiki/Self-similarity" target="_blank" rel="noopener nofollow">self-similar</a> structure: 
the entire plant is similar to a part of itself. This property makes them interesting from a mathematical point of view. The fern pattern can be described as a 
<a href="{{ site.baseurl }}{% link _blog/2020-07-04-animated-fractals.md %}" target="_blank" rel="dofollow">fractal</a>
that can be mathematically generated, thus being reproducible at any scale. We can zoom-in indefinitely and never run out of ferns.


The generation of a fern fractal might seem like a comlicated task, but in fact it is quite simple. It conforms to the simplicity of the
fractal geometry: cranking the same formula over and over again.

In this visualization guide, we will learn how the generation of a fern is mathematically defined coupled with a **Python** implementation.
Then we will see how to utilize this fern generation system to produce and plot different types of ferns using **Matplotlib**.


# Definition

The British mathematician Michael Barnsley was the first to describe and formalize the fern fractal. For this reason the fern fractal is called the 
<a href="https://en.wikipedia.org/wiki/Barnsley_fern" target="_blank" rel="noopener nofollow">Barnsley Fern</a>. 

The fern fractal can be generated using four instances (different sets of coefficients) of the following affine transformation:


$$ f\left(x_{n+1}, y_{n+1}\right) = \begin{bmatrix} a & b \\ c & d \end{bmatrix} * \begin{bmatrix} x_{n}  \\ y_{n} \end{bmatrix} +  \begin{bmatrix} e  \\ f \end{bmatrix} $$


s.t. each instance is having a certain probability of being chosen. The original **Barnsley Fern** is generated using the following coefficients and probabilities:


| w  | a     | b     | c     | d    | e | f    | p    |
|----|-------|-------|-------|------|---|------|------|
| f1 | 0     | 0     | 0     | 0.16 | 0 | 0    | 0.01 |
| f2 | 0.85  | 0.04  | -0.04 | 0.85 | 0 | 1.60 | 0.85 |
| f3 | 0.20  | -0.26 | 0.23  | 0.22 | 0 | 1.60 | 0.07 |
| f4 | -0.15 | 0.28  | 0.26  | 0.24 | 0 | 0.44 | 0.07 |

<br/>


# Python Implementation


In this section we will see how to implement in **Python** the fern fractal generation defined above.
First we define the data structures we need as `namedtuples`:

```python
from collections import namedtuple

transformations = namedtuple("transformations", ["f1", "f2", "f3", "f4"])
coefficients = namedtuple("coefficients", ["a", "b", "c", "d", "e", "f"])
fern_settings = namedtuple("fern_settings", ["transformations", "probabilities"])
```
<br/>



The `namedtuples` hold all the coefficients for the affine transformations as well as their assigned probabilities.
Consequently, we instantiate the settings we need to generate a **Barnsley Fern**:

```python
barnsley_fern_coefficients = transformations(
    f1=coefficients(.0, .0, .0, .16, .0, .0),
    f2=coefficients(.85, .04, -.04, .85, 0, 1.6),
    f3=coefficients(.20, -.26, .23, .22, .0, 1.6),
    f4=coefficients(-.15, .28, .26, .24, .0, .44),
)
barnsley_fern_probabilities = [.01, .85, .07, .07]
barnsley_fern = fern_settings(
    transformations=barnsley_fern_coefficients,
    probabilities=barnsley_fern_probabilities,
)
```
<br/>

In this way the 4 affine transformations are indexed with indexes between 0 and 3. Finally, we pass the `barnsley_fern` `namedtuple` in the following
function to generate all the points:

```python
import numpy as np

def generate_fern(selected_fern_settings: namedtuple, num_points: int) -> list:
    rng = np.random.default_rng()  # Generator object

    # generate `num_points` indexes from 0 to 3 according to the probability
    indexes = rng.choice(
        a=len(selected_fern_settings.probabilities),
        size=num_points, 
        p=selected_fern_settings.probabilities,
        shuffle=False
    )

    # x_0 and y_0 at time step 0
    x, y = .0, .0
    fern_points = []
    for idx in indexes:
        fern_points.append((x, y))  # save x_{n} and y_{n}
        coeff = selected_fern_settings.transformations[idx]

        # calculate x_{n + 1} and y_{n + 1} using x_{n} and y_{n}
        x, y = coeff.a * x + coeff.b * y + coeff.e, coeff.c * x + coeff.d * y + coeff.f

    return fern_points
```
<br/>


As the affine transformations are already indexed from 0 to 3, we randomly sample `num_points` indexes between 0 and 3 using
the assigned probabilities. For this purpose we use the **NumPy** `choice` method from the 
<a href="https://numpy.org/doc/stable/reference/random/generated/numpy.random.Generator.choice.html#numpy.random.Generator.choice" target="_blank" rel="noopener nofollow">Generator</a> 
class. 

In the iteration process that follows, we map the sampled indexes back to the affine transformation they point to and calculate the coordinates.

If we plot the points generated by the function above using **Matplotlib**, we get a nice figure that resembles a fern:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/barnsley_fern.png" class="lazyload" alt="Plot of the Barnsley Fern Fractal">
    <br/>
    <span class="caption text-muted">
        The Barnsley Fern Fractal
    </span>
</center>
<br/>



The source code for this work can be found in this
<a href="https://github.com/IlievskiV/Amusive-Blogging-N-Coding/blob/master/Visualizations/barnsley_fern.ipynb" target="_blank" rel="dofollow noopener">Jupyter Notebook</a>.
It would be very helpful to star the repo to get more easily noticed. For more information, please follow me on
<a href="https://www.linkedin.com/in/vilievski/" target="_blank" rel="noopener">LinkedIn</a>
or <a href="https://twitter.com/VladOsaurus" target="_blank" rel="noopener">Twitter</a>.

If you like this content you can subscribe to the mailing list below to get similar updates from time to time.

<link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
<link href="/assets/css/mailchimp.css">
<div id="mc_embed_signup">
<form action="https://digital.us19.list-manage.com/subscribe/post?u=cb9dbe40387c27177a25de80f&amp;id=08bda6f8e0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
	<label for="mce-EMAIL">Join the iSquared mailing list</label>
	<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_cb9dbe40387c27177a25de80f_08bda6f8e0" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>
<br/>

# Appendix: Other types of fern fractals


By playing with the coefficients of the four affine transformation defined above, we can get different interesting results. Some of these results are
shown in the figures below.

## Fishbone Fern

The Fishbone Fern Fractal can be obtained using the following transformations and probabilities:

| w  	| a     	| b     	| c      	| d    	| e      	| f     	| p    	|
|----	|-------	|-------	|--------	|------	|--------	|-------	|------	|
| f1 	| 0     	| 0     	| 0      	| 0.25 	| 0      	| -0.4  	| 0.02 	|
| f2 	| 0.95  	| 0.002 	| -0.002 	| 0.93 	| -0.002 	| 0.5   	| 0.84 	|
| f3 	| 0.035 	| -0.11 	| 0.27   	| 0.01 	| -0.05  	| 0.005 	| 0.07 	|
| f4 	| -0.04 	| 0.11  	| 0.27   	| 0.01 	| 0.047  	| 0.06  	| 0.07 	|

<br/>

By cranking the iterative formula many times we get the following result:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/fishbone_fern.png" class="lazyload" alt="Plot of the Fishbone Fern Fractal">
    <br/>
    <span class="caption text-muted">
        The Fishbone Fern Fractal
    </span>
</center>
<br/>

## Fractal Tree

Using the Barnsley Fern technique we can "mutate" the ferns into fractal trees. If we fit the following coefficients and probabilities


| w  	| a    	| b     	| c     	| d    	| e 	| f   	| p    	|
|----	|------	|-------	|-------	|------	|---	|-----	|------	|
| f1 	| 0    	| 0     	| 0     	| 0.5  	| 0 	| 0   	| 0.04 	|
| f2 	| 0.42 	| -0.42 	| 0.42  	| 0.42 	| 0 	| 0.2 	| 0.4  	|
| f3 	| 0.42 	| 0.42  	| -0.42 	| 0.42 	| 0 	| 0.2 	| 0.4  	|
| f4 	| 0.1  	| 0     	| 0     	| 0.1  	| 0 	| 0.2 	| 0.15 	|

<br/>

we get an interesting result that resembles a tree as shown below:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/fractal_tree.png" class="lazyload" alt="Plot of a Fractal Tree">
    <br/>
    <span class="caption text-muted">
        A Fractal Tree
    </span>
</center>
<br/>