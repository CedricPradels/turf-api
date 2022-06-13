import mongoose from "mongoose";
import {
  object,
  string,
  date,
  StringSchema,
  array,
  boolean,
  number,
} from "yup";

export const DBRaceSchema = object({
  date: date(),
  race: object({
    number: string(),
    name: string(),
  }),
  meeting: object({
    number: string(),
    name: string(),
  }),
  history: array(
    object({
      number: string(),
      name: string(),
      history: array(
        object({
          race: object({
            number: string(),
            name: string(),
          }),
          meeting: object({
            number: string(),
            name: string(),
          }),
          results: array(
            object({
              isOut: boolean(),
              name: string(),
              position: number(),
            })
          ),
        })
      ),
    })
  ),
});

export interface DBRace {
  partants: {
    number: string;
    name: string;
    history: {
      date: Date;
      meeting: {
        number: string;
        name: string;
      };
      race: {
        number: string;
        name: string;
      };
      results: { isOut: boolean; name: string; position: number }[];
    }[];
  }[];
  date: Date;
  meeting: {
    number: string;
    name: string;
  };
  race: {
    number: string;
    name: string;
  };
}

const RaceSchema = new mongoose.Schema<DBRace>({
  date: { type: Date, required: true },
  meeting: {
    type: {
      number: { type: String, required: true },
      name: { type: String, required: true },
    },
    required: true,
  },
  race: {
    type: {
      number: { type: String, required: true },
      name: { type: String, required: true },
    },
    required: true,
  },
  partants: {
    type: [
      {
        number: { type: Number, required: true },
        name: { type: String, required: true },
        history: {
          type: [
            {
              date: { type: Date, required: true },
              meeting: {
                type: {
                  number: { type: String, required: true },
                  name: { type: String, required: true },
                },
                required: true,
              },
              race: {
                type: {
                  number: { type: String, required: true },
                  name: { type: String, required: true },
                },
                required: true,
              },
              results: {
                type: [
                  {
                    name: { type: String, required: true },
                    position: { type: Number, required: true },
                    isOut: { type: Boolean, required: true },
                  },
                ],
                required: true,
              },
            },
          ],
          required: true,
        },
      },
    ],
    required: true,
  },
});

export const RaceModel = mongoose.model<DBRace>("Race", RaceSchema);
