var Canvas = require('canvas');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var _DEBUG = false;

module.exports = {

	draw: require('./draw'),

	digest_image: function (image, cb) {
		if (_DEBUG) console.log('image size: %s, %s', image.width, image.height);
		var img_canvas = new Canvas(image.width, image.height);
		img_canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
		this.canvas_to_data(img_canvas);
		if (cb) cb();
	},

	digest_image_file: function (file, cb) {
		var self = this;
		fs.readFile(file, function (err, cityhouse) {
			if (err) throw err;

			var image = new Canvas.Image();
			image.src = cityhouse;
			self.digest_image(image);
			if (cb) cb();
		});
	},

	digest_canvas: function (canvas, cb) {
		//	console.log('digesting canvas');
		if (canvas) {
			this.set_config('source', canvas);
		} else {
			canvas = this.get_config('source');
			this.canvas_to_data(canvas);
		}

		if (!canvas) {
			return cb(new Error('no source'));
		}

		if (cb) cb();
	},

	canvas_to_data: function (canvas) {
		this._width = canvas.width;
		this._height = canvas.height;
		var image_data = canvas.getContext('2d').getImageData(0, 0, this._width, this._height).data;
		// console.log('image data: %s', util.inspect(image_data).substring(0, 100));

		this.data = _.reduce(image_data, function (out, value, i) {
			var target_index = Math.floor(i / 4);
			var channel = i % 4;

			if (channel == 0) {
				out[target_index] = [value];
			} else {
				out[target_index].push(value);
			}
			return out;

		}, []);

	},

	data_to_canvas: function (canvas) {
		this._width = canvas.width;
		this._height = canvas.height;
		var image_data = canvas.getContext('2d').getImageData(0, 0, this._width, this._height).data;
		// console.log('image data: %s', util.inspect(image_data).substring(0, 100));
		var flat_data = _.flatten(this.data);
		_.each(image_data, function(v, i){
			image_data[i] = flat_dat[i];
		}, this);

	}


}