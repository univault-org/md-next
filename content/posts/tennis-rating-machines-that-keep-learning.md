---
title: "What a Tennis Rating Can Teach Us About Certifying Machines That Keep Learning"
date: 2026-08-04
author: Philip Phuong Tran
excerpt: "If you have ever played USTA league tennis, you already understand the hardest open problem in certifying self-driving cars. The same mathematics, in a vocabulary anybody can follow: why a system that learns in the field cannot simply be trusted to have improved, what it costs to check, and why the thing standing in the way is an agreement rather than a discovery."
tags: [embodied AI, assurance, type approval, machine learning, NTRP, explainer]
---

If you have ever played USTA league tennis, you already understand the hardest
open problem in certifying self-driving cars. You just have not been told that
you do.

I want to use the tennis rating to explain a piece of work we finished this
summer. The research version is written for people who assess safety-critical
systems for a living, and it is written in their language. This version is for
everyone else. The mathematics is the same mathematics. Only the vocabulary
changes.

## The number that is not one number

USTA rates players on the National Tennis Rating Program scale. You are a 3.0,
a 3.5, a 4.0, a 4.5. Half-point steps.

Here is the part most players know but rarely think about. There is a second
number underneath. Every league match you play produces a result, and USTA runs
that result through a formula that adjusts a much finer internal rating. That
number moves after every single match. It moves whether you win or lose, and it
moves by how much.

You never see it during the season. What you see is 4.0.

Then at the end of the year USTA looks at the internal number, decides what it
means, and publishes your level for next season. Sometimes you get bumped up.
Sometimes down. There is an appeals process. A person is involved.

So there are really two things going on:

- **The published level.** Discrete, stable, the same for everyone who holds it,
  reviewed once a year by an authority.
- **The dynamic rating.** Continuous, private, different for every player,
  moving after every match, with nobody signing off on any individual move.

Hold on to that split. It is the whole article.

## Three things, not two, and it matters which is which

Before going further I want to lay out the pieces, because the interesting part
of this problem is that people routinely attach the wrong property to the wrong
layer.

There is the **player**. Their game changes all the time. Good week, bad week,
new coach.

There is the **instrument**: the agreed procedure that turns a match result into
a number. That procedure does not change during the season. If it did, no rating
would mean anything, because you could never compare two players rated in
different months.

And there is the **scale**: what the numbers are defined against. Where 4.0
stops and 4.5 begins.

Now the machine.

The trained network is the **instrument**. It learned how to look, which is to
say how to turn a patch of camera image into a compact description of what is
there. It was never taught the word "truck." It has no opinion about anything.
It produces descriptions, and it produces the same description for the same
input every single time. It is frozen when we ship it, and it stays frozen.

The memory beside it is the **scale**. It holds one entry per thing the system
must care about. It is what turns a description into a decision.

The road is the player.

So when I say the system learns in service, I do not mean the network drifts.
The network gives the same answer every time and does not move at all, and we can prove that on
the operator's own hardware. You run a
standard check over the file that produces a short fingerprint, and if a single
bit had changed the fingerprint would differ. That fact is the
foundation of everything here, and it is also the source of the trouble.

Because here is the sentence that took us a long time to be able to write:

> The instrument is certified and unchanged. The scale moved underneath it. And
> the certificate on the instrument tells you nothing about the readings.

## But isn't AI random?

This is the first thing people ask, and it deserves a straight answer, because
the answer is no and most of the confusion comes from one place.

A trained neural network is a fixed mathematical function. Weights in, input in,
output out. Put the same input in twice and you get the same output twice.
Always. This is true of the model in your car and it is equally true of the
large language models everyone has been using.

So why does a chatbot give you a different answer if you ask twice?

Because the network does not produce words. It produces a **probability
distribution** over what the next word could be. Then a separate piece of
software, the sampler, reaches in and draws one, using a random number
generator, tuned by a setting called temperature. That draw is where the
variation lives.

Set the temperature to zero and the sampler stops rolling dice. It takes the
most likely option every time. In principle that makes the answer repeatable,
and on one machine handling one request it usually is. A hosted model can still
wobble, because the arithmetic underneath runs in parallel on hardware that does
not always add numbers in the same order, and when two candidate words are
nearly tied the last decimal place decides which one wins. The dice are gone.
The last decimal place is not.

