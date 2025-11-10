---
layout: post
title:  "I Tried Out Flutter’s New Rendering Engine: Impeller"
tags: ["Flutter", "Computer Graphic", "Mobile Development"]
read_time: 5
---

## Introduction

Flutter, Google's open-source UI software development kit, has been making waves in the mobile development community. Recently, I had the opportunity to explore Flutter's new rendering engine, Impeller. In this post, I'll share my experience and insights on how Impeller enhances Flutter's performance and graphics capabilities.

## Background

Before Impeller, Flutter relied on the Skia graphics library for rendering. Skia performed well overall but had limitations, especially with complex animations and high-performance graphics. At one point, I experimented with custom GLSL shaders inside Flutter — and ran into a problem: shader compilation.

A shader is a tiny program that runs on your GPU and decides how each pixel should look. Like any program, it must be compiled before execution. The tricky part is that GPUs vary widely in architecture and supported instructions. For example, gamers may know that features like DLSS exist on NVIDIA hardware but not on AMD. To handle this variety, many GPU drivers compile shaders on demand at runtime.

That’s why, when you launch a new game for the first time, it often loads for a while before gameplay begins — the GPU is compiling shaders in the background. Flutter’s rendering pipeline worked in a similar way. The first time you navigate to a new screen or trigger a new animation, you might notice stutters or dropped frames, known as animation jank.

Enter Impeller. Impeller solves this problem by using precompiled sets of shaders — compiled offline ahead of runtime — and is built to leverage modern graphics APIs such as Metal on iOS and Vulkan on Android (falling back to OpenGL ES on older devices). Previously, Flutter’s Skia backend used Metal on iOS and OpenGL ES on Android. Impeller’s build-time shader compiler converts GLSL into a GPU-specific intermediate representation, ensuring shaders can load instantly without per-frame compilation.

<p align="center" markdown="1">
![What is Vulkan compared to OpenGL?](/assets/img/i-tried-out-flutters-new-rendering-engine-impeller/what_is_vulkan_compared_to_gl.png)
*Figure 1: Vulkan vs. OpenGL [source](https://docs.vulkan.org/guide/latest/what_is_vulkan.html)*
</p>

## Trying Out Impeller

### Performance

I used Flutter version 3.35.0. In this version, Impeller is enabled by default on iOS, and on Android it runs when Vulkan is available. I tested Impeller on a Vulkan-supported Android device to observe noticeable performance differences. I ran the app in profile mode to collect accurate frame-time data using Flutter DevTools.

<p align="center" markdown="1">
![Shader Compilation Frames Chart](/assets/img/i-tried-out-flutters-new-rendering-engine-impeller/shader-compilation-frames-chart.png)
*Figure 2: Profiling chart showing shader compilation time in dark red color [source](https://docs.flutter.dev/tools/devtools/performance)*
</p>

I noticed immediately that Skia spent a lot of frame time compiling shaders when opening the splash screen, a bottom sheet, and a new screen. These compilation pauses caused animation jank during page transitions, which reduces the polish of the app. Impeller, on the other hand, produced smoother and more predictable frame rates, although the average FPS did not differ significantly between the two engines.

### Anti-Aliasing

Impeller supports MSAA (Multisample Anti-Aliasing), a modern technique that smooths jagged edges along geometry in your UI. MSAA is more computationally expensive than the anti-aliasing previously used in Skia, but it produces higher-quality, smoother edges. Although more expensive, modern mobile devices can handle it without issues.

One particular issue that MSAA helps address is the thin gaps that can appear between two adjacent containers of the same color, caused by sub-pixel rounding errors in the UI. This improved anti-aliasing may help close those gaps, making the UI appear more polished and seamless.

<p align="center" markdown="1">
<img src="/assets/img/i-tried-out-flutters-new-rendering-engine-impeller/thin-gap-problem.jpg" alt="Thin gap between two adjacent containers of the same color" class="max-w-72"/>
*Figure 3: Thin gap between two adjacent containers of the same color [source](https://github.com/flutter/flutter/issues/14288#issuecomment-1156754187)*
</p>

### Text Rendering

I, along with others, have observed text jitter when over-scrolling lists on Android. A similar issue also occurred when scaling text in previous Flutter versions. According to discussions on GitHub, this may be caused by floating-point errors and sub-pixel alignment issues. Interestingly, this problem does not appear on Skia. You can see the issue [here](https://github.com/flutter/flutter/issues/177492).

### Other Problems

You can view open Impeller-related issues on [Github](https://github.com/flutter/flutter/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22e%3A%20impeller%22). Most of these issues are related to performance and rendering on Android devices, which can vary due to hardware, screen resolution, and driver differences. I believe the Flutter team is actively addressing these issues, and I look forward to the improvements. From my experience, Impeller has improved significantly since earlier versions, at least on my device.

## Conclusion

Impeller is a promising rendering engine and a solid choice for modern devices. It is designed specifically for Flutter and leverages modern graphics APIs and hardware capabilities, such as MSAA, to improve rendering quality.

During my trial, Impeller delivered smoother and more predictable performance, and its improved anti-aliasing produces higher-quality visuals that may help address sub-pixel rendering issues. While there are still some performance and text-rendering issues on certain Android devices, the team is actively working on fixes. Since Impeller is still early in adoption, it is natural that there might be some bugs with edge cases.


## References and Further Readings

- [Antialiasing behaviour when same-colour  #14288](https://github.com/flutter/flutter/issues/14288)
- [Introducing Impeller - Flutter's new rendering engine](https://youtu.be/vd5NqS01rlA?si=euMPrcZvlN8gAKVh)
- [Impeller rendering engine](https://docs.flutter.dev/perf/impeller)
- [What is Vulkan?](https://docs.vulkan.org/guide/latest/what_is_vulkan.html)
- [Use the Performance view](https://docs.flutter.dev/tools/devtools/performance)
- [[Android] Stretch overscroll causes text jitter when using Impeller #167795](https://github.com/flutter/flutter/issues/167795)
- [[Impeller] Rendered Text Wiggles when scaling #162949](https://github.com/flutter/flutter/issues/162949)
- [The Meaning of Anti-Aliasing: FXAA, SMAA, MSAA, SSAA, TXAA Algorithms](https://vr.arvilab.com/blog/anti-aliasing)
