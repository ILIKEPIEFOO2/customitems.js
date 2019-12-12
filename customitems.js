events.listen("loaded",function(event){
	global.customItemList=utils.newList();
	new global.customItem(item.of("minecraft:stick").nbt({display:{Name: '{"text":"Test Stick"}', color:1, Lore:['{"text":"lore here"}']}}).count(3))
	.addShapedRecipe(
	[
	"BBB",
	"B B",
	"BBB"
	],
	{
		B:'minecraft:beef'
	}
	).addShapelessRecipe(
	[
	'minecraft:stone',
	'minecraft:dirt'
	]).addCampfireRecipe(
	'minecraft:beef'
	).addSmokerRecipe(
	'minecraft:beef'
	).addSmeltingRecipe(
	'minecraft:beef'
	).addStoneCuttingRecipe(
	'minecraft:beef'
	).addBlastingRecipe(
	'minecraft:beef'
	)
	.add();
});
global.compareTwoItems=function(customItem,minecraftItem){
	if(customItem.ignoreNBT){
		return (minecraftItem.areItemsEqual(customItem.item));
	}else{
		var temp1=customItem.item.copy;
		var temp2=minecraftItem.copy;
		temp1.count=1;
		temp2.count=1;
		return (temp1.strongEquals(temp2));
	}
};
global.customItem=function (minecraftItem){
	if(!global.customItemList){
		global.customItemList=utils.newList();
	}
	this.item=minecraftItem;
	this.customUUID=global.generateCustomIdUUID(40);
	if(!global.customFunctions){
		global.customFunctions=utils.newMap();
	}
	while(global.customFunctions[this.customUUID]){
		this.customUUID=global.generateCustomIdUUID(40);
	}
	global.customFunctions.put(this.customUUID,{customItemClass:this});
	/**
		Add a 'tag' to the item or basically 
		the equivilent of ore dictionary names.
	*/
	this.tags=utils.newList();
	this.addTag=function(tag){
		if(tag){
			this.tags.add(tag);
		}
		return this;
	};
	
	/**
		When checking for event handlers,
		should nbt be ignored?
		
		Block Break will always ignore damage nbt (hopefully).
	*/
	this.ignoreNBT=false;
	this.ignoreNbt=function(shouldNBTBeIgnored){
		if(shouldNBTBeIgnored){
			this.ignoreNBT=shouldNBTBeIgnored;
		}
		return this;
	};
	
	/**
		When checking for event handlers,
		should damage be ignored?
		
		Block Break will always ignore damage.
	*/
	this.ignoreD=false;
	this.ignoreDamage=function(shouldDamageBeIgnored){
		if(typeof(shouldDamageBeIgnored) == "boolean"){
			this.ignoreD=shouldDamageBeIgnored;
		}
		return this;
	};
	
	/**
		When item is used to break block.
		Parameters:
		-Event handler function.
	*/
	this.blockBreak;
	this.onBlockBreak=function(eventHandler){
		if(eventHandler){
			this.blockBreak=eventHandler;
		}
		return this;
	};
	
	/**
		When item is used to right click a block.
		Parameters:
		-Event handler function.
	*/
	this.blockRightClick;
	this.onBlockRightClick=function(eventHandler){
		if(eventHandler){
			this.blockRightClick=eventHandler;
		}
		return this;
	};
	
	/**
		When item is rightClicked;
		Parameters:
		-Event handler function.
	*/
	this.rightClick;
	this.onRightClick=function(eventHandler){
		if(eventHandler){
			this.rightClick=eventHandler;
		}
		return this;
	};
	
	
	/**
		Place holder.
	*/
	this.rightClickEmpty;
	this.onRightClickEmpty=function(eventHandler){
		if(eventHandler){
			this.rightClickEmpty=eventHandler;
		}
		return this;
	};
	
	/**
		When item is left clicked.
		Parameters:
		-Event handler function.
	*/
	this.leftClick;
	this.onLeftClick=function(eventHandler){
		if(eventHandler){
			this.leftClick=eventHandler;
		}
		return this;
	};
	
	/**
		When item is used to interact with an entity.
		Parameters:
		-Event handler function.
	*/
	this.entityInteract;
	this.onEntityInteract=function(eventHandler){
		if(eventHandler){
			this.entityInteract=eventHandler;
		}
		return this;
	};
	
	/**
		When item is picked up.
		Parameters:
		-Event handler function.
	*/
	this.pickup;
	this.onPickup=function(eventHandler){
		if(eventHandler){
			this.pickup=eventHandler;
		}
		return this;
	};
	
	/**
		When item is dropped by player.
		Parameters:
		-Event handler function.
	*/
	this.drop;
	this.onDrop=function(eventHandler){
		if(eventHandler){
			
			this.drop=eventHandler;
		}
		return this;
	};
	
	/**
		When item is crafted.
		Parameters:
		-Event handler function.
	*/
	this.crafted;
	this.onCrafted=function(eventHandler){
		if(eventHandler){
			this.crafted=eventHandler;
		}
		return this;
	};
	
	/**
		When item is smelted.
		Parameters:
		-Event handler function.
	*/
	this.smelted;
	this.onSmelted=function(eventHandler){
		if(eventHandler){
			this.smelted=eventHandler;
		}
		return this;
	};
	
	/**
		Used to add a shapeless recipe for this item.
		Parameters: 
		-List of required items.
	*/
	this.shapelessRecipes=utils.newList();
	this.addShapelessRecipe=function(itemRequirements){
		for(var i=0;i<itemRequirements.length;i++){
			if(!itemRequirements[i]){
				console.error("Invalid item in Custom Item index: "+i);
			}
		}
		this.shapelessRecipes.add(itemRequirements);
		return this;
	};
	
	/**
		Used to add a shaped recipe for this item.
		Parameters: 
		-Recipe Pattern
		-Recipe Key
	*/
	this.shapedRecipes=utils.newList();
	this.addShapedRecipe=function(pattern,key){
		this.shapedRecipes.add({pattern:pattern,key:key});
		return this;
	};
	
	/**
		Used to add a smelting/furnace recipe for this item.
		Parameters: 
		-Required Item
	*/
	this.smeltingRecipes=utils.newList();
	this.addSmeltingRecipe=function(itemRequirements){
		this.smeltingRecipes.add(itemRequirements);
		return this;
	};
	
	/**
		Used to add a smoker recipe for this item.
		Parameters: 
		-Required Item
	*/
	this.smokerRecipes=utils.newList();
	this.addSmokerRecipe=function(itemRequirements){
		this.smokerRecipes.add(itemRequirements);
		return this;
	};
	
	/**
		Used to add a blast furnace recipe for this item.
		Parameters: 
		-Required Item
	*/
	this.blastingRecipes=utils.newList();
	this.addBlastingRecipe=function(itemRequirements){
		this.blastingRecipes.add(itemRequirements);
		return this;
	};
	
	/**
		Used to add a camp fire recipe for this item.
		Parameters: 
		-Required Item
	*/
	this.campfireRecipes=utils.newList();
	this.addCampfireRecipe=function(itemRequirements){
		this.campfireRecipes.add(itemRequirements);
		return this;
	};
	
	/**
		Used to add a stone cutter recipe for this item.
		Parameters: 
		-Required Item
	*/
	this.stoneCuttingRecipes=utils.newList();
	this.addStoneCuttingRecipe=function(itemRequirements){
		this.stoneCuttingRecipes.add(itemRequirements);
		return this;
	};
	this.add=function(){
		global.customItemList.add(this);
	};
};
global.generateCustomIdUUID=function (length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
};
events.listen("server.datapack.tags",function(event){
	var itemList=global.customItemList;
	for(var i=0;i<itemList.length;i++){
		if(itemList[i].tags){
			for(var x=0;x<itemList[i].tags.length;x++){
				event.tags.items.get(itemList[i].tags[x]).add(itemList[i]);
			}
		}
	}
});
events.listen("server.datapack.recipes",function(event){
	var itemList=global.customItemList;
	for(var i=0;i<itemList.length;i++){
		if(itemList[i].shapedRecipes){
			for(var x=0;x<itemList[i].shapedRecipes.length;x++){
				event.shaped(itemList[i].item,itemList[i].shapedRecipes[x].pattern,itemList[i].shapedRecipes[x].key);
			}
		}
		if(itemList[i].shapelessRecipes){
			for(var x=0;x<itemList[i].shapelessRecipes.length;x++){
				event.shapeless(itemList[i].item,itemList[i].shapelessRecipes[x]);
			}
		}
		if(itemList[i].smeltingRecipes){
			for(var x=0;x<itemList[i].smeltingRecipes.length;x++){
				event.smelting(itemList[i].item,itemList[i].smeltingRecipes[x]);
			}
		}
		if(itemList[i].smokerRecipes){
			for(var x=0;x<itemList[i].smokerRecipes.length;x++){
				event.recipes.minecraft.smoking(itemList[i].item,itemList[i].smokerRecipes[x]);
			}
		}
		if(itemList[i].blastingRecipes){
			for(var x=0;x<itemList[i].blastingRecipes.length;x++){
				event.recipes.minecraft.blasting(itemList[i].item,itemList[i].blastingRecipes[x]);
			}
		}
		if(itemList[i].campfireRecipes){
			for(var x=0;x<itemList[i].campfireRecipes.length;x++){
				event.recipes.minecraft.campfire_cooking(itemList[i].item,itemList[i].campfireRecipes[x]);
			}
		}
		if(itemList[i].stoneCuttingRecipes){
			for(var x=0;x<itemList[i].stoneCuttingRecipes.length;x++){
				event.recipes.minecraft.stonecutting(itemList[i].item,itemList[i].stoneCuttingRecipes[x]);
			}
		}
	}
});
events.listen("item.right_click",function(event){
	var itemList=global.customItemList;
	for(var i=0;i<itemList.length;i++){
		if(itemList[i].rightClick){
			event.server.tell(global.compareTwoItems(itemList[i],event.item));
			if(global.compareTwoItems(itemList[i],event.item)){
				event.server.tell("right click");
				itemList[i].rightClick(event);
				event.server.tell(itemList[i].rightClick);
			}
		}
	}
});
events.listen("item.left_click",function(event){
	var itemList=global.customItemList;
	for(var i=0;i<itemList.length;i++){
		if(itemList[i].leftClick){
			if(itemList[i].doItemsMatch(event.item)){
				itemList[i].leftClick(event);
			}
		}
	}
});