---
layout: single
title: "Batch vs Layer Normalization in Deep Neural Nets. The Illustrated Way!"
excerpt: "Intuitive illustration of the batch and layer normalization techniques in neural networks
with PyTorch implementation"
description: "We learn the difference between the batch and the layer normalization techniques
with illustrations. We also provide a Python implementation using PyTorch of the batch 
and layer normalizations"
date: 2023-03-15 09:00:00
classes: wide
author_profile: true
tags:
    - machine learning
    - deep learning
    - neural networks
header:
    teaser: "assets/images/batch_vs_layer_norm_top.png"
    image: "assets/images/batch_vs_layer_norm_top.png"
    og_image: "assets/images/batch_vs_layer_norm_top.png"
---

The [Batch Normalization (BN)](https://arxiv.org/pdf/1502.03167.pdf){:target="_blank"} and 
[Layer Normalization (LN)](https://arxiv.org/pdf/1607.06450.pdf){:target="_blank"} techniques
are widely used techniques in deep learning. They ease the optimization process and
help very deep networks converge faster. 


The Batch Normalization (BN) has been successfully applied to the vision tasks while the
the Layer Normalization (LN) to the sequential tasks, mainly in NLP.

They are both normalization techniques applied to the input of each layer. Therefore,
both techniques calculate the same two statistics: *mean* and *variance*, only in a 
different manner.

To fully understand and know the difference between *BN* and *LN* is not quite
straightforward. For this reason in this blog we explain batch and layer normalization
with intuitive illustrations.

# Batch Normalization

The [Batch Normalization (BN)](https://arxiv.org/pdf/1502.03167.pdf){:target="_blank"}
was first introduced to solve the *internal covariance shift* i.e. the change in the 
distributions of the hidden layers in the course of training.

In general *BN* accelerates the training of deep neural nets. It also reduces the dependence
of gradients on the scale of the parameters (or of their initial values) which in turn
allows the use of much higher learning rates. However, it has one drawback, it requires 
a sufficiently large batch size.

To save us the pain of reading the entire paper, without going too much into the details,
the essential part on how *Batch Normalization* works is illustrated in the image below:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/illustrated_batch_norm.png" class="lazyload" alt="Illustrated Batch Normalization"/>
    <br/>
    <span class="caption text-muted">
        Illustrated Batch Normalization
    </span>
</center>
<br/>

In *Batch Normalization* the *mean* and *variance* are calculated for each individual 
channel across all elements (pixels or tokens) in all batches. 

Even though at first sight it may sound counterintuitive, but because it iterates over all 
batches it is called *Batch Normalization* 

# Layer Normalization

Having sufficiently large batch size is impractical for sequential tasks where the length
of the sequence can be very large. To mitigate this constraint, the 
[Layer Normalization (LN)](https://arxiv.org/pdf/1607.06450.pdf){:target="_blank"} 
technique was introduced.

Thus, *LN* is less dependent on the batch size and can be used with small batch sizes.
It can also help to reduce the vanishing gradient in recurrent neural networks.

Agian, to save us the the time of reading the entire paper the essential part on how 
*Layer Normalization* works is illustrated in the image below:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/illustrated_layer_norm.png" class="lazyload" alt="Illustrated Layer Normalization"/>
    <br/>
    <span class="caption text-muted">
        Illustrated Layer Normalization
    </span>
</center>
<br/>

In *Batch Normalization* the *mean* and *variance* are calculated for each individual 
batch across all elements (pixels or tokens) in all channels.

At first sight it may be counterintuitive, but because it iterates over all 
channels i.e. features it is called *Layer Normalization* 

# PyTorch Implementation

The *PyTorch* implementation is given in code snippets below. During ttraining,
we create two learnable parameters `gamma` and `beta` to shift the normalized input.

To have unbiased inference, during training we calculate the *moving mean* and
*moving variance*. Later on, during inference we use these moving averages as a 
replacement of the test data *mean* and *variance*.

{% highlight python linenos %}
import torch
import torch.nn as nn
{% endhighlight %}

Below you can find the *Batch Normalization* implementation in PyTorch:

{% highlight python linenos %}
class BatchNorm(nn.Module):
    def __init__(self, num_features: int, training: bool, eps: float=1e-6) -> None:
        super().__init__()
        self.training = training

        # learnable parameters
        self.gamma = nn.Parameter(torch.ones(num_features))
        self.beta = nn.Parameter(torch.zeros(num_features))

        # hyperparams
        self.eps = eps
        self.moving_mean = nn.Parameter(torch.zeros(num_features), requires_grad=False)
        self.moving_var = nn.Parameter(torch.ones(num_features), requires_grad=False)
        
    def forward(self, x):
        if self.training:
            mean = x.mean(dim=0, keepdim=True)
            var = x.var(dim=0, keepdim=True)

            self.moving_mean = 0.9 * self.moving_mean + 0.1 * mean
            self.moving_var = 0.9 * self.moving_var + 0.1 * var
        else:
            mean = self.moving_mean
            var = self.moving_var
        
        x = (x - mean) / torch.sqrt(var + self.eps)
        x = self.gamma * x + self.beta
        return x
{% endhighlight %}

Below you can find the *Layer Normalization* implementation in PyTorch:

{% highlight python linenos %}
class LayerNorm(nn.Module):
    def __init__(self, num_features: int, training: bool, eps: float=1e-6) -> None:
        super().__init__()
        self.training = training

        # learnable parameters
        self.gamma = nn.Parameter(torch.ones(num_features))
        self.beta = nn.Parameter(torch.zeros(num_features))

        # hyperparams
        self.eps = eps
        self.moving_mean = nn.Parameter(torch.zeros(num_features), requires_grad=False)
        self.moving_var = nn.Parameter(torch.ones(num_features), requires_grad=False)
        
    def forward(self, x):
        if self.training:
            mean = x.mean(dim=-1, keepdim=True)
            var = x.var(dim=-1, keepdim=True)

            self.moving_mean = 0.9 * self.moving_mean + 0.1 * mean
            self.moving_var = 0.9 * self.moving_var + 0.1 * var
        else:
            mean = self.moving_mean
            var = self.moving_var
        
        x = (x - mean) / torch.sqrt(var + self.eps)
        x = self.gamma * x + self.beta
        return x
{% endhighlight %}


Take a look and downlaod the PDF document containing the illustrations above by clicking
on the button below:

<a href="{{ site.url }}{{ site.baseurl }}/assets/pdfs/illustrated_batch_vs_layer_norm.pdf" target="_blank" class="btn btn--primary .btn--small">Downlaod Illustrations</a>


For more information, please follow me on 
<a href="https://www.linkedin.com/in/vilievski/" target="_blank" rel="noopener"><b>LinkedIn</b></a>
or <a href="https://twitter.com/VladOsaurus" target="_blank" rel="noopener"><b>Twitter</b></a>.
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