---
layout: single
title: "Understanding shell commands was never easer. Here's how!"
excerpt: "Using the explainshell tool to understand the shell command and decrypt the myriad of arguments"
description: "Learn "
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

# Postscriptum

A great command line to help the usage of the other commands is [tldr](https://tldr.sh){:target="_blank"}. It displays simple help pages
for the command we want to use.