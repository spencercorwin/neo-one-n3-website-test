self["webpackChunk"]([0],{

/***/ "./common/temp/node_modules/@ledgerhq/devices/lib/hid-framing.js":
/*!***********************************************************************!*\
  !*** ./common/temp/node_modules/@ledgerhq/devices/lib/hid-framing.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errors = __webpack_require__(/*! @ledgerhq/errors */ "./common/temp/node_modules/@ledgerhq/errors/lib/index.js");

var Tag = 0x05;

function asUInt16BE(value) {
  var b = Buffer.alloc(2);
  b.writeUInt16BE(value, 0);
  return b;
}

var initialAcc = {
  data: Buffer.alloc(0),
  dataLength: 0,
  sequence: 0
};

/**
 *
 */
var createHIDframing = function createHIDframing(channel, packetSize) {
  return {
    makeBlocks: function makeBlocks(apdu) {
      var data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
      var blockSize = packetSize - 5;
      var nbBlocks = Math.ceil(data.length / blockSize);
      data = Buffer.concat([data, // fill data with padding
      Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0)]);

      var blocks = [];
      for (var i = 0; i < nbBlocks; i++) {
        var head = Buffer.alloc(5);
        head.writeUInt16BE(channel, 0);
        head.writeUInt8(Tag, 2);
        head.writeUInt16BE(i, 3);
        var chunk = data.slice(i * blockSize, (i + 1) * blockSize);
        blocks.push(Buffer.concat([head, chunk]));
      }
      return blocks;
    },
    reduceResponse: function reduceResponse(acc, chunk) {
      var _ref = acc || initialAcc,
          data = _ref.data,
          dataLength = _ref.dataLength,
          sequence = _ref.sequence;

      if (chunk.readUInt16BE(0) !== channel) {
        throw new _errors.TransportError("Invalid channel", "InvalidChannel");
      }
      if (chunk.readUInt8(2) !== Tag) {
        throw new _errors.TransportError("Invalid tag", "InvalidTag");
      }
      if (chunk.readUInt16BE(3) !== sequence) {
        throw new _errors.TransportError("Invalid sequence", "InvalidSequence");
      }

      if (!acc) {
        dataLength = chunk.readUInt16BE(5);
      }
      sequence++;
      var chunkData = chunk.slice(acc ? 5 : 7);
      data = Buffer.concat([data, chunkData]);
      if (data.length > dataLength) {
        data = data.slice(0, dataLength);
      }

      return {
        data: data,
        dataLength: dataLength,
        sequence: sequence
      };
    },
    getReducedResult: function getReducedResult(acc) {
      if (acc && acc.dataLength === acc.data.length) {
        return acc.data;
      }
    }
  };
};

exports.default = createHIDframing;
//# sourceMappingURL=hid-framing.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node-libs-browser/node_modules/buffer/index.js */ "./common/temp/node_modules/node-libs-browser/node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./common/temp/node_modules/@ledgerhq/devices/lib/index.js":
/*!*****************************************************************!*\
  !*** ./common/temp/node_modules/@ledgerhq/devices/lib/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * The USB product IDs will be defined as MMII, encoding a model (MM) and an interface bitfield (II)
 *
 ** Model
 * Ledger Nano S : 0x10
 * Ledger Blue : 0x00
 * Ledger Nano X : 0x40
 *
 ** Interface support bitfield
 * Generic HID : 0x01
 * Keyboard HID : 0x02
 * U2F : 0x04
 * CCID : 0x08
 * WebUSB : 0x10
 */

var IIGenericHID = exports.IIGenericHID = 0x01;
var IIKeyboardHID = exports.IIKeyboardHID = 0x02;
var IIU2F = exports.IIU2F = 0x04;
var IICCID = exports.IICCID = 0x08;
var IIWebUSB = exports.IIWebUSB = 0x10;

var devices = {
  blue: {
    id: "blue",
    productName: "Ledger Blue",
    productIdMM: 0x00,
    legacyUsbProductId: 0x0000,
    usbOnly: true,
    memorySize: 480 * 1024,
    blockSize: 4 * 1024
  },
  nanoS: {
    id: "nanoS",
    productName: "Ledger Nano S",
    productIdMM: 0x10,
    legacyUsbProductId: 0x0001,
    usbOnly: true,
    memorySize: 320 * 1024,
    blockSize: 4 * 1024
  },
  nanoX: {
    id: "nanoX",
    productName: "Ledger Nano X",
    productIdMM: 0x40,
    legacyUsbProductId: 0x0004,
    usbOnly: false,
    memorySize: 2 * 1024 * 1024,
    blockSize: 4 * 1024,
    bluetoothSpec: [{
      // this is the legacy one (prototype version). we will eventually drop it.
      serviceUuid: "d973f2e0-b19e-11e2-9e96-0800200c9a66",
      notifyUuid: "d973f2e1-b19e-11e2-9e96-0800200c9a66",
      writeUuid: "d973f2e2-b19e-11e2-9e96-0800200c9a66"
    }, {
      serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
      notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
      writeUuid: "13d63400-2c97-0004-0002-4c6564676572"
    }]
  }
};

var productMap = {
  Blue: "blue",
  "Nano S": "nanoS",
  "Nano X": "nanoX"
};

// $FlowFixMe
var devicesList = Object.values(devices);

/**
 *
 */
var ledgerUSBVendorId = exports.ledgerUSBVendorId = 0x2c97;

/**
 *
 */
var getDeviceModel = exports.getDeviceModel = function getDeviceModel(id) {
  var info = devices[id];
  if (!info) throw new Error("device '" + id + "' does not exist");
  return info;
};

/**
 *
 */
var identifyUSBProductId = exports.identifyUSBProductId = function identifyUSBProductId(usbProductId) {
  var legacy = devicesList.find(function (d) {
    return d.legacyUsbProductId === usbProductId;
  });
  if (legacy) return legacy;

  var mm = usbProductId >> 8;
  var deviceModel = devicesList.find(function (d) {
    return d.productIdMM === mm;
  });
  return deviceModel;
};

var identifyProductName = exports.identifyProductName = function identifyProductName(productName) {
  var productId = productMap[productName];
  var deviceModel = devicesList.find(function (d) {
    return d.id === productId;
  });

  return deviceModel;
};

var bluetoothServices = [];
var serviceUuidToInfos = {};

for (var _id in devices) {
  var _deviceModel = devices[_id];
  var _bluetoothSpec = _deviceModel.bluetoothSpec;

  if (_bluetoothSpec) {
    for (var i = 0; i < _bluetoothSpec.length; i++) {
      var spec = _bluetoothSpec[i];
      bluetoothServices.push(spec.serviceUuid);
      serviceUuidToInfos[spec.serviceUuid] = serviceUuidToInfos[spec.serviceUuid.replace(/-/g, "")] = _extends({ deviceModel: _deviceModel }, spec);
    }
  }
}

/**
 *
 */
var getBluetoothServiceUuids = exports.getBluetoothServiceUuids = function getBluetoothServiceUuids() {
  return bluetoothServices;
};

/**
 *
 */
var getInfosForServiceUuid = exports.getInfosForServiceUuid = function getInfosForServiceUuid(uuid) {
  return serviceUuidToInfos[uuid.toLowerCase()];
};

/**
 *
 */


/**
 *
 */


/**
 *
 */
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./common/temp/node_modules/@ledgerhq/errors/lib/helpers.js":
/*!******************************************************************!*\
  !*** ./common/temp/node_modules/@ledgerhq/errors/lib/helpers.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */

var errorClasses = {};
var deserializers = {};

var addCustomErrorDeserializer = exports.addCustomErrorDeserializer = function addCustomErrorDeserializer(name, deserializer) {
  deserializers[name] = deserializer;
};

var createCustomErrorClass = exports.createCustomErrorClass = function createCustomErrorClass(name) {
  var C = function CustomError(message, fields) {
    Object.assign(this, fields);
    this.name = name;
    this.message = message || name;
    this.stack = new Error().stack;
  };
  // $FlowFixMe
  C.prototype = new Error();

  errorClasses[name] = C;
  // $FlowFixMe we can't easily type a subset of Error for now...
  return C;
};

// inspired from https://github.com/programble/errio/blob/master/index.js
var deserializeError = exports.deserializeError = function deserializeError(object) {
  if ((typeof object === "undefined" ? "undefined" : _typeof(object)) === "object" && object) {
    try {
      // $FlowFixMe FIXME HACK
      var msg = JSON.parse(object.message);
      if (msg.message && msg.name) {
        object = msg;
      }
    } catch (e) {
      // nothing
    }

    var error = void 0;
    if (typeof object.name === "string") {
      var _object = object,
          name = _object.name;

      var des = deserializers[name];
      if (des) {
        error = des(object);
      } else {
        var _constructor = name === "Error" ? Error : errorClasses[name];

        if (!_constructor) {
          console.warn("deserializing an unknown class '" + name + "'");
          _constructor = createCustomErrorClass(name);
        }

        error = Object.create(_constructor.prototype);
        try {
          for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
              error[prop] = object[prop];
            }
          }
        } catch (e) {
          // sometimes setting a property can fail (e.g. .name)
        }
      }
    } else {
      error = new Error(object.message);
    }

    if (!error.stack && Error.captureStackTrace) {
      Error.captureStackTrace(error, deserializeError);
    }
    return error;
  }
  return new Error(String(object));
};

// inspired from https://github.com/sindresorhus/serialize-error/blob/master/index.js
var serializeError = exports.serializeError = function serializeError(value) {
  if (!value) return value;
  if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
    return destroyCircular(value, []);
  }
  if (typeof value === "function") {
    return "[Function: " + (value.name || "anonymous") + "]";
  }
  return value;
};

