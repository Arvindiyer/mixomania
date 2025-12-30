+++
date = '2025-12-29T22:49:02-05:00'
title = 'Principal Component Analysis Series-1'
categories = ['biocodetalks','pca']
tags= ["PCA", "statistics", "history", "mathematics", "computational biology"]
author= "Arvind Iyer"
description= "Dive into the fascinating origins of Principal Component Analysis."
type = 'post'
subscription = true
like = true
draft = false
math=true
thumbnail= "images/pca_thumbnail_1.png"
+++

After a few more months of procrastination, here is <span style="color:#1f77b4">Part 1</span> of my <span style="color:#2ca02c">PCA</span> series. I'm not an expert—just a <span style="color:#9467bd">curious learner</span> sharing thoughts on a topic that has always felt a bit <span style="color:#d62728">magical</span> to me. Back at IIIT Delhi I studied PCA and still everytime I learn something new around it. Even today, I’m still figuring things out. Writing this blog helps me make sense of what I’m <span style="color:#d62728">learning</span> and, hopefully, get a little better at it along the way

<span style="color:#ff7f0e">**How did one of the most powerful statistical techniques actually come to be?**</span> 🤔

---

## <span style="color:#1f77b4">The Origins</span>

Here's something fascinating: most statistical methods have murky origins, but <span style="color:#2ca02c">PCA</span> is different; it can be traced exactly where it came from or say it was conceptualized.

**Two brilliant minds, 32 years apart, walking different paths toward the same underlying truth.**

> <span style="color:#9467bd">**Pearson (1901)**</span> → Geometric intuition: "How do we fit a line (or plane) to a cloud of points?"  
> <span style="color:#d62728">**Hotelling (1933)**</span> → Algebraic formalization: principal components that successively maximize variance

Below is a timeline of PCA research. I had a lot of fun putting this together and revisiting the ideas and mathematics behind many of these methods. If something catches your interest, feel free to explore it further, or reach out. I’m always happy to talk

<img src="/mixomania/images/pca_timeline.png" alt="PCA Timeline">

---
## <span style="color:#1f77b4">Pearson's Geometric Vision (1901)</span>

<span style="color:#9467bd">**Karl Pearson**</span> (1857–1936): the man who saw geometry in data.

### <span style="color:#2ca02c">The Core Insight</span>

Pearson wasn’t thinking about “dimensionality reduction” (we’ll return to that in the next article). He asked a simpler question:
<span style="color:#ff7f0e">What line best captures a cloud of points?</span>

Imagine taking a group photo. You adjust their position until everyone fits naturally in the frame. That instinctive choice, capturing the widest spread was Pearson’s intuition.

## A glimpse of the math (more in the next article)

I’ll share a bit of the mathematics here, but I’ll go deeper and more carefully in the next article.

At its core, Pearson was trying to answer a geometric question:  

<span style="color:#ff7f0e">**What single direction best represents a cloud of points?**</span>

Mathematically, we want to find a **unit vector** $\mathbf{u}$ that minimizes the squared distances from each data point to its projection onto that line. We can define the objective function:

$$
f(\mathbf{u}) = \sum_{i=1}^{n} \left\| \mathbf{x}_i - (\mathbf{u}^\top \mathbf{x}_i)\mathbf{u} \right\|^2
\quad \text{subject to } \|\mathbf{u}\| = 1
$$

This says: project each point onto a direction $\mathbf{u}$, measure how far the original point lies from that projection, and find the direction that **minimizes the total error**.

With a bit of algebra (which we’ll unpack later), this minimization is equivalent to a much cleaner **maximization problem**:

$$
f(\mathbf{u}) \equiv \mathbf{u}^\top 
\left( \sum_{i=1}^{n} \mathbf{x}_i \mathbf{x}_i^\top \right) 
\mathbf{u}
$$

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">
In modern terms, this is simply the problem of finding the <b>principal eigenvector</b> of the covariance matrix of the data i.e <b>the first principal component</b>.
</strong>
</div>


**Takeaway:** in 1D, the only principal component is along the line of the data. If you work out the formula you will eventualy end up capturing the variance of the distribution of the points. In higher dimensions, the challenge and the beauty of PCA lies in selecting the direction that **maximizes variance** among infinitely many possibilities.

---

### A quiet optimism 

Pearson famously wrote that these computations were  <span style="color:#d62728">“quite feasible”</span>  even for four or more variables.

Try computing the eigenvalues of a 10×10 matrix by hand, and you will quickly see why this was… optimistic.

Yet this is what makes his work remarkable. The mathematics (magic) was already there, clean, elegant, and conceptually complete. What was missing was computational power. PCA had to wait nearly **six decades** for computers to catch up with the idea.

<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">
Key insight: Great ideas often arrive long before the world is ready for them.  PCA waited nearly 60 years to become mainstream.
</strong>
</div>

---

## <span style="color:#1f77b4">Hotelling's Algebraic Formulation (1933)</span>

