"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImage = void 0;
var axios_1 = __importDefault(require("axios"));
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importDefault(require("fs"));
var child_process_1 = require("child_process");
var typicalCarColors = ["black", "white", "silver", "gray", "red", "blue", "green", "yellow", "orange", "brown"];
//Matches different relevant tags to certain types of cars
var carTypesToTags = [
    { type: "sedan", alternatives: ["sedan", "city car"] },
    { type: "SUV", alternatives: ["compact sport utility vehicle", "sport utility vehicle"] },
    { type: "Hatchback", alternatives: ["hatchback", "subcompact car"] },
    { type: "Coupe", alternatives: ["supercar", "sports car", "convertible"] },
    { type: "Ute/Pick Up", alternatives: ["off-road vehicle", "pickup truck"] },
    { type: "Minivan", alternatives: ["minivan", "family car", "mini mpv"] },
    { type: "Super Car", alternatives: ["lamborghini", "maserati", "bugatti", "ferrari", "supercar"] },
];
var callAzureApiWithImageData = function (base64Image) { return __awaiter(void 0, void 0, void 0, function () {
    function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }
    var randNum, imageSrc, bufferData, outputBuffer, python, buf, _a, _b, _c, data, e_1_1, responseData, response, error_1;
    var _d, e_1, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                randNum = Math.random() * 1000;
                imageSrc = "./TEMP_IMAGES/image".concat(randNum.toString(), ".jpg");
                _g.label = 1;
            case 1:
                _g.trys.push([1, 17, , 19]);
                base64Image = base64Image.replace(/^data:image\/\w+;base64,/, "");
                bufferData = Buffer.from(base64Image, "base64");
                return [4 /*yield*/, (0, sharp_1.default)(bufferData).toFormat("jpeg").toBuffer()];
            case 2:
                outputBuffer = _g.sent();
                return [4 /*yield*/, fs_1.default.promises.writeFile(imageSrc, outputBuffer)];
            case 3:
                _g.sent();
                console.log("Image saved as ", imageSrc);
                python = (0, child_process_1.spawn)("python", ["./getAzureImage.py", imageSrc]);
                buf = "";
                _g.label = 4;
            case 4:
                _g.trys.push([4, 9, 10, 15]);
                _a = true, _b = __asyncValues(python.stdout);
                _g.label = 5;
            case 5: return [4 /*yield*/, _b.next()];
            case 6:
                if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                _f = _c.value;
                _a = false;
                data = _f;
                console.log("Pipe data from python script ...");
                buf += data;
                _g.label = 7;
            case 7:
                _a = true;
                return [3 /*break*/, 5];
            case 8: return [3 /*break*/, 15];
            case 9:
                e_1_1 = _g.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 15];
            case 10:
                _g.trys.push([10, , 13, 14]);
                if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                return [4 /*yield*/, _e.call(_b)];
            case 11:
                _g.sent();
                _g.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 14: return [7 /*endfinally*/];
            case 15:
                responseData = buf.toString().replace(/\'/g, '"');
                //Replace T with t and F with f as python booleans are capitalised
                responseData = replaceAll(responseData, "T", "t");
                responseData = replaceAll(responseData, "F", "f");
                response = JSON.parse(responseData);
                // Clean up: Remove the temporary image file
                return [4 /*yield*/, fs_1.default.promises.rm(imageSrc, { force: true })];
            case 16:
                // Clean up: Remove the temporary image file
                _g.sent();
                return [2 /*return*/, response];
            case 17:
                error_1 = _g.sent();
                console.error(error_1);
                // Clean up: Remove the temporary image file
                return [4 /*yield*/, fs_1.default.promises.rm(imageSrc, { force: true })];
            case 18:
                // Clean up: Remove the temporary image file
                _g.sent();
                return [2 /*return*/, error_1];
            case 19: return [2 /*return*/];
        }
    });
}); };
var callAzureApiURL = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var KEY;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                KEY = "d780a27e3b2b4441bc4c940ac82a6223";
                return [4 /*yield*/, axios_1.default
                        .post("https://car-recogniser.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Tags,Brands,Color", { url: url }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Ocp-Apim-Subscription-Key": KEY,
                        },
                    })
                        .then(function (res) {
                        return res.data;
                    })
                        .catch(function (error) {
                        console.error("Error: ", error.response);
                        return false;
                    })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var validateCar = function (tags) {
    for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
        var tag = tags_1[_i];
        if (tag.name === "car") {
            return true;
        }
    }
    return false;
};
var mostLikelyType = function (tags) {
    var carTypeName = undefined;
    var carTypeCOnfidence = 0;
    var carTypes = [];
    var carProbability = {};
    var colours = [];
    //Checks tags against
    tags.forEach(function (tag) {
        for (var _i = 0, carTypesToTags_1 = carTypesToTags; _i < carTypesToTags_1.length; _i++) {
            var type = carTypesToTags_1[_i];
            //Firstly finds the most relavant tag which has the highest confidence and stores that
            if ((type.alternatives.includes(tag.name) && !carTypeName) || tag.name === "minivan" || tag.name === "mini mpv" || tag.name === "hatchback") {
                carTypeName = type.type;
                carTypeCOnfidence = tag.confidence;
            }
            //stores all the relevant types in an object and relevant tags in an array
            if (tag.confidence > 0.85 && type.alternatives.includes(tag.name)) {
                carTypes.push(tag);
                !carProbability[type.type] ? (carProbability[type.type] = 1) : (carProbability[type.type] += 1);
            }
        }
        //check against possible colours
        if (typicalCarColors.includes(tag.name)) {
            colours.push(tag.name);
        }
    });
    //Function will check and validate types and return most likely result
    console.log(carTypes);
    var confirmedType = function () {
        //Firstly checks for likely hood of car image being a minivan
        if (carTypeName === "minivan" && carTypeCOnfidence > 0.9) {
            return "minivan";
        }
        //If not classified as minivan then perform other checks
        else {
            //creates some buffer variables
            var bufferType = [];
            var bufferConfidence = 0;
            for (var key in carProbability) {
                if (carProbability[key] > bufferConfidence) {
                    //if the iterated type of car was more likely will replace the current buffer
                    bufferType = [];
                    bufferType.push(key);
                    bufferConfidence = carProbability[key];
                }
                //If the found car types match then add to array to check later
                else if (carProbability[key] === bufferConfidence) {
                    bufferType.push(key);
                }
            }
            //If array contains more than one car type perform more checks
            if (bufferType.length > 1) {
                var confirmedCar_1 = carTypeName;
                carTypes.forEach(function (t) {
                    if (t.name === "hatchback" || t.name === "subcompact car") {
                        confirmedCar_1 = "hatchback";
                    }
                });
                return confirmedCar_1;
            }
            return bufferType[0];
        }
    };
    return { type: confirmedType(), colours: colours };
};
var checkImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, url, isUrl, azureRes, brands, tags, isCar, type, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                _a = req.body, url = _a.url, isUrl = _a.isUrl;
                if (!(!isUrl || url.includes("base64,/"))) return [3 /*break*/, 2];
                return [4 /*yield*/, callAzureApiWithImageData(url)];
            case 1:
                azureRes = _d.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, callAzureApiURL(url)];
            case 3:
                azureRes = _d.sent();
                _d.label = 4;
            case 4:
                //if the api response works with no errors then validate data, otherwise send an error response back to client
                if (azureRes) {
                    brands = azureRes.brands, tags = azureRes.tags;
                    isCar = validateCar(tags);
                    console.log(tags, brands);
                    if (!isCar) {
                        res.status(400).send({ message: "The image is not a car" });
                    }
                    else {
                        type = mostLikelyType(tags);
                        res.status(200).send({ type: type.type, colours: type.colours, brand: (_c = brands[0]) === null || _c === void 0 ? void 0 : _c.name, message: "string" });
                    }
                }
                else {
                    res.status(400).send({ message: "The image could not be used. Please try another image." });
                }
                return [3 /*break*/, 6];
            case 5:
                _b = _d.sent();
                res.status(500).send({ message: "An internal server error occured. Please try a different image" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.checkImage = checkImage;
