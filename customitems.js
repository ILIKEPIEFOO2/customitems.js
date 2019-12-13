events.listen("loaded", function(event) {
    global.customItemList = utils.newList();
    /**
    	Example Item Below:		
    */
    new customItem(item.of("minecraft:stick")
            .nbt({
                display: {
                    Name: '{"text":"Testing"}'
                }
            })
            .count(3)
        )
        .onRightClick(function(event) {
            event.player.tell("Right Click");
        })
        .onLeftClick(function(event) {
            event.player.tell("Left Click");
        })
        .onBlockRightClick(function(event) {
            event.player.tell("Block Right Click");
        })
        .onBlockLeftClick(function(event) {
            event.player.tell("Block Left Click");
        })
        .onBlockPlace(function(event) {
            event.entity.tell("Block Placed");
        })
        .onBlockBreak(function(event) {
            event.player.tell("Block Break");
        })
        .onEntityInteract(function(event) {
            event.player.tell("Entity Interact");
        })
        .onCrafted(function(event) {
            event.player.tell("Crafted");
        })
        .onSmelted(function(event) {
            event.player.tell("Smelted");
        })
        .onDrop(function(event) {
            event.player.tell("Dropped");
        })
        .onPickup(function(event) {
            event.player.tell("Pickedup");
        })
        .addShapedRecipe(
            [
                "BBB",
                "B B",
                "BBB"
            ], {
                B: 'minecraft:beef'
            })
        .addShapelessRecipe(
            [
                'minecraft:stone',
                'minecraft:dirt'
            ])
        .addCampfireRecipe(
            'minecraft:beef'
        )
        .addSmokerRecipe(
            'minecraft:beef'
        )
        .addSmeltingRecipe(
            'minecraft:beef'
        )
        .addStoneCuttingRecipe(
            'minecraft:beef'
        )
        .addBlastingRecipe(
            'minecraft:beef'
        )
        .add();
});

