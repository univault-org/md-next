---
title: "About Univault Technologies"
subtitle: "Biosignal AI for Population Health"
description: "Univault Technologies builds subject-invariant biosignal AI designed for community health workers in resource-constrained settings. Patent pending. NeurIPS 2025 validated."
date: "2024"
lastUpdated: "2026-03-01"
---

# About Univault Technologies

## Our Mission

Univault Technologies develops biosignal AI that generalizes across patient populations — solving the core barrier that has prevented clinical AI from reaching the people who need it most: community health workers in low-resource settings without access to specialists, stable connectivity, or expensive equipment.

## The Company

**Legal entity**: Univault Technologies LLC (Utah)
**Founded**: 2024
**Location**: Salt Lake City, Utah

## Team

### Philip Phuong Tran — Founder & CEO

Architect of the GLE (General Learning Encoder) framework and the subject invariance methodology. Named inventor on the patent application (filed under Phuong Tran, Univault Technologies). Leads all research, partnerships, and product development.

**Key result**: Benchmarked GLE against the published results of the NeurIPS 2025 EEG Foundation Model Challenge, using the challenge's public data and evaluation metric. We did not enter the challenge. Measured on that metric, GLE improved over 13× more below baseline than the winning entry. Data and metric are public; the comparison is reproducible.

---

### Anh T Do, PhD — Co-founder & Research Director

PhD researcher and lead author of a signal and control theory textbook for Hanoi University of Science and Technology (HUST), Vietnam's leading engineering institution. Her academic foundation in signal processing and control systems directly underpins GLE's mathematical framework for subject-invariant biosignal encoding.

Contributes to model training architecture and the convex optimization methods underlying GLE's generalization properties.

## What We Have Built

### General Learning Encoder (GLE)

GLE is a biosignal foundation model that achieves subject invariance — the ability to classify biosignals from patients the model has never seen, without retraining. This is the central unsolved problem in clinical biosignal AI.

**Validation**: The NeurIPS 2025 EEG Foundation Model Challenge drew over a thousand teams and published its data, metric and results. We did not enter it. We measured GLE on the same held-out data with the same metric. The metric is an error rate, so lower is better, and 1.0 is the baseline where a model has added nothing. The winning entry scored 0.97843, or 0.02 below baseline. GLE scored 0.70879, or 0.29 below it, which is over 13x further. We scored ourselves; the data and metric are public, so the comparison can be repeated by anyone.

**Patent status**: Pending. Filed under Univault Technologies (Utah LLC).

### BAGLE API

The BAGLE (Brain-AI General Learning Encoder) API is GLE's production implementation for neurological biosignal encoding. Currently in development with a public launch planned for April 2026. It accepts biosignal input and returns 128 GLE coefficients. Designed for commodity edge hardware with no cloud dependency — built for deployment in settings without reliable internet.

### Breathing Pattern Classification

GLE-based respiratory biosignal classification achieves 88.97% accuracy. This is validated on out-of-sample subjects — consistent with the subject invariance claim.

## Research Approach

We publish externally verifiable results on open benchmarks. We do not make unverifiable accuracy claims. Every performance number we cite is tied to a specific dataset, evaluation protocol, and reproducible methodology.

Our current research areas:
- **Subject-invariant biosignal encoding** — the generalization problem in clinical AI
- **Edge-native inference** — AI that runs on $10 wearables without connectivity
- **Privacy-preserving biosignal processing** — raw patient data never leaves the device; only encoded coefficients travel the network
- **Community health worker screening tools** — applied research for low-resource clinical settings

## Active Partnerships

- **Promise2Live** — 988 crisis intervention network. Application: real-time voice and breathing pattern analysis during crisis calls.
- **Materic / DiPole Materials** — Piezoelectric yarn biosignal wearable hardware. Integration with GLE encoding pipeline.
- **University of Utah VPR Office** — University research partnership.
- **Silicon Slopes** — Utah technology ecosystem and builder network.
- **Florida High Tech Corridor** — Southeast US ecosystem partner (in discussion).

## EVAH Grant Pursuit

We are preparing an application for the EVAH initiative (Evidence for AI in Health) — a joint $60M program from the Gates Foundation, Wellcome, and Novo Nordisk Foundation, evaluated by J-PAL (MIT). Pathway A funds up to $1M for rigorous evaluation of AI clinical decision support tools in Sub-Saharan Africa and Southeast Asia. Our application proposes GLE-based community health worker screening in an SSA partner institution.

We are seeking a Sub-Saharan African lead institution partner. Proposal deadline: April 1, 2026.

## Data Privacy Principle

Patient data never leaves the patient's device. GLE encodes biosignals on-device. Only the resulting coefficients (128 numbers representing the encoded signal) travel the network. Raw EEG, breathing, cardiac, or voice data is never transmitted or stored by Univault.

## Contact

For research collaboration, technology partnerships, or EVAH grant co-application inquiries, contact us through [univault.org](https://univault.org).

---

*Univault Technologies LLC — Salt Lake City, Utah*
