# Evolutionary Flocking Vehicles

An **Ecosystem Simulation** including:  
  - Self-driving agents (vehicles) to seek and eat food.
  - Foods generation whose rate depends on the amount of foods themselives.
  - Interactive behaviors (Separate, Align, Cohesion) among the vehicles.

## Vehicles Features (Parameters)
  - position
  - velocity
  - acceleration
  - maxSpeed
  - maxForce

  - walkAroundSpeed

  - slowDownMargin
  - slowDownSpeed
  
  - size
  - health
  - healthDown
  - maxHealth
  
  - scope = scope;
  
  - desiredSeparation
  - neighbordist
  - desiredSeparation

  - separateWeight
  - alignWeight
  - cohesionWeight

  - foodDistWeight
  - foodNutritionWeight
  - eatFoodRadius
  - eatPoisonRadius

  - birthRate
  - birthHealth

  - noiseRands
  - frame

## Features to Add

## Local Serving
``` bash
npm install
npx http-server .
```