// https://www.npmjs.com/package/destroy-circular
function destroyCircular(from, seen) {
  var to = {};
  seen.push(from);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var value = from[key];
      if (typeof value === "function") {
        continue;
      }
      if (!value || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object") {
        to[key] = value;
        continue;
      }
      if (seen.indexOf(from[key]) === -1) {
        to[key] = destroyCircular(from[key], seen.slice(0));
        continue;
      }
      to[key] = "[Circular]";
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (typeof from.name === "string") {
    to.name = from.name;
  }
  if (typeof from.message === "string") {
    to.message = from.message;
  }
  if (typeof from.stack === "string") {
    to.stack = from.stack;
  }
  return to;
}
//# sourceMappingURL=helpers.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node-libs-browser/mock/console.js */ "./common/temp/node_modules/node-libs-browser/mock/console.js")))

/***/ }),

/***/ "./common/temp/node_modules/@ledgerhq/errors/lib/index.js":
/*!****************************************************************!*\
  !*** ./common/temp/node_modules/@ledgerhq/errors/lib/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusCodes = exports.DBNotReset = exports.DBWrongPassword = exports.NoDBPathGiven = exports.FirmwareOrAppUpdateRequired = exports.LedgerAPI5xx = exports.LedgerAPI4xx = exports.GenuineCheckFailed = exports.PairingFailed = exports.SyncError = exports.FeeTooHigh = exports.FeeRequired = exports.FeeNotLoaded = exports.CantScanQRCode = exports.ETHAddressNonEIP = exports.WrongAppForCurrency = exports.WrongDeviceForAccount = exports.WebsocketConnectionFailed = exports.WebsocketConnectionError = exports.DeviceShouldStayInApp = exports.TransportWebUSBGestureRequired = exports.TransportInterfaceNotAvailable = exports.TransportOpenUserCancelled = exports.UserRefusedOnDevice = exports.UserRefusedAllowManager = exports.UserRefusedFirmwareUpdate = exports.UserRefusedAddress = exports.UserRefusedDeviceNameChange = exports.UpdateYourApp = exports.UnavailableTezosOriginatedAccountSend = exports.UnavailableTezosOriginatedAccountReceive = exports.RecipientRequired = exports.MCUNotGenuineToDashboard = exports.UnexpectedBootloader = exports.TimeoutTagged = exports.RecommendUndelegation = exports.RecommendSubAccountsToEmpty = exports.PasswordIncorrectError = exports.PasswordsDontMatchError = exports.GasLessThanEstimate = exports.NotSupportedLegacyAddress = exports.NotEnoughGas = exports.NoAccessToCamera = exports.NotEnoughBalanceBecauseDestinationNotCreated = exports.NotEnoughSpendableBalance = exports.NotEnoughBalanceInParentAccount = exports.NotEnoughBalanceToDelegate = exports.NotEnoughBalance = exports.NoAddressesFound = exports.NetworkDown = exports.ManagerUninstallBTCDep = exports.ManagerNotEnoughSpaceError = exports.ManagerFirmwareNotEnoughSpaceError = exports.ManagerDeviceLockedError = exports.ManagerAppDepUninstallRequired = exports.ManagerAppDepInstallRequired = exports.ManagerAppRelyOnBTCError = exports.ManagerAppAlreadyInstalledError = exports.LedgerAPINotAvailable = exports.LedgerAPIErrorWithMessage = exports.LedgerAPIError = exports.UnknownMCU = exports.LatestMCUInstalledError = exports.InvalidAddressBecauseDestinationIsAlsoSource = exports.InvalidAddress = exports.InvalidXRPTag = exports.HardResetFail = exports.FeeEstimationFailed = exports.EthAppPleaseEnableContractData = exports.EnpointConfigError = exports.DisconnectedDeviceDuringOperation = exports.DisconnectedDevice = exports.DeviceSocketNoBulkStatus = exports.DeviceSocketFail = exports.DeviceNameInvalid = exports.DeviceHalted = exports.DeviceInOSUExpected = exports.DeviceOnDashboardUnexpected = exports.DeviceOnDashboardExpected = exports.DeviceNotGenuineError = exports.DeviceGenuineSocketEarlyClose = exports.DeviceAppVerifyNotSupported = exports.CurrencyNotSupported = exports.CashAddrNotSupported = exports.CantOpenDevice = exports.BtcUnmatchedApp = exports.BluetoothRequired = exports.AmountRequired = exports.AccountNotSupported = exports.AccountNameRequiredError = exports.addCustomErrorDeserializer = exports.createCustomErrorClass = exports.deserializeError = exports.serializeError = undefined;
exports.TransportError = TransportError;
exports.getAltStatusMessage = getAltStatusMessage;
exports.TransportStatusError = TransportStatusError;

var _helpers = __webpack_require__(/*! ./helpers */ "./common/temp/node_modules/@ledgerhq/errors/lib/helpers.js");

