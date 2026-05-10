import * as Borger from "@borger/ts";

await Borger.play(function game() {
	//purely client sided rendering pipeline. it should
	//be able to able to render the game in any state,
	//regardless of what the simulation is doing. remember
	//that rollbacks/mispredicts/reconnects can wipe out
	//data that was already rendered in a previous frame
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	return function presentationLoop(dt, input, output) {};
});
