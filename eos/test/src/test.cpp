#include <eosio/eosio.hpp>
#include <eosio/print.hpp>

using namespace eosio;

CONTRACT test : public contract {
  public:
    using contract::contract;
    
    //saves the awardId and hash to the table
    //if it already exists, overwrite
    ACTION save(std::string awardId, std::string hash){
      awardsTable _awards(_self,_self.value);
      //checks for duplicate
      for(auto it = _awards.begin(); it != _awards.end(); it++){
        if(it -> id == awardId){
          _awards.modify(it,_self,[&](auto& p){
            p.hash = hash;
          });
          print("Award was overriden successfully");
          return;
        }
      }
      _awards.emplace(get_self(),[&](auto& p){
        p.key = _awards.available_primary_key();
        p.id = awardId;
        p.hash = hash;
      });
      print("Award was added successfully");
    }
    
    
    //deletes the awardId from the table
    ACTION erase(std::string awardId){
      awardsTable _awards(_self,_self.value);
      for(auto it = _awards.begin(); it != _awards.end();it++){
        if(it -> id == awardId){
          _awards.erase(it);
          print("erased ", std::string{awardId});
          return;
        }
      }
        
      print("Award doesn't exist");
    }
    
    //prints the hash corresponding to the awardId
    ACTION get(std::string awardId){
      awardsTable _awards(_self,_self.value);
      for(auto it = _awards.begin(); it != _awards.end();it++){
        if(it -> id == awardId){
          print(it -> hash);
          return;
        }
      }
      
      print("Award doesn't exist");
    }



  private:
    TABLE award
    {
      uint64_t key;
      std::string id;
      std::string hash;
      uint64_t primary_key() const {return key;}
      EOSLIB_SERIALIZE(award,(key)(id)(hash))
    };
    
    typedef multi_index<"awards"_n, award> awardsTable;
    

};

EOSIO_DISPATCH(test, (erase)(save)(get))
