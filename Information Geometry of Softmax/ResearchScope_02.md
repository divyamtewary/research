# The Information Geometry of Softmax
## Part 2 — Probability Geometry, KL Divergence and Bregman Geometry
> *(Math rendered with KaTeX SVGs via GitHub Actions)*

---

# Overview

This section continues the derivation started in Part 1.

Previously we established

1. The partition function


<img src="math_svgs/d2u1g32.svg" alt="LaTeX: Z=\sum_i e^{\lambda_i}" style="display:block;margin:1em auto;max-width:100%" />


2. The log-normaliser


<img src="math_svgs/dx1wo8u.svg" alt="LaTeX: A(\lambda)=\log Z" style="display:block;margin:1em auto;max-width:100%" />
1wo8u.svg" alt="LaTeX: A(\lambda)=\log Z" style="display:block;margin:1em auto;max-width:100%" />


3. The gradient of the log-normaliser


<img src="math_svgs/d2dvuv0.svg" alt="LaTeX: \nabla A(\lambda)=P" style="display:block;margin:1em auto;max-width:100%" />


4. The self-derivative of Softmax


<img src="math_svgs/d413ogp.svg" alt="LaTeX: \frac{\partial P_i}{\partial\lambda_i} = P_i(1-P_i)" style="display:block;margin:1em auto;max-width:100%" />
ial P_i}{\partial\lambda_i} = P_i(1-P_i)" style="display:block;margin:1em auto;max-width:100%" />
ial P_i}{\partial\lambda_i} = P_i(1-P_i)" style="display:block;margin:1em auto;max-width:100%" />


This section answers two new questions:

- How do the probabilities of *other* tokens change when one logit changes?
- How does this lead naturally to the geometry induced by Softmax?

---

# Cross-Derivative of Softmax

Suppose


<img src="math_svgs/d6czl85.svg" alt="LaTeX: P_2=\frac{e^{\lambda_2}}{Z}" style="display:block;margin:1em auto;max-width:100%" />


We now increase


<img src="math_svgs/d5y0oyn.svg" alt="LaTeX: \lambda_1" style="display:block;margin:1em auto;max-width:100%" />


instead.

Notice something important.

The numerator


<img src="math_svgs/dpgqh11.svg" alt="LaTeX: e^{\lambda_2}" style="display:block;margin:1em auto;max-width:100%" />


does **not** change.

Only the denominator changes because


<img src="math_svgs/d8h2jea.svg" alt="LaTeX: Z=e^{\lambda_1}+e^{\lambda_2}+e^{\lambda_3}" style="display:block;margin:1em auto;max-width:100%" />


still contains


<img src="math_svgs/dss47tl.svg" alt="LaTeX: \lambda_1." style="display:block;margin:1em auto;max-width:100%" />


---

## Applying the Quotient Rule

Since


<img src="math_svgs/d4rqfn7.svg" alt="LaTeX: \frac{d}{d\lambda_1}e^{\lambda_2}=0" style="display:block;margin:1em auto;max-width:100%" />


and


<img src="math_svgs/djw4xjc.svg" alt="LaTeX: \frac{\partial Z}{\partial\lambda_1}=e^{\lambda_1}" style="display:block;margin:1em auto;max-width:100%" />


we obtain


<img src="math_svgs/d1kl7jb.svg" alt="LaTeX: \frac{\partial P_2}{\partial\lambda_1} = -\frac{e^{\lambda_2}e^{\lambda_1}}{Z^2}" style="display:block;margin:1em auto;max-width:100%" />


Recognizing


<img src="math_svgs/d88jfq1.svg" alt="LaTeX: P_i=\frac{e^{\lambda_i}}Z" style="display:block;margin:1em auto;max-width:100%" />
g" alt="LaTeX: P_i=\frac{e^{\lambda_i}}Z" style="display:block;margin:1em auto;max-width:100%" />


gives


<img src="math_svgs/dgwzv93.svg" alt="LaTeX: \boxed{ \frac{\partial P_2}{\partial\lambda_1} = -P_2P_1 }" style="display:block;margin:1em auto;max-width:100%" />


Likewise,


<img src="math_svgs/dja1jrr.svg" alt="LaTeX: \boxed{ \frac{\partial P_3}{\partial\lambda_1} = -P_3P_1 }" style="display:block;margin:1em auto;max-width:100%" />


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


<img src="math_svgs/dvg2237.svg" alt="LaTeX: \frac{\partial P_j}{\partial\lambda_i} = -P_iP_j \qquad (i\neq j)" style="display:block;margin:1em auto;max-width:100%" />


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


<img src="math_svgs/do3mfip.svg" alt="LaTeX: \lambda" style="display:block;margin:1em auto;max-width:100%" />


moves to


<img src="math_svgs/d536aru.svg" alt="LaTeX: \lambda'." style="display:block;margin:1em auto;max-width:100%" />


The correct notion of distance is therefore

the difference between


<img src="math_svgs/djfuy8w.svg" alt="LaTeX: P_\lambda" style="display:block;margin:1em auto;max-width:100%" />


and


<img src="math_svgs/d9b1ofn.svg" alt="LaTeX: P_{\lambda'}." style="display:block;margin:1em auto;max-width:100%" />


---

# KL Divergence

The behavioral distance is measured using

the Kullback-Leibler divergence.

Definition


<img src="math_svgs/dshisth.svg" alt="LaTeX: D_{KL} (P_\lambda\|P_{\lambda'}) = \sum_y P_\lambda(y) \left[ \log P_\lambda - \" style="display:block;margin:1em auto;max-width:100%" />


KL divergence measures how surprising one probability distribution appears when compared with another.

It is **not**

- Euclidean distance

nor

- cosine similarity.

