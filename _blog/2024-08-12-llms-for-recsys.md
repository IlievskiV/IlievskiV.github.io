---
layout: single
title: "Beyond Personalization: How LLMs are Revolutionizing Recommendation Systems"
excerpt: "Walkthrough over the recommendation system landscape using LLMs"
description: "We learn how the large language models (LLMs) are shifting the 
recommendation systems (RecSys) landscape with a particular attention on the P5 model."
date: 2024-08-12 09:00:00
classes: wide
author_profile: true
tags:
    - machine learning
    - recommendation systems
    - large language models
header:
    teaser: "assets/images/llms_for_recsys/llms_for_recsys_header.jpg"
    image: "assets/images/llms_for_recsys/llms_for_recsys_header.jpg"
    og_image: "assets/images/llms_for_recsys/llms_for_recsys_header.jpg"
---

[Recommendation Systems](https://en.wikipedia.org/wiki/Recommender_system){:target="_blank"} (RecSys) 
have become an integral part of our digital lives. These intelligent systems are the 
invisible hand guiding us through a sea of choices. There are countless number of examples, 
just to mention a few: 
* *E-Commerce*: Personalized product suggestions enhance shopping experiences. Think about
next time you use Amazon or eBay.
* *Social Networks*: Recommended advertisements, friends or content shape our interaction
patterns on social media. 

This indicates that RecSys are one of the most commercially successful AI applications,
enhancing user experiences and driving business growth across industries.

On the other hand, the [large language models](https://en.wikipedia.org/wiki/Large_language_model){:target="_blank"}
(LLMs) exploded in recent years. Fueled by the rise of the LLMs the landscape of 
recommendation has also seen a shift in this direction. These AI powerhouses, with their 
vast knowledge and impressive language processing capabilities, are poised to unlock a 
new era of personalization and predictive power in RecSys.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/llms_evolution_tree.jpg" class="lazyload" alt="The evolution of the LLMs"/>
    <br/>
    <span class="caption text-muted">
        The evolution of the LLMs <a href="https://arxiv.org/pdf/2304.13712" target="_blank" rel="noopener nofollow">[6]</a>.
    </span>
</center>
<br/>

# But first, what are Recommendation Systems 

Every recommendation system operates on a set of **users**, **items** and the 
**interaction** between them. Thus, we have three sets:
* *U*: set of users uniquely identified with an ID 
* *I*: set of items uniquely identified with an ID 
* *R = U x I*:  set of user-item interactions represented as a matrix

Simply put, the purpose of the recommendation systems is to recommend the best possible
set of items to a given user based on the interaction history. 

As noted above, the interaction history is modeled using an interaction matrix **R**. The
element at position *[i, j]* represents the interaction record between the user at
position *i* and the item at position *j*.

The interaction record, or so-called feedback, can be *explicit* or *implicit*. Below is
an example of an explicit feedback about movie rating: 

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/movie_rating_explicit_feedback.png" class="lazyload" alt="Example of explicit rating for movies"/>
    <br/>
    <span class="caption text-muted">
        Example of explicit rating for movies
    </span>
</center>
<br/>

Both types of feedback have different properties. The table below compares their properties:

| Property / FeedBack Type | Explicit                    | Implicit                            |
|--------------------------|-----------------------------|-------------------------------------|
| Accuracy                 | High                        | Low                                 |
| Abundance                | Low                         | High                                |
| Preference Types         | Positive, Negative, Neutral | Positive only, absence is ambiguous |
| Example                  | Movies rated; items liked   | Items viewed; items purchased       |


# From Shallow Models to the Generative Frontier

The current landscape of recommender systems can be split into *traditional systems*, 
modelling the user-item interaction directly and *generative systems* exploiting the 
generative power of the LLMs.

## Shallow Models
Traditionally, recommendation systems relied on *shallow models*, utilizing [matrix 
factorization](https://en.wikipedia.org/wiki/Matrix_factorization_(recommender_systems)){:target="_blank"} 
techniques like *LU*, *QR* or *SV* decomposition to analyze user-item interactions. 
Thus, the name *shallow* is used to designate this family of models. 

These models aim to decompose the sparse interaction matrix *X* into the product of two 
dense matrices, W and H. The row vectors of *W* represent users, while those of *H* 
represent items. This is nicely illustrated below: 

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/mf_illustration.png" class="lazyload" alt="Illustration of the matrix factorization concept"/>
    <br/>
    <span class="caption text-muted">
        Illustration of the matrix factorization concept
    </span>
</center>
<br/>

These methods, while effective, often fall short in capturing the nuances of user 
preferences and item characteristics.

## Deep Learning-Based Models
The advent of deep learning ushered in a new wave of RecSys, leveraging the power of 
deep neural networks to process complex data and provide more sophisticated recommendations.
Contrary to the shallow models, they consider additional features about the users and items. 
Moreover, they model the probability of the user interacting with the item. The image depicts
the architecture of the RecSys known as [Deep & Wide](https://arxiv.org/pdf/1606.07792){:target="_blank"}.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/wide_and_deep_rec_sys.png" class="lazyload" alt="The architecture of the Deep & Wide RecSys"/>
    <br/>
    <span class="caption text-muted">
        The architecture of the <a href="https://arxiv.org/pdf/1606.07792" target="_blank" rel="noopener nofollow">Deep & Wide RecSys</a>.
    </span>
</center>
<br/>

## Generative Recommendations
The most recent trend of making LLMs more powerful gave rise to generative recommendations.
Unlike their predecessors, generative RecSys possess the remarkable ability to move 
beyond simple pattern recognition and handle multiple recommendation tasks in the same
time.

Traditional recommendation systems rely on a multi-stage ranking process, handling vast 
numbers of items and users, each with learned embeddings. Generative RecSys, however, 
leverage LLMs to directly generate recommendations or related content, circumventing 
the need for computationally expensive ranking. This difference between the traditional
and generative pipelines is depcited below: 

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/traditional_vs_generative_recsys_pipeline.png" class="lazyload" alt="Traditional vs Generative RecSys Pipeline"/>
    <br/>
    <span class="caption text-muted">
        Traditional vs Generative RecSys Pipeline <a href="https://arxiv.org/pdf/2309.01157" target="_blank" rel="noopener nofollow">[4]</a>.
    </span>
</center>
<br/>


# How to Use LLMs for RecSys

The new paradigm to use LLMs for RecSys promises to streamline recommendation processes 
significantly. As shown in the diagram below LLMs can be integrated into the 
recommendation pipeline in various ways, including:
* **Scoring/Ranking**: Serving as the core model that predicts user preferences and ranks 
items accordingly.
* **Feature Extractor**: Extracting meaningful features from user data in order to enrich
user profiles.
* **Feature Encoder**: Encoding user interactions into a format suitable for recommendations.
* **User Behavior Modeling**: Understanding and predicting user behavior patterns to 
anticipate future needs and desires.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/where_and_how_to_use_llms_for_recsys.png" class="lazyload" alt="Diagram sketching where and how LLMs can be used in RecSys"/>
    <br/>
    <span class="caption text-muted">
        Where and how LLMs can be used in RecSys <a href="https://arxiv.org/pdf/2306.05817" target="_blank" rel="noopener nofollow">[5]</a>.
    </span>
</center>
<br/>

This blog post explores how LLMs can be employed as **scoring models**, a concept closely
aligned with the fundamental goal of recommender systems: ranking items and users.

## LLMs as Scoring Models

A key advantage of LLMs as scoring models is their versatility across multiple 
recommendation tasks. This eliminates the need for task-specific models.
Some common tasks include:

* **Rating Prediction**: Estimating a user's item rating.
* **Top-K Recommendation**: Selecting the top K items to recommend.
* **Sequential Recommendation**: Predicting the next item a user is likely to interact with.
* **Explanation Generation**: Providing users with transparent recommendation rationales.
* **Review Summarization**: Generating concise item reviews based on user profiles.

This blog post focuses primarily on *Rating Prediction* and *Top-K Recommendation*. 
The figure below demonstrates some of the recommendation tasks:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/recommendation_tasks.png" class="lazyload" alt="Sketch showing an example of the different recommendation tasks"/>
    <br/>
    <span class="caption text-muted">
       Example of the different recommendation tasks <a href="https://arxiv.org/pdf/2307.02046" target="_blank" rel="noopener nofollow">[3]</a>.
    </span>
</center>
<br/>

LLMs offer various deployment strategies for these tasks:

* **Pre-training**: Models are trained on massive datasets of text and code, learning 
general language understanding and reasoning skills.
* **Fine-tuning**: Pre-trained LLMs are fine-tuned on specific recommendation datasets to 
adapt their knowledge to the nuances of user-item interactions.
* **Prompting**: LLMs can be guided to perform specific recommendation tasks through
carefully crafted prompts, leveraging their existing knowledge without the need for
further training.

### Pre-Training RecSys LLMs

In pre-training, techniques like **Masked Behavior Prediction (MBP)** and 
**Next K Behavior Prediction (NBP)** are modeling the user behaviors effectively,
providing a robust foundation for fine-tuning tailored to specific recommendation tasks.
One line of research in this area is the work presented in [“PTUM: Pre-training user 
model from unlabeled user behaviors”](https://github.com/wuch15/PTUM){:target="_blank"}. 
The pre-training technique is summarized in the figure below:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/pretraining_llms_for_recsys.png" class="lazyload" alt="Diagram showing how to pretrain LLMs for RecSys"/>
    <br/>
    <span class="caption text-muted">
       How to pretrain LLMs for RecSys <a href="https://arxiv.org/pdf/2307.02046" target="_blank" rel="noopener nofollow">[3]</a>.
    </span>
</center>
<br/>

### Fine-Tuning RecSys LLMs

Once the LLM models are pre-trained (or not) for recommendation tasks, we can fine-tune
them on specific downstream tasks or leverage prompting techniques to utilize their 
broader capabilities.

The fine-tuning can be performed in two different ways: full fine-tuning or 
parameter-efficient fine-tuning (PEFT).  For instance the work presented in 
[“UniTRec: A Unified Text-to-Text Transformer and Joint Contrastive Learning Framework for Text-based Recommendation”](https://aclanthology.org/2023.acl-short.100.pdf){:target="_blank"} fully fine-tunes the BART model 
using a contrastive loss. 

On the other hand, the research done in [“TALLRec: An Effective and Efficient Tuning Framework to Align Large Language Model with Recommendation”](https://arxiv.org/pdf/2305.00447){:target="_blank"}  successfully 
employs the [LoRA](https://arxiv.org/pdf/2106.09685){:target="_blank"} adapter with the
[LLaMA-7B](https://arxiv.org/pdf/2302.13971){:target="_blank"} LLM.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/finetuning_llms_for_recsys.png" class="lazyload" alt="Diagram showing how to finetune LLMs for RecSys"/>
    <br/>
    <span class="caption text-muted">
       How to finetune LLMs for RecSys <a href="https://arxiv.org/pdf/2307.02046" target="_blank" rel="noopener nofollow">[3]</a>.
    </span>
</center>
<br/>

### Prompting RecSys LLMs 

The third technique is to use prompting techniques to adapt the LLMs as scoring functions.
The key idea of prompting is to keep LLMs frozen (i.e., no parameters updates), and 
adapt LLMs to downstream tasks via task-specific prompts. There are three representative
methods that use prompting techniques to adjust the LLMs as RecSys as summarized in the
figure below: 

* **In-Context Learning**: elicit the in-context ability of LLMs to adapt to downstream 
tasks from context.
* **Prompt Tuning**: add new prompt tokens to LLMs and optimizes the prompt based on the 
task-specific dataset.
* **Instruction Tuning**: LLMs to follow prompts as task instructions, rather than to solve 
specific downstream tasks.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/prompt_tuning_llms_for_recsys.png" class="lazyload" alt="Diagram showing the LLM prompt-tuning techniques for RecSys"/>
    <br/>
    <span class="caption text-muted">
       LLM prompt-tuning techniques for RecSys <a href="https://arxiv.org/pdf/2307.02046" target="_blank" rel="noopener nofollow">[3]</a>.
    </span>
</center>
<br/>

### A Diverse Landscape: LLMs as Recommendation Engines

The versatility of LLMs has led to a surge of research exploring their use as scoring
functions in recommendation systems. The following taxonomy, visualized in the bubble 
chart below, captures the diverse landscape of these approaches:


<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/taxonomy_of_llms_as_recsys.png" class="lazyload" alt="Taxonomy of LLMs used as scoring functions"/>
    <br/>
    <span class="caption text-muted">
        Taxonomy of LLMs used as scoring functions <a href="https://arxiv.org/pdf/2306.05817" target="_blank" rel="noopener nofollow">[5]</a>.
    </span>
</center>
<br/>

The extra dimension is whether we will use *conventional recommendation models* (CRM) during 
the inference phase. Our focus here is on pure generative inference models, i.e. the 
ones that do not use any CRM to make any inference. Two noteworthy examples include:

* **P5**: A versatile, instruction-based pre-training model demonstrating impressive 
performance across various recommendation tasks.
* **ChatGPT**: Researchers have explored the use of ChatGPT in a zero-shot configuration, 
showcasing the flexibility and potential of LLMs in recommendation scenarios.


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


# Multi-Task Instruction Pretraining: The P5 Model

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/p5_multitask_recommendation.png" class="lazyload" alt="Diagram of the P5 model showing how it can perform multi-task recommendation"/>
    <br/>
    <span class="caption text-muted">
        The P5 model performing multi-task recommendation <a href="https://arxiv.org/pdf/2203.13366" target="_blank" rel="noopener nofollow">[1]</a>.
    </span>
</center>
<br/>

The [P5 model](https://arxiv.org/pdf/2203.13366){:target="_blank"} epitomizes the 
potential of LLMs in RecSys through multi-task instruction pretraining using the
[T5 LLM](https://github.com/google-research/text-to-text-transfer-transformer){:target="_blank"}
as a backbone. This approach allows the model to handle multiple recommendation tasks such as:
* Rating Prediction 
* Direct Recommendation 
* Sequential Recommendation 
* Explanation Generation and 
* Review Summarization 

The model is based on instruction prompt tuning like the [FLAN](https://research.google/blog/introducing-flan-more-generalizable-language-models-with-instruction-fine-tuning/){:target="_blank"} model. 
It defines a set of personalized prompts, for different users and items. Let’s dive in 
and see the details about the P5 model.

## Model Architecture
The P5 model employs an encoder-decoder [Transformer](https://arxiv.org/pdf/1706.03762){:target="_blank"}
architecture with the [SentencePiece](https://github.com/google/sentencepiece){:target="_blank"} tokenizer
optimizing [negative log-likelihood](https://en.wikipedia.org/wiki/Likelihood_function#Log-likelihood){:target="_blank"}.  

It uses standard token and *position embeddings* with additional *whole-word embeddings* 
to manage sub-word tokens efficiently. For example, the *SentencePiece* tokenizer would 
split the word *user_7391* into four tokens *(item, _, 73, 91)*, but then with the 
*whole-word embeddings* we can take the entire word.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/p5_architecture.png" class="lazyload" alt="Diagram showing the architecture of the P5 model"/>
    <br/>
    <span class="caption text-muted">
        The P5 model architecture <a href="https://arxiv.org/pdf/2203.13366" target="_blank" rel="noopener nofollow">[1]</a>.
    </span>
</center>
<br/>

## Data 
The model is trained on the following [Amazon review](https://nijianmo.github.io/amazon/){:target="_blank"} datasets: 
* Sports & Outdoors
* Beauty 
* Games & Toys 

However, these datasets are not in the desired format the model needs. As the P5 model 
is based on instruction prompt tuning, we must transform the raw data into instructions 
i.e. *input-target pairs*. For this reason, the model defines a set of instruction prompts 
for each of the tasks. For instance, here are some of the prompts used in the rating 
prediction tasks:

**Prompt ID: 1-1**:
```
Input template: Which star rating will user_{user_id} give
item_{item_id}? (1 being lowest and 5 being highest)

Target template: {star_rating}
```
**Prompt ID: 1-2**:
```
Input template: Does user_{user_id} like or dislike
item_{item_id}?

Target template:
{answer_choices[label]} (like/dislike) – like (4,5) / dislike
(1,2,3)
```

Using multiple prompt templates for a single task increases language style variation and
enables zero-shot evaluation.

These templates are used to format raw data into *input-target pairs* for model training.
The last prompt in each task is reserved specifically for testing the model's zero-shot 
capabilities. The figure below illustrates this input-target pair generation process for
the *rating prediction* task:

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/generating_input_target_pairs.png" class="lazyload" alt="Diagram showing the process of generating input-target pairs"/>
    <br/>
    <span class="caption text-muted">
        The process of generating input-target pairs.
    </span>
</center>
<br/>

## Training

Having all the input-target pairs generated, the P5 model is trained with the instruction
tuning method optimizing the *negative log-likelihood*.  

As mentioned, the P5 model utilizes the pretrained [T5 checkpoints](https://huggingface.co/google-t5/t5-base){:target="_blank"}
as backbone. Depending on the size of the base T5 model there are two P5 models: 
* **P5-small (P5-S)**: 512 dimensions with 8-headed attention layers. It has 60M parameters in total. 
* **P5-base (P5-B)**: 768 dimensions with 12-headed attention layers. It has 223M parameters in total. 

Both models have a maximum length of 512 tokens. They are trained for 10 epochs using 
the [AdamW](https://arxiv.org/pdf/1711.05101){:target="_blank"} optimizer with 1 × 10−3 as the peak 
learning rate where the warmup stage is set to 5% of all iterations.

## Evaluation 

To gauge performance, various metrics are used for each of the recommendation tasks: 
* Rating Prediction: Root Mean Squared Error (RMSE) and Mean Absolute Error (MAE). 
* Sequential & Direct Recommendation: Normalized Discounted Cumulative Gain (nDCG@k) 
and Hit Ratio (HR@k). 
* Explanation & Review Summarization: BLEU-4, ROUGE-1, ROUGE-2, and ROUGE-L. 

Let’s look at the performance in the *Rating Prediction* and *Direct Recommendation* tasks.

For the *Rating Prediction* task, the baselines to compare against are the [Matrix 
Factorization](https://dl.acm.org/doi/10.1109/MC.2009.263){:target="_blank"} (MF) and 
[Wide and Deep](https://arxiv.org/pdf/1606.07792){:target="_blank"} (MLP) model under 
mean square root loss. For the *Direct Recommendation* task, the baselines 
are [Bayesian Personalized Ranking](https://arxiv.org/pdf/1205.2618){:target="_blank"} (BPR) with 
Matrix Factorization (BPR-MF), BPR with Neural Net (BPR-MLP), and 
[SimpleX](https://arxiv.org/pdf/2109.12613){:target="_blank"}. Let’s see the reported 
results and draw some conclusions.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/p5_performance_rating_prediction.png" class="lazyload" alt="Table for the P5 performance on the rating prediction task"/>
    <br/>
    <span class="caption text-muted">
        P5 performance on the rating prediction task <a href="https://arxiv.org/pdf/2203.13366" target="_blank" rel="noopener nofollow">[1]</a>.
    </span>
</center>
<br/>

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/p5_performance_direct_recommendation.png" class="lazyload" alt="Table for the P5 performance on the direct recommendation task"/>
    <br/>
    <span class="caption text-muted">
        P5 performance on the direct recommendation task <a href="https://arxiv.org/pdf/2203.13366" target="_blank" rel="noopener nofollow">[1]</a>.
    </span>
</center>
<br/>

For both tasks, the model's evaluation uses seen and unseen data. Purple entries 
represent evaluation on seen data, where the test data includes entries from prompts 
used in training data generation. Orange entries indicate evaluation on unseen data, 
using test data generated from prompts never used for training.

Results show *P5* outperforms *BPR-MF* and *BPR-MLP* **significantly**. While *P5* demonstrates 
strong performance on top-1 metrics compared to *SimpleX*, it suggests that utilizing
multi-task LLMs like *P5* in recommendation systems is **feasible** and can surpass traditional 
models.

# ChatGPT as RecSys 

In a parallel work inspired by the P5 model, a group of authors used [ChatGPT](https://en.wikipedia.org/wiki/ChatGPT){:target="_blank"} 
as a general purpose RecSys in a few-shot or zero-shot setting.  

This approach explores whether extensive linguistic and world knowledge can be 
effectively transferred to recommendations. In a zero-shot scenario, the model receives 
no additional user data or interaction history. Conversely, the few-shot scenario 
enriches prompts with user interaction and potential interests, helping ChatGPT better 
understand user needs. This is illustrated in the image below.


<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/chatgpt_as_recsys_zero_vs_few_shot.png" class="lazyload" alt="Promts to use ChatGPT as RecSys in a zero and few-shot scenario"/>
    <br/>
    <span class="caption text-muted">
        Promts to use ChatGPT as RecSys in a zero and few-shot scenario <a href="https://arxiv.org/pdf/2304.10149" target="_blank" rel="noopener nofollow">[2]</a>.
    </span>
</center>
<br/>

## Model Architecture 

The model architecture is very simple, and it is illustrated in the figure below. 
ChatGPT plays the central role of a recommender. There is an additional module called 
*Output Refinement Module*, which ensures that all the outputs follow the same structure. 

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/chatgpt_as_recsys.png" class="lazyload" alt="ChatGPT as RecSys Scoring Function"/>
    <br/>
    <span class="caption text-muted">
        ChatGPT as RecSys Scoring Function <a href="https://arxiv.org/pdf/2304.10149" target="_blank" rel="noopener nofollow">[2]</a>.
    </span>
</center>
<br/>

## Experimental Setup and Evaluation 

The experimental setup mirrors that of P5 (detailed above). Notably, human evaluation is
introduced for *Explanation Generation* and *Review Summarization* tasks.


<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/chatgpt_performance_rating_prediction.png" class="lazyload" alt="Table for the ChatGPT performance on the rating prediction task"/>
    <br/>
    <span class="caption text-muted">
        ChatGPT performance on the Rating Prediction task <a href="https://arxiv.org/pdf/2304.10149" target="_blank" rel="noopener nofollow">[2]</a>.
    </span>
</center>
<br/>


<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/chatgpt_performance_direct_recommendation.png" class="lazyload" alt="Table for the ChatGPT performance on the direct recommendation task"/>
    <br/>
    <span class="caption text-muted">
        ChatGPT performance on the Direct Recommendation task <a href="https://arxiv.org/pdf/2304.10149" target="_blank" rel="noopener nofollow">[2]</a>.
    </span>
</center>
<br/>


ChatGPT's performance on *Rating Prediction* and *Direct Recommendation* tasks falls short 
of baseline models. This suggests that using ChatGPT in this manner for these specific 
tasks may not be optimal.

However, it’s interesting to note the subjective evaluation of ChatGPT on the 
*Explanation Generation* and *Review Summarization* tasks.

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/chatgpt_explanation_generation_subjective_eval.png" class="lazyload" alt="Table for the ChatGPT subjective evaluation on the Explanation Generation task"/>
    <br/>
    <span class="caption text-muted">
        ChatGPT subjective evaluation on the Explanation Generation task <a href="https://arxiv.org/pdf/2304.10149" target="_blank" rel="noopener nofollow">[2]</a>.
    </span>
</center>
<br/>

<center>
    <img data-src="{{ site.url }}{{ site.baseurl }}/assets/images/llms_for_recsys/chatgpt_review_summarization_subjective_eval.png" class="lazyload" alt="Table for the ChatGPT subjective evaluation on the Review Summarization task"/>
    <br/>
    <span class="caption text-muted">
        ChatGPT subjective evaluation on the Review Summarization task <a href="https://arxiv.org/pdf/2304.10149" target="_blank" rel="noopener nofollow">[2]</a>.
    </span>
</center>
<br/>

Although *ChatGPT* underperforms baseline models on *Rating Prediction* and *Direct Recommendation*,
its outputs are judged clearer and more reasonable compared to P5 and ground-truth data. 
This suggests that leveraging more powerful LLMs could lead to better user adoption of 
recommendation system outputs.

# Conclusion

In this blog post, we took a brisk trot tour through the RecSys landscape. We began with 
shallow models and deep learning-based approaches, then shifted to the emerging 
paradigm of generative recommendations using LLMs. Once again, we briefly covered various 
techniques to adapt LLMs for recommendations, highlighting two notable models: 
**P5** and **ChatGPT**.

Evaluating P5 against traditional RecSys models reveals that P5 can outperform them, 
all while offering multi-tasking capabilities. 

On the other hand, using LLMs like ChatGPT in a zero-shot setting is still not 
well-suited for direct recommendations. However, their recommendation summarization and 
explanation capabilities are far more preferred by human subjects compared to other 
competitors.

Thus we can conclude that integrating LLMs into recommendation systems marks a significant 
advancement, ushering in an era of generative recommendations that promise enhanced 
efficiency and sophistication. As these models are further explored and refined, the 
potential for personalized, context-aware recommendations will expand, transforming user 
experiences across the digital realm.


For more information, please follow me on 
<a href="https://www.linkedin.com/in/vilievski/" target="_blank" rel="noopener"><b>LinkedIn</b></a>.
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


# Acknowledgements

I would like to thank my colleagues at Frontiers, [Tommaso Caneva](https://www.linkedin.com/in/tommaso-caneva-68a92940/){:target="_blank"}
and [Sofya Lipnitskaya](https://www.linkedin.com/in/sofyalipnitskaya/){:target="_blank"}  
for reviewing the content of this blog post.


# References
1. [Recommendation as Language Processing (RLP): A Unified Pretrain, Personalized Prompt & Predict Paradigm (P5)](https://arxiv.org/pdf/2203.13366){:target="_blank"}  
2. [Is ChatGPT a Good Recommender? A Preliminary Study](https://arxiv.org/pdf/2304.10149){:target="_blank"}
3. [Recommender Systems in the Era of Large Language Models (LLMs)](https://arxiv.org/pdf/2307.02046){:target="_blank"} 
4. [Large Language Models for Generative Recommendation: A Survey and Visionary Discussions](https://arxiv.org/pdf/2309.01157){:target="_blank"} 
5. [How Can Recommender Systems Benefit from Large Language Models: A Survey](https://arxiv.org/pdf/2306.05817){:target="_blank"}
6. [Harnessing the Power of LLMs in Practice: A Survey on ChatGPT and Beyond](https://arxiv.org/pdf/2304.13712){:target="_blank"}