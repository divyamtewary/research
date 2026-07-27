# The Information Geometry of Softmax
## Part 2 — Probability Geometry, KL Divergence and Bregman Geometry
> *(Math rendered with KaTeX SVGs via GitHub Actions)*

---

# Overview

This section continues the derivation started in Part 1.

Previously we established

1. The partition function

<img src="math_svgs/dea77eeb40be8.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

2. The log-normaliser

<img src="math_svgs/dd754f85dcbd0.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>f85dcbd0.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

3. The gradient of the log-normaliser

<img src="math_svgs/d0a6f2c23f0a7.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

4. The self-derivative of Softmax

<img src="math_svgs/da0f22a7f09da.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>lay:block;margin:1em auto;max-width:100%"/>lay:block;margin:1em auto;max-width:100%"/>

This section answers two new questions:

- How do the probabilities of *other* tokens change when one logit changes?
- How does this lead naturally to the geometry induced by Softmax?

---

# Cross-Derivative of Softmax

Suppose

<img src="math_svgs/d74a42273ab38.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

We now increase

<img src="math_svgs/def8865f6e97b.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

instead.

Notice something important.

The numerator

<img src="math_svgs/d88d96debf646.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

does **not** change.

Only the denominator changes because

<img src="math_svgs/d01825d4d45bf.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

still contains

<img src="math_svgs/d6de86b8f500a.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

---

## Applying the Quotient Rule

Since

<img src="math_svgs/d954640138d5e.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

and

<img src="math_svgs/dddbcb767452e.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

we obtain

<img src="math_svgs/d426c7f20b592.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Recognizing

<img src="math_svgs/d9d302358232f.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

gives

<img src="math_svgs/deb33622ef288.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Likewise,

<img src="math_svgs/dca06266e7206.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

---

# Interpretation

Two complementary results have now emerged.

Self influence:

$$
\frac{\partial P_i}{\partial\lambda_i}
=
P_i(1-P_i)
$$

Cross influence:

<img src="math_svgs/db6688e101848.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

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

<img src="math_svgs/dc6a6eb61fd9c.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

moves to

<img src="math_svgs/d32a5abceaf78.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

The correct notion of distance is therefore

the difference between

<img src="math_svgs/d0d370d005e07.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

and

<img src="math_svgs/d84ef3c2a3be7.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

---

# KL Divergence

The behavioral distance is measured using

the Kullback-Leibler divergence.

Definition

<img src="math_svgs/db4abb600d0f3.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

KL divergence measures how surprising one probability distribution appears when compared with another.

It is **not**

- Euclidean distance

nor

- cosine similarity.

It measures behavioral change.

---

# Substituting the Softmax Formula

Recall

<img src="math_svgs/d4f660d81b90b.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Substituting this into KL divergence gives

<img src="math_svgs/d92718414433a.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

# Expected Value

Before simplifying this equation,

the paper introduces expectation.

Expectation is simply a weighted average.

Example

Suppose a game pays

- ₹10 with probability 0.20
- ₹1 with probability 0.80

Expected payout

<img src="math_svgs/d76ac90fb76e5.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Neural networks follow exactly the same idea.

Instead of money,

our outcomes are

the output embeddings.

Therefore

<img src="math_svgs/d37a8bd02aa9b.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

This is the probability-weighted average output embedding.

Geometrically,

it represents the center of mass of the output embeddings.

---

# Gradient Interpretation

Earlier we proved

<img src="math_svgs/d697b10ea82bc.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Collecting all partial derivatives produces

the gradient

<img src="math_svgs/dde6ed4904821.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>d4904821.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Since every component equals a probability,

the complete gradient becomes

<img src="math_svgs/d2771d74c298b.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Recognize immediately that

<img src="math_svgs/dca12851f7ef7.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

This is one of the most important identities in the paper.

The gradient is literally the expected output representation.

---

# Simplifying the KL Divergence

Starting from

$$
D_{KL}
=
\sum_y
P_\lambda(y)
\left[
(\lambda-\lambda')^TY_y
-
A(\lambda)
+
A(\lambda')
\right]
$$

Notice

<img src="math_svgs/d0a365f67af7f.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

and

<img src="math_svgs/d2dca3fdfc0f4.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

are constants with respect to the summation.

Since

<img src="math_svgs/d4ae6bf6f1a86.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

they simplify immediately.

The first vector term can also be factored outside the summation.

This produces

<img src="math_svgs/d3fb38ab66360.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Replacing the summation with

$$
\nabla A(\lambda)
$$

gives

<img src="math_svgs/df96ce0126cc7.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

---

# Final Result

Putting everything together,

the KL divergence becomes

<img src="math_svgs/d9553f4bfa971.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

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

<img src="math_svgs/d6230fb62c903.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

The hidden representation space is therefore **not Euclidean**.

Instead,

it is an information-geometric manifold whose distance is naturally measured using KL divergence.

---

# Core Mathematical Results

The first half of the paper establishes several foundational identities.

### Softmax

$$
P_i=\frac{e^{\lambda_i}}Z
$$

### Partition Function

<img src="math_svgs/d602b7acfb9de.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

### Log-Normaliser

$$
A(\lambda)=\log Z
$$

### Gradient

<img src="math_svgs/d7be4db7041f3.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

### Self-Derivative

$$
\frac{\partial P_i}{\partial\lambda_i}
=
P_i(1-P_i)
$$

### Cross-Derivative

<img src="math_svgs/d560901de3e3d.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

### Expected Value

<img src="math_svgs/dea44e6fe00c8.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

### Gradient Identity

<img src="math_svgs/d383474297d4b.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

### KL Divergence

<img src="math_svgs/db6f2812c1651.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

---

# Key Takeaways

- Softmax globally couples every token.
- Increasing one probability necessarily decreases all others.
- The gradient of the log-normaliser equals the expected output embedding.
- KL divergence naturally becomes a Bregman divergence.
- Softmax transforms a flat Euclidean space into a curved information-geometric manifold.