The network was never fluctuating. The dice were.

The part of our system that watches the road has no dice. It computes a description, measures how well
that description lines up with the memory, and compares the answer to a bar. There is no sampler and no random
draw anywhere in it. It is arithmetic, and that is why we can take that fingerprint of the
parameter file and show it is identical before and after a thousand writes.

One point of precision, because somebody assessing this will ask. Some models,
including the kind used in this domain, keep a running summary of what they have
already seen and carry it forward, so the answer at any moment depends on the sequence that came before
and not only on the current frame. That is not randomness. It is determinism
with a memory of its own. But it means the correct statement is not "same input,
same output." It is **same input sequence, from the same starting state, same
output**. Reproducing a result means reproducing the sequence, which is a
question about evidence rather than about drift. The weights still never move.

## The same split, in a car

A driving automation system is built the way you would expect. Engineers collect
driving data, train a model in a data centre, freeze one finished version,
validate it hard against a catalogue of scenarios, then ship that exact version
to every vehicle.

Approval attaches to the frozen version. Not to the idea of the system. To that
build.

And the reason approval works that way is not bureaucratic caution. It is that
the evidence is expensive in a specific and unavoidable sense. A RAND study by
Kalra and Paddock worked out how much driving it would take to show,
with enough certainty to stand behind it, that a self-driving car is twenty per
cent safer than a human on fatalities. The answer was on the order of 8.8
billion miles. A hundred cars driving day and night would need about four
hundred years. Even the weaker claim, that it is merely no worse than a human,
takes 275 million miles.

Nobody actually revalidates by driving that far. Approval runs on scenario
catalogues, simulation and a bounded programme on real roads, precisely because
the statistical route is impossible. The point is not the mileage. It is that
the evidence gets built once, deliberately, and cannot be regenerated on
demand.

So when the model changes, the expensive part is not the retraining. It is that
the evidence you already paid for no longer describes the thing you are
shipping.

This is exactly why USTA does not re-rate you after every match. Not because
re-rating is hard arithmetic. Because the published level is a promise to
everyone else in the league, and you cannot re-issue that promise weekly.

## Now the problem

Six months after launch, the fleet finds something the system misses. A
particular traffic cone, in a work zone, at a particular angle in particular
light. Thousands of vehicles have seen it. Nobody disputes it is real.

Teaching the car about that cone means retraining offline and rebuilding the
evidence. So the fix waits for the next release, while every car on the road
keeps driving past a hazard the fleet already knows about.

This is where the tennis picture stops describing us, and that gap turns out to
be the most useful thing in this article. So let me break the analogy on
purpose.

## Imagine tennis worked the way vehicle approval does

Suppose USTA had no dynamic rating. Your level can only be changed by a
committee that meets once a year, and before it can change anything it has to
re-watch every match you have ever played, because that record is the evidence
your 4.0 rests on.

Now you spend the winter fixing your backhand. You take lessons. It works.
Everyone at your club can see you are a different player.

You still play the whole season at 4.0. Not because anybody thinks that is
right. Because re-rating you means redoing the evidence, and the evidence is the
expensive part.

Worse. Suppose in March the committee finds your rating is wrong. They agree it
is wrong. They cannot fix it until November, because the review is annual and
rebuilding the evidence takes that long.

No league would run this way. Every player would find it obviously absurd.

That is where driving automation is today.

## Why tennis never needed what we are building

The reason tennis avoided this is not that tennis is cleverer. It is that
re-rating a tennis player is cheap, and re-approving a driving system is not.
Lay the two side by side and the whole problem becomes an economics problem.

| | Re-rating one player | Re-approving a driving system |
|---|---|---|
| Who has to be involved | A committee. Volunteers, mostly | Engineers, a technical service, an approval authority |
| What the evidence is | Match results already on file | Scenario catalogues, simulation, field data, rebuilt |
| What it costs | An afternoon | A full impact analysis and a rebuilt validation campaign |
| How many are affected | One player | Every vehicle in the configuration |
| Does everything else keep running | Yes. The league continues, every other rating stands | No. That evidence underwrites the whole fleet |
| Can you be wrong for a while | Yes, and it self-corrects next season | No |

