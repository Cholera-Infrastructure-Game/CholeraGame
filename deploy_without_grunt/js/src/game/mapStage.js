var MapStage = function (game) {
    this.money_text_object;
    this.time_text_object;
    this.village_groups;
};

MapStage.prototype = {
	init: function() {
        var game_state = new GameState();
    },

    preload: function() {
        this.load.image('health0','assets/images/health_bar0.png');
        this.load.image('health1','assets/images/health_bar1.png');
        this.load.image('health2','assets/images/health_bar2.png');
        this.load.image('health3','assets/images/health_bar3.png');
        this.load.image('health4','assets/images/health_bar4.png');
        this.load.image('health5','assets/images/health_bar5.png');
        this.load.image('health_back','assets/images/health_bar_background.png');
        this.load.image('map', 'assets/images/NewMap.png');//Need to rearrange villages for NewMap
        this.load.image('boil', 'assets/images/NewIcons/BoilingWaterIcon.png');
        this.load.image('soap', 'assets/images/NewIcons/SoapIcon.png');
        this.load.image('container', 'assets/images/NewIcons/WaterContainerIcon.png');
		this.load.image('homeBackground', 'assets/images/background.png');
        
        this.load.spritesheet('village', 'assets/images/NewIcons/CitySpriteSheet.png', 128, 128);
    },

    create: function() {
		self = this;

		// This variable holds the index of the village represented in the current popup.
		// If this variable is -1 then there is currently no popup.
		this.popup_status = -1;
		// This variable must be checked by the various update routines.
		this.time_should_progress = true;

//        this.game.add.sprite(0, 0, 'homeBackground');
        this.game.add.sprite(0, TOP_BAR_HEIGHT, 'map');

        this.village_groups = [];
        for (i = 0; i < villages.length; i++) {
            var village_group = this.game.add.group()
            var village_sprite = this.game.add.button(VILLAGE_POSITIONS[i][0], VILLAGE_POSITIONS[i][1], 'village', this.createPauseMenu, this, 1, 0);
//            Timer(this.game, VILLAGE_POSITIONS[i][0]+50, VILLAGE_POSITIONS[i][1]+50, 40, 2000, true);
			// Add a little pie progress.
//			PieProgress(this.game, VILLAGE_POSITIONS[i][0]
            village_sprite.village_index = i;
            village_sprite.anchor.set(0.5);
            village_sprite.inputEnabled = true;
			// Here I do some obnoxious closure crap to close over i.
			// This causes createVillagePopup to be called passing in the village.
			(function() {
				var _i = i;
	            village_sprite.events.onInputUp.add(function() {
					self.createVillagePopup(_i);
				}, self);
			}());
            village_group.add(village_sprite);
            var text = "Village " + (i + 1);
            var style = { font: "12px Arial", fill: "#ffffff", align: "left" };
            var village_text = this.game.add.text(VILLAGE_POSITIONS[i][0] - 20, VILLAGE_POSITIONS[i][1] + 10, text, style);
            village_group.add(village_text);
            village_group.visible = false;
            this.village_groups.push(village_group);
        }

        this.createScoreBar();
        this.createPopupMenu();
    },

    update: function() {
        this.money_text_object.text = "Money: " + game_state.money;
        this.time_text_object.text = "Day: " + game_state.day;

        for (var i = 0; i < game_state.available_villages; i++) {
            this.village_groups[i].visible = true;
        }
    },

    createScoreBar: function() {
        var money_text = "Money: " + game_state.money;
        this.money_text_object = this.game.add.text(10, 10, money_text, SCORE_BAR_STYLE);

        var time_text = "Day: " + game_state.day;
        this.time_text_object = this.game.add.text(300, 10, time_text, SCORE_BAR_STYLE);

        var pause = this.game.add.text(this.game.world.width - 300, 10, "PAUSE", SCORE_BAR_STYLE);
        pause.inputEnabled = true;
        pause.events.onInputUp.add(this.createPauseMenu, this);
    },

	createPopupMenu: function() {
		// This function simply creates the popup menu sprite, and hides it.

		// Create the background sprite.
		// All the other sprites are children of this one.
		var bmd = this.game.add.bitmapData(GAME_WIDTH, GAME_HEIGHT - TOP_BAR_HEIGHT);
		// Fill entirely with black
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT - TOP_BAR_HEIGHT);
		bmd.ctx.fillStyle = '#000000';
		bmd.ctx.fill();
		// Fill the center with gray, leaving 2px of margin on all sides.
		bmd.ctx.beginPath();
		bmd.ctx.rect(2, 2, GAME_WIDTH - 4, GAME_HEIGHT - TOP_BAR_HEIGHT - 4);
		bmd.ctx.fillStyle = '#808080';
		bmd.ctx.fill();
		this.popup_sprite = this.game.add.sprite(0, 0, bmd);
		this.popup_sprite.anchor.set(0.5);

		// Create text for the top.
		this.popup_locality_text = this.game.add.text(0, 20-this.popup_sprite.height/2, "You shouldn't see this.", POPUP_TEXT_STYLE);
		// This next line causes the text to be centered properly.
		this.popup_locality_text.anchor.set(0.5);
		this.popup_sprite.addChild(this.popup_locality_text);

		// Create the actions pane and description pane texts.
		this.popup_sprite.addChild(this.game.add.text(-this.popup_sprite.width/4, 80-this.popup_sprite.height/2, "Actions", POPUP_TEXT_STYLE));
		this.popup_sprite.addChild(this.game.add.text(this.popup_sprite.width/4, 80-this.popup_sprite.height/2, "Description", POPUP_TEXT_STYLE));

		// Create the close button.
		var button = this.game.make.sprite(0, this.popup_sprite.height/3, "soap");
		button.anchor.set(0.5);
		button.inputEnabled = true;
		button.input.priorityID = 1;
		button.input.useHandCursor = true;
		button.events.onInputUp.add(this.closeVillagePopup, this);
		this.popup_sprite.addChild(button);

		// Create 

		this.fullyHidePopup();
	},

	fullyHidePopup: function() {
		this.popup_sprite.x = -1000;
		this.popup_sprite.y = -1000;
	},


    createPauseMenu: function() {
        // TODO: Make pause menu
        console.log("TODO: need to make pause menu");
        return;
    },

    createVillagePopup: function(selected_village_index) {
		console.log("Creating popup for: " + selected_village_index);
		// Make sure no pop-up is currently open.
		// This SHOULD never happen, but let's just be really careful.
		if (this.popup_status != -1) {
			console.log("WARNING: Call to createVillagePopup while popup was open!");
			return;
		}
		// Popuplate the popup with appropriate information.
		this.popup_locality_text.text = "Locality: " + (selected_village_index + 1);
		this.time_should_progress = false;

		// Shrink the popup down, preparing to grow it up later.
		this.popup_sprite.scale.set(0.0);
		// Place the popup directly over the village.
		var pos = VILLAGE_POSITIONS[selected_village_index];
		this.popup_sprite.x = pos[0];
		this.popup_sprite.y = pos[1];
		// Then make it tween into position and size.
        this.game.add.tween(this.popup_sprite).to({x: GAME_WIDTH/2, y: GAME_HEIGHT/2 + TOP_BAR_HEIGHT/2}, 500, Phaser.Easing.Quadratic.In, true);
        var tween = this.game.add.tween(this.popup_sprite.scale);
		tween.to({x: 1.0, y: 1.0}, 500, Phaser.Easing.Quartic.In, true);
		// Only when the tweening is finished do we consider the popup to be truly open.
		tween.onComplete.add(function() {
			this.popup_status = selected_village_index;
		}, this);
    },

	closeVillagePopup: function() {
		console.log("Closing popup.");
		// Make sure that a popup is actually open.
		if (this.popup_status == -1) {
			console.log("WARNING: Call to closeVillagePopup while no popup was open!");
			return;
		}
		// Tween the popup away.
		var pos = VILLAGE_POSITIONS[this.popup_status];
        this.game.add.tween(this.popup_sprite).to({x: pos[0], y: pos[1]}, 300, Phaser.Easing.Default, true);
        var tween = this.game.add.tween(this.popup_sprite.scale);
		// It's deeply unfortunate, but it appears that a sprite with scale 0.0 is considered everywhere for input.
		// Therefore, to work around this behavior we merely scale the popup window very very small.
		// Then, when the tween is finished, we'll fully hide it by moving it away.
		tween.to({x: 0.001, y: 0.001}, 300, Phaser.Easing.Default, true);
		tween.onComplete.add(function() {
			this.fullyHidePopup();
			this.popup_status = -1;
			this.time_should_progress = true;
		}, this);
	}
}