exports.serializeError = _helpers.serializeError;
exports.deserializeError = _helpers.deserializeError;
exports.createCustomErrorClass = _helpers.createCustomErrorClass;
exports.addCustomErrorDeserializer = _helpers.addCustomErrorDeserializer;
var AccountNameRequiredError = exports.AccountNameRequiredError = (0, _helpers.createCustomErrorClass)("AccountNameRequired");
var AccountNotSupported = exports.AccountNotSupported = (0, _helpers.createCustomErrorClass)("AccountNotSupported");
var AmountRequired = exports.AmountRequired = (0, _helpers.createCustomErrorClass)("AmountRequired");
var BluetoothRequired = exports.BluetoothRequired = (0, _helpers.createCustomErrorClass)("BluetoothRequired");
var BtcUnmatchedApp = exports.BtcUnmatchedApp = (0, _helpers.createCustomErrorClass)("BtcUnmatchedApp");
var CantOpenDevice = exports.CantOpenDevice = (0, _helpers.createCustomErrorClass)("CantOpenDevice");
var CashAddrNotSupported = exports.CashAddrNotSupported = (0, _helpers.createCustomErrorClass)("CashAddrNotSupported");
var CurrencyNotSupported = exports.CurrencyNotSupported = (0, _helpers.createCustomErrorClass)("CurrencyNotSupported");
var DeviceAppVerifyNotSupported = exports.DeviceAppVerifyNotSupported = (0, _helpers.createCustomErrorClass)("DeviceAppVerifyNotSupported");
var DeviceGenuineSocketEarlyClose = exports.DeviceGenuineSocketEarlyClose = (0, _helpers.createCustomErrorClass)("DeviceGenuineSocketEarlyClose");
var DeviceNotGenuineError = exports.DeviceNotGenuineError = (0, _helpers.createCustomErrorClass)("DeviceNotGenuine");
var DeviceOnDashboardExpected = exports.DeviceOnDashboardExpected = (0, _helpers.createCustomErrorClass)("DeviceOnDashboardExpected");
var DeviceOnDashboardUnexpected = exports.DeviceOnDashboardUnexpected = (0, _helpers.createCustomErrorClass)("DeviceOnDashboardUnexpected");
var DeviceInOSUExpected = exports.DeviceInOSUExpected = (0, _helpers.createCustomErrorClass)("DeviceInOSUExpected");
var DeviceHalted = exports.DeviceHalted = (0, _helpers.createCustomErrorClass)("DeviceHalted");
var DeviceNameInvalid = exports.DeviceNameInvalid = (0, _helpers.createCustomErrorClass)("DeviceNameInvalid");
var DeviceSocketFail = exports.DeviceSocketFail = (0, _helpers.createCustomErrorClass)("DeviceSocketFail");
var DeviceSocketNoBulkStatus = exports.DeviceSocketNoBulkStatus = (0, _helpers.createCustomErrorClass)("DeviceSocketNoBulkStatus");
var DisconnectedDevice = exports.DisconnectedDevice = (0, _helpers.createCustomErrorClass)("DisconnectedDevice");
var DisconnectedDeviceDuringOperation = exports.DisconnectedDeviceDuringOperation = (0, _helpers.createCustomErrorClass)("DisconnectedDeviceDuringOperation");
var EnpointConfigError = exports.EnpointConfigError = (0, _helpers.createCustomErrorClass)("EnpointConfig");
var EthAppPleaseEnableContractData = exports.EthAppPleaseEnableContractData = (0, _helpers.createCustomErrorClass)("EthAppPleaseEnableContractData");
var FeeEstimationFailed = exports.FeeEstimationFailed = (0, _helpers.createCustomErrorClass)("FeeEstimationFailed");
var HardResetFail = exports.HardResetFail = (0, _helpers.createCustomErrorClass)("HardResetFail");
var InvalidXRPTag = exports.InvalidXRPTag = (0, _helpers.createCustomErrorClass)("InvalidXRPTag");
var InvalidAddress = exports.InvalidAddress = (0, _helpers.createCustomErrorClass)("InvalidAddress");
var InvalidAddressBecauseDestinationIsAlsoSource = exports.InvalidAddressBecauseDestinationIsAlsoSource = (0, _helpers.createCustomErrorClass)("InvalidAddressBecauseDestinationIsAlsoSource");
var LatestMCUInstalledError = exports.LatestMCUInstalledError = (0, _helpers.createCustomErrorClass)("LatestMCUInstalledError");
var UnknownMCU = exports.UnknownMCU = (0, _helpers.createCustomErrorClass)("UnknownMCU");
var LedgerAPIError = exports.LedgerAPIError = (0, _helpers.createCustomErrorClass)("LedgerAPIError");
var LedgerAPIErrorWithMessage = exports.LedgerAPIErrorWithMessage = (0, _helpers.createCustomErrorClass)("LedgerAPIErrorWithMessage");
var LedgerAPINotAvailable = exports.LedgerAPINotAvailable = (0, _helpers.createCustomErrorClass)("LedgerAPINotAvailable");
var ManagerAppAlreadyInstalledError = exports.ManagerAppAlreadyInstalledError = (0, _helpers.createCustomErrorClass)("ManagerAppAlreadyInstalled");
var ManagerAppRelyOnBTCError = exports.ManagerAppRelyOnBTCError = (0, _helpers.createCustomErrorClass)("ManagerAppRelyOnBTC");
var ManagerAppDepInstallRequired = exports.ManagerAppDepInstallRequired = (0, _helpers.createCustomErrorClass)("ManagerAppDepInstallRequired");
var ManagerAppDepUninstallRequired = exports.ManagerAppDepUninstallRequired = (0, _helpers.createCustomErrorClass)("ManagerAppDepUninstallRequired");
var ManagerDeviceLockedError = exports.ManagerDeviceLockedError = (0, _helpers.createCustomErrorClass)("ManagerDeviceLocked");
var ManagerFirmwareNotEnoughSpaceError = exports.ManagerFirmwareNotEnoughSpaceError = (0, _helpers.createCustomErrorClass)("ManagerFirmwareNotEnoughSpace");
var ManagerNotEnoughSpaceError = exports.ManagerNotEnoughSpaceError = (0, _helpers.createCustomErrorClass)("ManagerNotEnoughSpace");
var ManagerUninstallBTCDep = exports.ManagerUninstallBTCDep = (0, _helpers.createCustomErrorClass)("ManagerUninstallBTCDep");
var NetworkDown = exports.NetworkDown = (0, _helpers.createCustomErrorClass)("NetworkDown");
var NoAddressesFound = exports.NoAddressesFound = (0, _helpers.createCustomErrorClass)("NoAddressesFound");
var NotEnoughBalance = exports.NotEnoughBalance = (0, _helpers.createCustomErrorClass)("NotEnoughBalance");
var NotEnoughBalanceToDelegate = exports.NotEnoughBalanceToDelegate = (0, _helpers.createCustomErrorClass)("NotEnoughBalanceToDelegate");
var NotEnoughBalanceInParentAccount = exports.NotEnoughBalanceInParentAccount = (0, _helpers.createCustomErrorClass)("NotEnoughBalanceInParentAccount");
var NotEnoughSpendableBalance = exports.NotEnoughSpendableBalance = (0, _helpers.createCustomErrorClass)("NotEnoughSpendableBalance");
var NotEnoughBalanceBecauseDestinationNotCreated = exports.NotEnoughBalanceBecauseDestinationNotCreated = (0, _helpers.createCustomErrorClass)("NotEnoughBalanceBecauseDestinationNotCreated");
var NoAccessToCamera = exports.NoAccessToCamera = (0, _helpers.createCustomErrorClass)("NoAccessToCamera");
var NotEnoughGas = exports.NotEnoughGas = (0, _helpers.createCustomErrorClass)("NotEnoughGas");
var NotSupportedLegacyAddress = exports.NotSupportedLegacyAddress = (0, _helpers.createCustomErrorClass)("NotSupportedLegacyAddress");
var GasLessThanEstimate = exports.GasLessThanEstimate = (0, _helpers.createCustomErrorClass)("GasLessThanEstimate");
var PasswordsDontMatchError = exports.PasswordsDontMatchError = (0, _helpers.createCustomErrorClass)("PasswordsDontMatch");
var PasswordIncorrectError = exports.PasswordIncorrectError = (0, _helpers.createCustomErrorClass)("PasswordIncorrect");
var RecommendSubAccountsToEmpty = exports.RecommendSubAccountsToEmpty = (0, _helpers.createCustomErrorClass)("RecommendSubAccountsToEmpty");
var RecommendUndelegation = exports.RecommendUndelegation = (0, _helpers.createCustomErrorClass)("RecommendUndelegation");
var TimeoutTagged = exports.TimeoutTagged = (0, _helpers.createCustomErrorClass)("TimeoutTagged");
var UnexpectedBootloader = exports.UnexpectedBootloader = (0, _helpers.createCustomErrorClass)("UnexpectedBootloader");
var MCUNotGenuineToDashboard = exports.MCUNotGenuineToDashboard = (0, _helpers.createCustomErrorClass)("MCUNotGenuineToDashboard");
var RecipientRequired = exports.RecipientRequired = (0, _helpers.createCustomErrorClass)("RecipientRequired");
var UnavailableTezosOriginatedAccountReceive = exports.UnavailableTezosOriginatedAccountReceive = (0, _helpers.createCustomErrorClass)("UnavailableTezosOriginatedAccountReceive");
var UnavailableTezosOriginatedAccountSend = exports.UnavailableTezosOriginatedAccountSend = (0, _helpers.createCustomErrorClass)("UnavailableTezosOriginatedAccountSend");
var UpdateYourApp = exports.UpdateYourApp = (0, _helpers.createCustomErrorClass)("UpdateYourApp");
var UserRefusedDeviceNameChange = exports.UserRefusedDeviceNameChange = (0, _helpers.createCustomErrorClass)("UserRefusedDeviceNameChange");
var UserRefusedAddress = exports.UserRefusedAddress = (0, _helpers.createCustomErrorClass)("UserRefusedAddress");
var UserRefusedFirmwareUpdate = exports.UserRefusedFirmwareUpdate = (0, _helpers.createCustomErrorClass)("UserRefusedFirmwareUpdate");
var UserRefusedAllowManager = exports.UserRefusedAllowManager = (0, _helpers.createCustomErrorClass)("UserRefusedAllowManager");
var UserRefusedOnDevice = exports.UserRefusedOnDevice = (0, _helpers.createCustomErrorClass)("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal
var TransportOpenUserCancelled = exports.TransportOpenUserCancelled = (0, _helpers.createCustomErrorClass)("TransportOpenUserCancelled");
var TransportInterfaceNotAvailable = exports.TransportInterfaceNotAvailable = (0, _helpers.createCustomErrorClass)("TransportInterfaceNotAvailable");
var TransportWebUSBGestureRequired = exports.TransportWebUSBGestureRequired = (0, _helpers.createCustomErrorClass)("TransportWebUSBGestureRequired");
var DeviceShouldStayInApp = exports.DeviceShouldStayInApp = (0, _helpers.createCustomErrorClass)("DeviceShouldStayInApp");
var WebsocketConnectionError = exports.WebsocketConnectionError = (0, _helpers.createCustomErrorClass)("WebsocketConnectionError");
var WebsocketConnectionFailed = exports.WebsocketConnectionFailed = (0, _helpers.createCustomErrorClass)("WebsocketConnectionFailed");
var WrongDeviceForAccount = exports.WrongDeviceForAccount = (0, _helpers.createCustomErrorClass)("WrongDeviceForAccount");
var WrongAppForCurrency = exports.WrongAppForCurrency = (0, _helpers.createCustomErrorClass)("WrongAppForCurrency");
var ETHAddressNonEIP = exports.ETHAddressNonEIP = (0, _helpers.createCustomErrorClass)("ETHAddressNonEIP");
var CantScanQRCode = exports.CantScanQRCode = (0, _helpers.createCustomErrorClass)("CantScanQRCode");
var FeeNotLoaded = exports.FeeNotLoaded = (0, _helpers.createCustomErrorClass)("FeeNotLoaded");
var FeeRequired = exports.FeeRequired = (0, _helpers.createCustomErrorClass)("FeeRequired");
var FeeTooHigh = exports.FeeTooHigh = (0, _helpers.createCustomErrorClass)("FeeTooHigh");
var SyncError = exports.SyncError = (0, _helpers.createCustomErrorClass)("SyncError");
var PairingFailed = exports.PairingFailed = (0, _helpers.createCustomErrorClass)("PairingFailed");
var GenuineCheckFailed = exports.GenuineCheckFailed = (0, _helpers.createCustomErrorClass)("GenuineCheckFailed");
var LedgerAPI4xx = exports.LedgerAPI4xx = (0, _helpers.createCustomErrorClass)("LedgerAPI4xx");
var LedgerAPI5xx = exports.LedgerAPI5xx = (0, _helpers.createCustomErrorClass)("LedgerAPI5xx");
var FirmwareOrAppUpdateRequired = exports.FirmwareOrAppUpdateRequired = (0, _helpers.createCustomErrorClass)("FirmwareOrAppUpdateRequired");

// db stuff, no need to translate
var NoDBPathGiven = exports.NoDBPathGiven = (0, _helpers.createCustomErrorClass)("NoDBPathGiven");
var DBWrongPassword = exports.DBWrongPassword = (0, _helpers.createCustomErrorClass)("DBWrongPassword");
var DBNotReset = exports.DBNotReset = (0, _helpers.createCustomErrorClass)("DBNotReset");

/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */
function TransportError(message, id) {
  this.name = "TransportError";
  this.message = message;
  this.stack = new Error().stack;
  this.id = id;
}
//$FlowFixMe
TransportError.prototype = new Error();

(0, _helpers.addCustomErrorDeserializer)("TransportError", function (e) {
  return new TransportError(e.message, e.id);
});

var StatusCodes = exports.StatusCodes = {
  PIN_REMAINING_ATTEMPTS: 0x63c0,
  INCORRECT_LENGTH: 0x6700,
  COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
  SECURITY_STATUS_NOT_SATISFIED: 0x6982,
  CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
  INCORRECT_DATA: 0x6a80,
  NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
  REFERENCED_DATA_NOT_FOUND: 0x6a88,
  FILE_ALREADY_EXISTS: 0x6a89,
  INCORRECT_P1_P2: 0x6b00,
  INS_NOT_SUPPORTED: 0x6d00,
  CLA_NOT_SUPPORTED: 0x6e00,
  TECHNICAL_PROBLEM: 0x6f00,
  OK: 0x9000,
  MEMORY_PROBLEM: 0x9240,
  NO_EF_SELECTED: 0x9400,
  INVALID_OFFSET: 0x9402,
  FILE_NOT_FOUND: 0x9404,
  INCONSISTENT_FILE: 0x9408,
  ALGORITHM_NOT_SUPPORTED: 0x9484,
  INVALID_KCV: 0x9485,
  CODE_NOT_INITIALIZED: 0x9802,
  ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
  CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
  CONTRADICTION_INVALIDATION: 0x9810,
  CODE_BLOCKED: 0x9840,
  MAX_VALUE_REACHED: 0x9850,
  GP_AUTH_FAILED: 0x6300,
  LICENSING: 0x6f42,
  HALTED: 0x6faa
};

function getAltStatusMessage(code) {
  switch (code) {
    // improve text of most common errors
    case 0x6700:
      return "Incorrect length";
    case 0x6982:
      return "Security not satisfied (dongle locked or have invalid access rights)";
    case 0x6985:
      return "Condition of use not satisfied (denied by the user?)";
    case 0x6a80:
      return "Invalid data received";
    case 0x6b00:
      return "Invalid parameter received";
  }
  if (0x6f00 <= code && code <= 0x6fff) {
    return "Internal error, please report";
  }
}

/**
 * Error thrown when a device returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
function TransportStatusError(statusCode) {
  this.name = "TransportStatusError";
  var statusText = Object.keys(StatusCodes).find(function (k) {
    return StatusCodes[k] === statusCode;
  }) || "UNKNOWN_ERROR";
  var smsg = getAltStatusMessage(statusCode) || statusText;
  var statusCodeStr = statusCode.toString(16);
  this.message = "Ledger device: " + smsg + " (0x" + statusCodeStr + ")";
  this.stack = new Error().stack;
  this.statusCode = statusCode;
  this.statusText = statusText;
}
//$FlowFixMe
TransportStatusError.prototype = new Error();

(0, _helpers.addCustomErrorDeserializer)("TransportStatusError", function (e) {
  return new TransportStatusError(e.statusCode);
});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./common/temp/node_modules/@ledgerhq/hw-transport-node-hid-noevents/lib/TransportNodeHid.js":
/*!***************************************************************************************************!*\
  !*** ./common/temp/node_modules/@ledgerhq/hw-transport-node-hid-noevents/lib/TransportNodeHid.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, Buffer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getDevices = getDevices;

var _nodeHid = __webpack_require__(/*! node-hid */ "./common/temp/node_modules/node-hid/nodehid.js");