Look at the fourth and fifth rows, because that is the part people miss.

Re-rating one player does not stop their team, and it does not touch anyone
else's number. The league carries on. A tennis league can run perfectly well
with a handful of players rated slightly wrong, and everybody knows it does.

A fleet cannot. The validation evidence is not held per vehicle. **One campaign
underwrites every car in the configuration**, and that shared evidence is the
only reason the arithmetic works at all. You cannot afford 8.8 billion miles per
car. You can just about afford it once, if the answer covers everything you
ship.

Which means the thing that makes validation affordable is the same thing that
makes it brittle. Touch the model and you have not invalidated one car's
evidence. You have invalidated the campaign.

Hold on to that shape, because you are about to meet it again one level down.
Across the fleet, one body of evidence is shared across every vehicle, so a
single change reaches every vehicle. Inside a single car, as the next sections
show, one bar is shared across every category, so a single write reaches every
category. Both are the same sentence: one thing underwrites many, so nothing can
be touched locally.

And it explains why uniformity matters so much in the regulations. Tennis can
let every player carry a different number, because each number costs a volunteer
an afternoon. A fleet cannot, because the moment every car knows something
slightly different, the evidence stops being shareable and the economics that
made validation possible collapse.

So tennis never needed a test that says "this change is small enough that you do
not have to redo the evidence." It could always just redo the evidence.

We need exactly that test. That is the whole job.

## So why not just copy tennis?

That is what the tempting shortcut proposes. Let the car learn the cone in
service, the way a dynamic rating moves after a match, and settle up at the next
scheduled review.

We think that is the right shape, and this entire body of work is an attempt to
make it safe. But one step gets skipped on the way, and the argument used to
skip it is this:

> "We only added a hazard we confirmed in the field. Adding a hazard cannot make
> the system less safe. So this is not a change that needs re-approval."

It sounds obviously true. It is the kind of thing that gets written into a
field-fix submission.

And a tennis player would not believe it for a second.

Every coach has watched somebody rebuild a serve and lose their forehand doing
it. Change a grip to fix a backhand and the volley goes for a month. Add a
weapon and something else pays for it, at least for a while. Nobody in tennis
thinks a player who added a shot is automatically a better player. You would
want to watch them play before you moved their number.

The people writing field-fix submissions do think that. The rest of this article
is us measuring what happens when you act on it.

## Why it is wrong, in tennis terms

Ask yourself what USTA actually stores about you.

It does not keep a separate rating for your serve, another for your forehand,
another for your backhand, another for your net game. It keeps one number. That
one number is computed from everything you have done, all at once, and that one
number is what answers every question anyone asks about you.

Which means: if you could reach into the system and add something to your
rating, you would not be appending a row to a table. You would be changing the
number that answers all the other questions.

Our system works the same way, and this is the design decision that matters. The
memory does not check each entry separately. It produces one score from the
whole memory at once and compares it against one bar. Every entry contributes to
every decision.

So the entry for the cone participates in the decision about the truck.

That is why the approved file can be bit-for-bit identical and the behaviour
still different. Nothing in the certified parameters changed. The shared
calculation did.

## Why it happens, and it is not what I first thought

The first version of this section had a tidy explanation that turned out to be
wrong, and the wrong one is worth a paragraph because it is the explanation most
people reach for.

The story I told myself was dilution. The memory is a pile of directions added
together, you divide by how big the pile is so the number means something, a new
entry makes the pile bigger, so everything else scores lower. Tidy, intuitive,
and it contributes exactly nothing. The size of the pile is one number that
divides every question equally, and the bar we compare against is computed from
those same scores, so the division cancels top and bottom. I checked it on the
real data: multiply the whole memory by 7.3 and the detection rate comes out
identical to the last decimal place.

Here is what actually happens, and it is better, because it is something you can
look at in advance.

The bar is not fixed. It is set so that the system false-alarms on background at
a rate we choose, one frame in ten. Every time the memory changes, the bar is
recomputed to hold that rate.

So ask what happens when you write in something that **looks like background**.
The memory now scores background higher. To keep false alarms at one in ten, the
bar has to rise. And everything that was sitting just above the old bar is now
sitting just below the new one.

Nothing was forgotten. The standard went up.

