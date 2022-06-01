"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RaceModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
        type: Number,
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