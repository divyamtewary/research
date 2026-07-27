# The Information Geometry of Softmax

> Personal study notes based on *The Information Geometry of Softmax* paper.
> *(Math rendered with KaTeX SVGs via GitHub Actions)*

---

# Goal of the Paper

The central objective of this paper is to understand how the **linear representation hypothesis** interacts with the natural **information geometry** of the representation space.

More specifically, the paper studies the special case of **Softmax-based models**, showing how the Softmax transformation changes the geometry of the representation space and discussing the implications of this geometry for interpretability methods.

---

# Flat Euclidean Representation Space

Traditionally, researchers think of a neural network's hidden representation as a point inside a high-dimensional Euclidean space.

Under the **Linear Representation Hypothesis**, semantic concepts occupy approximately linear directions inside this hidden space.

Example:

```
dog ---------------------- cat
```

Moving in a straight direction inside the hidden representation should gradually transform one concept into another.

This assumption treats the hidden representation space as **flat (Euclidean).**

---

# Why Softmax Changes Everything

Neural networks do not directly output hidden vectors.

Instead, they output **probability distributions**.

The mapping from hidden vectors to probabilities is performed by the **Softmax function.**

Softmax converts raw scores (**logits**) into probabilities.

These probabilities

- are always positive
- lie between 0 and 1
- sum to exactly 1

---

# The Softmax Distortion

Softmax performs two important operations.

1. Exponentiation

Each logit is exponentiated.


<img src="math_svgs/d2mjztl.svg" alt="LaTeX: e^{z_i}" style="display:block;margin:1em auto;max-width:100%" />


2. Normalization

The exponentials are divided by their total sum.

Because exponentiation is nonlinear, the geometry becomes warped.

## Key Insight

A straight line inside the raw logit space is generally **not** a straight line inside probability space.

Softmax effectively bends the geometry.

---

# Hidden Representation

Assume the model produces a hidden representation


<img src="math_svgs/dxo2734.svg" alt="LaTeX: \lambda \in \Lambda \cong \mathbb{R}^d" style="display:block;margin:1em auto;max-width:100%" />


where

- <img src="math_svgs/ic1amit.svg" alt="LaTeX: \lambda" style="display:inline;vertical-align:middle;max-width:100%" />"math_svgs/ic1amit.svg" alt="LaTeX: \lambda" style="display:inline;vertical-align:middle;max-width:100%" />"math_svgs/ic1amit.svg" alt="LaTeX: \lambda" style="display:inline;vertical-align:middle;max-width:100%" /> is a hidden vector
- <img src="math_svgs/it44.svg" alt="LaTeX: d" style="display:inline;vertical-align:middle;max-width:100%" /> is the dimensionality of the hidden space

Example

If


<img src="math_svgs/djssvfj.svg" alt="LaTeX: d = 2048" style="display:block;margin:1em auto;max-width:100%" />


then every hidden representation is simply a vector containing 2048 real numbers.

The focus of this paper is understanding how this hidden vector is converted into probabilities.

---

# Output Representations

For every candidate output token


<img src="math_svgs/dwnv58x.svg" alt="LaTeX: \{Y_1,Y_2,\dots,Y_n\}" style="display:block;margin:1em auto;max-width:100%" />


each output embedding satisfies


<img src="math_svgs/dgtjow3.svg" alt="LaTeX: Y_j \in \mathbb{R}^d" style="display:block;margin:1em auto;max-width:100%" />


meaning every output embedding has exactly the same dimensionality as the hidden representation.

---

# Softmax Probability Distribution

The probability of selecting token <img src="math_svgs/ilfg78.svg" alt="LaTeX: Y_j" style="display:inline;vertical-align:middle;max-width:100%" />src="math_svgs/ilfg78.svg" alt="LaTeX: Y_j" style="display:inline;vertical-align:middle;max-width:100%" /> given hidden representation $\lambda$ is


<img src="math_svgs/dyclu5z.svg" alt="LaTeX: P(Y=Y_j\mid\lambda) = \exp\left( \lambda^T Y_j - A(\lambda) \right)" style="display:block;margin:1em auto;max-width:100%" />


---

# Understanding Every Component

## 1. Probability


<img src="math_svgs/d22hu7u.svg" alt="LaTeX: P(Y=Y_j|\lambda)" style="display:block;margin:1em auto;max-width:100%" />


