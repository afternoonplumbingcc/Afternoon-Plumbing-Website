---
name: afternoon-plumbing-aeo-faq
description: Optimize FAQ content for Answer Engine Optimization (AEO) for Afternoon Plumbing and similar local-service websites. Use when creating or improving FAQ sections, FAQ schema, AI Overview-friendly answers, voice-search-friendly responses, or service/location FAQs for real business content.
---

Use this skill to turn real FAQ content into stronger AEO-friendly website content without producing generic FAQ sludge.

## Primary Goal
Create FAQ content that is:
- useful to real customers
- clear and direct for AI/answer engines
- credible for local service businesses
- easy to implement on a website
- aligned with authentic business information only

## Do Not Do
- Do not invent fake jobs, fake reviews, fake service stories, fake policies, or fake service areas.
- Do not create bloated FAQ sections filled with repetitive fluff.
- Do not over-optimize with robotic keyword stuffing.
- Do not produce vague answers that sound generic or noncommittal.
- Do not create giant FAQ blocks when 3 to 6 strong questions would be better unless the user explicitly wants a richer, interview-built FAQ set.

## Best Use Cases
Use this skill for:
- homepage FAQ sections
- services page FAQ sections
- service detail page FAQs
- local service FAQs (e.g. Westminster plumbing questions)
- water heater, well pump, water treatment, leak, drain, and fixture FAQs
- JSON-LD FAQ schema generation
- question cluster development from real customer concerns
- interview-style FAQ building from the owner's own words

## Page-Type Modes (Critical)
Choose the correct mode before generating FAQs.

### Homepage FAQ mode
Use for broad trust and homeowner guidance questions.
Best for:
- service area
- estimates
- emergency help
- customer-supplied fixtures
- what types of work the company handles

### Services page FAQ mode
Use for broader service-hub questions.
Best for:
- what services are offered
- whether a problem fits one of the listed services
- estimate/scheduling expectations
- service area fit

### Service detail page FAQ mode
Use for one specific service only.
Best for:
- repair vs replacement
- urgency
- fit for the problem
- estimate expectations
- local service fit

### Contact page micro-FAQ mode
Use for short practical trust questions.
Best for:
- estimates
- call response expectations
- service area confirmation
- customer-supplied equipment/fixtures

### Project/job page FAQ mode
Use carefully and sparingly.
Best for:
- whether the page needs FAQ at all
- only 2 or 3 supporting questions if truly useful
- often the right answer is to skip FAQ entirely

## Output-Length Rules
Use these defaults unless the user asks for a richer build.
- Homepage FAQ: 4 to 6 questions
- Services page FAQ: 3 to 5 questions
- Service detail page FAQ: 4 to 6 questions
- Contact page micro-FAQ: 2 to 4 questions
- Project/job page FAQ: 0 to 3 questions

If interview mode is active and the user wants a richer section, you may go beyond these ranges, but only when the content remains genuinely useful.

## Question Quality Filter (Critical)
Before finalizing any question, check:
- Is this a question a real homeowner would actually ask?
- Is this tightly relevant to the page intent?
- Is this redundant with another question?
- Does this help trust, clarity, or conversion?
- Is this specific enough to be useful?
- Does this sound natural, not machine-generated?

If the answer is weak, cut the question or rewrite it.

## Interview Mode (Critical)
When the user wants stronger, richer, or more authentic FAQ content, switch into **interview mode** instead of jumping straight to finished answers.

### Goal of interview mode
Create a content-rich FAQ section by asking the user targeted questions, refining their answers, and converting their real knowledge into better website FAQ content.

### Interview mode workflow
1. Identify the page/service the FAQ is for.
2. Ask a small batch of focused questions.
3. Wait for the user's answers.
4. Refine and follow up where needed.
5. Repeat until the answers are specific enough.
6. Turn the final material into polished FAQ content.

### Interview mode rules
- Ask concise, useful questions.
- Prefer small batches of 3 to 5 questions at a time.
- Use follow-up questions when answers are vague, generic, or incomplete.
- Pull out real-world details, not polished marketing fluff.
- Ask for examples, common scenarios, customer concerns, and how the business actually handles things.
- When the user gives partial answers, iterate instead of pretending the content is complete.
- If the user wants a richer FAQ section, prioritize depth and authenticity over speed.

