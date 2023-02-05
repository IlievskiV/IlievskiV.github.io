---
layout: single
title: "Understand high-dimensional data with three lines of code"
excerpt: "Using 3 different types of plots from the Pandas plotting API we can understand any multivariate data"
description: "Learn how to visualize multivariate data using the Andrews plot, Parallel Coordinates and the Scatter 
plot matrix from the Pandas plotting API"
date: 2023-01-26 09:00:00
classes: wide
author_profile: true
tags:
    - pandas
    - plotting
    - parallel coordinates
    - scatter plot
    - iris
header:
    teaser: "assets/images/pandas_plotting.png"
    image: "assets/images/pandas_plotting.png"
    og_image: "assets/images/pandas_plotting.png"
    image_description: "Code and three plots"
---

It is difficult to gain insights from a multivariate data. It is also challenging to plot a multivariate data for better understanding.
Even so there are techniques to visualize high-dimensional data. We can use these techniques easily via the Pandas plotting API.

# What
[The Pandas plotting API](https://pandas.pydata.org/pandas-docs/stable/reference/plotting.html){:target="_blank"} contains many visualization techniques.
This helps us in understanding the data stored in a dataframe. When we have multivariate data, the following three plots are quite handy:
- [Andrews plot](https://en.wikipedia.org/wiki/Andrews_plot){:target="_blank"}
- [Parallel coordinates plot](https://en.wikipedia.org/wiki/Parallel_coordinates){:target="_blank"}
- [Scatter plot matrix](https://en.wikipedia.org/wiki/Scatter_plot){:target="_blank"}

# Why
Understanding correlations between multidimensional data points is important. An equaly important task is to detect outliers.
All this can give us a hint on how the space is divided and whether the features are discriminative enough.

# How

It is very easy to produce the plots using the Pandas plotting API. We will use the Iris dataset to demonstrate this.

```python
import matplotlib.pyplot as plt
import pandas as pd

data_url="https://raw.githubusercontent.com/pandas-dev/pandas/main/pandas/tests/io/data/csv/iris.csv"
df_iris = pd.read_csv(data_url)

plt.figure(figsize=(12, 7))
pd.plotting.andrews_curves(df_iris, class_column="Name")

plt.figure(figsize=(12, 7))
pd.plotting.parallel_coordinates(df_iris, class_column="Name")

pd.plotting.scatter_matrix(df_iris.drop("Name", axis=1), figsize=(8, 8), alpha=0.7)
```
<br/>

The resulting plots are shown below:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/andrews_plot.png" class="lazyload" alt="Image showing an Andrews plot of the Iris dataset"/>
    <br/>
    <span class="caption text-muted">
        <i>Figure 1:</i> Andrews plot of the Iris dataset
    </span>
</center>
<br/>

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/par_coord_plot.png" class="lazyload" alt="Image showing a parallel coordinates plot of the Iris dataset"/>
    <br/>
    <span class="caption text-muted">
        <i>Figure 2:</i> Parallel coordinates plot of the Iris dataset
    </span>
</center>
<br/>


<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/scatter_plot.png" class="lazyload" alt="Image showing a scatter plot matrix of the Iris dataset"/>
    <br/>
    <span class="caption text-muted">
        <i>Figure 3:</i> Scatter plot matrix of the Iris dataset
    </span>
</center>
<br/>


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