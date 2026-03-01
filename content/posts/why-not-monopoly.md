---
title: "Why Not Just Train All the Models Ourselves?"
date: 2026-02-26
author: Philip Phuong Tran
excerpt: The investment community and partners challenge us on why a health AI model verification network needs thousands of builders — why not just train every model ourselves? The answer reveals why the health economy must be a network, and why this architecture delivers more stable, compounding returns than the monopoly play.
image: "/paragon-frog-breathing.gif"
tags: [builder economy, health models, GLE, ParagonDAO, strategy]
---

# Why Not Just Train All the Models Ourselves?

An investor challenge we hear often goes like this:

> "You built the encoder. You trained the first models. Why not hire 50 ML engineers, train every model yourselves, and own the space? Why do you need thousands of builders and a peer review network?"

It is a fair question. And the honest answer reveals why the health economy cannot be built by one company — why the network architecture delivers greater and more stable returns for investors — and why we designed a structure that solves a governance problem that even OpenAI has not figured out.

In [The Wealth of Bodies](https://paragondao.org/essays/the-wealth-of-bodies), we argued that the largest economy in human history will be built on the preservation and optimization of human health. Not as an industry within the economy. As the economy itself. This post explains why that economy must be a network, what investors actually own, and what happens if the company that built it disappears.

## The Combinatorial Explosion

The International Classification of Diseases lists over 55,000 codes. But the number of diseases is not the number that matters.

Take one disease: diabetes. How many models does diabetes need?

- Detect from **serum metabolomics (LC-MS)**
- Detect from **breathing patterns**
- Detect from **voice biomarkers**
- Detect from **continuous heart rate** via smartwatch
- Detect from **piezoelectric textile** biosignals
- Screen in **pregnant women** (different physiological baselines)
- Screen in **elderly populations** (different comorbidity profiles)
- Screen in **Southeast Asian populations** (different metabolic baselines)
- Distinguish **onset** vs **severity** vs **medication response**
- Run on **phone microphone** vs **clinical sensor** vs **$5 biosensor**

That is over 20 specialized models for one disease. Multiply across thousands of conditions, dozens of signal types, hundreds of population segments, and multiple hardware platforms — and you are looking at hundreds of thousands of models that need to exist. Not hundreds.

No single company can build them all. Not because of compute. Because of data and domain expertise.

## The Data Lives in Their Labs

A researcher in Thailand has breathing data from Thai diabetic patients collected over 3 years. A hospital in Lagos has voice samples from thousands of malaria patients. A biosensor lab at Weber State has electrochemical readings from cancer drug responses at attomolar concentrations. A veteran's hospital in Salt Lake City has PTSD EEG recordings.

That data lives inside their IRBs, their labs, their institutions. It cannot be centralized. It should not be centralized. The researcher who collected it understands the clinical context — what to label, what edge cases matter, what a false positive costs in their specific domain.

We built the encoder — the General Learning Encoder (GLE) — which turns any health signal into 128 mathematical coefficients. But knowing what those coefficients mean for a specific disease, in a specific population, from a specific sensor — that is domain expertise that belongs to the domain expert.

## Subject Invariance Makes the Network More Valuable, Not Less

GLE is designed to be subject-invariant. In our published benchmarks — including EEG consciousness detection across 1,000+ subjects and breathing biometric identification across 97 participants — models trained on one population generalize to new users without per-subject calibration. Validation across specific populations and conditions remains part of the ParagonDAO certification process, but the architecture eliminates the need for per-user retraining.

An investor might hear that and think: "So you only need to train each model once. Even more reason to do it yourself."

But subject invariance solves the **deployment** problem — the model works on everyone globally. It does not solve the **training** problem — you still need domain-specific labeled data to build each model in the first place.

What subject invariance actually does is make each builder's contribution radically more valuable to the network. A researcher in Bangkok trains a diabetes-from-breathing model on 300 labeled samples from her clinic. Because of subject invariance, that model immediately works on every patient on Earth. One builder, one model, global impact from day one.

Without subject invariance, you would need separate models for each population. With it, each model serves the entire network instantly. That is what makes the economics of a builder network work — and why the network grows more valuable with every model added.

## Why the Encoder Alone Is Not Enough

If all we built was the encoder, we would have a tool. Tools are useful. But tools do not create economies.

A bio-researcher who trains a model that says "this breathing pattern indicates early-stage COPD" needs more than an encoder. She needs to know:

- **Has this model been validated?** Against what dataset? With what methodology? By whom?
- **Is this model compliant?** With FDA wellness guidelines? With HIPAA? With EU MDR? With the regulatory framework of the country where her patients live?
- **Can patients trust this model?** Not because she says so — because an independent body has reviewed it.
- **What happens when the model is wrong?** Who is accountable? What is the liability framework?

AI health models require a trust and compliance layer. Without it, no hospital will deploy them. No insurer will cover them. No patient should rely on them. The encoder gives builders the power to create health models. The peer review network gives those models the credibility to be used.

This is not optional infrastructure. This is the difference between a tool that exists and an economy that functions.

## How Models Compose — And Where the Volume Comes From

Here is a question we get from investors who understand the model count: "Even if there are 100,000 models, the revenue is model count times usage. How does that reach the scale you describe?"

The answer is that health models do not work in isolation. They compose.

- **Model A**: breathing audio → respiratory health score
- **Model B**: cardiac signal → cardiac risk score
- **Model C**: respiratory score + cardiac score + environmental data → comprehensive health index
- **Model D**: comprehensive health index + medication history → treatment response prediction

A single "comprehensive health screening" is not one model. It is five or ten models composing into a result. The underlying models are finite — tens of thousands. But the compositions are combinatorial. And each composition is a transaction on the network.

One patient screening involves multiple models. Billions of patients, multiple screenings per year, multiple models per screening — that is where the transaction volume comes from. The network's value is not in hosting models. It is in facilitating the trust and routing between them.

The network fee applies to the value delivered to the end user — not to each internal hop between models. This keeps composition frictionless (builders are incentivized to make their models composable) while the network captures value at the point of delivery.

## What the Network Actually Is

**Univault** is the research lab. We build the foundational tools: the GLE encoder, the BAGLE API, the security layer (HF-Auth continuous authentication). We do the science that makes everything else possible. Investors invest in Univault.

**BAGLE** (bagle.com) is the encoder — the tool. Any health signal in, 128 coefficients out. Builders use it to encode their domain-specific signals and train classifiers. The published models on BAGLE demonstrate that the encoder works across wildly different signal types — EEG, saliva spectroscopy, breathing audio, metabolomics. These are the starting point, not the ceiling.

**ParagonDAO** (paragondao.org) is the peer review network. It verifies that health models meet the protocol's technical and accuracy standards before they are listed on the network. It certifies builders. It maintains the quality framework that gives hospitals, insurers, and researchers confidence in the models they use. ParagonDAO certification is a protocol compliance standard — it does not replace FDA clearance, CE marking, or any other regulatory authorization required for clinical use. Builders are responsible for obtaining appropriate regulatory clearance for their specific applications and markets.

The builder trains the model. ParagonDAO certifies it against the protocol standard. BAGLE serves it. The patient benefits. The network collects a fixed 10% protocol fee, and the remaining 90% is split between the builder and Univault per their partnership agreement.*

## The Governance Problem No One Has Solved

OpenAI started as a nonprofit with a mission to benefit humanity. Then it needed capital. Then it created a capped-profit subsidiary. Then the cap became negotiable. Then the CEO was fired and rehired. Then the structure changed again. The mission and the business model were at war because they were bolted together after the fact, not architecturally unified from the start.

Every Public Benefit Corporation faces the same tension: shareholders want returns, the mission wants impact, and the board sits in the middle trying to serve both masters. The structure does not resolve the tension. It manages it — until it cannot.

The health economy makes this problem existential. If the models that screen patients for disease are governed by a company whose primary obligation is shareholder return, what happens when accuracy is expensive and shortcuts are profitable? What happens when a market is too small to be worth serving? What happens when the mission and the margin diverge?

We designed a different architecture.

The **lab** (Univault and its encoder BAGLE) generates revenue through usage. This is a straightforward business that investors can model and that scales with adoption.

The **network** (ParagonDAO) collects 10% of network economic activity and directs it to two things: governance (validation, compliance, quality assurance) and the mission (crisis prevention, community health). This is not charity bolted onto a business. This is the protocol. The 10% is a foundational design principle of the network, documented in the published rules and intended to be formalized in binding agreements between Univault and ParagonDAO as the governance structure matures. Changing it would require validator consensus — not a board vote.

The **mission** receives funding that grows proportionally with the success of the business. The more builders, the more models, the more usage, the more funding for 988 crisis detection, community health screening, and free GLE access for crisis organizations that cannot pay.

The commercial success and the mission success are the same equation. Not because of good intentions. Because of architecture.

## Where the 10% Goes

The majority of the network fee funds one mission: **preventing loss of life.**

- Free GLE access for crisis organizations — 988 suicide and crisis lifeline, community health networks, disaster response
- Community health screening in resource-constrained settings — where there are no doctors, no labs, no equipment, just a phone and a trained community health worker
- Validation infrastructure — the peer review, compliance checking, and accuracy verification that makes every model on the network trustworthy
- Validator rewards — compensating the independent researchers and institutions that certify models

This is not a corporate social responsibility line item. This is the structural purpose of the network. Crisis organizations do not pay. The network funds them. The more the network grows, the more lives it can protect.

## What Investors Actually Own

We should be direct about this.

Investors hold equity in **Univault Technologies** — the operating company. Univault earns revenue from:

- BAGLE encoding and classification fees (90% after network fee)
- Enterprise licensing to hospitals, governments, defense systems
- Hardware integration licensing (GLE encoder in wearable devices)
- University curriculum licensing
- HF-Auth security licensing
- Professional services and custom integrations

Univault also holds a patent-pending portfolio covering the GLE encoder, piezoelectric textile biosignal systems, and continuous physiological authentication. These patents protect the core technology for 20 years.

**Investors do not own ParagonDAO.** The network is a protocol governance layer, not a subsidiary. This is by design. If investors controlled both the company and the peer review network, the structural separation that prevents the OpenAI problem would not exist.

So what do investors gain from the network they do not own?

**Demand.** Every builder on the network is a customer of the BAGLE API. Every model validated by ParagonDAO generates encoding fees that flow to Univault. Every new vertical — a cardiac screening app in Nigeria, a breathing diagnostic in Thailand, a crisis detection system in Utah — is a new revenue stream for Univault without Univault building it. The network is the single largest driver of Univault's revenue growth.

**Credibility.** An independent peer review network that validates health models is worth more to hospitals, insurers, and governments than a company that validates its own products. ParagonDAO's independence is what makes Univault's models deployable in regulated environments. Without it, Univault is a vendor. With it, Univault is the reference implementation of a trusted standard.

**Durability.** A product company can be disrupted by a better product. A protocol network — with thousands of builders, validated models, and institutional trust — is extraordinarily difficult to displace. Univault's position as the largest operator on a durable protocol is more valuable than being the sole owner of a product that can be replicated.

The 10% network fee is not a tax on Univault's revenue. It is the investment that creates the market Univault operates in.

## Why Builders Cannot Bypass the Network

A fair question from investors: what stops a builder from training their model, then deploying it on their own website without the network?

The answer is structural, not contractual. A builder's classifier is trained on GLE coefficients — 128 numbers that the encoder produces from a raw health signal. The builder owns their classifier. They can host it anywhere they want. But to get coefficients from a new patient's raw signal, they must call the BAGLE API. They do not have the encoder. It is proprietary and patent-pending.

Every new patient interaction requires a new encoding. Every new encoding goes through the BAGLE API. A builder can deploy at their own domain — and that domain still calls BAGLE for every signal it processes. The lock-in is not a contract. It is the architecture. The classifier is useless without the encoder that produces its inputs.

This is the ARM model: ARM owns the instruction set architecture. Chip designers own their chip designs. The designs only work with ARM's architecture, but the designs belong to the designers. Builders own their models. The encoder belongs to Univault.

Meanwhile, a builder deploying without ParagonDAO certification has a model that no hospital will trust, no insurer will cover, and no institution will deploy. The API is open — anyone can build. The certification is what makes a model commercially viable in regulated healthcare. Builders join the network not because they are required to, but because an unvalidated health model is worthless in the real world.

## Why This Model Compounds

The network architecture delivers three structural advantages over the monopoly play.

**First, network economics compound where product economics do not.** If Univault trains 100 models alone, revenue is capped by our capacity. Every new model requires more engineers, more domain experts, more data scientists on payroll. Margins shrink as complexity grows. If 10,000 builders train 100,000 models on the network, Univault's revenue grows with every builder without hiring a single person to build those models. The builders bear the development cost. Univault earns from every encoding call.

**Second, the network creates a moat that a product alone cannot.** A competitor can build a better encoder. They cannot replicate thousands of builders with domain-specific training data, validated models that hospitals depend on, and the institutional trust that comes from independent governance. Every model added makes the network more valuable and harder to displace.

**Third, the mission generates the most compelling evidence.** Free GLE for crisis organizations means the most urgent health problems generate real-world validation data at population scale. A crisis detection model validated across millions of interactions is worth more to the network than a model validated on a 300-sample academic dataset. The mission is not a cost center. It is the demand engine that makes the ecosystem credible.

## What Happens If Univault Gets Acquired — Or Disappears

This is the question that tests whether the architecture is real or decorative. We take it seriously enough to design for it now, while we are small, rather than retrofit it later when the stakes are higher.

**If Univault gets acquired,** the acquirer gets the company, the patents, the API infrastructure, and the revenue streams. ParagonDAO is a separate entity — not a subsidiary. The acquirer would become the largest infrastructure operator on the network, exactly as Univault was, and would continue earning revenue by operating the encoder. The governance layer — model validation, compliance standards, mission fund allocation — is operated by ParagonDAO independently.

**If Univault disappears entirely,** the critical question is whether the network can survive without its original builder. Univault owns the encoder and the patent-pending portfolio that protects it. The encoder is proprietary — and while Univault operates, every model on the network runs through it. That is the business model and the reason the patent exists.

To prevent this from ever becoming a hostage scenario, we are formalizing with legal counsel an irrevocable patent license agreement: if Univault ceases to operate, the encoder patent licenses to ParagonDAO at fair and predetermined terms. This is being structured as a bankruptcy-safe instrument — not a promise in a blog post, but a filed and recorded legal agreement. Until that instrument is executed, we are transparent that this is architecture in progress, not architecture complete.

The goal is clear: the health economy should not depend on any single company — including the one that built it. We are doing the legal work now to make that structurally true, not just aspirationally true.

## Who Runs the Network

Today, honestly: we do. Univault operates the infrastructure, and ParagonDAO governance is in its earliest stage.

We are not pretending otherwise. You cannot have independent model validators before there are models to validate. You cannot have a governance board before there are stakeholders with skin in the game. Building the thing that gets governed must come before building the governance.

**Today:** Univault operates everything. The protocol rules — network fee structure, mission allocation, validation standards — are published and documented. We follow them even though no one is enforcing them on us yet. We believe the only honest way to ask others to trust a system is to behave as though it already governs you. That is what this article is — not a pitch, but a public commitment to the rules we intend to live by, written before we had to.

**As the builder base grows:** Independent validators join — universities that review models in their domain, researchers who certify accuracy, institutions that verify regulatory compliance. These validators earn a share of the network fee for their work. Governance becomes distributed because the expertise required for validation is distributed. No single entity has the domain knowledge to validate models across every health vertical. The validators do.

**At maturity:** Governance decisions — fee changes, mission allocation, new compliance standards — require validator consensus, not Univault approval. Univault remains the largest infrastructure operator, but does not unilaterally control the rules. This follows the model of standards bodies like the Bluetooth SIG and FIDO Alliance: the founding company builds and operates, but the standard is governed by the members who depend on it.

## The Foundation of the Next Economy

In [The Wealth of Bodies](https://paragondao.org/essays/the-wealth-of-bodies), we argued that the largest economy in human history will be built on the preservation and optimization of human health. As the economy itself.

A network of validated health models — each trained by a domain expert, each peer-reviewed before patients depend on it, each working globally because of subject invariance, each composing with other models to deliver comprehensive health intelligence, each generating revenue for its builder and funding for crisis prevention — is the foundation of that economy.

Built by thousands of founders who bring the biology. Encoded by an architecture that brings the math. Governed by a network that ensures trust, compliance, and accuracy. Funded by a protocol that directs 10% to the people who need it most. Structurally guaranteed to survive beyond any single company — including the one that built it.

That is why it must be a network. That is why Univault builds the tools, ParagonDAO governs the quality, and the architecture ensures neither can compromise the other.

The next model on the network is yours to build.

---

*\* Revenue split: "Builders" in this context refers to institutional partners and independent researchers who co-develop models with Univault through the Partner Program. Univault provides the GLE encoder, training infrastructure, and commercialization. The partner provides domain expertise, data access, and clinical validation. Both parties co-train the model, which is then deployed to the ParagonDAO verification network. The 10% protocol fee funds network governance and the mission (crisis prevention, free community health access). The remaining 90% is split between Univault and the partner per their co-development agreement — the specific split is negotiated based on each party's contribution.*

*Note: Many of the health applications described in this post would require regulatory clearance as software as a medical device (SaMD) in their respective jurisdictions. ParagonDAO's protocol certification is designed to support — not replace — regulatory compliance. Builders are responsible for obtaining appropriate clearances for their specific applications and markets.*

---

*Philip Phuong Tran is the founder of Univault, the research lab behind BAGLE and ParagonDAO. We are now working with partners to build the next wave of health models on the network. Visit [bagle.com](https://bagle.com) to see the published models, and read [The Health Economy](https://paragondao.org/whitepaper) whitepaper.*