This represents the probability that the model predicts token $Y_j$ given hidden representation $\lambda$.

---

## 2. Exponential


<img src="math_svgs/dp2gt4q.svg" alt="LaTeX: \exp(\cdot)" style="display:block;margin:1em auto;max-width:100%" />


Exponentiation ensures every score becomes positive.

Negative logits become small positive numbers.

Large logits become much larger.

---

## 3. Dot Product


<img src="math_svgs/dhj0ik7.svg" alt="LaTeX: \lambda^T Y_j" style="display:block;margin:1em auto;max-width:100%" />


This is the similarity score between

- hidden representation
- output embedding

It is an ordinary dot product.

Properties

- scalar value
- can be negative
- can be positive
- unbounded

The collection


<img src="math_svgs/doytl1a.svg" alt="LaTeX: \lambda^T Y_1,\, \lambda^T Y_2,\, \dots, \lambda^T Y_n" style="display:block;margin:1em auto;max-width:100%" />


forms the **logit vector**.

---

# The Log-Normaliser

The term


<img src="math_svgs/da7c05p.svg" alt="LaTeX: A(\lambda)" style="display:block;margin:1em auto;max-width:100%" />


is called the **log-normaliser**.

Its role is to ensure that all probabilities sum to one.

Since probabilities must satisfy


<img src="math_svgs/dqm5v6v.svg" alt="LaTeX: \sum_i P_i=1" style="display:block;margin:1em auto;max-width:100%" />


the raw logits cannot be used directly.

Instead,


<img src="math_svgs/dx1wo8u.svg" alt="LaTeX: A(\lambda)=\log Z" style="display:block;margin:1em auto;max-width:100%" />
1wo8u.svg" alt="LaTeX: A(\lambda)=\log Z" style="display:block;margin:1em auto;max-width:100%" />
1wo8u.svg" alt="LaTeX: A(\lambda)=\log Z" style="display:block;margin:1em auto;max-width:100%" />


where


<img src="math_svgs/djleyo1.svg" alt="LaTeX: Z=\sum_i e^{\lambda^T Y_i}" style="display:block;margin:1em auto;max-width:100%" />


---

# Understanding the Partition Function

Consider three logits

| Token | Logit |
|-------|------:|
| A | 2 |
| B | 1 |
| C | 0 |

These are **not probabilities.**

---

## Step 1

Exponentiate each logit.


<img src="math_svgs/dv94adb.svg" alt="LaTeX: e^2=7.39" style="display:block;margin:1em auto;max-width:100%" />



<img src="math_svgs/dc6oeho.svg" alt="LaTeX: e^1=2.72" style="display:block;margin:1em auto;max-width:100%" />



<img src="math_svgs/dcikd07.svg" alt="LaTeX: e^0=1" style="display:block;margin:1em auto;max-width:100%" />


---

## Step 2

Compute the partition function.


<img src="math_svgs/dcoik0f.svg" alt="LaTeX: Z = 7.39+2.72+1 = 11.11" style="display:block;margin:1em auto;max-width:100%" />


or generally


<img src="math_svgs/dm4wwh5.svg" alt="LaTeX: Z=\sum_i e^{z_i}" style="display:block;margin:1em auto;max-width:100%" />


---

## Step 3

Normalize


<img src="math_svgs/dtdghto.svg" alt="LaTeX: P(A)=\frac{7.39}{11.11}\approx0.66" style="display:block;margin:1em auto;max-width:100%" />



<img src="math_svgs/d9xs7qb.svg" alt="LaTeX: P(B)=\frac{2.72}{11.11}\approx0.24" style="display:block;margin:1em auto;max-width:100%" />



<img src="math_svgs/dg70ce3.svg" alt="LaTeX: P(C)=\frac{1}{11.11}\approx0.09" style="display:block;margin:1em auto;max-width:100%" />


Now

- every probability is positive
- probabilities sum to one

Also,

$$
A(\lambda)=\log Z
$$

---

# Sensitivity of the Partition Function

Question:

> What happens if one logit changes slightly?

Suppose


<img src="math_svgs/d8h2jea.svg" alt="LaTeX: Z=e^{\lambda_1}+e^{\lambda_2}+e^{\lambda_3}" style="display:block;margin:1em auto;max-width:100%" />


