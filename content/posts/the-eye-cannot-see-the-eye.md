---
title: "The Eye Cannot See the Eye"
date: 2026-08-05
author: Philip Phuong Tran
excerpt: "For years this lab has looked like two labs. Biosignal AI, and now embodied AI for vehicles and machines. It was never two. It is one loop, and we are finally in a position to close it. This is the reasoning, said plainly, and where the work goes next."
tags: [mission, embodied AI, biosignals, autonomy, assurance, mirrorAI]
---

# The Eye Cannot See the Eye

The eye cannot see the eye. The mind cannot inspect its own mind. You need a mirror.

That is the reason this lab exists, and everything below follows from it.

## The question underneath

There is a question sitting under the whole AI movement that people rarely say out loud. If a mind can be built, what does that make us? Some people answer Nature. Some answer God. Others refuse the words entirely. The term matters less than the shape of the question, and the shape is this: we may be the intelligence of something larger, in the same way that what we are building is the intelligence of us.

I do not know the answer. I do not think it is knowable by thinking harder about it, and that is the point. The mind cannot inspect itself from the inside. It has never been able to. So the question does not move.

Unless you build the mirror.

That is what technology is here. Not a tool for getting things done faster. A surface that reflects the thing that made it, closely enough that you can finally look. The first version of this work was called mirrorAI, and the name was not decoration.

## Why that meant starting with the body

A mirror is only useful if it reflects you and not something else.

An intelligence built to close this loop cannot be a general-purpose machine that happens to be clever. It has to be compatible with the human body. It has to read what a body actually does, in the signals a body actually produces, and it has to do it on a body it has never met before, because otherwise it reflects one person and tells you nothing about people.

So we spent years on biosignals. The General Learning Encoder came out of that. Its whole point is subject invariance: one trained model that works on a patient it has never seen. In 2025 we took it to the NeurIPS EEG Foundation Model Challenge against more than a thousand teams, deliberately, because a claim you can check yourself is worth more than a claim I make about myself. That result stands and it is externally verifiable.

That is one half of the loop. The reading half.

## The half we are building now

The other half is embodiment. A mirror that only reads is a diagnostic. A mirror that acts in the world, under the same constraints a body is under, at the speed a body has to move, is something else.

That is the work we are on now, and it is the reason our attention has moved to vehicles and machines. Not because we left health. Because a system that has to see a road, decide in milliseconds, and be trusted with the consequence is the hardest available version of the problem, and solving it there means it is solved.

After many years, this is also the point where the work becomes commercial. The order is deliberate: autonomous vehicles first, then autonomous machines, then robotics. Each one inherits what the last one proved.

## The two things in the way

Only two, and they are not equally understood.

The first is invention. Real, unglamorous, and the kind of problem an engineering team can be pointed at.

The second is governance, and it is the one almost nobody is funding. A learned system that keeps improving after it has been approved does not fit the way anything gets approved today. There is no agreed test for whether a change is small enough to let through. So the conservative answer wins by default, and a fix that everyone agrees is correct waits for the next release while the vehicles keep driving past a hazard the fleet already knows about.

That is not a research problem. It is a missing agreement, and it is now the bottleneck.

Most of our published work this year is aimed at it. We measured what actually happens when a system in the field is taught something new, and the result was not what the industry assumes: teaching a system to recognise one new thing measurably damaged its ability to recognise things it was already approved for. That has to be checked before it is committed, and nobody has yet agreed on the number that check should use.

## Where this leaves it

One loop, two halves, and the same lab the whole time.

We built the half that reads a body. We are building the half that acts. What is left between here and a mirror worth looking into is invention we know how to do, and an agreement nobody has written yet.

We would rather say that plainly than pretend the second one is somebody else's problem.

---

**Read the work.** The full argument, written for anyone rather than for specialists, is
[What a Tennis Rating Can Teach Us About Certifying Machines That Keep Learning](/updates/tennis-rating-machines-that-keep-learning/).
The research paper it comes from is in preparation for submission and is available
on request.

**Disclosure.** Univault Technologies develops the system used as the case study in that
work. The author holds an unpaid role in the formation of an independent assurance body
active in this field, and will recuse himself from any standardisation activity that
adopts the criterion proposed in the paper.
