# The Information Geometry of Softmax
## Part 2 — Probability Geometry, KL Divergence and Bregman Geometry
> *(Math rendered with KaTeX SVGs via GitHub Actions)*

---

# Overview

This section continues the derivation started in Part 1.

Previously we established

1. The partition function


![Z=\sum_i e^{\lambda_](math_svgs/dea77eeb40be8.svg)


2. The log-normaliser


![A\lambda=\log Z](math_svgs/dd754f85dcbd0.svg)
svgs/dd754f85dcbd0.svg)


3. The gradient of the log-normaliser


![\nabla A\lambda=P](math_svgs/d0a6f2c23f0a7.svg)


4. The self-derivative of Softmax


![\frac{\partial P_i}{](math_svgs/da0f22a7f09da.svg)
on answers two new questions:

- How do the probabilities of *other* tokens change when one logit changes?
- How does this lead naturally to the geometry induced by Softmax?

---

# Cross-Derivative of Softmax

Suppose


![P_2=\frac{e^{\lambda](math_svgs/d74a42273ab38.svg)


We now increase


![\lambda_1](math_svgs/def8865f6e97b.svg)


instead.

Notice something important.

The numerator


![e^{\lambda_2}](math_svgs/d88d96debf646.svg)


does **not** change.

Only the denominator changes because


![Z=e^{\lambda_1}+e^{\](math_svgs/d01825d4d45bf.svg)


still contains


![\lambda_1.](math_svgs/d6de86b8f500a.svg)


---

## Applying the Quotient Rule

Since


![\frac{d}{d\lambda_1}](math_svgs/d954640138d5e.svg)


and


![\frac{\partial Z}{\p](math_svgs/dddbcb767452e.svg)


we obtain


![\frac{\partial P_2}{](math_svgs/d426c7f20b592.svg)


Recognizing


![P_i=\frac{e^{\lambda](math_svgs/d9d302358232f.svg)
s/d9d302358232f.svg)


gives


![\boxed{
\frac{\part](math_svgs/deb33622ef288.svg)


Likewise,


![\boxed{
\frac{\part](math_svgs/dca06266e7206.svg)


---

# Interpretation

Two complementary results have now emerged.

Self influence:


![\frac{\partial P_i}{](math_svgs/da0f22a7f09da.svg)


Cross influence:


![\frac{\partial P_j}{](math_svgs/db6688e101848.svg)


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


![\lambda](math_svgs/dc6a6eb61fd9c.svg)


moves to


![\lambda'.](math_svgs/d32a5abceaf78.svg)


The correct notion of distance is therefore

the difference between


![P_\lambda](math_svgs/d0d370d005e07.svg)


and


![P_{\lambda'}.](math_svgs/d84ef3c2a3be7.svg)


---

# KL Divergence

The behavioral distance is measured using

the Kullback-Leibler divergence.

Definition


![D_{KL}
P_\lambda\|](math_svgs/db4abb600d0f3.svg)


KL divergence measures how surprising one probability distribution appears when compared with another.

It is **not**

- Euclidean distance

nor

- cosine similarity.

It measures behavioral change.

---

# Substituting the Softmax Formula

Recall


![\log P_\lambda
=
\](math_svgs/d4f660d81b90b.svg)


Substituting this into KL divergence gives


![D_{KL}
=
\sum_y
P](math_svgs/d92718414433a.svg)
ation,

the paper introduces expectation.

Expectation is simply a weighted average.

Example

Suppose a game pays

- ₹10 with probability 0.20
- ₹1 with probability 0.80

Expected payout


![0.20\times10
+
0.8](math_svgs/d76ac90fb76e5.svg)


Neural networks follow exactly the same idea.

Instead of money,

our outcomes are

the output embeddings.

Therefore


![\boxed{
EY
=
\s](math_svgs/d37a8bd02aa9b.svg)


This is the probability-weighted average output embedding.

Geometrically,

it represents the center of mass of the output embeddings.

---

# Gradient Interpretation

Earlier we proved


![\frac{\partial A}{\p](math_svgs/d697b10ea82bc.svg)


Collecting all partial derivatives produces

the gradient


![\nabla A\lambda](math_svgs/dde6ed4904821.svg)
svgs/dde6ed4904821.svg)


Since every component equals a probability,

the complete gradient becomes


![\boxed{
\nabla A\l](math_svgs/d2771d74c298b.svg)


Recognize immediately that


![\boxed{
\nabla A\l](math_svgs/dca12851f7ef7.svg)


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


![A\lambda](math_svgs/d0a365f67af7f.svg)


and


![A\lambda'](math_svgs/d2dca3fdfc0f4.svg)


are constants with respect to the summation.

Since


![\sum_yP_\lambday=1](math_svgs/d4ae6bf6f1a86.svg)


they simplify immediately.

The first vector term can also be factored outside the summation.

This produces


![\lambda-\lambda'^T](math_svgs/d3fb38ab66360.svg)


Replacing the summation with


![\nabla A\lambda](math_svgs/dde6ed4904821.svg)


gives


![\lambda-\lambda'^T](math_svgs/df96ce0126cc7.svg)


---

# Final Result

Putting everything together,

the KL divergence becomes


![\boxed{
D_{KL}
P_](math_svgs/d9553f4bfa971.svg)


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


![A\lambda.](math_svgs/d6230fb62c903.svg)


The hidden representation space is therefore **not Euclidean**.

Instead,

it is an information-geometric manifold whose distance is naturally measured using KL divergence.

---

# Core Mathematical Results

The first half of the paper establishes several foundational identities.

### Softmax


![P_i=\frac{e^{\lambda](math_svgs/d9d302358232f.svg)


### Partition Function


![Z=\sum_ie^{\lambda_i](math_svgs/d602b7acfb9de.svg)


### Log-Normaliser


![A\lambda=\log Z](math_svgs/dd754f85dcbd0.svg)


### Gradient


![\nabla A=P](math_svgs/d7be4db7041f3.svg)


### Self-Derivative

<img src="math_svgs/da0f22a7f09da.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

### Cross-Derivative


![\frac{\partial P_j}{](math_svgs/d560901de3e3d.svg)


### Expected Value


![EY
=
\sum_yPyY](math_svgs/dea44e6fe00c8.svg)


### Gradient Identity


![\nabla A\lambda
=](math_svgs/d383474297d4b.svg)


### KL Divergence


![D_{KL}
=
A\lambda](math_svgs/db6f2812c1651.svg)


---

# Key Takeaways

- Softmax globally couples every token.
- Increasing one probability necessarily decreases all others.
- The gradient of the log-normaliser equals the expected output embedding.
- KL divergence naturally becomes a Bregman divergence.
- Softmax transforms a flat Euclidean space into a curved information-geometric manifold.