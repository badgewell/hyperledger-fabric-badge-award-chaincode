import { IBadge } from "../models/badge";
/**
 * Updating the Badge/Certificate
 * increment the version number and update the updated time
 * add the new version pointer to updates array
 * set the latest item with the updated data and version
 * set that version to be used for logging later on
 *
 * @param {string} address
 * @param {string} id
 * @param {IBadge} latest
 */
const editBadge = async (address: string, id: string, latest:IBadge) => {
  const Box = require("3box"); 
  latest.version = latest.version + 0.1;
  latest.updates.unshift(`${id}_v${latest.version}`);
  latest.updated = Date.now();

  const badgesSpace = await Box.openSpace(`${address}_badges`);

  // Update public space data
  await badgesSpace.public.set(id, JSON.stringify(latest));
  await badgesSpace.public.set(latest.updates[0], JSON.stringify(latest));
};
