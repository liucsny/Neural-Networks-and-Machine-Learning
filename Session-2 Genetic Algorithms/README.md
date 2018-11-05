# Evolutionary Flocking Vehicles

An **Ecosystem Simulation** including:  
  - Self-driving agents (vehicles) to seek and eat food.
  - Foods generation whose rate depends on the amount of foods themselives.
  - Interaction behaviors (Separate, Align, Cohesion) among the vehicles.

## Vehicles Features (Parameters)
### Physics Parameters

| Parameters   | Description EN                | Description CN            |
| ------------ | ----------------------------- | ------------------------- |
| position     | Current Position (Vector)     | Vehicle当前位置（矢量）   |
| velocity     | Current Velocity (Vector)     | Vehicle当前速度（矢量）   |
| acceleration | Current Acceleration (Vector) | Vehicle当前加速度（矢量） |

### Athletic Ability Parameters

| Parameters      | Description EN                                    | Description CN                       |
| --------------- | ------------------------------------------------- | ------------------------------------ |
| maxSpeed        | Maximum Moving Speed                              | Vehicle移动的最大速度                |
| maxForce        | Maximum Steering Force                            | 改变Vehicle移动的最大的力            |
| walkAroundSpeed | Moving Speed when Walking Around                  | Vehicle随机游走的速度                |
| slowDownMargin  | Distance of Slowing Down when Runnig to Food      | 冲向食物时，即将到达而减慢的距离     |
| slowDownSpeed   | Minimum Speed of Slowing Down when Runnig to Food | 冲向食物时，即将到达而减慢的最小速度 |

### Health Parameters

| Parameters | Description EN                         | Description CN         |
| ---------- | -------------------------------------- | ---------------------- |
| size       | Size of the Vehicle                    | Vehicle的大小          |
| health     | Health of the Vehicle                  | Vehicle的生命值        |
| healthDown | Amount of Hea lth Decreasing per Frame | 每一帧生命值下降的数量 |
| maxHealth  | Maximum Health of the Vehicle          | Vehicle的生命值的上限  |

### Vision Parameters

| Parameters | Description EN                                                       | Description CN                                                    |
| ---------- | -------------------------------------------------------------------- | ----------------------------------------------------------------- |
| scope      | Scope of the Vehicle in which it can detect foods and other vehicles | Vehicle的视野，其他vehicle和食物只有在视野内才能被这个Vehicle感知 |

### Flock Behavior Parameters

| Parameters        | Description EN                                   | Description CN                                   |
| ----------------- | ------------------------------------------------ | ------------------------------------------------ |
| desiredSeparation | Radius of an Separation Area with other Vehicles | Vehicle希望和其他Vehicle保持的最小距离           |
| neighbordist      | Radius of an Area that                           | Vehicle希望和其他Vehicle群体保持一致和居中的距离 |
| separateWeight    |                                                  | 和其他Vehicle保持分离的力的比重                  |
| alignWeight       |                                                  | 和其他Vehicle的速度保持一致的力的比重            |
| cohesionWeight    |                                                  | 保持在附近Vehicle群体正中心的力的比重            |


### Food Seeking Preference Parameters
| Parameters          | Description EN                                   | Description CN                                   |
| ------------------- | ------------------------------------------------ | ------------------------------------------------ |
| foodDistWeight      | Radius of an Separation Area with other Vehicles | Vehicle希望和其他Vehicle保持的最小距离           |
| foodNutritionWeight | Radius of an Area that                           | Vehicle希望和其他Vehicle群体保持一致和居中的距离 |

  
### Predation Radius Parameters
| Parameters      | Description EN                                   | Description CN                                   |
| --------------- | ------------------------------------------------ | ------------------------------------------------ |
| eatFoodRadius   | Radius of an Separation Area with other Vehicles | Vehicle希望和其他Vehicle保持的最小距离           |
| eatPoisonRadius | Radius of an Area that                           | Vehicle希望和其他Vehicle群体保持一致和居中的距离 |

### Reproduction Parameters
| Parameters  | Description EN                                              | Description CN                         |
| ----------- | ----------------------------------------------------------- | -------------------------------------- |
| birthRate   | Probability of Giving Birth to a Child Vehicle              | Vehicle生产小Vehicle的几率             |
| birthHealth | Health Threshold under which the Vehicle can't Reproduction | Vehicle生产小Vehicle所必须达到的生命值 |


## System Monitor
There is a **Chart** Constructor that can create chart object to monitor the system status.  
By default, there are two chart objects montoring the amount of foods and vehicles, which are represented as green line chart and white line chart respectively.

## Todos
- [ ] Give different vehicle different preference between food nutrition and food distance when predation
- [ ] Features determined by DNA
- [ ] Child inherits DNA from Predecessor
- [ ] Add variation to DNA when reproduction
- [ ] Add poisions (negative nutrition foods) to the system and make vehicles to avoid them
- [ ] Add food depending on the amount of foods in a particular area
- [ ] Add predators that feed on vehicles and make vehicles to avoid them

## Local Serving
``` bash
npm install
npx http-server .
```