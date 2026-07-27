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

<img src="math_svgs/d7af766372cc6.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

2. Normalization

The exponentials are divided by their total sum.

Because exponentiation is nonlinear, the geometry becomes warped.

## Key Insight

A straight line inside the raw logit space is generally **not** a straight line inside probability space.

Softmax effectively bends the geometry.

---

# Hidden Representation

Assume the model produces a hidden representation

<img src="math_svgs/df32391eab29c.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

where

- <img src="math_svgs/ic6a6eb61fd9c.svg" alt="math" style="display:inline;vertical-align:middle;max-width:100%"/>"math_svgs/ic6a6eb61fd9c.svg" alt="math" style="display:inline;vertical-align:middle;max-width:100%"/>"math_svgs/ic6a6eb61fd9c.svg" alt="math" style="display:inline;vertical-align:middle;max-width:100%"/> is a hidden vector
- <img src="math_svgs/i8277e0910d75.svg" alt="math" style="display:inline;vertical-align:middle;max-width:100%"/> is the dimensionality of the hidden space

Example

If

<img src="math_svgs/de6e97dca122c.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

then every hidden representation is simply a vector containing 2048 real numbers.

The focus of this paper is understanding how this hidden vector is converted into probabilities.

---

# Output Representations

For every candidate output token

<img src="math_svgs/df80dbd02f151.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

each output embedding satisfies

<img src="math_svgs/d4b9fba364c1f.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

meaning every output embedding has exactly the same dimensionality as the hidden representation.

---

# Softmax Probability Distribution

The probability of selecting token <img src="math_svgs/i8a08bb342996.svg" alt="math" style="display:inline;vertical-align:middle;max-width:100%"/>src="math_svgs/i8a08bb342996.svg" alt="math" style="display:inline;vertical-align:middle;max-width:100%"/> given hidden representation <img src="math_svgs/ic6a6eb61fd9c.svg" alt="math" style="display:inline;vertical-align:middle;max-width:100%"/>"math_svgs/ic6a6eb61fd9c.svg" alt="math" style="display:inline;vertical-align:middle;max-width:100%"/> is

<img src="math_svgs/df1290c0e2b81.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

---

# Understanding Every Component

## 1. Probability

<img src="math_svgs/d4ea70834d831.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

This represents the probability that the model predicts token <img src="math_svgs/i8a08bb342996.svg" alt="math" style="display:inline;vertical-align:middle;max-width:100%"/> given hidden representation $\lambda$.

---

## 2. Exponential

<img src="math_svgs/d67ea91d42969.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Exponentiation ensures every score becomes positive.

Negative logits become small positive numbers.

Large logits become much larger.

---

## 3. Dot Product

<img src="math_svgs/db44b0fa2d3d6.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

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

<img src="math_svgs/d525134a32b81.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

forms the **logit vector**.

---

# The Log-Normaliser

The term

<img src="math_svgs/d0a365f67af7f.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

is called the **log-normaliser**.

Its role is to ensure that all probabilities sum to one.

Since probabilities must satisfy

<img src="math_svgs/d06077577d665.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

the raw logits cannot be used directly.

Instead,

<img src="math_svgs/dd754f85dcbd0.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>f85dcbd0.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>f85dcbd0.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

where

<img src="math_svgs/d4dff91a07cf8.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

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

<img src="math_svgs/d1effbc553453.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

<img src="math_svgs/df365d25d4004.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

<img src="math_svgs/d1945592150dc.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

---

## Step 2

Compute the partition function.

<img src="math_svgs/dbc2b2c0ad075.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

or generally

<img src="math_svgs/dfa7d53c8e7f7.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

---

## Step 3

Normalize

<img src="math_svgs/ddf2e0465f2f1.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

<img src="math_svgs/db79c0de486f4.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

<img src="math_svgs/d39939d19af03.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Now

- every probability is positive
- probabilities sum to one

Also,

<img src="math_svgs/dd754f85dcbd0.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>54f85dcbd0.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

---

# Sensitivity of the Partition Function

Question:

> What happens if one logit changes slightly?

Suppose

<img src="math_svgs/d01825d4d45bf.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Increase only

<img src="math_svgs/ddc92bad16a4b.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Then

<img src="math_svgs/de91fbc4c377b.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Using

<img src="math_svgs/d1f0042217308.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

and

<img src="math_svgs/dfc7a24a80014.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

we obtain

<img src="math_svgs/ddb9656e32d2c.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Therefore

<img src="math_svgs/d806e2471b792.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

---

# Derivative of the Partition Function

Taking the derivative,

<img src="math_svgs/dbd6ab9a1fced.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

This measures how rapidly the partition function grows as <img src="math_svgs/ief8865f6e97b.svg" alt="math" style="display:inline;vertical-align:middle;max-width:100%"/> changes.

---

# Derivative of the Log-Normaliser

Since

$$
A(\lambda)=\log Z
$$

Chain rule gives

<img src="math_svgs/de722d38193bf.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Substituting

<img src="math_svgs/dddbcb767452e.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

gives

<img src="math_svgs/dae9c694a39a2.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Recognize that

<img src="math_svgs/d7305a7167da4.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Therefore

<img src="math_svgs/dc8981073014b.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

---

# Key Result

The gradient of the log-normaliser equals the Softmax probability.

<img src="math_svgs/d7be4db7041f3.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

This is one of the central geometric results of the paper.

---

# Deriving the Rate of Change of Softmax Probability

Recall

<img src="math_svgs/d7305a7167da4.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Using the quotient rule,

<img src="math_svgs/dd72c34901627.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

Rearranging,

<img src="math_svgs/d4be1aefab8af.svg" alt="math" style="display:block;margin:1em auto;max-width:100%"/>

This describes how a token's probability changes as its own logit changes.

---

**End of Part 1**