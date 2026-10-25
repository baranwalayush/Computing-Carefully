---
title: Semi-Supervised Liver Segmentation via Hybrid Vision Mamba
description: A 2.5D medical image segmentation pipeline combining CNN and Vision Mamba components for robust liver segmentation.
category: Computer vision
year: 2025
featured: true
order: 2
tech: [PyTorch, Vim, ViT, Medical Imaging, Segmentation]
---
*This project is based on the resume entry for a liver segmentation system.*

## Overview and motivation

Medical image segmentation is difficult when the dataset is small and the target boundaries are irregular. This project explored a 2.5D approach that combines convolutional features with long-range context modeling to improve liver segmentation quality.

## Problem statement

Liver segmentation in volumetric data often suffers from edge distortion, foreground imbalance, and limited labeled data. The goal was to build a robust pipeline that can make use of unlabeled slices while preserving boundary detail and segmentation stability.

## Approach and architecture

The model fuses a CNN encoder with a Vision Mamba encoder and a TransUNet-style decoder. By processing neighboring slices in a 2.5D setup, the network captures both local texture and broader inter-slice context while keeping the pipeline practical for medical image workflows.

## Technical decisions and trade-offs

- A hybrid encoder balances local detail from CNNs with long-range dependency modeling from Vision Mamba.
- The 2.5D formulation is a compromise between full 3D modeling and slice-wise efficiency.
- Semi-supervised learning is used to improve generalization when labeled examples are limited.

## Implementation details

The system used a weighted compound loss combining Dice, cross-entropy, Focal Tversky, and BDoU terms to mitigate boundary artifacts and foreground imbalance. A pseudo-label reliability scorer was also designed to support semi-supervised fine-tuning and improve consistency during training.

## Results and limitations

The project reports a Dice score of 0.9321 on the target task. The approach is promising for medical segmentation, but real-world deployment would still require more validation across diverse scanners, imaging protocols, and annotation standards.