That gives a prediction you can test without labels, before you write anything:
the more a candidate resembles background, the more it should cost you. Here is
every candidate we tried, sorted by how much it resembles background:

| enrolled | resembles background | effect on the five approved categories |
|---|---|---|
| debris | 0.73 | -0.074 |
| traffic cone | 0.71 | -0.067 |
| bicycle | 0.61 | -0.032 |
| trailer | 0.54 | +0.050 |
| bus | 0.45 | +0.077 |

Five for five, in order, no exceptions. The thing that predicts the damage is
how ordinary the new object looks.

And the reverse case is the same mechanism running the other way. Enrolling a
bus **improved** truck detection by 0.257, because a bus lifts trucks more than
it lifts background. Enrolling a traffic cone **damaged** truck detection by
0.148, because a cone lifts background more than it lifts trucks.

Same arithmetic, opposite signs, and the sign is set by what the new thing
resembles.

## Something has to give, and that part is not an accident

Here is where the tennis rating stops being only a teaching aid.

Elo, the rating family that expectation-versus-outcome systems belong to, is
**zero sum**. The points the winner gains are the points the loser gives up, as
long as both are updated at the same rate. Rating is not created by playing
well. It is transferred. Somebody imposed that deliberately, because a scale
that could inflate would stop meaning anything. NTRP is not Elo and USTA has
never published its formula, so I will not claim more than family resemblance.
But it is held to a fixed scale for the same reason.

Our system has a fixed budget too, and it is one we chose: one false alarm in
ten. That number is a decision, not a discovery. Everything the system is
willing to flag has to fit underneath it. So when a new entry makes background
more interesting, background eats more of the budget, and something already
approved has to come out to make room.

That is why you cannot simply add. Not because of a law of nature. Because we
declared a budget, and a budget is the thing that makes the number mean
something in the first place.

We went looking for a write size where you get something for nothing. Across a
fifty-fold range, over every range where we could resolve the effect at all,
there was not one.

A tennis player and a traffic cone turn out to be governed by the same
constraint, for the same reason: both live on a scale that was deliberately
held to a fixed size so it would keep meaning something.

## What we measured

Tennis cannot run this experiment, because you cannot hold a player fixed and
add one shot. We can.

We took a memory that already covered five things -- cars, barriers,
pedestrians, trucks, motorcycles -- wrote one new confirmed example into it, and
then measured what happened to the five things we did not touch. We compared
against a control write of exactly the same length in a random direction. The
two are matched on how much was written, not on how much it disturbed anything:
a random direction sits nearly at right angles to everything already there, so
it moves the bar far less than a real object description does. That gap is part
of what the comparison measures, and it is worth naming rather than assuming
away.

Teaching the system traffic cones made it worse at trucks by 0.148, and worse at
barriers by 0.113. Those are fractions of the trucks it used to catch. It had
been spotting about 48 in every 100 trucks; afterwards it was spotting about 33.
Nearly a third of the trucks it used to see, gone. Nobody modified trucks. Nobody modified barriers. The
approved file did not change.

Adding a confirmed hazard is not a pure improvement, where everything gets
better and nothing gets worse. That is the
finding, and everything after this is about what to do with it.

## The average is not a bound

Here is where the tennis rating earns its place, because this is the part people
get wrong and the tennis version makes it obvious.

Average the effect across all five categories and the cone costs 0.067. If you
had declared in advance, reasonably, "do not lose more than 0.10 on average,"
this change sails through. It is admitted.

But an opponent does not play your average. They play your backhand.

A 4.0 with a 4.5 forehand and a 3.0 backhand is a 4.0. So is a player who is
solid 4.0 on everything. They have the same number. They are not the same
player, and anyone who has drawn one of them in a league match knows it inside
three games.

The average was never a statement about any individual shot. It cannot be. It is
an average. So a tolerance written against an average has not bounded anything
you actually care about.

The fix looks obvious: stop averaging, and hold the worst category instead.

## Except the worst of five is its own trap

Say you chart five of your shots over one match and take the worst one.

You will get an ugly number. Not because anything is wrong, but because you took
five noisy measurements and deliberately picked the lowest. Do that with five
coin flips and you will "discover" that one coin is biased.

