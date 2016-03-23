function dataStorage(cacheName){
    this.db=new loki(cacheName);
};
dataStorage.prototype={

    ListIndex:null,
   /* createDb:function(cacheName){
        this.db=new loki(cacheName);
        this.db.save();
    },*/
    listCollections:function(){
      this.db.loadCollection;
    } ,
    getData:function(url,searchObj,callback){
        var collectionName="";
        var index = searchObj.page;
        if(index==null){
            searchObj.page='1';
        }
        $.each(searchObj,function(content,index){
            collectionName+=content+":"+searchObj[content]+'&';
        });
       /* console.log(collectionName);*/
     /*
        console.log(searchObj);*/

        if(!this.boolExist(collectionName)){
            /*console.log('collection is null');*/
            var that = this;
            $.ajax({
                type: 'GET',
                url: url,
                data:searchObj,
                contentType: "application/json",
                dataType: "json",
                cache: false,
                success: function (listdata) {
                    that.createCache(collectionName,listdata);
                    if(callback){
                        callback(listdata);
                    }
                }
            });
        }else{
            var listdata=this.getCache(collectionName);
            if(callback){
                callback(listdata);
            }
        }
        this.getNextList(url,searchObj);
    },
    getNextList:function(url,searchObj){
        var collectionName="";
        var index = searchObj.page;
            searchObj.page=(parseInt(index)+1).toString();
        $.each(searchObj,function(content,index){
            collectionName+=content+":"+searchObj[content]+'&';
        });
        if(!this.boolExist(collectionName)){
            var that = this;
            $.ajax({
                type: 'GET',
                url: url,
                data:searchObj,
                contentType: "application/json",
                dataType: "json",
                cache: false,
                success: function (listdata) {
                    that.createCache(collectionName,listdata);
                }
            });
        }

    },
   boolExist:function(Index){
       this.createListIndex(Index);
       if(this.db.getCollection(Index)==null){
           return false;
       }else{
           return true;
       }
   },
  getCache:function(Index){
      var collection=this.db.getCollection(Index);
      var data = collection.data[0];
      return data;
  },
  createCache:function(index,data){
    var dataCollection= this.db.addCollection(index);
    dataCollection.insert(data);
    this.db.save();
   },
    createListIndex:function(index){
        this.ListIndex=index;
    }
};
