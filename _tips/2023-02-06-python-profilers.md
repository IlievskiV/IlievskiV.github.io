---
layout: single
title: "Make every line of your Python code to count with these 4 profilers"
excerpt: "How to completely profile your Python code using snakeviz, line_profiler, memory_profiler and pyinstrument"
description: "Learn how to use snakeviz, line_profiler, memory_profiler and pyinstrument to completely profile and inspect your Python code"
date: 2023-02-06 09:00:00
classes: wide
author_profile: true
tags:
    - profilers
    - pyinstrument
    - snakeviz
    - line_profiler
    - memory_profiler
header:
    teaser: "assets/images/python_profiling_header_image.png"
    image: "assets/images/python_profiling_header_image.png"
    og_image: "assets/images/python_profiling_header_image.png"
    caption: "Image by Author"
---

*A chain is as strong as the weakest link.* Making analogy between chain links and lines of code, the same is true for 
a program. The most demanding line of code might make the entire code utterly inefficient. We have to find out which
one using a set of code **profiling** tools.

# What
In Python, there is a well developed ecosystem of profilers. The profilers can help us to check what makes
a program slow and give us hints how to improve it. We will see how to use the following four profilers to
inspect every line of a Python program:

- [snakeviz](https://jiffyclub.github.io/snakeviz/){:target="_blank"}: browser based graphical viewer of the profiling results
- [line_profiler](https://github.com/pyutils/line_profiler){:target="_blank"}: profiling the code line by line
- [memory_profiler](https://github.com/pythonprofilers/memory_profiler){:target="_blank"}: profiling the memory consumption of every line
- [pyinstrument](https://github.com/joerick/pyinstrument){:target="_blank"}: call stack profiler focusing on the slowest calls.


# Why
The code ineffciency can be burried down into the layers of programming abstrations. For this reason it
might be difficult to spot it.

Nevertheless, code efficiency is always a desired property. Sometimes it could be of paramount importance
and we need to prevent it.

# How

Let's say we want to profile the [scaled dot product attention](http://nlp.seas.harvard.edu/2018/04/03/attention.html#attention){:target="_blank"} implemented as:

{% highlight python linenos %}
import math
import torch

def attention(query, key, value, mask=None):
    d_k = query.size(-1)
    scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(d_k)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    p_attn = scores.softmax(dim=-1)
    return torch.matmul(p_attn, value), p_attn
{% endhighlight %}

To profile it we randomly generate the input tensors `query`, `key` and `value`:

{% highlight python linenos %}

d_k = 64  # Dimensionality of the linearly projected queries and keys
d_v = 64  # Dimensionality of the linearly projected values
batch_size = 64  # Batch size from the training process
input_seq_length = 100  # Maximum length of the input sequence

query = torch.rand((batch_size, input_seq_length, d_k))
key = torch.rand((batch_size, input_seq_length, d_k))
value = torch.rand((batch_size, input_seq_length, d_v))
mask = torch.FloatTensor(input_seq_length, input_seq_length).uniform_() > 0.8
{% endhighlight %}


Then in a Jupyter Notebook, we can profile every aspect of the function with this snippet:

{% highlight python linenos %}
%load_ext snakeviz
%load_ext line_profiler
%load_ext memory_profiler
%load_ext pyinstrument

%snakeviz -t attention(query, key, value, mask)
%lprun -T lprof_attention.txt -f attention attention(query, key, value, mask)
%mprun -T mprof_attention.txt -f attention attention(query, key, value, mask)

%%pyinstrument --timeline=True
_ = attention(query, key, value, mask)
{% endhighlight %}


The [snakeviz](https://jiffyclub.github.io/snakeviz/){:target="_blank"} profiler will give us beautiful visualization of the call
stack. This is demonstrated in the picture below:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/snakeviz_icicle_diagram.png" class="lazyload" alt="Icicle diagram showing rectangles of the call stack"/>
    <br/>
    <span class="caption text-muted">
        <i>Figure 1:</i> Icicle diagram showing the call stack
    </span>
</center>
<br/>

The [line_profiler](https://github.com/pyutils/line_profiler){:target="_blank"} and [memory_profiler](https://github.com/pythonprofilers/memory_profiler){:target="_blank"}
will show us the details for every line of code. They will output a detailed textual report as shown below:

```
Total time: 0.014188 s

Line #      Hits         Time  Per Hit   % Time  Line Contents
============================================================================================================================
     6                                           def attention(query, key, value, mask=None):
     7         1      18000.0  18000.0      0.1      d_k = query.size(-1)
     8         1    6250000.0 6250000.0     44.1      scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(d_k)
     9         1       1000.0   1000.0      0.0      if mask is not None:
    10         1    1070000.0 1070000.0      7.5          scores = scores.masked_fill(mask == 0, -1e9)
    11         1    4547000.0 4547000.0     32.0      p_attn = scores.softmax(dim=-1)
    12         1    2302000.0 2302000.0     16.2      return torch.matmul(p_attn, value), p_attn
```

```
Line #    Mem usage    Increment  Occurrences   Line Contents
============================================================================================================================
     6    189.9 MiB    189.9 MiB           1   def attention(query, key, value, mask=None):
     7    189.9 MiB      0.0 MiB           1       d_k = query.size(-1)
     8    189.9 MiB      0.0 MiB           1       scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(d_k)
     9    189.9 MiB      0.0 MiB           1       if mask is not None:
    10    190.0 MiB      0.1 MiB           1           scores = scores.masked_fill(mask == 0, -1e9)
    11    190.0 MiB      0.0 MiB           1       p_attn = scores.softmax(dim=-1)
    12    190.0 MiB      0.0 MiB           1       return torch.matmul(p_attn, value), p_attn
```

Finally, [pyinstrument](https://github.com/joerick/pyinstrument){:target="_blank"} will render the following trace:


<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/pyinstrument_trace_visualization.png" class="lazyload" alt="PyInstrument call trace stack"/>
    <br/>
    <span class="caption text-muted">
        <i>Figure 2:</i> PyInstrument Trace
    </span>
</center>
<br/>

The source code for this work can be found in this <a href="https://github.com/IlievskiV/Amusive-Blogging-N-Coding/blob/master/Profiling/profilers_experiments.ipynb" target="_blank" rel="dofollow noopener">Jupyter Notebook</a>.
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