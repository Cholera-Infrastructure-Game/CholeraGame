//Takes in game object, x y coords, radius, duration in ms and bool for whether the circle shrinks or grows
//returns the tween circle object
//TODO: Look into onComplete function in tweening? might be able to fire an event; could be useful
Timer = function(game, x, y, r, t, countdown) {
    var pie = new PieProgress(game, x, y, r);
    var pieSprite = game.world.add(pie);
    if (countdown) {
        pie.progress = 1;
        var pieTween = game.add.tween(pie).to({progress: 0}, t, null, true, 0, Infinity, true);
    }
    else {
        pie.progress = 0;
        var pieTween = game.add.tween(pie).to({progress: 1}, t, null, true, 0, Infinity, true);
    }
    
    //pieTween.onLoop.add(function() {console.log(x+y)})
    
    return {
        pauseTimer: function() {
            pieTween.pause();
        },
        visibleTimer: function(isVisible) {
            pieSprite.exists = isVisible;
        }
    };
}

var PieProgress = function(game, x, y, radius, color, angle) {
    this._radius = radius;
    this._progress = 1;
    this.bmp = game.add.bitmapData(radius * 2, radius * 2);
    Phaser.Sprite.call(this, game, x, y, this.bmp);
    
    this.anchor.set(0.5);
    this.angle = angle || -90;
    this.color = color || "#fff";
    this.alpha = 0.6
    this.updateProgress();
}

PieProgress.prototype = Object.create(Phaser.Sprite.prototype);
PieProgress.prototype.constructor = PieProgress;

PieProgress.prototype.updateProgress = function() {
    var progress = this._progress;
    progress = Phaser.Math.clamp(progress, 0.00001, 0.99999);
    
    this.bmp.clear();
    this.bmp.ctx.fillStyle = this.color;
    this.bmp.ctx.beginPath();
    this.bmp.ctx.arc(this._radius, this._radius, this._radius, 0, (Math.PI * 2) * progress, true);
    this.bmp.ctx.lineTo(this._radius, this._radius);
    this.bmp.ctx.closePath();
    this.bmp.ctx.fill();
    this.bmp.dirty = true; 
}

Object.defineProperty(PieProgress.prototype, 'radius', {
    get: function() {
        return this._radius;   
    },
    set: function(val) {
        this._radius = (val > 0 ? val : 0);
        this.bmp.resize(this._radius * 2, this._radius * 2);
        this.updateProgress();
    }
});

Object.defineProperty(PieProgress.prototype, 'progress', {
    get: function() {
        return this._progress;   
    },
    set: function(val) {
        this._progress = Phaser.Math.clamp(val, 0, 1);
        this.updateProgress();
    }
});