var _nodeHid2 = _interopRequireDefault(_nodeHid);

var _hwTransport = __webpack_require__(/*! @ledgerhq/hw-transport */ "./common/temp/node_modules/@ledgerhq/hw-transport/lib/Transport.js");

var _hwTransport2 = _interopRequireDefault(_hwTransport);

var _logs = __webpack_require__(/*! @ledgerhq/logs */ "./common/temp/node_modules/@ledgerhq/logs/lib/index.js");

var _devices = __webpack_require__(/*! @ledgerhq/devices */ "./common/temp/node_modules/@ledgerhq/devices/lib/index.js");

var _hidFraming = __webpack_require__(/*! @ledgerhq/devices/lib/hid-framing */ "./common/temp/node_modules/@ledgerhq/devices/lib/hid-framing.js");

var _hidFraming2 = _interopRequireDefault(_hidFraming);

var _errors = __webpack_require__(/*! @ledgerhq/errors */ "./common/temp/node_modules/@ledgerhq/errors/lib/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var filterInterface = function filterInterface(device) {
  return ["win32", "darwin"].includes(process.platform) ? // $FlowFixMe
  device.usagePage === 0xffa0 : device.interface === 0;
};

function getDevices() {
  // $FlowFixMe
  return _nodeHid2.default.devices(_devices.ledgerUSBVendorId, 0x0).filter(filterInterface);
}

var isDisconnectedError = function isDisconnectedError(e) {
  return e && e.message && e.message.indexOf("HID") >= 0;
};

/**
 * node-hid Transport minimal implementation
 * @example
 * import TransportNodeHid from "@ledgerhq/hw-transport-node-hid-noevents";
 * ...
 * TransportNodeHid.create().then(transport => ...)
 */

var TransportNodeHidNoEvents = function (_Transport) {
  _inherits(TransportNodeHidNoEvents, _Transport);

  _createClass(TransportNodeHidNoEvents, null, [{
    key: "open",


    /**
     * if path="" is not provided, the library will take the first device
     */


    /**
     *
     */
    value: function open(path) {
      return Promise.resolve().then(function () {
        if (path) {
          return new TransportNodeHidNoEvents(new _nodeHid2.default.HID(path));
        }
        var device = getDevices()[0];
        if (!device) throw new _errors.TransportError("NoDevice", "NoDevice");
        return new TransportNodeHidNoEvents(new _nodeHid2.default.HID(device.path));
      });
    }

    /**
     */

    /**
     *
     */

  }]);

  function TransportNodeHidNoEvents(device) {
    _classCallCheck(this, TransportNodeHidNoEvents);

    var _this = _possibleConstructorReturn(this, (TransportNodeHidNoEvents.__proto__ || Object.getPrototypeOf(TransportNodeHidNoEvents)).call(this));

    _initialiseProps.call(_this);

    _this.device = device;
    // $FlowFixMe
    var info = device.getDeviceInfo();
    _this.deviceModel = info && info.product ? (0, _devices.identifyProductName)(info.product) : null;
    return _this;
  }

  /**
   * Exchange with the device using APDU protocol.
   * @param apdu
   * @returns a promise of apdu response
   */


  _createClass(TransportNodeHidNoEvents, [{
    key: "setScrambleKey",
    value: function setScrambleKey() {}

    /**
     * release the USB device.
     */

  }, {
    key: "close",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.exchangeBusyPromise;

              case 2:
                this.device.close();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function close() {
        return _ref.apply(this, arguments);
      }

      return close;
    }()
  }]);

  return TransportNodeHidNoEvents;
}(_hwTransport2.default);

TransportNodeHidNoEvents.isSupported = function () {
  return Promise.resolve(typeof _nodeHid2.default.HID === "function");
};

TransportNodeHidNoEvents.list = function () {
  return Promise.resolve(getDevices().map(function (d) {
    return d.path;
  }));
};

TransportNodeHidNoEvents.listen = function (observer) {
  getDevices().forEach(function (device) {
    var deviceModel = (0, _devices.identifyUSBProductId)(device.productId);
    observer.next({
      type: "add",
      descriptor: device.path,
      deviceModel: deviceModel,
      device: device
    });
  });
  observer.complete();
  return { unsubscribe: function unsubscribe() {} };
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.channel = Math.floor(Math.random() * 0xffff);
  this.packetSize = 64;
  this.disconnected = false;

  this.setDisconnected = function () {
    if (!_this2.disconnected) {
      _this2.emit("disconnect");
      _this2.disconnected = true;
    }
  };

  this.writeHID = function (content) {
    var data = [0x00];
    for (var i = 0; i < content.length; i++) {
      data.push(content[i]);
    }
    try {
      _this2.device.write(data);
      return Promise.resolve();
    } catch (e) {
      if (isDisconnectedError(e)) {
        _this2.setDisconnected();
        return Promise.reject(new _errors.DisconnectedDevice(e.message));
      }
      return Promise.reject(e);
    }
  };

  this.readHID = function () {
    return new Promise(function (resolve, reject) {
      return _this2.device.read(function (e, res) {
        if (!res) {
          return reject(new _errors.DisconnectedDevice());
        }
        if (e) {
          if (isDisconnectedError(e)) {
            _this2.setDisconnected();
            return reject(new _errors.DisconnectedDevice(e.message));
          }
          reject(e);
        } else {
          var buffer = Buffer.from(res);
          resolve(buffer);
        }
      });
    });
  };

  this.exchange = function (apdu) {
    return _this2.exchangeAtomicImpl(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var channel, packetSize, framing, blocks, i, result, acc, buffer;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              channel = _this2.channel, packetSize = _this2.packetSize;

              (0, _logs.log)("apdu", "=> " + apdu.toString("hex"));

              framing = (0, _hidFraming2.default)(channel, packetSize);

              // Write...

              blocks = framing.makeBlocks(apdu);
              i = 0;

            case 5:
              if (!(i < blocks.length)) {
                _context2.next = 12;
                break;
              }

              (0, _logs.log)("hid-frame", "=> " + blocks[i].toString("hex"));
              _context2.next = 9;
              return _this2.writeHID(blocks[i]);

            case 9:
              i++;
              _context2.next = 5;
              break;

            case 12:

              // Read...
              result = void 0;
              acc = void 0;

            case 14:
              if (result = framing.getReducedResult(acc)) {
                _context2.next = 22;
                break;
              }

              _context2.next = 17;
              return _this2.readHID();

            case 17:
              buffer = _context2.sent;

              (0, _logs.log)("hid-frame", "<= " + buffer.toString("hex"));
              acc = framing.reduceResponse(acc, buffer);
              _context2.next = 14;
              break;

            case 22:

              (0, _logs.log)("apdu", "<= " + result.toString("hex"));
              return _context2.abrupt("return", result);

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })));
  };
};

exports.default = TransportNodeHidNoEvents;
//# sourceMappingURL=TransportNodeHid.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./common/temp/node_modules/process/browser.js"), __webpack_require__(/*! ./../../../node-libs-browser/node_modules/buffer/index.js */ "./common/temp/node_modules/node-libs-browser/node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./common/temp/node_modules/@ledgerhq/hw-transport-node-hid/lib/TransportNodeHid.js":
/*!******************************************************************************************!*\
  !*** ./common/temp/node_modules/@ledgerhq/hw-transport-node-hid/lib/TransportNodeHid.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeHid = __webpack_require__(/*! node-hid */ "./common/temp/node_modules/node-hid/nodehid.js");

var _nodeHid2 = _interopRequireDefault(_nodeHid);

var _hwTransportNodeHidNoevents = __webpack_require__(/*! @ledgerhq/hw-transport-node-hid-noevents */ "./common/temp/node_modules/@ledgerhq/hw-transport-node-hid-noevents/lib/TransportNodeHid.js");

var _hwTransportNodeHidNoevents2 = _interopRequireDefault(_hwTransportNodeHidNoevents);

var _devices = __webpack_require__(/*! @ledgerhq/devices */ "./common/temp/node_modules/@ledgerhq/devices/lib/index.js");

var _errors = __webpack_require__(/*! @ledgerhq/errors */ "./common/temp/node_modules/@ledgerhq/errors/lib/index.js");

var _listenDevices2 = __webpack_require__(/*! ./listenDevices */ "./common/temp/node_modules/@ledgerhq/hw-transport-node-hid/lib/listenDevices.js");

