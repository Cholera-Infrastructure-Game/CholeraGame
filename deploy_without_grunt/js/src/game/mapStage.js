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
		this.load.image('top_bar', 'assets/images/placeholder_top_bar.png');
        
        this.load.spritesheet('village', 'assets/images/NewIcons/CitySpriteSheet.png', 128, 128);
    },

    create: function() {
		self = this;

		// This variable holds the index of the village represented in the current popup.
		// If this variable is -1 then there is currently no popup.
		this.popup_status = -1;
		// This variable must be checked by the various update routines.
		this.time_should_progress = true;

        this.game.add.sprite(0, 0, 'top_bar');
        this.game.add.sprite(0, TOP_BAR_HEIGHT, 'map');

        this.village_groups = [];
        for (i = 0; i < villages.length; i++) {
            var village_group = this.game.add.group()
            var village_sprite = this.game.add.button(VILLAGE_POSITIONS[i][0], VILLAGE_POSITIONS[i][1], 'village', function() {}, {}, 1, 0);
//            Timer(this.game, VILLAGE_POSITIONS[i][0]+50, VILLAGE_POSITIONS[i][1]+50, 40, 2000, true);
            village_sprite.village_index = i;
            village_sprite.anchor.set(0.5);
            village_sprite.inputEnabled = true;
			// Here I do some obnoxious closure crap to close over i.
			// This causes createVillagePopup to be called passing in the village.
			(function() {
				var _i = i;
				var _village_sprite = village_sprite;
	            village_sprite.events.onInputUp.add(function() {
					// Launch the pop up.
					self.createVillagePopup(_i);
					// Do a little click animation.
					var tween = self.game.add.tween(_village_sprite.scale);
					tween.to({x: 0.9, y: 0.9}, 100, Phaser.Easing.Quadratic.In);
					tween.to({x: 1.1, y: 1.1}, 100, Phaser.Easing.Quadratic.Out);
					// WARNING: Here I insert a little extra delay before the onComplete is called.
					tween.to({x: 1.1, y: 1.1}, 300, Phaser.Easing.Default);
					// Trigger a mouse out dispatch when the animation is over..
					// This fixes the issue where the popup blocks the mouse out on the selected village,
					// causing it to be permanently highlighted, until it is moused out of some time later.
					tween._lastChild.onComplete.add(function() { _village_sprite.events.onInputOut.dispatch(); });
					tween.start();
				}, self);
				// Also add a little increase in size effect on mouse over.
				village_sprite.events.onInputOver.add(function() {
					self.game.add.tween(_village_sprite.scale).to({x: 1.1, y: 1.1}, 100, Phaser.Easing.Quadratic.Out, true);
				});
				village_sprite.events.onInputOut.add(function() {
					self.game.add.tween(_village_sprite.scale).to({x: 1.0, y: 1.0}, 100, Phaser.Easing.Quadratic.In, true);
				});
			}());
            village_group.add(village_sprite);
            var text = "Village " + (i + 1);
            var style = { font: "12px Arial", fill: "#ffffff", align: "left" };
            var village_text = this.game.add.text(VILLAGE_POSITIONS[i][0] - 20, VILLAGE_POSITIONS[i][1] + 10, text, style);
            village_group.add(village_text);
            village_group.visible = false;
            this.village_groups.push(village_group);
        }

        this.createPopupMenu();
        this.createScoreBar();

		var escape_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    	escape_key.onDown.add(this.closeVillagePopup, this);
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
		this.pause_text_object = pause;
    },

	createPopupMenu: function() {
		// This function simply creates the popup menu sprite, and hides it.
		self = this;

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
		bmd.ctx.fillStyle = '#a0a0a0';
		bmd.ctx.fill();
		this.popup_sprite = this.game.add.sprite(0, 0, bmd);
		this.popup_sprite.anchor.set(0.5);

		// For convenience, get these values out.
		var w = this.popup_sprite.width;
		var h = this.popup_sprite.height;

		// Create text for the top.
		this.popup_locality_text = this.game.add.text(0, 30-h/2, "You shouldn't see this.", POPUP_TEXT_STYLE);
		// This next line causes the text to be centered properly.
		this.popup_locality_text.anchor.set(0.5);
		this.popup_sprite.addChild(this.popup_locality_text);

		// Add the little bit of text that says that the game is paused.
		var obj = this.game.add.text(w/2 - 10, 10 - h/2, "(Game paused)", POPUP_GAME_PAUSED_TEXT_STYLE);
		obj.anchor.setTo(1.0, 0.0);
		this.popup_sprite.addChild(obj);

		// Create the actions pane and description pane texts.
		function add_text(x, y, text) {
			var obj = self.game.add.text(x, y, text, POPUP_TEXT_STYLE);
			obj.anchor.set(0.5);
			self.popup_sprite.addChild(obj);
		}

		// Compute some scaling values.
		var left_column_center_x = -w/4 + 10;
		var right_column_center_x = w/4;
		add_text(left_column_center_x, 80-h/2, "Actions");
		add_text(right_column_center_x, 80-h/2, "Description");

		// Fill the actions pane with pies and actions.
		var action_spacing = 105;
		this.popup_pies = [];
		for (var i = 0; i < 4; i++) {
			// Create a pie.
			var pie = new PieProgress(this.game, left_column_center_x - 120, 200 + i * action_spacing - h/2, 40);
			this.popup_sprite.addChild(pie);
			this.popup_pies.push(pie);
			// Create the cost text below the pie.
			var cost_text = this.game.add.text(left_column_center_x - 120 - 75, 200 + i * action_spacing - h/2, ACTION_COSTS[i], POPUP_ACTION_NAME_STYLE);
			cost_text.anchor.setTo(0.5, 0.5);
			this.popup_sprite.addChild(cost_text);
			// Create the action text.
			var obj = this.game.add.text(left_column_center_x - 70, 200 + i * action_spacing - h/2, ACTION_NAMES[i], POPUP_ACTION_NAME_STYLE);
			obj.anchor.setTo(0.0, 0.5);
			obj.inputEnabled = true;
			obj.input.priorityID = 1;
			obj.input.useHandCursor = true;
			// The same silly closure trick from before.
			(function() {
				var _i = i;
				var _obj = obj;
				var _pie = pie;
				obj.events.onInputDown.add(function() {
					// TODO: Hook up to this callback.
					var result = self.buyAction(_i, self.popup_status);
					if (result == "good") {
						// If we succeeded in buying the measure then make the button pulse.
						var tween = self.game.add.tween(_obj.scale);
						tween.to({x: 1.1, y: 1.1}, 100, Phaser.Easing.Quadratic.In);
						tween.to({x: 1.3, y: 1.3}, 100, Phaser.Easing.Quadratic.Out);
						tween.start();
					} else if (result == "no-money") {
						// If we failed because we didn't have the money, then make the money indicator jiggle.
						// First make sure we're not writing over a current tween.
						if (self.game.tweens.isTweening(self.money_text_object))
							return;
						// We are going to temporarily reposition the money object, and reanchor it.
						// This is necessary because rescaling and rotations occur about the anchor.
						var new_center_x = 10 + self.money_text_object.width/2;
						var new_center_y = 10 + self.money_text_object.height/2;
						self.money_text_object.x = new_center_x;
						self.money_text_object.y = new_center_y;
						self.money_text_object.anchor.set(0.5);
						// Make the text slide a bit more down into view.
						var tween = self.game.add.tween(self.money_text_object);
						tween.to({x: new_center_x+30, y: new_center_y+22}, 100, Phaser.Easing.Quadratic.Out);
						tween.to({x: new_center_x+30, y: new_center_y+22}, 300, Phaser.Easing.Default);
						tween.to({x: new_center_x, y: new_center_y}, 100, Phaser.Easing.Quadratic.In);
						tween.start();
						// Make the text expand.
						tween = self.game.add.tween(self.money_text_object.scale);
						tween.to({x: 1.2, y: 1.2}, 100, Phaser.Easing.Quadratic.Out);
						tween.to({x: 1.2, y: 1.2}, 300, Phaser.Easing.Default);
						tween.to({x: 1.0, y: 1.0}, 100, Phaser.Easing.Quadratic.In);
						tween.start();
						// .. and rock it back and forth a few times.
						tween = self.game.add.tween(self.money_text_object);
						tween.to({angle: 0}, 50, Phaser.Easing.Default);
						tween.to({angle: 20}, 100, Phaser.Easing.Quadratic.InOut);
						tween.to({angle: -20}, 100, Phaser.Easing.Quadratic.InOut);
						tween.to({angle: 20}, 100, Phaser.Easing.Quadratic.InOut);
						tween.to({angle: -20}, 100, Phaser.Easing.Quadratic.InOut);
						tween.to({angle: 0}, 52, Phaser.Easing.Quadratic.InOut);
						tween.start();
						tween._lastChild.onComplete.add(function() {
							// Now put everything back.
							self.money_text_object.x = 10;
							self.money_text_object.y = 10;
							self.money_text_object.anchor.set(0.0);
						});
					} else if (result == "on-cooldown") {
						// Make the cooldown pie bubble up.
						var tween = self.game.add.tween(_pie.scale);
						tween.to({x: 1.2, y: 1.2}, 200, Phaser.Easing.Quadratic.Out);
						tween.to({x: 1.0, y: 1.0}, 200, Phaser.Easing.Quadratic.In);
						tween.start();
					}
				});
				obj.events.onInputOver.add(function() {
					self.game.add.tween(_obj.scale).to({x: 1.3, y: 1.3}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
					// On mouse over we set the description box text appropriately.
					self.setDescriptionBoxTexts(_i);
				});
				obj.events.onInputOut.add(function() {
					self.game.tween
					self.game.add.tween(_obj.scale).to({x: 1.0, y: 1.0}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
				});
			}());
			this.popup_sprite.addChild(obj);
		}

		// Render the descriptions pane.
		// Crucial: Remember that these are coordinates for the bitmapData, so (0, 0) is the UL corner, not the middle.
		var corner_radius = 20;
		var desc_width = 400;
		var desc_height = 400;
		var desc_box_top_y = 160;
		bmd.ctx.beginPath();
		// Change coordinates so that (0, 0) is the upper left corner of the box we are drawing.
		bmd.ctx.translate(right_column_center_x + w/2 - desc_width/2, desc_box_top_y);
		bmd.ctx.moveTo(corner_radius, 0);
		bmd.ctx.arcTo(desc_width, 0, desc_width, corner_radius, corner_radius);
		bmd.ctx.arcTo(desc_width, desc_height, desc_width - corner_radius, desc_height, corner_radius);
		bmd.ctx.arcTo(0, desc_height, 0, desc_height - corner_radius, corner_radius);
		bmd.ctx.arcTo(0, 0, corner_radius, 0, corner_radius);
		bmd.ctx.closePath();
		bmd.ctx.strokeStyle = "#000";
		bmd.ctx.lineWidth = 2;
		bmd.ctx.stroke();
		// Reset the transform, in case we want to do more drawing later.
		bmd.ctx.setTransform(1, 0, 0, 1, 0, 0);

		// Put a text objects in the description box.
		var margin = 20;
		var clearance = 30;
		// First, the title of the action.
		var obj = this.game.add.text(right_column_center_x - desc_width/2 + margin, desc_box_top_y - h/2 + margin, "Foobar.", POPUP_DESC_HEADER_STYLE);
		this.popup_description_title_object = obj;
		this.popup_sprite.addChild(obj);
		// Then the cost of the action.
		obj = this.game.add.text(right_column_center_x + desc_width/2 - margin, desc_box_top_y - h/2 + margin, "123", POPUP_DESC_HEADER_STYLE);
		obj.anchor.setTo(1.0, 0.0);
		this.popup_description_cost_object = obj;
		this.popup_sprite.addChild(obj);
		// We will later modify its text to set the description.
		obj = this.game.add.text(right_column_center_x - desc_width/2 + margin, desc_box_top_y - h/2 + margin + clearance, "", POPUP_DESC_STYLE);
		obj.wordWrap = true;
		obj.wordWrapWidth = desc_width - margin*2;
		this.popup_description_text_object = obj;
		this.popup_sprite.addChild(obj);

		// Create the close button.
		var button = this.game.add.text(0, this.popup_sprite.height * 0.4, "Return to map", POPUP_TEXT_STYLE);
		button.anchor.set(0.5);
		button.inputEnabled = true;
		button.input.priorityID = 1;
		button.input.useHandCursor = true;
		button.events.onInputUp.add(this.closeVillagePopup, this);
		// Add handlers to make it pop up in size a little.
		button.events.onInputOver.add(function() {
			self.game.add.tween(button.scale).to({x: 1.3, y: 1.3}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
		});
		button.events.onInputOut.add(function() {
			self.game.add.tween(button.scale).to({x: 1.0, y: 1.0}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
		});
		console.log(this.popup_sprite.body);
		this.popup_return_button = button;
		this.popup_sprite.addChild(button);

		// Initially the popup is hidden.
		this.fullyHidePopup();
	},

	setDescriptionBoxTexts: function(action_index) {
		if (action_index == -1) {
			// In case of the special index -1, we clear all the texts.
			self.popup_description_title_object.text = "";
			self.popup_description_cost_object.text = "";
			self.popup_description_text_object.text = "";
		} else {
			// Otherwise, populate them appropriately.
			self.popup_description_title_object.text = ACTION_NAMES[action_index];
			self.popup_description_cost_object.text = ACTION_COSTS[action_index];
			self.popup_description_text_object.text = ACTION_DESCRIPTIONS[action_index];
		}
	},

	buyAction: function(action_index, village_index) {
		// This is the crucial callback, called when the user attempts to buy something.
		console.log("Triggering action number " + action_index + " on village number " + village_index);
		// Just for convenience of experimenetation action 2 always fails due to being on cooldown.
		if (action_index == 2)
			return "on-cooldown";
		// Don't let the player buy things they can't afford.
		if (game_state.money < ACTION_COSTS[action_index])
			return "no-money";
		// TODO: Actually update game_state to account for the fact that we just bought something.
		game_state.money -= ACTION_COSTS[action_index];
		return "good";
	},

	fullyHidePopup: function() {
		// Somewhat crummy solution, but simply moving the popup out of the way works.
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
		// Pause all action.
		this.time_should_progress = false;
		// Update the popup with appropriate information.
		this.popup_locality_text.text = "Locality: " + (selected_village_index + 1);
		// Clear all the description box texts.
		this.setDescriptionBoxTexts(-1);
		// Update the pies. For now I use random data.
		for (var i = 0; i < 4; i++) {
			var pie = this.popup_pies[i];
			pie.progress = Math.random();
		}
		// Shrink the popup down, preparing to grow it up later.
		this.popup_sprite.scale.set(0.0);
		// Place the popup directly over the village.
		var pos = VILLAGE_POSITIONS[selected_village_index];
		this.popup_sprite.x = pos[0];
		this.popup_sprite.y = pos[1];
		// Then make it tween into position and size.
        this.game.add.tween(this.popup_sprite).to({x: GAME_WIDTH/2, y: GAME_HEIGHT/2 + TOP_BAR_HEIGHT/2}, POPUP_TIME, Phaser.Easing.Quadratic.In, true);
        var tween = this.game.add.tween(this.popup_sprite.scale);
		tween.to({x: 1.0, y: 1.0}, POPUP_TIME, Phaser.Easing.Quartic.In, true);
		// Only when the tweening is finished do we consider the popup to be truly open.
		tween.onComplete.add(function() {
			this.popup_status = selected_village_index;
			// Even though we won't be listening for it, enable input just to block it for everything under the popup.
			this.popup_sprite.inputEnabled = true;
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
			// Resume all action.
			this.time_should_progress = true;
			this.popup_sprite.inputEnabled = false;
		}, this);
	},

}
