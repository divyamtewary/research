# The Information Geometry of Softmax

> Personal study notes based on *The Information Geometry of Softmax* paper.

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

$$
e^{z_i}
$$

2. Normalization

The exponentials are divided by their total sum.

Because exponentiation is nonlinear, the geometry becomes warped.

## Key Insight

A straight line inside the raw logit space is generally **not** a straight line inside probability space.

Softmax effectively bends the geometry.

---

# Hidden Representation

Assume the model produces a hidden representation

$$
\lambda \in \Lambda \cong \mathbb{R}^d
$$

where

- $\lambda$ is a hidden vector
- $d$ is the dimensionality of the hidden space

Example

If

$$
d = 2048
$$

then every hidden representation is simply a vector containing 2048 real numbers.

The focus of this paper is understanding how this hidden vector is converted into probabilities.

---

# Output Representations

For every candidate output token

$$
\{Y_1,Y_2,\dots,Y_n\}
$$

each output embedding satisfies

$$
Y_j \in \mathbb{R}^d
$$

meaning every output embedding has exactly the same dimensionality as the hidden representation.

---

# Softmax Probability Distribution

The probability of selecting token $Y_j$ given hidden representation $\lambda$ is

$$
P(Y=Y_j\mid\lambda)
=
\exp\left(
\lambda^T Y_j
-
A(\lambda)
\right)
$$

---

# Understanding Every Component

## 1. Probability

$$
P(Y=Y_j|\lambda)
$$

This represents the probability that the model predicts token $Y_j$ given hidden representation $\lambda$.

---

## 2. Exponential

$$
\exp(\cdot)
$$

Exponentiation ensures every score becomes positive.

Negative logits become small positive numbers.

Large logits become much larger.

---

## 3. Dot Product

$$
\lambda^T Y_j
$$

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

$$
\lambda^T Y_1,\,
\lambda^T Y_2,\,
\dots,
\lambda^T Y_n
$$

forms the **logit vector**.

---

# The Log-Normaliser

The term

$$
A(\lambda)
$$

is called the **log-normaliser**.

Its role is to ensure that all probabilities sum to one.

Since probabilities must satisfy

$$
\sum_i P_i=1
$$

the raw logits cannot be used directly.

Instead,

$$
A(\lambda)=\log Z
$$

where

$$
Z=\sum_i e^{\lambda^T Y_i}
$$

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

$$
e^2=7.39
$$

$$
e^1=2.72
$$

$$
e^0=1
$$

---

## Step 2

Compute the partition function.

$$
Z
=
7.39+2.72+1
=
11.11
$$

or generally

$$
Z=\sum_i e^{z_i}
$$

---

## Step 3

Normalize

$$
P(A)=\frac{7.39}{11.11}\approx0.66
$$

$$
P(B)=\frac{2.72}{11.11}\approx0.24
$$

$$
P(C)=\frac{1}{11.11}\approx0.09
$$

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

$$
Z=e^{\lambda_1}+e^{\lambda_2}+e^{\lambda_3}
$$

Increase only

$$
\lambda_1
\rightarrow
\lambda_1+\varepsilon
$$

Then

$$
Z_{\text{new}}
=
e^{\lambda_1+\varepsilon}
+
e^{\lambda_2}
+
e^{\lambda_3}
$$

Using

$$
e^{a+b}=e^ae^b
$$

and

$$
e^\varepsilon\approx1+\varepsilon
$$

we obtain

$$
Z_{\text{new}}
=
Z+\varepsilon e^{\lambda_1}
$$

Therefore

$$
\Delta Z
=
\varepsilon e^{\lambda_1}
$$

---

# Derivative of the Partition Function

Taking the derivative,

$$
\frac{\partial Z}{\partial\lambda_1}
=
e^{\lambda_1}
$$

This measures how rapidly the partition function grows as $\lambda_1$ changes.

---

# Derivative of the Log-Normaliser

Since

$$
A(\lambda)=\log Z
$$

Chain rule gives

$$
\frac{\partial A}{\partial\lambda_1}
=
\frac1Z
\frac{\partial Z}{\partial\lambda_1}
$$

Substituting

$$
\frac{\partial Z}{\partial\lambda_1}=e^{\lambda_1}
$$

gives

$$
\frac{\partial A}{\partial\lambda_1}
=
\frac{e^{\lambda_1}}{Z}
$$

Recognize that

$$
P_1=\frac{e^{\lambda_1}}Z
$$

Therefore

$$
\boxed{
\frac{\partial A}{\partial\lambda_1}=P_1
}
$$

---

# Key Result

The gradient of the log-normaliser equals the Softmax probability.

$$
\nabla A=P
$$

This is one of the central geometric results of the paper.

---

# Deriving the Rate of Change of Softmax Probability

Recall

$$
P_1=\frac{e^{\lambda_1}}Z
$$

Using the quotient rule,

$$
\frac{\partial P_1}{\partial\lambda_1}
=
\frac{e^{\lambda_1}Z-e^{2\lambda_1}}{Z^2}
$$

Rearranging,

$$
\boxed{
\frac{\partial P_1}{\partial\lambda_1}
=
P_1(1-P_1)
}
$$

This describes how a token's probability changes as its own logit changes.

---

**End of Part 1**