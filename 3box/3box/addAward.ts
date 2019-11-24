/**
 * Used to create new award for the student
 * create the award object with uuid v4
 * set the item to ${address}_awards twice 
 * one under the uuid which will be the pointer for the latest version
 * the other is for versioning which by default is set to 1.0
 * 
 *
 * @param {string} address
 * @param {*} badgeId
 * @param {{name,note}[]} awards
 */
const addAwards = async(address:string,badgeId, awards:{name,note}[]) =>{

    
    const uuid = require('uuid/v4');
    const Box = require('3box')

    const awardKeys = []
    const awardObjects = []
    const awardArchiveKeys = []
    const awardArchiveObjects = []

for(const item of awards){

    const id =  uuid();
    const object = {
        name:item.name,
        note:item.note || '',
        badgeId,
        version:1.0,
        created:Date.now(),
        updates:[`${id}_v1.0`]
    }

   awardKeys.push(id)
   awardObjects.push(JSON.stringify(object))
   awardArchiveKeys.push(object.updates[0])
   awardArchiveObjects.push(JSON.stringify(object))
    
}

 

    const awardsSpace = await Box.openSpace(`${address}_awards`)
    await awardsSpace.public.setMultiple(awardKeys, awardObjects)
    await awardsSpace.public.setMultiple(awardArchiveKeys, awardArchiveObjects)

    const badgesSpace =  await Box.openSpace(`${address}_badges`)
    const badge = await badgesSpace.public.get(badgeId)
    await badgesSpace.public.set(badgeId,{...badge , awards:badge.awards.push(...awardKeys)})
}

