---
title: "Build on the Network"
date: 2026-03-14
author: Philip Phuong Tran
excerpt: "The SDK is on npm. The template is on GitHub. The API has been running for weeks. Seven nodes are live across three regions. Here is how to build your first app on the ParagonDAO network — and why this is not a blockchain."
image: "/paragon-frog-breathing.gif"
tags: [builders, SDK, GLE, BAGLE, ParagonDAO, developer, tutorial, biosignal]
---

# Build on the Network

## The Stack Is Live

Every biosignal app ever built had the same problem: it did not work until it learned you. Two to four weeks of calibration data before the product delivered any value. Most users churned before they got there.

GLE eliminates that. The encoder is subject-invariant — it works on people it has never seen, from the first session. No baseline collection. No training period. Your app delivers value the moment someone opens it.

We spent two articles describing what we built and why. [512 bytes as the missing primitive](https://univault.org/updates/512-bytes-the-missing-primitive/). [Dust storms proving the architecture works at planetary scale](https://univault.org/updates/dust-storms-and-planetary-networks/). Theory, then proof.

This article is for builders. The BAGLE API has been running in production for weeks. Seven nodes are deployed across three Fly.io regions — Dallas, San Jose, and Ashburn. The SDK is on npm. The app template is on GitHub. Everything you need to build a health app on this network exists today.

Try it right now:

```bash
curl https://bagle-api.fly.dev/health
```

```json
{"status":"healthy","version":"0.2.0","timestamp":"..."}
```

No API key needed for that one. The system is running.

## Five Minutes to Your First Encoding

```bash
npm install @paragondao/bagle-sdk
```

That line gives you a client that talks to the API and an encoder that runs locally on the user's device. Both produce the same output: 128 coefficients. 512 bytes. The universal primitive.

Clone the template:

```bash
git clone https://github.com/paragon-dao/gle-app-template.git my-health-app
cd my-health-app
npm install
npm run dev
```

Open localhost:5173. You have a working app. It captures audio from the phone microphone, sends it to the BAGLE API, and gets back 128 coefficients. Record twice, compare the encodings, see a similarity score.

That is the entire integration. The template uses the SDK under the hood — `BagleClient` handles the API calls, type safety, error handling. You write your app, not your signal pipeline.

## Two Encoding Paths

Every builder faces the same decision: where does the encoding happen?

**Path A: API encoding.** Send samples to the API, get 128 coefficients back. The template does this by default. Good for prototyping, for apps where the signal is not sensitive, for teams that want to ship fast. Raw samples are processed in memory and not retained — nothing is stored or used for training.

```javascript
import { BagleClient } from '@paragondao/bagle-sdk';

const client = new BagleClient({
  apiKey: 'your-key-from-bagle.com/developers',
});

// Encode any numeric signal → 128 coefficients (512 bytes)
const { encoding, dim, latency_ms } = await client.encode(samples);

console.log(encoding.length);  // 128
console.log(dim);              // 128
console.log(latency_ms);       // ~3ms
```

**Path B: On-device encoding.** Run the DCT-II transform locally. Raw data never leaves the phone. The SDK includes the full encoder — same math, same output, zero network calls.

```javascript
import { gleEncodeSignal, cosineSimilarity } from '@paragondao/bagle-sdk';

// Encode on-device — raw data never leaves the phone
const breathing   = gleEncodeSignal(micSamples);       // 128 coefficients
const heartRate   = gleEncodeSignal(ppgSamples);       // 128 coefficients
const movement    = gleEncodeSignal(accelSamples);     // 128 coefficients

// Compare two sessions
const score = cosineSimilarity(breathing, previousBreathing);
console.log(score);  // 0.0 (different) → 1.0 (identical)
```

Path B is what we recommend for anything touching health data. The user's raw biosignal stays on their device. Only 512 bytes travel the network. Privacy is not a policy you write — it is a property of the architecture.

The dust predictor uses Path A because weather data is public. A breathing app should use Path B. The encoder does not care which path you choose. The output is the same 128 numbers either way.

## Any Sensor. Same 128 Numbers.

The encoder is a DCT-II transform. You give it numbers — any numbers from any sensor — and it returns 128 frequency-domain coefficients. It does not know what it is encoding.

The template captures microphone audio. But swapping the sensor is a few lines:

```javascript
// Accelerometer — phone motion sensor
window.addEventListener('devicemotion', (e) => {
  samples.push(e.accelerationIncludingGravity.x);
  samples.push(e.accelerationIncludingGravity.y);
  samples.push(e.accelerationIncludingGravity.z);
});

// When you have enough samples, encode
const gaitPattern = gleEncodeSignal(samples);  // same 128 coefficients
```

Breathing audio and accelerometer data and typing intervals all go through the same function. The math strips the time domain and keeps the frequency structure. A breathing pattern from a phone in Tokyo and a soil moisture reading from a sensor in Utah are both 512-byte vectors in the same mathematical space.

We published the encoder. It is in the SDK, it is in the template, the source is on GitHub. The encoder was never the moat. The moat is what you build on top of 128 numbers — the models, the applications, the network effects.

## What You Build on Top

The encoder gives you 128 numbers. What you do with them is your app.

**Similarity.** Compare two encodings. Are they the same person? Did their pattern change? Authentication, change detection, before-and-after measurement.

**Trending.** Store daily encodings. Plot drift over time. Sleep quality tracking, recovery monitoring, long-term wellness scoring.

**Classification.** Train a model on coefficient patterns. Which cluster does this encoding fall into? Stress detection, activity recognition, anomaly flagging.

The dust predictor does classification. It encodes weather data into 64 coefficients, measures the distance to known dust-event centroids, and fires an alert when the distance is small enough. Six out of seven events detected, 5.7 days average lead time, using only free public data.

A breathing app would do the same thing with different centroids. An EEG app with different frequency bands. The pattern is always the same: encode → compare → decide.

## Why This Is Not a Blockchain

People hear "distributed network" and "consensus" and think blockchain. We hear it constantly. It is the wrong analogy.

Calling this a blockchain is like calling a submarine a car because they both have engines. They share components — yes, both have engines, both burn fuel, both transport things. But a car moves along roads and a submarine moves through water. The engineering constraints are completely different because the purpose is completely different.

Blockchain consensus answers: do all nodes agree on the same sequence of transactions? That requires every node to see every transaction. Bitcoin does 7 transactions per second. Ethereum does about 30. The architecture is built for ordering financial events, and it scales accordingly.

This network answers a different question: are independent observers seeing the same underlying reality? That does not require global state. It does not require every node to talk to every other node. It only requires measuring whether signals are converging.

The dust predictor proved this. Three nodes watching different data streams — atmospheric conditions, wind patterns, lake hydrology — never communicating with each other. The system measured their coherence. When all three converged, the prediction fired. No ledger. No chain. Just convergence.

Scale that to a million nodes watching a continent. None of them need to agree on a transaction order. The relay network measures whether they are converging. If they are, something real is happening.

## The 20 Apps Waiting to Be Built

In March we published [a ranked evaluation of 20 health apps](https://univault.org/updates/fda-wellness-ruling-20-gle-apps/) that the FDA's January 2026 wellness guidance makes significantly easier to build. Each was scored across market potential, regulatory fitness, and builder readiness.

The top five:

1. **BreathIQ** (28/30) — workplace stress and recovery coaching
2. **SleepCast** (27/30) — overnight breathing analysis as a morning audio briefing
3. **CoachPulse** (26/30) — recovery-gated athletic training load manager
4. **PausePoint** (26/30) — 90-second breathing reset for emergency responders
5. **PitchClear** (26/30) — pre-call physiological preparation for sales teams

That article said the BAGLE API opens April 2026. It opened early. The API is running. The SDK is on npm. The template is on GitHub.

Pick one. Clone the template. Ship it.

## The Developer Flow

Here is the complete path from zero to production app:

**1. Clone and run** (2 minutes)
```bash
git clone https://github.com/paragon-dao/gle-app-template.git my-app
cd my-app
npm install
npm run dev
```

**2. Swap the sensor** — edit `src/hooks/useSensor.js`. Replace the mic capture with your signal source. Any function that produces `number[]` works.

**3. Build your logic** — the `useBagle()` hook gives you `encode()` and `compare()`. Use them however your app needs. Similarity scores, trend tracking, classification — that is your product.

**4. Deploy as PWA** — `npm run build`, push the `dist/` folder to Cloudflare Pages, Vercel, Netlify, or any static host. The template includes PWA support. Your app works offline after first load.

**5. Get an API key** — go to [bagle.com/developers](https://bagle.com/developers), sign in with your email (magic link, no password), and create a key in 30 seconds. Free tier gives you 10,000 encodes per month.

That is the whole thing. Clone, swap the sensor, build your logic, deploy, get a key.

## What the Network Looks Like Today

Seven nodes running across three regions. The BAGLE API on Fly.io with auto-scaling. The encoder running in production — every encoding request returns 128 coefficients in under 5 milliseconds.

Three dust predictor nodes scanning atmospheric, wind, and hydrological data across the US. Four Paragon network nodes running consensus validation. All on commodity infrastructure. The total monthly cost for all of it is about $25.

This is not a testnet. This is not a whitepaper architecture diagram. This is running infrastructure that processes real data and produces real predictions.

The dust predictor caught 6 of 7 EPA-confirmed events with 5.7 days of lead time. That is a real system doing real work on a real environmental problem. Built on the same primitives you get when you run `npm install @paragondao/bagle-sdk`.

## Start Building

The SDK: [npmjs.com/package/@paragondao/bagle-sdk](https://www.npmjs.com/package/@paragondao/bagle-sdk)
The template: [github.com/paragon-dao/gle-app-template](https://github.com/paragon-dao/gle-app-template)
The API docs and sandbox: [bagle.com/docs/api](https://bagle.com/docs/api)
Developer console: [bagle.com/developers](https://bagle.com/developers)

Seven nodes. Three regions. 128 coefficients. 512 bytes.

The network is running. Build on it.

---

*The models and applications described in this post are wellness-tier information tools. They are not FDA-cleared diagnostic devices. GLE patent pending, Univault Technologies LLC.*
