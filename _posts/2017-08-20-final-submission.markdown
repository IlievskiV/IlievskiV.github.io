---
layout:     single
title:      "GSoC Final Submission"
subtitle:   "Final Submission description for GSoC 2017"
date:       2017-08-23 12:00:00
classes: wide
header:
    teaser: "assets/images/gsoc17.png"
    image: "assets/images/gsoc17.png"
    image_description: "Google Summer of Code 2017 logo"
categories: blog technology
tags: gsoc open-source
---

<h2> Intro </h2>
<p>In this blog post I will summarize the work I have done during this amazing Google Summer of Code.
I was working on the project "Convolutional Deep Neural Networks on GPUs for Particle Physics Applications".
More about this project can be find
<a href="https://hepsoftwarefoundation.org/gsoc/2017/proposal_TMVAconvolutional.html" target="_blank">here</a>. </p>

<h2>Current state of the work</h2>
<p>Until now, I have written one <a href="{{ site.baseurl }}{% link _posts/2017-05-05-gsoc-start.markdown %}" target="_blank">introductory blog post</a>
for the Convolutional Neural Networks, and one <a href="{{ site.baseurl }}{% link _posts/2017-08-20-deep-learning-module-tmva.markdown %}" target="_blank">blog post</a>
describing the entire Deep Learning project.</p>

<p>The current state of the work includes an entire Deep Learning Framework that can be easily extended with new types
of layers and modules. My work here includes: redesigning and writing the generic data loaders and minimizers,
redesign of the dense layers, writing deep neural network class as well as an entire method class for instantiating,
training and testing the net.</p>


<p>Apart from this, on top of this Deep Learning platform, I was developing the Convolutional, Max Pooling and
Reshape layers. Since there are three types of low-level interfaces (<i>Reference</i>, <i>CPU</i> and <i>GPU</i>),
the work is completely done for the <i>Reference</i> and the <i>CPU</i> interfaces, while the <i>GPU</i> interface
is still under development, and I am planning to finish it after this year's Google Summer of Code.
Moreover, for every submodule, there is an extensive list of tests.</p>

<p>Since we were a team of three students, for the purpose of this summer of code, we have created
a common GitHub repo. All of my commits can be find on the following
<a href="https://github.com/tmvadnn/root/commits/master?author=IlievskiV" target="_blank"><b>link</b></a></p>