var _listenDevices3 = _interopRequireDefault(_listenDevices2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var listenDevicesDebounce = 500;
var listenDevicesPollingSkip = function listenDevicesPollingSkip() {
  return false;
};

/**
 * node-hid Transport implementation
 * @example
 * import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
 * ...
 * TransportNodeHid.create().then(transport => ...)
 */

var TransportNodeHid = function (_TransportNodeHidNoEv) {
  _inherits(TransportNodeHid, _TransportNodeHidNoEv);

  function TransportNodeHid() {
    _classCallCheck(this, TransportNodeHid);

    return _possibleConstructorReturn(this, (TransportNodeHid.__proto__ || Object.getPrototypeOf(TransportNodeHid)).apply(this, arguments));
  }

  _createClass(TransportNodeHid, null, [{
    key: "open",


    /**
     * if path="" is not provided, the library will take the first device
     */


    /**
     *
     */


    /**
     *
     */

    /**
     *
     */
    value: function open(path) {
      return Promise.resolve().then(function () {
        if (path) {
          return new TransportNodeHid(new _nodeHid2.default.HID(path));
        }
        var device = (0, _hwTransportNodeHidNoevents.getDevices)()[0];
        if (!device) throw new _errors.TransportError("NoDevice", "NoDevice");
        return new TransportNodeHid(new _nodeHid2.default.HID(device.path));
      });
    }

    /**
     */


    /**
     *
     */


    /**
     *
     */

  }]);

  return TransportNodeHid;
}(_hwTransportNodeHidNoevents2.default);

TransportNodeHid.isSupported = _hwTransportNodeHidNoevents2.default.isSupported;
TransportNodeHid.list = _hwTransportNodeHidNoevents2.default.list;

TransportNodeHid.setListenDevicesDebounce = function (delay) {
  listenDevicesDebounce = delay;
};

TransportNodeHid.setListenDevicesPollingSkip = function (conditionToSkip) {
  listenDevicesPollingSkip = conditionToSkip;
};

TransportNodeHid.setListenDevicesDebug = function () {
  console.warn("setListenDevicesDebug is deprecated. Use @ledgerhq/logs instead. No logs will get emitted there anymore.");
};

TransportNodeHid.listen = function (observer) {
  var unsubscribed = false;
  Promise.resolve((0, _hwTransportNodeHidNoevents.getDevices)()).then(function (devices) {
    // this needs to run asynchronously so the subscription is defined during this phase
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = devices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var device = _step.value;

        if (!unsubscribed) {
          var descriptor = device.path;
          var deviceModel = (0, _devices.identifyUSBProductId)(device.productId);
          observer.next({ type: "add", descriptor: descriptor, device: device, deviceModel: deviceModel });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });

  var _listenDevices = (0, _listenDevices3.default)(listenDevicesDebounce, listenDevicesPollingSkip),
      events = _listenDevices.events,
      stop = _listenDevices.stop;

  var onAdd = function onAdd(device) {
    if (unsubscribed || !device) return;
    var deviceModel = (0, _devices.identifyUSBProductId)(device.productId);
    observer.next({
      type: "add",
      descriptor: device.path,
      deviceModel: deviceModel,
      device: device
    });
  };
  var onRemove = function onRemove(device) {
    if (unsubscribed || !device) return;
    var deviceModel = (0, _devices.identifyUSBProductId)(device.productId);
    observer.next({
      type: "remove",
      descriptor: device.path,
      deviceModel: deviceModel,
      device: device
    });
  };
  events.on("add", onAdd);
  events.on("remove", onRemove);
  function unsubscribe() {
    unsubscribed = true;
    events.removeListener("add", onAdd);
    events.removeListener("remove", onRemove);
    stop();
  }
  return { unsubscribe: unsubscribe };
};

exports.default = TransportNodeHid;
//# sourceMappingURL=TransportNodeHid.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node-libs-browser/mock/console.js */ "./common/temp/node_modules/node-libs-browser/mock/console.js")))

/***/ }),

/***/ "./common/temp/node_modules/@ledgerhq/hw-transport-node-hid/lib/listenDevices.js":
/*!***************************************************************************************!*\
  !*** ./common/temp/node_modules/@ledgerhq/hw-transport-node-hid/lib/listenDevices.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! events */ "./common/temp/node_modules/events/events.js");

var _events2 = _interopRequireDefault(_events);

var _hwTransportNodeHidNoevents = __webpack_require__(/*! @ledgerhq/hw-transport-node-hid-noevents */ "./common/temp/node_modules/@ledgerhq/hw-transport-node-hid-noevents/lib/TransportNodeHid.js");

var _logs = __webpack_require__(/*! @ledgerhq/logs */ "./common/temp/node_modules/@ledgerhq/logs/lib/index.js");

var _usb = __webpack_require__(/*! usb */ "./common/temp/node_modules/usb/usb.js");

var _usb2 = _interopRequireDefault(_usb);

var _debounce = __webpack_require__(/*! lodash/debounce */ "./common/temp/node_modules/lodash/debounce.js");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (delay, listenDevicesPollingSkip) {
  var events = new _events2.default();
  events.setMaxListeners(0);

  var listDevices = (0, _hwTransportNodeHidNoevents.getDevices)();

  var flatDevice = function flatDevice(d) {
    return d.path;
  };

  var getFlatDevices = function getFlatDevices() {
    return [].concat(_toConsumableArray(new Set((0, _hwTransportNodeHidNoevents.getDevices)().map(function (d) {
      return flatDevice(d);
    }))));
  };

  var getDeviceByPaths = function getDeviceByPaths(paths) {
    return listDevices.find(function (d) {
      return paths.includes(flatDevice(d));
    });
  };

  var lastDevices = getFlatDevices();

  var poll = function poll() {
    if (!listenDevicesPollingSkip()) {
      (0, _logs.log)("hid-listen", "Polling for added or removed devices");

      var changeFound = false;
      var currentDevices = getFlatDevices();
      var newDevices = currentDevices.filter(function (d) {
        return !lastDevices.includes(d);
      });

      if (newDevices.length > 0) {
        (0, _logs.log)("hid-listen", "New device found:", newDevices);

        listDevices = (0, _hwTransportNodeHidNoevents.getDevices)();
        events.emit("add", getDeviceByPaths(newDevices));

        changeFound = true;
      } else {
        (0, _logs.log)("hid-listen", "No new device found");
      }

      var removeDevices = lastDevices.filter(function (d) {
        return !currentDevices.includes(d);
      });

      if (removeDevices.length > 0) {
        (0, _logs.log)("hid-listen", "Removed device found:", removeDevices);

        events.emit("remove", getDeviceByPaths(removeDevices));
        listDevices = listDevices.filter(function (d) {
          return !removeDevices.includes(flatDevice(d));
        });

        changeFound = true;
      } else {
        (0, _logs.log)("hid-listen", "No removed device found");
      }

      if (changeFound) {
        lastDevices = currentDevices;
      }
    } else {
      (0, _logs.log)("hid-listen", "Polling skipped, re-debouncing");
      debouncedPoll();
    }
  };

  var debouncedPoll = (0, _debounce2.default)(poll, delay);

  var attachDetected = function attachDetected(device) {
    (0, _logs.log)("hid-listen", "Device add detected:", device);

    debouncedPoll();
  };
  _usb2.default.on("attach", attachDetected);
  (0, _logs.log)("hid-listen", "attach listener added");

  var detachDetected = function detachDetected(device) {
    (0, _logs.log)("hid-listen", "Device removal detected:", device);

    debouncedPoll();
  };
  _usb2.default.on("detach", detachDetected);
  (0, _logs.log)("hid-listen", "detach listener added");

  return {
    stop: function stop() {
      (0, _logs.log)("hid-listen", "Stop received, removing listeners and cancelling pending debounced polls");
      debouncedPoll.cancel();
      _usb2.default.removeListener("attach", attachDetected);
      _usb2.default.removeListener("detach", detachDetected);
    },
    events: events
  };
};
//# sourceMappingURL=listenDevices.js.map

/***/ }),

/***/ "./common/temp/node_modules/@ledgerhq/hw-transport/lib/Transport.js":
/*!**************************************************************************!*\
  !*** ./common/temp/node_modules/@ledgerhq/hw-transport/lib/Transport.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer, console) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAltStatusMessage = exports.StatusCodes = exports.TransportStatusError = exports.TransportError = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events2 = __webpack_require__(/*! events */ "./common/temp/node_modules/events/events.js");

var _events3 = _interopRequireDefault(_events2);

