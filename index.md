---
layout: libdoc_page
title: FRC Team Training Curriculum
description: A comprehensive training program for FIRST Robotics Competition teams
category: Overview
order: 1
---

# FRC Team Training Curriculum

Welcome to the FRC Team Training Curriculum! This comprehensive program is designed to develop both technical and non-technical skills essential for success in FIRST Robotics Competition.

## Technical Skills

These modules focus on the hands-on, technical aspects of robot design and construction:

{% for m in modules %}
{% if m.moduleType == "Technical" %}
{% capture moduleLink %}/docs/{{ m.slug }}/{% endcapture %}
{% include "docs_module.html", title: m.name, description: m.description, link: moduleLink, level: m.moduleType %}
{% endif %}
{% endfor %}

## Non-Technical Skills

These modules develop the organizational and soft skills crucial for team success:

{% for m in modules %}
{% if m.moduleType == "Non-Technical" %}
{% capture moduleLink %}/docs/{{ m.slug }}/{% endcapture %}
{% include "docs_module.html", title: m.name, description: m.description, link: moduleLink, level: m.moduleType %}
{% endif %}
{% endfor %}

## Implementation Guidelines

### Assessment and Tracking
- **Individual Progress Tracking:** Each student maintains a personal checklist tracking progress through each level
- **Mentor Review:** All level completions require mentor verification and sign-off
- **Peer Assessment:** Include peer review components for leadership and communication tasks
- **Portfolio Development:** Students maintain portfolios documenting learning and achievements

### Prerequisites and Pathways
- **Flexible Pathways:** Students can work on multiple modules based on interest and aptitude
- **Cross-Module Integration:** Advanced tasks require coordination across multiple disciplines
- **Prerequisite Enforcement:** Students must have foundational skills before advancing
- **Accelerated Paths:** Advanced students may skip levels with demonstrated competency

[Get Started with CAD →](/docs/cad/)