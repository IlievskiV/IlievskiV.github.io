---
layout: single
title: "Can ChatGPT differentiate and code it in Python? It seems so!"
excerpt: "Asking ChatGPT to calculate the differential of a funtion step by step and implement it in Python"
description: "Giving an example how to use ChatGPT to calculate a differential of a given function with step by step instructions. Then turning this into a Python implementation."
date: 2023-02-19 21:00:00
classes: wide
author_profile: true
tags:
    - ChatGPT
    - chatbots
    - math
    - derivation
header:
    teaser: "assets/images/chatgpt_differentiation_header.png"
    image: "assets/images/chatgpt_differentiation_header.png"
    og_image: "assets/images/chatgpt_differentiation_header.png"
    caption: "Image by Author"
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

In the previous post we tested ChatGPT's abilities to <a href="{{ site.baseurl }}{% link _tips/2023-02-07-chatgpt-latex.md %}" target="_blank" rel="dofollow">turn LaTeX equations into Python code</a>. This time we go step forward and ask [ChatGPT](https://openai.com/blog/chatgpt/){:target="_blank"} to calculate a differential, explain all derivation steps and implement it in Python.


# What
[Differentiation](https://en.wikipedia.org/wiki/Differential_(mathematics)){:target="_blank"} is an important operation in mathematics. The calculation of the first-order differential might include several operations. These operations are not necessarily obvious and it might be challenging to complete the process.

The differentiation process can be seen as a text generation task using a [Large Language Model (LLM)](https://en.wikipedia.org/wiki/Wikipedia:Large_language_models){:target="_blank"}. Instead of generating ordinary words, we generate mathematical expressions. 

To this end, *ChatGPT* is having excellent math skills. Following this, we test ChatGPT's capabilities to calculate a differential and explain all steps. Finally, we demand *ChatGPT*
to provide a Python implementation. To verify the correctness, we compare the results by using the [JAX](https://github.com/google/jax){:target="_blank"} library for automatic
differentiation.

# Why
Math skills of the Large Language Models are one of their crucial assets. Testing the LLMs like *ChatGPT* on math puzzles can reveal
their limitations. We can also learn how to properly use *ChatGPT* for our math tasks and even use it as a teaching resource.

# How

Let's consider the following function:

$$ f(x) = \dfrac{x^2cos(x) - x}{10} $$

We ask *ChatGPT* to provide a detailed explanation on how to calculate the first-order differential. We use the following prompt:

```plain
Can you calculate and show all the steps of the derivative of the following 
equation: 1/10 * (x**2 * cos(x) - x)
```

upon which we get a detailed response of the differentiation process. This conversation is shown below:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/chatgpt_differentiation_prompt.png" class="lazyload" alt="Asking ChatGPT to differentiate"/>
    <br/>
    <span class="caption text-muted">
        Prompting ChatGPT to differentiate
    </span>
</center>
<br/>

Using some of the online derivative calculators like the one from [Symbolab](https://www.symbolab.com/solver/derivative-calculator){:target="_blank"} we can easily 
verify that the answer is the same. This is already amazing, but let's go one step further and ask for a Python implementation using NumPy:


<center>
<img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/chatgpt_differentiation_implementation.png" class="lazyload" alt="Asking ChatGPT to implement the derivative"/>
    <br/>
    <span class="caption text-muted">
        Prompting ChatGPT to implement the above differential in Python using NumPy
    </span>
</center>
<br/>

Let's verify the veracity using the automatic differentiation from [JAX](https://github.com/google/jax){:target="_blank"}. First we define the implementation by *ChatGPT*:

{% highlight python linenos %}
import numpy as np

def f_chatgpt(x):
    return 1/10 * (x**2 * np.cos(x) - x)

def df_chatgpt(x):
    return 1/10 * (2*x*np.cos(x) - x**2*np.sin(x) - 1)

{% endhighlight %}

Then we implement the same using *JAX*. Here we only need the original function, as the differentiation is
completely numeric.

{% highlight python linenos %}
import jax.numpy as jnp
from jax import grad, jit, vmap

def f_jax(x):
    return 1/10 * (x**2 * jnp.cos(x) - x)

jax_grad_f = jit(grad(f_jax))
jax_elementwise_grad = jit(vmap(jax_grad_f))
{% endhighlight %}


After this we generate equidistant points on the *x-axis*. Using the *ChatGPT* and *JAX* implementation we calculate the derivative 
of the function in every point:

{% highlight python linenos %}
x_start, x_stop = -10, 10
num_points = 1000

np_x = np.linspace(x_start, x_stop, num_points, dtype=np.float32)
jax_x = jnp.linspace(x_start, x_stop, num_points, dtype=jnp.float32)

fp_chatgpt = df_chatgpt(np_x)
fp_jax = jax_elementwise_grad(jax_x)
{% endhighlight %}

Finally, we compare the results only to conclude they are close enough to be considered equal:

{% highlight python linenos %}
np.allclose(fp_chatgpt, fp_jax, atol=1.e-5)  # prints True
{% endhighlight %}


The source code for this work can be found in this
<a href="https://github.com/IlievskiV/Amusive-Blogging-N-Coding/blob/master/Differentiation/derivatives_with_chatgpt.ipynb" target="_blank" rel="dofollow noopener">Jupyter Notebook</a>. If this is something you like and would like to see similar content you could follow me on <a href="https://www.linkedin.com/in/vilievski/" target="_blank" rel="noopener"><b>LinkedIn</b></a>
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