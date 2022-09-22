# Use cases

<style>
td {
    font-size: 0.8em;
}
.note {
    font-size: 0.7em;
    text-align: right;
}
</style>

What are the types of web experiment things we are doing as a lab generally?  I guess we might want to see if there's a solution that covers some or most of what people wanted.  Let’s take a look at some recent papers and proposed projects…

| Paper                           | JsPsych? | Qualtrics?| psiTurk | Unity | Notes          |
| ------------------------------- |:--------:|:---------:|:-------:|:-----:|----------------|
| [Angela’s attention RL task](https://gureckislab.org/papers/#/ref/radulescu2022langrl)      | :+1:     |           | [nivturk](https://nivlab.github.io/nivturk/) |    | perfect 4 jspsych |
| [Emily’s question asking](https://gureckislab.org/papers/#/ref/liquin2022newquestion)         |          |           | :+1:    |       | complex mouse-guided interactions with a battleship grid |
| [Guy’s VR](https://gureckislab.org/papers/#/ref/davidson2022games)                        |          |           |         | :+1:  | needed unity (also used React) |
| Pam’s multi-player helping task |          |           | :+1:?   |       | [phaser3](https://phaser.io) |
| [Ill’s canadian traveler](https://gureckislab.org/papers/#/ref/ma2021information)         |          |           | :+1:    | :+1:  | unity due to modeling MCTS in c# |
| [Anna’s causal learning](https://gureckislab.org/papers/#/ref/coenen2015strategies)          |          |           | :+1:    |       | ungodly, but d3js |
| [Alex rich learning traps](https://gureckislab.org/papers/#/ref/rich2018limits)        |          |           | :+1:    |       | clean d3js code + psiturk |
| [Pam’s categorization](https://gureckislab.org/papers/#/ref/osborn-popp2022ruleincentives)            | (:+1:)   |           | :+1:    |       | could have been jspych |
| David’s long term memory        | :+1:     |           | :+1:+[returk](https://github.com/NYUCCL/returk)  | | jspsych for the task returk to email people days later to follow up second part |
| Pat physics experiments         | (:+1:?)  |           |         |       |  fancy video stuff             |
| [Ethan physics stuff](https://gureckislab.org/papers/#/ref/ludwin2021limits)             | (:+1:)   | :+1:      |         |       | :frowning_face: trials not randomized! |
| [WaiKeen ARC task](https://gureckislab.org/papers/#/ref/johnson2021fast)                |          |           | :+1:    |       | complex code from online |

<div class="note">
(👍) means in theory could have used it<br>
👍? means unsure
</div>


## Future designs

What are the kinds of things we might want to do in the future?

| Paper                           | Notes                                          |
| ------------------------------- |------------------------------------------------|
| :star_struck: Undergrad research projects | **Need something easy to teach with** |
| Emily build a game to teach     |   complex, dynamic interactions, maybe phaser  |
| Question asking                 |   complex, dynamic interactions, generalization to new task  |
| Baba is not RL                  |   sprite based game would be helped by phaser, or just generally dynamic task  |
| Future helping exps             |   build on the phaser multiplayer thing        |
| Intuitive physics (video)       |   video manipulations and ratings of videos    |
| Intuitive physics (sims/interact) |  some type of in-browser game engine with physics |
| Human-machine interaction       |  open ended |
| Complex 3d interactions (ala Guy) | Unity and stuff | 
| Reinforcement learning and language | basic stuff, jspsych or the like |
| Future "psychology" exps (memory, decision making) | basic stuff, jspsych or the like |
