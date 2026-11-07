---
title: "From RTL to Agentic AI: My First Onsite Experience"
description: What have I learnt so far and What problem am I working on?
pubDate: 2026-11-07
category: Engineering Notes
tags: [internship, technology, learning, startup]
---

Hi all,

As promised, I'm writing this blog to share a little about the work I'm doing and, more importantly, the things I'm learning at my internship. This is going to be a slightly technical one, so let's begin.

I joined [Zettabolt Technologies](www.zettabolt.com) this October as a Software Engineering Intern in the R&D department. Zettabolt is an IT and software development startup, founded in 2021, working as a chip-to-cloud company with a focus on EDA (Electronic Design Automation) and HPC (High Performance Computing).

I'm part of the EDA team, and I'm currently working on a project involving RTL Power Analysis and Optimization tools. I'll get to the details shortly, but first, let's understand what EDA actually is and why we need it.

## So, what is EDA?

EDA, or Electronic Design Automation (also sometimes referred to as ECAD, Electronic Computer-Aided Design), is a category of software tools, hardware systems, and methodologies used to design, simulate, verify, and prepare complex electronic systems for manufacturing. These systems range from printed circuit boards (PCBs) to integrated circuits (ICs).

But why do we need specialised software for this? Can't engineers simply design circuits themselves?

Well, consider this.

In 1965, Gordon Moore, co-founder of Intel, made an observation that the number of transistors incorporated into an IC would roughly double every two years. This observation became famously known as **Moore's Law**.

To appreciate the scale of this, imagine starting with just one transistor in 1965 and doubling that number every two years. By 2025, you would have more than a billion transistors! It gives us an idea of the scale we're dealing with.

Modern chips contain billions of transistors, interconnected in incredibly complex ways. Designing, analysing, testing, and manufacturing such systems manually is simply not humanly feasible. On top of that, the fact that the chip you design now will become somewhat irrelevant two years after, is also concerning and thus time-to-market becomes a cruical factor too. And that's where EDA tools come into the picture.

## A quick look at the chip design process

Before getting into my work, I think it would be useful to understand how a chip actually goes from an idea to a manufactured product.

The process is quite extensive, but here's a simplified overview of the major stages:

1. **Product Definition & Specification:** Product managers and system architects define what the chip is supposed to do, along with its target performance, power budget, area constraints, and cost requirements.

2. **Architecture & System Design:** Engineers plan the high-level architecture. This involves decisions about instruction sets, memory hierarchies, pipelines, and the integration of different functional blocks.

3. **RTL & Functional Design:** Designers describe the behaviour of digital circuits using Hardware Description Languages (HDLs) such as Verilog and VHDL. Think of this as writing code that describes how hardware should behave.

4. **Functional Verification & Simulation:** The design is extensively tested using simulations, testbenches, and other verification techniques to ensure that it behaves as intended.

5. **Logic Synthesis:** A synthesis tool converts the RTL description into a gate-level representation, commonly called a netlist. It maps the design to actual logic gates while considering constraints such as power, performance, and area.

6. **Physical Design & Implementation:** The logical circuit is translated into a physical layout on the silicon die. This involves several steps:
   - **Floorplanning & Placement:** Deciding where different logic blocks and cells should be positioned.
   - **Clock Tree Synthesis:** Distributing the clock signal across the chip.
   - **Routing:** Connecting the millions or billions of gates using microscopic metal wires across multiple layers.

7. **Physical Verification & Sign-off:** The design undergoes several checks before manufacturing, including Design Rule Check (DRC), Layout Versus Schematic (LVS) and Static Timing Analysis (STA).

8. **Tape-out & Manufacturing:** Once the design is finalised and signed off, the layout is exported in formats such as GDSII or OASIS and sent to the semiconductor foundry for manufacturing.

This is, of course, a simplified representation. Verification and analysis actually happen throughout several of these stages, rather than being restricted to just one. And this is also an interesting aspect of semiconductor manufacturing. The Verification and analysis makes more than half of the total budget in a chip design process, reason being a mistake discovered after fabrication can be extremely expensive to fix. It may require another manufacturing run, new photomasks, and considerable engineering effort. You really don't want to discover a fundamental design flaw after spending millions on manufacturing.

## Where does power analysis come into the picture?

Now, here's where things get interesting and where my work fits into the bigger picture.

A chip is generally designed around three important parameters, collectively known as **PPA (Power, Performance, and Area)**.

- **Power:** How much power does the chip consume?
- **Performance:** How fast can it execute its intended operations?
- **Area:** How much physical silicon area does the design occupy?

These three parameters are closely related, and improving one can sometimes come at the expense of another. So, chip design is essentially a continuous exercise in balancing trade-offs.

Our tools primarily operate around the RTL and logic synthesis stages. They help VLSI designers analyse the power consumption of their designs and identify opportunities for optimisation, particularly through techniques such as clock gating.

But how do we actually calculate the power consumed by a design?

To understand that, we need to look at something called **Liberty files**.

Liberty files are industry-standard ASCII text files that describe the characteristics of standard cells used in semiconductor design. These files are typically provided by the foundry or library provider and contain information about the functionality, timing, power, and other characteristics of different cells.

