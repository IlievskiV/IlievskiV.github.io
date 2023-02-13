---
layout: single
title: "The beauty of the Walrus Operator in Python"
excerpt: "How to use the Python Walrus operator to make expressions simpler. Here's how when computing gradients with JAX."
description: "Learn how to use the Assignment Expressions (or Walrus) operator in Python to make visualizations of the higher-order derivatives using the JAX automatic differentiation library"
date: 2023-02-12 09:00:00
classes: wide
author_profile: true
tags:
    - walrus operator
    - jax
    - gradients
header:
    teaser: "assets/images/walrus_operator_header.png"
    image: "assets/images/walrus_operator_header.png"
    og_image: "assets/images/walrus_operator_header.png"
    caption: "Image by Author"
---

The *assignment expresisons* or the *Walrus* operator in Python was introduced with the [PEP 572](https://peps.python.org/pep-0572/){:target="_blank"} proposal.
It serves to assign variables within an expression. After studying the characteristics of the *Walrus* operator, it's impossible not to love this
operator. Let's take a look!

# What
The *Walrus* operator `:=` allows us to evaluate expressions and save their result in a variable. All in one line using the notation `var := expr`.
Yes, it is an eponymous of the walrus animal because the operator resembles the tusks of a walrus.

The variable `var` can be then reused. In a way, we can see it as an operator for naming the expressions.

# Why

The *Walrus* operator is is making the *conditional* statements and the *list comprehensions* much simpler. We can be concise
and make the code neat. We can write everything in one line and reuse the assigned variable later on.

# How

There are multiple uses of the *assignment expression* operator. You can take a look at this thread on 
[StackOverflow](https://stackoverflow.com/questions/50297704/syntax-and-assignment-expressions-what-and-why){:target="_blank"}. One of the most
usefull applications is to share a subexpression between a comprehension filter clause and its output:

```python
[y for x in data if (y := f(x)) is not None]
```

One very interesting case to use the *Walrus* operator is to calculate higher-order derivatives of a given function. For this purpose we
will use [JAX](https://github.com/google/jax){:target="_blank"}, an updated version of Autograd for automatic differentiation. 

With the *Walrus* operator we will calculate and plot the first 4 derivatives of the `tanh` function while maining the expressions simple.

First we import all the required modules and generate evenly spaced numbers on the x-axis:
{% highlight python linenos %}
import jax.numpy as jnp
import matplotlib.pyplot as plt
from jax import grad, vmap

x = jnp.linspace(-7, 7, 500)
{% endhighlight %}


Then, we can simply calculate and plot all the derivatives of the `tanh` function as demonstrated:

{% highlight python linenos %}
fig = plt.figure(figsize=(15, 9))

plt.plot(
    x, (dx := jnp.tanh)(x),      # original function
    x, vmap(dx := grad(dx))(x),  # first derivative
    x, vmap(dx := grad(dx))(x),  # second derivative
    x, vmap(dx := grad(dx))(x),  # third derivative
    x, vmap(dx := grad(dx))(x),  # fourth derivative
)

plt.show()
{% endhighlight %}

To achieve the same effect we have to nest and re-compute all over again all derivatives along. This is
shown in code snippet below:

{% highlight python linenos %}
fig = plt.figure(figsize=(15, 9))

plt.plot(
    x, jnp.tanh(x),                                # original function
    x, vmap(grad(jnp.tanh))(x),                    # first derivative
    x, vmap(grad(grad(jnp.tanh)))(x),              # second derivative
    x, vmap(grad(grad(grad(jnp.tanh))))(x),        # third derivative
    x, vmap(grad(grad(grad(grad(jnp.tanh)))))(x),  # fourth derivative
)

plt.show()
{% endhighlight %}



The resulting plot is the one depicted below:


<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/tanh_with_walrus_op.png" class="lazyload" alt="tanh function and its first four derivatives"/>
    <br/>
    <span class="caption text-muted">
        <i>Figure 1:</i> tanh (in blue) and its first 4 derivatives
    </span>
</center>
<br/>


The source code for this work can be found in this <a href="https://github.com/IlievskiV/Amusive-Blogging-N-Coding/blob/master/Visualizations/jax_gradient_with_walrus_op.ipynb" target="_blank" rel="dofollow noopener"><b>Jupyter Notebook</b></a>.
If this is something you like and would like to see similar content you could follow me on <a href="https://www.linkedin.com/in/vilievski/" target="_blank" rel="noopener"><b>LinkedIn</b></a>
or <a href="https://twitter.com/VladOsaurus" target="_blank" rel="noopener"><b>Twitter</b></a>. Additionally, you can subscribe to the mailing list below to get similar updates from time to time.


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