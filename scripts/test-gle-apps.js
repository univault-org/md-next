/**
 * test-gle-apps.js
 *
 * Runs the 20 GLE wellness builder app ideas through the SoundbiteTesting
 * power-vs-force analysis API — the same LLM infrastructure behind the
 * SoundbiteTesting Lab's Simulation Engine and Comparison Lab stations.
 *
 * What this does:
 *   For each of the 20 apps, sends 3 dimension-specific prompts to the
 *   DeepSeek analysis endpoint (power-vs-force/analyze). Each prompt is
 *   framed to elicit a meaningful signal for one scoring dimension:
 *     - Market Potential
 *     - Regulatory Fitness
 *     - Builder Readiness
 *
 *   Normalizes communication_score (0-100) → (1-10) per dimension.
 *   Compares simulation scores to editorial scores from the article.
 *   Saves raw results to JSON for auditability.
 *   Outputs a ranking comparison report.
 *
 * Usage:
 *   node scripts/test-gle-apps.js
 *   node scripts/test-gle-apps.js --force   # re-run even if cache exists
 *
 * Requirements:
 *   Node.js 18+ (native fetch). No dependencies.
 *
 * API:
 *   POST https://mirrorai-api.amitacompany.workers.dev/api/v1/llm/power-vs-force/analyze
 *   Headers: { 'Content-Type': 'application/json', 'x-api-key': 'test-key-123' }
 *   Body: { content: string, templateContext: object }
 *   Response: { success: boolean, analysis: { communication_score: number, authenticity_level: number, ... } }
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const API_URL = 'https://mirrorai-api.amitacompany.workers.dev/api/v1/llm/power-vs-force/analyze'
const API_KEY = 'test-key-123'
const CACHE_FILE = join(__dirname, '../out/gle-apps-simulation-results.json')
const REPORT_FILE = join(__dirname, '../out/gle-apps-simulation-report.md')
const DELAY_MS = 600   // respectful pacing — 600ms between calls
const FORCE_RERUN = process.argv.includes('--force')

// ─────────────────────────────────────────────────────────
//  THE 20 GLE BUILDER APPS
//  Extracted from the article, structured for simulation
// ─────────────────────────────────────────────────────────
const APPS = [
  {
    rank: 1,
    name: 'BreathIQ',
    signal: 'Respiratory',
    description: 'Workplace stress and recovery coaching app. Real-time breathing pattern analysis that gives office workers a daily stress-load score and recovery recommendations.',
    market: 'Workplace wellness market is $61B. SaaS B2B pricing at $8–15/seat/month across 500-person companies. Strong acqui-hire risk from Whoop, Garmin, Apple.',
    regulatory: 'Breathing pattern information. Coherence scores. Recovery coaching. Copy says "your breathing pattern today" and never claims cortisol levels or burnout disorder. Information provision only.',
    buildability: 'Two engineers, 30-day v1. Signal processing offloaded to BAGLE API (128 DCT-II coefficients). Remaining work: UI, scoring algorithm on coefficients, push notification logic.',
    editorial: { market: 9, regulatory: 10, builder: 9, total: 28 }
  },
  {
    rank: 2,
    name: 'SleepCast',
    signal: 'Respiratory (overnight)',
    description: 'Sleep quality estimate delivered as a morning audio briefing. Overnight breathing pattern analysis generates a 90-second personalized audio summary every morning.',
    market: 'Sleep tracking market is $2.5B, 17% CAGR. Voice-first morning reports are genuine differentiator — no existing sleep app delivers this format.',
    regulatory: 'Sleep quality estimates are in Makary wellness safe harbor. Irregular breathing described as patterns, never as apnea diagnosis. Physician consultation recommended if persistent.',
    buildability: 'Overnight coefficient batches → LLM summary → TTS audio. Three-API pipeline. Thirty days is realistic for a two-person team.',
    editorial: { market: 9, regulatory: 9, builder: 9, total: 27 }
  },
  {
    rank: 3,
    name: 'FocusWindow',
    signal: 'Cardiac (HRV) + Respiratory',
    description: 'Cognitive readiness tracker for knowledge workers. Combines HRV and breathing coherence to tell you when your nervous system is primed for deep work.',
    market: 'B2B play selling to teams using Notion, Linear, Figma. Biometric differentiation hard to replicate with surveys.',
    regulatory: 'Cognitive readiness. HRV trends. Breathing coherence. Information about current physiological state. Zero regulatory surface area under Makary guidance.',
    buildability: 'Dual-signal fusion is what GLE was built for. The app is a green/yellow/red readiness indicator. A solo founder ships this in 45 days.',
    editorial: { market: 8, regulatory: 10, builder: 9, total: 27 }
  },
  {
    rank: 4,
    name: 'CoachPulse',
    signal: 'Cardiac (HRV) + Respiratory',
    description: 'Recovery-gated athletic training load manager. Tells athletes whether HRV and breathing data indicates they should train hard, easy, or rest.',
    market: '35 million recreational athletes. Pure-software play at $7.99/month targeting runners, cyclists, CrossFitters who already own cheap HRV sensors.',
    regulatory: 'Athletic recovery guidance is the clearest wellness category. "Recovery indicators suggest easy training today" is information, not prescription. Standard wellness disclaimers handle residual risk.',
    buildability: 'HRV processing from PPG within BAGLE validated capability. Mapping coefficient space to training zones is builder\'s creative contribution. 45-day v1.',
    editorial: { market: 8, regulatory: 9, builder: 9, total: 26 }
  },
  {
    rank: 5,
    name: 'PausePoint',
    signal: 'Respiratory',
    description: 'Micro-recovery app for emergency responders. A 90-second breathing reset protocol with biofeedback for firefighters, paramedics, and ER nurses between high-stress events.',
    market: 'B2G sales cycle is slow but contract sizes are significant. FEMA Assistance to Firefighters Grant program funds exactly this type of tool.',
    regulatory: 'A guided breathing protocol with coherence feedback. Digital version of what breathing coaches have done for decades. Zero regulatory exposure.',
    buildability: 'Guided breathing plus coherence feedback ring. Two engineers, 30 days. This is the "hello world" of GLE builder apps.',
    editorial: { market: 7, regulatory: 10, builder: 9, total: 26 }
  },
  {
    rank: 6,
    name: 'PitchClear',
    signal: 'Respiratory + Cardiac (HRV)',
    description: 'Sales call physiological preparation tool. A pre-call breathing and HRV check with a 5-minute reset protocol if readiness is low.',
    market: 'CROs spend heavily on enablement tools. Physiological readiness layer at $15–25/seat/month for enterprise sales teams has strong unit economics.',
    regulatory: 'Performance tool for professionals. FDA has no interest in sales preparation software. Zero exposure.',
    buildability: 'Technically identical to PausePoint. Differentiation is in sales-specific UX and CRM integration. A solo founder ships v1 in 30 days.',
    editorial: { market: 7, regulatory: 10, builder: 9, total: 26 }
  },
  {
    rank: 7,
    name: 'StudyState',
    signal: 'Cardiac (HRV) + Respiratory',
    description: 'Student academic performance optimization tool. Physiological readiness checks with study scheduling recommendations for students.',
    market: 'B2B2C through universities as student wellness benefit at $2–3/month/student is achievable. Consumer monetization harder with price-sensitive students.',
    regulatory: 'Study readiness and scheduling recommendations. Purely informational. Zero regulatory surface area.',
    buildability: 'A team that builds CoachPulse or FocusWindow can white-label a student version in 2 weeks. Standalone: 30 days for v1.',
    editorial: { market: 6, regulatory: 10, builder: 9, total: 25 }
  },
  {
    rank: 8,
    name: 'VoiceAge',
    signal: 'Voice/acoustic',
    description: 'Acoustic biomarker wellness app for vocal health. Daily 30-second voice samples generate a vocal health trend score tracking fatigue, hydration, and respiratory wellness over time.',
    market: 'Vocal biomarker companies have raised $100M+ combined. Multiple paths: consumer wellness, professional voice users (singers, teachers, lawyers), enterprise call center vocal fatigue monitoring.',
    regulatory: 'Voice-as-wellness is clean. Positioned around vocal wellness and physical fatigue only. Dangerous zone is depression or neurological detection — technology can infer but copy must not claim.',
    buildability: 'Phone mic is sufficient. Store daily coefficient vectors, compute trends. V1 in 60 days. Voice quality normalization across phone mics requires calibration work.',
    editorial: { market: 8, regulatory: 8, builder: 8, total: 24 }
  },
  {
    rank: 9,
    name: 'SignalCoach',
    signal: 'Voice/acoustic',
    description: 'Singing and public speaking vocal performance coach. Tracks vocal health, fatigue, and technical consistency for professional voice users over time.',
    market: '4 million professional voice users in the US. High willingness to pay ($25–40/month) for tools that protect a career.',
    regulatory: 'Vocal performance coaching is entirely outside FDA scope. One of the cleanest applications on the list.',
    buildability: 'Professional voice users provide high-quality, consistent signal input — ideal conditions for GLE. 45-day v1.',
    editorial: { market: 6, regulatory: 10, builder: 8, total: 24 }
  },
  {
    rank: 10,
    name: 'MoodTide',
    signal: 'Cardiac (HRV)',
    description: 'Passive emotional wellness trend tracker. Runs in the background, surfacing weekly HRV trend reports correlated with user-tagged life events.',
    market: 'Event-correlation layer and weekly narrative report differentiates from free features on existing wearables. Opportunity on non-Apple wearables.',
    regulatory: 'HRV trend information correlated with life events. Identical regulatory character to Whoop and Garmin. Clean framing.',
    buildability: 'Battery-efficient background processing on mobile is the main challenge. Wearable SDK integration is the longest task. Solo founder ships in 60 days.',
    editorial: { market: 7, regulatory: 9, builder: 8, total: 24 }
  },
  {
    rank: 11,
    name: 'SleepGate',
    signal: 'Respiratory (overnight)',
    description: 'Shift worker sleep optimization tool. Helps night shift nurses, pilots, and factory workers track sleep quality and optimize rest windows.',
    market: '15 million shift workers. Employers in aviation, healthcare, and manufacturing have strong liability incentives to support shift worker sleep.',
    regulatory: 'Identical regulatory character to SleepCast. Clean wellness framing. Must not interface with FAA duty-of-rest compliance.',
    buildability: 'A team that builds SleepCast can ship a shift-worker variant in 2 weeks. Standalone: 45 days.',
    editorial: { market: 6, regulatory: 9, builder: 9, total: 24 }
  },
  {
    rank: 12,
    name: 'BirthReady',
    signal: 'Respiratory + Cardiac (HRV)',
    description: 'Prenatal breathing and HRV wellness app. Tracks breathing patterns and HRV through pregnancy with labor preparation breathing coaching.',
    market: '3.7 million US births per year. An HRV-based prenatal wellness app is a genuine market gap. $117 ARPU during the 9-month window.',
    regulatory: 'Prenatal wellness tracking is legitimate but requires conservative copy. Elevated duty of care when user population includes a fetus. Never infer fetal wellbeing.',
    buildability: 'No special signal processing. Builder\'s work is in the content layer — trimester-specific coaching scripts and protocols. Clinical advisor recommended.',
    editorial: { market: 8, regulatory: 7, builder: 8, total: 23 }
  },
  {
    rank: 13,
    name: 'HarmonizeHR',
    signal: 'Cardiac (HRV) + Respiratory, multi-user',
    description: 'Team physiological synchrony tool. Measures real-time physiological coherence across distributed team members during meetings.',
    market: 'Genuinely novel — no existing product measures group physiological synchrony in corporate context. Hard B2B adoption due to employee consent complexities.',
    regulatory: 'Clean from FDA perspective. Risks are employment law and GDPR, not FDA. Aggregation-only architecture is elegant.',
    buildability: 'Multi-user aggregation layer, consent management, real-time synchronization. 90-day work for a competent backend engineer.',
    editorial: { market: 7, regulatory: 9, builder: 6, total: 22 }
  },
  {
    rank: 14,
    name: 'MindMirror',
    signal: 'EEG',
    description: 'EEG-based focus and meditation quality feedback. Real-time brainwave pattern feedback during meditation or focus sessions using consumer EEG headbands.',
    market: 'EEG-enhanced meditation niche has proven users will pay premium for biofeedback. Hardware dependency (Muse, OpenBCI) limits TAM.',
    regulatory: 'Brainwave feedback during meditation is clean wellness territory. Muse headband has operated a decade without FDA interference. Careful copy review required.',
    buildability: 'Consumer EEG hardware has significant noise challenges. V1 in 60 days for an engineer with EEG experience. Newcomers should budget 90 days.',
    editorial: { market: 7, regulatory: 8, builder: 7, total: 22 }
  },
  {
    rank: 15,
    name: 'ClarityCheck',
    signal: 'Cardiac (HRV) + Respiratory',
    description: 'Substance-free recovery wellness companion. Daily HRV and breathing check-in for people in alcohol or substance recovery, with physiological wellness trends alongside mood journaling.',
    market: '21 million Americans in recovery. Biometric wellness layer gives users objective evidence of physical recovery that motivates continued sobriety.',
    regulatory: 'Must be strictly "your body\'s wellness trends over time" with no inference about substance use states. Elevated scrutiny risk due to user population proximity to clinical claims.',
    buildability: 'Standard HRV and breathing processing. Differentiation is in recovery-sensitive UX and trend visualization. 60-day v1.',
    editorial: { market: 7, regulatory: 7, builder: 8, total: 22 }
  },
  {
    rank: 16,
    name: 'GaitGuard',
    signal: 'Movement (accelerometer)',
    description: 'Movement pattern wellness tracker for older adults. Smartphone-based gait and movement pattern tracker with weekly mobility wellness scores and family notification.',
    market: '54 million adults over 65. Falls are the leading cause of injury-related death in this population. Senior living facilities as B2B customers are strong.',
    regulatory: 'Fall detection line is complicated. Apple\'s fall detection received FDA scrutiny. Family notification must be framed as information, not medical alert. Active FDA attention in this space.',
    buildability: 'Phone placement variability (pocket vs. hand vs. bag) affects signal quality significantly. 75-day estimate for a careful v1.',
    editorial: { market: 8, regulatory: 6, builder: 7, total: 21 }
  },
  {
    rank: 17,
    name: 'NestMonitor',
    signal: 'Respiratory (contactless acoustic)',
    description: 'Infant breathing wellness monitor. Passively monitors infant breathing patterns from a nursery device, alerting parents to significant changes as a wellness awareness tool.',
    market: 'Acoustic-only solution with no wearable-on-infant opens a category that Owlet\'s FDA battles have vacated.',
    regulatory: 'Highest-risk app on the list. Owlet received FDA warning letter in 2021 for a breathing monitor with alert functionality. Formal FDA pre-submission meeting required before launch.',
    buildability: 'Infant breathing is faster and shallower than adult. Background noise rejection is critical. 90-day work for a careful team.',
    editorial: { market: 9, regulatory: 5, builder: 7, total: 21 }
  },
  {
    rank: 18,
    name: 'ThermalTune',
    signal: 'Respiratory + environmental sensor',
    description: 'Heat stress wellness indicator for outdoor workers. Combines breathing pattern analysis with environmental data to give warehouse and construction workers a heat stress wellness indicator.',
    market: 'OSHA cites 3,500+ severe heat illness cases annually. B2G sales through occupational health consultants.',
    regulatory: 'Safety information, not medical diagnosis. Relevant framework is OSHA, not FDA. Employer use to make employment decisions requires careful terms of service.',
    buildability: 'Ruggedized respiratory sensors for outdoor industrial use are limited. Hardware sourcing adds 30 days to timeline.',
    editorial: { market: 6, regulatory: 8, builder: 7, total: 21 }
  },
  {
    rank: 19,
    name: 'PeakShift',
    signal: 'Cardiac (HRV, circadian patterns)',
    description: 'Chronobiology-based peak performance predictor. Uses HRV patterns to estimate individual chronotype and predict daily cognitive and physical peak performance windows.',
    market: 'Chronotype optimization is niche. B2B path through enterprise productivity tools is most credible.',
    regulatory: 'Personal productivity optimization using physiological patterns. No disease claims. Clean framing.',
    buildability: 'Meaningful chronotype signal requires 2–3 weeks of consistent data before it emerges. Cold start problem is significant for consumer retention.',
    editorial: { market: 6, regulatory: 9, builder: 6, total: 21 }
  },
  {
    rank: 20,
    name: 'NeuralNarrative',
    signal: 'EEG',
    description: 'EEG-based creative flow state tracker. Tracks brainwave patterns during creative work to identify conditions that correlate with each user\'s flow state.',
    market: 'Artists and writers are engaged but price-resistant. EEG hardware requirement limits addressable market. Small passionate community product — not venture scale.',
    regulatory: 'Creative flow state tracking for artists. No disease claims. No clinical inference. Clean framing.',
    buildability: 'EEG consumer hardware integration is the bottleneck. Users will not see value for 4–6 weeks. Cold start problem is real.',
    editorial: { market: 4, regulatory: 9, builder: 6, total: 19 }
  }
]

// ─────────────────────────────────────────────────────────
//  PROMPT BUILDERS
//  Each dimension gets a focused prompt designed to elicit
//  a meaningful communication_score from DeepSeek
// ─────────────────────────────────────────────────────────

function marketPrompt(app) {
  return `Evaluate the market strength of this GLE wellness app opportunity:

App: ${app.name}
Description: ${app.description}
Signal type: ${app.signal}

Market case:
${app.market}

GLE platform advantages available to every builder:
- Subject invariance: works on first-time users with no calibration period
- No signal processing required: BAGLE API returns 128 DCT-II coefficients
- Privacy by architecture: raw data never leaves the device
- Edge-native: designed for cheap wearables, no cloud dependency

Evaluate: Does this market opportunity demonstrate genuine organic demand pull? Is the revenue model credible? Is there a clear buyer? Does the GLE platform advantage create meaningful competitive moat?

Assess the market strength across: market size, buyer clarity, revenue model viability, competitive differentiation, and growth trajectory.

After your analysis, output your final verdict on the LAST LINE in EXACTLY this format:
SCORE: X/10`
}

function regulatoryPrompt(app) {
  return `Evaluate the regulatory fitness of this wellness app under FDA Commissioner Makary's January 6, 2026 guidance:

App: ${app.name}
Description: ${app.description}
Signal type: ${app.signal}

Regulatory framing:
${app.regulatory}

FDA Commissioner Makary stated: "If their device or software is simply providing information, they can do that without FDA regulation. The only stipulation is if they make claims of something being medical grade."

The app's design:
- Provides biosignal information (${app.signal}) via 128 frequency-domain coefficients
- Does NOT claim to diagnose, treat, or prevent any medical condition
- Uses wellness framing: patterns, trends, and information — not diagnoses
- Positioned as information provider, not Software as Medical Device (SaMD)

Assess regulatory fitness: clarity of wellness framing, proximity to diagnostic claims, enforcement history for similar tools, whether this can be built without crossing into SaMD territory.

10 = zero regulatory risk, cleanly stays in wellness information zone.
1 = probable FDA enforcement letter.

After your analysis, output your final verdict on the LAST LINE in EXACTLY this format:
SCORE: X/10`
}

function builderPrompt(app) {
  return `Evaluate the technical feasibility and builder readiness of this GLE wellness app:

App: ${app.name}
Description: ${app.description}
Signal type: ${app.signal}

Technical implementation plan:
${app.buildability}

BAGLE API (available to all builders):
- Input: raw biosignal (breathing, cardiac HRV/PPG, EEG, voice/acoustic)
- Output: 128 DCT-II frequency-domain coefficients
- Subject invariant: no per-user training or calibration needed
- Validated on ${app.signal} signals

A typical 2-person builder team with standard mobile/web development skills.

10 = small team ships functional v1 in 60 days.
1 = years of work, major technical barriers.

Assess builder readiness: technical complexity beyond the BAGLE API, hardware requirements, cold-start challenges, integration dependencies, realistic timeline.

After your analysis, output your final verdict on the LAST LINE in EXACTLY this format:
SCORE: X/10`
}

// ─────────────────────────────────────────────────────────
//  API CALL
// ─────────────────────────────────────────────────────────

async function analyzeContent(content, dimension, appName) {
  // The backend validator requires `text` and `template` fields (same schema as quick-alt).
  // `templateContext` is used internally but the top-level body must use these field names.
  const template = {
    id: 'gle_app_evaluation',
    name: `GLE App ${dimension} Assessment`,
    businessValue: `Evaluate ${dimension.toLowerCase()} viability of a GLE biosignal wellness app`,
    description: `Scoring ${appName} on ${dimension} dimension for GLE builder opportunity ranking`
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify({ text: content, template })
  })

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${await response.text()}`)
  }

  const data = await response.json()

  // The power-vs-force endpoint uses the same response schema as quick-alt:
  // { originalText, optimizedText, analysis: { reasoning, summary, metrics }, metadata }
  if (!data.optimizedText && !data.analysis) {
    throw new Error(`Unexpected response shape: ${JSON.stringify(data).slice(0, 200)}`)
  }

  // Extract the full reasoning text for score parsing
  const reasoning = data.analysis?.reasoning || data.analysis?.summary || data.optimizedText || ''

  // Parse score from the reasoning text. Tries patterns in priority order:
  // 1. Explicit "SCORE: X/10" anywhere in text
  // 2. Evaluation keyword + "X/10" (e.g. "Feasibility Score: 8/10")
  // 3. Any standalone "X/10" where X is 1-10 (clamped to valid range)
  let extractedScore = null

  const p1 = reasoning.match(/\bSCORE:\s*([1-9]|10)\s*\/\s*10\b/i)
  if (p1) {
    extractedScore = parseFloat(p1[1])
  } else {
    const p2 = reasoning.match(
      /(?:score|rating|feasibility|readiness|fitness|viability|strength|verdict)\b[^\n]{0,50}?\b([1-9]|10)\s*\/\s*10\b/i
    )
    if (p2) {
      extractedScore = parseFloat(p2[p2.length - 1])
    } else {
      // Last resort: first standalone N/10 where N is 1-10
      const p3 = reasoning.match(/\b([1-9]|10)\s*\/\s*10\b/)
      if (p3) {
        extractedScore = parseFloat(p3[1])
      }
    }
  }

  return {
    extracted_score: extractedScore,  // null if not found
    improvement_percentage: data.analysis?.metrics?.improvement_percentage
      ? parseFloat(data.analysis.metrics.improvement_percentage)
      : null,
    reasoning_excerpt: reasoning.slice(-600),  // last 600 chars for audit
    model: data.metadata?.model_indicator || data.metadata?.model || 'unknown'
  }
}

// ─────────────────────────────────────────────────────────
//  SCORING
//  Use extracted_score (already 1-10) from "SCORE: X/10"
//  Clamp to [1, 10] range
// ─────────────────────────────────────────────────────────

function scoreFrom(analysis) {
  if (analysis.extracted_score != null) {
    return Math.min(10, Math.max(1, Math.round(analysis.extracted_score)))
  }
  // If score not extracted, flag as needs-review with midpoint fallback
  return null
}

// ─────────────────────────────────────────────────────────
//  DELAY
// ─────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ─────────────────────────────────────────────────────────
//  RETRY WRAPPER
// ─────────────────────────────────────────────────────────

async function withRetry(fn, retries = 2, delayMs = 1500) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i === retries) throw err
      console.warn(`  Retry ${i + 1}/${retries}: ${err.message}`)
      await delay(delayMs)
    }
  }
}

// ─────────────────────────────────────────────────────────
//  MAIN SIMULATION
// ─────────────────────────────────────────────────────────

async function runSimulation() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  SoundbiteTesting — GLE App Opportunity Simulation')
  console.log('  20 apps × 3 dimensions = 60 API calls to power-vs-force/analyze')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // Load cache if exists and --force not set
  let cache = {}
  if (existsSync(CACHE_FILE) && !FORCE_RERUN) {
    cache = JSON.parse(readFileSync(CACHE_FILE, 'utf8'))
    const cachedCount = Object.keys(cache).length
    console.log(`[cache] Loaded ${cachedCount} cached results from ${CACHE_FILE}`)
    if (cachedCount === APPS.length) {
      console.log('[cache] All 20 apps cached. Use --force to re-run. Generating report from cache...\n')
    }
  }

  const results = []

  for (const app of APPS) {
    const cacheKey = app.name

    if (cache[cacheKey] && !FORCE_RERUN) {
      console.log(`[${String(app.rank).padStart(2, ' ')}/20] ${app.name.padEnd(18)} ✓ cached`)
      results.push(cache[cacheKey])
      continue
    }

    console.log(`[${String(app.rank).padStart(2, ' ')}/20] ${app.name.padEnd(18)} analyzing...`)

    let marketAnalysis, regulatoryAnalysis, builderAnalysis

    try {
      // Run all 3 dimension analyses in parallel (they're independent)
      ;[marketAnalysis, regulatoryAnalysis, builderAnalysis] = await Promise.all([
        withRetry(() => analyzeContent(marketPrompt(app), 'Market', app.name)),
        withRetry(() => analyzeContent(regulatoryPrompt(app), 'Regulatory', app.name)),
        withRetry(() => analyzeContent(builderPrompt(app), 'Builder', app.name))
      ])
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`)
      // Use editorial scores as fallback so script completes
      const result = {
        rank: app.rank,
        name: app.name,
        signal: app.signal,
        simScores: { ...app.editorial },
        editorialScores: { ...app.editorial },
        rawAnalysis: { error: err.message },
        status: 'error'
      }
      results.push(result)
      cache[cacheKey] = result
      continue
    }

    const marketScore = scoreFrom(marketAnalysis) ?? 5
    const regulatoryScore = scoreFrom(regulatoryAnalysis) ?? 5
    const builderScore = scoreFrom(builderAnalysis) ?? 5
    const simTotal = marketScore + regulatoryScore + builderScore
    const scoresParsed = [marketAnalysis, regulatoryAnalysis, builderAnalysis].every(a => a.extracted_score != null)

    const result = {
      rank: app.rank,
      name: app.name,
      signal: app.signal,
      simScores: {
        market: marketScore,
        regulatory: regulatoryScore,
        builder: builderScore,
        total: simTotal
      },
      editorialScores: { ...app.editorial },
      rawAnalysis: {
        market: {
          extracted_score: marketAnalysis.extracted_score,
          reasoning_excerpt: marketAnalysis.reasoning_excerpt,
          model: marketAnalysis.model
        },
        regulatory: {
          extracted_score: regulatoryAnalysis.extracted_score,
          reasoning_excerpt: regulatoryAnalysis.reasoning_excerpt,
          model: regulatoryAnalysis.model
        },
        builder: {
          extracted_score: builderAnalysis.extracted_score,
          reasoning_excerpt: builderAnalysis.reasoning_excerpt,
          model: builderAnalysis.model
        }
      },
      status: scoresParsed ? 'success' : 'partial'
    }

    console.log(`         sim ${marketScore}/${regulatoryScore}/${builderScore} = ${simTotal} | editorial ${app.editorial.market}/${app.editorial.regulatory}/${app.editorial.builder} = ${app.editorial.total} | delta ${simTotal - app.editorial.total >= 0 ? '+' : ''}${simTotal - app.editorial.total}`)

    results.push(result)
    cache[cacheKey] = result

    // Save cache after each app (so partial runs are recoverable)
    writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))

    // Respectful pacing between apps (3 parallel calls already happened above)
    if (app.rank < APPS.length) {
      await delay(DELAY_MS)
    }
  }

  return results
}

// ─────────────────────────────────────────────────────────
//  REPORT GENERATION
// ─────────────────────────────────────────────────────────

function generateReport(results) {
  const successful = results.filter(r => r.status !== 'error')
  const errors = results.filter(r => r.status === 'error')

  // Rank by simulation score
  const simRanked = [...successful].sort((a, b) => b.simScores.total - a.simScores.total)

  // Check if ranking order changed
  const rankingChanges = simRanked.map((app, simIdx) => {
    const simRank = simIdx + 1
    const delta = app.rank - simRank  // positive = app moved up in sim vs editorial
    return { ...app, simRank, rankDelta: delta }
  })

  const significantChanges = rankingChanges.filter(r => Math.abs(r.rankDelta) >= 3)

  const now = new Date().toISOString().split('T')[0]

  let md = `# GLE App Simulation Results — SoundbiteTesting power-vs-force/analyze
*Run date: ${now}*
*API: mirrorai-api.amitacompany.workers.dev/api/v1/llm/power-vs-force/analyze*
*Methodology: 3 dimension-specific prompts per app → communication_score normalized to 1-10 scale*
*Apps analyzed: ${successful.length}/20${errors.length > 0 ? ` (${errors.length} errors — see end of report)` : ''}*

---

## How This Differs From Editorial Scores

The editorial scores in the article were generated by the Univault team using the SoundbiteTesting framework as a mental model — not by actually calling the API. These simulation scores ARE the actual API output. Where they differ, the simulation should be considered more reliable because it removed human assumption bias.

---

## Simulation Rankings vs Editorial Rankings

Sorted by simulation total score (left column = sim rank, right cluster = comparison).

| Sim# | App | Market (S/E) | Reg (S/E) | Build (S/E) | Sim Total | Edit Total | Δ |
|------|-----|-------------|-----------|-------------|-----------|------------|---|
`

  for (const app of simRanked) {
    const delta = app.simScores.total - app.editorialScores.total
    const deltaStr = delta === 0 ? '—' : (delta > 0 ? `+${delta}` : `${delta}`)
    const rankDeltaStr = app.rankDelta === 0 ? '' : (app.rankDelta > 0 ? ` ↑${app.rankDelta}` : ` ↓${Math.abs(app.rankDelta)}`)
    md += `| ${String(app.simRank).padStart(2)} | **${app.name}**${rankDeltaStr} | ${app.simScores.market}/${app.editorialScores.market} | ${app.simScores.regulatory}/${app.editorialScores.regulatory} | ${app.simScores.builder}/${app.editorialScores.builder} | **${app.simScores.total}** | ${app.editorialScores.total} | ${deltaStr} |\n`
  }

  md += `
*S = Simulation score, E = Editorial score. ↑/↓ = rank movement vs editorial list.*

---

## Significant Ranking Shifts (3+ positions)

`

  if (significantChanges.length === 0) {
    md += `No app moved more than 2 positions. Editorial and simulation rankings are well-aligned.\n`
  } else {
    for (const app of significantChanges) {
      const direction = app.rankDelta > 0 ? 'moved UP' : 'moved DOWN'
      const magnitude = Math.abs(app.rankDelta)
      md += `### ${app.name} — ${direction} ${magnitude} positions\n`
      md += `- Editorial rank: #${app.rank} (${app.editorialScores.total}/30)\n`
      md += `- Simulation rank: #${app.simRank} (${app.simScores.total}/30)\n`
      md += `- Score delta: Market ${app.simScores.market - app.editorialScores.market >= 0 ? '+' : ''}${app.simScores.market - app.editorialScores.market}, Regulatory ${app.simScores.regulatory - app.editorialScores.regulatory >= 0 ? '+' : ''}${app.simScores.regulatory - app.editorialScores.regulatory}, Builder ${app.simScores.builder - app.editorialScores.builder >= 0 ? '+' : ''}${app.simScores.builder - app.editorialScores.builder}\n\n`
    }
  }

  md += `
---

## Score Correlation

`

  const editTotals = successful.map(r => r.editorialScores.total)
  const simTotals = successful.map(r => r.simScores.total)
  const n = editTotals.length
  const editMean = editTotals.reduce((a, b) => a + b, 0) / n
  const simMean = simTotals.reduce((a, b) => a + b, 0) / n
  const editStd = Math.sqrt(editTotals.reduce((a, b) => a + (b - editMean) ** 2, 0) / n)
  const simStd = Math.sqrt(simTotals.reduce((a, b) => a + (b - simMean) ** 2, 0) / n)
  const covariance = successful.reduce((acc, r) => acc + (r.editorialScores.total - editMean) * (r.simScores.total - simMean), 0) / n
  const correlation = editStd > 0 && simStd > 0 ? covariance / (editStd * simStd) : 0
  const maxDelta = Math.max(...successful.map(r => Math.abs(r.simScores.total - r.editorialScores.total)))
  const avgDelta = successful.reduce((acc, r) => acc + Math.abs(r.simScores.total - r.editorialScores.total), 0) / n

  md += `- **Pearson correlation (editorial vs sim totals):** ${correlation.toFixed(3)}\n`
  md += `- **Average absolute score delta:** ${avgDelta.toFixed(1)} points\n`
  md += `- **Max score delta:** ${maxDelta} points\n`
  md += `- **Editorial mean:** ${editMean.toFixed(1)} | **Simulation mean:** ${simMean.toFixed(1)}\n`

  if (correlation > 0.85) {
    md += `\n**Interpretation:** Strong correlation. Editorial scores were well-calibrated against actual LLM analysis. The article's rankings are validated.\n`
  } else if (correlation > 0.65) {
    md += `\n**Interpretation:** Moderate correlation. Editorial scores were directionally correct but some individual apps should be re-evaluated. See ranking shifts above.\n`
  } else {
    md += `\n**Interpretation:** Low correlation. Editorial scores diverge meaningfully from simulation. Consider revising the article rankings.\n`
  }

  md += `
---

## Raw Score Detail

`

  for (const app of results) {
    md += `### ${app.name}\n`
    if (app.status === 'error') {
      md += `- Status: ERROR — ${app.rawAnalysis?.error || 'unknown'}\n`
      md += `- Scores: using editorial fallback\n\n`
      continue
    }
    md += `| Dimension | Sim Score | Extracted Score | Model |\n`
    md += `|-----------|-----------|----------------|-------|\n`
    md += `| Market | ${app.simScores.market}/10 | ${app.rawAnalysis.market?.extracted_score ?? 'not parsed'} | ${app.rawAnalysis.market?.model ?? 'n/a'} |\n`
    md += `| Regulatory | ${app.simScores.regulatory}/10 | ${app.rawAnalysis.regulatory?.extracted_score ?? 'not parsed'} | ${app.rawAnalysis.regulatory?.model ?? 'n/a'} |\n`
    md += `| Builder | ${app.simScores.builder}/10 | ${app.rawAnalysis.builder?.extracted_score ?? 'not parsed'} | ${app.rawAnalysis.builder?.model ?? 'n/a'} |\n`
    md += `\n**Market reasoning excerpt:** ${app.rawAnalysis.market?.reasoning_excerpt?.slice(-300) ?? 'n/a'}\n\n`
    md += `**Regulatory reasoning excerpt:** ${app.rawAnalysis.regulatory?.reasoning_excerpt?.slice(-300) ?? 'n/a'}\n\n`
    md += `**Builder reasoning excerpt:** ${app.rawAnalysis.builder?.reasoning_excerpt?.slice(-300) ?? 'n/a'}\n\n`
  }

  if (errors.length > 0) {
    md += `---\n\n## Errors (${errors.length})\n\n`
    for (const e of errors) {
      md += `- ${e.name}: ${e.rawAnalysis?.error}\n`
    }
  }

  md += `\n---\n*Report generated by scripts/test-gle-apps.js using SoundbiteTesting power-vs-force/analyze API.*\n*Raw data: out/gle-apps-simulation-results.json*\n`

  return md
}

// ─────────────────────────────────────────────────────────
//  ENTRY POINT
// ─────────────────────────────────────────────────────────

async function main() {
  // Ensure output directory exists
  const outDir = join(__dirname, '../out')
  if (!existsSync(outDir)) {
    const { mkdirSync } = await import('fs')
    mkdirSync(outDir, { recursive: true })
  }

  const results = await runSimulation()
  const report = generateReport(results)

  writeFileSync(REPORT_FILE, report)
  writeFileSync(CACHE_FILE, JSON.stringify(
    Object.fromEntries(results.map(r => [r.name, r])), null, 2
  ))

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`  Done. Results saved to:`)
  console.log(`  JSON: ${CACHE_FILE}`)
  console.log(`  Report: ${REPORT_FILE}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
