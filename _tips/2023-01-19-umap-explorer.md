---
layout: single
title: "I wish every data scientist had interactive data explorers like this one"
excerpt: "This interactive visualization exploring the MNIST data UMAP projections is amazing"
description: ""
date: 2023-01-19 09:00:00
classes: wide
author_profile: true
header:
    teaser: "assets/images/umap_explorer.png"
    image: "assets/images/umap_explorer.png"
    og_image: "assets/images/umap_explorer.png"
    image_description: "Screenshot of the UMAP projections of the MNIST data"
    caption: "Screenshot of the UMAP explorer"
---

Comprehensive understanding of the data is a top priority for each data scientist. One important part
of this process is plotting and visualizing the data. However, the data is always high-dimensional and
the visualization is not a straightforward process. For this reason we use data projection techniques
like <a href="https://umap-learn.readthedocs.io/en/latest/" target="_blank" rel="nofollow noopener">UMAP</a>, 
<a href="https://scikit-learn.org/stable/modules/manifold.html#t-sne" target="_blank" rel="nofollow noopener">t-SNE</a>
or even <a href="https://en.wikipedia.org/wiki/Principal_component_analysis" target="_blank" rel="nofollow noopener">PCA</a>.


All these data projection techniques are amazing, however there's one drawback with them. They are not interactive,
not at least their Python implementations. In this short geeky coffee break, we will take a look at one
interactive data exploration tool over the UMAP projections of the MNIST dataset. 


# What
The <a href=" https://grantcuster.github.io/umap-explorer/" target="_blank" rel="noopener">UMAP Explorer</a> is
a web app rendering an interactive UMAP visualization of the <a href="http://yann.lecun.com/exdb/mnist/" target="_blank" rel="noopener">MNIST</a> dataset. 
For even greater satisfaction, each data point is rendered as the image of the hand-written digit itself. Besides **UMAP**, we can also load a
**t-SNE** projection of the data and observe how these two projection techniques differ.


It is a **React** application with a purpose to demonstrate how to render tens of thousands of images mapped to data points, but it
also serves as an excellent tool for the data scientist.

# Why
The interactivity is a 
<a href="{{ site.baseurl }}{% link _blog/2020-02-08-interactive-dataviz.html %}" target="_blank">crucial component</a> 
to understand the data better. To fully immerse into data exploration we need to dive interactively into the particular
data points. In this way we can see their neighborhood and how they compare with the other data points. 

In this MNIST use case, there are at least two aspects to observe: different digits that appear to be the same and the tiny
(and wide respectively) gap between different groups of digits.

## Different digits similar to each other
In the particular case of the **UMAP Explorer** we can zoom into the clusters of data points, click on them to have a more detailed
view and observe the visual cues of the digits. This enables us to compare the digit with other similar digits and to even 
conclude that some totally different digits are written in so similar way. One such particular case is depicted in the 
figure below. A digit labeled and written as 2 is among a cluster of digits written as 7. No wonder if some classifier
takes that *2* as *7*.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/MNIST_2_vs_7.png" class="lazyload" alt="Comparison between the digits 2 and 7"/>
    <br/>
    <span class="caption text-muted">
        <i>Illustration:</i> Comparison between the digits 2 and 7
    </span>
</center>
<br/>

## Blending between the similar digits
Zooming into the particular use-cases is not the only advantage of the interactive visualizations. We can also investigate
the global properties of the data, especially the boundaries between the different classes. As illustrated below, the
gap between the digits *8* and *1* is obvious, however the digits *8* and *3* seem to blend. No wonder if some classifier
struggles to distinguish *8s* and *3s*.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/boundary_between_8_and_3.png" class="lazyload" alt="Comparison of the boundary between the digits 8, 3 and 1"/>
    <br/>
    <span class="caption text-muted">
        <i>Illustration:</i> Boundary between the classes
    </span>
</center>
<br/>


# How
The **UMAP Explorer**  is perfectly combining multiple technologies. First, it pre-computes the
**UMAP** projections of the MNIST digits. This gives the projections of the images in the 2D plane, i.e.
their **(x, y)** coordinates.

Very briefly, UMAP (Uniform Manifold Approximation and Projection) is a non-linear data dimension reduction algorithm.
It builds a high-dimensional graph representation of the data then optimizes a low-dimensional graph to be as 
structurally similar as possible. The most two important parameters it uses are: 
- `n_neighbors`: the number of approximate nearest neighbors used to construct the initial high-dimensional graph
- `min_dist`: the minimum distance between points in low-dimensional space

In the **Resources** section below you can find an amazing set of articles that explain **UMAP**.

Furthermore, to be able to connect the 2D projected data points with the image they represent, it pre-computes a texture atlas
(an image containing multiple smaller images). Finally, it uses <a href="https://threejs.org/" target="_blank" rel="nofollow noopener">three.js</a> 
(a JavaScript 3D rendering library) to put and render everything together.


I wish we had more of these interactive data explorers.


If this is something you like and would like to see similar content you could follow me on 
<a href="https://www.linkedin.com/in/vilievski/" target="_blank" rel="noopener">LinkedIn</a>
or <a href="https://twitter.com/VladOsaurus" target="_blank" rel="noopener">Twitter</a>. 
Additionally, you can subscribe to the mailing list below to get similar updates from time to time.

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


# Resources
- The <a href="https://github.com/GrantCuster/umap-explorer" target="_blank" rel="nofollow noopener">GitHub repository</a> of the **UMAP Explorer**
- A great <a href="https://pair-code.github.io/understanding-umap/" target="_blank" rel="noopener">tutorial</a> on understanding UMAP
- A <a href="https://umap-learn.readthedocs.io/en/latest/how_umap_works.html" target="_blank" rel="nofollow noopener">deeper dive</a> in UMAP