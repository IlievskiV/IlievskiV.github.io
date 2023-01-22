---
layout: single
title: "Make the learning curve of an ML model more informative"
excerpt: "Track the loss per class per epoch when training a machine learning model to reveal the learning curve for different classes."
description: "We learn how to "
date: 2023-01-22 09:00:00
classes: wide
author_profile: true
header:
    teaser: "assets/images/ai_new_normal_teaser.png"
    image: "assets/images/ai_new_normal_teaser.png"
    og_image: "assets/images/ai_new_normal_teaser.png"
    image_description: "Plot of two normal distributions"
---

In this short geeky coffee break, we will see how to report the classification loss per epoch for each class separately
for a neural network built in Keras.

# What
In multiclass classification scenarios, when training a machine learning model the loss after every epoch is usually an
average over all inputs. Instead, we can easily change this and report the loss for every class separately.

# Why
The averaged loss hides the performance of the classifier and the learning curve it has for different classes. We 
have no clue what classes the model has learnt early or later in the training process. Having this information helps
us in understanding the learning curve.

# How
In Keras this can be easily achieved using the `Callbacks` API. The callback simply splits the data into buckets
corresponding to the different classes. Then, it calculates the loss for each class separately.

For instance, if we [build a simple neural network built in Keras](https://github.com/IlievskiV/Amusive-Blogging-N-Coding/blob/master/Visualizations/loss_per_class.ipynb){:target="_blank"} 
and train it on the [CIFAR-10 dataset](https://www.cs.toronto.edu/~kriz/cifar.html){:target="_blank"} we get a plot of the loss per
class over the epochs as shown below:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/loss_per_class.png" class="lazyload" alt="Plot of all the losses per class per epoch"/>
    <br/>
    <span class="caption text-muted">
        <i>Figure 1:</i> Loss per class per epoch
    </span>
</center>
<br/>

We can observe that the model is learning `class 1` (which represents an `automobile`) quicker than `class 3` (which represents a `cat`).


The source code for the implementation can be found on <a href="https://github.com/IlievskiV/Amusive-Blogging-N-Coding/blob/master/Visualizations/loss_per_class.ipynb" target="_blank">GitHub</a>.
If this is something you like and would like to see similar content you could follow me on <a href="https://www.linkedin.com/in/vilievski/" target="_blank" rel="noopener">LinkedIn</a>
or <a href="https://twitter.com/VladOsaurus" target="_blank" rel="noopener">Twitter</a>. Additionally, you can subscribe to the mailing list below to get similar updates from time to time.


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
