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
or <a href="https://x.com/VladOsaurus" target="_blank" rel="noopener">Twitter</a>. Additionally, you can subscribe to the mailing list below to get similar updates from time to time.


{% include newsletter.html %}
<br/>