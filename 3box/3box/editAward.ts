import { IAward } from "../models/award";
/**
 * Updating the Award
 * increment the version number and update the updated time
 * add the new version pointer to updates array
 * set the latest item with the updated data and version
 * set that version to be used for logging later on
 *
 * @param {string} address
 * @param {string} id
 * @param {IAward} latest
 */
const editAward = async (address: string, id: string ,  latest:IAward) => {
    const Box = require("3box");
    latest.version = latest.version + 0.1;
    latest.updates.unshift(`${id}_v${latest.version}`);
    latest.updated = Date.now();
  
    const awardsSpace = await Box.openSpace(`${address}_awards`);
  
    // Update public space data
    await awardsSpace.public.set(id, JSON.stringify(latest));
    await awardsSpace.public.set(latest.updates[0], JSON.stringify(latest));
  };
  