<span style="color:#9467bd">**Harold Hotelling**</span> (1895–1973): the economist who formalized PCA

### <span style="color:#2ca02c">The Birth of "Principal Components"</span>

Hotelling deliberately chose the term **"components"** (instead of "factors") to avoid confusion with psychometric factor analysis. His key insight: principal components should capture **successive contributions to total variance**—the first component explains the maximum variance, the second explains the maximum remaining variance **orthogonal** to the first, and so on.

We can define an objective function $f(\mathbf{v})\$ that measures the variance captured along a direction $\mathbf{v}\$:

$$
f(\mathbf{v}) = \mathbf{v}^\top \Sigma \mathbf{v}, \quad \text{subject to } \|\mathbf{v}\| = 1
$$

Maximizing $f(\mathbf{v})\$ gives the **first principal component**. The next component is found by maximizing the same function with the additional constraint that it is **orthogonal** to the previous components.

Mathematically, this is equivalent to solving the **eigenvalue problem**:

$$
\Sigma \mathbf{v}_i = \lambda_i \mathbf{v}_i
$$

where $\lambda_1 \ge \lambda_2 \ge \dots \ge \lambda_p$ are the **eigenvalues** and $\mathbf{v}_i$ are the corresponding **eigenvectors**, which define the principal components.

The **variance explained** by the $i$-th principal component is:

$$
\text{Variance explained (PC $i$)} = \frac{\lambda_i}{\sum_{j=1}^{p} \lambda_j}
$$

This is the formulation we teach today. In essence, Hotelling provided the **computational recipe** for PCA that connects the geometric intuition of Pearson to a clear algebraic solution.


---

## <span style="color:#1f77b4">Rao's Extensions (1964)</span>

<span style="color:#9467bd">**C. R. Rao**</span> (1920–2023): the polymath who unified PCA theory. <span style="color:#1f77b4"> **For those interested in Indian scientists' contributions, Rao's work is essential.** </span> His 1964 paper was a watershed moment: he explained PCA and connected it to many other methods.

### <span style="color:#2ca02c">What made Rao's work important?</span>

Three key contributions:

1. <span style="color:#ff7f0e">Theoretical unification</span>  
    Showed PCA emerges from multiple perspectives:
    - Optimal low-rank matrix approximation.
    - Maximum likelihood in specific models.
    - Reconstruction error minimization.

2. <span style="color:#ff7f0e">Interpretational framework</span>  
    Clarified what components mean:
    - How to interpret loadings.
    - When to retain components,
    - Mathematical vs. substantive significance.

3. <span style="color:#ff7f0e">Extensions</span>  
    Connected PCA to canonical correlation analysis, factor analysis, regression, and prediction.

### <span style="color:#2ca02c">PCA as Low-Rank Approximation</span>

Rao emphasized that PCA can be viewed as a **low-rank approximation** of the original data. We can define a function $f(\mathbf{W})$ that measures the total reconstruction error:

$$
f(\mathbf{W}) = \|\mathbf{X} - \mathbf{X}\mathbf{W}\mathbf{W}^T\|_F^2
$$

The goal is to **minimize** this function, i.e., find the projection matrix $\mathbf{W}$ that best approximates the data in a lower-dimensional subspace.

This perspective unifies PCA with linear algebra and shows that it is **more than just a statistical trick**—it is a fundamental method for approximating high-dimensional data.

---

### <span style="color:#1f77b4">A Personal Connection</span>

During my master's at IIIT Delhi, one night while using the library, I discovered Ian Jolliffe's book online on "<span style="color:#9467bd">Principal Component Analysis</span>" and got hooked 📚. That moment shaped my statistical learning. Yet my amazing mentor **Prof. Debarka Sengupta** (quite validly) still says I need to get better with my statistical understanding 😅 (his way of saying: keep learning 🚀). Fun fact: he received one of **India's top science awards** and you can check out his work on his [website](https://www.thesenguptalab.com/) 🌟.  Why this book? There are many books and videos, but Jolliffe's text stuck with me because it focuses deeply only on PCA 🔍.