This bit us in a specific way. Truck was the worst-affected category in three of
our five experiments. Truck also has 51 test instances per trial, against car's
530. The smallest sample gives the noisiest estimate, and the noisiest estimate
is the one most likely to be selected when you go looking for a minimum.

So we had to work out what "worst of five" looks like when nothing has happened.
We did it by shuffling which arm was the real write and which was the control,
scene by scene, recomputing the worst category each time, a hundred thousand
times. That gives you the distribution of bad-looking numbers you get from
selection alone.

The answer: selection alone buys you about 1.2 to 1.3 times the average. Our
observed results ran 1.6 to 2.7 times. So there is a real effect on top of the
effect of having gone looking for the worst, and now we can say how much of
each.

One of our five candidates did not clear that test. It looked like a clean
result and it did not beat the shuffling test above, so we report it as an observation
and not as a finding. That is the discipline the method buys you.

## Did you get worse, or did the bar move?

Every league player has had this argument in a parking lot. You got bumped down.
Did you actually decline, or did the pool around you get stronger, or did USTA
change the formula?

Those are different claims and they call for different responses. If you
declined, practise. If the bar moved, nothing about your game needs fixing.

This has a precise version in our setting, and it was the cheapest way anyone
could have knocked the whole result down. Our headline number is measured while holding
the rate of false alarms fixed, which means the bar is recomputed every time. So a
sceptic could reasonably say: the memory did not forget anything, the threshold
just moved, recalibrate and it comes back.

We tested it with a threshold-free measure. If the system's ability to separate
trucks from background were intact, that measure would be flat while the
headline fell.

It was not flat. It fell by 0.1496 for trucks against a headline fall of 0.1481.
Almost exactly in step.

The system genuinely lost the ability to tell trucks apart. It is not a
case of the bar having moved, and you cannot reset the bar your way out of it.

## Why not just declare a bound and be done?

The obvious engineering answer to all of this is to prove a limit up front. Show
that a single write cannot possibly disturb the readings by more than some
amount, declare that amount at approval, and check it against the record in
service. No experiments needed.

We can do that. The arithmetic is clean. Our score is a measure of how closely two things point the same way, so it
always lands between -1 and +1, no matter what. And a single write disturbs a reading by an
amount that is capped by the weight we wrote it at. That cap is not a
convention we impose, it falls out of the construction: the example is
shrunk to a standard length before it is scaled, so over 500 real enrolments
the size came out at
10.000000 every time. It is declarable at approval and it is nearly tight, in
the sense that some real query almost attains it.

So we have a genuine, provable band with a floor and a ceiling.

And it is useless for deciding anything.

Every one of our five candidates is a single example, shrunk to that same
standard length and written at the same weight. So every one of them carries an identical declared bound. Their
actual outcomes, averaged across the five approved categories, ran from plus
0.112 to minus 0.079, and their worst single category ran wider still. One of them improved the
system substantially and one of them damaged it, and the bound could not tell
them apart, because the bound is the same number in both cases.

A quantity that does not vary across writes whose consequences do vary cannot
tell you which write is safe. It is a fine instrument for keeping track of what is
installed where, and for auditing it later. It is not an admission test.

This is the point where the tennis picture stops being an illustration and
starts being an argument. USTA does not derive your band edges from a theory of
tennis. Nobody computes an upper limit on how much a player can improve over a
season from first principles. The edges come from match results, compared
against a record of what happened before.

That is not a failure of rigour. It is the correct answer to this shape of
problem, and it took us a measurement to find out that machines are in the same
position.

## So: check before you commit

None of this says the car must not learn in service. It says you cannot let it
learn on trust.

The rule we propose is the one USTA already follows without calling it that.
Compute the new rating. Do not publish it yet. Check what it does to everything
already on the record. Only then commit.

Written out, the criterion is: of all the categories the system was already
approved for, the one that lost the most must not have lost more than the
tolerance allows. Measured at the same setting before and after, so the
comparison is fair, and measured on a copy, so a change that fails is never
installed.

That is your band around 4.0. Not a range the system wanders inside. A declared
statement of how far approved behaviour may move before somebody has to look
again.

## What is unsolved, and what is merely unfinished

These are not the same thing and it is worth not blurring them.

### Unsolved: one match is not a season