It measures behavioral change.

---

# Substituting the Softmax Formula

Recall


<img src="math_svgs/dgt8yhr.svg" alt="LaTeX: \log P_\lambda = \lambda^TY_y - A(\lambda)" style="display:block;margin:1em auto;max-width:100%" />


Substituting this into KL divergence gives


<img src="math_svgs/d6gt7ng.svg" alt="LaTeX: D_{KL} = \sum_y P_\lambda(y) \left[ (\lambda-\lambda')^TY_y - A(\lambda) + A(\la" style="display:block;margin:1em auto;max-width:100%" />
^TY_y - A(\lambda) + A(\la" style="display:block;margin:1em auto;max-width:100%" />


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


<img src="math_svgs/dxm7sdf.svg" alt="LaTeX: 0.20\times10 + 0.80\times1 = ₹2.80" style="display:block;margin:1em auto;max-width:100%" />


Neural networks follow exactly the same idea.

Instead of money,

our outcomes are

the output embeddings.

Therefore


<img src="math_svgs/dspulub.svg" alt="LaTeX: \boxed{ E[Y] = \sum_y P_\lambda(y)Y_y }" style="display:block;margin:1em auto;max-width:100%" />


This is the probability-weighted average output embedding.

Geometrically,

it represents the center of mass of the output embeddings.

---

# Gradient Interpretation

Earlier we proved


<img src="math_svgs/dtwqhjh.svg" alt="LaTeX: \frac{\partial A}{\partial\lambda_i} = P_i" style="display:block;margin:1em auto;max-width:100%" />


Collecting all partial derivatives produces

the gradient


<img src="math_svgs/d4fldm9.svg" alt="LaTeX: \nabla A(\lambda)" style="display:block;margin:1em auto;max-width:100%" />
fldm9.svg" alt="LaTeX: \nabla A(\lambda)" style="display:block;margin:1em auto;max-width:100%" />


Since every component equals a probability,

the complete gradient becomes


<img src="math_svgs/d8xkhow.svg" alt="LaTeX: \boxed{ \nabla A(\lambda) = \sum_y P_\lambda(y)Y_y }" style="display:block;margin:1em auto;max-width:100%" />


Recognize immediately that


<img src="math_svgs/dcgd88u.svg" alt="LaTeX: \boxed{ \nabla A(\lambda)=E[Y] }" style="display:block;margin:1em auto;max-width:100%" />


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


<img src="math_svgs/da7c05p.svg" alt="LaTeX: A(\lambda)" style="display:block;margin:1em auto;max-width:100%" />


and


<img src="math_svgs/dw7g8ui.svg" alt="LaTeX: A(\lambda')" style="display:block;margin:1em auto;max-width:100%" />


are constants with respect to the summation.

Since


<img src="math_svgs/dnmzv35.svg" alt="LaTeX: \sum_yP_\lambda(y)=1" style="display:block;margin:1em auto;max-width:100%" />


they simplify immediately.

The first vector term can also be factored outside the summation.

This produces


<img src="math_svgs/dtvsyuz.svg" alt="LaTeX: (\lambda-\lambda')^T \sum_y P_\lambda(y)Y_y" style="display:block;margin:1em auto;max-width:100%" />


Replacing the summation with

$$
\nabla A(\lambda)
$$

gives


<img src="math_svgs/d8zvwoo.svg" alt="LaTeX: (\lambda-\lambda')^T\nabla A(\lambda)" style="display:block;margin:1em auto;max-width:100%" />


---

# Final Result

Putting everything together,

the KL divergence becomes


<img src="math_svgs/dpbapiq.svg" alt="LaTeX: \boxed{ D_{KL} (P_\lambda\|P_{\lambda'}) = A(\lambda') - A(\lambda) - \nabla A(\" style="display:block;margin:1em auto;max-width:100%" />


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


<img src="math_svgs/dw69gq5.svg" alt="LaTeX: A(\lambda)." style="display:block;margin:1em auto;max-width:100%" />


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


<img src="math_svgs/dbhyyda.svg" alt="LaTeX: Z=\sum_ie^{\lambda_i}" style="display:block;margin:1em auto;max-width:100%" />


### Log-Normaliser

$$
A(\lambda)=\log Z
$$

### Gradient


<img src="math_svgs/d7dsbes.svg" alt="LaTeX: \nabla A=P" style="display:block;margin:1em auto;max-width:100%" />


### Self-Derivative

$$
\frac{\partial P_i}{\partial\lambda_i}
=
P_i(1-P_i)
$$

### Cross-Derivative


<img src="math_svgs/dvn0hyz.svg" alt="LaTeX: \frac{\partial P_j}{\partial\lambda_i} = -P_iP_j" style="display:block;margin:1em auto;max-width:100%" />


### Expected Value


<img src="math_svgs/ddt29bv.svg" alt="LaTeX: E[Y] = \sum_yP(y)Y_y" style="display:block;margin:1em auto;max-width:100%" />


### Gradient Identity


<img src="math_svgs/dnnzq30.svg" alt="LaTeX: \nabla A(\lambda) = E[Y]" style="display:block;margin:1em auto;max-width:100%" />


### KL Divergence


<img src="math_svgs/d7qkwdg.svg" alt="LaTeX: D_{KL} = A(\lambda') - A(\lambda) - \nabla A(\lambda)^T(\lambda-\lambda')" style="display:block;margin:1em auto;max-width:100%" />


---

# Key Takeaways

- Softmax globally couples every token.
- Increasing one probability necessarily decreases all others.
- The gradient of the log-normaliser equals the expected output embedding.
- KL divergence naturally becomes a Bregman divergence.
- Softmax transforms a flat Euclidean space into a curved information-geometric manifold.