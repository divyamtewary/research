# The Information Geometry of Softmax
## Part 2 — Probability Geometry, KL Divergence and Bregman Geometry
> *(Math rendered with KaTeX SVGs via GitHub Actions)*

---

# Overview

This section continues the derivation started in Part 1.

Previously we established

1. The partition function


![equation](math_svgs/dea77eeb40be8.svg)


2. The log-normaliser


![equation](math_svgs/dd754f85dcbd0.svg)
754f85dcbd0.svg)


3. The gradient of the log-normaliser


![equation](math_svgs/d0a6f2c23f0a7.svg)


4. The self-derivative of Softmax


![equation](math_svgs/da0f22a7f09da.svg)
ions:

- How do the probabilities of *other* tokens change when one logit changes?
- How does this lead naturally to the geometry induced by Softmax?

---

# Cross-Derivative of Softmax

Suppose


![equation](math_svgs/d74a42273ab38.svg)


We now increase


![equation](math_svgs/def8865f6e97b.svg)


instead.

Notice something important.

The numerator


![equation](math_svgs/d88d96debf646.svg)


does **not** change.

Only the denominator changes because


![equation](math_svgs/d01825d4d45bf.svg)


still contains


![equation](math_svgs/d6de86b8f500a.svg)


---

## Applying the Quotient Rule

Since


![equation](math_svgs/d954640138d5e.svg)


and


![equation](math_svgs/dddbcb767452e.svg)


we obtain


![equation](math_svgs/d426c7f20b592.svg)


Recognizing


![equation](math_svgs/d9d302358232f.svg)
32f.svg)


gives


![equation](math_svgs/deb33622ef288.svg)


Likewise,


![equation](math_svgs/dca06266e7206.svg)


---

# Interpretation

Two complementary results have now emerged.

Self influence:


![\frac{\partial P_i}{](math_svgs/da0f22a7f09da.svg)


Cross influence:


![equation](math_svgs/db6688e101848.svg)


These equations reveal a competition between tokens.

Increasing one logit necessarily steals probability mass from every other token.

Softmax is therefore **globally coupled**.

No token exists independently.

---

# Conceptual Interpretation

When the logit of token 1 increases

- token 1 gains probability
- every other token loses probability

The amount each token loses depends upon

its current probability.

Tokens that already have very small probability lose almost nothing.

Large-probability competitors lose the most.

---

# Measuring Behavioral Distance

The paper now changes perspective.

Instead of asking

> "How different are two hidden vectors?"

it asks

> "How different are the probability distributions they produce?"

Suppose

Current hidden state


![equation](math_svgs/dc6a6eb61fd9c.svg)


moves to


![equation](math_svgs/d32a5abceaf78.svg)


The correct notion of distance is therefore

the difference between


![equation](math_svgs/d0d370d005e07.svg)


and


![equation](math_svgs/d84ef3c2a3be7.svg)


---

# KL Divergence

The behavioral distance is measured using

the Kullback-Leibler divergence.

Definition


![equation](math_svgs/db4abb600d0f3.svg)


KL divergence measures how surprising one probability distribution appears when compared with another.

It is **not**

- Euclidean distance

nor

- cosine similarity.

It measures behavioral change.

---

# Substituting the Softmax Formula

Recall


![equation](math_svgs/d4f660d81b90b.svg)


Substituting this into KL divergence gives


![equation](math_svgs/d92718414433a.svg)
e paper introduces expectation.

Expectation is simply a weighted average.

Example

Suppose a game pays

- ₹10 with probability 0.20
- ₹1 with probability 0.80

Expected payout


![equation](math_svgs/d76ac90fb76e5.svg)


Neural networks follow exactly the same idea.

Instead of money,

our outcomes are

the output embeddings.

Therefore


![equation](math_svgs/d37a8bd02aa9b.svg)


This is the probability-weighted average output embedding.

Geometrically,

it represents the center of mass of the output embeddings.

---

# Gradient Interpretation

Earlier we proved


![equation](math_svgs/d697b10ea82bc.svg)


Collecting all partial derivatives produces

the gradient


![equation](math_svgs/dde6ed4904821.svg)
e6ed4904821.svg)


Since every component equals a probability,

the complete gradient becomes


![equation](math_svgs/d2771d74c298b.svg)


Recognize immediately that


![equation](math_svgs/dca12851f7ef7.svg)


This is one of the most important identities in the paper.

The gradient is literally the expected output representation.

---

# Simplifying the KL Divergence

Starting from


![D_{KL}
=
\sum_y
P_\l](math_svgs/d92718414433a.svg)


Notice


![equation](math_svgs/d0a365f67af7f.svg)


and


![equation](math_svgs/d2dca3fdfc0f4.svg)


are constants with respect to the summation.

Since


![equation](math_svgs/d4ae6bf6f1a86.svg)


they simplify immediately.

The first vector term can also be factored outside the summation.

This produces


![equation](math_svgs/d3fb38ab66360.svg)


Replacing the summation with


![\nabla A\lambda](math_svgs/dde6ed4904821.svg)


gives


![equation](math_svgs/df96ce0126cc7.svg)


---

# Final Result

Putting everything together,

the KL divergence becomes


![equation](math_svgs/d9553f4bfa971.svg)


This is exactly the definition of a **Bregman divergence**.

---

# Geometric Meaning

This result completely changes how we think about hidden representations.

We started with

a statistical definition

(KL divergence).

Pure algebra transformed it into

a geometric definition

(Bregman divergence).

Therefore

Softmax does not merely convert logits into probabilities.

It induces an entirely new geometry on the representation space.

The curvature of that geometry is governed by


![equation](math_svgs/d6230fb62c903.svg)


The hidden representation space is therefore **not Euclidean**.

Instead,

it is an information-geometric manifold whose distance is naturally measured using KL divergence.

---

# Core Mathematical Results

The first half of the paper establishes several foundational identities.

### Softmax


![P_i=\frac{e^{\lambda](math_svgs/d9d302358232f.svg)


### Partition Function


![equation](math_svgs/d602b7acfb9de.svg)


### Log-Normaliser


![A\lambda=\log Z](math_svgs/dd754f85dcbd0.svg)


### Gradient


![equation](math_svgs/d7be4db7041f3.svg)


### Self-Derivative

$$
\frac{\partial P_i}{\partial\lambda_i}
=
P_i(1-P_i)
$$

### Cross-Derivative


![equation](math_svgs/d560901de3e3d.svg)


### Expected Value


![equation](math_svgs/dea44e6fe00c8.svg)


### Gradient Identity


![equation](math_svgs/d383474297d4b.svg)


### KL Divergence


![equation](math_svgs/db6f2812c1651.svg)


---

# Key Takeaways

- Softmax globally couples every token.
- Increasing one probability necessarily decreases all others.
- The gradient of the log-normaliser equals the expected output embedding.
- KL divergence naturally becomes a Bregman divergence.
- Softmax transforms a flat Euclidean space into a curved information-geometric manifold.