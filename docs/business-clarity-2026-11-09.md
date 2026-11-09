# SundAI service and founder update — 9 November 2026

Visitors now start with four business needs: Business Automation, AI Assistants, Cybersecurity, and AI Governance & Training. Existing technical services remain available under these areas, and their URLs are preserved. The English, Danish, and Swedish homepages, services hubs, About pages, and common navigation use the same structure.

The homepage uses outcome-first copy, three delivery steps, a consistent introductory-call route, and the founder’s original portrait. Recruitment remains accessible in the footer. Articles retain their own hub and menu entry. Prices, contract terms, API behavior, and existing contact/guide integrations are unchanged.

## Evidence and editorial choices

This implements the approved SundAI direction in the 7 November brand playbook. Ariel’s Pizza is identified as the founder’s own business, based on the existing project account and one-pager; no independently measured commercial outcome is claimed. SundAI’s own platform is a separate engineering example linked to its public code, with the limits of mocked tests stated. No unverified client case, team-size claim, press coverage, qualification, LinkedIn URL, or video was added. Existing owner-supplied testimonials were preserved rather than independently authenticated. The original founder portrait was reused without alteration.

## Validation before publication

- Static build regenerated 198 pages successfully.
- All 114 Node tests passed, with no failures or skipped tests.
- All 60 remaining Node commands in the site CI workflow passed, including syntax, link, accessibility-related markup, responsive structure, security and commercial-flow checks.
- Browser review covered desktop home and services, mobile home/services/About and Danish booking/Swedish navigation, plus a tablet services view. Sampled 360/390/768-pixel frames had no horizontal overflow.
- The automated contact and guide tests use mocks; no new real email submission or inbox-delivery test was performed.

Live deployment and post-publication checks are reported in the associated pull request and delivery response.
