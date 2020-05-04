import { INTERNAL_SERVER_ERROR } from "../constants/statusCodes";

const INTERNAL_SERVER_ERROR_TEXT = "Internal server error";

type ErrorStruct = {
  code: number;
  message: string;
};

export function conditionalError (predicateError: Error, dynamicError: number): ErrorStruct {
  return {
    code: !!predicateError ? dynamicError : INTERNAL_SERVER_ERROR,
    message:  !!predicateError ? predicateError.message : INTERNAL_SERVER_ERROR_TEXT
  };
}