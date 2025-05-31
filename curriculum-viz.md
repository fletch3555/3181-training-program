---
layout: default
title: Curriculum Prerequisites Visualization
---

# Curriculum Prerequisites Visualization

## Module Dependencies
```mermaid
graph TD
    CAD[CAD]
    MECH[Mechanical]
    MANU[Manufacturing]
    ELEC[Electrical]
    PROG[Programming]
    PM[Project Management]
    LEAD[Leadership]
    BUS[Business]

    MECH --> MANU
    ELEC --> PROG
    PM --> LEAD
    PM --> BUS
```

## Level Dependencies by Module

### CAD Level Prerequisites
```mermaid
graph TD
    CAD1[Level 1: CAD Fundamentals]
    CAD2[Level 2: Part Design & Assembly]
    CAD3[Level 3: Robot Subsystem Design]
    CAD4[Level 4: Full Robot Integration]
    MECH2[Mechanical Level 2]
    PM2[Project Management Level 2]

    CAD1 --> CAD2
    CAD2 --> CAD3
    MECH2 --> CAD3
    CAD3 --> CAD4
    PM2 --> CAD4
```

### Mechanical Level Prerequisites
```mermaid
graph TD
    MECH1[Level 1: Basic Mechanical Concepts]
    MECH2[Level 2: Mechanism Design & Analysis]
    MECH3[Level 3: Advanced Systems & Analysis]
    MECH4[Level 4: System Leadership & Innovation]
    CAD2[CAD Level 2]
    PM2[Project Management Level 2]

    MECH1 --> MECH2
    MECH2 --> MECH3
    CAD2 --> MECH3
    MECH3 --> MECH4
    PM2 --> MECH4
```

### Manufacturing Level Prerequisites
```mermaid
graph TD
    MANU1[Level 1: Shop Safety & Basic Tools]
    MANU2[Level 2: Power Tools & Basic Machining]
    MANU3[Level 3: Advanced Machining & Fixtures]
    MANU4[Level 4: Manufacturing Leadership]
    MECH2[Mechanical Level 2]
    CAD2[CAD Level 2]
    PM2[Project Management Level 2]

    MANU1 --> MANU2
    MANU2 --> MANU3
    MECH2 --> MANU3
    MANU3 --> MANU4
    CAD2 --> MANU4
    PM2 --> MANU4
```

### Electrical Level Prerequisites
```mermaid
graph TD
    ELEC1[Level 1: Electrical Fundamentals]
    ELEC2[Level 2: FRC Electrical Systems]
    ELEC3[Level 3: Advanced Control Systems]
    ELEC4[Level 4: Electrical Leadership & Innovation]
    PROG2[Programming Level 2]
    PM2[Project Management Level 2]

    ELEC1 --> ELEC2
    ELEC2 --> ELEC3
    PROG2 --> ELEC3
    ELEC3 --> ELEC4
    PM2 --> ELEC4
```

### Programming Level Prerequisites
```mermaid
graph TD
    PROG1[Level 1: Programming Fundamentals]
    PROG2[Level 2: Robot Systems Programming]
    PROG3[Level 3: Advanced Control & Vision]
    PROG4[Level 4: Software Architecture & Leadership]
    ELEC1[Electrical Level 1]
    MECH2[Mechanical Level 2]
    PM2[Project Management Level 2]

    PROG1 --> PROG2
    ELEC1 --> PROG2
    PROG2 --> PROG3
    MECH2 --> PROG3
    PROG3 --> PROG4
    PM2 --> PROG4
```

### Project Management Level Prerequisites
```mermaid
graph TD
    PM1[Level 1: Personal Organization]
    PM2[Level 2: Team Coordination]
    PM3[Level 3: Strategic Management]
    PM4[Level 4: Executive Leadership]
    TECH2[Any Technical Level 2+]
    LEAD2[Leadership Level 2]

    PM1 --> PM2
    PM2 --> PM3
    TECH2 --> PM3
    PM3 --> PM4
    LEAD2 --> PM4
```

### Leadership Level Prerequisites
```mermaid
graph TD
    LEAD1[Level 1: Personal Leadership]
    LEAD2[Level 2: Team Leadership]
    LEAD3[Level 3: Organizational Leadership]
    LEAD4[Level 4: Transformational Leadership]
    PM2[Project Management Level 2]
    PM3[Project Management Level 3]

    LEAD1 --> LEAD2
    LEAD2 --> LEAD3
    PM2 --> LEAD3
    LEAD3 --> LEAD4
    PM3 --> LEAD4
```

### Business Level Prerequisites
```mermaid
graph TD
    BUS1[Level 1: Business Fundamentals]
    BUS2[Level 2: Strategic Planning]
    BUS3[Level 3: Advanced Business Management]
    BUS4[Level 4: Executive Business Leadership]
    LEAD2[Leadership Level 2]
    PM3[Project Management Level 3]

    BUS1 --> BUS2
    BUS2 --> BUS3
    LEAD2 --> BUS3
    BUS3 --> BUS4
    PM3 --> BUS4
```