var _errors = __webpack_require__(/*! @ledgerhq/errors */ "./common/temp/node_modules/@ledgerhq/errors/lib/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.TransportError = _errors.TransportError;
exports.TransportStatusError = _errors.TransportStatusError;
exports.StatusCodes = _errors.StatusCodes;
exports.getAltStatusMessage = _errors.getAltStatusMessage;

/**
 */


/**
 */


/**
 * type: add or remove event
 * descriptor: a parameter that can be passed to open(descriptor)
 * deviceModel: device info on the model (is it a nano s, nano x, ...)
 * device: transport specific device info
 */

/**
 */

/**
 * Transport defines the generic interface to share between node/u2f impl
 * A **Descriptor** is a parametric type that is up to be determined for the implementation.
 * it can be for instance an ID, an file path, a URL,...
 */
var Transport = function () {
  function Transport() {
    var _this = this;

    _classCallCheck(this, Transport);

    this.exchangeTimeout = 30000;
    this._events = new _events3.default();

    this.send = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cla, ins, p1, p2) {
        var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Buffer.alloc(0);
        var statusList = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [_errors.StatusCodes.OK];
        var response, sw;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(data.length >= 256)) {
                  _context.next = 2;
                  break;
                }

                throw new _errors.TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");

              case 2:
                _context.next = 4;
                return _this.exchange(Buffer.concat([Buffer.from([cla, ins, p1, p2]), Buffer.from([data.length]), data]));

              case 4:
                response = _context.sent;
                sw = response.readUInt16BE(response.length - 2);

                if (statusList.some(function (s) {
                  return s === sw;
                })) {
                  _context.next = 8;
                  break;
                }

                throw new _errors.TransportStatusError(sw);

              case 8:
                return _context.abrupt("return", response);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }();

    this.exchangeAtomicImpl = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(f) {
        var resolveBusy, busyPromise, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this.exchangeBusyPromise) {
                  _context2.next = 2;
                  break;
                }

                throw new _errors.TransportError("Transport race condition", "RaceCondition");

              case 2:
                resolveBusy = void 0;
                busyPromise = new Promise(function (r) {
                  resolveBusy = r;
                });

                _this.exchangeBusyPromise = busyPromise;
                _context2.prev = 5;
                _context2.next = 8;
                return f();

              case 8:
                res = _context2.sent;
                return _context2.abrupt("return", res);

              case 10:
                _context2.prev = 10;

                if (resolveBusy) resolveBusy();
                _this.exchangeBusyPromise = null;
                return _context2.finish(10);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this, [[5,, 10, 14]]);
      }));

      return function (_x7) {
        return _ref2.apply(this, arguments);
      };
    }();

    this._appAPIlock = null;
  }

  /**
   * Statically check if a transport is supported on the user's platform/browser.
   */


  /**
   * List once all available descriptors. For a better granularity, checkout `listen()`.
   * @return a promise of descriptors
   * @example
   * TransportFoo.list().then(descriptors => ...)
   */


  /**
   * Listen all device events for a given Transport. The method takes an Obverver of DescriptorEvent and returns a Subscription (according to Observable paradigm https://github.com/tc39/proposal-observable )
   * a DescriptorEvent is a `{ descriptor, type }` object. type can be `"add"` or `"remove"` and descriptor is a value you can pass to `open(descriptor)`.
   * each listen() call will first emit all potential device already connected and then will emit events can come over times,
   * for instance if you plug a USB device after listen() or a bluetooth device become discoverable.
   * @param observer is an object with a next, error and complete function (compatible with observer pattern)
   * @return a Subscription object on which you can `.unsubscribe()` to stop listening descriptors.
   * @example
  const sub = TransportFoo.listen({
  next: e => {
    if (e.type==="add") {
      sub.unsubscribe();
      const transport = await TransportFoo.open(e.descriptor);
      ...
    }
  },
  error: error => {},
  complete: () => {}
  })
   */


  /**
   * attempt to create a Transport instance with potentially a descriptor.
   * @param descriptor: the descriptor to open the transport with.
   * @param timeout: an optional timeout
   * @return a Promise of Transport instance
   * @example
  TransportFoo.open(descriptor).then(transport => ...)
   */


  /**
   * low level api to communicate with the device
   * This method is for implementations to implement but should not be directly called.
   * Instead, the recommanded way is to use send() method
   * @param apdu the data to send
   * @return a Promise of response data
   */


  /**
   * set the "scramble key" for the next exchanges with the device.
   * Each App can have a different scramble key and they internally will set it at instanciation.
   * @param key the scramble key
   */


  /**
   * close the exchange with the device.
   * @return a Promise that ends when the transport is closed.
   */


  _createClass(Transport, [{
    key: "on",


    /**
     * Listen to an event on an instance of transport.
     * Transport implementation can have specific events. Here is the common events:
     * * `"disconnect"` : triggered if Transport is disconnected
     */
    value: function on(eventName, cb) {
      this._events.on(eventName, cb);
    }

    /**
     * Stop listening to an event on an instance of transport.
     */

  }, {
    key: "off",
    value: function off(eventName, cb) {
      this._events.removeListener(eventName, cb);
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var _events;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_events = this._events).emit.apply(_events, [event].concat(_toConsumableArray(args)));
    }

    /**
     * Enable or not logs of the binary exchange
     */

  }, {
    key: "setDebugMode",
    value: function setDebugMode() {
      console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
    }

    /**
     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
     */

  }, {
    key: "setExchangeTimeout",
    value: function setExchangeTimeout(exchangeTimeout) {
      this.exchangeTimeout = exchangeTimeout;
    }

    /**
     * wrapper on top of exchange to simplify work of the implementation.
     * @param cla
     * @param ins
     * @param p1
     * @param p2
     * @param data
     * @param statusList is a list of accepted status code (shorts). [0x9000] by default
     * @return a Promise of response buffer
     */

  }, {
    key: "decorateAppAPIMethods",
    value: function decorateAppAPIMethods(self, methods, scrambleKey) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = methods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var methodName = _step.value;

          self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "decorateAppAPIMethod",
    value: function decorateAppAPIMethod(methodName, f, ctx, scrambleKey) {
      var _this2 = this;

      return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var _appAPIlock;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _appAPIlock = _this2._appAPIlock;

                  if (!_appAPIlock) {
                    _context3.next = 3;
                    break;
                  }

                  return _context3.abrupt("return", Promise.reject(new _errors.TransportError("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked")));

                case 3:
                  _context3.prev = 3;

                  _this2._appAPIlock = methodName;
                  _this2.setScrambleKey(scrambleKey);
                  _context3.next = 8;
                  return f.apply(ctx, args);

                case 8:
                  return _context3.abrupt("return", _context3.sent);

                case 9:
                  _context3.prev = 9;

                  _this2._appAPIlock = null;
                  return _context3.finish(9);

                case 12:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, _this2, [[3,, 9, 12]]);
        }));

        return function () {
          return _ref3.apply(this, arguments);
        };
      }();
    }
  }], [{
    key: "create",


    /**
     * create() allows to open the first descriptor available or
     * throw if there is none or if timeout is reached.
     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
     * @example
    TransportFoo.create().then(transport => ...)
     */
    value: function create() {
      var _this3 = this;

      var openTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
      var listenTimeout = arguments[1];

      return new Promise(function (resolve, reject) {
        var found = false;
        var sub = _this3.listen({
          next: function next(e) {
            found = true;
            if (sub) sub.unsubscribe();
            if (listenTimeoutId) clearTimeout(listenTimeoutId);
            _this3.open(e.descriptor, openTimeout).then(resolve, reject);
          },
          error: function error(e) {
            if (listenTimeoutId) clearTimeout(listenTimeoutId);
            reject(e);
          },
          complete: function complete() {
            if (listenTimeoutId) clearTimeout(listenTimeoutId);
            if (!found) {
              reject(new _errors.TransportError(_this3.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
            }
          }
        });
        var listenTimeoutId = listenTimeout ? setTimeout(function () {
          sub.unsubscribe();
          reject(new _errors.TransportError(_this3.ErrorMessage_ListenTimeout, "ListenTimeout"));
        }, listenTimeout) : null;
      });
    }

    // $FlowFixMe

  }]);

  return Transport;
}();

Transport.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
Transport.ErrorMessage_NoDeviceFound = "No Ledger device found";
exports.default = Transport;
//# sourceMappingURL=Transport.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node-libs-browser/node_modules/buffer/index.js */ "./common/temp/node_modules/node-libs-browser/node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../../node-libs-browser/mock/console.js */ "./common/temp/node_modules/node-libs-browser/mock/console.js")))

/***/ }),

/***/ "./common/temp/node_modules/@ledgerhq/logs/lib/index.js":
/*!**************************************************************!*\
  !*** ./common/temp/node_modules/@ledgerhq/logs/lib/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console, global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * A Log object
 */
var id = 0;
var subscribers = [];

/**
 * log something
 * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
 * @param message a clear message of the log associated to the type
 */
var log = exports.log = function log(type, message, data) {
  var obj = { type: type, id: String(++id), date: new Date() };
  if (message) obj.message = message;
  if (data) obj.data = data;
  dispatch(obj);
};

/**
 * listen to logs.
 * @param cb that is called for each future log() with the Log object
 * @return a function that can be called to unsubscribe the listener
 */
var listen = exports.listen = function listen(cb) {
  subscribers.push(cb);
  return function () {
    var i = subscribers.indexOf(cb);
    if (i !== -1) {
      // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
      subscribers[i] = subscribers[subscribers.length - 1];
      subscribers.pop();
    }
  };
};

function dispatch(log) {
  for (var i = 0; i < subscribers.length; i++) {
    try {
      subscribers[i](log);
    } catch (e) {
      console.error(e);
    }
  }
}

// for debug purpose
global.__ledgerLogsListen = listen;
//# sourceMappingURL=index.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node-libs-browser/mock/console.js */ "./common/temp/node_modules/node-libs-browser/mock/console.js"), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./common/temp/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./common/temp/node_modules/lodash/_Symbol.js":
/*!****************************************************!*\
  !*** ./common/temp/node_modules/lodash/_Symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./common/temp/node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./common/temp/node_modules/lodash/_baseGetTag.js":
/*!********************************************************!*\
  !*** ./common/temp/node_modules/lodash/_baseGetTag.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./common/temp/node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./common/temp/node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./common/temp/node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./common/temp/node_modules/lodash/_freeGlobal.js":
/*!********************************************************!*\
  !*** ./common/temp/node_modules/lodash/_freeGlobal.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./common/temp/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./common/temp/node_modules/lodash/_getRawTag.js":
/*!*******************************************************!*\
  !*** ./common/temp/node_modules/lodash/_getRawTag.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./common/temp/node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./common/temp/node_modules/lodash/_objectToString.js":
/*!************************************************************!*\
  !*** ./common/temp/node_modules/lodash/_objectToString.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./common/temp/node_modules/lodash/_root.js":
/*!**************************************************!*\
  !*** ./common/temp/node_modules/lodash/_root.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./common/temp/node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./common/temp/node_modules/lodash/debounce.js":
/*!*****************************************************!*\
  !*** ./common/temp/node_modules/lodash/debounce.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./common/temp/node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./common/temp/node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./common/temp/node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./common/temp/node_modules/lodash/isObject.js":
/*!*****************************************************!*\
  !*** ./common/temp/node_modules/lodash/isObject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./common/temp/node_modules/lodash/isObjectLike.js":
/*!*********************************************************!*\
  !*** ./common/temp/node_modules/lodash/isObjectLike.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./common/temp/node_modules/lodash/isSymbol.js":
/*!*****************************************************!*\
  !*** ./common/temp/node_modules/lodash/isSymbol.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./common/temp/node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./common/temp/node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./common/temp/node_modules/lodash/now.js":
/*!************************************************!*\
  !*** ./common/temp/node_modules/lodash/now.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./common/temp/node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./common/temp/node_modules/lodash/toNumber.js":
/*!*****************************************************!*\
  !*** ./common/temp/node_modules/lodash/toNumber.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./common/temp/node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./common/temp/node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./common/temp/node_modules/node-hid/nodehid.js":
/*!******************************************************!*\
  !*** ./common/temp/node_modules/node-hid/nodehid.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {
var os = __webpack_require__(/*! os */ "./common/temp/node_modules/os-browserify/browser.js")

