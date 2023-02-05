---
layout: single
title: "Focus on what instead of how to plot your data"
excerpt: "Using the Altair Python API we can focus on what instead of how to visualize the data"
description: "Learn how to use the Altair Python API"
date: 2023-01-26 09:00:00
classes: wide
author_profile: true
tags:
    - altair
    - plotting
    - scatter plot
    - iris
header:
    teaser: "assets/images/altair_iris_top_image.png"
    image: "assets/images/altair_iris_top_image.png"
    og_image: "assets/images/altair_iris_top_image.png"
    image_description: "Code and an interactive scatter plot"
---

In many situations we don't have time to think how to plot our data. To make a quick data visualization
we can use the Altair Python library. Altair focuses on what instead on how to visualize the data.

# What
[Altair](https://altair-viz.github.io/){:target="_blank"} is a Python library built on top of [Vega-Lite](https://vega.github.io/vega-lite/){:target="_blank"}.
*Vega-Lite* is a light version of [Vega](https://vega.github.io/vega/){:target="_blank"}. It is a visualization grammar, a declarative language for describing
how to make visualizations. We write these declarations in *JSON* format.

# Why
With high-level visualization grammars we can spend more time understanding the data. Altair is well aligned with this paradigm.

# How

Using Altair for Python is quite simple. The most common pattern is to chain the following functions:
- `Chart(pd.Dataframe)`: create an instace of the `Chart` object using a loaded `Pandas` dataframe
- `mark_*`: with all the `mark_*` methods we specify how to plot the data in the `Pandas` dataframe. 
We can [pass various arguments](https://altair-viz.github.io/user_guide/marks.html#mark-properties){:target="_blank"} to `mark_*` methods.
- `encode`: we define how to map the data in the columns in the loaded `Pandas` dataframe


Without any effort, using these 3 calls we can visualze the Iris dataset. The Python code is given below:

{% highlight python linenos %}
import altair as alt
from vega_datasets import data

iris = data.iris()
alt.Chart(df).mark_circle(size=60).encode(
    x='sepalLength',
    y='sepalWidth',
    color='species',
    tooltip=['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth']
).interactive()
{% endhighlight %}
<br/>

With the call to `interactive()` we make the plot interactive. The resulting interactive plot is shown below:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/altair_iris_plot.png" class="lazyload" alt="Interactive scatter plot of the Iris dataset"/>
    <br/>
    <span class="caption text-muted">
        <i>Figure 1:</i> Interactive Scatter Plot of the Iris dataset
    </span>
</center>
<br/>

We can also apply *aggregate* encodings on the data. For instance, we can split the data into bins and apply an `average` aggregation.
An example in Python is given below:

{% highlight python linenos %}
stocks = data.stocks()
alt.Chart(stocks[stocks["symbol"] != "GOOG"]).mark_line().encode(
    x=alt.X("year(date):T", title="Year", bin=True),
    y="average(price)",
    color="symbol",
)
{% endhighlight %}

We make a line chart using `mark_line()`. We split the data into bins by the year. We select the year and make the data of temporal type with `year(date):T`.
The resulting plot is depicted below:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/altair_stocks_average_proce.png" class="lazyload" alt="Line plot of the average stock price over the years"/>
    <br/>
    <span class="caption text-muted">
        <i>Figure 2:</i> Line plot of the average stock price
    </span>
</center>
<br/>


**Altair** supports as well numerous transformation of the data. They are all summarized [here](https://altair-viz.github.io/user_guide/transform/index.html){:target="_blank"}.


The source code for this work can be found in this <a href="https://github.com/IlievskiV/Amusive-Blogging-N-Coding/blob/master/Visualizations/altair_plotting.ipynb" target="_blank" rel="dofollow noopener">Jupyter Notebook</a>.
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