---
title: Football Match Analysis System
description: A football analytics pipeline using object detection and tracking to measure player and ball movement during matches.
category: Computer vision
year: 2025
featured: true
order: 3
tech: [Python, Ultralytics, OpenCV, Scikit-learn, Roboflow, NumPy]
---
*This project is based on the resume entry for a football match analysis pipeline.*

## Overview and motivation

Match analysis benefits from turning raw video footage into measurable signals: ball possession, team classification, movement patterns, and player speed. This project explored a full pipeline for extracting those signals from video using computer vision and tracking methods.

## Problem statement

Tracking events from football footage is challenging because the camera can move, players overlap, and the ball is small and fast. The system needed to detect players and the ball, estimate motion, and produce useful match-level metrics from imperfect visual data.

## Approach and architecture

The pipeline uses YOLOv8 for object detection, then builds on tracking and temporal analysis to classify teams, estimate camera motion, and convert image coordinates into field-relative measurements. This allows the system to reason about possession, movement, and spatial behavior rather than just label individual frames.

## Technical decisions and trade-offs

- Perspective transformation is used to normalize the field and reduce camera distortion.
- Optical Flow helps estimate camera movement, which is important for stable motion analysis.
- Ball interpolation and possession tracking improve continuity in situations where detection is intermittent.

## Implementation details

The project includes automated team classification, perspective transformation, camera motion estimation by optical flow, ball interpolation, possession tracking, and speed/distance calculations for players. These components combine into a practical, end-to-end match analytics workflow.

## Results and limitations

The pipeline demonstrates how standard computer vision tooling can be assembled into an analysis system for team sports. The main limitations are that performance depends heavily on video quality, camera placement, and the stability of the tracking pipeline under crowded or occluded conditions.