var EventEmitter = __webpack_require__(/*! events */ "./common/temp/node_modules/events/events.js").EventEmitter,
    util = __webpack_require__(/*! util */ "./common/temp/node_modules/util/util.js");

var driverType = null;
function setDriverType(type) {
    driverType = type;
}

// lazy load the C++ binding
var binding = null;
function loadBinding() {
    if( !binding ) {
        if( os.platform() === 'linux' ) {
            // Linux defaults to hidraw
            if( !driverType || driverType === 'hidraw' ) {
                binding = __webpack_require__(/*! bindings */ "./common/temp/node_modules/bindings/bindings.js")('HID-hidraw.node');
            } else {
                binding = __webpack_require__(/*! bindings */ "./common/temp/node_modules/bindings/bindings.js")('HID.node');
            }
        }
        else {
            binding = __webpack_require__(/*! bindings */ "./common/temp/node_modules/bindings/bindings.js")('HID.node');
        }
    }
}

//This class is a wrapper for `binding.HID` class
function HID() {
    //Inherit from EventEmitter
    EventEmitter.call(this);

    loadBinding();

    /* We also want to inherit from `binding.HID`, but unfortunately,
        it's not so easy for native Objects. For example, the
        following won't work since `new` keyword isn't used:

        `binding.HID.apply(this, arguments);`

        So... we do this craziness instead...
    */
    var thisPlusArgs = new Array(arguments.length + 1);
    thisPlusArgs[0] = null;
    for(var i = 0; i < arguments.length; i++)
        thisPlusArgs[i + 1] = arguments[i];
    this._raw = new (Function.prototype.bind.apply(binding.HID,
        thisPlusArgs) )();

    /* Now we have `this._raw` Object from which we need to
        inherit.  So, one solution is to simply copy all
        prototype methods over to `this` and binding them to
        `this._raw`
    */
    for(var i in binding.HID.prototype)
        if(i != "close" && i != "read")
            this[i] = binding.HID.prototype[i].bind(this._raw);

    /* We are now done inheriting from `binding.HID` and EventEmitter.

        Now upon adding a new listener for "data" events, we start
        polling the HID device using `read(...)`
        See `resume()` for more details. */
    this._paused = true;
    var self = this;
    self.on("newListener", function(eventName, listener) {
        if(eventName == "data")
            process.nextTick(self.resume.bind(self) );
    });
}
//Inherit prototype methods
util.inherits(HID, EventEmitter);
//Don't inherit from `binding.HID`; that's done above already!

HID.prototype.close = function close() {
    this._closing = true;
    this.removeAllListeners();
    this._raw.close();
    this._closed = true;
};
//Pauses the reader, which stops "data" events from being emitted
HID.prototype.pause = function pause() {
    this._paused = true;
};

HID.prototype.read = function read(callback) {
    if (this._closed) {
    throw new Error('Unable to read from a closed HID device');
  } else {
    return this._raw.read(callback);
  }
};

HID.prototype.resume = function resume() {
    var self = this;
    if(self._paused && self.listeners("data").length > 0)
    {
        //Start polling & reading loop
        self._paused = false;
        self.read(function readFunc(err, data) {
            if(err)
            {
                //Emit error and pause reading
                self._paused = true;
                if(!self._closing)
                    self.emit("error", err);
                //else ignore any errors if I'm closing the device
            }
            else
            {
                //If there are no "data" listeners, we pause
                if(self.listeners("data").length <= 0)
                    self._paused = true;
                //Keep reading if we aren't paused
                if(!self._paused)
                    self.read(readFunc);
                //Now emit the event
                self.emit("data", data);
            }
        });
    }
};

function showdevices() {
    loadBinding();
    return binding.devices.apply(HID,arguments);
}

//Expose API
exports.HID = HID;
exports.devices = showdevices;
exports.setDriverType = setDriverType;
// exports.devices = binding.devices;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./common/temp/node_modules/process/browser.js")))

/***/ }),

/***/ "./common/temp/node_modules/os-browserify/browser.js":
/*!***********************************************************!*\
  !*** ./common/temp/node_modules/os-browserify/browser.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};


/***/ }),

/***/ "./common/temp/node_modules/usb/usb.js":
/*!*********************************************!*\
  !*** ./common/temp/node_modules/usb/usb.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console, Buffer, process) {var usb = exports = module.exports = __webpack_require__(/*! bindings */ "./common/temp/node_modules/bindings/bindings.js")('usb_bindings');
var events = __webpack_require__(/*! events */ "./common/temp/node_modules/events/events.js")
var util = __webpack_require__(/*! util */ "./common/temp/node_modules/util/util.js")

var isBuffer = function(obj) {
	return obj && obj instanceof Uint8Array
}

if (usb.INIT_ERROR) {
	console.warn("Failed to initialize libusb.")
	usb.Device = function () { throw new Error("Device cannot be instantiated directly.") };
	usb.Transfer = function () { throw new Error("Transfer cannot be instantiated directly.") };
	usb.setDebugLevel = function () { };
	usb.getDeviceList = function () { return []; };
	usb._enableHotplugEvents = function () { };
	usb._disableHotplugEvents = function () { };
}

Object.keys(events.EventEmitter.prototype).forEach(function (key) {
	exports[key] = events.EventEmitter.prototype[key];
});

// convenience method for finding a device by vendor and product id
exports.findByIds = function(vid, pid) {
	var devices = usb.getDeviceList()

	for (var i = 0; i < devices.length; i++) {
		var deviceDesc = devices[i].deviceDescriptor
		if ((deviceDesc.idVendor == vid) && (deviceDesc.idProduct == pid)) {
			return devices[i]
		}
	}
}

usb.Device.prototype.timeout = 1000

usb.Device.prototype.open = function(defaultConfig){
	this.__open()
	if (defaultConfig === false) return
	this.interfaces = []
	var len = this.configDescriptor ? this.configDescriptor.interfaces.length : 0
	for (var i=0; i<len; i++){
		this.interfaces[i] = new Interface(this, i)
	}
}

usb.Device.prototype.close = function(){
	this.__close()
	this.interfaces = null
}

Object.defineProperty(usb.Device.prototype, "configDescriptor", {
	get: function() {
		try {
			return this._configDescriptor || (this._configDescriptor = this.__getConfigDescriptor())
		} catch(e) {
			// Check descriptor exists
			if (e.errno == usb.LIBUSB_ERROR_NOT_FOUND) return null;
			throw e;
		}
	}
});

Object.defineProperty(usb.Device.prototype, "allConfigDescriptors", {
	get: function() {
		try {
			return this._allConfigDescriptors || (this._allConfigDescriptors = this.__getAllConfigDescriptors())
		} catch(e) {
			// Check descriptors exist
			if (e.errno == usb.LIBUSB_ERROR_NOT_FOUND) return [];
			throw e;
		}
	}
});

Object.defineProperty(usb.Device.prototype, "parent", {
	get: function() {
		return this._parent || (this._parent = this.__getParent())
	}
});

usb.Device.prototype.interface = function(addr){
	if (!this.interfaces){
		throw new Error("Device must be open before searching for interfaces")
	}
	addr = addr || 0
	for (var i=0; i<this.interfaces.length; i++){
		if (this.interfaces[i].interfaceNumber == addr){
			return this.interfaces[i]
		}
	}
}

var SETUP_SIZE = usb.LIBUSB_CONTROL_SETUP_SIZE

usb.Device.prototype.controlTransfer =
function(bmRequestType, bRequest, wValue, wIndex, data_or_length, callback){
	var self = this
	var isIn = !!(bmRequestType & usb.LIBUSB_ENDPOINT_IN)
	var wLength

	if (isIn){
		if (!(data_or_length >= 0)){
			throw new TypeError("Expected size number for IN transfer (based on bmRequestType)")
		}
		wLength = data_or_length
	}else{
		if (!isBuffer(data_or_length)){
			throw new TypeError("Expected buffer for OUT transfer (based on bmRequestType)")
		}
		wLength = data_or_length.length
	}

	// Buffer for the setup packet
	// http://libusbx.sourceforge.net/api-1.0/structlibusb__control__setup.html
	var buf = Buffer.alloc(wLength + SETUP_SIZE)
	buf.writeUInt8(   bmRequestType, 0)
	buf.writeUInt8(   bRequest,      1)
	buf.writeUInt16LE(wValue,        2)
	buf.writeUInt16LE(wIndex,        4)
	buf.writeUInt16LE(wLength,       6)

	if (!isIn){
		buf.set(data_or_length, SETUP_SIZE)
	}

	var transfer = new usb.Transfer(this, 0, usb.LIBUSB_TRANSFER_TYPE_CONTROL, this.timeout,
		function(error, buf, actual){
			if (callback){
				if (isIn){
					callback.call(self, error, buf.slice(SETUP_SIZE, SETUP_SIZE + actual))
				}else{
					callback.call(self, error)
				}
			}
		}
	)

	try {
		transfer.submit(buf)
	} catch (e) {
		if (callback){
			process.nextTick(function() { callback.call(self, e); });
		}
	}
	return this;
}

usb.Device.prototype.getStringDescriptor = function (desc_index, callback) {
	var langid = 0x0409;
	var length = 255;
	this.controlTransfer(
		usb.LIBUSB_ENDPOINT_IN,
		usb.LIBUSB_REQUEST_GET_DESCRIPTOR,
		((usb.LIBUSB_DT_STRING << 8) | desc_index),
		langid,
		length,
		function (error, buf) {
			if (error) return callback(error);
			callback(undefined, buf.toString('utf16le', 2));
		}
	);
}