### Interview prompts to use
For a service page, good interview questions include:
- What are the most common reasons customers call you for this service?
- What do customers usually misunderstand about this service?
- What makes someone call right away versus wait?
- What are the biggest factors that affect repair vs replacement?
- What questions do customers ask before they book?
- What do customers worry about most?
- What do you wish more customers knew before calling?
- Are there any service-area-specific issues you see often?

### Follow-up prompts to use
If the user gives short answers, follow up with prompts like:
- Can you give me a real example of that?
- What would you say to a customer asking that on the phone?
- What is the most common version of that problem?
- What usually changes the answer job to job?
- Is that something you want to state clearly on the site, or keep softer?

## 6-Step Workflow

### 1. Gather Source Content
Collect:
- existing FAQ questions/answers
- business/service context
- target page
- target service/location
- target platforms if relevant (Google AI Overviews, ChatGPT-style discovery, voice search)

If source information is missing, work from confirmed real business info already available. If still uncertain, say what needs confirmation.

### 2. Run an AEO Audit
Audit the FAQ set for:
- directness of the answer
- specificity
- authenticity
- local relevance
- service clarity
- readability
- schema readiness
- duplication/redundancy
- customer usefulness

Flag weak or generic questions and recommend cuts where needed.

### 3. Rewrite Each Q&A
Use this preferred answer format:
- start with a direct answer in roughly 40 to 60 words when practical
- then add brief supporting detail if needed
- use natural wording that sounds like a competent local business, not an SEO robot
- prefer concrete, specific answers over vague filler

### 4. Generate FAQ Schema Markup
When requested or useful, produce valid JSON-LD FAQ schema based on the final Q&A set.
Only include questions and answers that actually appear on the page or are intended for the page.

### 5. Add Optional Enhancements
When useful, suggest:
- page-specific FAQ placement
- AEO-friendly meta description wording
- internal links from answers to related service pages
- voice-friendly phrasing improvements
- people-also-ask style question gaps
- service/location-specific FAQ opportunities

### 6. Deliver Structured Output
Provide output in a clear format such as:
- FAQ audit summary
- revised Q&A set
- schema block
- implementation notes
- optional next-step opportunities

## Authenticity Classification
When useful, classify answer confidence as:
- **Confirmed**: directly supported by known business info or user-provided answers
- **Safe inference**: likely accurate but generalized from confirmed context
- **Needs confirmation**: should be checked before publishing

Prefer confirming uncertain business details rather than guessing.

## Afternoon Plumbing-Specific Guidance
For Afternoon Plumbing, prioritize FAQs that support:
- trust
- clear homeowner decision-making
- local relevance
- booked calls
- strong service understanding

Focus especially on:
- water heater replacement
- well pump repair/replacement
- water filtration / water treatment / softeners
- emergency leak questions
- customer-supplied fixture questions
- estimate and scheduling questions
- service area questions

## Local SEO / AEO Enrichment
Use local context naturally when appropriate:
- Westminster, MD
- Carroll County
- nearby communities already listed on the site
- homeowner-style questions people in the service area would ask

Do not force city names unnaturally into every answer.
Natural local relevance is better than obvious stuffing.

## Conversion-Aware FAQ Rules
Each FAQ set should reduce hesitation where possible.
Look for opportunities to clarify:
- whether the customer is on the right page
- whether the problem feels urgent
- whether estimate/scheduling is straightforward
- whether repair vs replacement is the likely path
- whether the service area is covered
- whether the company handles the job type confidently

FAQ content should help customers feel more comfortable calling.

## Service Pages (Critical)
For service pages, FAQ content should support the main service intent of the page instead of drifting into broad generic plumbing questions.

### Service-page FAQ goals
Each service-page FAQ should help the customer answer questions like:
- Do I have the right service page?
- Is this a repair or replacement situation?
- What affects timing, urgency, or estimate range?
- What happens next if I call?
- Do they serve my area and handle my type of problem?

### Service-page FAQ rules
- Keep the questions tightly related to the page service.
- Avoid adding broad off-topic plumbing questions just to make the section longer.
- Prefer 3 to 6 strong questions over 10 weak ones, unless the user explicitly wants a richer interview-built FAQ section.
- Use wording real homeowners might actually ask.
- When relevant, include local framing naturally (Westminster, Carroll County, nearby service area).
- Use FAQs to reduce hesitation and increase calls.

