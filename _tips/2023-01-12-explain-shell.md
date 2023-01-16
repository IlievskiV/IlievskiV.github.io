---
layout: single
title: "Understanding unix commands was never easer. Here's how!"
excerpt: "Using the explainshell tool to understand the unix command and decrypt the myriad of arguments"
description: "Learn about the explainshell web app that facilitates the understanding of the unix commands' options"
date: 2023-01-11 09:00:00
classes: wide
author_profile: true
header:
    teaser: "assets/images/terminal_sudo_command.jpg"
    image: "assets/images/terminal_sudo_command.jpg"
    og_image: "assets/images/terminal_sudo_command.jpg"
    image_description: "Ubuntu terminal executing the command sudo"
    caption: "Photo by Gabriel Heinzer on Unsplash"
---

The Unix commands might be quite daunting for every developer. Each command is using a different set
of cryptic options with ambigious short forms. Instead of reading the manpage of each command and figuring 
out what every option means, there is a better way to do it. Find out how in the following geeky coffee break.

# What
In this geeky coffee break we introduce the [explainshell](https://explainshell.com/){:target="_blank"} web app. This tool
parses most of the Unix commands' man pages and extracts the options. Then, when we copy-paste a command along with its options
it matches them automatically and links the options visually nicely with their explanation.

# Why
Searching for the command line options' explanations inside the manual pages might be a very tedious task. Instead,
we can use a tool that automatically links the explanations with the options we intend to use, just as **explainshell**
is doing.

# How
It is pretty straightforward to use this web app. Go to [explainshell.com](https://explainshell.com/){:target="_blank"},
copy-paste the Unix command we want to use together with its options and instantaneously get a strikingly visual 
explanations. We can see one example in the image below:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/explain_shell_usage.png" class="lazyload" alt="Using the explainshell web app"/>
    <br/>
    <span class="caption text-muted">
        <i>Illustration:</i> An example of the explainshell web app use
    </span>
</center>
<br/>

If you liked this post you can subscribe to the mailing list below to get similar updates from time to time.

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

# Postscriptum

A great command line to help the usage of the other commands is [tldr](https://tldr.sh){:target="_blank"}. It displays simple help pages
for the command we want to use.