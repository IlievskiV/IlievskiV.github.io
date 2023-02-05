---
layout: single
title: "The 100-page ChatGPT Generated Python Tutorial For Absolute Beginners"
excerpt: "How I used ChatGPT to generate a tutorial for Python beginners"
description: "Using ChatGPT to make PYthon tutorial for beginners"
date: 2023-01-29 09:00:00
classes: wide
author_profile: true
tags:
    - chatbots
    - ChatGPT
header:
    teaser: "assets/images/chat_gpt_generated_python_tutorial.png"
    image: "assets/images/chat_gpt_generated_python_tutorial.png"
    og_image: "assets/images/chat_gpt_generated_python_tutorial.png"
---


[ChatGPT](https://openai.com/blog/chatgpt/){:target="_blank"} is a revolutionary large language model. It is capable
to generate text on literally any subject. It has outstanding capabilities to generate code explanations. This can serve 
as an excellent tool to teach programming as **"programming is learned by programming".**


Following this premise, I used **ChatGPT** to compile explanations for 100 Python exercises for complete beginners.
One exercise per page. Following the exercise explanations a novice in Python can learn how to code. You can find
the download link below.

# How I created the tutorial

Obviously we need a set of Python exercises well suited for beginners. The [**Break The Ice With Python**](https://github.com/darkprinx/break-the-ice-with-python){:target="_blank"} 
GitHub repository contains 100 simple Python questions with solutions.

Then, using the code snippets we ask **ChatGPT** to explain them line by line. To obtain good explanations suited for beginners
we use the following prompt:

```plain
Explain me the following code snippet written in Python as explaining
it to someone who doesn't know programming in Python: <code_snippet>
```

after which the Python snippet followed. The output is then taken for further processing.

After this we stich all explanations into a final *PDF* document. One exercise per page.
Every page follows the same structure having the following sections:

- Exercise N: the description of the exercise number *N*
- Code: The solution of the exercise
- ChatGPT Explanations: the ChatGPT explanation

Take a look and downlaod the document by clicking on the button below:

<a href="{{ site.url }}{{ site.baseurl }}/assets/pdfs/100_page_chat_gpt_generated_python_tutorial.pdf" target="_blank" class="btn btn--primary .btn--small">Downlaod Document</a>

All the resources can be found in this <a href="https://github.com/IlievskiV/the-100-page-chat-gpt-generated-python-tutorial" target="_blank">GitHub Repository</a>.
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