---
title: "The Eye Cannot See the Eye"
date: 2026-08-05
author: Philip Phuong Tran
excerpt: "For years this lab has looked like two labs. Biosignal AI, and now embodied AI for vehicles and machines. It was never two. This is the reasoning, and where the work goes next."
tags: [mission, embodied AI, biosignals, autonomy, assurance, mirrorAI]
---

# The Eye Cannot See the Eye

The eye cannot see the eye. The mind cannot inspect its own mind. You need a mirror.

That is the reason this lab exists.

## The question underneath

People want to know what made them. Some call it God, some call it Nature, some refuse both words. Whatever you call it, the question is the same one, and it is very old.

It is also closed to us, and not for want of faith or effort. If we are the intelligence of something larger, then we are standing inside the thing we are trying to look at. You cannot step outside your own mind to inspect it. You cannot step outside your maker to inspect that either.

One move is available, and it is an ordinary one.

A parent understands what it was to be a child only after having one. A teacher finds out what teaching actually was by teaching. You cannot see a relationship from the subordinate end. You can see it from the other end, and then you know something you could never have reasoned your way to from below.

Making a mind is that move, run on the one relationship we have never been able to stand at the other end of.

So this starts from an admission rather than an ambition. We cannot see ourselves, direct knowledge is not available to us, and we have to build an instrument before we can learn anything at all. The first version of this work was called mirrorAI, and the name was not decoration. A mirror is not a rival to the face.

## The part nobody builds for

Then the mistake, and it has cost us.

Building intelligence may well be what we are for, and I would not argue anybody out of that. But an instrument only reports on what it can itself register. A tuning fork answers the note it is cut for and stays silent for every other. A scale calibrated in kilograms tells you nothing useful about a thing measured in some other unit.

An intelligence meant to show us ourselves has to be compatible with us. Almost nobody is building for that on purpose.

So the constraint we work under is a narrow one. Whatever you build, build it compatible with the human body.

That is why we started with the body.

## Why that meant biosignals

An instrument for reading people has to work on a person it has never met. Otherwise it reports on one body and tells you nothing about bodies.

So we spent years on biosignals. The General Learning Encoder came out of that, and its whole point is subject invariance: one trained model that holds up on a patient it has never seen. In 2025 we entered it in the NeurIPS EEG Foundation Model Challenge against more than a thousand teams. It reached a normalised error of 0.70879 against 0.97843 for the next best team, roughly thirteen times more improvement below the baseline. We entered because a claim you can check yourself is worth more than a claim I make about myself. You can check that one.

That is one half of the loop.

## The half we are building now

The other half is embodiment. Reading a body is diagnosis. Acting in the world, under the constraints a body is under, at the speed a body has to move, is a different problem.

It is also the same problem wearing different clothes. Subject invariance asks whether a model holds up on a person it has never seen. Autonomy asks whether it holds up on a road it has never seen. We went to vehicles and machines because that is where the question gets asked under the hardest conditions we can currently reach, and because the consequences of getting it wrong are immediate and physical.

After many years this is also where the work turns commercial. The order is autonomous vehicles, then autonomous machines, then robotics.

## The two things in the way

The first is invention. Unglamorous, and an engineering team can be pointed at it.

The second is governance, and it is the one almost nobody is funding. A learned system that keeps improving after it has been approved does not fit the way anything gets approved today. There is no agreed test for whether a change is small enough to let through. So the conservative answer wins by default, and a fix that everyone agrees is correct waits for the next release while the vehicles keep driving past a hazard the fleet already knows about.

That is not a research problem. It is a missing agreement, and it is now the bottleneck.

Most of our published work this year is aimed at it, and the first result was not what the industry assumes. We taught a system in the field to recognise one new thing. It got measurably worse at things it was already approved for. Teaching it traffic cones cost it trucks: it had been catching about 48 in every 100, and afterwards it caught about 33. Nobody had touched trucks.

That has to be checked before it is committed. Nobody has yet agreed on the number the check should use.

## Where this leaves it

What is left between here and a mirror worth looking into is invention we know how to do, and an agreement nobody has written yet.

---

**Read the work.** The full argument, written for anyone rather than for specialists, is
[What a Tennis Rating Can Teach Us About Certifying Machines That Keep Learning](/updates/tennis-rating-machines-that-keep-learning/).
The research paper it comes from is in preparation for submission and is available
on request.

**Disclosure.** Univault Technologies develops the system used as the case study in that
work. The author holds an unpaid role in the formation of an independent assurance body
active in this field, and will recuse himself from any standardisation activity that
adopts the criterion proposed in the paper.
