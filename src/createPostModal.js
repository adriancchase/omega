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
        while (_) try {
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
import { importHtml } from './utils/htmlUtils.js';
importHtml('createPostModal.html', 'importCreatePostModal').then(function () {
    var _a, _b;
    (_a = document.getElementById('closeCreatePostModal')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', clearAvailableFriendsList);
    (_b = document.getElementById('selectTimeButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', selectTime);
});
function selectTime() {
    return __awaiter(this, void 0, void 0, function () {
        var userName, startTimeInput, endTimeInput, friends, timeInterval_1, availableFriends, availableFriendsList_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Running selectTime function...');
                    clearAvailableFriendsList();
                    userName = 'nhansche';
                    startTimeInput = document.getElementById('startTimeInput').value;
                    endTimeInput = document.getElementById('endTimeInput').value;
                    if (!(startTimeInput.length !== 0 && endTimeInput.length !== 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch("user/".concat(userName, "/friends")).then(function (response) { return response.json(); })];
                case 1:
                    friends = _a.sent();
                    console.log("Friends: ".concat(JSON.stringify(friends)));
                    timeInterval_1 = {
                        start: new Date(startTimeInput),
                        end: new Date(endTimeInput)
                    };
                    console.log("Start: ".concat(JSON.stringify(timeInterval_1.start)));
                    console.log("End: ".concat(JSON.stringify(timeInterval_1.end)));
                    availableFriends = friends.filter(function (friend) { return isAvailableAtTime(friend, timeInterval_1); });
                    console.log("Available Friends: ".concat(JSON.stringify(availableFriends)));
                    availableFriendsList_1 = document.getElementById('availableFriendsList');
                    if (availableFriendsList_1) {
                        availableFriends.forEach(function (friend) { return showAvailableFriend(friend, availableFriendsList_1); });
                    }
                    else {
                        console.error('selectTime() failed: availableFriendsList is null.');
                    }
                    _a.label = 2;
                case 2:
                    console.log('selectTime function finished executing.');
                    return [2 /*return*/];
            }
        });
    });
}
function isAvailableAtTime(user, timeInterval) {
    for (var _i = 0, _a = user.availability; _i < _a.length; _i++) {
        var _b = _a[_i], start = _b.start, end = _b.end;
        var startDate = new Date(start);
        var endDate = new Date(end);
        if (startDate.getTime() < timeInterval.end.getTime() && endDate.getTime() > timeInterval.start.getTime()) {
            return true;
        }
    }
    return false;
}
function showAvailableFriend(friend, availableFriendsList) {
    var listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'available-friend');
    var friendName = document.createElement('span');
    friendName.innerText = "".concat(friend.firstName, " ").concat(friend.lastName);
    var inviteButton = document.createElement('button');
    inviteButton.type = 'button';
    inviteButton.classList.add('btn', 'btn-primary', 'invite-friend-button');
    inviteButton.innerText = 'Invite';
    listItem.appendChild(friendName);
    listItem.appendChild(inviteButton);
    availableFriendsList.appendChild(listItem);
}
function clearAvailableFriendsList() {
    var availableFriendsList = document.getElementById('availableFriendsList');
    if (availableFriendsList) {
        availableFriendsList.innerHTML = '';
    }
}
