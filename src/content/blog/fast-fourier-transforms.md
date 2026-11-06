---
title: Fast Fourier Transforms
description: The elegant mathematics behind FFTs
pubDate: 2026-11-06
category: Learning Notes
tags: [mathematics, signal-processing, opensource]
---

I wanted to write about FFTs ever since I contributed their implementation to [mpmath](https://github.com/mpmath/mpmath). While working on it, I got to explore the rather beautiful mathematics that goes into developing this algorithm. This blog is an attempt to share some of that learning and write about one of the most elegant algorithms in numerical computing.

I first came across FFTs (and DFTs) during my Signals & Systems course in the second year. But, like many engineering students, I didn't pay much attention to them. I studied the topic just one night before the examination, found it fascinating, but never really got around to exploring it further. Exam pressure, I guess!

I've been contributing to mpmath for some time now, and one day I came across an open issue concerning FFT implementation. SymPy was also looking for improvements in this area. That was when I finally decided to read about FFTs in detail, and discovered the beautiful mathematics behind them.

## So, what exactly is an FFT?

Anytime a signal is processed, there is a good chance that an FFT is involved somewhere.

Imagine you drink a fruit smoothie made of strawberries, bananas, and blueberries. You can taste the mixture, but can you tell exactly how much of each ingredient went into making it? You know they are all there, but separating their individual contributions from the blended mixture isn't straightforward.

An FFT does something conceptually similar. Given a sampled signal, it helps us identify the different frequencies that make up that signal and how strongly each frequency contributes to it.

In the real world, sound, radio waves, Wi-Fi signals, and even vibrations are examples of signals. When we record sound, for instance, we get a waveform that changes with time. An FFT helps us understand which frequencies are present in that waveform.

But before getting into FFTs, let's build some intuition about Fourier transforms.

## A little bit about signals and frequencies

A quantity that changes with time can be represented as a **signal**. When we measure this quantity at specific, equally spaced time intervals, we get a discrete-time signal.

For example,

$$
x[n] = \{1,2,3,4,5\}
$$

means that the signal has value 1 at time 0, value 2 at time $\Delta t$, value 3 at time $2\Delta t$, and so on.

Now, what is **frequency**?

In simple terms, frequency tells us how quickly something oscillates. A slowly oscillating signal has a low frequency, whereas a rapidly oscillating one has a high frequency.

Here's where things get interesting.

A Fourier series tells us that **any periodic signal can be represented as a combination of simple sinusoidal waves** with different frequencies, amplitudes, and phases.

In other words, even a complicated-looking periodic wave can be constructed by adding together simpler waves.

This is a rather powerful idea. Instead of looking at a complicated signal as one entity, we can look at it as a combination of simpler frequency components.

## Discrete-Time Fourier Transform (DTFT)

Suppose we have a discrete-time signal and want to understand which frequencies are present in it.

The Discrete-Time Fourier Transform (DTFT) gives us a way to do exactly that.

The basic idea is simple: take a particular frequency and compare our signal against a complex sinusoid of that frequency. We do this for different frequencies and see how strongly the signal correlates with each one.

Mathematically, the DTFT is defined as:

$$
X(e^{j\omega}) =
\sum_{n=-\infty}^{\infty} x[n]e^{-j\omega n}
$$

Here, $x[n]$ is our input signal and $\omega$ represents angular frequency.

The exponential term is essentially a complex sinusoid. By multiplying our signal with it and summing the results, we measure how much of that frequency is present in the signal.

Let's take a very simple example:

$$
x[n] = \{1,1\}
$$

Its DTFT is:

$$
X(e^{j\omega}) = 1 + e^{-j\omega}
$$

Now, let's evaluate it at a few frequencies:

- For $\omega = 0$:

$$
X(e^{j0}) = 1+1 = 2
$$

- For $\omega = \frac{\pi}{2}$:

$$
X(e^{j\pi/2}) = 1-i
$$

- For $\omega = \pi$:

$$
X(e^{j\pi}) = 1-1 = 0
$$

Notice how the output changes depending on the frequency we evaluate. The magnitude of this complex-valued output tells us the strength of the corresponding frequency component, while its angle gives us phase information.

One interesting thing about DTFT is that it gives us a continuous frequency spectrum. We can evaluate it at any frequency we want.

But what if we don't need to evaluate every possible frequency?

## Discrete Fourier Transform (DFT)

This is where the Discrete Fourier Transform comes in.

Instead of evaluating the spectrum at every possible frequency, DFT evaluates the signal at $N$ equally spaced frequency points.

For an input signal containing $N$ samples, these frequency points are:

$$
\omega_k = \frac{2\pi k}{N}
$$

where $k = 0,1,\ldots,N-1$.

The DFT is defined as:

$$
X[k] =
\sum_{n=0}^{N-1}
x[n]e^{-j\frac{2\pi}{N}kn}
$$

Let's take another example:

$$
x[n] = \{1,2,2,1\}
$$

Here, $N=4$. Computing its DFT gives us:

$$
X[0] = 6
$$

$$
X[1] = -1-i
$$

$$
X[2] = 0
$$

$$
X[3] = -1+i
$$

So, our output is:

$$
X[k] = \{6,-1-i,0,-1+i\}
$$

Each output represents a complex frequency component. For instance, $X[0]=6$ is the DC component, corresponding to zero frequency. The other values describe the remaining frequency bins.

If you look closely, the DFT is essentially a finite summation. We multiply every input sample against every frequency component and accumulate the results.

And this is where the computational problem begins.

For an input of size $N$, we need to perform $N$ operations for each of the $N$ output frequency bins. This gives us a time complexity of:

$$
O(N^2)
$$

For small signals, this is perfectly manageable. But for large datasets, it becomes quite expensive.

So, why do we even care about knowing the frequencies present in a signal?

## Why does it matter?

There are plenty of practical applications where understanding the frequency composition of a signal is extremely useful.

A few examples:

- **Audio processing:** Identifying frequencies helps with equalizers, noise reduction, audio effects, and speech processing.
- **Wireless communication:** Wi-Fi, radio, and cellular communication systems use frequency-domain techniques for transmitting and processing information.
- **Image processing:** Fourier transforms help with filtering, sharpening, and analysing repeating patterns in images.
- **Medical imaging:** MRI reconstruction uses Fourier transforms to convert frequency-domain measurements into spatial images.
- **Scientific computing:** Fourier methods are widely used to solve differential equations, particularly when dealing with periodic boundary conditions.

In short, converting a signal from the time domain to the frequency domain gives us a completely different perspective on the same data. And sometimes, that perspective makes problems significantly easier to solve. Maybe someday I'll write about this too.

## Enter the Fast Fourier Transform

In 1965, James Cooley and John Tukey published a paper that popularized one of the most important algorithmic improvements to the DFT: the Fast Fourier Transform (FFT).

The key observation was that we don't actually need to compute every output independently.

Instead, we can use a divide-and-conquer strategy.

For simplicity, let's consider the Radix-2 Cooley-Tukey algorithm, which works with input sizes that are powers of two.

It splits the original signal into two smaller signals:

- One containing samples at even indices.
- Another containing samples at odd indices.

We recursively compute the DFT of these smaller signals and then combine their results to obtain the DFT of the original signal.

The beautiful part is that this process allows us to reuse computations rather than repeatedly calculating everything from scratch.

This reduces the time complexity from:

$$
O(N^2) \quad \longrightarrow \quad O(N\log N)
$$

That's a massive improvement!

For an input containing a million samples, the difference between these two complexities is enormous. This is one of the reasons FFTs became so fundamental to modern computing.

I don't want to get into the implementation details of the algorithm here because there is a phenomenal video by Reducible that explains the mathematics and intuition behind it far better than I could. I highly recommend watching it:

[The Fast Fourier Transform (FFT): Most Ingenious Algorithm Ever? – Reducible](https://www.youtube.com/watch?v=h7apO7q16V0)

And if you're interested in the historical significance of FFTs, particularly their connection to nuclear weapons testing and the Cold War, do check out this excellent video by Veritasium:

[The Most Underrated Algorithm – Veritasium](https://www.youtube.com/watch?v=nmgFG7PUHfo)

## Beyond Radix-2: Bluestein's Algorithm

The Radix-2 Cooley-Tukey algorithm is probably the most popular starting point for understanding FFTs. It's relatively easy to understand and implement, but it has one limitation: it works most naturally with input sizes that are powers of two.

Of course, real-world problems don't always come with convenient input sizes.

What happens when we have an input of size 17, 100, or 1000?

There are other variants of Cooley-Tukey that handle different factorizations of the input size, but what if the size is prime or otherwise inconvenient?

This is where Bluestein's algorithm comes into the picture.

Instead of directly applying the usual FFT decomposition, Bluestein's algorithm uses a mathematical identity to rewrite the DFT as a convolution problem. This convolution can then be computed efficiently using FFTs and inverse FFTs.

The interesting part is that this allows us to compute a DFT of arbitrary length by transforming the problem into one that can be handled efficiently by a power-of-two FFT implementation.

I also contributed implementations of these algorithms to mpmath, which have since been merged. If you're interested in the actual implementation, you can check out my pull requests here, [Radix-2-Cooley-Tukey-PR1](https://github.com/mpmath/mpmath/pull/1152) and [Bluestein's-PR2](https://github.com/mpmath/mpmath/pull/1176).

## A few final thoughts

What I find most fascinating about FFTs is how much mathematics, computational thinking, and practical engineering come together in a single algorithm.

We start with something as simple as representing a signal as a combination of sinusoidal waves. We then formulate the problem mathematically using Fourier transforms, and finally discover that a clever rearrangement of computations can make the entire process exponentially more practical for large inputs.

I initially encountered FFTs as just another topic in my Signals & Systems syllabus. A few years later, I found myself implementing them in an open-source mathematical library and learning about the elegant mathematics that makes them work.

That's one of the things I enjoy most about contributing to open source. Sometimes, an issue that looks like a small implementation task turns into an opportunity to explore an entire area of mathematics.

And that's probably a good enough reason to keep contributing and learning.
<br><br>
**Fun Fact:** Gauss already formulated FFTs in 1805, way before Cooley-Tukey, but not even bothered to publish it!

## References and further reading

- [The Fast Fourier Transform (FFT): Most Ingenious Algorithm Ever? – Reducible](https://www.youtube.com/watch?v=h7apO7q16V0)
- [The Most Underrated Algorithm – Veritasium](https://www.youtube.com/watch?v=nmgFG7PUHfo)
- [But what is the Fourier Transform? A visual introduction – 3Blue1Brown](https://www.youtube.com/watch?v=spUNpyF58BY)
- [mpmath – Python library for arbitrary-precision floating-point arithmetic](https://github.com/mpmath/mpmath)
- Cooley, J. W., and Tukey, J. W. (1965). *An Algorithm for the Machine Calculation of Complex Fourier Series*. Mathematics of Computation, 19(90), 297–301.