### Recommended service-page FAQ structure
For a service page, prefer questions from these categories:
1. **Does this service fit my problem?**
2. **Repair vs replacement**
3. **Timing / urgency**
4. **Estimate / visit expectations**
5. **Area served / job type fit**

## Example Service-Page FAQs

### Water Heater Page Example FAQs
- How do I know if my water heater needs replacement instead of repair?
- Can you replace a leaking water heater the same day?
- Do you install customer-supplied water heaters?
- What size water heater do I need for my home?
- Do you replace both gas and electric water heaters?

### Well Pump Page Example FAQs
- What causes a house to suddenly lose water from a well system?
- How do I know if the well pump is bad or if it is another part of the system?
- Do you handle low water pressure problems?
- When does a well pump need replacement instead of repair?
- Do you service well systems in Westminster and nearby areas?

### Water Treatment / Filtration Page Example FAQs
- What is the difference between a water softener and a whole-house water filter?
- How do I know if I need filtration, a softener, or both?
- Can you replace an old water treatment system with a newer one?
- Will a water treatment system help protect faucets, fixtures, and appliances?
- Do you install customer-supplied filtration equipment?

### Hose Bib / Exterior Plumbing Page Example FAQs
- When should a frost-free hose bib be replaced?
- Why does my outdoor faucet leak when I turn it on?
- Can a bad hose bib cause water damage inside the wall?
- Do you replace broken outdoor faucets with frost-free models?
- Do you handle exterior plumbing repairs in winter or after freeze damage?

## Sitewide FAQ Architecture Guidance
Avoid repeating the exact same questions everywhere.

### Homepage should cover
- broad trust questions
- general service area questions
- what kinds of work you handle
- estimate/scheduling basics

### Services page should cover
- how to choose the right service
- whether a problem fits one of the main service categories
- broad service-area and estimate expectations

### Service detail pages should cover
- service-specific questions only
- decision-making and urgency questions
- what to expect when calling for that service

### Contact page should cover
- very short practical questions only

### Project/job pages should usually
- skip FAQ unless a short supporting FAQ is genuinely useful

## Answer Style Examples

### Weak answer
"It depends on the situation and there are many factors involved."

### Better answer
"If your water heater is leaking from the tank itself, replacement is usually the better option. If the issue is isolated to a component like an element, thermostat, or valve, repair may still make sense depending on the age and condition of the unit."

### Weak answer
"Yes, we offer services in many different areas."

### Better answer
"Yes. Afternoon Plumbing serves Westminster and nearby Carroll County communities, including Manchester, Hampstead, Finksburg, New Windsor, Union Bridge, Sykesville, and surrounding service areas we already cover on the site."

## Schema Guidance
- Only generate FAQ schema for questions that appear on the final page.
- Do not create schema-only questions that users cannot see.
- Keep schema aligned with the final wording on the page.
- Prefer smaller, tighter, useful FAQ sets over inflated schema blocks.

## Implementation Examples

### Example FAQ HTML block
```html
<section class="faq-section">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-item">
    <h3>How do I know if my water heater needs replacement instead of repair?</h3>
    <p>If the tank itself is leaking, replacement is usually the better option. If the issue is limited to a part like an element, valve, or thermostat, repair may still make sense depending on the age and condition of the unit.</p>
  </div>
</section>
```

### Example FAQ accordion structure
```html
<div class="faq-item">
  <button class="faq-trigger" type="button">Do you install customer-supplied water heaters?</button>
  <div class="faq-panel">
    <p>Yes, in many cases. It depends on the unit, the install conditions, and whether the setup makes sense for the job.</p>
  </div>
</div>
```

### Example FAQ schema block
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you install customer-supplied water heaters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, in many cases. It depends on the unit, the install conditions, and whether the setup makes sense for the job."
      }
    }
  ]
}
```

## Quality Bar
Good FAQ output should:
- answer the question quickly
- sound human and local
- avoid overexplaining
- avoid fake certainty when something varies by job
- make implementation easy for the website
- improve both customer trust and search usefulness
- help customers feel more confident about calling

## Recommended Output Template

### FAQ Audit
- strengths
- weaknesses
- what to remove
- what to add

### Interview Findings
- customer concerns surfaced
- important details from owner responses
- what needs confirmation

### Revised FAQ
- Q1
- A1
- Q2
- A2

### FAQ Schema
- JSON-LD block when requested

### Implementation Notes
- where on the page it should go
- internal links to add
- follow-up FAQ ideas
- service-page-specific next questions to consider
