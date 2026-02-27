---
title: "Why Not Just Train All the Models Ourselves?"
date: 2026-02-26
author: Philip Phuong Tran
excerpt: An investor asked why we need a network of builders when we could monopolize health AI models. The answer reveals why the health economy must be a network — and why subject invariance makes the network more valuable, not less.
tags: [builder economy, health models, GLE, ParagonDAO, strategy]
---

# Why Not Just Train All the Models Ourselves?

An investor challenge we hear often goes like this:

> "You built the encoder. You trained 5 models. Why not hire 50 ML engineers, train every model yourselves, and own the monopoly? Why do you need thousands of builders and a whole governance network?"

It is a fair question. And the honest answer reveals why the health economy must be built as a network — not a product company.

## The Combinatorial Explosion

The International Classification of Diseases lists over 55,000 codes. But the number of diseases is not the number that matters.

Take one disease: diabetes. How many models does diabetes need?

- Detect from **saliva Raman spectroscopy**
- Detect from **breathing patterns**
- Detect from **voice biomarkers**
- Detect from **continuous heart rate** via smartwatch
- Detect from **piezoelectric textile** biosignals
- Screen in **pregnant women** (different physiological baselines)
- Screen in **elderly populations** (different comorbidity profiles)
- Screen in **Southeast Asian populations** (different metabolic baselines)
- Distinguish **onset** vs **severity** vs **medication response**
- Run on **phone microphone** vs **clinical sensor** vs **$5 biosensor**

That is over 20 specialized models for one disease. Multiply across thousands of conditions, dozens of signal types, hundreds of population segments, and multiple hardware platforms — and you are looking at hundreds of thousands of models. Not hundreds.

No single company can train them all. Not because of compute. Because of data and domain expertise.

## The Data Lives in Their Labs

Our 5 published models were trained on public datasets. A researcher in Thailand has breathing data from Thai diabetic patients collected over 3 years. A hospital in Lagos has voice samples from thousands of malaria patients. A biosensor lab at Weber State has electrochemical readings from cancer drug responses at attomolar concentrations. A veteran's hospital in Salt Lake City has PTSD EEG recordings.

That data lives inside their IRBs, their labs, their institutions. It cannot be centralized. It should not be centralized. The researcher who collected it understands the clinical context — what to label, what edge cases matter, what a false positive costs in their domain.

We built the encoder. The encoder turns any health signal into 128 numbers. But knowing what those numbers mean for a specific disease, in a specific population, from a specific sensor — that is domain expertise we will never have across every field.

## Subject Invariance Makes the Network More Valuable, Not Less

Here is where the question gets sharper. Our General Learning Encoder is subject-invariant. Once a model is trained, it works on new users without calibration. No retraining. No population-specific adjustment.

An investor might hear that and think: "So you only need to train each model once. That is even more reason to do it yourself."

But subject invariance solves the **deployment** problem — the model works on everyone. It does not solve the **training** problem — you still need domain-specific labeled data to build the model in the first place.

What subject invariance actually does is make each builder's contribution radically more valuable. A researcher in Bangkok trains a diabetes-from-breathing model on 300 labeled samples from her clinic. Because of subject invariance, that model immediately works on every patient on Earth — not just her local population. One builder, one model, global impact.

Without subject invariance, you would need separate models for each population. With it, each model a builder creates serves the entire network from day one. That is what makes the revenue math work: 10% of 100,000 globally-useful models beats 100% of 100 models we trained ourselves.

## The Revenue Math

If we train 100 models ourselves:

**Revenue = 100 models x usage**

If 10,000 builders train 100,000 models, each working globally because of subject invariance:

**Revenue = 10% of 100,000 models x global usage**

The second number is orders of magnitude larger. And it scales without us hiring a single additional person.

This is the insight that Bluetooth SIG, the FIDO Alliance, and the App Store all understood: you do not build all the apps. You build the platform and take the network fee. The organizations that governed the open standard became the center of gravity for the entire ecosystem.

## What We Actually Monopolize

We do monopolize — at the right layer.

The GLE encoder is patented. The DCT-II biosignal architecture, the 128-coefficient output, the subject-invariant property — that is our intellectual property. Without it, each researcher would need massive datasets, complex signal processing pipelines, and months of engineering. With GLE, a researcher with 300 labeled samples can train a working health classifier in an afternoon.

We monopolize the hardest part: the math. We open the easiest part: training a classifier on 128 numbers. Any ML framework can do that. Even logistic regression works.

BAGLE is the lab equipment every researcher needs. ParagonDAO is the peer review board that ensures every model is validated before patients depend on it. The tool without governance is dangerous — unvalidated health models loose in the world. The governance without the tool is just a committee with nothing to govern.

## The Foundation of the Next Economy

In [The Wealth of Bodies](https://paragondao.org/essays/the-wealth-of-bodies), we argued that the largest economy in human history will be built on the preservation and optimization of human health. Not as an industry. As the economy itself.

A network of health models — each trained by a domain expert, each validated by peer review, each working globally because of subject invariance, each generating revenue for its builder — is the foundation of that economy. Not hundreds of models. Hundreds of thousands. Built by thousands of founders who bring the biology. Using an encoder that brings the math.

That is why it must be a network. That is why ParagonDAO exists. That is why model #7 is yours to build.

---

*Philip Phuong Tran is the founder of Univault, the research lab behind BAGLE and ParagonDAO. The BAGLE API opens April 2026. Visit [bagle.com](https://bagle.com) to see the first 6 published models.*
