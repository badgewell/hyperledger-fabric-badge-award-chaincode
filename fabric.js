/*
 Copyright 2018 IBM All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the 'License');
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
		http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an 'AS IS' BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

'use strict';
const shim = require('fabric-shim');
const util = require('util');

let Chaincode = class {

  /**
   * The Init method is called when the Smart Contract 'badges' is instantiated by the 
   * blockchain network. Best practice is to have any Ledger initialization in separate
   * function -- see initLedger()
   */
  async Init(stub) {
    console.info('=========== Instantiated badges chaincode ===========');
    return shim.success();
  }
  /**
   * The Invoke method is called as a result of an application request to run the 
   * Smart Contract 'badges'. The calling application program has also specified 
   * the particular smart contract function to be called, with arguments
   */
  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);

    let method = this[ret.fcn];
    if (!method) {
      console.error('no function of name:' + ret.fcn + ' found');
      throw new Error('Received unknown function ' + ret.fcn + ' invocation');
    }
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.info(err);
      return shim.error(err);
    }
  }

  /**
   * The initLedger method is called as a result of instantiating chaincode. 
   * It can be thought of as a constructor for the network. For this network 
   */
  async initLedger(stub, args) {
    console.info('============= START : Initialize Ledger ===========');

    console.info('============= END : Initialize Ledger ===========');
  }

  /**
   * Query the state of the blockchain by passing in a key  
   * @param arg[0] - key to query 
   * @return value of the key if it exists, else return an error 
   */
  async query(stub, args) {
    console.info('============= START : Query method ===========');
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting 1');
    }

    let query = args[0];

    let queryAsBytes = await stub.getState(query); //get the car from chaincode state
    console.log(queryAsBytes.toString())
    if (!queryAsBytes || queryAsBytes.toString().length <= 0) {
      throw new Error('key' + ' does not exist: ');
    }
    console.info('query response: ');
    console.info(queryAsBytes.toString());
    console.info('============= END : Query method ===========');

    return queryAsBytes;

  }
  async getBadge(stub, args) {
    console.info('============= START : getBadge method ===========');
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting 1');
    }

    let query = args[0];

    let queryAsBytes = await stub.getState(query); //get the car from chaincode state
    console.log(queryAsBytes.toString())
    if (!queryAsBytes || queryAsBytes.toString().length <= 0) {
      throw new Error('key' + ' does not exist: ');
    }
    console.info('query response: ');
    console.info(queryAsBytes.toString());
    console.info('============= END : getBadge method ===========');

    return queryAsBytes;

  }
  async getAward(stub, args) {
    console.info('============= START : getAward method ===========');
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting 1');
    }

    let query = args[0];

    let queryAsBytes = await stub.getState(query); //get the car from chaincode state
    console.log(queryAsBytes.toString())
    if (!queryAsBytes || queryAsBytes.toString().length <= 0) {
      throw new Error('key' + ' does not exist: ');
    }
    console.info('query response: ');
    console.info(queryAsBytes.toString());
    console.info('============= END : getAward method ===========');

    return queryAsBytes;

  }
  async getAwardAndBadge(stub, args) {
    console.info('============= START : getAwardAndBadge method ===========');
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting 1');
    }

    let query = args[0];

    let AwardAsBytes = await stub.getState(query); //get the car from chaincode state
    console.log(AwardAsBytes.toString())
    const award = JSON.parse(AwardAsBytes.toString())
    const badgeId = award.blockchainBadgeId
    if (!AwardAsBytes || AwardAsBytes.toString().length <= 0) {
      throw new Error('key award' + ' does not exist: '+ query);
    }

    let BadgeAsBytes = await stub.getState(badgeId); //get the car from chaincode state
    console.log(BadgeAsBytes.toString())
    const badge = JSON.parse(BadgeAsBytes)
    if (!BadgeAsBytes || BadgeAsBytes.toString().length <= 0) {
      throw new Error('key badge' + ' does not exist: ' + badgeId );
    }
    const response = {...badge , ...award }
    console.info('query response: ');
    console.info(JSON.stringify(response)); 
    console.info('============= END : getAwardAndBadge method ===========');

    return Buffer.from(JSON.stringify(response));

  }

   /**
   * Create a badge object in the state  
   * @param arg[0] - content of the badge
   * onSuccess - create and update the state with a new badge object  
   */
  async createBadge(stub, args) {
    console.log(args.length)
    console.log(args)
    console.info('============= START : Create Badge ===========');
    // if (args.length != 2) {
    //   throw new Error('Incorrect number of arguments. Expecting 2');
    // }
    const badge = JSON.parse(args[0])
    badge.type = 'badge'

    await stub.putState(badge.id, Buffer.from(JSON.stringify(badge)));
    console.info('============= END : Create Badge ===========');
  }

   /**
   * update a badge object in the state  
   * @param arg[0] - content of the badge
   * onSuccess - update the state with a  badge object  
   */
  async updateBadge(stub, args) {
    console.log(args.length)
    console.log(args)
    console.info('============= START : Update Badge ===========');
    // if (args.length != 2) {
    //   throw new Error('Incorrect number of arguments. Expecting 2');
    // }
    const badge = JSON.parse(args[0])
    badge.type = 'badge'
    await stub.putState(badge.id, Buffer.from(JSON.stringify(badge)));
    console.info('============= END : Update Badge ===========');
  }

   /**
   * Create a award  object in the state  
   * @param arg[0] - content of the award
   * onSuccess - create and update the state with a new award object  
   */
  async createAward(stub, args) {
    console.info('============= START : Create Award ===========');
    // if (args.length != 2) {
    //   throw new Error('Incorrect number of arguments. Expecting 2');
    // }
    const {awards} = JSON.parse(args[0])
    for(const award of awards){
      award.type = 'award'
      await stub.putState(award.id, Buffer.from(JSON.stringify(award)));
    }

    console.info('============= END : Create Award ===========');
  }

   /**
   * Update a award  object in the state  
   * @param arg[0] - content of the award
   * onSuccess - update the state with a  award object  
   */
  async updateAward(stub, args) {
    console.info('============= START : Update Award ===========');
    // if (args.length != 2) {
    //   throw new Error('Incorrect number of arguments. Expecting 2');
    // }
    const {awards} = JSON.parse(args[0])
    for(const award of awards){
      award.type = 'award'
      await stub.putState(award.id, Buffer.from(JSON.stringify(award)));
    }

    console.info('============= END : Update Award ===========');
  }

};

shim.start(new Chaincode()); 
