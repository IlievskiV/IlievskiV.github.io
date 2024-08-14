---
layout:      single
title:       "The Delicacy of Data Augmentation in Natural Language Processing"
excerpt:     "Explores how to overcome the difficulties of data augmentation in NLP"
description: "Learn the different techniques on how to augment any NLP data using some
simple techniques"
date:        2020-07-07 09:00:00
classes:     wide
tags:
    - nlp
    - data science
    - machine learning
canonical_url: "https://medium.com/ideas-at-igenius/the-delicacy-of-data-augmentation-in-natural-language-processing-nlp-2ef07e9ad1c0"
header:
    teaser: "assets/images/data_augmentation_for_nlp/data_augmentation_header.png"
    image: "assets/images/data_augmentation_for_nlp/data_augmentation_header.png"
    og_image: "assets/images/data_augmentation_for_nlp/data_augmentation_header.png"
    caption: "Credit: iGenius"
---

**Disclaimer**: I am the author of this blog that was originally on 
[Medium](https://medium.com/ideas-at-igenius/the-delicacy-of-data-augmentation-in-natural-language-processing-nlp-2ef07e9ad1c0){:target="_blank"} 
as part of the blog portal of the company I was working for at that time.


Data is everything in AI.

It is one of the most important premises on which tremendous effort is invested. 
As data is such a scarce resource, it is worth researching how to leverage the existing 
data in order to produce even more data. In other words, doing more with less.

The data augmentation consists of a set of techniques that handle the process of 
automatically generating high-quality data on top of the existing data.

For example, if we have a set of images, we can perform dozens of operations on every 
image: rotate, scale, shift, crop, change color intensities, etc.

However, the same is not applicable in the domain of natural language processing (NLP) 
where the main entity is a sentence. The data augmentation process is more challenging 
and not so straightforward. In the following blog post, we uncover the delicacy of data 
augmentation in NLP and explain some common techniques to do so.

# Text Substitution

The main principle is seamless substitution. It means replacing some words with their 
equivalent also known as synonyms without changing the meaning of the phrase. This comes
naturally since we use different words to express the same concepts. For instance, 
“smart”, “wise” and “intelligent” could mean the same in a certain context.

## Rule-Based Substitution

The simplest mechanism is to replace words with their synonyms taken from a 
hand-crafted system. One such example is WordNet, a manually crafted database bridging
the words with their synonyms.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/data_augmentation_for_nlp/rule_based_substitution.png" class="lazyload" alt="Diagram showing synonym replacement"/>
    <br/>
    <span class="caption text-muted">
       Replacing one word for its synonyms. Credits: iGenius.
    </span>
</center>
<br/>

This strategy has a clear edge of being lightweight and easy to implement. With little 
effort, we can considerably increase and make the data more diverse. However, this 
technique has its own limitations. First of all, it does not take into consideration the 
context in which the words appear. Second, it is agnostic to the scope of the dataset. 
To mitigate these effects, we need context-aware techniques, which we cover in the next 
section.

## ML-Based Substitution

Instead of having a simple substitution that is independent of the context, we can act 
more intelligently. With the help of some Machine Learning models, we can learn and 
embed the context in the text replacement process. The most popular ones are 
substitution based on [word embeddings](https://en.wikipedia.org/wiki/Word_embedding){:target="_blank"} 
and mask-based substitution using [BERT-like](https://en.wikipedia.org/wiki/BERT_(language_model)){:target="_blank"}
models.

### Word Embeddings Substitution

Word Embedding models like [Word2Vec](https://arxiv.org/abs/1301.3781){:target="_blank"},
[GloVe](https://nlp.stanford.edu/projects/glove/){:target="_blank"}, and 
[FastText](https://arxiv.org/abs/1607.01759){:target="_blank"} propelled the feature extraction 
revolution in NLP. With their help, we can transform words into a multidimensional vector 
representation and perform different mathematical operations on top of them. The learned
vector representations are inferred from the context in which the words appear.

Comparing vectors is a piece of cake. We can use any of the pre-trained word embedding 
models and substitute the words with their nearest neighbors in the vector space.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/data_augmentation_for_nlp/comparing_word_embeddings.png" class="lazyload" alt="Diagram showing how to compare word embeddings"/>
    <br/>
    <span class="caption text-muted">
       Finding similar word embeddings as a potential substitute. Credits: iGenius.
    </span>
</center>
<br/>

### Mask Based Substitution

The Transformer based model [BERT](https://arxiv.org/abs/1810.04805){:target="_blank"}
(and its variants like [ALBERTA](https://arxiv.org/abs/1909.11942){:target="_blank"} 
and [ROBERTA](https://arxiv.org/abs/1907.11692){:target="_blank"}) utterly 
changed the way we train and deploy NLP systems. It is a pre-trained model with the aim 
to be fine-tuned on a multitude of downstream tasks, for instance, question answering.

The pre-training is completely unsupervised — conditioned on the context in which the 
words appear. This is achieved by masking the words and predicting their value based on 
the context. We can use exactly this feature to augment our NLP datasets. All we have 
to do is to mask some words in our sentences and let the BERT-like models predict the 
most probable replacements.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/data_augmentation_for_nlp/mask_and_replace_words.png" class="lazyload" alt="Diagram showing mask words and use BERT-like models to predict the masked word"/>
    <br/>
    <span class="caption text-muted">
       Mask the word first and predict other probable substitutes. Credits: iGenius.
    </span>
</center>
<br/>

The clear advantage of all text substitution techniques is that they are simple and 
viable models that are already proven to work well. However, in order to fully automate 
the data augmentation process, we need an automated way of selecting which words to 
substitute. This can require additional heuristic-based techniques for which there is 
no guarantee of their efficiency.

# Back Translation

Back Translation is one intriguing byproduct of the automatic translation to another 
language. It is the ability to translate a sentence in one language to a set of similar 
yet different sentences in another language. Then, translating this set of sentences 
back to the original language might increase the diversity of our original dataset.

For example, we can translate an English sentence to its corresponding French, German 
and Russian equivalents. If the back translation to English leads to a different sentence, 
we include it in the dataset.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/data_augmentation_for_nlp/backtranslation.png" class="lazyload" alt="Diagram showing how to backtranslate a sentence from English and back"/>
    <br/>
    <span class="caption text-muted">
       Translate an English sentence into different languages and translate it back. Credits: iGenius.
    </span>
</center>
<br/>

# Text Generation

The generative or language modelling systems have a boggling ability to generate text 
when given only a few words. We can make some limited use of the text generation ML 
models to augment our data.

We can tackle this problem from many angles. One example is to fine-tune a previously 
pre-trained [GPT](https://openai.com/blog/better-language-models/){:target="_blank"} 
model to generate text. Another possibility is to train a 
[Generative Adversarial Network](https://en.wikipedia.org/wiki/Generative_adversarial_network){:target="_blank"} (GAN)
to artificially synthesize sentences similar to the sentences in our dataset.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/data_augmentation_for_nlp/generate_sentence.png" class="lazyload" alt="Diagram showing how to generate the continuation of a sentence"/>
    <br/>
    <span class="caption text-muted">
       Complete the sentence by using a language model to generate the rest. Credits: iGenius.
    </span>
</center>
<br/>

Although this set of techniques sounds very promising and potentially can be the 
game-changer in data augmentation for NLP, it is not so trivial to make them work. 
Usually, there are multiple billions of parameter neural networks that require tons of 
computational resources and manually tuning of many hyperparameter knobs. Moreover, 
there is high uncertainty in what direction the generated sentence might continue.

# Conclusion

In this blog post, we raised an important question on data augmentation in NLP. It is a 
process in which we increase our data — based on the existing data — without losing the 
quality. This is not so trivial to achieve because of the written language nature.

> One word, even one letter, can change the meaning of everything.

Nevertheless, there are a couple of interesting techniques like word substitution, 
back translation, and automatic text generation.

Despite all the effort and progress made in this area, the general conclusion is that 
there is still a void to be filled for more reliable and efficient data augmentation.