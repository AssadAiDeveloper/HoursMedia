import type { LocaleContent } from "./types";

export const en: LocaleContent = {
  services: {
    "website-design": {
      id: "website-design",
      group: "presence",
      label: "Website design & development",
      tagline:
        "Fast, accessible websites that explain what you do and turn visitors into enquiries.",
      meta: {
        title: "Website design & development",
        description:
          "Marketing websites and landing pages designed and built around clear messaging, speed and accessibility, then connected to the way you handle enquiries.",
      },
      problem: {
        heading: "The problem this solves",
        body: "Most business websites are either a brochure that never changes or a template that hides what makes you different. Neither handles the moment after a visitor decides they are interested.",
      },
      audience: {
        heading: "Who it suits",
        intro: "This is a good fit when:",
        items: [
          "your site is out of date, slow, or hard to edit",
          "your messaging does not make your offer obvious in a few seconds",
          "enquiries arrive by email and get lost",
          "you need a launch or campaign page in weeks, not months",
          "you want a site that connects to a CRM and booking flow",
        ],
      },
      deliverables: {
        heading: "Typical deliverables",
        items: [
          "structure and messaging for the key pages",
          "responsive design and a small, documented design system",
          "accessible, production-ready front-end build",
          "optimised images, fonts and metadata for search",
          "editable content structure",
          "contact, quote or booking flows wired to your backend",
        ],
      },
      notIncluded: {
        heading: "Not included by default",
        items: [
          "copywriting from scratch (we can structure and edit yours)",
          "photography, illustration or brand identity",
          "paid media spend and ad management",
          "ongoing content updates after handover",
          "third-party subscription costs",
        ],
      },
      approach: {
        heading: "How we work",
        steps: [
          {
            title: "Structure first",
            body: "We agree on the pages, the message order and the single action each page should drive before any pixels are drawn.",
          },
          {
            title: "Design in the browser",
            body: "We build real, responsive layouts early so decisions are made against the actual experience, not a static mockup.",
          },
          {
            title: "Build for speed and access",
            body: "Server-rendered content, optimised assets and semantic markup keep the site fast and usable with a keyboard or a screen reader.",
          },
          {
            title: "Connect it",
            body: "Forms, booking links and CRM handoff are wired up so a finished site actually captures and routes enquiries.",
          },
        ],
      },
      clientInputs: {
        heading: "What we need from you",
        items: [
          "access to your current domain and hosting",
          "existing brand assets and any approved imagery",
          "the key pages, offers and proof you want to show",
          "a decision-maker for structure and content sign-off",
        ],
      },
      demonstration: {
        heading: "A note on examples",
        note: "The layout examples on this site are design concepts created by HoursMedia. They are labelled as concepts and are not client results.",
        items: [
          "qualitative results are not measured or guaranteed",
          "no traffic, conversion or ranking figures are claimed",
        ],
      },
      faqs: [
        {
          q: "How long does a website take?",
          a: "A focused marketing site is typically a few weeks from approved structure to launch. The timeline depends on how quickly content and feedback come back.",
        },
        {
          q: "Can you work with our existing site?",
          a: "Sometimes. If the foundations are sound we may improve sections or add pages. If the technology is the problem we will say so and scope a rebuild.",
        },
        {
          q: "Do you guarantee search rankings?",
          a: "No. We build sites that are technically clean and fast to index, but no agency can honestly guarantee rankings or traffic.",
        },
      ],
      cta: {
        heading: "Planning a new website or a rebuild?",
        body: "Tell us what the site needs to do and we will respond with an approach and a proposal.",
      },
      related: ["custom-apps-ai", "gohighlevel-automation", "seo"],
    },
    "social-media": {
      id: "social-media",
      group: "presence",
      label: "Social media management",
      tagline:
        "A steady, on-brand presence you do not have to remember to run.",
      meta: {
        title: "Social media management",
        description:
          "Planning, production and scheduling of social content around a clear point of view, with a light process for review and approval.",
      },
      problem: {
        heading: "The problem this solves",
        body: "Social channels go quiet exactly when they would help most. Content is produced in bursts, in an inconsistent voice, with no plan for what each post is meant to achieve.",
      },
      audience: {
        heading: "Who it suits",
        intro: "Consider this when:",
        items: [
          "you post irregularly or from different people with different voices",
          "you have no calendar and no clear themes",
          "day-to-day operations leave no time to plan content",
          "you want a consistent presence without hiring in-house",
        ],
      },
      deliverables: {
        heading: "Typical deliverables",
        items: [
          "a content calendar built around a few clear themes",
          "written and designed posts for the agreed channels",
          "scheduling and a regular publishing rhythm",
          "a light reporting summary of what was published",
          "a documented tone of voice",
        ],
      },
      notIncluded: {
        heading: "Not included by default",
        items: [
          "paid promotion or ad buying",
          "community management outside agreed hours",
          "onsite filming or photography",
          "influencer or partnership management",
        ],
      },
      approach: {
        heading: "How we work",
        steps: [
          {
            title: "Agree the themes",
            body: "We define a few repeating themes so the channel has a consistent point of view instead of random posts.",
          },
          {
            title: "Produce in batches",
            body: "We produce content in batches and queue it, which keeps quality high and avoids last-minute posting.",
          },
          {
            title: "Review and approve",
            body: "You see the queue before it goes live so nothing is published that you have not approved.",
          },
          {
            title: "Review the rhythm",
            body: "We periodically review what was published and adjust themes, formats and cadence.",
          },
        ],
      },
      clientInputs: {
        heading: "What we need from you",
        items: [
          "channel access or a publishing role",
          "brand guidelines and approved imagery",
          "any legal or compliance constraints for your industry",
          "one person for approvals",
        ],
      },
      demonstration: null,
      faqs: [
        {
          q: "Do you write and design the posts?",
          a: "Yes. Copy and simple design are part of the agreed scope. Photography and video production are separate.",
        },
        {
          q: "Will you reply to comments and messages?",
          a: "Community management is only included if we agree specific hours and a response protocol in the scope.",
        },
        {
          q: "Can you guarantee followers or virality?",
          a: "No. Followers and reach depend on many factors. We focus on a consistent, on-brand presence, not vanity guarantees.",
        },
      ],
      cta: {
        heading: "Want a consistent presence?",
        body: "Share your channels and goals and we will propose a realistic publishing rhythm.",
      },
      related: ["reputation-management", "seo", "paid-advertising"],
    },
    seo: {
      id: "seo",
      group: "presence",
      label: "SEO services",
      tagline:
        "Technical and content work that helps the right pages get found, described honestly.",
      meta: {
        title: "SEO services",
        description:
          "Technical SEO, on-page structure and content planning to help search engines understand your site. No ranking guarantees, no keyword stuffing, no thin pages.",
      },
      problem: {
        heading: "The problem this solves",
        body: "Pages that should be found are not, because of indexing problems, weak structure, unclear intent coverage or content that answers no one's question.",
      },
      audience: {
        heading: "Who it suits",
        intro: "This is relevant when:",
        items: [
          "you have content but little visibility in search",
          "your site has technical indexing or performance issues",
          "you want a clear plan instead of endless blog posts",
          "you are launching and want the foundations right from the start",
        ],
      },
      deliverables: {
        heading: "Typical deliverables",
        items: [
          "a technical audit with prioritised fixes",
          "on-page structure and internal linking improvements",
          "a page-level keyword and intent map (labelled as hypotheses)",
          "content plans and briefs for pages that deserve to exist",
          "metadata, canonical, hreflang and structured data",
        ],
      },
      notIncluded: {
        heading: "Not included by default",
        items: [
          "link buying or any scheme that violates search guidelines",
          "guaranteed positions, traffic or revenue",
          "paid media",
          "content published under our name",
        ],
      },
      approach: {
        heading: "How we work",
        steps: [
          {
            title: "Technical first",
            body: "We fix what stops pages being crawled, rendered, indexed or fast before creating anything new.",
          },
          {
            title: "Map intent",
            body: "We map pages to questions and intents customers actually have, and label our ideas as hypotheses until we can see data.",
          },
          {
            title: "Improve, then create",
            body: "We improve existing pages before adding new ones, and only create pages that serve a real intent.",
          },
          {
            title: "Measure honestly",
            body: "We report what the data shows, separate lab from field, and avoid vanity metrics.",
          },
        ],
      },
      clientInputs: {
        heading: "What we need from you",
        items: [
          "read access to analytics and Search Console",
          "a list of services and markets you actually serve",
          "approval to publish or change pages",
          "a realistic timeframe for results",
        ],
      },
      demonstration: {
        heading: "On keyword ideas",
        note: "Any keyword list we produce is a starting hypothesis. We do not invent search volumes or difficulty scores and we validate ideas against real data first.",
        items: [
          "no fabricated search volumes or difficulty scores",
          "recommendations prioritised by effort and likely impact",
        ],
      },
      faqs: [
        {
          q: "How long until I see results?",
          a: "Technical fixes can help quickly; content and authority take months. We give a realistic timeframe rather than a promise.",
        },
        {
          q: "Do you do link building?",
          a: "We do not buy links or use schemes that go against search engine guidelines. We focus on content and technical quality.",
        },
        {
          q: "Will you write lots of content?",
          a: "No. We prioritise a smaller number of useful pages over thin pages built only to rank.",
        },
      ],
      cta: {
        heading: "Want a clear SEO plan?",
        body: "Send your site and market and we will outline what we would fix and why.",
      },
      related: ["website-design", "social-media", "paid-advertising"],
    },
    "paid-advertising": {
      id: "paid-advertising",
      group: "presence",
      label: "Paid advertising",
      tagline:
        "Paid campaigns built to send the right enquiries into a journey that follows up.",
      meta: {
        title: "Paid advertising",
        description:
          "Setup and management of paid search and social campaigns, connected to landing pages and a follow-up flow. Budgets, targeting and terms are agreed up front.",
      },
      problem: {
        heading: "The problem this solves",
        body: "Ad spend leaks when clicks land on a slow, unclear page and enquiries are never followed up. Paid traffic only works when the whole path is joined up.",
      },
      audience: {
        heading: "Who it suits",
        intro: "This makes sense when:",
        items: [
          "you have a proven offer and can handle more enquiries",
          "your landing pages and follow-up are ready",
          "you have a realistic monthly budget to learn from",
          "you can respond to enquiries quickly",
        ],
      },
      deliverables: {
        heading: "Typical deliverables",
        items: [
          "campaign structure and targeting plan",
          "ads and matching landing pages",
          "conversion tracking you can trust",
          "regular management and optimisation",
          "plain-language reporting on cost and outcomes",
        ],
      },
      notIncluded: {
        heading: "Not included by default",
        items: [
          "ad spend itself (paid directly to the platform)",
          "guaranteed return on ad spend",
          "creative production beyond agreed formats",
          "the product or offer itself",
        ],
      },
      approach: {
        heading: "How we work",
        steps: [
          {
            title: "Check the path",
            body: "Before spending, we make sure the landing page, tracking and follow-up are in place so budget is not wasted.",
          },
          {
            title: "Start small",
            body: "We begin with a contained test to learn what messages and audiences work before scaling spend.",
          },
          {
            title: "Optimise on data",
            body: "We adjust targeting, creative and budget decisions based on measured performance, not assumptions.",
          },
          {
            title: "Report clearly",
            body: "Reports state what was spent and what came back, including when results are disappointing.",
          },
        ],
      },
      clientInputs: {
        heading: "What we need from you",
        items: [
          "ad account access and billing",
          "an agreed monthly budget and target cost",
          "a landing page or approval to build one",
          "fast handling of inbound enquiries",
        ],
      },
      demonstration: null,
      faqs: [
        {
          q: "Do you guarantee a return?",
          a: "No. We manage campaigns responsibly and report honestly, but results depend on offer, market and budget.",
        },
        {
          q: "Is ad spend included in the fee?",
          a: "No. Ad spend is paid directly to the platform and is separate from our management fee.",
        },
        {
          q: "Which platforms do you use?",
          a: "Platforms are chosen per campaign and confirmed in the scope; we do not claim certifications we do not hold.",
        },
      ],
      cta: {
        heading: "Ready to run a campaign?",
        body: "Tell us your offer, market and budget and we will propose a plan.",
      },
      related: ["website-design", "seo", "reputation-management"],
    },
    "gohighlevel-automation": {
      id: "gohighlevel-automation",
      group: "operations",
      label: "GoHighLevel & automation",
      tagline:
        "CRM setup, pipelines and follow-up that make sure leads are not lost.",
      meta: {
        title: "GoHighLevel setup & CRM automation",
        description:
          "HighLevel configuration, sales pipelines, booking and follow-up automations, and integrations between your website and the way you actually manage customers.",
      },
      problem: {
        heading: "The problem this solves",
        body: "Leads arrive from several places and live in several inboxes. Without a pipeline and a follow-up routine, good enquiries go cold before anyone responds.",
      },
      audience: {
        heading: "Who it suits",
        intro: "This is worth it when:",
        items: [
          "enquiries come from more than one channel",
          "follow-up depends on someone remembering",
          "you cannot see where deals get stuck",
          "you use GoHighLevel and it is only partly configured",
        ],
      },
      deliverables: {
        heading: "Typical deliverables",
        items: [
          "account and location setup",
          "pipelines, stages and opportunity tracking",
          "calendar and booking configuration",
          "forms, follow-up and notification workflows",
          "website-to-CRM integration and lead routing",
          "team training notes so you can run it",
        ],
      },
      notIncluded: {
        heading: "Not included by default",
        items: [
          "HighLevel subscription fees",
          "telephony or SMS carrier costs",
          "sending bulk marketing without a lawful basis",
          "building a second CRM to duplicate HighLevel",
        ],
      },
      approach: {
        heading: "How we work",
        steps: [
          {
            title: "Model the journey",
            body: "We map how a lead currently arrives, who responds and where it should end up before configuring anything.",
          },
          {
            title: "Configure the core",
            body: "Pipelines, custom fields, calendars and forms are configured to match that journey.",
          },
          {
            title: "Automate follow-up",
            body: "We add follow-up and reminders that support your team rather than replacing judgement.",
          },
          {
            title: "Connect the website",
            body: "We connect your website forms to HighLevel through a secure, server-side integration.",
          },
        ],
      },
      clientInputs: {
        heading: "What we need from you",
        items: [
          "GoHighLevel account with appropriate access",
          "your pipeline stages and how you qualify a lead",
          "calendar, team and notification preferences",
          "a decision-maker for process changes",
        ],
      },
      demonstration: {
        heading: "Integration status",
        note: "Our HighLevel integration is built as a modular, server-side layer. It is implemented and unit-tested against mocked responses, and awaits account credentials before it is marked connected.",
        items: [
          "contacts, pipelines and calendars are modelled in code",
          "no live HighLevel account is connected in this build",
        ],
      },
      faqs: [
        {
          q: "Is HoursMedia an official HighLevel partner?",
          a: "No partnership or certification is claimed. We configure and integrate HighLevel as a customer, not as an official provider.",
        },
        {
          q: "Can you migrate our existing data?",
          a: "Migration is possible depending on what you have and where it lives. It is scoped as a separate piece of work.",
        },
        {
          q: "Will automation replace my team?",
          a: "No. We automate the repetitive parts (capture, routing, reminders) and keep humans in the decisions that need judgement.",
        },
      ],
      cta: {
        heading: "Get your follow-up under control",
        body: "Describe your current lead flow and we will sketch the pipeline and automations.",
      },
      related: ["reputation-management", "website-design", "custom-apps-ai"],
    },
    "reputation-management": {
      id: "reputation-management",
      group: "operations",
      label: "Reputation management",
      tagline:
        "Fair review requests and calm, consistent responses, never fake reviews.",
      meta: {
        title: "Reputation management",
        description:
          "Review request automations and response management that follow fair, compliant practices. We never remove genuine reviews or ask only happy customers for public ones.",
      },
      problem: {
        heading: "The problem this solves",
        body: "Reviews are asked for inconsistently, responses are rushed or emotional, and a handful of loud voices ends up telling the whole story.",
      },
      audience: {
        heading: "Who it suits",
        intro: "This matters when:",
        items: [
          "you get reviews but rarely respond",
          "you ask for reviews only when you remember",
          "you want a fair, consistent process, not just more stars",
          "feedback should be captured privately before it becomes public",
        ],
      },
      deliverables: {
        heading: "Typical deliverables",
        items: [
          "a fair review request flow after service is complete",
          "private feedback capture where appropriate",
          "guidelines and templates for responding",
          "monitoring across the profiles you choose",
          "a simple process for escalating serious issues",
        ],
      },
      notIncluded: {
        heading: "Not included by default",
        items: [
          "removal of genuine negative reviews (we cannot and will not)",
          "purchased or incentivised reviews",
          "requesting public reviews only from satisfied customers",
          "legal or crisis communications advice",
        ],
      },
      approach: {
        heading: "How we work",
        steps: [
          {
            title: "Ask fairly",
            body: "Every customer is invited to give feedback at the same point in the process, not just the ones you expect to be happy.",
          },
          {
            title: "Make space for private feedback",
            body: "Where appropriate, customers can raise issues privately first, giving you a chance to put things right.",
          },
          {
            title: "Respond with care",
            body: "We provide templates and guidelines so responses stay factual, calm and consistent.",
          },
          {
            title: "Watch the themes",
            body: "We summarise recurring themes from feedback, including the uncomfortable ones.",
          },
        ],
      },
      clientInputs: {
        heading: "What we need from you",
        items: [
          "access to the review profiles you want managed",
          "the touchpoints that mark 'service complete'",
          "a person who owns responses",
          "your policy on privacy and customer consent",
        ],
      },
      demonstration: {
        heading: "What we will not do",
        note: "We do not offer fake reviews, review gating that hides genuine criticism, or removal of legitimate negative reviews. Those practices mislead customers and can breach platform rules.",
        items: [
          "no fake or incentivised reviews",
          "no selective review gating",
        ],
      },
      faqs: [
        {
          q: "Can you remove a bad review?",
          a: "We cannot remove genuine reviews, and we do not try. We can help you respond well and respect the platform's legitimate reporting process for reviews that break its rules.",
        },
        {
          q: "Should we only ask happy customers?",
          a: "No. Asking only satisfied customers for public reviews is misleading. We invite everyone to give feedback.",
        },
        {
          q: "Which platforms?",
          a: "The profiles relevant to your business are agreed in the scope. We only claim support for platforms we actually configure.",
        },
      ],
      cta: {
        heading: "Build a fair reputation process",
        body: "Tell us which platforms matter and how you currently ask for feedback.",
      },
      related: ["gohighlevel-automation", "social-media", "custom-apps-ai"],
    },
    "custom-apps-ai": {
      id: "custom-apps-ai",
      group: "apps",
      label: "Custom apps & AI solutions",
      tagline:
        "Focused tools and portals when a spreadsheet or plugin has stopped being enough.",
      meta: {
        title: "Custom apps & AI solutions",
        description:
          "Client portals, internal tools and focused web applications, plus AI features for generating, classifying, summarising or retrieving content, with human review where it matters.",
      },
      problem: {
        heading: "The problem this solves",
        body: "Sometimes the work does not fit existing software: a client needs a portal, an internal process lives in fragile spreadsheets, or content work is repetitive enough to assist.",
      },
      audience: {
        heading: "Who it suits",
        intro: "A custom build is worth it when:",
        items: [
          "a process is important, repeated and currently manual",
          "clients need a branded, private space",
          "existing tools cannot be configured to fit",
          "content or response work is high-volume and repetitive",
        ],
      },
      deliverables: {
        heading: "Typical deliverables",
        items: [
          "a scoped, focused MVP with a clear definition of done",
          "client portals and internal dashboards",
          "custom integrations that extend existing systems",
          "AI features such as drafting, classification or summarisation, with human review where needed",
          "authentication and sensible data handling",
        ],
      },
      notIncluded: {
        heading: "Not included by default",
        items: [
          "AI that makes unrestricted business decisions",
          "promises of perfect accuracy",
          "large multi-year platforms",
          "free support in perpetuity",
        ],
      },
      approach: {
        heading: "How we work",
        steps: [
          {
            title: "Decide if it is needed",
            body: "If existing software can be configured to do the job, we will say so. Building is the last option, not the first.",
          },
          {
            title: "Define a small MVP",
            body: "We define the smallest useful version with a clear definition of done, so value arrives early.",
          },
          {
            title: "Build with review points",
            body: "Where AI is involved we make its role explicit and keep a human in the loop where the outcome matters.",
          },
          {
            title: "Handle data properly",
            body: "We define what data is processed, where it goes and which third parties are involved before launch.",
          },
        ],
      },
      clientInputs: {
        heading: "What we need from you",
        items: [
          "the process or workflow to improve, described plainly",
          "who will use it and how often",
          "any data, privacy or compliance constraints",
          "a decision-maker for scope",
        ],
      },
      demonstration: {
        heading: "On AI, honestly",
        note: "AI-assisted development is how we build bigger things faster. That is different from an AI-powered product feature. We only describe a feature as AI when the delivered product actually includes one, and we define its data handling before launch.",
        items: [
          "AI features are described by what they actually do",
          "human review is explicit where accuracy matters",
        ],
      },
      faqs: [
        {
          q: "Do we need AI at all?",
          a: "Often not. Many problems are solved better with a clearer process and better configuration. We suggest AI only when it earns its place.",
        },
        {
          q: "Is your development AI-powered?",
          a: "AI-assisted tooling speeds up our work, but that is not a product feature. We describe AI capabilities only when the delivered product contains them.",
        },
        {
          q: "How accurate will an AI feature be?",
          a: "No AI is perfectly accurate. We set expectations, add human review where decisions matter, and never present AI output as infallible.",
        },
      ],
      cta: {
        heading: "Have a process that deserves a tool?",
        body: "Describe the workflow and we will tell you honestly whether custom software is the right answer.",
      },
      related: ["gohighlevel-automation", "website-design", "reputation-management"],
    },
    "youtube-management": {
      id: "youtube-management",
      group: "content",
      label: "YouTube channel management",
      tagline:
        "A channel that publishes on a plan: scripts, edits, uploads and metadata handled end to end.",
      meta: {
        title: "YouTube channel management",
        description:
          "Ongoing management of a YouTube channel: a content calendar, scripts, titles, thumbnails, uploads and honest performance reviews.",
      },
      problem: {
        heading: "The problem this solves",
        body: "A channel that posts occasionally and without a plan builds little. Without one, titles and thumbnails underperform, uploads slip, and nothing ties back to what the business actually wants.",
      },
      audience: {
        heading: "Who it suits",
        intro: "Consider this when:",
        items: [
          "you have a channel but upload rarely or unpredictably",
          "you want video to generate enquiries, not just views",
          "there is no time to script, edit, upload and manage metadata",
          "you want one team to own the whole workflow",
        ],
      },
      deliverables: {
        heading: "Typical deliverables",
        items: [
          "a publishing plan tied to your business goals",
          "scripts and shot lists for agreed videos",
          "edits, titles, descriptions, tags and thumbnails",
          "scheduled uploads with correct metadata and SEO",
          "a periodic performance review with honest numbers",
        ],
      },
      notIncluded: {
        heading: "Not included by default",
        items: [
          "paid promotion on YouTube",
          "on-camera talent or studio hire",
          "live streaming or community moderation",
          "channel verification or appeals made on your behalf",
        ],
      },
      approach: {
        heading: "How we work",
        steps: [
          {
            title: "Plan backwards",
            body: "We agree the outcome (enquiries, subscribers, brand), then build a publishing plan around videos that can actually deliver it.",
          },
          {
            title: "Produce on cadence",
            body: "We script, edit and package videos in batches so the channel publishes consistently without last-minute gaps.",
          },
          {
            title: "Optimise every upload",
            body: "Titles, thumbnails, descriptions and metadata are treated as part of the design, not afterthoughts.",
          },
          {
            title: "Review honestly",
            body: "We report views, retention and conversions as they are, with no inflated numbers or vanity metrics.",
          },
        ],
      },
      clientInputs: {
        heading: "What we need from you",
        items: [
          "channel access with a manager role",
          "brand guidelines, logo and approved graphics",
          "access to your analytics",
          "a named person for approvals and on-camera decisions",
        ],
      },
      demonstration: null,
      faqs: [
        {
          q: "Do you appear on camera?",
          a: "No. We plan, script, edit and manage. On-camera talent is a separate decision.",
        },
        {
          q: "Can you guarantee subscribers?",
          a: "No. Subscribers depend on content, audience and time. We optimise what we control and report the results honestly.",
        },
        {
          q: "Do you also run ads on the channel?",
          a: "We can prepare the materials, but paid promotion is a separate service.",
        },
      ],
      cta: {
        heading: "Want a channel that publishes on purpose?",
        body: "Send your channel and goals and we will propose a realistic cadence and plan.",
      },
      related: ["video-design", "social-media", "seo"],
    },
    "video-design": {
      id: "video-design",
      group: "content",
      label: "Video design",
      tagline:
        "Videos that look intentional: social clips, shorts and on-brand motion, edited to one consistent style.",
      meta: {
        title: "Video design",
        description:
          "Design and editing of short-form video: social clips, YouTube-ready edits, captions, motion graphics and a consistent brand style.",
      },
      problem: {
        heading: "The problem this solves",
        body: "Video that feels thrown together stops people mid-scroll or gets skipped. Without a consistent style, captions, pacing and branding, even good footage looks unprofessional.",
      },
      audience: {
        heading: "Who it suits",
        intro: "This is relevant when:",
        items: [
          "you need short-form video for social or YouTube",
          "the footage exists but nothing is edited to a consistent style",
          "you want captions, motion graphics and brand styling handled",
          "you want edits delivered on a repeatable basis",
        ],
      },
      deliverables: {
        heading: "Typical deliverables",
        items: [
          "edits of social clips and YouTube-ready videos",
          "captions, animated subtitles and motion accents",
          "branded intros, end cards and lower thirds",
          "export formats for Instagram, TikTok, YouTube and Shorts",
          "a small set of reusable templates for your channel",
        ],
      },
      notIncluded: {
        heading: "Not included by default",
        items: [
          "filming or studio production",
          "voiceover recording",
          "channel management",
          "paid promotion",
        ],
      },
      approach: {
        heading: "How we work",
        steps: [
          {
            title: "Define the style",
            body: "We agree a visual style (pacing, captions, colour and motion) so every video looks like it came from the same place.",
          },
          {
            title: "Edit for retention",
            body: "We cut for attention, keep pacing tight and build a small hook at the start of every video.",
          },
          {
            title: "Design the details",
            body: "Captions, motion graphics and end screens are designed, not auto-generated.",
          },
          {
            title: "Deliver reusable",
            body: "We deliver formats that fit each platform and templates you can reuse without losing consistency.",
          },
        ],
      },
      clientInputs: {
        heading: "What we need from you",
        items: [
          "source footage or links to approved clips",
          "brand guidelines and approved graphics",
          "subtitles or scripts where they exist",
          "a named contact for review rounds",
        ],
      },
      demonstration: null,
      faqs: [
        {
          q: "Do you film or record the videos?",
          a: "No. We design and edit from your footage or from approved stock material.",
        },
        {
          q: "How many review rounds are included?",
          a: "Two review rounds are included in the scope; larger changes are quoted separately.",
        },
        {
          q: "Can you guarantee views or reach?",
          a: "No. We optimise editing and format for attention, but reach depends on the platform and audience.",
        },
      ],
      cta: {
        heading: "Want video that looks intentional?",
        body: "Share a few clips or a rough plan and we will propose an edit style and a practical scope.",
      },
      related: ["youtube-management", "social-media", "paid-advertising"],
    },
  },

  projects: [
    {
      id: "client-restorantna",
      slug: "restorantna-haarlem-website",
      title: "Restorantna Haarlem website",
      summary:
        "A multilingual website and online reservations for a halal Moroccan-Mediterranean restaurant in Haarlem.",
      kind: "client",
      year: "2026",
      tags: ["Website", "GoHighLevel", "Multilingual"],
      services: ["website-design", "seo", "social-media", "gohighlevel-automation"],
      challenge:
        "A halal restaurant in Haarlem wanted one clear, multilingual website with its menu, opening hours and online reservations.",
      approach:
        "We built a multilingual site (Dutch, English and Arabic) in GoHighLevel around the restaurant's menu and story, with online reservations, a search-friendly structure and support for its social content.",
      outcome:
        "A live multilingual website for the client. We publish no performance figures or results.",
      visualNote: "A screenshot of the client's live homepage.",
      image: "/projects/restorantna.webp",
      palette: "warm",
    },
    {
      id: "client-scnjm",
      slug: "scnjm-website",
      title: "SCNJM website",
      summary:
        "A bilingual website for a human-rights organisation working on the Middle East.",
      kind: "client",
      year: "2026",
      tags: ["Website", "SEO", "Bilingual"],
      services: ["website-design", "seo"],
      challenge:
        "A human-rights organisation wanted one clear, bilingual website to explain its work and publish news and reports.",
      approach:
        "We built a bilingual site (English and Arabic) around the organisation's programme areas, news and reports, with a search-friendly structure and clear navigation.",
      outcome:
        "A live bilingual website for the client. We publish no performance figures or results.",
      visualNote: "A screenshot of the client's live homepage.",
      image: "/projects/scnjm.webp",
      palette: "charcoal",
    },
    {
      id: "client-endless-hair",
      slug: "endless-hair-by-hasibe-website",
      title: "Endless Hair by Hasibe website",
      summary:
        "A bilingual website for a boutique hair salon in Heemskerk.",
      kind: "client",
      year: "2026",
      tags: ["Website", "SEO", "Bilingual"],
      services: ["website-design", "seo"],
      challenge:
        "A boutique salon needed a clear bilingual website that showed its services and prices and made getting in touch easy.",
      approach:
        "We designed and built a bilingual site (English and Dutch) around the salon's work: services, men's and women's prices, brands and opening hours, with a simple contact path and a search-friendly structure.",
      outcome:
        "A live bilingual website for the client. We publish no performance figures or results.",
      visualNote: "A screenshot of the client's live homepage.",
      image: "/projects/endless-hair.webp",
      palette: "gold",
    },
    {
      id: "client-iaf-accounting",
      slug: "iaf-accounting-website",
      title: "IAF Accounting BV website",
      summary:
        "A multilingual website for an Amsterdam accounting firm, built and maintained in GoHighLevel.",
      kind: "client",
      year: "2025",
      tags: ["Website", "GoHighLevel", "Social media"],
      services: ["website-design", "gohighlevel-automation", "social-media"],
      challenge:
        "An accounting firm wanted one clear, multilingual website and a single place to capture and follow up enquiries.",
      approach:
        "We built the site in GoHighLevel around the firm's services: financial administration, payroll and tax services, with a single enquiry form and English, Arabic and Dutch versions.",
      outcome:
        "A live website for the client. We publish no performance figures or results.",
      visualNote: "A screenshot of the client's live homepage.",
      image: "/projects/iaf-accounting-hero.webp",
      palette: "gold",
    },
    {
      id: "concept-clinic-journey",
      slug: "clinic-booking-follow-up-journey",
      title: "Clinic booking & follow-up journey",
      summary:
        "A designed journey from website enquiry through booking, reminders and a fair review request.",
      kind: "concept",
      year: "2026",
      tags: ["Journey mapping", "Booking", "Automation"],
      services: ["website-design", "gohighlevel-automation", "reputation-management"],
      challenge:
        "A clinic handled enquiries across three inboxes with no shared pipeline, so bookings were missed and reviews were never requested systematically.",
      approach:
        "We mapped one journey from first enquiry to post-visit follow-up: clear landing page, a single capture form, a pipeline with simple stages, appointment reminders and an even-handed feedback request.",
      outcome:
        "This is a design concept. It shows how we would structure the journey and the automations; it is not a client engagement and no performance figures are claimed.",
      visualNote:
        "The diagram shows the intended journey; it is illustrative only and not live customer data.",
      image: "/projects/clinic-journey.webp",
      palette: "warm",
    },
    {
      id: "concept-atelier-site",
      slug: "atelier-portfolio-website-concept",
      title: "Independent atelier website",
      summary:
        "An editorial-meets-product layout concept for a studio selling considered, high-value work.",
      kind: "concept",
      year: "2026",
      tags: ["Website", "Editorial layout", "Accessibility"],
      services: ["website-design"],
      challenge:
        "A studio's work is excellent but its old site buries the craft behind a generic template and slow load times.",
      approach:
        "We designed around strong typography and real detail shots, with a strict grid, restrained accents and a single clear enquiry action on every page.",
      outcome:
        "This is a self-initiated concept. It demonstrates layout, type and content sequencing; it is not real client work.",
      visualNote:
        "Shown as a layout composition rather than a live screenshot.",
      image: "/projects/atelier-site.webp",
      palette: "gold",
    },
    {
      id: "internal-ops-console",
      slug: "internal-client-console",
      title: "Internal client console",
      summary:
        "An internal tool concept for tracking client work, handovers and recurring deadlines in one place.",
      kind: "internal",
      year: "2026",
      tags: ["Custom app", "Internal tooling"],
      services: ["custom-apps-ai"],
      challenge:
        "Client status lived in spreadsheets and chat threads, so nobody had a reliable single view of what was due.",
      approach:
        "We prototyped a small authenticated console with clients, deliverables, owners and due dates, plus a plain weekly summary.",
      outcome:
        "This is an internal HoursMedia project, not client software. It demonstrates our approach to a focused MVP.",
      visualNote: "Illustrative interface; not connected to real data.",
      image: "/projects/internal-console.webp",
      palette: "charcoal",
    },
  ],

  articles: [
    {
      id: "website-is-half-a-journey",
      slug: "a-website-is-only-half-a-customer-journey",
      title: "A website is only half of a customer journey",
      summary:
        "The site captures attention, but the follow-up decides whether you win the work. Here is how the two should connect.",
      date: "2026-03-04",
      readingMinutes: 5,
      tags: ["Strategy", "CRM"],
      body: [
        {
          type: "p",
          text: "A website is often treated as the finish line. In practice it is the first handshake. What happens in the minutes and days after an enquiry decides whether it turns into a customer.",
        },
        { type: "h3", text: "The gap after the form" },
        {
          type: "p",
          text: "Most sites are built in isolation from the way enquiries are actually handled. The form posts an email, the email waits in a shared inbox, and the customer waits too. The better the website gets at generating interest, the more obvious the gap becomes.",
        },
        { type: "h3", text: "Connecting the two" },
        {
          type: "ul",
          items: [
            "capture the enquiry once, in one place",
            "route it to the right person immediately",
            "acknowledge the customer so they know it arrived",
            "give the team a simple pipeline so nothing is forgotten",
            "ask for feedback at the right moment, fairly",
          ],
        },
        {
          type: "quote",
          text: "The website's job is to make interest obvious. The system's job is to make sure that interest is never dropped.",
        },
        {
          type: "p",
          text: "None of this is exotic. It is a website, a pipeline and a few sensible automations, designed together instead of assembled by accident.",
        },
      ],
    },
    {
      id: "when-to-build-custom",
      slug: "when-a-custom-tool-is-worth-building",
      title: "When a custom tool is worth building, and when it is not",
      summary:
        "Custom software is expensive and permanent. Here is how we decide whether it is the right answer.",
      date: "2026-02-18",
      readingMinutes: 6,
      tags: ["Custom apps", "Decision"],
      body: [
        {
          type: "p",
          text: "The most expensive sentence in software is 'we will just build it'. Sometimes building is right. Often it is not.",
        },
        { type: "h3", text: "Signals that building makes sense" },
        {
          type: "ul",
          items: [
            "the process is important and repeated many times",
            "existing tools genuinely cannot be configured to fit",
            "the manual work costs more than the tool would",
            "there is a clear, small first version",
          ],
        },
        { type: "h3", text: "Signals to stop" },
        {
          type: "ul",
          items: [
            "the requirement is still changing weekly",
            "an off-the-shelf tool would do 90% of the job",
            "nobody owns the ongoing maintenance",
            "the first version has grown to include everything",
          ],
        },
        {
          type: "p",
          text: "We aim for a small MVP with a clear definition of done. If a process is better served by configuration, we will say so. Building is the last option, not the first.",
        },
      ],
    },
    {
      id: "fair-review-requests",
      slug: "review-requests-that-stay-fair",
      title: "Review requests that stay fair, and legal",
      summary:
        "More reviews should not mean gaming the system. A fair process earns trust and survives scrutiny.",
      date: "2026-01-29",
      readingMinutes: 4,
      tags: ["Reputation", "Ethics"],
      body: [
        {
          type: "p",
          text: "It is tempting to chase stars. But review practices that only surface happy customers, or that buy praise, eventually damage the very trust they were meant to build.",
        },
        { type: "h3", text: "What a fair process looks like" },
        {
          type: "ul",
          items: [
            "every customer is invited to give feedback at the same point",
            "issues can be raised privately before they escalate",
            "responses are calm, factual and consistent",
            "genuine negative reviews are never removed or hidden",
          ],
        },
        {
          type: "p",
          text: "We do not offer fake reviews, review gating or removal of legitimate criticism. Those practices mislead customers and can breach platform rules.",
        },
      ],
    },
  ],

  legal: {
    privacy: {
      title: "Privacy policy",
      metaDescription:
        "How HoursMedia collects, uses and protects personal data submitted through this website, including data shared with our CRM and processors.",
      updated: "2026-10-01",
      reviewed: false,
      intro:
        "This draft describes how personal data is handled across this website. It is prepared for the business to review and must not be treated as legal advice. Publication of these legal pages is blocked until the business confirms their accuracy.",
      sections: [
        {
          heading: "Who we are",
          blocks: [
            {
              type: "p",
              text: "The controller is the business operating this website. Legal entity name and registered address are not yet supplied and must be added before launch.",
            },
          ],
        },
        {
          heading: "What we collect",
          blocks: [
            {
              type: "ul",
              items: [
                "details you submit in the contact and project brief forms",
                "basic technical data needed to serve and secure the site",
                "analytics data, only where you consent",
              ],
            },
          ],
        },
        {
          heading: "Where it goes",
          blocks: [
            {
              type: "p",
              text: "Submitted details are stored on our server and, once configured, synchronised to a CRM (GoHighLevel) for follow-up. Named processors, hosting location and international transfer details must be confirmed before launch.",
            },
          ],
        },
        {
          heading: "Data flow",
          blocks: [
            {
              type: "ul",
              items: [
                "browser form → our server (validation, rate limiting)",
                "our server → durable submission store",
                "our server → CRM contact / opportunity (when configured)",
              ],
            },
          ],
        },
        {
          heading: "Retention and your rights",
          blocks: [
            {
              type: "p",
              text: "Retention periods and the process for access or deletion requests must be confirmed with the business. In the meantime, requests can be sent to the contact address on this site.",
            },
          ],
        },
      ],
    },
    cookies: {
      title: "Cookie policy",
      metaDescription:
        "The cookies and similar technologies this website uses, and how to change or withdraw your consent at any time.",
      updated: "2026-10-01",
      reviewed: false,
      intro:
        "This draft lists the categories of cookies used on this site. It is prepared for review and is not legal advice. Optional categories do not load until you allow them.",
      sections: [
        {
          heading: "Essential",
          blocks: [
            {
              type: "p",
              text: "Strictly necessary for the site to function, including remembering your language and your cookie choice. These cannot be switched off.",
            },
          ],
        },
        {
          heading: "Analytics",
          blocks: [
            {
              type: "p",
              text: "Optional. Used to understand how the site is used. These load only after you consent and can be withdrawn at any time.",
            },
          ],
        },
        {
          heading: "Advertising",
          blocks: [
            {
              type: "p",
              text: "Optional. Used only if advertising is active. Disabled by default.",
            },
          ],
        },
        {
          heading: "Changing your choice",
          blocks: [
            {
              type: "p",
              text: "You can reopen your cookie settings from the footer at any time.",
            },
          ],
        },
      ],
    },
    terms: {
      title: "Terms of use",
      metaDescription:
        "The terms that apply to using this website and the content published on it.",
      updated: "2026-10-01",
      reviewed: false,
      intro:
        "This draft sets out terms for using this website. It is prepared for review and is not legal advice. Final commercial terms are provided separately in project agreements.",
      sections: [
        {
          heading: "Use of this website",
          blocks: [
            {
              type: "p",
              text: "Content is provided for general information. Descriptions of services, examples and demonstrations are illustrative and do not form a contract or an offer.",
            },
          ],
        },
        {
          heading: "Demonstrations and concepts",
          blocks: [
            {
              type: "p",
              text: "Projects labelled as concept or internal are not client work and do not represent customer outcomes.",
            },
          ],
        },
        {
          heading: "Commercial terms",
          blocks: [
            {
              type: "p",
              text: "Actual pricing, deliverables and guarantees are set out in a written proposal or agreement, not on this website.",
            },
          ],
        },
        {
          heading: "No guarantees",
          blocks: [
            {
              type: "p",
              text: "No search ranking, traffic, revenue or other outcome is guaranteed. Any figures shown are illustrative unless explicitly stated otherwise.",
            },
          ],
        },
      ],
    },
  },
};
