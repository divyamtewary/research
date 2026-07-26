# The Information Geometry of Softmax
## Part 2 — Probability Geometry, KL Divergence and Bregman Geometry

---

# Overview

This section continues the derivation started in Part 1.

Previously we established

1. The partition function

$$
Z=\sum_i e^{\lambda_i}
$$

2. The log-normaliser

$$
A(\lambda)=\log Z
$$

3. The gradient of the log-normaliser

$$
\nabla A(\lambda)=P
$$

4. The self-derivative of Softmax

$$
\frac{\partial P_i}{\partial\lambda_i}
=
P_i(1-P_i)
$$

This section answers two new questions:

- How do the probabilities of *other* tokens change when one logit changes?
- How does this lead naturally to the geometry induced by Softmax?

---

# Cross-Derivative of Softmax

Suppose

$$
P_2=\frac{e^{\lambda_2}}{Z}
$$

We now increase

$$
\lambda_1
$$

instead.

Notice something important.

The numerator

$$
e^{\lambda_2}
$$

does **not** change.

Only the denominator changes because

$$
Z=e^{\lambda_1}+e^{\lambda_2}+e^{\lambda_3}
$$

still contains

$$
\lambda_1.
$$

---

## Applying the Quotient Rule

Since

$$
\frac{d}{d\lambda_1}e^{\lambda_2}=0
$$

and

$$
\frac{\partial Z}{\partial\lambda_1}=e^{\lambda_1}
$$

we obtain

$$
\frac{\partial P_2}{\partial\lambda_1}
=
-\frac{e^{\lambda_2}e^{\lambda_1}}{Z^2}
$$

Recognizing

$$
P_i=\frac{e^{\lambda_i}}Z
$$

gives

$$
\boxed{
\frac{\partial P_2}{\partial\lambda_1}
=
-P_2P_1
}
$$

Likewise,

$$
\boxed{
\frac{\partial P_3}{\partial\lambda_1}
=
-P_3P_1
}
$$

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

$$
\frac{\partial P_j}{\partial\lambda_i}
=
-P_iP_j
\qquad
(i\neq j)
$$

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

$$
\lambda
$$

moves to

$$
\lambda'.
$$

The correct notion of distance is therefore

the difference between

$$
P_\lambda
$$

and

$$
P_{\lambda'}.
$$

---

# KL Divergence

The behavioral distance is measured using

the Kullback-Leibler divergence.

Definition

$$
D_{KL}
(P_\lambda\|P_{\lambda'})
=
\sum_y
P_\lambda(y)
\left[
\log P_\lambda
-
\log P_{\lambda'}
\right]
$$

KL divergence measures how surprising one probability distribution appears when compared with another.

It is **not**

- Euclidean distance

nor

- cosine similarity.

It measures behavioral change.

---

# Substituting the Softmax Formula

Recall

$$
\log P_\lambda
=
\lambda^TY_y
-
A(\lambda)
$$

Substituting this into KL divergence gives

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

---

# Expected Value

Before simplifying this equation,

the paper introduces expectation.

Expectation is simply a weighted average.

Example

Suppose a game pays

- ₹10 with probability 0.20
- ₹1 with probability 0.80

Expected payout

$$
0.20\times10
+
0.80\times1
=
₹2.80
$$

Neural networks follow exactly the same idea.

Instead of money,

our outcomes are

the output embeddings.

Therefore

$$
\boxed{
E[Y]
=
\sum_y
P_\lambda(y)Y_y
}
$$

This is the probability-weighted average output embedding.

Geometrically,

it represents the center of mass of the output embeddings.

---

# Gradient Interpretation

Earlier we proved

$$
\frac{\partial A}{\partial\lambda_i}
=
P_i
$$

Collecting all partial derivatives produces

the gradient

$$
\nabla A(\lambda)
$$

Since every component equals a probability,

the complete gradient becomes

$$
\boxed{
\nabla A(\lambda)
=
\sum_y
P_\lambda(y)Y_y
}
$$

Recognize immediately that

$$
\boxed{
\nabla A(\lambda)=E[Y]
}
$$

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

$$
A(\lambda)
$$

and

$$
A(\lambda')
$$

are constants with respect to the summation.

Since

$$
\sum_yP_\lambda(y)=1
$$

they simplify immediately.

The first vector term can also be factored outside the summation.

This produces

$$
(\lambda-\lambda')^T
\sum_y
P_\lambda(y)Y_y
$$

Replacing the summation with

$$
\nabla A(\lambda)
$$

gives

$$
(\lambda-\lambda')^T\nabla A(\lambda)
$$

---

# Final Result

Putting everything together,

the KL divergence becomes

$$
\boxed{
D_{KL}
(P_\lambda\|P_{\lambda'})
=
A(\lambda')
-
A(\lambda)
-
\nabla A(\lambda)^T
(\lambda-\lambda')
}
$$

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

$$
A(\lambda).
$$

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

$$
Z=\sum_ie^{\lambda_i}
$$

### Log-Normaliser

$$
A(\lambda)=\log Z
$$

### Gradient

$$
\nabla A=P
$$

### Self-Derivative

$$
\frac{\partial P_i}{\partial\lambda_i}
=
P_i(1-P_i)
$$

### Cross-Derivative

$$
\frac{\partial P_j}{\partial\lambda_i}
=
-P_iP_j
$$

### Expected Value

$$
E[Y]
=
\sum_yP(y)Y_y
$$

### Gradient Identity

$$
\nabla A(\lambda)
=
E[Y]
$$

### KL Divergence

$$
D_{KL}
=
A(\lambda')
-
A(\lambda)
-
\nabla A(\lambda)^T(\lambda-\lambda')
$$

---

# Key Takeaways

- Softmax globally couples every token.
- Increasing one probability necessarily decreases all others.
- The gradient of the log-normaliser equals the expected output embedding.
- KL divergence naturally becomes a Bregman divergence.
- Softmax transforms a flat Euclidean space into a curved information-geometric manifold.