+++
date = '2026-01-19T22:46:15-05:00'
draft = true
title = 'Unraveling the mathematical machinery behind PCA'
categories = ['biocodetalks','pca']
tags= ["PCA", "statistics", "history", "mathematics", "computational biology"]
author= "Arvind Iyer"
description= "Unraveling the mathematical machinery behind PCA: Lagrange multipliers to the spectral theorem"
type = 'post'
subscription = true
like = true
math=true
#toc = true
thumbnail= "images/pca_thumbnail_2.png"
+++

Welcome to <span style="color:#1f77b4">Part 2</span> of my PCA series! If you missed [Part 1](https://arvindkiyer.com/mixomania/2025/12/29/principal-component-analysis-series-1/), I suggest starting there to get the historical background and some intuition 📚.

In Part 1, we looked at how PCA started with Pearson's geometric ideas and moved to Hotelling's algebraic approach. We touched on the math but kept it simple. This time, <span style="color:#d62728"> we're diving in much deeper </span> 🤿.

A quick personal note: I'm honestly not great at math, so I had to pull out some old textbooks for this one 😅. I've always been hard on myself about my work, and writing this is my way of facing that. We'll start from the basics, figure out *why* the math works, and tackle these big questions: Why eigenvalues? Why orthogonality? Just a heads up, there will be a lot of equations, and I might move around between topics a bit. Thanks for sticking with me 💪.

---

## <span style="color:#1f77b4">Some Mathematical Foundations</span>

I'll use  **music**  as our guide, along with examples from measuring gene expression, because linear algebra and statistics are a lot like music. Individual notes, or numbers, combine into chords, or vectors, which then form harmonies, or transformations, all building toward a complete symphony, which is PCA. If you understand why some musical combinations sound good together, you can also understand why certain mathematical operations work well together. Let's start from the ground up and build genuine intuition 🎨.

---
## <span style="color:#2ca02c">Act I: The Stage – Points in Space</span>

### <span style="color:#ff7f0e">Musical Analogy: Notes on a Staff</span>

Imagine looking at sheet music. Each note has two properties: pitch, which is its vertical position, and **timing**, which is its horizontal position. The note $(C, \text{quarter-note})$ is a point in 2D musical space. A melody is just a collection of these points 🎶.

In the same way, **data can be seen as points in space.** (Geometry is fun ❤️)

### <span style="color:#2ca02c">Data Cloud </span>

Suppose you measure gene expression in a cell. You measure:
- Gene A expression: 5.2
- Gene B expression: 3.8

This cell is a **point** in 2D space: $(5.2, 3.8)$ 📍.

If you have 100 cells, you have 100 points in 2D space. This collection of points is your data aka  **point cloud**. With 3 genes, you have points in 3D space. With 20,000 genes, you have points in 20,000-dimensional space. It's hard to visualize, but that's the beauty of geometry 🚀.

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">
Core Concept: Data science is about finding patterns in point clouds. PCA helps us find the best viewpoint to see these patterns clearly.
</strong>
</div>

<img src="/images/gene_expression_scatter.png" alt="Gene Expression Cloud" height=350px>

---
## <span style="color:#2ca02c">Act II: Vectors – Points with Direction</span>

### <span style="color:#ff7f0e">From Musical Notes to Vectors</span>

Now, let's talk about **direction.** Music isn't just static dots on a page, it moves. Watch a conductor's baton. It doesn't just point at a note, it shows direction, which way the music is heading, and **magnitude**, or how strong that movement should be. The vector from the conductor's shoulder to the baton tip captures this motion. It's an arrow that tells musicians not just *where*, but *how* to play 🎼.

**The connection:** 
- **Sheet music notes** = data points (static locations in space)
- **Conductor's baton** = vectors which are arrows showing direction and magnitude

### <span style="color:#2ca02c">Vectors: Two Personalities</span>

A **vector** is a list of numbers, but it can be understood in two ways (multiple actually 😅):


**1. A Point:** 
$$\mathbf{v} = \begin{bmatrix} 5.2 \\\\ 3.8 \end{bmatrix}$$
"The cell has 5.2 expression of gene A and 3.8 of gene B" 📍

**2. A Direction (arrow from origin):**
$$\mathbf{v} = \begin{bmatrix} 5.2 \\\\ 3.8 \end{bmatrix}$$
"*Move* 5.2 units in the A-direction, 3.8 units in the B-direction" ➡️

### <span style="color:#2ca02c">Vector Length (Magnitude)</span>

How "loud" is our vector? Its **norm** (length):

$$\|\mathbf{v}\| = \sqrt{v_1^2 + v_2^2 + \cdots + v_p^2}$$

**Example:** $\mathbf{v} = \begin{bmatrix} 3 \\\\ 4 \end{bmatrix}$

$$\|\mathbf{v}\| = \sqrt{3^2 + 4^2} = 5$$

This is just the *Pythagorean theorem*! The vector has "magnitude" 5 📏.

**Unit vectors** have length 1 (like normalizing volume to a standard level):
$$\hat{\mathbf{v}} = \frac{\mathbf{v}}{\|\mathbf{v}\|} = \begin{bmatrix} 3/5 \\\\ 4/5 \end{bmatrix} = \begin{bmatrix} 0.6 \\\\ 0.8 \end{bmatrix}$$

In PCA, we use unit vectors to specify **directions** without worrying about scale.

<img src="/images/vector_diagram.png" alt="vector" height=250px width=250px>

---

## <span style="color:#2ca02c">Act III: Linear Combinations – Mixing Sounds</span>

### <span style="color:#ff7f0e">🎵 Musical Analogy: Chords from Individual Notes</span>

A **C major chord** isn't a new type of note, it's a combination: C + E + G played together. The "loudness" of each note determines the chord's character. Play C louder and E softer? Different sound, same chord structure 🎹.

### <span style="color:#2ca02c">Linear Combinations: Building New Vectors</span>

A **linear combination** of vectors $\mathbf{v}_1, \mathbf{v}_2$ is:

$$\mathbf{w} = \alpha_1 \mathbf{v}_1 + \alpha_2 \mathbf{v}_2$$

where $\alpha_1, \alpha_2$ are scalars (numbers).

**Example:**
$$\mathbf{v}_1 = \begin{bmatrix} 1 \\\\ 0 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 0 \\\\ 1 \end{bmatrix}$$

$$\mathbf{w} = 3\mathbf{v}_1 + 4\mathbf{v}_2 = 3\begin{bmatrix} 1 \\\\ 0 \end{bmatrix} + 4\begin{bmatrix} 0 \\\\ 1 \end{bmatrix} = \begin{bmatrix} 3 \\\\ 4 \end{bmatrix}$$

We "mixed" 3 parts $\mathbf{v}_1$ and 4 parts $\mathbf{v}_2$ to get $\mathbf{w}$ 🎨.

**Why this matters for PCA:** Principal components are **linear combinations** of your original genes. PC1 might be:
$$\text{PC1} = 0.5 \cdot \text{GeneA} + 0.3 \cdot \text{GeneB} - 0.2 \cdot \text{GeneC} + \cdots$$

This means PC1 isn't some magical new measurement, it's a weighted sum of your original measurements. The weights (0.5, 0.3, -0.2, etc.) tell you which genes contribute most to this component. Genes with large absolute weights are the "important" genes for that component.

---

## <span style="color:#2ca02c">Act IV: Basis – The Musical Scale</span>

### <span style="color:#ff7f0e">🎵 Musical Analogy: The 12-Tone Scale</span>

Western music uses 12 notes (C, C♯, D, ..., B). Any melody, no matter how complex, is a combination of these 12 notes at different times and octaves. These 12 notes form a **basis** for all Western music 🎼.

Want to write a song? Specify how much of each note, when. The basis makes composition systematic.

### <span style="color:#2ca02c">Basis Vectors: The Coordinate System</span>

A **basis** is a set of vectors that can **generate any vector in the space** through linear combinations.

In 2D, the standard basis is:
$$\mathbf{e}_1 = \begin{bmatrix} 1 \\\\ 0 \end{bmatrix}, \quad \mathbf{e}_2 = \begin{bmatrix} 0 \\\\ 1 \end{bmatrix}$$

Any 2D vector can be written as:
$$\mathbf{v} = v_1\mathbf{e}_1 + v_2\mathbf{e}_2 = \begin{bmatrix} v_1 \\\\ v_2 \end{bmatrix}$$

These are our coordinate axes! 📐

**But here's the key insight:** <span style="color:#ff7f0e">The choice of basis is arbitrary!</span> We could use different basis vectors:

$$\mathbf{b}_1 = \begin{bmatrix} 1/\sqrt{2} \\\\ 1/\sqrt{2} \end{bmatrix}, \quad \mathbf{b}_2 = \begin{bmatrix} -1/\sqrt{2} \\\\ 1/\sqrt{2} \end{bmatrix}$$

These are **rotated 45°** from the standard axes. Same space, different perspective! 🔄

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">
💡 PCA's Big Idea: Find a NEW basis (coordinate system) where the data's structure is most clear. The principal components ARE this new basis!
</strong>
</div>

**Orthonormal basis:** When basis vectors are:
1. **Orthogonal** (perpendicular, like musical notes that don't clash)
2. **Normal** (unit length, standardized volume)

The standard basis and the rotated basis above are both orthonormal. PCA always gives an orthonormal basis 🎯.

<img src="/images/coordinate_transformation.png" alt="coordinate_transformation" height=350px width=350px>

---

## <span style="color:#2ca02c">Act V: Transformations – Remixing the Sound</span>

### <span style="color:#ff7f0e">🎵 Musical Analogy: Audio Effects</span>

Ever use an equalizer? Boosting bass while cutting treble **transforms** the sound. A reverb effect transforms dry audio into something spacious. Each effect is a systematic transformation 🎚️.

Matrices do the same thing to vectors, they're the "audio effects" of geometry.

### <span style="color:#2ca02c">Matrices as Transformations</span>

A matrix $\mathbf{A}$ acting on a vector $\mathbf{v}$ produces a new vector:
$$\mathbf{w} = \mathbf{A}\mathbf{v}$$

This **transforms** $\mathbf{v}$ into $\mathbf{w}$. What kind of **transformation**?

#### <span style="color:#ff7f0e">Rotation</span>


Rotate a vector by angle $\theta$ counterclockwise:
$$\mathbf{R}(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta \\\\ \sin\theta & \cos\theta \end{bmatrix}$$

**Example:** Rotate $\begin{bmatrix} 1 \\\\ 0 \end{bmatrix}$ by 90°:

$$\mathbf{R}(90°) = \begin{bmatrix} 0 & -1 \\\\ 1 & 0 \end{bmatrix}, \quad \mathbf{R}(90°)\begin{bmatrix} 1 \\\\ 0 \end{bmatrix} = \begin{bmatrix} 0 \\\\ 1 \end{bmatrix}$$

The vector rotated from pointing right to pointing up! 🔄

**PCA uses rotation** to align axes with maximum variance directions.

P.S Skipping here few explnation of how we got $\mathbf{R}(\theta)$ (it is bit of trigonometry, linear algebra mix. I let readers figure that out.)

#### <span style="color:#ff7f0e">Scaling (Stretching/Shrinking)</span>

Multiply components by different factors:
$$\mathbf{S} = \begin{bmatrix} 2 & 0 \\\\ 0 & 3 \end{bmatrix}$$

$$\mathbf{S}\begin{bmatrix} 1 \\\\ 1 \end{bmatrix} = \begin{bmatrix} 2 \\\\ 3 \end{bmatrix}$$

Stretched $x$-component by 2, $y$-component by 3 📏.

#### <span style="color:#ff7f0e">Shear (Skewing)</span>

Slant the space:
$$\mathbf{H} = \begin{bmatrix} 1 & 0.5 \\\\ 0 & 1 \end{bmatrix}$$

$$\mathbf{H}\begin{bmatrix} 0 \\\\ 2 \end{bmatrix} = \begin{bmatrix} 1 \\\\ 2 \end{bmatrix}$$

The vertical line got tilted! ↗️

### <span style="color:#2ca02c">Eigenvectors: The "Pure Tones"</span>

Remember eigenvectors? They're special directions that a matrix only **scales**, never rotates:
$$\mathbf{A}\mathbf{v} = \lambda\mathbf{v}$$

**Musical analogy:** Imagine an audio effect that makes certain frequencies **louder** without changing their pitch. Those frequencies are like eigenvectors, the transformation affects their amplitude ($\lambda$) but not their "direction" (frequency) 🎵.

For the scaling matrix $\mathbf{S} = \begin{bmatrix} 2 & 0 \\\\ 0 & 3 \end{bmatrix}$:

- $\mathbf{v}_1 = \begin{bmatrix} 1 \\\\ 0 \end{bmatrix}$ is an eigenvector with $\lambda_1 = 2$
- $\mathbf{v}_2 = \begin{bmatrix} 0 \\\\ 1 \end{bmatrix}$ is an eigenvector with $\lambda_2 = 3$

These are the "natural axes" of the **transformation**! 🎯

**Why eigenvectors matter for PCA:** The covariance matrix (will come on this later) describes how your data is spread out and correlated. The eigenvectors of this matrix point in the directions of maximum, uncorrelated variation. They reveal the data's "natural" coordinate system, the one where the structure is most apparent.

<img src="/images/coordinate_transformation.png" alt="coordinate_transformation" height=350px width=350px>

---

## <span style="color:#2ca02c">Act VI: How Linear Algebra Pieces Fit Together</span>

### <span style="color:#ff7f0e">🎵 Musical Analogy: From Notes to Symphony</span>

We've learned:
- **Notes** (scalars/numbers)
- **Chords** (vectors/points)
- **Scales** (basis sets)
- **Audio effects** (matrix transformations)
- **Pure tones** (eigenvectors)

Now let's see how they create a symphony (data analysis)! 🎼

### <span style="color:#2ca02c">The Big Picture</span>

1. **Your data** = Point cloud in high-dimensional space
2. **Current basis** = Your measurement axes (genes, features)
3. **Covariance matrix** = Describes how features relate/vary together
4. **Eigenvectors of covariance** = Natural axes of variation (the "pure tones" of your data)
5. **PCA transformation** = Rotation to these natural axes
6. **Principal components** = The new coordinate system that reveals structure

**Here's the flow:**

```
Original Data (in gene space)
      ↓
Compute Covariance Matrix (how genes co-vary)
      ↓  
Find Eigenvectors (natural variation directions)
      ↓
Rotate Data to Eigenvector Basis (PCA transformation)
      ↓
New Data (in PC space) - Structure revealed!
```

Every matrix transformation can be understood through its eigenvectors, they're the "essence" of what the **transformation** does 🎯.

---

## <span style="color:#2ca02c">Interlude: Statistics</span>

We've built geometric intuition. Now let's connect to **statistics**: mean, variance, covariance. These describe the **shape and orientation** of our point cloud 📊.

---

## <span style="color:#2ca02c">Act VII: The Center – Finding "Home"</span>

### <span style="color:#ff7f0e">🎵 Musical Analogy: The Tonic (Home Note)</span>

Every key has a **tonic**, the "home" note that feels like resolution. In C major, C is home. Melodies wander but gravitate back to C. The tonic is the "center" of the musical space 🎹.

### <span style="color:#2ca02c">Mean: The Center of Mass</span>

The **mean** is the center of your point cloud:

$$\bar{\mathbf{x}} = \frac{1}{n}\sum_{i=1}^n \mathbf{x}_i = \begin{bmatrix} \bar{x}_1 \\\\ \bar{x}_2 \\\\ \vdots \\\\ \bar{x}_p \end{bmatrix}$$

For each feature, average across all observations.

**Example:** 3 cells, 2 genes:
$$\mathbf{X} = \begin{bmatrix} 5 & 3 \\\\ 7 & 5 \\\\ 4 & 4 \end{bmatrix}$$

Mean: $\bar{\mathbf{x}} = \begin{bmatrix} (5+7+4)/3 \\\\ (3+5+4)/3 \end{bmatrix} = \begin{bmatrix} 5.33 \\\\ 4.0 \end{bmatrix}$

This is the "center of gravity" of the point cloud 📍.

**Centering:** We typically subtract the mean so our data cloud is centered at the origin:
$$\mathbf{X}_{\text{centered}} = \mathbf{X} - \mathbf{1}_n\bar{\mathbf{x}}^T$$

Why? Because PCA cares about **variance** (spread), not absolute position. Centering removes the "where" and focuses on the "how spread" 🎯.

---

## <span style="color:#2ca02c">Act VIII: Variance – The Spread of Sound</span>

### <span style="color:#ff7f0e">🎵 Musical Analogy: Dynamic Range</span>

A song's **dynamic range** is the difference between quietest and loudest moments. Classical symphonies have huge dynamic range (whisper to roar). Pop songs often have less (compressed for radio). **Variance** is the mathematical dynamic range 📻.

### <span style="color:#2ca02c">Variance: How Much Things Vary</span>

For centered data (mean = 0), variance is:

$$\text{Var}(x) = \frac{1}{n}\sum_{i=1}^n x_i^2$$

Average squared distance from zero (the center).

**Example:** Gene expression: $[-1.33, 1.67, -0.33]$ (centered)

$$\text{Var} = \frac{(-1.33)^2 + (1.67)^2 + (-0.33)^2}{3} = \frac{1.77 + 2.79 + 0.11}{3} = 1.56$$

**Why squared?** So negative and positive deviations contribute equally. $-2$ and $+2$ are both 2 units from center 📏.

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">
🎯 PCA's Goal: Find directions where variance is MAXIMUM. High variance = interesting variation = biological signal!
</strong>
</div>

---

## <span style="color:#2ca02c">Act IX: Covariance – When Instruments Play Together</span>

### <span style="color:#ff7f0e">🎵 Musical Analogy: Harmony vs. Dissonance</span>

When two notes are played together, they can be:
- **Harmonic** (C and G move together pleasantly, like correlation)
- **Dissonant** (notes clash, like negative correlation)
- **Independent** (each note doesn't affect the other, zero correlation)

**Covariance** measures how two features "harmonize" 🎼.

### <span style="color:#2ca02c">Covariance: Dancing in Pairs</span>

For centered data:
$$\text{Cov}(x, y) = \frac{1}{n}\sum_{i=1}^n x_i y_i$$

- **Positive**: When $x$ is high, $y$ tends to be high (move together) 📈
- **Negative**: When $x$ is high, $y$ tends to be low (move opposite) 📉
- **Zero**: No linear relationship 〰️

**Example:** Gene A: $[-0.33, 1.67, -1.33]$, Gene B: $[-1.0, 1.0, 0.0]$

$$\text{Cov}(A,B) = \frac{(-0.33)(-1.0) + (1.67)(1.0) + (-1.33)(0.0)}{3} = \frac{0.33 + 1.67}{3} = 0.67$$

Positive! When A is high, B tends to be high 📊.

### <span style="color:#2ca02c">The Covariance Matrix: The Full Score</span>

For $p$ features, compute **all pairwise** covariances:

$$\mathbf{C} = \begin{bmatrix} 
\text{Var}(x_1) & \text{Cov}(x_1,x_2) & \cdots \\\\
\text{Cov}(x_2,x_1) & \text{Var}(x_2) & \cdots \\\\
\vdots & \vdots & \ddots
\end{bmatrix}$$

- **Diagonal** = variances (how much each feature varies alone)
- **Off-diagonal** = covariances (how features vary together)
- **Symmetric** = $\text{Cov}(x_i, x_j) = \text{Cov}(x_j, x_i)$

This matrix is the **complete description** of your data's shape! It tells you:
- Which directions have high variance (diagonal)
- Which directions are correlated (off-diagonal)

**Matrix formula:** For centered data $\mathbf{X}$:
$$\mathbf{C} = \frac{1}{n}\mathbf{X}^T\mathbf{X}$$

Beautiful! One matrix multiplication computes all covariances 🎨.

**What this means intuitively:** The covariance matrix encodes all the information about how your data is spread out and how different features relate to each other. A diagonal covariance matrix means features are uncorrelated (independent variation). Off-diagonal elements reveal linear relationships between features. The geometry of your data, its elongation and orientation, lives in this matrix.

**[FIGURE 5 SUGGESTION]**
*Create a heatmap visualization of a covariance matrix.*

**Prompt for Figure 5:** "Create a heatmap visualization of a symmetric 5x5 covariance matrix. Use a diverging color scheme (blue for negative, white for zero, red for positive covariance). The diagonal should show high values (variances). Include labeled axes (Gene 1, Gene 2, etc.) and a colorbar. Make it professional and publication-ready with clear annotations showing 'High Correlation', 'Low Correlation', and 'Negative Correlation' examples."

---

## <span style="color:#2ca02c">Act X: The Grand Finale – How It All Connects to PCA</span>

### <span style="color:#ff7f0e">🎵 Musical Analogy: The Conductor's View</span>

A conductor doesn't listen to individual instruments, they hear the **entire harmonic structure**. They know which instrument combinations create the main themes versus background texture.

PCA is the conductor. It hears your 20,000 genes and says: "Actually, there are 10 main themes (PCs) that explain most of what's happening" 🎼.

### <span style="color:#2ca02c">Tying Everything Together</span>

**Here's how all our concepts unite in PCA:**

1. **Data points** (vectors) form a cloud in gene-space
2. We **center** the cloud (subtract mean)
3. We compute the **covariance matrix** (describes cloud's shape/orientation)
4. We find **eigenvectors** of this matrix (the natural axes of variation)
5. These eigenvectors are **orthogonal** (a new basis!)
6. The **eigenvalues** tell us variance along each eigenvector
7. We **transform** (rotate) our data to this eigenvector basis
8. The result: data in a coordinate system where variance is *clearly ordered*

**Why eigenvectors?** Because they're the **axes where data varies most**, with **no correlation** between them. Perfect for understanding structure! 🎯

**The covariance matrix is symmetric** → Guaranteed real eigenvalues and orthogonal eigenvectors → PCA always works!

```
Geometry          Statistics        Linear Algebra
───────────────────────────────────────────────────
Point cloud   →   Mean/Variance  →  Centered data
                  Covariance     →  Matrix C
                                 →  Eigendecomp C = WΛW^T
Rotation      ←   PCA transform ←  Multiply by W
New basis     ←   PC axes       ←  Eigenvectors
Variance      ←   Explained var ←  Eigenvalues
```

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">
🎓 The Symphony Complete: PCA finds the eigenvectors (natural directions) of the covariance matrix (data's shape), giving us a new basis (coordinate system) ordered by eigenvalues (variance explained). Geometry, statistics, and linear algebra in perfect harmony!
</strong>
</div>

---

### <span style="color:#2ca02c">Quick Reference: The Mathematical Toolkit</span>

| Concept | Geometric View | Statistical View | Linear Algebra View |
|---------|---------------|------------------|-------------------|
| **Data** | Points in space | Measurements | Matrix $\mathbf{X}$ |
| **Mean** | Center of cloud | Average value | Vector $\bar{\mathbf{x}}$ |
| **Variance** | Spread in one direction | How much data varies | Diagonal of $\mathbf{C}$ |
| **Covariance** | Elongation/tilt | How features co-vary | Off-diag of $\mathbf{C}$ |
| **Basis** | Coordinate axes | Feature space | Set of vectors |
| **PCA** | Rotation to best view | Find max variance axes | Eigendecomp of $\mathbf{C}$ |
| **PCs** | New axes | Uncorrelated features | Eigenvectors |
| **Variance Explained** | Spread along PC | Information retained | Eigenvalues |

---

### <span style="color:#2ca02c">Notation Guide</span>

| Symbol | Meaning | Dimensions | Musical Analogy |
|--------|---------|-----------|----------------|
| $\mathbf{X}$ | Data matrix | $n \times p$ | Full orchestra score |
| $\mathbf{x}_i$ | One observation | $p \times 1$ | One moment in time |
| $\bar{\mathbf{x}}$ | Mean vector | $p \times 1$ | The tonic (home) |
| $\mathbf{C}$ | Covariance matrix | $p \times p$ | Harmonic structure |
| $\mathbf{w}_k$ | $k$-th eigenvector (PC) | $p \times 1$ | $k$-th main theme |
| $\lambda_k$ | $k$-th eigenvalue | scalar | Loudness of theme $k$ |
| $\mathbf{W}$ | All eigenvectors | $p \times p$ | New musical basis |
| $\mathbf{Z}$ | Transformed data | $n \times p$ | Music in theme-space |

---

## <span style="color:#1f77b4">Setting the Stage: What Are We Actually Trying to Do?</span>

Let's get concrete. You have a dataset: a matrix $\mathbf{X} \in \mathbb{R}^{n \times p}$ where:
- $n$ = number of observations (cells, patients, samples)
- $p$ = number of features (genes, proteins, measurements)

Think single-cell RNA-seq: 10,000 cells × 20,000 genes. Huge, messy, high-dimensional 🧬.

**PCA's promise:** Find a new coordinate system where:
1. The first axis (PC1) captures the most variance
2. The second axis (PC2) captures the next most variance, orthogonal to PC1
3. And so on...

But why variance? Here's something I didn't appreciate early on: <span style="color:#ff7f0e">**in biological data, variance often equals signal**</span>. The genes that vary most across cells are frequently the ones telling us about cell types, states, and responses. Low-variance genes? Often housekeeping or noise 🎯.

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">
Core Principle: PCA is a rotation of your data to axes ordered by variance. The math we're about to see just formalizes this intuition.
</strong>
</div>

---

## <span style="color:#1f77b4">Step 1: The Variance Maximization Problem</span>

### <span style="color:#2ca02c">Centering the Data (Why It Matters)</span>

Before anything, we **center** the data. This is crucial but often glossed over:

$$\mathbf{X}_{\text{centered}} = \mathbf{X} - \mathbf{1}_n \boldsymbol{\mu}^T$$

where $\mathbf{1}_n$ is an $n$-dimensional vector of ones and $\boldsymbol{\mu} = \frac{1}{n}\sum_{i=1}^n \mathbf{x}_i$ is the mean vector.

**Why center?** Because PCA is about variance, and variance is measured around zero. If your data has a non-zero mean, you're not actually capturing variance, you're capturing a mix of mean and variance. From now on, assume $\mathbf{X}$ is centered 📍.

### <span style="color:#2ca02c">Finding the First Principal Component</span>

Here's the heart of PCA. We want a direction $\mathbf{w}_1 \in \mathbb{R}^p$ such that when we project our data onto it, the variance is **maximized**.

The projection of observation $i$ onto direction $\mathbf{w}_1$ is:
$$z_{i1} = \mathbf{x}_i^T \mathbf{w}_1$$

This is just the dot product, it tells us "how much" of $\mathbf{x}_i$ lies along $\mathbf{w}_1$ 📐.

The variance of these projections is:
$$\text{Var}(\mathbf{z}_1) = \frac{1}{n}\sum_{i=1}^n z_{i1}^2 = \frac{1}{n}\sum_{i=1}^n (\mathbf{x}_i^T \mathbf{w}_1)^2$$

Let's write this more cleanly. Define $\mathbf{z}_1 = \mathbf{X}\mathbf{w}_1$ as the vector of all projections. Then:

$$\text{Var}(\mathbf{z}_1) = \frac{1}{n}\|\mathbf{z}_1\|^2 = \frac{1}{n}\|\mathbf{X}\mathbf{w}_1\|^2 = \frac{1}{n}\mathbf{w}_1^T\mathbf{X}^T\mathbf{X}\mathbf{w}_1$$

Now comes a key insight. Define the **sample covariance matrix**:
$$\mathbf{C} = \frac{1}{n}\mathbf{X}^T\mathbf{X} \in \mathbb{R}^{p \times p}$$

Then our variance becomes:
$$\text{Var}(\mathbf{z}_1) = \mathbf{w}_1^T\mathbf{C}\mathbf{w}_1$$

Beautiful, right? The variance of projections is a quadratic form in the covariance matrix 🎨.

### <span style="color:#2ca02c">The Constraint Problem</span>

If we don't constrain $\mathbf{w}_1$, we can make the variance arbitrarily large by just scaling $\mathbf{w}_1 \to \alpha\mathbf{w}_1$ for large $\alpha$. This is silly, we don't care about the magnitude, only the **direction**.

So we constrain: $\|\mathbf{w}_1\| = 1$ (unit vector constraint).

Our optimization problem is:
$$\max_{\mathbf{w}_1} \mathbf{w}_1^T\mathbf{C}\mathbf{w}_1 \quad \text{subject to} \quad \mathbf{w}_1^T\mathbf{w}_1 = 1$$

This is a **constrained optimization problem**. Time to bring in the big guns: Lagrange multipliers 🚀.

---

## <span style="color:#1f77b4">The Lagrange Multiplier Method (Why It Works)</span>

### <span style="color:#2ca02c">The Setup</span>

When I first saw Lagrange multipliers, I thought: "Why introduce this mysterious $\lambda$?" Here's the intuition:

Imagine you're hiking on a mountain (the function you want to maximize) but you're constrained to walk along a ridge (the constraint). The **optimal point** is where your uphill direction is **perpendicular to the ridge**. Lagrange multipliers formalize this 🏔️.

The Lagrangian is:
$$\mathcal{L}(\mathbf{w}_1, \lambda_1) = \mathbf{w}_1^T\mathbf{C}\mathbf{w}_1 - \lambda_1(\mathbf{w}_1^T\mathbf{w}_1 - 1)$$

The term $-\lambda_1(\mathbf{w}_1^T\mathbf{w}_1 - 1)$ "enforces" the constraint. At optimum, the gradient must vanish:

$$\frac{\partial \mathcal{L}}{\partial \mathbf{w}_1} = 2\mathbf{C}\mathbf{w}_1 - 2\lambda_1\mathbf{w}_1 = 0$$

Simplifying:
$$\mathbf{C}\mathbf{w}_1 = \lambda_1\mathbf{w}_1$$

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">
🎯 This is THE eigenvalue equation! The optimal direction $\mathbf{w}_1$ is an eigenvector of $\mathbf{C}$, and $\lambda_1$ is the eigenvalue.
</strong>
</div>

### <span style="color:#2ca02c">But Which Eigenvector?</span>

Here's where it gets interesting. Substitute $\mathbf{C}\mathbf{w}_1 = \lambda_1\mathbf{w}_1$ back into the variance:

$$\text{Var}(\mathbf{z}_1) = \mathbf{w}_1^T\mathbf{C}\mathbf{w}_1 = \mathbf{w}_1^T(\lambda_1\mathbf{w}_1) = \lambda_1\mathbf{w}_1^T\mathbf{w}_1 = \lambda_1$$

The variance **equals the eigenvalue**! 🤯

To maximize variance, we need the **largest eigenvalue**. The first principal component is the eigenvector corresponding to $\lambda_{\max}$.

When I first saw this, I literally said "wait, what?" out loud in the library at IIIT Delhi (got some weird looks 😅). The eigenvector isn't just *related* to the solution, it **is** the solution, and its eigenvalue **is** the variance. Beautiful!

---

## <span style="color:#1f77b4">Finding Subsequent Principal Components</span>

### <span style="color:#2ca02c">PC2: Adding Orthogonality</span>

For the second principal component, we want:
- Maximize variance (like before)
- **But** constrain $\mathbf{w}_2$ to be orthogonal to $\mathbf{w}_1$

Why orthogonality? Because we want **independent** sources of variation. If PC2 was correlated with PC1, we'd be double-counting variance 🔀.

The new problem:
$$\max_{\mathbf{w}_2} \mathbf{w}_2^T\mathbf{C}\mathbf{w}_2 \quad \text{subject to} \quad \mathbf{w}_2^T\mathbf{w}_2 = 1 \text{ and } \mathbf{w}_2^T\mathbf{w}_1 = 0$$

Lagrangian with two constraints:
$$\mathcal{L}(\mathbf{w}_2, \lambda_2, \gamma) = \mathbf{w}_2^T\mathbf{C}\mathbf{w}_2 - \lambda_2(\mathbf{w}_2^T\mathbf{w}_2 - 1) - \gamma\mathbf{w}_2^T\mathbf{w}_1$$

Taking the gradient:
$$\frac{\partial \mathcal{L}}{\partial \mathbf{w}_2} = 2\mathbf{C}\mathbf{w}_2 - 2\lambda_2\mathbf{w}_2 - \gamma\mathbf{w}_1 = 0$$

Here's a trick: multiply both sides by $\mathbf{w}_1^T$:
$$2\mathbf{w}_1^T\mathbf{C}\mathbf{w}_2 - 2\lambda_2\mathbf{w}_1^T\mathbf{w}_2 - \gamma\mathbf{w}_1^T\mathbf{w}_1 = 0$$

Since $\mathbf{w}_1^T\mathbf{w}_2 = 0$ (orthogonality) and $\mathbf{w}_1^T\mathbf{w}_1 = 1$:
$$2\mathbf{w}_1^T\mathbf{C}\mathbf{w}_2 - \gamma = 0$$

But $\mathbf{C}$ is **symmetric** (because $\mathbf{C} = \mathbf{C}^T$), so:
$$\mathbf{w}_1^T\mathbf{C}\mathbf{w}_2 = (\mathbf{C}\mathbf{w}_1)^T\mathbf{w}_2 = (\lambda_1\mathbf{w}_1)^T\mathbf{w}_2 = \lambda_1\mathbf{w}_1^T\mathbf{w}_2 = 0$$

Therefore $\gamma = 0$, and our equation reduces to:
$$\mathbf{C}\mathbf{w}_2 = \lambda_2\mathbf{w}_2$$

<span style="color:#ff7f0e">**Mind-blowing insight:**</span> $\mathbf{w}_2$ is also an eigenvector! And because $\mathbf{C}$ is symmetric, eigenvectors corresponding to **different eigenvalues are automatically orthogonal**. We don't have to enforce orthogonality, linear algebra gives it to us for free! 🎁

The second PC is the eigenvector for the **second-largest eigenvalue**. This pattern continues for all PCs.

---

## <span style="color:#1f77b4">The Spectral Theorem: Why This All Works</span>

Here's where we need a power tool from linear algebra. For any **symmetric** matrix $\mathbf{C}$ (which covariance matrices always are), the **Spectral Theorem** guarantees:

1. All eigenvalues are **real** (no complex numbers!)
2. All eigenvalues are **non-negative** ($\lambda_i \geq 0$) because $\mathbf{C}$ is positive semi-definite
3. We can find $p$ **orthonormal** eigenvectors

This means we can write:
$$\mathbf{C} = \mathbf{W}\mathbf{\Lambda}\mathbf{W}^T$$

where:
- $\mathbf{W} = [\mathbf{w}_1 | \mathbf{w}_2 | \cdots | \mathbf{w}_p] \in \mathbb{R}^{p \times p}$ (eigenvector matrix)
- $\mathbf{\Lambda} = \text{diag}(\lambda_1, \lambda_2, \ldots, \lambda_p)$ (eigenvalue matrix)
- $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_p \geq 0$ (sorted eigenvalues)
- $\mathbf{W}^T\mathbf{W} = \mathbf{I}_p$ (orthonormal columns)

This is the **eigendecomposition** or **spectral decomposition**. The covariance matrix is being "decomposed" into independent "modes" of variation 🎼.

### <span style="color:#2ca02c">The Alternative View: Additive Decomposition</span>

We can also write:
$$\mathbf{C} = \sum_{j=1}^p \lambda_j \mathbf{w}_j\mathbf{w}_j^T$$

Each term $\lambda_j \mathbf{w}_j\mathbf{w}_j^T$ is a **rank-one matrix**, the contribution of the $j$-th PC to the overall covariance structure. This is beautiful: PCA is literally decomposing variance into independent components! 🎨

---

## <span style="color:#1f77b4">Projecting Data: Computing Principal Component Scores</span>

Once we have the eigenvectors $\mathbf{W}$, we project our data:
$$\mathbf{Z} = \mathbf{X}\mathbf{W} \in \mathbb{R}^{n \times p}$$

Each column of $\mathbf{Z}$ contains the PC scores for one component. The $k$-th column is:
$$\mathbf{z}_k = \mathbf{X}\mathbf{w}_k$$

### <span style="color:#2ca02c">Why the Scores Are Uncorrelated</span>

Here's something cool: the covariance of the PC scores is **diagonal**:

$$\text{Cov}(\mathbf{Z}) = \frac{1}{n}\mathbf{Z}^T\mathbf{Z} = \frac{1}{n}(\mathbf{X}\mathbf{W})^T(\mathbf{X}\mathbf{W})$$

$$= \frac{1}{n}\mathbf{W}^T\mathbf{X}^T\mathbf{X}\mathbf{W} = \mathbf{W}^T\left(\frac{1}{n}\mathbf{X}^T\mathbf{X}\right)\mathbf{W} = \mathbf{W}^T\mathbf{C}\mathbf{W}$$

$$= \mathbf{W}^T(\mathbf{W}\mathbf{\Lambda}\mathbf{W}^T)\mathbf{W} = (\mathbf{W}^T\mathbf{W})\mathbf{\Lambda}(\mathbf{W}^T\mathbf{W}) = \mathbf{I}\mathbf{\Lambda}\mathbf{I} = \mathbf{\Lambda}$$

The off-diagonal entries are **zero**, the PCs are uncorrelated! This is why PCA is sometimes called a "rotation", we're rotating coordinates so axes are uncorrelated 🔄.

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">
Key Result: Principal components transform correlated features into uncorrelated components, with variances equal to eigenvalues.
</strong>
</div>

---

## <span style="color:#1f77b4">The Geometric Perspective: Best-Fitting Subspace</span>

### <span style="color:#2ca02c">Minimizing Reconstruction Error</span>

There's another way to think about PCA that I find really intuitive. If we keep only the first $k$ PCs, we can reconstruct an approximation of the original data:

$$\hat{\mathbf{X}}_k = \mathbf{Z}_k\mathbf{W}_k^T = (\mathbf{X}\mathbf{W}_k)\mathbf{W}_k^T$$

where $\mathbf{W}_k$ is $p \times k$ (first $k$ eigenvectors) and $\mathbf{Z}_k$ is $n \times k$ (first $k$ PC scores).

The **reconstruction error** is:
$$\|\mathbf{X} - \hat{\mathbf{X}}_k\|_F^2$$

where $\|\cdot\|_F$ is the Frobenius norm (sum of squared entries).

Here's a theorem I initially found surprising:

**Eckart-Young-Mirsky Theorem:** The best rank-$k$ approximation to $\mathbf{X}$ (in Frobenius or spectral norm) is given by keeping the first $k$ principal components.

And the reconstruction error is:
$$\|\mathbf{X} - \hat{\mathbf{X}}_k\|_F^2 = \sum_{j=k+1}^p \lambda_j$$

The error equals the **sum of discarded eigenvalues**! 🎯

This means we can quantify how much information we lose:
$$\text{Proportion of variance retained} = \frac{\sum_{j=1}^k \lambda_j}{\sum_{j=1}^p \lambda_j}$$

This is the famous "scree plot" criterion, we keep enough PCs to retain, say, 80-90% of variance.

### <span style="color:#2ca02c">The Pythagorean Connection</span>

For 2D data, PCA finds the line such that:
- Variance along the line is maximized
- Equivalently, squared distances to the line are minimized

These are equivalent by Pythagorean theorem! If $d_i$ is distance from point $i$ to the line, and $z_i$ is its projection:
$$\|\mathbf{x}_i\|^2 = z_i^2 + d_i^2$$

Since $\sum_i \|\mathbf{x}_i\|^2$ is fixed, maximizing $\sum_i z_i^2$ minimizes $\sum_i d_i^2$ 📐.

**[FIGURE 6 SUGGESTION]**
*Create a visualization showing PCA as finding the best-fitting line/plane.*

**Prompt for Figure 6:** "Create a 2D scatter plot showing data points in an elongated ellipse. Draw the first principal component as a bold blue line through the data (the long axis of the ellipse). Draw perpendicular distance lines from several points to this PC line in dashed red. Include a second PC line perpendicular to the first in lighter blue. Add labels 'PC1 (maximum variance)', 'PC2 (orthogonal)', and 'Reconstruction error'. Use a clean, educational style."

---

## <span style="color:#1f77b4">The SVD Connection (This Blew My Mind)</span>

Okay, this is where things got really cool for me. PCA is intimately related to **Singular Value Decomposition (SVD)**.

### <span style="color:#2ca02c">What is SVD?</span>

Any matrix $\mathbf{X} \in \mathbb{R}^{n \times p}$ can be decomposed as:
$$\mathbf{X} = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T$$

where:
- $\mathbf{U} \in \mathbb{R}^{n \times n}$ is orthogonal ($\mathbf{U}^T\mathbf{U} = \mathbf{I}_n$)
- $\mathbf{\Sigma} \in \mathbb{R}^{n \times p}$ is rectangular diagonal with singular values $\sigma_1 \geq \sigma_2 \geq \cdots \geq 0$
- $\mathbf{V} \in \mathbb{R}^{p \times p}$ is orthogonal ($\mathbf{V}^T\mathbf{V} = \mathbf{I}_p$)

This is **always** possible, every matrix has an SVD 🌟.

### <span style="color:#2ca02c">Connecting SVD to PCA</span>

Now compute the covariance matrix using SVD:
$$\mathbf{C} = \frac{1}{n}\mathbf{X}^T\mathbf{X} = \frac{1}{n}(\mathbf{U}\mathbf{\Sigma}\mathbf{V}^T)^T(\mathbf{U}\mathbf{\Sigma}\mathbf{V}^T)$$

$$= \frac{1}{n}\mathbf{V}\mathbf{\Sigma}^T\mathbf{U}^T\mathbf{U}\mathbf{\Sigma}\mathbf{V}^T = \frac{1}{n}\mathbf{V}\mathbf{\Sigma}^T\mathbf{\Sigma}\mathbf{V}^T$$

Since $\mathbf{\Sigma}^T\mathbf{\Sigma}$ is diagonal with $\sigma_j^2$ on the diagonal:
$$\mathbf{C} = \mathbf{V}\left(\frac{1}{n}\mathbf{\Sigma}^T\mathbf{\Sigma}\right)\mathbf{V}^T$$

Comparing with eigendecomposition $\mathbf{C} = \mathbf{W}\mathbf{\Lambda}\mathbf{W}^T$:

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">
💡 $\mathbf{W} = \mathbf{V}$ (PCA eigenvectors = right singular vectors)<br>
💡 $\lambda_j = \sigma_j^2/n$ (eigenvalues = squared singular values / n)
</strong>
</div>

And the PC scores?
$$\mathbf{Z} = \mathbf{X}\mathbf{W} = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T\mathbf{V} = \mathbf{U}\mathbf{\Sigma}$$

The PC scores are just the **left singular vectors scaled by singular values**! 🤯

### <span style="color:#2ca02c">Why This Matters Practically</span>

This connection is **huge** for computation. Instead of:
1. Computing $\mathbf{C} = \frac{1}{n}\mathbf{X}^T\mathbf{X}$ → $O(np^2)$ time, $O(p^2)$ space
2. Finding eigendecomposition of $\mathbf{C}$ → $O(p^3)$ time

We can:
1. Compute thin SVD of $\mathbf{X}$ directly → $O(n^2p)$ time when $n < p$

For single-cell RNA-seq (10,000 cells × 20,000 genes), SVD approach is **way** faster and more stable! This is what `sklearn` actually does under the hood 🚀.

**Why SVD is more stable:** The covariance matrix $\mathbf{C}$ involves computing $\mathbf{X}^T\mathbf{X}$, which can lead to numerical issues when features have very different scales or when there are near-linear dependencies. SVD works directly on $\mathbf{X}$ and avoids this squaring operation, making it more numerically robust.

---

## <span style="color:#1f77b4">Variance Explained: Making Sense of Components</span>

The $j$-th eigenvalue $\lambda_j$ tells us the variance along PC $j$. The total variance is:
$$\text{Total Variance} = \text{tr}(\mathbf{C}) = \sum_{j=1}^p \lambda_j$$

where $\text{tr}(\cdot)$ is the trace (sum of diagonal elements).

The proportion of variance explained by PC $j$:
$$\text{PVE}_j = \frac{\lambda_j}{\sum_{k=1}^p \lambda_k} \times 100\%$$

Cumulative variance explained by first $k$ PCs:
$$\text{Cumulative PVE}_k = \frac{\sum_{j=1}^k \lambda_j}{\sum_{j=1}^p \lambda_j} \times 100\%$$

This is what we plot in **scree plots** and **cumulative variance plots** 📊.

**[FIGURE 7 SUGGESTION]**
*Create a scree plot showing eigenvalue decay.*

**Prompt for Figure 7:** "Create a professional scree plot with two panels. Left panel: Bar plot of eigenvalues (y-axis) vs principal component number (x-axis, 1-20), showing exponential decay. Include a red dashed line showing the 'elbow' around PC 3-4. Right panel: Line plot of cumulative variance explained (0-100% on y-axis) vs PC number, with a horizontal dashed line at 90%. Use professional styling with grid, clear labels, and legend. Title: 'Scree Plot: Choosing Number of Components'."

---

## <span style="color:#1f77b4">A Worked Example: 2D Case</span>

Let's compute PCA by hand for 2D data to see everything click together.

Suppose we have 5 centered data points:
$$\mathbf{X} = \begin{bmatrix} 1 & 1 \\\\ -1 & -1 \\\\ 1 & -1 \\\\ -1 & 1 \\\\ 0 & 0 \end{bmatrix}$$

**Step 1: Compute covariance matrix**
$$\mathbf{C} = \frac{1}{5}\mathbf{X}^T\mathbf{X} = \frac{1}{5}\begin{bmatrix} 4 & 0 \\\\ 0 & 4 \end{bmatrix} = \begin{bmatrix} 0.8 & 0 \\\\ 0 & 0.8 \end{bmatrix}$$

**Step 2: Find eigenvalues**
$$\det(\mathbf{C} - \lambda\mathbf{I}) = (0.8-\lambda)^2 = 0 \implies \lambda_1 = \lambda_2 = 0.8$$

Both eigenvalues equal! This means the data has **equal variance in all directions**, it's spherical 🔵.

**Step 3: Find eigenvectors**
Any orthonormal pair works. For example:
$$\mathbf{w}_1 = \begin{bmatrix} 1 \\\\ 0 \end{bmatrix}, \quad \mathbf{w}_2 = \begin{bmatrix} 0 \\\\ 1 \end{bmatrix}$$

**Step 4: Project data**
$$\mathbf{Z} = \mathbf{X}\mathbf{W} = \begin{bmatrix} 1 & 1 \\\\ -1 & -1 \\\\ 1 & -1 \\\\ -1 & 1 \\\\ 0 & 0 \end{bmatrix}\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 1 \\\\ -1 & -1 \\\\ 1 & -1 \\\\ -1 & 1 \\\\ 0 & 0 \end{bmatrix}$$

The projection equals the original data, PCA does nothing because there's no preferred direction! This example shows that <span style="color:#ff7f0e">**PCA is only useful when variances differ across directions**</span> 🎯.

---

## <span style="color:#1f77b4">Understanding PCA Through Its Dual Interpretations</span>

One of the most elegant aspects of PCA is that it can be understood from two equivalent perspectives. This duality isn't just mathematical curiosity, it provides deep insight into what PCA actually does.

### <span style="color:#2ca02c">Interpretation 1: Maximum Variance Projection</span>

We've covered this extensively: PCA finds directions that maximize the variance of projected data. The first PC captures the most variance, the second PC captures the next most (orthogonal to the first), and so on.

**Key equation:** $\max_{\mathbf{w}} \mathbf{w}^T\mathbf{C}\mathbf{w}$ subject to $\|\mathbf{w}\| = 1$

**Intuition:** "Where do my data points spread out the most?"

### <span style="color:#2ca02c">Interpretation 2: Minimum Reconstruction Error</span>

Equivalently, PCA finds the $k$-dimensional subspace that minimizes reconstruction error when you project data onto it and back.

**Key equation:** $\min_{\mathbf{W}_k} \|\mathbf{X} - \mathbf{X}\mathbf{W}_k\mathbf{W}_k^T\|_F^2$

**Intuition:** "What's the best low-dimensional summary of my data?"

### <span style="color:#2ca02c">Why They're Equivalent</span>

The Pythagorean theorem connects them! For any point $\mathbf{x}_i$:
$$\|\mathbf{x}_i\|^2 = \|\text{projection}\|^2 + \|\text{error}\|^2$$

Since $\|\mathbf{x}_i\|^2$ is constant, maximizing projection variance is the same as minimizing reconstruction error.

**This duality is powerful:** When interpreting PCs, you can ask either "what direction shows maximum variation?" or "what's the best way to compress this data?" Both lead to the same answer!

---

## <span style="color:#1f77b4">Mathematical Properties to Know</span>

### <span style="color:#2ca02c">1. Orthogonality is Free</span>

For symmetric matrices (like $\mathbf{C}$), eigenvectors corresponding to **distinct** eigenvalues are automatically orthogonal. We don't enforce this, it's a gift from linear algebra 🎁.

### <span style="color:#2ca02c">2. Total Variance is Preserved</span>

$$\sum_{j=1}^p \text{Var}(PC_j) = \sum_{j=1}^p \lambda_j = \text{tr}(\mathbf{C}) = \sum_{j=1}^p \text{Var}(x_j)$$

PCA **redistributes** variance but doesn't create or destroy it. This is a conservation law, like energy conservation in physics!

### <span style="color:#2ca02c">3. PCA is Rotation + Projection</span>

The full transformation is:
$$\mathbf{Z} = \mathbf{X}\mathbf{W}$$

If we keep all $p$ components, this is just a **rotation** (orthogonal transformation). If we keep $k < p$, it's a rotation **followed by projection** onto the first $k$ dimensions 🔄.

### <span style="color:#2ca02c">4. Stability of Eigenvalues</span>

**Hoffman-Wielandt Theorem**: If we perturb $\mathbf{C}$ by $\mathbf{E}$ (noise), the eigenvalue changes satisfy:
$$\sum_{i=1}^p |\lambda_i(\mathbf{C} + \mathbf{E}) - \lambda_i(\mathbf{C})|^2 \leq \|\mathbf{E}\|_F^2$$

This tells us PCA is **stable**, small noise leads to small changes in eigenvalues 💪.

---

## <span style="color:#1f77b4">Key Takeaways</span>

If you remember nothing else, remember these:

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0;">
<strong style="color:#d62728">
1️⃣ PCA finds directions that maximize variance<br>
2️⃣ These directions are eigenvectors of the covariance matrix<br>
3️⃣ The eigenvalues tell us how much variance each PC explains<br>
4️⃣ PCs are uncorrelated (orthogonal transformation)<br>
5️⃣ SVD gives us PCA for free (and faster!)<br>
6️⃣ Reconstruction error = sum of discarded eigenvalues
</strong>
</div>

---

## <span style="color:#1f77b4">Coming Up Next</span>

In **Part 3**, we'll get practical:
- How many components to keep? (Scree plots, elbow methods, parallel analysis)
- Dealing with outliers and missing data
- Interpreting loadings in biological contexts
- Visualization best practices (biplots, loading plots)
- Real scRNA-seq analysis walkthrough with code

In **Part 4**, we'll explore extensions:
- Sparse PCA (interpretable components)
- Kernel PCA (nonlinear relationships)
- Robust PCA (handling outliers)
- Probabilistic PCA (model-based approach)

---

## <span style="color:#1f77b4">References & Further Reading</span>

1. <span style="color:#9467bd">[Jolliffe (2002)](https://link.springer.com/book/10.1007/b98835)</span> — *Principal Component Analysis* (still the bible!)
2. <span style="color:#9467bd">[Hastie et al. (2009)](https://hastie.su.domains/ElemStatLearn/)</span> — *Elements of Statistical Learning* (Chapter 14.5)
3. <span style="color:#9467bd">[Tipping & Bishop (1999)](https://www.robots.ox.ac.uk/~cvrg/hilary2006/ppca.pdf)</span> — "Probabilistic Principal Component Analysis"
4. <span style="color:#9467bd">[Shlens (2014)](https://arxiv.org/abs/1404.1100)</span> — "A Tutorial on Principal Component Analysis" (very clear!)
5. <span style="color:#9467bd">[Kobak & Berens (2019)](https://www.nature.com/articles/s41467-019-13056-x)</span> — "The art of using t-SNE for single-cell transcriptomics"
6. <span style="color:#9467bd">[Townes et al. (2019)](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-019-1861-6)</span> — "Feature selection and dimension reduction for single-cell RNA-Seq"

---

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">
That was intense! 😅 If you made it this far, you now understand PCA at a deeper level than most people who use it. Part 3 will be more hands-on and practical, I promise! 🚀
</strong>
</div>

🙏 **Thank you for reading!**  
This was a labor of love (and multiple late nights with coffee ☕). If you found errors or have suggestions, please reach out, I'm still learning too!

Give hearts by clicking the heart at the end. Your feedback helps me improve these posts!

📧 Reach out for science chats, questions, or mentorship at [biocodetalks@gmail.com](mailto:biocodetalks@gmail.com)

Follow for more computational biology content at **[BioCodeTalks](https://biocodetalks.example.com)** 🧬

---

**Acknowledgments:** Thanks to everyone who read Part 1 and asked for more math! Special thanks to my IIIT Delhi community and Prof. Debarka Sengupta for teaching me to ask "but why?" 🙏

*Note: Math equations rendered with MathJax. Code tested with Python 3.9, NumPy 1.21. Some explanations refined with AI assistance (Claude, Grammarly).*