function customItem(minecraftItem) {
    if (!global.customItemList) {
        global.customItemList = utils.newList();
    }
    this.item = minecraftItem;
    /**
    	Add a 'tag' to the item or basically 
    	the equivilent of ore dictionary names.
    */
    this.tags = utils.newList();
    this.addTag = function(tag) {
        if (tag) {
            this.tags.add(tag);
        }
        return this;
    };

    /**
    	When checking for event handlers,
    	should nbt be ignored?
    	
    	Block Break will always ignore damage nbt (hopefully).
    */
    this.ignoreNBT = false;
    this.ignoreNbt = function(shouldNBTBeIgnored) {
        if (shouldNBTBeIgnored) {
            this.ignoreNBT = shouldNBTBeIgnored;
        }
        return this;
    };

    /**
    	When checking for event handlers,
    	should damage be ignored?
    	
    	Block Break will always ignore damage.
    */
    this.ignoreD = false;
    this.ignoreDamage = function(shouldDamageBeIgnored) {
        if (typeof(shouldDamageBeIgnored) == "boolean") {
            this.ignoreD = shouldDamageBeIgnored;
        }
        return this;
    };


    /**
    	When item is used to right click block.
    	Parameters:
    	-Event handler function.
    */
    this.blockPlace;
    this.onBlockPlace = function(eventHandler) {
        if (eventHandler) {
            this.blockPlace = eventHandler;
        }
        return this;
    };

    /**
    	When item is used to left click a block.
    	Parameters:
    	-Event handler function.
    */
    this.blockLeftClick;
    this.onBlockLeftClick = function(eventHandler) {
        if (eventHandler) {
            this.blockLeftClick = eventHandler;
        }
        return this;
    };

    /**
    	When item is used to right click a block.
    	Parameters:
    	-Event handler function.
    */
    this.blockRightClick;
    this.onBlockRightClick = function(eventHandler) {
        if (eventHandler) {
            this.blockRightClick = eventHandler;
        }
        return this;
    };

    /**
    	When item is used to break block.
    	Parameters:
    	-Event handler function.
    */
    this.blockBreak;
    this.onBlockBreak = function(eventHandler) {
        if (eventHandler) {
            this.blockBreak = eventHandler;
        }
        return this;
    };

    /**
    	When item is rightClicked;
    	Parameters:
    	-Event handler function.
    */
    this.rightClick;
    this.onRightClick = function(eventHandler) {
        if (eventHandler) {
            this.rightClick = eventHandler;
        }
        return this;
    };


    /**
    	Place holder.
    */
    this.rightClickEmpty;
    this.onRightClickEmpty = function(eventHandler) {
        if (eventHandler) {
            this.rightClickEmpty = eventHandler;
        }
        return this;
    };

    /**
    	When item is left clicked.
    	Parameters:
    	-Event handler function.
    */
    this.leftClick;
    this.onLeftClick = function(eventHandler) {
        if (eventHandler) {
            this.leftClick = eventHandler;
        }
        return this;
    };

    /**
    	When item is used to interact with an entity.
    	Parameters:
    	-Event handler function.
    */
    this.entityInteract;
    this.onEntityInteract = function(eventHandler) {
        if (eventHandler) {
            this.entityInteract = eventHandler;
        }
        return this;
    };

    /**
    	When item is picked up.
    	Parameters:
    	-Event handler function.
    */
    this.pickup;
    this.onPickup = function(eventHandler) {
        if (eventHandler) {
            this.pickup = eventHandler;
        }
        return this;
    };

    /**
    	When item is dropped by player.
    	Parameters:
    	-Event handler function.
    */
    this.drop;
    this.onDrop = function(eventHandler) {
        if (eventHandler) {
            this.drop = eventHandler;
        }
        return this;
    };

    /**
    	When item is crafted.
    	Parameters:
    	-Event handler function.
    */
    this.crafted;
    this.onCrafted = function(eventHandler) {
        if (eventHandler) {
            this.crafted = eventHandler;
        }
        return this;
    };

    /**
    	When item is smelted.
    	Parameters:
    	-Event handler function.
    */
    this.smelted;
    this.onSmelted = function(eventHandler) {
        if (eventHandler) {
            this.smelted = eventHandler;
        }
        return this;
    };

    /**
    	Used to add a shapeless recipe for this item.
    	Parameters: 
    	-List of required items.
    */
    this.shapelessRecipes = utils.newList();
    this.addShapelessRecipe = function(itemRequirements) {
        for (var i = 0; i < itemRequirements.length; i++) {
            if (!itemRequirements[i]) {
                console.error("Invalid item in Custom Item index: " + i);
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
    this.shapedRecipes = utils.newList();
    this.addShapedRecipe = function(pattern, key) {
        this.shapedRecipes.add({
            pattern: pattern,
            key: key
        });
        return this;
    };

    /**
    	Used to add a smelting/furnace recipe for this item.
    	Parameters: 
    	-Required Item
    */
    this.smeltingRecipes = utils.newList();
    this.addSmeltingRecipe = function(itemRequirements) {
        this.smeltingRecipes.add(itemRequirements);
        return this;
    };

    /**
    	Used to add a smoker recipe for this item.
    	Parameters: 
    	-Required Item
    */
    this.smokerRecipes = utils.newList();
    this.addSmokerRecipe = function(itemRequirements) {
        this.smokerRecipes.add(itemRequirements);
        return this;
    };

    /**
    	Used to add a blast furnace recipe for this item.
    	Parameters: 
    	-Required Item
    */
    this.blastingRecipes = utils.newList();
    this.addBlastingRecipe = function(itemRequirements) {
        this.blastingRecipes.add(itemRequirements);
        return this;
    };

    /**
    	Used to add a camp fire recipe for this item.
    	Parameters: 
    	-Required Item
    */
    this.campfireRecipes = utils.newList();
    this.addCampfireRecipe = function(itemRequirements) {
        this.campfireRecipes.add(itemRequirements);
        return this;
    };

    /**
    	Used to add a stone cutter recipe for this item.
    	Parameters: 
    	-Required Item
    */
    this.stoneCuttingRecipes = utils.newList();
    this.addStoneCuttingRecipe = function(itemRequirements) {
        this.stoneCuttingRecipes.add(itemRequirements);
        return this;
    };
    this.add = function() {
        global.customItemList.add(this);
    };
};
global.compareTwoItems = function(customItem, minecraftItem, event) {
    if (event) {
        event.server.tell(minecraftItem);
        event.server.tell(minecraftItem.id);
        event.server.tell(customItem.item.id);
    }
    if (!minecraftItem || !customItem.item) {
        if (event) {
            event.server.tell("Invalid items");
        }
        return false;
    }
    if (!minecraftItem.id || !customItem.item.id) {
        if (event) {
            event.server.tell("Items don't have an id.");
        }
        return false;
    }
    if (minecraftItem.id.compareTo(customItem.item.id)) {
        if (event) {
            event.server.tell("Ids don't match.");
        }
        return false;
    }
    if (customItem.ignoreNBT) {
        if (event) {
            event.server.tell("Ignoring NBT");
        }
        return (minecraftItem.areItemsEqual(customItem.item));
    } else {
        if (event) {
            event.server.tell("Copying items");
        }
        var temp1 = customItem.item.copy;
        var temp2 = minecraftItem.copy;
        if (event) {
            event.server.tell("Setting Count");
        }
        temp1.count = 1;
        temp2.count = 1;
        if (event) {
            event.server.tell("Setting Damage");
        }
        temp1.Damage = 0;
        temp2.Damage = 0;
        if (event) {
            event.server.tell("Comparing: ");
            event.server.tell(temp1);
            event.server.tell(temp2);
            event.server.tell(temp1.strongEquals(temp2));
        }
        return (temp1.strongEquals(temp2));
    }
};
events.listen("server.datapack.tags", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].tags) {
            for (var x = 0; x < itemList[i].tags.length; x++) {
                event.tags.items.get(itemList[i].tags[x]).add(itemList[i]);
            }
        }
    }
});
events.listen("server.datapack.recipes", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].shapedRecipes) {
            for (var x = 0; x < itemList[i].shapedRecipes.length; x++) {
                event.shaped(itemList[i].item, itemList[i].shapedRecipes[x].pattern, itemList[i].shapedRecipes[x].key);
            }
        }
        if (itemList[i].shapelessRecipes) {
            for (var x = 0; x < itemList[i].shapelessRecipes.length; x++) {
                event.shapeless(itemList[i].item, itemList[i].shapelessRecipes[x]);
            }
        }
        if (itemList[i].smeltingRecipes) {
            for (var x = 0; x < itemList[i].smeltingRecipes.length; x++) {
                event.smelting(itemList[i].item, itemList[i].smeltingRecipes[x]);
            }
        }
        if (itemList[i].smokerRecipes) {
            for (var x = 0; x < itemList[i].smokerRecipes.length; x++) {
                event.recipes.minecraft.smoking(itemList[i].item, itemList[i].smokerRecipes[x]);
            }
        }
        if (itemList[i].blastingRecipes) {
            for (var x = 0; x < itemList[i].blastingRecipes.length; x++) {
                event.recipes.minecraft.blasting(itemList[i].item, itemList[i].blastingRecipes[x]);
            }
        }
        if (itemList[i].campfireRecipes) {
            for (var x = 0; x < itemList[i].campfireRecipes.length; x++) {
                event.recipes.minecraft.campfire_cooking(itemList[i].item, itemList[i].campfireRecipes[x]);
            }
        }
        if (itemList[i].stoneCuttingRecipes) {
            for (var x = 0; x < itemList[i].stoneCuttingRecipes.length; x++) {
                event.recipes.minecraft.stonecutting(itemList[i].item, itemList[i].stoneCuttingRecipes[x]);
            }
        }
    }
});
events.listen("block.right_click", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].blockRightClick) {
            if (global.compareTwoItems(itemList[i], event.item)) {
                itemList[i].blockRightClick(event);
            }
        }
    }
});
events.listen("block.left_click", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].blockLeftClick) {
            if (global.compareTwoItems(itemList[i], event.item)) {
                itemList[i].blockLeftClick(event);
            }
        }
    }
});
events.listen("block.break", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].blockBreak) {
            if (global.compareTwoItems(itemList[i], event.player.mainHandItem)) {
                itemList[i].blockBreak(event);
            }
        }
    }
});
events.listen("block.place", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].blockPlace) {
            if (global.compareTwoItems(itemList[i], event.block.item)) {
                itemList[i].blockPlace(event);
            }
        }
    }
});
events.listen("item.entity_interact", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].entityInteract) {
            if (global.compareTwoItems(itemList[i], event.item)) {
                itemList[i].entityInteract(event);
            }
        }
    }
});
events.listen("item.crafted", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].crafted) {
            if (global.compareTwoItems(itemList[i], event.item)) {
                itemList[i].crafted(event);
            }
        }
    }
});
events.listen("item.smelted", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].smelted) {
            if (global.compareTwoItems(itemList[i], event.item)) {
                itemList[i].smelted(event);
            }
        }
    }
});
events.listen("item.toss", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].drop) {
            if (global.compareTwoItems(itemList[i], event.item)) {
                itemList[i].drop(event);
            }
        }
    }
});
events.listen("item.pickup", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].pickup) {
            if (global.compareTwoItems(itemList[i], event.item)) {
                itemList[i].pickup(event);
            }
        }
    }
});
events.listen("item.left_click", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].leftClick) {
            if (global.compareTwoItems(itemList[i], event.item)) {
                itemList[i].leftClick(event);
            }
        }
    }
});
events.listen("item.right_click", function(event) {
    var itemList = global.customItemList;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].rightClick) {
            if (global.compareTwoItems(itemList[i], event.item)) {
                itemList[i].rightClick(event);
            }
        }
    }
});
