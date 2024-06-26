---
index: 0
name: SRHR Hubs Toronto
short_name: SRHR Hubs
url: https://srhrmap.ca
role: Full Stack Developer
term: September 2022 – March 2023
skills:
  - react
  - nextjs
  - django
mockups:
  laptop: /portfolio/dev/srhr/SRHRLandingDesktop.png
  mobile: /portfolio/dev/srhr/SRHRSearchFilterMobile.png
  tablet: /portfolio/dev/srhr/SRHRMapAccessibilityTablet.png
blurb: |
  Full-stack development and maintenance of the Community Map project website, an interactive directory and mapping system of community resources for people with sexual and reproductive advocacy needs in Ontario and beyond.
published: true
frontmatter:
  - Sector: Sex and gender advocacy
  - Platforms:
    - Responsive web
  - Tools used:
    - Figma
    - NextJS
    - Django REST Framework
    - Meilisearch
---

## Summary
In late 2022, I engaged with the youth-led SRHR Hubs Toronto to be the lead developer of the Community Maps project, an interactive online directory of resources and services. As of February 2023, the site is live at [srhrmap.ca](https://srhrmap.ca) and is currently in beta.

I worked closely with the incredibly talented [Rebecca Zhong](https://www.rebeccazhong.com/srhr-hubs), a fellow alum of the Faculty of Information, who designed much of the UI/UX.

## Goals
In the planning phase of the project, two 'killer' features were identified: the onsite interactive map, and the ability to search SRHR resources using a fine-grained set of attributes. Before my joining, the SRHR Hubs team had compiled a gigantic Excel spreadsheet of more than 500 researched resources, as well as an early draft of what would later become the tag categorization system.

### Guiding principles
From the get-go, the Human-Centred Design principles I learned in the Bachelor of Information proved useful. This training afforded a common language and methodology between myself and Becky, including the creation of three representative user tasks, which I paraphrase below:

1. I can find sexual health resources that fit my needs in **just one search**.
2. I can find parenting support groups, both in-person and online, in **3 clicks or fewer**.
3. I can find services offering contraceptives **anonymously and at no personal cost**.

My technical implementation of the project was furthermore guided by two important principles: **accessibility** and **safety**. To accomplish the prior, I aimed to have the entire site be *at least* conformant to [WCAG 2 WAI-AA](https://www.w3.org/WAI/WCAG2AA-Conformance), a popular standard for device accessibility. I used CI tools like [`axe`](https://www.npmjs.com/package/@axe-core/react) that threw errors if I commited any accessibility 'code smells' along the way, and included important keyboard-navigation components like a tabbable "Skip to Content" popup on every page.

As for safety, I'll be the first to admit that I am by no means an expert on gender-based violence, nor on relevant safety measures. However, through SRHR Hubs, I was able to access a wealth of literature and community feedback on the subject. One persistent feature across the site is a "Get out quick" button which, when pressed, immediately replaces the tab with a more innocuous website.

## The stack
### Backend: Django
Because I would not be the primary operator of the resource database, the inclusion of a good CMS was crucial for post-handoff usability. Although I used an early sketch to explore Strapi, I experienced difficulty wrapping my head around how it handled the many M:N relationships that I knew the database would require (for, e.g., service tags). So, before long, I relied on an old faithful in Django. I truly don't know of another backend tool quite like it: you get a beautiful, usable UI over your backend from the get-go, and extremely well-documented tools like Django REST Framework make setting up connection points to the rest of the stack a breeze.

### Frontend: NextJS
Owing to budget limitations, an original constraint on the site's design was limiting the amount of dedicated server space (read: cost) that the app would require. So, given that I am most accustomed to building high-quality frontends in React, I believed that using NextJS' first-class support for Static Site Generation (SSG) would allow us to maximize the amount of rendering done on pre-compute, as well as give the site an edge in much-needed SEO.

This limitation was, thankfully, later alleviated, and we chose [Fly](https://fly.io) as our hosting provider. However, Next stuck around. As of writing, the overwhelming majority of the site is statically rendered – excluding, e.g., the map itself – but having access to server-side resources and, potentially, free frontend API routes will serve to be very helpful in future.

### Search: Meilisearch
I first heard about [Meilisearch](https://www.meilisearch.com/), an open-source high-performance text search engine, from a conference talk I was watching on YouTube in the background while doing other things. But, its features and performance benefits were interesting enough to draw my attention, and I eventually settled on using it for this search-intensive project.

A core principle of Meilisearch is maintaining a lightweight, indexed database of searchable items. Within my Django API, a custom hook exists to serialize service models into simplified JSON objects, then to clear and re-populate the Meilisearch database with the latest data. Because the actual Meilisearch server can almost exclusively be interacted with via its REST API (or language bindings on top of it), the only way to configure indices in the database is via sending a config JSON object. So, I wrote an admin-only view in the Django admin site with an inline JSON editor that allows me to view and configure these settings, then send the latest version to Meilisearch on save. This editor can also be extended to pull in advanced search criteria, such as synonymy (notably, 'the pill' for oral contraceptives and the like).

Every major part of this stack, alongside the PostgreSQL provision I hardly ever touch manually, is served on Fly in its own Docker container. Fly claims to have powerful internal networking capabilities over IPv6, but I've struggled tremendously to get these to work effectively.

This has been a very brief overview of the engineering *choices* made to create the Community Maps site: I would strongly recommend checking out Rebecca Zhong's post, above, to learn more about the UX research and feedback that has shaped the site's design and usability over its lifetime.