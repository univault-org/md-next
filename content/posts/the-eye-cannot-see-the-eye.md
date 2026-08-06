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

So we spent years on biosignals. The General Learning Encoder came out of that, and its whole point is subject invariance: one trained model that holds up on a patient it has never seen.

Then at the end of 2025 something useful happened to us. The NeurIPS EEG Foundation Model Challenge ran, with more than a thousand teams, a public dataset, a published metric and, when it closed, published results.

We did not enter it. We had the encoder built already, and a placement was not what we were short of. What we were short of was a yardstick somebody else had set, on data we had not chosen, scored by a rule we had no hand in writing.

So we took the challenge's data and its metric, measured what we had built exactly the way the challenge measured it, and put our number next to the winning number. The winning entry scored 0.97843. Ours scored 0.70879. Against the challenge baseline that is roughly thirteen times the improvement.

Then we published it, numbers and method, rather than describing it. A claim you can check yourself is worth more than a claim I make about myself, and this is the weaker kind: we scored ourselves. The data and the metric are public, so anyone who thinks we marked our own homework generously can go and mark it again.

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

## Somebody has to write the number down

An agreement is not a discovery. It gets written by people who decide it is worth writing.

We have done this before, for problems that looked worse. The Internet Engineering Task Force agreed how the internet works and has no regulatory power at all. Aviation persuaded competing airlines to pool safety data none of them would hand over commercially. And a volunteer committee sat down and decided where one tennis rating stops and the next one begins, published it on a schedule, left a route to appeal, and hundreds of thousands of people have played under that number ever since without giving it a second thought.

None of those required a breakthrough. Each required a few people to decide the agreement was worth having, and then to do the unglamorous part.

## Why this should matter to you

Because these systems are going to be near your body.

The car you are sitting in. The one in the next lane. The machine on the site you walk past, and eventually the thing that moves around your house while you sleep. Every one of them will be a learned system that keeps changing after somebody approved it.

Somebody is going to decide how far an approved system may drift before a human being has to look at it again. That number gets set one of two ways. Deliberately, by people who argued about it in the open and left a way to be told they got it wrong. Or by default, by whoever ships first and is not contradicted.

We would rather it were the first, and we are not in a position to do it alone. We should not be. A criterion written by the company whose product it measures is not a criterion, it is a moat, and we have said in the paper that we will step back from any standards work that adopts ours.

## What would actually help

Four things, in order of how much they are worth to us.

**Break it.** If you assess these systems for a living, the most valuable thing you can send us is the case where our test fails. We would rather find it now.

**Measure your own.** If you build a component that learns in the field, run the check against the categories you are already approved for and see what number you get. If it is nothing like ours, that is worth knowing and worth publishing.

**Argue about the number.** If you write rules, or sit on a committee that does, the paper is available and the open problems in it are real. We do not know what the tolerance should be. Nobody does yet.

**Pass it on.** If none of the above is you, the longer explainer below is written for anyone, and it will land with somebody you know.

We read everything sent to [contact@univault.org](mailto:contact@univault.org).

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