Our check governs one write. Approval is granted for years. Chain the per-write
tolerance across N writes and the guarantee you get is that the system may
degrade by the tolerance, N times over. For any realistic N that guarantee is
worthless. A player allowed to slip a little every match, for a whole season, is
not a player anyone has made a promise about.

Nobody has the answer to this one, including us. It is the problem we would most
like somebody else to take off our hands.

### Unfinished: going back

Tennis can un-play a match. If a player turns out to have been ineligible, the
result is struck from the record and the ratings recompute. There is an appeals
route. The system has a way to undo, and it gets used.

We could subtract too. The memory is a sum, so removing an entry is arithmetic,
as long as you kept a record of exactly what went in. It is worth being careful
here, because it would be easy to claim this is impossible and it is not.

Two reasons subtraction is not the fix we want. It makes you trust the record
rather than the memory, so a corrupted log takes you somewhere undefined. And
adding numbers in a different order does not return exactly the same number, so
you would land very close to the approved state without being able to show you
had returned to it. Being able to show exactly that is the whole basis of the
argument in this article.

The fix is duller and better. Keep a copy of the approved memory on the vehicle
and swap back to it. That is an exact state somebody already approved, and the
fingerprint check proves it is that state and not a near neighbour. The copy
costs four kilobytes.

We have not built it. Until we do, the mechanism does not meet the recovery
requirement the software update standards already impose, and an assessor would
be right to stop there. But it is a gap in our engineering, not in the idea, and
those deserve different words.

## What it costs, since a hidden price is not a price

How many matches does USTA need before it can tell that you have genuinely
dropped half a level, rather than had a bad month?

Same question, our numbers. To be reasonably sure of spotting a drop of
0.05, rather than missing it by luck, you need roughly 1,240 stored examples per
category. Correct
that for the fact that we are checking five categories at once and it goes to
about 2,000. Correct it again for the fact that examples recorded on the same
drive are not independent of each other -- the same reason five points in one
match tell you less than five points across five matches -- and it lands between
12,600 and 23,000 per category.

Across five categories that is order 100,000 stored examples per vehicle, which
at the size we use is roughly 400 megabytes.

It is worth being exact about what that number is, because it is easy to blame
the wrong part of the system for it.

It is not the network. That ships once and never grows.

And it is not the memory. The memory is the whole point of the design: a single
vector, about four kilobytes, which does not get any bigger as you add
categories. Writing a confirmed hazard into it takes microseconds and costs
almost nothing. That part is genuinely cheap, and it stays cheap.

The 400 megabytes is the evidence you need in order to be *allowed* to write.
One hundred thousand labelled examples, held on the vehicle so that you can
check what a write did to everything already approved.

So the ratio is the uncomfortable part. The thing being guarded is four
kilobytes. The guard costs four hundred megabytes. A hundred thousand to one.

And even then, the storage is not really the problem. A modern car ships with
hundreds of gigabytes; 400 megabytes is not what anybody would object to. The
problem is what comes attached to it. Those examples are not photographs. Each
is the same four-kilobyte description the network produces, stored with its
label, and the pictures themselves are never kept on the vehicle. That matters
legally as well as practically: whether a description of that kind still counts
as personal data is a question somebody has to answer rather than assume, and if
it does, the lawful basis and the retention period have to be settled before any
of this gets built. What the set does have to be is frozen at approval and held
under version control for as long as the approval is relied on. And it will
slowly stop describing the road as the world moves around it.

That is the bill, and it is an obligation rather than a disk-space line item. It
may well be too high, and if it is, that is worth knowing before anybody builds
this rather than after.

Which is the same shape as everything else here. Playing the match is free.
Establishing what the result means is what costs.

## What USTA's algorithm actually shares with ours

I went looking for whether the resemblance survives contact with the real
algorithm, or whether it is just a nice picture. Four things survive. One does
not, and I will name that too.

**It updates on the gap between expected and actual.** USTA takes your rating
and your opponent's, works out what the score should have been, compares it to
what the score was, and moves your number by the difference. Not by whether you
won. By game differential against expectation. Our gate does the same shape of
thing: it does not ask whether the memory is good, it asks what changed against
what was there before, and acts on the difference.

