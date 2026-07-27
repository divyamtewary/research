# Research Visualiser — Scope & Overview

> Interactive educational companion to the paper  
> *"The Information Geometry of Softmax"*

---

## 🚀 View Online

Click the links below to open the visualisers directly in your browser (no download needed):

| Part | Link |
|------|------|
| **Part 1 — Softmax Foundation** | [Open in Browser](https://htmlpreview.github.io/?https://github.com/divyamtewary/research/blob/main/Information%20Geometry%20of%20Softmax/ResearchVisualiser/Part1_SoftmaxFoundation.html) |
| **Part 2 — Geometry & KL Divergence** | [Open in Browser](https://htmlpreview.github.io/?https://github.com/divyamtewary/research/blob/main/Information%20Geometry%20of%20Softmax/ResearchVisualiser/Part2_GeometryAndKL.html) |

---

## Aim

To build an interactive, browser-based educational artifact that makes the first half of *The Information Geometry of Softmax* paper accessible to learners without requiring them to read the original arxiv paper.

The visualiser transforms abstract mathematical concepts — partition functions, Softmax derivatives, KL divergence, Bregman geometry — into **explorable, hands-on visualizations** that respond to user input in real time.

---

## Why This Visualiser Exists

The original paper is mathematically dense. While rigorous, it assumes familiarity with:

- Exponential families
- Information geometry
- Bregman divergences

This creates a high barrier for newcomers. The visualiser bridges that gap by:

1. **Teaching intuition first** — every concept is introduced with a "big question" before any equation.
2. **Making math interactive** — sliders, animated charts, and geometric illustrations replace static figures.
3. **Building progressively** — each section builds on the previous one, from basic Softmax all the way to the Bregman divergence identity.
4. **Preserving rigor** — all derivations are present, but they're *accompanied* by visuals rather than *replaced* by them.

---

## Target Audience

| Profile | Comfort Level |
|---------|--------------|
| ML researchers new to information geometry | ★★★★★ |
| Graduate students in NLP / deep learning | ★★★★★ |
| Advanced undergraduates in ML/AI | ★★★★☆ |
| Anyone with linear algebra + basic neural network knowledge | ★★★★☆ |

**Prerequisites:**

- Basic linear algebra (vectors, dot products, gradients)
- Familiarity with neural network concepts (logits, Softmax, embeddings)
- No prior knowledge of information geometry required

---

## Scope — Part 1 (ResearchScope_01)

| Section | Concept | Interactive Element |
|---------|---------|-------------------|
| 1 | Euclidean representation space vs. probability space | Side-by-side comparison canvas |
| 2 | The Softmax transformation (exp + normalize) | Live bar chart: logits → probabilities with sliders |
| 3 | Partition function ![eq](math_svgs/i21c2e59531c8.svg)q](math_svgs/i21c2e59531c8.svg) and log-normaliser ![eq](math_svgs/i0a365f67af7f.svg) | Real-time $Z$ calculator with animated sensitivity |
| 4 | Gradient of the log-normaliser ![eq](math_svgs/if6a85aa18dd8.svg) | Visual proof that gradient components equal probabilities |
| 5 | Self-derivative ![eq](math_svgs/i66a83cc1b71f.svg) | Sigmoid-like curve explorer |

## Scope — Part 2 (ResearchScope_02)

| Section | Concept | Interactive Element |
|---------|---------|-------------------|
| 1 | Cross-derivative ![eq](math_svgs/i94306ae8dbc7.svg) | Coupled sliders showing token competition |
| 2 | Global coupling & probability stealing | Waterfall / flow diagram of probability mass |
| 3 | Behavioral distance via KL divergence | Two-distribution comparison with KL heatmap |
| 4 | Expectation ![eq](math_svgs/ia7536de6a5a3.svg) and gradient identity | Weighted average visualization with center of mass |
| 5 | Bregman divergence from KL | Geometric diagram showing the tangent plane interpretation |

---

## How to Use

1. **Download** — Clone or download the `ResearchVisualiser/` folder from the repository.
2. **Open** — Double-click any `.html` file (e.g., `Part1_SoftmaxFoundation.html`) to open it in your browser.
3. **Explore** — Use sliders, buttons, and interactive canvases. No installation, no server, no build step required.
4. **Learn** — Each section follows a fixed sequence:
   - *Big Question* → *Intuition* → *Math* → *Visualization* → *Key Insight* → *Next Section Link*

All visualisations are self-contained single HTML files with embedded CSS and JavaScript. No external dependencies.

---

## File Structure

```
ResearchVisualiser/
├── ResearchVisualiserScope.md    ← This file
├── Part1_SoftmaxFoundation.html  ← Sections 1-5 from ResearchScope_01
└── Part2_GeometryAndKL.html      ← Sections 1-5 from ResearchScope_02
```