usb.Device.prototype.getBosDescriptor = function (callback) {

	if (this._bosDescriptor) {
		// Cached descriptor
		return callback(undefined, this._bosDescriptor);
	}

	if (this.deviceDescriptor.bcdUSB < 0x201) {
		// BOS is only supported from USB 2.0.1
		return callback(undefined, null);
	}

	this.controlTransfer(
		usb.LIBUSB_ENDPOINT_IN,
		usb.LIBUSB_REQUEST_GET_DESCRIPTOR,
		(usb.LIBUSB_DT_BOS << 8),
		0,
		usb.LIBUSB_DT_BOS_SIZE,
		function (error, buffer) {
			if (error) {
				// Check BOS descriptor exists
				if (error.errno == usb.LIBUSB_TRANSFER_STALL) return callback(undefined, null);
				return callback(error, null);
			}

			var totalLength = buffer.readUInt16LE(2);
			this.controlTransfer(
				usb.LIBUSB_ENDPOINT_IN,
				usb.LIBUSB_REQUEST_GET_DESCRIPTOR,
				(usb.LIBUSB_DT_BOS << 8),
				0,
				totalLength,
				function (error, buffer) {
					if (error) {
						// Check BOS descriptor exists
						if (error.errno == usb.LIBUSB_TRANSFER_STALL) return callback(undefined, null);
						return callback(error, null);
					}

					var descriptor = {
						bLength: buffer.readUInt8(0),
						bDescriptorType: buffer.readUInt8(1),
						wTotalLength: buffer.readUInt16LE(2),
						bNumDeviceCaps: buffer.readUInt8(4),
						capabilities: []
					};

					var i = usb.LIBUSB_DT_BOS_SIZE;
					while (i < descriptor.wTotalLength) {
						var capability = {
							bLength: buffer.readUInt8(i + 0),
							bDescriptorType: buffer.readUInt8(i + 1),
							bDevCapabilityType: buffer.readUInt8(i + 2)
						};

						capability.dev_capability_data = buffer.slice(i + 3, i + capability.bLength);
						descriptor.capabilities.push(capability);
						i += capability.bLength;
					}

					// Cache descriptor
					this._bosDescriptor = descriptor;
					callback(undefined, this._bosDescriptor);
				}
			);
		}
	);
}

usb.Device.prototype.getCapabilities = function (callback) {
	var capabilities = [];
	var self = this;

	this.getBosDescriptor(function(error, descriptor) {
		if (error) return callback(error, null);

		var len = descriptor ? descriptor.capabilities.length : 0
		for (var i=0; i<len; i++){
			capabilities.push(new Capability(self, i))
		}

		callback(undefined, capabilities);
	});
}

usb.Device.prototype.setConfiguration = function(desired, cb) {
	var self = this;
	this.__setConfiguration(desired, function(err) {
		if (!err) {
			this.interfaces = []
			var len = this.configDescriptor ? this.configDescriptor.interfaces.length : 0
			for (var i=0; i<len; i++) {
				this.interfaces[i] = new Interface(this, i)
			}
		}
		cb.call(self, err)
	});
}

function Interface(device, id){
	this.device = device
	this.id = id
	this.altSetting = 0;
	this.__refresh()
}

Interface.prototype.__refresh = function(){
	this.descriptor = this.device.configDescriptor.interfaces[this.id][this.altSetting]
	this.interfaceNumber = this.descriptor.bInterfaceNumber
	this.endpoints = []
	var len = this.descriptor.endpoints.length
	for (var i=0; i<len; i++){
		var desc = this.descriptor.endpoints[i]
		var c = (desc.bEndpointAddress&usb.LIBUSB_ENDPOINT_IN)?InEndpoint:OutEndpoint
		this.endpoints[i] = new c(this.device, desc)
	}
}

Interface.prototype.claim = function(){
	this.device.__claimInterface(this.id)
}

Interface.prototype.release = function(closeEndpoints, cb){
	var self = this;
	if (typeof closeEndpoints == 'function') {
		cb = closeEndpoints;
		closeEndpoints = null;
	}

	if (!closeEndpoints || this.endpoints.length == 0) {
		next();
	} else {
		var n = self.endpoints.length;
		self.endpoints.forEach(function (ep, i) {
			if (ep.pollActive) {
				ep.once('end', function () {
					if (--n == 0) next();
				});
				ep.stopPoll();
			} else {
				if (--n == 0) next();
			}
		});
	}

	function next () {
		self.device.__releaseInterface(self.id, function(err){
			if (!err){
				self.altSetting = 0;
				self.__refresh()
			}
			cb.call(self, err)
		})
	}
}

Interface.prototype.isKernelDriverActive = function(){
	return this.device.__isKernelDriverActive(this.id)
}

Interface.prototype.detachKernelDriver = function() {
	return this.device.__detachKernelDriver(this.id)
};

Interface.prototype.attachKernelDriver = function() {
	return this.device.__attachKernelDriver(this.id)
};


Interface.prototype.setAltSetting = function(altSetting, cb){
	var self = this;
	this.device.__setInterface(this.id, altSetting, function(err){
		if (!err){
			self.altSetting = altSetting;
			self.__refresh();
		}
		cb.call(self, err)
	})
}

Interface.prototype.endpoint = function(addr){
	for (var i=0; i<this.endpoints.length; i++){
		if (this.endpoints[i].address == addr){
			return this.endpoints[i]
		}
	}
}

function Capability(device, id){
	this.device = device
	this.id = id
	this.descriptor = this.device._bosDescriptor.capabilities[this.id]
	this.type = this.descriptor.bDevCapabilityType
	this.data = this.descriptor.dev_capability_data
}

function Endpoint(device, descriptor){
	this.device = device
	this.descriptor = descriptor
	this.address = descriptor.bEndpointAddress
	this.transferType = descriptor.bmAttributes&0x03
}
util.inherits(Endpoint, events.EventEmitter)

Endpoint.prototype.timeout = 0

Endpoint.prototype.clearHalt = function(callback){
	return this.device.__clearHalt(this.address, callback);
}

Endpoint.prototype.makeTransfer = function(timeout, callback){
	return new usb.Transfer(this.device, this.address, this.transferType, timeout, callback)
}

Endpoint.prototype.startPoll = function(nTransfers, transferSize, callback){
	if (this.pollTransfers){
		throw new Error("Polling already active")
	}

	nTransfers = nTransfers || 3;
	this.pollTransferSize = transferSize || this.descriptor.wMaxPacketSize;
	this.pollActive = true
	this.pollPending = 0

	var transfers = []
	for (var i=0; i<nTransfers; i++){
		transfers[i] = this.makeTransfer(0, callback)
	}
	return transfers;
}

Endpoint.prototype.stopPoll = function(cb){
	if (!this.pollTransfers) {
		throw new Error('Polling is not active.');
	}
	for (var i=0; i<this.pollTransfers.length; i++){
		try {
			this.pollTransfers[i].cancel()
		} catch (err) {
			this.emit('error', err);
		}
	}
	this.pollActive = false
	if (cb) this.once('end', cb);
}

function InEndpoint(device, descriptor){
	Endpoint.call(this, device, descriptor)
}

exports.InEndpoint = InEndpoint
util.inherits(InEndpoint, Endpoint)
InEndpoint.prototype.direction = "in"

InEndpoint.prototype.transfer = function(length, cb){
	var self = this
	var buffer = Buffer.alloc(length)

	function callback(error, buf, actual){
		cb.call(self, error, buffer.slice(0, actual))
	}

	try {
		this.makeTransfer(this.timeout, callback).submit(buffer)
	} catch (e) {
		process.nextTick(function() { cb.call(self, e); });
	}
	return this;
}

InEndpoint.prototype.startPoll = function(nTransfers, transferSize){
	var self = this
	this.pollTransfers = InEndpoint.super_.prototype.startPoll.call(this, nTransfers, transferSize, transferDone)

	function transferDone(error, buf, actual){
		if (!error){
			self.emit("data", buf.slice(0, actual))
		}else if (error.errno != usb.LIBUSB_TRANSFER_CANCELLED){
			self.emit("error", error)
			self.stopPoll()
		}

		if (self.pollActive){
			startTransfer(this)
		}else{
			self.pollPending--

			if (self.pollPending == 0){
				delete self.pollTransfers;
				self.emit('end')
			}
		}
	}

	function startTransfer(t){
		try {
			t.submit(Buffer.alloc(self.pollTransferSize), transferDone);
		} catch (e) {
			self.emit("error", e);
			self.stopPoll();
		}
	}

	this.pollTransfers.forEach(startTransfer)
	self.pollPending = this.pollTransfers.length
}



function OutEndpoint(device, descriptor){
	Endpoint.call(this, device, descriptor)
}
exports.OutEndpoint = OutEndpoint
util.inherits(OutEndpoint, Endpoint)
OutEndpoint.prototype.direction = "out"

OutEndpoint.prototype.transfer = function(buffer, cb){
	var self = this
	if (!buffer){
		buffer = Buffer.alloc(0)
	}else if (!isBuffer(buffer)){
		buffer = Buffer.from(buffer)
	}

	function callback(error, buf, actual){
		if (cb) cb.call(self, error)
	}

	try {
		this.makeTransfer(this.timeout, callback).submit(buffer);
	} catch (e) {
		process.nextTick(function() { callback(e); });
	}

	return this;
}

OutEndpoint.prototype.transferWithZLP = function (buf, cb) {
	if (buf.length % this.descriptor.wMaxPacketSize == 0) {
		this.transfer(buf);
		this.transfer(Buffer.alloc(0), cb);
	} else {
		this.transfer(buf, cb);
	}
}

var hotplugListeners = 0;
exports.on('newListener', function(name) {
	if (name !== 'attach' && name !== 'detach') return;
	if (++hotplugListeners === 1) {
		usb._enableHotplugEvents();
	}
});

exports.on('removeListener', function(name) {
	if (name !== 'attach' && name !== 'detach') return;
	if (--hotplugListeners === 0) {
		usb._disableHotplugEvents();
	}
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/console.js */ "./common/temp/node_modules/node-libs-browser/mock/console.js"), __webpack_require__(/*! ./../node-libs-browser/node_modules/buffer/index.js */ "./common/temp/node_modules/node-libs-browser/node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../process/browser.js */ "./common/temp/node_modules/process/browser.js")))

/***/ })

});
//# sourceMappingURL=workers.0.e4816cca.js.map