**It is conservative by construction.** Discussed above. Points transfer, they
are not created. So does score, in our memory, for the same reason: we
hold the scale to a fixed size.

**It refuses to rate on thin evidence.** USTA will not issue a computer rating
until you have played at least three valid matches. That is not caution, it is
statistics: you cannot separate a player's level from a bad afternoon on one
observation.

We put a number on the same question a few sections ago, and it was the least
comfortable number we have.

USTA needs three matches to rate a person. We need order 100,000 stored examples
to re-rate a machine, because the tolerance we care about is much finer and the
consequence of getting it wrong is much worse.

**It publishes on a schedule, and it rounds.** Year-end ratings use twelve
months of results and are rounded to the nearest half point. The underlying
number is continuous and private, the published one is discrete and public. That
is the offline, discrete, uniform, reviewed shape that the whole certification
regime depends on, arrived at independently by a tennis association.

**Where it does not correlate.** USTA does not publish its algorithm. It is
proprietary, and the system works anyway, because what the community agreed on
was the procedure and the appeals process, not the formula.

That is worth sitting with, because it points somewhere useful. For a safety
argument you do not necessarily need the mechanism disclosed. You need the
acceptance criterion agreed, the evidence reproducible, and a route to challenge
the result. Certify the procedure, not the thing being measured. Tennis got
there first.

## Every formula in one place

For anyone who wants to teach this or check it. Five lines, in order.

**1. The reading.** How much does what I am looking at match what I am watching
for:

    score(q, S) = alignment(q, S) / size(S)

**2. The write.** Adding a confirmed hazard P at weight w:

    S_new = S + w * P

**3. The average, which is the statistic everyone reaches for.** Over the
categories the system was already approved for:

    J(S) = average over categories c of detection_rate(c)

**4. The gate, which is what we argue for instead.** Of all the categories
already approved, the one that lost the most must not have lost more than the
tolerance allows:

    minimum over c of [ detection_rate(c, after) - detection_rate(c, before) ]
        must be >= minus epsilon

**5. The problem we cannot solve.** Chain that across N writes over a service
life and all you can prove is:

    J(after N writes) >= J(at approval) - N * epsilon

which for any realistic N says nothing at all. A player allowed to slip by the
tolerance every match, all season, is not a player anyone has made a promise
about.

Epsilon in line 4 is the band around 4.0. Line 5 is why a band that works for
one match does not automatically work for a season, and it is the open problem
we are handing to people better at this than we are.

## Where the tennis picture breaks

Analogies earn trust by declaring their limits, so here are the three that
matter.

A tennis rating measures how good you are, one number on one scale. Our memory
is not measuring quality, it is holding a list of things to watch for. The
overlap is in how the number is governed, not in what it means.

Your dynamic rating moves because you changed. In our system nothing about the
trained network changes at all, and that is the entire difficulty. The approved
parameters are untouched, provably so, and the behaviour still moved. If a
tennis rating shifted while your game was demonstrably identical, you would want
to know why before the next season, and that is the position an approval
authority is in.

And the stakes are not the same. A misrated tennis player has a frustrating
Saturday. This is a component that decides whether something in the road is a
pedestrian.

## Where this leaves it

We have not shown that a car may be allowed to learn in the field. We have shown
that the argument people use to wave it through does not hold, that the effect
is measurable, that the obvious way to test for it hides the damage, and that
there is a better test which costs a specific and quotable amount.

For anyone writing rules in this area, the useful sentence is this. The
regulations work today because every change they were built for is made offline,
is a single numbered version, reaches every vehicle identically, and is
reviewed by a person before release. A component that improves in service has
none of those four properties.

USTA solved a much smaller version of this problem decades ago, and their answer
was the right shape: let the number move continuously, but publish only after
review, on a schedule everyone knows, with a way to appeal. What is missing for
machines is not the idea. It is the agreed test that says which changes are
small enough to let through.

## What this is actually about

Everything being built right now that has to keep learning after it ships runs
into this. Driving systems first, because they are furthest along and the
regulations already exist. Then warehouse robots, inspection drones, surgical
assistants, and the humanoids currently absorbing a great deal of money.

Not because they all share our mechanism. We are explicit in the research
version that we do not claim that. They share the situation: approved once,
deployed for years, learning from a world that will not hold still. The question
generalises even where our numbers do not.

