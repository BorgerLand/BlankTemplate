import * as Borger from "@borger/ts";

const engine = await Borger.init();

//purely client sided rendering pipeline. it should
//be able to able to render the game in any state,
//regardless of what the simulation is doing. remember
//that rollbacks/mispredicts/reconnects can wipe out
//data that was already rendered in a previous frame
await Borger.present(engine, function presentationLoop(input: Borger.Input, output: Borger.Output) {});
