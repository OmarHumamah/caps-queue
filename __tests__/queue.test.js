"use strict";

const { it, expect, beforeEach, afterEach } = require("@jest/globals");
const thanksMSG = require("../vendor/1-800-flowers");
const driverHandlers = require("../driver/driver");

describe("test", () => {
  let consoleSpy;
  let payload;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
    payload = {
      orderID: "9b8a70b8-49a8-4657-ab44-be1f8201291c",
    };
  });
  afterEach(() => {
    consoleSpy= null;
  });

  it("Check vendor message handler", () => {
    thanksMSG(payload);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("Check driver In transit message", () => {
    driverHandlers.inTransit(payload);
    expect(consoleSpy).toHaveBeenCalled();

  });
  it("Check driver delivered message", () => {
    driverHandlers.delivered(payload);
    expect(consoleSpy).toHaveBeenCalled();

  });
});