So it is worth being precise about what we actually did, because it is smaller
than it sounds and more useful than it sounds.

We took an argument that was being made in real submissions and turned it into a
measurement. That is all. "Adding a confirmed hazard cannot make the system less
safe" went from something people asserted in a meeting to something with a
number attached, a test to check it against, and a price tag.

We did not make it elegant. Tennis is elegant. Ours has two holes we named a few
paragraphs ago, and a verification bill of roughly 400 megabytes of retained
evidence per vehicle. What we made it
is **measurable**, and that is the smaller and better claim, because a problem
you can measure is a problem people can argue about, price, and eventually agree
on. An argument you cannot measure just gets louder.

Which leaves the question worth ending on. If the mathematics is tractable, and
the measurement runs on real road data, what exactly is still missing?

Not physics. An institution.

There is no body whose job it is to say "this class of change is small enough
that you need not redo the evidence." No standing group, no agreed test, no
appeals route. Every manufacturer works it out alone, with an authority that has
nothing to cite, which is why the conservative answer wins and the fix waits for
the next release.

That is not a hard thing to build. We have built it repeatedly, for problems
that looked worse.

The Internet Engineering Task Force, which is the group that agrees how the
internet actually works, has no regulatory power whatsoever. It runs on what it
calls rough consensus and running code: enough agreement to proceed, plus
something that demonstrably works. It has held the network together for decades.

Aviation built the Aviation Safety Information Analysis and Sharing programme,
where competing airlines pool safety data they would never hand over
commercially, because everyone eventually concluded that the alternative was
worse for all of them.

And USTA is a volunteer organisation that solved the governance half of this
exact problem for millions of players, on a schedule, with an appeals process,
and needed none of the mathematics in this article to do it.

None of those required a breakthrough. Each required somebody to decide the
agreement was worth having, and then to do the unglamorous work of getting it.

That is the shape of what is missing here. Not a discovery. An agreement.

And sit with the comparison for a second, because it is not flattering to us. A
volunteer committee worked out how to re-rate every league tennis player in the
country. Fairly, on a published schedule, with a route to appeal. They did it
without one line of the mathematics in this article.

We have the mathematics. We have the measurements, on real road data. What we do
not have is the committee.

Meanwhile there is a work zone somewhere tonight with a cone in it that thousands
of cars have already seen, already logged, and already agreed is real. They will
keep driving past it until somebody decides what would count as an answer.

So let me be exact about the number that is missing, because it is the only one
that matters and it appears in none of our tables.

It is this. How much may the worst-affected thing a system already knew be
allowed to lose, before somebody has to look at it again?

We measured one write. Teaching a system to recognise traffic cones cost it
0.148 on trucks. Trucks it already handled. Trucks nobody had touched.

Is 0.148 too much?

I cannot tell you. Neither can the manufacturer who would propose the change, nor
the assessor who would have to sign it off, and not one of us is bad at
arithmetic. There is simply nobody whose job it is to say.

Somebody, once, had to decide where 4.0 stops and 4.5 begins.

That was not a discovery. There is no theorem behind it and there was never
going to be one. A group of people looked at what they had, argued about it for
a while, wrote a number down, published it, and **left a way to appeal**.
Millions of matches have been played under that number since, and almost nobody
gives it a second thought, which is the mark of a rule that works.

That last part is the one to take seriously, and it is the part that gets
underfunded. The first version of a rule like this is wrong in ways nobody can
predict from the inside, and the appeals are how you find out where. Whoever
builds this should expect the appeal process to absorb more of their people and
their budget than the criterion itself, for years, and should plan for that
rather than be surprised by it. A number with no cheap way to be challenged is
not a rule. It is an edict, and the people it was written for will route around
it.

This article started with 8.8 billion miles.

It ends with somebody willing to say where 4.0 stops, and to be told they got it
wrong.


---

**Disclosure.** Univault Technologies developed the system used as the case study here.
The author holds an unpaid role in the formation of an independent assurance body active
in this field, and will recuse himself from any standardisation activity that adopts the
criterion proposed in the research paper. That paper is in preparation for submission
and is available on request. Every number quoted here is measured.
NTRP is a program of the United States Tennis Association, which is not affiliated with
this work.
