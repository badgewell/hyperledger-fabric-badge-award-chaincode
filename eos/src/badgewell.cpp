#include <eosio/eosio.hpp>
#include <eosio/print.hpp>

using namespace eosio;

CONTRACT badgewell : public contract {
  public:
    using contract::contract;
    
    ACTION save(std::string awardId,std::string hash){
      awardsTable _awardsTable(_self,_self.value);
      auto it = _awardsTable.find(0);
      if(it == _awardsTable.end()){
       _awardsTable.emplace(get_self(),[&](auto& p){
        p.key = 0;
        p.awardsMap[awardId] = hash;
      }); 
      return;
      }
      
      _awardsTable.modify(it,_self,[&](auto& p){
        p.awardsMap[awardId] = hash;
      });
    }
    
    ACTION erase(std::string awardId){
      awardsTable _awardsTable(_self,_self.value);
      auto it = _awardsTable.find(0);
      if(it == _awardsTable.end()){
      return;
      }
      
      _awardsTable.modify(it,_self,[&](auto& p){
        p.awardsMap.erase(awardId);
      });
    }

  private:
    TABLE awards
    {
      uint64_t key;
      std::map<std::string,std::string> awardsMap;
      uint64_t primary_key() const {return key;}
      EOSLIB_SERIALIZE(awards,(key)(awardsMap))
    };
    
    typedef multi_index<"awards"_n, awards> awardsTable;
    

};

EOSIO_DISPATCH(badgewell, (save)(erase))
