---
layout: single
title: "Can ChatGPT turn LaTeX equations into Python code?"
excerpt: "Turning the attention equation from 'Attention is All you Need' into code using ChatGPT"
description: "Giving an example how to use ChatGPT to turn the Latex quetions for scaled dot product attention into Python implementation"
date: 2023-02-07 21:00:00
classes: wide
author_profile: true
tags:
    - ChatGPT
    - chatbots
    - attention
header:
    teaser: "assets/images/chatgpt_attention_implementation_from_latex.png"
    image: "assets/images/chatgpt_attention_implementation_from_latex.png"
    og_image: "assets/images/chatgpt_attention_implementation_from_latex.png"
    caption: "Image by Author"
---

[ChatGPT](https://openai.com/blog/chatgpt/){:target="_blank"} seems to have good skills to turn equations into code. This opens the following question:
can we use ChatGPT to turn the complicated *LaTeX* equations into Python code? 

# What
Given an equation written in *LaTeX*, ChatGPT can convert it in Python. We test this premise with a simple exercise.

# Why
It is quite a powerfull concept. We can turn the theory from the publications into code and make it actionable.

# How
To quickly test the ChatGPT abilities to turn *LaTeX* equations into code we can set up a simple *"experiment"*.

On the one hand we take the multi-headed attention code from the well-known guide 
["The Annotated Transformer"](http://nlp.seas.harvard.edu/2018/04/03/attention.html#attention){:target="_blank"}:


{% highlight python linenos %}
import math
import torch

def attention_reference(query, key, value, mask=None):
    d_k = query.size(-1)
    scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(d_k)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    p_attn = scores.softmax(dim=-1)
    return torch.matmul(p_attn, value)
{% endhighlight %}


On the other hand we prompt ChatGPT with the following sentence:

```plain
Can you write a Python code using PyTorch for the following equation 
written in LaTeX: a = softmax(\frac{QK^T}{\sqrt{d_k}})V
```

after which the following code snippet is generated:

{% highlight python linenos %}
import torch

def attention_chatgpt(Q, K, V, d_k):
    scores = torch.matmul(Q, K.transpose(-2, -1)) / torch.sqrt(d_k)
    scores = torch.softmax(scores, dim=-1)
    attention = torch.matmul(scores, V)
    return attention
{% endhighlight %}

For convenience, the function was renamed to `attention_chatgpt` (originally it was named `softmax_attention`).

For testing purposes we randomly generate the input tensors `Q`, `K` and `V`:

{% highlight python linenos %}
Q = torch.randn(64, 8, 100, 64)
K = torch.randn(64, 8, 100, 64)
V = torch.randn(64, 8, 100, 64)
d_k = torch.tensor(64).float()
{% endhighlight %}

Finally we compare the output tensors from both implementations to conclude they are close enough to be considered equal:

{% highlight python linenos %}
res_chatgpt = attention_chatgpt(Q, K, V, d_k)
res_reference = attention_reference(Q, K, V)
torch.allclose(res_chatgpt, res_reference)  # prints `True`
{% endhighlight %}


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