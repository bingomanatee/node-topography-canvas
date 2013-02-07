var _mixins = require('./lib/mixins');
var _ = require('underscore');
var topo = require('node-topography');
var Gate = require('gate');

function TopoGrid(mixins, config, cb) {
	if (!mixins) {
		mixins = {};
	}

	_.extend(mixins, _mixins);

	return topo.TopoGrid(mixins, config, cb);
}

var exp = _.clone(topo);

exp.TopoGrid = TopoGrid;

exp.image_file_topos = function (image_files, cb) {
	var gate = Gate.create();

	var TopoGrid = module.exports.TopoGrid;

	_.each(image_files, function (file) {
		TopoGrid({}, {source: file, source_type: 'image_file'}, gate.latch());
	});

	gate.await(function (err, topo_grids) {
		cb(null, _.reduce(_.values(topo_grids),
			function (out, props) {
				if (props[0]) throw props[0];
				out.push(props[1]);
				return out;
			}, []));
	});
}

module.exports = exp;