Later, I ran a hands-on PCA session in R—the workshop page is available at this <a href="https://sites.google.com/iiitd.ac.in/datascience" style="color:#2ca02c">link</a>. You can watch the video directly on YouTube: [Watch the PCA Workshop on YouTube](https://www.youtube.com/watch?v=bQbHP04_Oc4&start=25655)

**Curious about computational biology and want more?**  
Join me at **[BioCodeTalks](https://biocodetalks.example.com)** for curated tutorials, discussions, and insights on computational biology research and coding!  

P.S. I’ll be releasing something exciting on **bananas** over there soon—stay tuned! 🍌

---

## <span style="color:#1f77b4">The Computing Revolution</span>

With advances in computing power and memory, PCA has become fast and routine. How the computation is implemented really matters—a topic I’ll cover in more detail in a future article. 

For now, here’s a simple Python snippet to demonstrate PCA on a large dataset:

```python
import numpy as np
import time
from sklearn.decomposition import PCA

# Modern cancer genomics dataset
n_samples = 500
n_genes = 20000

X = np.random.randn(n_samples, n_genes)

start = time.time()
pca = PCA(n_components=50)
X_transformed = pca.fit_transform(X)
elapsed = time.time() - start

print(f"⚡ PCA on {n_genes:,} genes: {elapsed:.2f} seconds")
print(f"📊 Variance explained: {sum(pca.explained_variance_ratio_)*100:.1f}%")
```

**Output:**
```
⚡ PCA on 20,000 genes: 2.73 seconds
📊 Variance explained: 68.3%
```

---

<!-- ## <span style="color:#1f77b4">Limitations (Because Nothing's Perfect)</span>

PCA isn't magic—I still learn new aspects each time I use it. It's important to know when it fails:

| Limitation | Why it matters | Alternative |
|-----------|----------------|-------------|
| <span style="color:#d62728">**Linearity assumption**</span> | Real biology is often nonlinear | Kernel PCA, autoencoders |
| <span style="color:#d62728">**Variance ≠ importance**</span> | Max variance may not equal biological signal | LDA, ICA |
| <span style="color:#d62728">**Interpretability**</span> | Components are mixtures of features | Sparse PCA |

Critical insight: PCA maximizes variance, not biological meaning. High variance can be technical noise. -->

<!-- --- -->

## <span style="color:#1f77b4">Key Takeaways</span>

What I covered in this post:

<span style="color:#ff7f0e">**1901 — Pearson**</span> 🎨  
Geometric intuition: fitting lines to point clouds

<span style="color:#d62728">**1933 — Hotelling**</span> 🔬  
Algebraic formalization: "principal components" born

<span style="color:#2ca02c">**1964 — Rao**</span> 🌟  
Theoretical unification: connecting PCA to broader statistics

---

## <span style="color:#1f77b4">Coming Up in This Series</span>

This is just Part 1, we've covered a bit of history. Next:

- <span style="color:#2ca02c">Part 2:</span> Mathematical deep dive — eigenvectors, covariance matrices, optimization  
- <span style="color:#2ca02c">Part 3:</span> Hands-on implementation — building PCA from scratch  
- <span style="color:#2ca02c">Part 4:</span> Advanced extensions — Sparse PCA, Kernel PCA, Probabilistic PCA, Robust PCA  
- <span style="color:#2ca02c">Part 5:</span> Biology applications — scRNA-seq, GWAS, proteomics

## <span style="color:#1f77b4">Some References</span>


1. <span style="color:#9467bd">[Pearson (1901)](https://www.tandfonline.com/doi/abs/10.1080/14786440109462720)</span> — "On lines and planes of closest fit to systems of points in space"  
2. <span style="color:#9467bd">[Hotelling (1933)](https://psycnet.apa.org/record/1934-00645-001l)</span> — "Analysis of a complex of statistical variables into principal components"  
3. <span style="color:#9467bd">[Rao (1964)](https://www.jstor.org/stable/25049339)</span> — "The use and interpretation of principal component analysis in applied research"  
4. <span style="color:#9467bd">[Jolliffe (1986, 2002, 2016)](https://link.springer.com/book/10.1007/b98835)</span> — *Principal Component Analysis* (all editions)
5. <span style="color:#9467bd">[Jolliffe & Cadima (2016)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4792409/)</span> — "Principal component analysis: a review and recent developments"  
6. <span style="color:#9467bd">[Ringnér (2008)](https://www.nature.com/articles/nbt0308-303)</span> — "What is principal component analysis?" (*Nature Biotechnology*)  
7. <span style="color:#9467bd">[Lever et al. (2017)](https://www.nature.com/articles/nmeth.4346)</span> — "Principal component analysis" (*Nature Methods*)

---
<div style="background-color: #ffe374ff; color: #000000ff; padding:16px; border-radius:8px; margin:24px 0; text-align:center;">
<strong style="color:#d62728">Stay tuned for Part 2, where we dive into the mathematical machinery that makes PCA work!</strong>
</div>

🙏 **Thank you for reading!**  
If you spot any errors or have suggestions, please reach out so I can update the post. Give hearts buy clicking heart at end. 
📧 Drop me an email for chit chat about science or need mentorship etc at [biocodetalks@gmail.com](mailto:biocodetalks@gmail.com)

---

**Acknowledgments:** This post stands on the shoulders of <span style="color:#9467bd">Pearson</span>, <span style="color:#9467bd">Hotelling</span>, <span style="color:#9467bd">Rao</span>, <span style="color:#9467bd">Jolliffe</span>, and many others. I apologize for any omissions or mistakes.

*Note: Some images in this post were generated using ChatGPT; the writing process was supported by Grammarly and other AI tools.*