A standard cell could be something as simple as an AND gate, an OR gate, or a flip-flop. Each cell has its own characteristics, and the Liberty file essentially provides the information required by EDA tools to understand how these cells behave.

Now, the total power consumption of a digital circuit is generally divided into two major components:

**1. Static Power (Leakage Power)**

This is the power consumed even when the circuit isn't switching. It primarily comes from leakage currents within transistors.

**2. Dynamic Power**

This is the power consumed when circuit activity causes changes in signals. It can be further divided into:

- **Internal Power:** Power consumed internally within a standard cell due to transistor switching and related effects.
- **Switching Power:** Power consumed when charging and discharging the capacitances associated with circuit signals.

Liberty files contain lookup tables for certain power characteristics. For instance, internal power values can depend on parameters such as input transition time (slew) and output load capacitance. So, given a particular input slew and output load, we can look up the corresponding power value. When the exact combination isn't available in the table, interpolation techniques can be used to estimate it.

A complete power estimation also requires information about signal activity, operating conditions, and other design characteristics too.

## Putting everything together

Let's try to connect all these concepts through a hypothetical example.

Suppose a company wants to manufacture a chip that performs a particular set of operations. The chip must operate within a power budget of X, achieve a performance target of Y, and occupy no more than Z area.

The engineers first come up with a high-level architecture. The designers then describe the behaviour of the digital logic using HDLs such as Verilog or SystemVerilog.

In most RTL design workflows, designers primarily use behavioural and dataflow modelling to describe the circuit. A synthesis tool then translates this description into a gate-level netlist.

But where does the synthesis tool get information about the actual gates it can use?

Every foundry or library (or liberty) provider has a collection of standard cells, each with its own functionality and PPA characteristics. Based on the design requirements and constraints, the synthesis tool selects suitable cells and constructs the gate-level netlist.

At this point, engineers have estimates of the design's power consumption, but they need more detailed analysis to understand how much power the actual circuit is likely to consume.

This is where power analysis tools are used. They take inputs such as the RTL or gate-level design, the corresponding cell library information, and switching activity data to estimate power consumption.

Once the power consumption is analysed, engineers can look for opportunities to reduce it.

<br><br>

One particularly interesting technique is **clock gating**.

In a digital circuit, clock signals control the operation of sequential elements such as flip-flops. However, not every part of a chip needs to perform useful work during every clock cycle. If a particular block is idle, we can potentially stop sending clock pulses to it.

Clock gating does exactly that. It disables the clock signal to selected portions of the circuit when they aren't required to operate, thereby reducing unnecessary switching activity and dynamic power consumption.

The important part is that this can be done while preserving the intended functionality of the design, provided the clock-gating logic is implemented correctly.

Certainly, optimisation isn't always free. It can introduce additional logic, affect timing, or influence other PPA parameters. So, engineers have to evaluate these trade-offs carefully.

Once the design passes all the required verification and sign-off checks, the final layout is sent to the foundry for manufacturing. What follows is an entirely different but equally fascinating process involving wafer preparation, fabrication, and post-fabrication testing.

And that's a very broad picture of how a chip goes from an idea to an actual physical product!

## What have I learned so far?

Now, coming to the important part.

Although I'm pursuing a degree in Electronics and Communication Engineering, I never really imagined myself working with flip-flops, registers, logic gates, and semiconductors in such detail. But life has its own ways of teaching you things, and I somehow ended up in an environment surrounded by people with considerable industry experience in the EDA domain.

I've learned quite a lot over the past few weeks.

I started by understanding the EDA industry and the overall chip design workflow. From there, I moved on to Hardware Description Languages, primarily Verilog and SystemVerilog.

I studied how hardware can be described at different abstraction levels, including behavioural, dataflow, and gate-level modelling. I can now read and understand Verilog designs much more comfortably and write simple designs myself. It's quite interesting to realise that the code you're writing isn't meant to execute on a processor in the conventional sense; you're actually describing hardware! One very interesting example I can think of is we should avoid using loops while writing HDLs, because these are not just simple loops in general sense, these meanse a repeated block of same hardware on the IC!

I also learnt about clock-gating techniques, power computation, liberty files, and Tool Control Language (Tcl).

And this brings me to what we're actually trying to build.

## What am I working on?

To put it simply, the idea is to develop an agentic workflow around existing proprietary tools to automate parts of the RTL power analysis and optimization.

These workflows involve multiple tools, design files, configuration parameters, and analysis steps. We're exploring ways to bring these pieces together into a more automated workflow that can coordinate existing tools, analyse their outputs, and assist with the optimization process.

I'm not entirely sure how much of the project I can publicly discuss, so I'll refrain from sharing further technical details for now. 

## A few closing thoughts

It's just been close to a month, and I think I've already learned more about the practical side of semiconductor design than I had expected to.

One thing I've started appreciating is how interconnected engineering domains really are. You might begin with what looks like a very specific problem in digital electronics, but solving it requires knowledge of programming, mathematics, numerical methods, software engineering, and increasingly, artificial intelligence.

Working at the intersection of two most rapidly evolving areas, the semiconductor industry and agentic AI, has been quite an interesting experience so far.

There's still a lot to learn and figure out, and things are getting even more interesting now! 

That's all for now. Hopefully, I'll have more interesting things to share as I continue learning and contributing!
<br><br>
Thanks for reading.