Increase only


<img src="math_svgs/dd8wtk1.svg" alt="LaTeX: \lambda_1 \rightarrow \lambda_1+\varepsilon" style="display:block;margin:1em auto;max-width:100%" />


Then


<img src="math_svgs/dr397zq.svg" alt="LaTeX: Z_{\text{new}} = e^{\lambda_1+\varepsilon} + e^{\lambda_2} + e^{\lambda_3}" style="display:block;margin:1em auto;max-width:100%" />


Using


<img src="math_svgs/d8t4k1j.svg" alt="LaTeX: e^{a+b}=e^ae^b" style="display:block;margin:1em auto;max-width:100%" />


and


<img src="math_svgs/dl0kgch.svg" alt="LaTeX: e^\varepsilon\approx1+\varepsilon" style="display:block;margin:1em auto;max-width:100%" />


we obtain


<img src="math_svgs/dccjeft.svg" alt="LaTeX: Z_{\text{new}} = Z+\varepsilon e^{\lambda_1}" style="display:block;margin:1em auto;max-width:100%" />


Therefore


<img src="math_svgs/dvf10fs.svg" alt="LaTeX: \Delta Z = \varepsilon e^{\lambda_1}" style="display:block;margin:1em auto;max-width:100%" />


---

# Derivative of the Partition Function

Taking the derivative,


<img src="math_svgs/d5xpham.svg" alt="LaTeX: \frac{\partial Z}{\partial\lambda_1} = e^{\lambda_1}" style="display:block;margin:1em auto;max-width:100%" />


This measures how rapidly the partition function grows as <img src="math_svgs/ibgoh0t.svg" alt="LaTeX: \lambda_1" style="display:inline;vertical-align:middle;max-width:100%" /> changes.

---

# Derivative of the Log-Normaliser

Since

$$
A(\lambda)=\log Z
$$

Chain rule gives


<img src="math_svgs/d95cv7x.svg" alt="LaTeX: \frac{\partial A}{\partial\lambda_1} = \frac1Z \frac{\partial Z}{\partial\lambda" style="display:block;margin:1em auto;max-width:100%" />


Substituting


<img src="math_svgs/djw4xjc.svg" alt="LaTeX: \frac{\partial Z}{\partial\lambda_1}=e^{\lambda_1}" style="display:block;margin:1em auto;max-width:100%" />


gives


<img src="math_svgs/dq6wakl.svg" alt="LaTeX: \frac{\partial A}{\partial\lambda_1} = \frac{e^{\lambda_1}}{Z}" style="display:block;margin:1em auto;max-width:100%" />


Recognize that


<img src="math_svgs/d9xfwwp.svg" alt="LaTeX: P_1=\frac{e^{\lambda_1}}Z" style="display:block;margin:1em auto;max-width:100%" />
g" alt="LaTeX: P_1=\frac{e^{\lambda_1}}Z" style="display:block;margin:1em auto;max-width:100%" />


Therefore


<img src="math_svgs/dobxblj.svg" alt="LaTeX: \boxed{ \frac{\partial A}{\partial\lambda_1}=P_1 }" style="display:block;margin:1em auto;max-width:100%" />


---

# Key Result

The gradient of the log-normaliser equals the Softmax probability.


<img src="math_svgs/d7dsbes.svg" alt="LaTeX: \nabla A=P" style="display:block;margin:1em auto;max-width:100%" />


This is one of the central geometric results of the paper.

---

# Deriving the Rate of Change of Softmax Probability

Recall

$$
P_1=\frac{e^{\lambda_1}}Z
$$

Using the quotient rule,


<img src="math_svgs/drgx8w3.svg" alt="LaTeX: \frac{\partial P_1}{\partial\lambda_1} = \frac{e^{\lambda_1}Z-e^{2\lambda_1}}{Z^" style="display:block;margin:1em auto;max-width:100%" />


Rearranging,


<img src="math_svgs/dirnq8v.svg" alt="LaTeX: \boxed{ \frac{\partial P_1}{\partial\lambda_1} = P_1(1-P_1) }" style="display:block;margin:1em auto;max-width:100%" />


This describes how a token's probability changes as its own logit changes.

---

**End of Part 1**