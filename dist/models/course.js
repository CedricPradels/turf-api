"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RaceModel = exports.DBRaceSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _yup = require("yup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DBRaceSchema = (0, _yup.object)({
  date: (0, _yup.date)(),
  race: (0, _yup.object)({
    number: (0, _yup.string)(),
    name: (0, _yup.string)()
  }),
  meeting: (0, _yup.object)({
    number: (0, _yup.string)(),
    name: (0, _yup.string)()
  }),
  history: (0, _yup.array)((0, _yup.object)({
    number: (0, _yup.string)(),
    name: (0, _yup.string)(),
    history: (0, _yup.array)((0, _yup.object)({
      race: (0, _yup.object)({
        number: (0, _yup.string)(),
        name: (0, _yup.string)()
      }),
      meeting: (0, _yup.object)({
        number: (0, _yup.string)(),
        name: (0, _yup.string)()
      }),
      results: (0, _yup.array)((0, _yup.object)({
        isOut: (0, _yup["boolean"])(),
        name: (0, _yup.string)(),
        position: (0, _yup.number)()
      }))
    }))
  }))
});
exports.DBRaceSchema = DBRaceSchema;
var RaceSchema = new _mongoose["default"].Schema({
  date: {
    type: Date,
    required: true
  },
  meeting: {
    type: {
      number: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    required: true
  },
  race: {
    type: {
      number: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    required: true
  },
  partants: {
    type: [{
      number: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      history: {
        type: [{
          date: {
            type: Date,
            required: true
          },
          meeting: {
            type: {
              number: {
                type: String,
                required: true
              },
              name: {
                type: String,
                required: true
              }
            },
            required: true
          },
          race: {
            type: {
              number: {
                type: String,
                required: true
              },
              name: {
                type: String,
                required: true
              }
            },
            required: true
          },
          results: {
            type: [{
              name: {
                type: String,
                required: true
              },
              position: {
                type: Number,
                required: true
              },
              isOut: {
                type: Boolean,
                required: true
              }
            }],
            required: true
          }
        }],
        required: true
      }
    }],
    required: true
  }
});

var RaceModel = _mongoose["default"].model("Race", RaceSchema);

exports.RaceModel = RaceModel;