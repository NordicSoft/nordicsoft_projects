/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "8cb23a0d717d5d2133a9";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "custom_styles";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "8cb23a0d717d5d2133a9";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "custom_styles";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: [],
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(2)(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ClientApp/src/assets/js/custom_styles.js":
/*!**************************************************!*\
  !*** ./ClientApp/src/assets/js/custom_styles.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./ClientApp/src/assets/scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./ClientApp/src/assets/js/custom_styles.js?");

/***/ }),

/***/ "./ClientApp/src/assets/scss/style.scss":
/*!**********************************************!*\
  !*** ./ClientApp/src/assets/scss/style.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--5-1!../../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./style.scss */ \"./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./ClientApp/src/assets/scss/style.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../../../node_modules/css-loader??ref--5-1!../../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./style.scss */ \"./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./ClientApp/src/assets/scss/style.scss\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--5-1!../../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./style.scss */ \"./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./ClientApp/src/assets/scss/style.scss\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./ClientApp/src/assets/scss/style.scss?");

/***/ }),

/***/ "./node_modules/ansi-html/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = ansiHTML\n\n// Reference to https://github.com/sindresorhus/ansi-regex\nvar _regANSI = /(?:(?:\\u001b\\[)|\\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\\u001b[A-M]/\n\nvar _defColors = {\n  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]\n  black: '000',\n  red: 'ff0000',\n  green: '209805',\n  yellow: 'e8bf03',\n  blue: '0000ff',\n  magenta: 'ff00ff',\n  cyan: '00ffee',\n  lightgrey: 'f0f0f0',\n  darkgrey: '888'\n}\nvar _styles = {\n  30: 'black',\n  31: 'red',\n  32: 'green',\n  33: 'yellow',\n  34: 'blue',\n  35: 'magenta',\n  36: 'cyan',\n  37: 'lightgrey'\n}\nvar _openTags = {\n  '1': 'font-weight:bold', // bold\n  '2': 'opacity:0.5', // dim\n  '3': '<i>', // italic\n  '4': '<u>', // underscore\n  '8': 'display:none', // hidden\n  '9': '<del>' // delete\n}\nvar _closeTags = {\n  '23': '</i>', // reset italic\n  '24': '</u>', // reset underscore\n  '29': '</del>' // reset delete\n}\n\n;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {\n  _closeTags[n] = '</span>'\n})\n\n/**\n * Converts text with ANSI color codes to HTML markup.\n * @param {String} text\n * @returns {*}\n */\nfunction ansiHTML (text) {\n  // Returns the text if the string has no ANSI escape code.\n  if (!_regANSI.test(text)) {\n    return text\n  }\n\n  // Cache opened sequence.\n  var ansiCodes = []\n  // Replace with markup.\n  var ret = text.replace(/\\033\\[(\\d+)*m/g, function (match, seq) {\n    var ot = _openTags[seq]\n    if (ot) {\n      // If current sequence has been opened, close it.\n      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast\n        ansiCodes.pop()\n        return '</span>'\n      }\n      // Open tag.\n      ansiCodes.push(seq)\n      return ot[0] === '<' ? ot : '<span style=\"' + ot + ';\">'\n    }\n\n    var ct = _closeTags[seq]\n    if (ct) {\n      // Pop sequence\n      ansiCodes.pop()\n      return ct\n    }\n    return ''\n  })\n\n  // Make sure tags are closed.\n  var l = ansiCodes.length\n  ;(l > 0) && (ret += Array(l + 1).join('</span>'))\n\n  return ret\n}\n\n/**\n * Customize colors.\n * @param {Object} colors reference to _defColors\n */\nansiHTML.setColors = function (colors) {\n  if (typeof colors !== 'object') {\n    throw new Error('`colors` parameter must be an Object.')\n  }\n\n  var _finalColors = {}\n  for (var key in _defColors) {\n    var hex = colors.hasOwnProperty(key) ? colors[key] : null\n    if (!hex) {\n      _finalColors[key] = _defColors[key]\n      continue\n    }\n    if ('reset' === key) {\n      if (typeof hex === 'string') {\n        hex = [hex]\n      }\n      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {\n        return typeof h !== 'string'\n      })) {\n        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')\n      }\n      var defHexColor = _defColors[key]\n      if (!hex[0]) {\n        hex[0] = defHexColor[0]\n      }\n      if (hex.length === 1 || !hex[1]) {\n        hex = [hex[0]]\n        hex.push(defHexColor[1])\n      }\n\n      hex = hex.slice(0, 2)\n    } else if (typeof hex !== 'string') {\n      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')\n    }\n    _finalColors[key] = hex\n  }\n  _setTags(_finalColors)\n}\n\n/**\n * Reset colors.\n */\nansiHTML.reset = function () {\n  _setTags(_defColors)\n}\n\n/**\n * Expose tags, including open and close.\n * @type {Object}\n */\nansiHTML.tags = {}\n\nif (Object.defineProperty) {\n  Object.defineProperty(ansiHTML.tags, 'open', {\n    get: function () { return _openTags }\n  })\n  Object.defineProperty(ansiHTML.tags, 'close', {\n    get: function () { return _closeTags }\n  })\n} else {\n  ansiHTML.tags.open = _openTags\n  ansiHTML.tags.close = _closeTags\n}\n\nfunction _setTags (colors) {\n  // reset all\n  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]\n  // inverse\n  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]\n  // dark grey\n  _openTags['90'] = 'color:#' + colors.darkgrey\n\n  for (var code in _styles) {\n    var color = _styles[code]\n    var oriColor = colors[color] || '000'\n    _openTags[code] = 'color:#' + oriColor\n    code = parseInt(code)\n    _openTags[(code + 10).toString()] = 'background:#' + oriColor\n  }\n}\n\nansiHTML.reset()\n\n\n//# sourceURL=webpack:///./node_modules/ansi-html/index.js?");

/***/ }),

/***/ "./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports = function () {\n\treturn /[\\u001b\\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;\n};\n\n\n//# sourceURL=webpack:///./node_modules/ansi-regex/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./ClientApp/src/assets/scss/style.scss":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/sass-loader/lib/loader.js??ref--5-2!./ClientApp/src/assets/scss/style.scss ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(true);\n// imports\nexports.push([module.i, \"@import url(http://fonts.googleapis.com/css?family=PT+Serif:400,700,400italic,700italic);\", \"\"]);\nexports.push([module.i, \"@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800);\", \"\"]);\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css?family=Dancing+Script:400,700);\", \"\"]);\n\n// module\nexports.push([module.i, \"body {\\n  overflow-x: hidden;\\n  font-family: \\\"Open Sans\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n  background-color: #ffffff;\\n  font-weight: 400;\\n  line-height: 1.75;\\n  color: #333;\\n}\\n\\n.heading-font, .navbar-default .navbar-brand, .navbar-default .nav li a {\\n  font-family: \\\"Open Sans\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n  text-transform: none;\\n}\\n\\n.secondary-font {\\n  font-family: \\\"Dancing Script\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n  text-transform: none;\\n}\\n\\n.theme-accent-color {\\n  color: #C10E1F;\\n}\\n\\n.text-muted {\\n  color: #444;\\n}\\n\\n.text-primary {\\n  color: #333;\\n}\\n\\np {\\n  font-size: 14px;\\n  line-height: 26px;\\n}\\n\\np.large {\\n  font-size: 16px;\\n}\\n\\na,\\na:hover,\\na:focus,\\na:active,\\na.active {\\n  outline: 0;\\n  text-decoration: none;\\n}\\n\\na {\\n  color: #333;\\n}\\n\\na:hover,\\na:focus,\\na:active,\\na.active {\\n  color: #C10E1F;\\n}\\n\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6 {\\n  font-family: \\\"Open Sans\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n  text-transform: uppercase;\\n  font-weight: 700;\\n  letter-spacing: 1px;\\n}\\n\\n.img-centered {\\n  margin: 0 auto;\\n}\\n\\n.gap {\\n  margin-bottom: 60px;\\n}\\n\\n.mb30 {\\n  margin-bottom: 30px;\\n  display: block;\\n}\\n\\n.mb-45 {\\n  margin-bottom: 45px;\\n}\\n\\n.mb50 {\\n  margin-bottom: 50px;\\n  display: block;\\n}\\n\\n.mb100 {\\n  margin-bottom: 100px;\\n}\\n\\n.nomarginbottom {\\n  margin-bottom: 0;\\n}\\n\\n.mt20 {\\n  margin-top: 20px;\\n}\\n\\n.mt30 {\\n  margin-top: 30px;\\n}\\n\\n.mt60 {\\n  margin-top: 60px;\\n}\\n\\n.mt120 {\\n  margin-top: 120px;\\n}\\n\\n.ptb {\\n  padding-top: 45px;\\n  padding-bottom: 45px;\\n}\\n\\n.nopaddingtop {\\n  padding-top: 0 !important;\\n}\\n\\n.nopaddingbottom {\\n  padding-bottom: 0 !important;\\n}\\n\\n.nopadding-lr {\\n  padding-left: 0 !important;\\n  padding-right: 0 !important;\\n}\\n\\n.nopadding-l {\\n  padding-left: 0 !important;\\n}\\n\\n.pad-sides-60 {\\n  padding-left: 60px !important;\\n  padding-right: 60px !important;\\n}\\n\\n.thin {\\n  font-weight: 300;\\n}\\n\\n.btn:focus,\\n.btn:active,\\n.btn.active,\\n.btn:active:focus {\\n  outline: 0;\\n}\\n\\n::-moz-selection {\\n  color: #fff;\\n  text-shadow: none;\\n  background: #333;\\n}\\n\\n::selection {\\n  color: #fff;\\n  text-shadow: none;\\n  background: #333;\\n}\\n\\n.list-unstyled {\\n  margin-bottom: 0;\\n}\\n\\nimg::selection {\\n  background: 0 0;\\n}\\n\\nimg::-moz-selection {\\n  background: 0 0;\\n}\\n\\n.img-responsive,\\n.thumbnail > img,\\n.thumbnail a > img,\\n.carousel-inner > .item > img,\\n.carousel-inner > .item > a > img {\\n  width: 100%;\\n}\\n\\n.img-thumbnail {\\n  border: none;\\n}\\n\\n.smoothie,\\n.smoothie:hover {\\n  -webkit-transition: all 0.5s ease-in-out;\\n  -moz-transition: all 0.5s ease-in-out;\\n  -o-transition: all 0.5s ease-in-out;\\n  -ms-transition: all 0.5s ease-in-out;\\n  transition: all 0.5s ease-in-out;\\n}\\n\\n.col-md-5th {\\n  width: 20%;\\n}\\n\\n.thin-hr {\\n  width: 180px;\\n  margin: 45px auto;\\n}\\n.light-wrapper .thin-hr {\\n  border-color: #333333;\\n}\\n.dark-wrapper .thin-hr {\\n  border-color: #f3f3f3;\\n}\\n\\n/*.thin-hr {\\r\\n    margin: 30px 0 40px;\\r\\n    width: 100%;\\r\\n    clear: both;\\r\\n    display: block;\\r\\n    position: relative;\\r\\n    border: none;\\r\\n    text-align: center;\\r\\n}*/\\n/*.thin-hr.bordered {\\r\\n    margin: 20px 0;\\r\\n    width: 100%;\\r\\n    clear: both;\\r\\n    display: block;\\r\\n    position: relative;\\r\\n    border: 1px solid #333;\\r\\n}\\r\\n\\r\\n.thin-hr:after {\\r\\n    content: '';\\r\\n    position: absolute;\\r\\n    width: 180px;\\r\\n    height: 2px;\\r\\n    background-color: #333;\\r\\n    left: 50%;\\r\\n    margin-left: -80px;\\r\\n}\\r\\n\\r\\n.thin-hr:before {\\r\\n    font-family: 'FontAwesome';\\r\\n    content: \\\"\\\\f004\\\";\\r\\n    color: #C10E1F;\\r\\n    position: absolute;\\r\\n    width: 180px;\\r\\n    margin-left: -80px;\\r\\n    margin-top: -10px;\\r\\n    z-index: 5;\\r\\n}*/\\n.rotate-45 {\\n  -moz-transform: rotate(45deg);\\n  -webkit-transform: rotate(45deg);\\n  -o-transform: rotate(45deg);\\n  -ms-transform: rotate(45deg);\\n  transform: rotate(45deg);\\n}\\n\\n.icon-large {\\n  font-size: 40px;\\n}\\n\\n.background-cover {\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n}\\n\\n.lead {\\n  font-size: 18px;\\n  line-height: 32px;\\n}\\n\\n.white {\\n  color: white;\\n}\\n\\n@media (max-width: 767px) {\\n  .max-sm-width {\\n    max-width: 450px;\\n    margin-left: auto;\\n    margin-right: auto;\\n  }\\n}\\n.btn {\\n  font-family: \\\"Open Sans\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n}\\n\\n.btn:focus,\\n.btn:active:focus,\\n.btn.active:focus,\\n.btn:active,\\n.btn.active {\\n  outline: none;\\n  box-shadow: none;\\n}\\n\\n.btn-primary {\\n  border-color: #333333;\\n  border-radius: 0;\\n  text-transform: uppercase;\\n  font-weight: 700;\\n  color: #333333;\\n  background-color: transparent;\\n  padding: 15px 30px;\\n  letter-spacing: 1px;\\n  -webkit-transition: all 0.5s ease-in-out;\\n  -moz-transition: all 0.5s ease-in-out;\\n  -o-transition: all 0.5s ease-in-out;\\n  -ms-transition: all 0.5s ease-in-out;\\n  transition: all 0.5s ease-in-out;\\n}\\n\\n.btn-primary.btn-transparent {\\n  border-color: transparent !important;\\n}\\n\\n.btn-primary.btn-transparent:hover,\\n.btn-primary.btn-transparent:active,\\n.btn-primary.btn-transparent:focus,\\n.btn-primary.btn-transparent.active {\\n  color: #a7a7a7;\\n  border-color: transparent !important;\\n  background-color: transparent !important;\\n}\\n\\n.btn-primary:hover,\\n.btn-primary:focus,\\n.btn-primary:active,\\n.btn-primary.active,\\n.open .dropdown-toggle.btn-primary {\\n  border-color: #333333;\\n  color: #f3f3f3;\\n  background-color: #333333;\\n  -webkit-transition: all 0.5s ease-in-out;\\n  -moz-transition: all 0.5s ease-in-out;\\n  -o-transition: all 0.5s ease-in-out;\\n  -ms-transition: all 0.5s ease-in-out;\\n  transition: all 0.5s ease-in-out;\\n}\\n\\n.btn-primary:active,\\n.btn-primary.active,\\n.open .dropdown-toggle.btn-primary {\\n  background-image: none;\\n}\\n\\n.btn-primary.disabled,\\n.btn-primary[disabled],\\nfieldset[disabled] .btn-primary,\\n.btn-primary.disabled:hover,\\n.btn-primary[disabled]:hover,\\nfieldset[disabled] .btn-primary:hover,\\n.btn-primary.disabled:focus,\\n.btn-primary[disabled]:focus,\\nfieldset[disabled] .btn-primary:focus,\\n.btn-primary.disabled:active,\\n.btn-primary[disabled]:active,\\nfieldset[disabled] .btn-primary:active,\\n.btn-primary.disabled.active,\\n.btn-primary[disabled].active,\\nfieldset[disabled] .btn-primary.active {\\n  border-color: #333333;\\n  background-color: #333333;\\n}\\n\\n.btn-default,\\n.btn-default.disabled {\\n  border-color: transparent;\\n}\\n\\n.btn-white {\\n  border-color: #f3f3f3;\\n  color: #f3f3f3;\\n}\\n\\n.btn-primary:hover,\\n.btn-primary:focus,\\n.btn-primary:active,\\n.btn-primary.active {\\n  border-color: #f3f3f3;\\n  color: #333333;\\n  background-color: #f3f3f3;\\n}\\n\\n.navbar-nav {\\n  float: none;\\n  margin: 0 auto;\\n}\\n\\n.navbar-nav > li {\\n  float: none;\\n  display: inline-block;\\n}\\n\\n.navbar-default {\\n  border-color: transparent;\\n  background-color: transparent;\\n}\\n\\n.navbar-default .navbar-brand, .navbar-default .nav li a.navbar-brand {\\n  margin-top: 0;\\n  letter-spacing: 5px;\\n  font-size: 40px;\\n  font-weight: 700;\\n  font-family: \\\"Dancing Script\\\";\\n  text-transform: none;\\n  color: white;\\n  line-height: 40px;\\n  padding: 21px 25px 30px;\\n}\\n\\n.navbar-default .navbar-brand:hover,\\n.navbar-default .navbar-brand:focus,\\n.navbar-default .navbar-brand:active,\\n.navbar-default .navbar-brand.active {\\n  color: #333333;\\n}\\n\\n.navbar-default .navbar-collapse {\\n  border-color: rgba(255, 255, 255, 0.02);\\n}\\n\\n.navbar-default .navbar-toggle,\\n.navbar-default .navbar-toggle:hover,\\n.navbar-default .navbar-toggle:focus {\\n  border-color: transparent;\\n  background-color: transparent;\\n}\\n\\n.navbar-default .navbar-toggle .icon-bar {\\n  background-color: white;\\n}\\n\\n.caret {\\n  margin-top: -3px;\\n}\\n\\n.navbar-default .nav li a {\\n  text-transform: uppercase;\\n  font-weight: 700;\\n  font-size: 14px;\\n  color: #333333;\\n  padding: 25px 15px;\\n  -webkit-transition: all 0.5s ease-in-out;\\n  -moz-transition: all 0.5s ease-in-out;\\n  -o-transition: all 0.5s ease-in-out;\\n  -ms-transition: all 0.5s ease-in-out;\\n  transition: all 0.5s ease-in-out;\\n  letter-spacing: 1px;\\n}\\n\\n.navbar-default.background--dark .nav li > a,\\n.navbar-default.background--dark .navbar-brand,\\n#headerwrap.background--dark .intro-text, .navbar-default .nav li > a,\\n.navbar-default .navbar-brand,\\n#headerwrap .intro-text {\\n  color: #f3f3f3;\\n}\\n\\n.navbar-default .nav li a:hover, .navbar-default .nav li a:focus {\\n  color: white;\\n}\\n\\n.navbar-default .nav li.dropdown.open > a, .navbar-default .dropdown-menu a {\\n  color: #333333 !important;\\n}\\n\\n.navbar-default .nav .dropdown-menu li a {\\n  padding: 15px 20px;\\n  font-size: 14px;\\n}\\n\\n#headerwrap .btn-primary {\\n  border-color: #f3f3f3;\\n  color: #f3f3f3;\\n}\\n\\n.navbar-default .nav li a:hover,\\n.navbar-default .nav li a:focus {\\n  outline: 0;\\n  color: #333333;\\n}\\n\\n.navbar-default .navbar-nav > .active > a {\\n  border-radius: 0;\\n  background-color: transparent;\\n  color: white;\\n  -webkit-transition: all 0.5s ease-in-out;\\n  -moz-transition: all 0.5s ease-in-out;\\n  -o-transition: all 0.5s ease-in-out;\\n  -ms-transition: all 0.5s ease-in-out;\\n  transition: all 0.5s ease-in-out;\\n}\\n\\n.navbar-default.navbar-shrink .nav li > a,\\n.navbar-default.navbar-shrink .navbar-brand {\\n  color: #333333;\\n}\\n\\n.navbar-default .navbar-nav > .active > a:hover,\\n.navbar-default .navbar-nav > .active > a:focus {\\n  color: #c10e1f;\\n  background-color: transparent;\\n}\\n\\n.dropdown-menu {\\n  position: absolute;\\n  top: 100%;\\n  left: 0;\\n  z-index: 1000;\\n  display: none;\\n  float: left;\\n  min-width: 160px;\\n  padding: 0;\\n  margin: 2px 0 0;\\n  font-size: 12px;\\n  text-align: left;\\n  list-style: none;\\n  background-color: white;\\n  -webkit-background-clip: padding-box;\\n  background-clip: padding-box;\\n  border: none;\\n  border-radius: 0;\\n  -webkit-box-shadow: none;\\n  box-shadow: none;\\n}\\n\\n.navbar-default.navbar-shrink .nav .dropdown-menu li a {\\n  color: #333333;\\n}\\n\\n.navbar-default.navbar-shrink .nav .dropdown-menu li a:hover,\\n.navbar-default .nav .dropdown-menu li a:hover {\\n  color: #333333;\\n  background-color: #eeeeee;\\n}\\n\\n@media (max-width: 767px) {\\n  .navbar-default .nav li > a,\\n.navbar-default.navbar-shrink .nav li > a {\\n    color: #333333;\\n  }\\n\\n  .navbar-default,\\n.navbar-default.navbar-shrink {\\n    background-color: white;\\n  }\\n\\n  .navbar-default .navbar-brand.logo {\\n    padding: 0;\\n    color: #333333;\\n  }\\n\\n  #main-navigation {\\n    background-color: white;\\n  }\\n\\n  .navbar-default .navbar-toggle .icon-bar {\\n    background-color: #333333;\\n  }\\n}\\n@media (max-width: 419px) {\\n  .navbar-default .nav li a {\\n    padding: 15px 9px;\\n  }\\n\\n  .navbar-default .navbar-brand.logo {\\n    font-size: 24px;\\n    line-height: 50px;\\n  }\\n}\\n/*-----------------------------------------------------------------------------------*/\\n/*  5 - HEADER\\r\\n/*-----------------------------------------------------------------------------------*/\\n#headerwrap {\\n  overflow: hidden;\\n}\\n\\n.opaque {\\n  background-color: transparent !important;\\n}\\n\\n.backstretch:before {\\n  content: \\\"\\\";\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  background-color: rgba(91, 91, 88, 0.4);\\n  top: 0;\\n  left: 0;\\n}\\n\\n#tubular-container {\\n  z-index: -1 !important;\\n  position: absolute !important;\\n}\\n\\nheader {\\n  text-align: center;\\n  color: #333;\\n}\\n\\nheader .intro-text {\\n  padding-top: 100px;\\n  padding-bottom: 50px;\\n  color: #333;\\n}\\n\\nheader .intro-text .intro-lead-in {\\n  margin-bottom: 25px;\\n  font-size: 22px;\\n  text-transform: none;\\n  line-height: 22px;\\n}\\n\\nheader .intro-text .intro-heading {\\n  font-size: 48px;\\n  margin-bottom: 60px;\\n  text-transform: uppercase;\\n  font-size: 30px;\\n  font-weight: 300;\\n  line-height: 30px;\\n}\\n\\n.intro-heading span {\\n  clear: both;\\n  display: block;\\n  margin-bottom: 24px;\\n  font-size: 70px;\\n  line-height: 1;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  6 - SECTIONS\\r\\n/*-----------------------------------------------------------------------------------*/\\nsection {\\n  /*background-color: #ffffff;*/\\n  clear: both;\\n  position: relative;\\n}\\n\\n/*.silver-bg {\\r\\n    background-color: #DADFE1\\r\\n}\\r\\n\\r\\n.dark-wrapper {\\r\\n    background-color: #111111\\r\\n}*/\\n.white-bg {\\n  background-color: white;\\n}\\n\\n.dark-wrapper.opaqued, .dark-opaqued {\\n  position: relative;\\n  /*background-color: rgba(91, 91, 88, 0.6);*/\\n}\\n.dark-wrapper.opaqued:before, .dark-opaqued:before {\\n  content: \\\"\\\";\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n  background-color: rgba(91, 91, 88, 0.6);\\n}\\n\\n.light-opaqued {\\n  position: relative;\\n  /*background-color: rgba(91, 91, 88, 0.6);*/\\n}\\n.light-opaqued:before {\\n  content: \\\"\\\";\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n  background-color: rgba(91, 91, 88, 0.6);\\n}\\n\\n#headerwrap.opaqued {\\n  background-color: rgba(0, 0, 0, 0.4);\\n}\\n\\n.dark-wrapper h1,\\n.dark-wrapper h2,\\n.dark-wrapper h3,\\n.dark-wrapper h4,\\n.dark-wrapper h5,\\n.dark-wrapper h6,\\n.dark-wrapper p,\\n.dark-wrapper a,\\n.dark-wrapper {\\n  color: #f3f3f3;\\n}\\n\\n.section-inner {\\n  padding: 120px 0;\\n}\\n@media (max-width: 575px) {\\n  .section-inner {\\n    padding: 45px 0;\\n  }\\n}\\n\\nsection h2.section-heading, .section-heading {\\n  margin-top: 0;\\n  margin-bottom: 10px;\\n  font-size: 34px;\\n  letter-spacing: 5px;\\n}\\n\\nsection h3.section-subheading {\\n  text-transform: lowercase;\\n  font-size: 25px;\\n  font-weight: 400;\\n  clear: both;\\n  display: block;\\n  padding-top: 10px;\\n  letter-spacing: 1px;\\n}\\n\\n.cl-effect-3 a {\\n  padding: 8px 0;\\n}\\n\\n.cl-effect-3 a::after {\\n  position: absolute;\\n  top: 100%;\\n  left: 0;\\n  width: 100%;\\n  height: 3px;\\n  background: rgba(255, 255, 255, 0.5);\\n  content: \\\"\\\";\\n  opacity: 0;\\n  margin-top: -3px;\\n  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;\\n  -moz-transition: opacity 0.3s, -moz-transform 0.3s;\\n  transition: opacity 0.3s, transform 0.3s;\\n  -webkit-transform: translateY(10px);\\n  -moz-transform: translateY(10px);\\n  transform: translateY(10px);\\n}\\n\\n.navbar-shrink .cl-effect-3 a::after {\\n  background: rgba(0, 0, 0, 0.2);\\n}\\n\\n.cl-effect-3 a:hover::after,\\n.cl-effect-3 a:focus::after {\\n  opacity: 1;\\n  -webkit-transform: translateY(0px);\\n  -moz-transform: translateY(0px);\\n  transform: translateY(0px);\\n}\\n\\nfooter {\\n  padding: 15px 0;\\n}\\n\\n.item-caption .lead {\\n  font-size: 14px;\\n  text-align: center;\\n}\\n.item-caption .lead.secondary-font {\\n  font-size: 21px;\\n  text-align: right;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  10 - HOVER CAPTIONS \\r\\n/*-----------------------------------------------------------------------------------*/\\n.hover-item {\\n  position: relative;\\n  overflow: hidden;\\n}\\n\\n.hover-item img {\\n  -moz-transform: scale(1);\\n  -webkit-transform: scale(1);\\n  -o-transform: scale(1);\\n  -ms-transform: scale(1);\\n  transform: scale(1);\\n}\\n\\n.overlay-item-caption {\\n  opacity: 1;\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  left: 0;\\n  top: 0;\\n  background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0.75) 100%);\\n  /* FF3.6+ */\\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(28%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0.75)));\\n  /* Chrome,Safari4+ */\\n  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0.75) 100%);\\n  /* Chrome10+,Safari5.1+ */\\n  background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0.75) 100%);\\n  /* Opera 11.10+ */\\n  background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0.75) 100%);\\n  /* IE10+ */\\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0.75) 100%);\\n  /* W3C */\\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\\\"#00000000\\\", endColorstr=\\\"#a6000000\\\",GradientType=0 );\\n  /* IE6-9 */\\n  text-align: center;\\n  text-shadow: 0 0 1px #000;\\n}\\n\\n.hover-item-caption {\\n  opacity: 0;\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  left: 0;\\n  top: 0px;\\n  background-color: rgba(0, 0, 0, 0.8);\\n  text-align: center;\\n  z-index: 2;\\n}\\n\\n.hover-item:hover .hover-item-caption {\\n  opacity: 1;\\n}\\n\\n.hover-item-caption h3, .hover-item-caption .smoothie {\\n  top: 30px;\\n  position: relative;\\n}\\n\\n.hover-item:hover .hover-item-caption h3, .hover-item:hover .smoothie {\\n  top: 0px;\\n}\\n\\n.hover-item:hover .overlay-item-caption {\\n  opacity: 0;\\n  top: 30px;\\n}\\n\\n.hover-item:hover .overlay-item-caption .vertical-center {\\n  opacity: 0;\\n}\\n\\n.hover-item:hover img {\\n  -moz-transform: scale(1.2);\\n  -webkit-transform: scale(1.2);\\n  -o-transform: scale(1.2);\\n  -ms-transform: scale(1.2);\\n  transform: scale(1.2);\\n}\\n\\n.hover-item-caption h3, .overlay-item-caption h3 {\\n  font-size: 26px;\\n  margin: 0;\\n  color: #fefefe;\\n  font-weight: 400;\\n  letter-spacing: 7px;\\n}\\n\\n.overlay-item-caption strong {\\n  color: #fefefe;\\n  padding-bottom: 16px;\\n  font-weight: 400;\\n  text-transform: uppercase;\\n  display: block;\\n  letter-spacing: 4px;\\n}\\n\\n.overlay-item-caption .thin-hr:after, .dark-wrapper .thin-hr:after {\\n  background-color: #fff;\\n}\\n\\n.overlay-item-caption .post-excerpt {\\n  font-style: italic;\\n  color: #fefefe;\\n  padding-top: 16px;\\n  font-size: 16px;\\n  padding-left: 15%;\\n  padding-right: 15%;\\n}\\n\\n.hover-item-caption h3 span, .overlay-item-caption h3 span, .hover-item-caption h2 span {\\n  clear: both;\\n  display: block;\\n  text-transform: none;\\n  font-size: 20px;\\n  color: #fefefe;\\n}\\n\\n.hover-item-caption h2 span {\\n  display: inline-block;\\n}\\n\\n.hover-item-caption a, .overlay-item-caption a {\\n  color: #fefefe;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  11 - FOOTER\\r\\n/*-----------------------------------------------------------------------------------*/\\n#footer-widgets {\\n  border-top: 1px solid #333;\\n}\\n\\n#footer-widgets .section-inner {\\n  padding-bottom: 80px;\\n}\\n\\nfooter.white-wrapper {\\n  padding: 120px 0;\\n  clear: both;\\n}\\n\\nfooter.white-wrapper span.copyright {\\n  letter-spacing: 1px;\\n  text-transform: uppercase;\\n  text-transform: none;\\n  line-height: 40px;\\n}\\n\\nfooter.white-wrapper .social-links li {\\n  padding: 15px 30px;\\n}\\n\\nfooter.white-wrapper .social-links li a {\\n  text-transform: uppercase;\\n  letter-spacing: 1px;\\n  font-size: 26px;\\n}\\n\\n.widget-title {\\n  margin-bottom: 30px;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  12 - CAROUSEL STYLES\\r\\n/*-----------------------------------------------------------------------------------*/\\n.fw-carousel .owl-item {\\n  padding: 0;\\n}\\n.fw-carousel .hover-item-caption h3 {\\n  font-size: 20px;\\n}\\n\\n.owl-theme .owl-controls {\\n  counter-reset: owl;\\n}\\n.owl-theme .owl-controls .owl-page {\\n  /*&:first-child{\\r\\n      transform: rotate(180deg);\\r\\n  }*/\\n}\\n.owl-theme .owl-controls .owl-page span {\\n  position: relative;\\n  border: none;\\n  /*width: 10px;\\r\\n  height: 18px;\\r\\n  border: 9px solid transparent;\\r\\n  border-left: 10px solid rgb(255, 255, 255);*/\\n}\\n.owl-theme .owl-controls .owl-page span:before {\\n  counter-increment: owl;\\n  content: counter(owl);\\n  position: absolute;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  14 - SPLASH\\r\\n/*-----------------------------------------------------------------------------------*/\\n.preloader {\\n  background-color: #ffffff;\\n  position: fixed;\\n  width: 100%;\\n  height: 100%;\\n  z-index: 9999999;\\n  top: 0;\\n  left: 0;\\n}\\n\\n.preloader span {\\n  text-transform: none;\\n  font-size: 34px;\\n}\\n\\n.preloader .preloader-img {\\n  width: 40px;\\n  height: 40px;\\n  position: absolute;\\n  top: 50%;\\n  left: 50%;\\n  margin-left: -20px;\\n  margin-top: -40px;\\n}\\n\\n.preloader .preloader-img img {\\n  max-height: 40px;\\n}\\n\\n@keyframes flickerAnimation {\\n  0% {\\n    opacity: 1;\\n  }\\n  50% {\\n    opacity: 0.8;\\n  }\\n  100% {\\n    opacity: 1;\\n  }\\n}\\n@-o-keyframes flickerAnimation {\\n  0% {\\n    opacity: 1;\\n  }\\n  50% {\\n    opacity: 0.8;\\n  }\\n  100% {\\n    opacity: 1;\\n  }\\n}\\n@-moz-keyframes flickerAnimation {\\n  0% {\\n    opacity: 1;\\n  }\\n  50% {\\n    opacity: 0.8;\\n  }\\n  100% {\\n    opacity: 1;\\n  }\\n}\\n@-webkit-keyframes flickerAnimation {\\n  0% {\\n    opacity: 1;\\n  }\\n  50% {\\n    opacity: 0.8;\\n  }\\n  100% {\\n    opacity: 1;\\n  }\\n}\\n.animate-flicker {\\n  -webkit-animation: flickerAnimation 2s infinite;\\n  -moz-animation: flickerAnimation 2s infinite;\\n  -o-animation: flickerAnimation 2s infinite;\\n  animation: flickerAnimation 2s infinite;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  15 - MAP\\r\\n/*-----------------------------------------------------------------------------------*/\\n#mapwrapper {\\n  max-height: 230px;\\n  clear: both;\\n  position: relative;\\n  display: block;\\n}\\n\\n#mapwrapper iframe {\\n  /*-webkit-filter: grayscale(100%);\\r\\n  -moz-filter: grayscale(100%);\\r\\n  -ms-filter: grayscale(100%);\\r\\n  -o-filter: grayscale(100%);\\r\\n  filter: grayscale(100%);\\r\\n  filter: url(grayscale.svg);*/\\n  /* Firefox 4+ */\\n  filter: gray;\\n  /* IE 6-9 */\\n  max-width: 100%;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  16 - FORM CONTROL\\r\\n/*-----------------------------------------------------------------------------------*/\\n.dark-wrapper textarea.form-control {\\n  background-color: rgba(213, 223, 220, 0.2);\\n  border: 1px solid #d5dfdc;\\n  margin-bottom: 10px;\\n  height: 180px;\\n}\\n\\n.dark-wrapper input.form-control {\\n  background-color: rgba(213, 223, 220, 0.2);\\n  border: 1px solid #d5dfdc;\\n  margin-bottom: 10px;\\n  float: left;\\n  width: calc(50% - 5px);\\n}\\n@media (max-width: 575px) {\\n  .dark-wrapper input.form-control {\\n    width: 100%;\\n  }\\n}\\n.dark-wrapper input.form-control:first-child {\\n  margin-right: 5px;\\n}\\n@media (max-width: 575px) {\\n  .dark-wrapper input.form-control:first-child {\\n    margin-right: 0;\\n  }\\n}\\n.dark-wrapper input.form-control:nth-child(2) {\\n  margin-left: 5px;\\n}\\n@media (max-width: 575px) {\\n  .dark-wrapper input.form-control:nth-child(2) {\\n    margin-left: 0;\\n  }\\n}\\n.dark-wrapper input[type=submit] {\\n  font-family: \\\"Dancing Script\\\";\\n  font-size: 30px;\\n  font-weight: 700;\\n  background-color: white;\\n  color: black;\\n  height: 62px;\\n  border: none;\\n  padding: 0 30px;\\n}\\n\\n.form-control {\\n  display: block;\\n  width: 100%;\\n  height: 40px;\\n  padding: 29px 30px;\\n  font-size: 14px;\\n  line-height: 1.42857143;\\n  color: white;\\n  background-image: none;\\n  border-radius: 0;\\n  -webkit-box-shadow: none;\\n  box-shadow: none;\\n}\\n\\n.form-control :-moz-placeholder, .form-control:-moz-placeholder,\\n.form-control :-ms-input-placeholder, .form-control:-ms-input-placeholder,\\n.form-control ::-moz-placeholder, .form-control::-moz-placeholder,\\n.form-control ::-webkit-input-placeholder, .form-control::-webkit-input-placeholder {\\n  color: white;\\n  font-weight: 300;\\n}\\n\\n.form-control::-webkit-input-placeholder {\\n  color: white;\\n  font-weight: 300;\\n}\\n\\n.form-control:-moz-placeholder {\\n  color: white;\\n  font-weight: 300;\\n}\\n\\n.main-contact-form {\\n  overflow: hidden;\\n  width: 100%;\\n}\\n\\n/**/\\n/*.form-control:-moz-placeholder {\\r\\n    color: rgba(255, 255, 255, 1);\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n    /*.form-control::-moz-placeholder {\\r\\n    /* Firefox 19+ */\\n/*color: rgba(255, 255, 255, 1);\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.form-control:-ms-input-placeholder {\\r\\n    color: rgba(255, 255, 255, 1);\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n/*.dark-wrapper .form-control::-webkit-input-placeholder,\\r\\n.white-text .form-control::-webkit-input-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control:-moz-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control::-moz-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control:-ms-input-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}*/\\n/**/\\n/*.form-control:focus, .form-control.col-md-6:focus {\\r\\n    border: 1px solid #333;\\r\\n    -webkit-box-shadow: none;\\r\\n    box-shadow: none\\r\\n}\\r\\n\\r\\n\\r\\n.dark-wrapper .form-control {\\r\\n    border: none;\\r\\n    background-color: rgba(0,0,0,0.2);\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control:focus, .dark-wrapper .form-control.col-md-6:focus {\\r\\n    border: none;\\r\\n    color: #f6f6f6;\\r\\n    -webkit-box-shadow: 0 0 0 1px #ffffff;\\r\\n    box-shadow: 0 0 0 1px #ffffff;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control.col-md-6, .dark-wrapper .form-control.col-md-6:focus {\\r\\n    width: 32.33333%;\\r\\n    border-bottom: none;\\r\\n    border: none;\\r\\n    background-color: rgba(0,0,0,0.2);\\r\\n    margin: 0 0.5% 10px;\\r\\n}\\r\\n\\r\\n.form-control.col-md-6,\\r\\n.form-control.col-md-6:focus {\\r\\n    width: 49%;\\r\\n    border-bottom: none;\\r\\n    border: 1px solid;\\r\\n    background-color: transparent;\\r\\n    margin: 0 0.5% 10px;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control.col-md-6:first-of-type {\\r\\n    border-left: none;\\r\\n}\\r\\n\\r\\n\\r\\n\\r\\n.main-contact-form textarea,\\r\\n.main-contact-form textarea:focus,\\r\\n#commentform .main-contact-form textarea,\\r\\n#commentform .main-contact-form textarea:focus {\\r\\n    min-height: 250px !important;\\r\\n}\\r\\n*/\\n/*-----------------------------------------------------------------------------------*/\\n/*  17 -  TABS\\r\\n/*-----------------------------------------------------------------------------------*/\\n.nav.nav-justified > li > a {\\n  position: relative;\\n}\\n\\n.icon-tabs li {\\n  border-right: 1px solid #111;\\n}\\n\\n.icon-tabs li a {\\n  opacity: 0.4;\\n}\\n\\n.icon-tabs li.active a {\\n  opacity: 1;\\n}\\n\\n.icon-tabs li:last-of-type, .dark-wrapper .icon-tabs li:last-of-type {\\n  border-right: none;\\n}\\n\\n.dark-wrapper .icon-tabs li {\\n  border-right: 1px solid #fefefe;\\n}\\n\\n.icon-tabs li .tabtitle {\\n  clear: both;\\n  display: block;\\n  margin: 15px 0 0;\\n  font-size: 20px;\\n  text-transform: uppercase;\\n  letter-spacing: 8px;\\n}\\n\\n.nav.nav-justified > li {\\n  display: table-cell;\\n  width: 1%;\\n}\\n\\n.nav.nav-justified > li > a:hover,\\n.nav.nav-justified > li > a:focus {\\n  background-color: transparent;\\n}\\n\\n.nav.nav-justified > li > a > .quote {\\n  position: absolute;\\n  left: 0px;\\n  top: 0;\\n  opacity: 0;\\n  width: 30px;\\n  height: 30px;\\n  padding: 5px;\\n  background-color: #13c0ba;\\n  border-radius: 15px;\\n  color: #fff;\\n}\\n\\n.nav.nav-justified > li.active > a > .quote {\\n  opacity: 1;\\n}\\n\\n.nav.nav-justified > li > a > img {\\n  box-shadow: 0 0 0 5px #13c0ba;\\n}\\n\\n.nav.nav-justified > li > a > img {\\n  max-width: 100%;\\n  opacity: 0.3;\\n  -webkit-transform: scale(0.8, 0.8);\\n  transform: scale(0.8, 0.8);\\n  -webkit-transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\n  transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\n}\\n\\n.nav.nav-justified > li.active > a > img,\\n.nav.nav-justified > li:hover > a > img,\\n.nav.nav-justified > li:focus > a > img {\\n  opacity: 1;\\n  -webkit-transform: none;\\n  transform: none;\\n  -webkit-transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\n  transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\n}\\n\\n.tab-pane .tab-inner {\\n  padding: 30px 0 20px;\\n}\\n\\n@media (min-width: 768px) {\\n  .nav.nav-justified > li > a > .quote {\\n    left: auto;\\n    top: auto;\\n    right: 20px;\\n    bottom: 0px;\\n  }\\n\\n  .nav.nav-justified > li > a {\\n    padding: 10px 15px;\\n  }\\n\\n  .tab-content {\\n    margin-top: 60px;\\n  }\\n}\\n.icon-tabs li.silver-bg.active {\\n  background-color: #edeff0;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  18 - COUNTDOWN\\r\\n/*-----------------------------------------------------------------------------------*/\\n#countdown span {\\n  width: 25%;\\n  display: inline-block;\\n  float: left;\\n  font-size: 70px;\\n  font-weight: 300;\\n}\\n\\n#countdown small {\\n  font-weight: 300;\\n  font-size: 18px;\\n  display: block;\\n  clear: both;\\n  text-transform: uppercase;\\n  letter-spacing: 2px;\\n}\\n\\n#countdown {\\n  overflow: hidden;\\n  padding-bottom: 80px;\\n}\\n\\n#when .lead, #where .lead, #when p, #where p {\\n  font-size: 16px;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  19 - MEDIA QUERIES\\r\\n/*-----------------------------------------------------------------------------------*/\\n@media (max-width: 991px) {\\n  #where .lead,\\n#when .lead {\\n    font-size: 40px;\\n    font-weight: 700;\\n    text-transform: uppercase;\\n    letter-spacing: 2px;\\n  }\\n}\\n@media (min-width: 767px) {\\n  header .intro-text {\\n    padding-top: 420px;\\n    padding-bottom: 100px;\\n  }\\n\\n  header .intro-text .intro-lead-in {\\n    margin-bottom: 20px;\\n    font-size: 40px;\\n    font-style: normal;\\n    line-height: 40px;\\n    letter-spacing: -1px;\\n  }\\n\\n  header .intro-text .intro-heading {\\n    margin-bottom: 40px;\\n    text-transform: uppercase;\\n    font-size: 36px;\\n    font-weight: 700;\\n    letter-spacing: 4px;\\n    line-height: 38px;\\n  }\\n\\n  .navbar-fixed-top .container-fluid {\\n    padding-left: 30px;\\n    padding-right: 30px;\\n  }\\n\\n  li.dropdown:hover ul.dropdown-menu {\\n    opacity: 1;\\n  }\\n\\n  li.dropdown:hover ul.dropdown-menu {\\n    display: block;\\n    -webkit-animation: fadeIn 0.4s;\\n    animation: fadeIn 0.4s;\\n    -webkit-animation-fill-mode: forwards;\\n    animation-fill-mode: forwards;\\n  }\\n}\\n@media (min-width: 768px) {\\n  .navbar-default {\\n    padding: 0px 0;\\n    border: 0;\\n    background-color: transparent;\\n    -webkit-transition: all 0.5s ease-in-out;\\n    -moz-transition: all 0.5s ease-in-out;\\n    -o-transition: all 0.5s ease-in-out;\\n    -ms-transition: all 0.5s ease-in-out;\\n    transition: all 0.5s ease-in-out;\\n  }\\n\\n  .navbar-default .navbar-brand {\\n    font-size: 2em;\\n    -webkit-transition: all 0.3s;\\n    -moz-transition: all 0.3s;\\n    transition: all 0.3s;\\n  }\\n\\n  .navbar-default.navbar-shrink {\\n    padding: 0;\\n    background-color: #ffffff;\\n    -webkit-transition: all 0.5s ease-in-out;\\n    -moz-transition: all 0.5s ease-in-out;\\n    -o-transition: all 0.5s ease-in-out;\\n    -ms-transition: all 0.5s ease-in-out;\\n    transition: all 0.5s ease-in-out;\\n  }\\n}\\n@media (max-width: 768px) {\\n  .fullheight, .fullheight .article-slide, .fullheight .article-slide .carousel-inner, .fullheight .article-slide .item, .fullheight .article-slide .item img {\\n    height: auto !important;\\n    min-height: 600px;\\n  }\\n\\n  .icon-tabs .fa-4x {\\n    font-size: 46px;\\n  }\\n\\n  .icon-tabs li .tabtitle {\\n    font-size: 12px;\\n    letter-spacing: 4px;\\n    margin: 0;\\n  }\\n\\n  .dark-wrapper .icon-tabs li {\\n    border-right: none;\\n  }\\n\\n  .form-control.col-md-4, .dark-wrapper.form-control.col-md-4 {\\n    width: 100% !important;\\n  }\\n}\\n@media (max-width: 575px) {\\n  #where .lead,\\n#when .lead {\\n    font-size: 24px;\\n  }\\n}\\n@media (max-width: 460px) {\\n  .fullheight, .fullheight .article-slide, .fullheight .article-slide .carousel-inner, .fullheight .article-slide .item, .fullheight .article-slide .item img {\\n    height: auto !important;\\n    min-height: 400px;\\n  }\\n}\\n.testimonial-owl .hover-item {\\n  margin-left: 0;\\n  margin-right: 0;\\n}\\n\\n.testimonial-owl .hover-item .col-xs-12 {\\n  padding-left: 0;\\n  padding-right: 0;\\n}\\n\\n.testimonial-author {\\n  max-width: 100px;\\n  margin: 0 auto;\\n}\\n\\n@media (max-width: 768px) {\\n  #side-wrapper {\\n    display: none;\\n    background-color: #ffffff;\\n  }\\n\\n  .side-nav-active .master-wrapper {\\n    padding-left: 0;\\n  }\\n\\n  #side-wrapper .navbar-default .nav li a {\\n    padding: 10px 20px;\\n  }\\n}\\n.nopadding-bottom {\\n  padding-bottom: 0 !important;\\n}\\n\\n.footer-goodbye {\\n  font-family: \\\"Dancing Script\\\";\\n  text-transform: none !important;\\n  font-size: 45px;\\n  margin-bottom: 44px;\\n  letter-spacing: 2px;\\n  font-weight: 700;\\n}\\n\\n#fettiwrap {\\n  position: absolute;\\n  left: 0;\\n  top: 0;\\n  height: 100%;\\n  width: 100%;\\n}\\n\\n/* INSTAGRAM */\\n.instafeed-wrapper {\\n  position: relative;\\n  overflow: hidden;\\n}\\n\\n.instafeed-overlay {\\n  background-color: rgba(0, 0, 0, 0.6);\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  top: 0;\\n  left: 0;\\n  text-align: center;\\n}\\n\\n.instafeed-overlay .lead {\\n  font-size: 80px;\\n}\\n\\n#instafeed img {\\n  width: 16.666666%;\\n}\\n\\n.a-quote {\\n  font-size: 73px;\\n  line-height: 68px;\\n  color: white;\\n}\\n@media (max-width: 575px) {\\n  .a-quote {\\n    font-size: 30px;\\n    line-height: 25px;\\n  }\\n}\\n\\n/*#contact-tabs .tabtitle {\\r\\n    margin-top: 0;\\r\\n}\\r\\n\\r\\n#contact-tabs .icon-tabs li {\\r\\n    border-right: none;\\r\\n}*/\", \"\", {\"version\":3,\"sources\":[\"C:/Users/Diana/Documents/nordicsoftprojects/RichardGrace.com/TemplateCoreWeb/ClientApp/src/assets/scss/ClientApp/src/assets/scss/component/_base.scss\",\"C:/Users/Diana/Documents/nordicsoftprojects/RichardGrace.com/TemplateCoreWeb/ClientApp/src/assets/scss/style.scss\",\"C:/Users/Diana/Documents/nordicsoftprojects/RichardGrace.com/TemplateCoreWeb/ClientApp/src/assets/scss/ClientApp/src/assets/scss/component/_variables.scss\",\"C:/Users/Diana/Documents/nordicsoftprojects/RichardGrace.com/TemplateCoreWeb/ClientApp/src/assets/scss/ClientApp/src/assets/scss/component/_buttons.scss\",\"C:/Users/Diana/Documents/nordicsoftprojects/RichardGrace.com/TemplateCoreWeb/ClientApp/src/assets/scss/ClientApp/src/assets/scss/component/_navbar.scss\",\"C:/Users/Diana/Documents/nordicsoftprojects/RichardGrace.com/TemplateCoreWeb/ClientApp/src/assets/scss/stdin\",\"C:/Users/Diana/Documents/nordicsoftprojects/RichardGrace.com/TemplateCoreWeb/ClientApp/src/assets/scss/ClientApp/src/assets/scss/component/_sections.scss\",\"C:/Users/Diana/Documents/nordicsoftprojects/RichardGrace.com/TemplateCoreWeb/ClientApp/src/assets/scss/ClientApp/src/assets/scss/component/_carousel.scss\",\"C:/Users/Diana/Documents/nordicsoftprojects/RichardGrace.com/TemplateCoreWeb/ClientApp/src/assets/scss/ClientApp/src/assets/scss/component/_form-control.scss\",\"C:/Users/Diana/Documents/nordicsoftprojects/RichardGrace.com/TemplateCoreWeb/ClientApp/src/assets/scss/ClientApp/src/assets/scss/component/_tabs.scss\"],\"names\":[],\"mappings\":\"AACA;EACI,mBAAA;EACA,yEAAA;EACA,0BAAA;EACA,iBAAA;EACA,kBAAA;EACA,YAAA;CCGH;;ADAD;EACI,yEAAA;EACA,qBAAA;CCGH;;ADAD;EACI,8EAAA;EACA,qBAAA;CCGH;;ADAD;EACI,eAAA;CCGH;;ADAD;EACI,YAAA;CCGH;;ADAD;EACI,YAAA;CCGH;;ADAD;EACI,gBAAA;EACA,kBAAA;CCGH;;ADAD;EACI,gBAAA;CCGH;;ADAD;;;;;EAKI,WAAA;EACA,sBAAA;CCGH;;ADAD;EACI,YAAA;CCGH;;ADAD;;;;EAII,eAAA;CCGH;;ADAD;;;;;;EAMI,yEAAA;EACA,0BAAA;EACA,iBAAA;EACA,oBAAA;CCGH;;ADAD;EACI,eAAA;CCGH;;ADAD;EACI,oBAAA;CCGH;;ADAD;EACI,oBAAA;EACA,eAAA;CCGH;;ADAD;EACI,oBAAA;CCGH;;ADAD;EACI,oBAAA;EACA,eAAA;CCGH;;ADAD;EACI,qBAAA;CCGH;;ADAD;EACI,iBAAA;CCGH;;ADAD;EACI,iBAAA;CCGH;;ADAD;EACI,iBAAA;CCGH;;ADAD;EACI,iBAAA;CCGH;;ADAD;EACI,kBAAA;CCGH;;ADAD;EACI,kBAAA;EACA,qBAAA;CCGH;;ADAD;EACI,0BAAA;CCGH;;ADAD;EACI,6BAAA;CCGH;;ADAD;EACI,2BAAA;EACA,4BAAA;CCGH;;ADAD;EACI,2BAAA;CCGH;;ADAD;EACI,8BAAA;EACA,+BAAA;CCGH;;ADAD;EACI,iBAAA;CCGH;;ADAD;;;;EAII,WAAA;CCGH;;ADAD;EACI,YAAA;EACA,kBAAA;EACA,iBAAA;CCGH;;ADAD;EACI,YAAA;EACA,kBAAA;EACA,iBAAA;CCGH;;ADAD;EACI,iBAAA;CCGH;;ADAD;EACI,gBAAA;CCGH;;ADAD;EACI,gBAAA;CCGH;;ADAD;;;;;EAKI,YAAA;CCGH;;ADAD;EACI,aAAA;CCGH;;ADAD;;EAEI,yCAAA;EACA,sCAAA;EACA,oCAAA;EACA,qCAAA;EACA,iCAAA;CCGH;;ADAD;EACI,WAAA;CCGH;;ADDD;EACI,aAAA;EACA,kBAAA;CCIH;ADFG;EACI,sBEhNM;CDoNb;ADDG;EACI,sBErNM;CDwNb;;ADAD;;;;;;;;GAAA;AASA;;;;;;;;;;;;;;;;;;;;;;;;;;;;GAAA;AA6BA;EACI,8BAAA;EACA,iCAAA;EACA,4BAAA;EACA,6BAAA;EACA,yBAAA;CCGH;;ADAD;EACI,gBAAA;CCGH;;ADAD;EACI,6BAAA;EACA,uBAAA;CCGH;;ADAD;EACI,gBAAA;EACA,kBAAA;CCGH;;ADAD;EACI,aAAA;CCGH;;ADDD;EACI;IACI,iBAAA;IACA,kBAAA;IACA,mBAAA;GCIL;CACF;AEhSD;EACI,yEAAA;CFkSH;;AE/RD;;;;;EAKI,cAAA;EACA,iBAAA;CFkSH;;AE/RD;EACI,sBDbU;ECcV,iBAAA;EACA,0BAAA;EACA,iBAAA;EACA,eDjBU;ECkBV,8BAAA;EACA,mBAAA;EACA,oBAAA;EACA,yCAAA;EACA,sCAAA;EACA,oCAAA;EACA,qCAAA;EACA,iCAAA;CFkSH;;AE/RD;EACI,qCAAA;CFkSH;;AE/RD;;;;EAII,eAAA;EACA,qCAAA;EACA,yCAAA;CFkSH;;AE/RD;;;;;EAKI,sBD9CU;EC+CV,eDhDU;ECiDV,0BDhDU;ECiDV,yCAAA;EACA,sCAAA;EACA,oCAAA;EACA,qCAAA;EACA,iCAAA;CFkSH;;AE/RD;;;EAGI,uBAAA;CFkSH;;AE/RD;;;;;;;;;;;;;;;EAeI,sBD7EU;EC8EV,0BD9EU;CDgXb;;AE/RD;;EAEI,0BAAA;CFkSH;;AE/RD;EACI,sBDxFU;ECyFV,eDzFU;CD2Xb;;AE/RD;;;;EAII,sBDhGU;ECiGV,eDhGU;ECiGV,0BDlGU;CDoYb;;AGpYD;EACI,YAAA;EACA,eAAA;CHuYH;;AGpYD;EACI,YAAA;EACA,sBAAA;CHuYH;;AGpYD;EACI,0BAAA;EACA,8BAAA;CHuYH;;AGnYD;EACI,cAAA;EACA,oBAAA;EACA,gBAAA;EACA,iBAAA;EACA,8BAAA;EACA,qBAAA;EACA,aFxBU;EEyBV,kBAAA;EACA,wBAAA;CHsYH;;AGnYD;;;;EAII,eF/BU;CDqab;;AGnYD;EACI,wCAAA;CHsYH;;AGnYD;;;EAGI,0BAAA;EACA,8BAAA;CHsYH;;AGnYD;EACI,wBFhDU;CDsbb;;AGnYD;EACI,iBAAA;CHsYH;;AGnYD;EACI,0BAAA;EACA,iBAAA;EACA,gBAAA;EACA,eFzDU;EE0DV,mBAAA;EACA,yCAAA;EACA,sCAAA;EACA,oCAAA;EACA,qCAAA;EACA,iCAAA;EACA,oBAAA;CHsYH;;AGnYD;;;;;EAKI,eFzEU;CD+cb;;AGnYD;EACI,aF9EU;CDodb;;AGlYD;EACI,0BAAA;CHqYH;;AGlYD;EACI,mBAAA;EACA,gBAAA;CHqYH;;AGlYD;EACI,sBF3FU;EE4FV,eF5FU;CDieb;;AGlYD;;EAEI,WAAA;EACA,eFjGU;CDseb;;AGlYD;EACI,iBAAA;EACA,8BAAA;EACA,aFzGU;EE0GV,yCAAA;EACA,sCAAA;EACA,oCAAA;EACA,qCAAA;EACA,iCAAA;CHqYH;;AGlYD;;EAEI,eFjHU;CDsfb;;AGlYD;;EAEI,eFrHU;EEsHV,8BAAA;CHqYH;;AGlYD;EACI,mBAAA;EACA,UAAA;EACA,QAAA;EACA,cAAA;EACA,cAAA;EACA,YAAA;EACA,iBAAA;EACA,WAAA;EACA,gBAAA;EACA,gBAAA;EACA,iBAAA;EACA,iBAAA;EACA,wBFzIU;EE0IV,qCAAA;EACA,6BAAA;EACA,aAAA;EACA,iBAAA;EACA,yBAAA;EACA,iBAAA;CHqYH;;AGlYD;EACI,eFjJU;CDshBb;;AGlYD;;EAEI,eFtJU;EEuJV,0BAAA;CHqYH;;AGjYD;EACI;;IAEI,eF9JM;GDkiBX;;EGlYC;;IAEI,wBAAA;GHqYL;;EGnYC;IACI,WAAA;IACA,eAAA;GHsYL;;EGpYC;IACI,wBAAA;GHuYL;;EGrYC;IACI,0BAAA;GHwYL;CACF;AGrYD;EACI;IACI,kBAAA;GHuYL;;EGrYC;IACI,gBAAA;IACA,kBAAA;GHwYL;CACF;AI3jBD,uFAAA;AACA;uFAAA;AAEA;EACI,iBAAA;CJ6jBH;;AI1jBD;EACI,yCAAA;CJ6jBH;;AI1jBD;EACI,YAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,wCAAA;EACA,OAAA;EACA,QAAA;CJ6jBH;;AI1jBD;EACI,uBAAA;EACA,8BAAA;CJ6jBH;;AI1jBD;EACI,mBAAA;EACA,YAAA;CJ6jBH;;AI1jBD;EACI,mBAAA;EACA,qBAAA;EACA,YAAA;CJ6jBH;;AI1jBD;EACI,oBAAA;EACA,gBAAA;EACA,qBAAA;EACA,kBAAA;CJ6jBH;;AI1jBD;EACI,gBAAA;EACA,oBAAA;EACA,0BAAA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;CJ6jBH;;AI1jBD;EACI,YAAA;EACA,eAAA;EACA,oBAAA;EACA,gBAAA;EACA,eAAA;CJ6jBH;;AI1jBD,uFAAA;AACA;uFAAA;AClEA;EACI,8BAAA;EACA,YAAA;EACA,mBAAA;CLioBH;;AK9nBD;;;;;;GAAA;AAQA;EACI,wBAAA;CLgoBH;;AK7nBD;EACI,mBAAA;EACA,4CAAA;CLgoBH;AK9nBG;EACI,YAAA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,YAAA;EACA,aAAA;EACA,wCAAA;CLgoBP;;AK3nBD;EACI,mBAAA;EACA,4CAAA;CL8nBH;AK5nBG;EACI,YAAA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,YAAA;EACA,aAAA;EACA,wCAAA;CL8nBP;;AKznBD;EACI,qCAAA;CL4nBH;;AKznBD;;;;;;;;;EASI,eJhEU;CD4rBb;;AKznBD;EACI,iBAAA;CL4nBH;AK1nBG;EAHJ;IAIQ,gBAAA;GL6nBL;CACF;;AK1nBD;EACI,cAAA;EACA,oBAAA;EACA,gBAAA;EACA,oBAAA;CL6nBH;;AK1nBD;EACI,0BAAA;EACA,gBAAA;EACA,iBAAA;EACA,YAAA;EACA,eAAA;EACA,kBAAA;EACA,oBAAA;CL6nBH;;AK1nBD;EACI,eAAA;CL6nBH;;AK1nBD;EACI,mBAAA;EACA,UAAA;EACA,QAAA;EACA,YAAA;EACA,YAAA;EACA,qCAAA;EACA,YAAA;EACA,WAAA;EACA,iBAAA;EACA,yDAAA;EACA,mDAAA;EACA,yCAAA;EACA,oCAAA;EACA,iCAAA;EACA,4BAAA;CL6nBH;;AK1nBD;EACI,+BAAA;CL6nBH;;AK1nBD;;EAEI,WAAA;EACA,mCAAA;EACA,gCAAA;EACA,2BAAA;CL6nBH;;AK3nBD;EACI,gBAAA;CL8nBH;;AK1nBG;EACI,gBAAA;EACA,mBAAA;CL6nBP;AK5nBO;EACI,gBAAA;EACA,kBAAA;CL8nBX;;AI7rBD,uFAAA;AACA;uFAAA;AAGA;EACI,mBAAA;EACA,iBAAA;CJ+rBH;;AI5rBD;EACI,yBAAA;EACA,4BAAA;EACA,uBAAA;EACA,wBAAA;EACA,oBAAA;CJ+rBH;;AI5rBD;EACI,WAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,QAAA;EACA,OAAA;EACA,sFAAA;EAAiF,YAAA;EACjF,sIAAA;EAA+H,qBAAA;EAC/H,yFAAA;EAAmF,0BAAA;EACnF,oFAAA;EAA8E,kBAAA;EAC9E,qFAAA;EAA+E,WAAA;EAC/E,uFAAA;EAAiF,SAAA;EACjF,wHAAA;EAAyH,WAAA;EACzH,mBAAA;EACA,0BAAA;CJssBH;;AInsBD;EACI,WAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,QAAA;EACA,SAAA;EACA,qCAAA;EACA,mBAAA;EACA,WAAA;CJssBH;;AInsBD;EACI,WAAA;CJssBH;;AInsBD;EACI,UAAA;EACA,mBAAA;CJssBH;;AInsBD;EACI,SAAA;CJssBH;;AInsBD;EACI,WAAA;EACA,UAAA;CJssBH;;AInsBD;EACI,WAAA;CJssBH;;AInsBD;EACI,2BAAA;EACA,8BAAA;EACA,yBAAA;EACA,0BAAA;EACA,sBAAA;CJssBH;;AInsBD;EACI,gBAAA;EACA,UAAA;EACA,eAAA;EACA,iBAAA;EACA,oBAAA;CJssBH;;AInsBD;EACI,eAAA;EACA,qBAAA;EACA,iBAAA;EACA,0BAAA;EACA,eAAA;EACA,oBAAA;CJssBH;;AInsBD;EACI,uBAAA;CJssBH;;AInsBD;EACI,mBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;CJssBH;;AInsBD;EACI,YAAA;EACA,eAAA;EACA,qBAAA;EACA,gBAAA;EACA,eAAA;CJssBH;;AInsBD;EACI,sBAAA;CJssBH;;AInsBD;EACI,eAAA;CJssBH;;AInsBD,uFAAA;AACA;uFAAA;AAGA;EACI,2BAAA;CJqsBH;;AIlsBD;EACI,qBAAA;CJqsBH;;AIlsBD;EACI,iBAAA;EACA,YAAA;CJqsBH;;AIlsBD;EACI,oBAAA;EACA,0BAAA;EACA,qBAAA;EACA,kBAAA;CJqsBH;;AIlsBD;EACI,mBAAA;CJqsBH;;AIlsBD;EACI,0BAAA;EACA,oBAAA;EACA,gBAAA;CJqsBH;;AIlsBD;EACI,oBAAA;CJqsBH;;AIlsBD,uFAAA;AACA;uFAAA;AE1OI;EACI,WAAA;CNi7BP;AM96BG;EACI,gBAAA;CNg7BP;;AM56BD;EACI,mBAAA;CN+6BH;AM76BG;EACI;;KAAA;CNi7BP;AM96BO;EACI,mBAAA;EACA,aAAA;EAMA;;;+CAAA;CN86BX;AMn7BW;EACI,uBAAA;EACA,sBAAA;EACA,mBAAA;CNq7Bf;;AI3tBD,uFAAA;AACA;uFAAA;AAGA;EACI,0BAAA;EACA,gBAAA;EACA,YAAA;EACA,aAAA;EACA,iBAAA;EACA,OAAA;EACA,QAAA;CJ6tBH;;AI1tBD;EACI,qBAAA;EACA,gBAAA;CJ6tBH;;AI1tBD;EACI,YAAA;EACA,aAAA;EACA,mBAAA;EACA,SAAA;EACA,UAAA;EACA,mBAAA;EACA,kBAAA;CJ6tBH;;AI1tBD;EACI,iBAAA;CJ6tBH;;AI1tBD;EACI;IACI,WAAA;GJ6tBL;EI1tBC;IACI,aAAA;GJ4tBL;EIztBC;IACI,WAAA;GJ2tBL;CACF;AIxtBD;EACI;IACI,WAAA;GJ0tBL;EIvtBC;IACI,aAAA;GJytBL;EIttBC;IACI,WAAA;GJwtBL;CACF;AIrtBD;EACI;IACI,WAAA;GJutBL;EIptBC;IACI,aAAA;GJstBL;EIltBC;IACI,WAAA;GJotBL;CACF;AIjtBD;EACI;IACI,WAAA;GJmtBL;EIhtBC;IACI,aAAA;GJktBL;EI/sBC;IACI,WAAA;GJitBL;CACF;AI9sBD;EACI,gDAAA;EACA,6CAAA;EACA,2CAAA;EACA,wCAAA;CJgtBH;;AI9sBD,uFAAA;AACA;uFAAA;AAEA;EACI,kBAAA;EACA,YAAA;EACA,mBAAA;EACA,eAAA;CJitBH;;AI9sBD;EACI;;;;;+BAAA;EAK8B,gBAAA;EAC9B,aAAA;EAAc,YAAA;EACd,gBAAA;CJmtBH;;AIhtBD,uFAAA;AACA;uFAAA;AGtWI;EACI,2CAAA;EACA,0BAAA;EACA,oBAAA;EACA,cAAA;CP2jCP;;AOvjCG;EACI,2CAAA;EACA,0BAAA;EACA,oBAAA;EACA,YAAA;EACA,uBAAA;CP0jCP;AOxjCO;EAPJ;IAQQ,YAAA;GP2jCT;CACF;AOzjCO;EACI,kBAAA;CP2jCX;AOzjCW;EAHJ;IAIQ,gBAAA;GP4jCb;CACF;AOzjCO;EACI,iBAAA;CP2jCX;AOzjCW;EAHJ;IAIQ,eAAA;GP4jCb;CACF;AOxjCG;EACI,8BAAA;EACA,gBAAA;EACA,iBAAA;EACA,wBAAA;EACA,aAAA;EACA,aAAA;EACA,aAAA;EACA,gBAAA;CP0jCP;;AOvjCD;EACI,eAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,gBAAA;EACA,wBAAA;EACA,aAAA;EACA,uBAAA;EACA,iBAAA;EACA,yBAAA;EACA,iBAAA;CP0jCH;;AOtjCG;;;;EAQI,aAAA;EACA,iBAAA;CPqjCP;;AOljCD;EACI,aAAA;EACA,iBAAA;CPqjCH;;AOnjCD;EACI,aAAA;EACA,iBAAA;CPsjCH;;AOpjCD;EACI,iBAAA;EACA,YAAA;CPujCH;;AOjjCG,IAAA;AAEA;;;;;;qBAAA;AAOA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;GAAA;AAmCA,IAAA;AACA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAAA;AHoOJ,uFAAA;AACA;uFAAA;AI7WA;EACI,mBAAA;CR+uCH;;AQ5uCD;EACI,6BAAA;CR+uCH;;AQ5uCD;EACI,aAAA;CR+uCH;;AQ5uCD;EACI,WAAA;CR+uCH;;AQ5uCD;EACI,mBAAA;CR+uCH;;AQ5uCD;EACI,gCAAA;CR+uCH;;AQ5uCD;EACI,YAAA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;EACA,0BAAA;EACA,oBAAA;CR+uCH;;AQ5uCD;EACI,oBAAA;EACA,UAAA;CR+uCH;;AQ5uCD;;EAEI,8BAAA;CR+uCH;;AQ5uCD;EACI,mBAAA;EACA,UAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,aAAA;EACA,0BAAA;EACA,oBAAA;EACA,YAAA;CR+uCH;;AQ5uCD;EACI,WAAA;CR+uCH;;AQ5uCD;EACI,8BAAA;CR+uCH;;AQ5uCD;EACI,gBAAA;EACA,aAAA;EACA,mCAAA;EACA,2BAAA;EACA,wEAAA;EACA,gEAAA;CR+uCH;;AQ5uCD;;;EAGI,WAAA;EACA,wBAAA;EACA,gBAAA;EACA,wEAAA;EACA,gEAAA;CR+uCH;;AQ5uCD;EACI,qBAAA;CR+uCH;;AQ5uCD;EACI;IACI,WAAA;IACA,UAAA;IACA,YAAA;IACA,YAAA;GR+uCL;;EQ7uCC;IACI,mBAAA;GRgvCL;;EQ9uCC;IACI,iBAAA;GRivCL;CACF;AQ/uCD;EACI,0BAAA;CRivCH;;AIr+BD,uFAAA;AACA;uFAAA;AAEA;EACI,WAAA;EACA,sBAAA;EACA,YAAA;EACA,gBAAA;EACA,iBAAA;CJw+BH;;AIr+BD;EACI,iBAAA;EACA,gBAAA;EACA,eAAA;EACA,YAAA;EACA,0BAAA;EACA,oBAAA;CJw+BH;;AIr+BD;EACI,iBAAA;EACA,qBAAA;CJw+BH;;AIp+BG;EAEI,gBAAA;CJs+BP;;AIn+BD,uFAAA;AACA;uFAAA;AAEI;EACI;;IAEI,gBAAA;IACA,iBAAA;IACA,0BAAA;IACA,oBAAA;GJs+BT;CACF;AIn+BG;EACI;IACI,mBAAA;IACA,sBAAA;GJq+BT;;EIl+BK;IACI,oBAAA;IACA,gBAAA;IACA,mBAAA;IACA,kBAAA;IACA,qBAAA;GJq+BT;;EIl+BK;IACI,oBAAA;IACA,0BAAA;IACA,gBAAA;IACA,iBAAA;IACA,oBAAA;IACA,kBAAA;GJq+BT;;EIl+BK;IACI,mBAAA;IACA,oBAAA;GJq+BT;;EIl+BK;IACI,WAAA;GJq+BT;;EIl+BK;IACI,eAAA;IACA,+BAAA;IACA,uBAAA;IACA,sCAAA;IACA,8BAAA;GJq+BT;CACF;AIl+BG;EACI;IACI,eAAA;IACA,UAAA;IACA,8BAAA;IACA,yCAAA;IACA,sCAAA;IACA,oCAAA;IACA,qCAAA;IACA,iCAAA;GJo+BT;;EIj+BK;IACI,eAAA;IACA,6BAAA;IACA,0BAAA;IACA,qBAAA;GJo+BT;;EIj+BK;IACI,WAAA;IACA,0BAAA;IACA,yCAAA;IACA,sCAAA;IACA,oCAAA;IACA,qCAAA;IACA,iCAAA;GJo+BT;CACF;AIj+BG;EACI;IACI,wBAAA;IACA,kBAAA;GJm+BT;;EIh+BK;IACI,gBAAA;GJm+BT;;EIh+BK;IACI,gBAAA;IACA,oBAAA;IACA,UAAA;GJm+BT;;EIh+BK;IACI,mBAAA;GJm+BT;;EIh+BK;IACI,uBAAA;GJm+BT;CACF;AIh+BG;EACI;;IAEI,gBAAA;GJk+BT;CACF;AI/9BG;EACI;IACI,wBAAA;IACA,kBAAA;GJi+BT;CACF;AI99BG;EACI,eAAA;EACA,gBAAA;CJg+BP;;AI79BG;EACI,gBAAA;EACA,iBAAA;CJg+BP;;AI79BG;EACI,iBAAA;EACA,eAAA;CJg+BP;;AI79BG;EACI;IACI,cAAA;IACA,0BAAA;GJg+BT;;EI79BK;IACI,gBAAA;GJg+BT;;EI79BK;IACI,mBAAA;GJg+BT;CACF;AI79BG;EACI,6BAAA;CJ+9BP;;AI59BG;EACI,8BAAA;EACA,gCAAA;EACA,gBAAA;EACA,oBAAA;EACA,oBAAA;EACA,iBAAA;CJ+9BP;;AI59BG;EACI,mBAAA;EACA,QAAA;EACA,OAAA;EACA,aAAA;EACA,YAAA;CJ+9BP;;AI79BG,eAAA;AACA;EACI,mBAAA;EACA,iBAAA;CJg+BP;;AI79BG;EACI,qCAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,OAAA;EACA,QAAA;EACA,mBAAA;CJg+BP;;AI79BG;EACI,gBAAA;CJg+BP;;AI79BG;EACI,kBAAA;CJg+BP;;AI79BD;EACI,gBAAA;EACA,kBAAA;EACA,aAAA;CJg+BH;AI99BG;EALJ;IAMQ,gBAAA;IACA,kBAAA;GJi+BL;CACF;;AI99BD;;;;;;GAAA\",\"file\":\"style.scss\",\"sourcesContent\":[\"@import \\\"variables\\\";\\r\\nbody {\\r\\n    overflow-x: hidden;\\r\\n    font-family: 'Open Sans', \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\r\\n    background-color: #ffffff;\\r\\n    font-weight: 400;\\r\\n    line-height: 1.75;\\r\\n    color: #333\\r\\n}\\r\\n\\r\\n.heading-font, .navbar-default .navbar-brand, .navbar-default .nav li a {\\r\\n    font-family: 'Open Sans', \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\r\\n    text-transform: none;\\r\\n}\\r\\n\\r\\n.secondary-font {\\r\\n    font-family: 'Dancing Script', \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\r\\n    text-transform: none;\\r\\n}\\r\\n\\r\\n.theme-accent-color {\\r\\n    color: #C10E1F;\\r\\n}\\r\\n\\r\\n.text-muted {\\r\\n    color: #444\\r\\n}\\r\\n\\r\\n.text-primary {\\r\\n    color: #333\\r\\n}\\r\\n\\r\\np {\\r\\n    font-size: 14px;\\r\\n    line-height: 26px;\\r\\n}\\r\\n\\r\\np.large {\\r\\n    font-size: 16px\\r\\n}\\r\\n\\r\\na,\\r\\na:hover,\\r\\na:focus,\\r\\na:active,\\r\\na.active {\\r\\n    outline: 0;\\r\\n    text-decoration: none\\r\\n}\\r\\n\\r\\na {\\r\\n    color: #333\\r\\n}\\r\\n\\r\\na:hover,\\r\\na:focus,\\r\\na:active,\\r\\na.active {\\r\\n    color: #C10E1F\\r\\n}\\r\\n\\r\\nh1,\\r\\nh2,\\r\\nh3,\\r\\nh4,\\r\\nh5,\\r\\nh6 {\\r\\n    font-family: 'Open Sans', \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\r\\n    text-transform: uppercase;\\r\\n    font-weight: 700;\\r\\n    letter-spacing: 1px\\r\\n}\\r\\n\\r\\n.img-centered {\\r\\n    margin: 0 auto\\r\\n}\\r\\n\\r\\n.gap {\\r\\n    margin-bottom: 60px\\r\\n}\\r\\n\\r\\n.mb30 {\\r\\n    margin-bottom: 30px;\\r\\n    display: block;\\r\\n}\\r\\n\\r\\n.mb-45{\\r\\n    margin-bottom: 45px;\\r\\n}\\r\\n\\r\\n.mb50 {\\r\\n    margin-bottom: 50px;\\r\\n    display: block;\\r\\n}\\r\\n\\r\\n.mb100 {\\r\\n    margin-bottom: 100px;\\r\\n}\\r\\n\\r\\n.nomarginbottom {\\r\\n    margin-bottom: 0\\r\\n}\\r\\n\\r\\n.mt20 {\\r\\n    margin-top: 20px\\r\\n}\\r\\n\\r\\n.mt30 {\\r\\n    margin-top: 30px;\\r\\n}\\r\\n\\r\\n.mt60 {\\r\\n    margin-top: 60px\\r\\n}\\r\\n\\r\\n.mt120 {\\r\\n    margin-top: 120px\\r\\n}\\r\\n\\r\\n.ptb {\\r\\n    padding-top: 45px;\\r\\n    padding-bottom: 45px;\\r\\n}\\r\\n\\r\\n.nopaddingtop {\\r\\n    padding-top: 0 !important\\r\\n}\\r\\n\\r\\n.nopaddingbottom {\\r\\n    padding-bottom: 0 !important\\r\\n}\\r\\n\\r\\n.nopadding-lr {\\r\\n    padding-left: 0 !important;\\r\\n    padding-right: 0 !important\\r\\n}\\r\\n\\r\\n.nopadding-l {\\r\\n    padding-left: 0 !important\\r\\n}\\r\\n\\r\\n.pad-sides-60 {\\r\\n    padding-left: 60px !important;\\r\\n    padding-right: 60px !important;\\r\\n}\\r\\n\\r\\n.thin {\\r\\n    font-weight: 300\\r\\n}\\r\\n\\r\\n.btn:focus,\\r\\n.btn:active,\\r\\n.btn.active,\\r\\n.btn:active:focus {\\r\\n    outline: 0\\r\\n}\\r\\n\\r\\n::-moz-selection {\\r\\n    color: #fff;\\r\\n    text-shadow: none;\\r\\n    background: #333\\r\\n}\\r\\n\\r\\n::selection {\\r\\n    color: #fff;\\r\\n    text-shadow: none;\\r\\n    background: #333\\r\\n}\\r\\n\\r\\n.list-unstyled {\\r\\n    margin-bottom: 0;\\r\\n}\\r\\n\\r\\nimg::selection {\\r\\n    background: 0 0\\r\\n}\\r\\n\\r\\nimg::-moz-selection {\\r\\n    background: 0 0\\r\\n}\\r\\n\\r\\n.img-responsive,\\r\\n.thumbnail > img,\\r\\n.thumbnail a > img,\\r\\n.carousel-inner > .item > img,\\r\\n.carousel-inner > .item > a > img {\\r\\n    width: 100%\\r\\n}\\r\\n\\r\\n.img-thumbnail {\\r\\n    border: none\\r\\n}\\r\\n\\r\\n.smoothie,\\r\\n.smoothie:hover {\\r\\n    -webkit-transition: all .5s ease-in-out;\\r\\n    -moz-transition: all .5s ease-in-out;\\r\\n    -o-transition: all .5s ease-in-out;\\r\\n    -ms-transition: all .5s ease-in-out;\\r\\n    transition: all .5s ease-in-out\\r\\n}\\r\\n\\r\\n.col-md-5th {\\r\\n    width: 20%\\r\\n}\\r\\n.thin-hr {\\r\\n    width: 180px;\\r\\n    margin: 45px auto;\\r\\n\\r\\n    .light-wrapper & {\\r\\n        border-color: $dark-gray;\\r\\n    }\\r\\n\\r\\n    .dark-wrapper & {\\r\\n        border-color: $light-gray;\\r\\n    }\\r\\n}\\r\\n/*.thin-hr {\\r\\n    margin: 30px 0 40px;\\r\\n    width: 100%;\\r\\n    clear: both;\\r\\n    display: block;\\r\\n    position: relative;\\r\\n    border: none;\\r\\n    text-align: center;\\r\\n}*/\\r\\n/*.thin-hr.bordered {\\r\\n    margin: 20px 0;\\r\\n    width: 100%;\\r\\n    clear: both;\\r\\n    display: block;\\r\\n    position: relative;\\r\\n    border: 1px solid #333;\\r\\n}\\r\\n\\r\\n.thin-hr:after {\\r\\n    content: '';\\r\\n    position: absolute;\\r\\n    width: 180px;\\r\\n    height: 2px;\\r\\n    background-color: #333;\\r\\n    left: 50%;\\r\\n    margin-left: -80px;\\r\\n}\\r\\n\\r\\n.thin-hr:before {\\r\\n    font-family: 'FontAwesome';\\r\\n    content: \\\"\\\\f004\\\";\\r\\n    color: #C10E1F;\\r\\n    position: absolute;\\r\\n    width: 180px;\\r\\n    margin-left: -80px;\\r\\n    margin-top: -10px;\\r\\n    z-index: 5;\\r\\n}*/\\r\\n.rotate-45 {\\r\\n    -moz-transform: rotate(45deg);\\r\\n    -webkit-transform: rotate(45deg);\\r\\n    -o-transform: rotate(45deg);\\r\\n    -ms-transform: rotate(45deg);\\r\\n    transform: rotate(45deg);\\r\\n}\\r\\n\\r\\n.icon-large {\\r\\n    font-size: 40px;\\r\\n}\\r\\n\\r\\n.background-cover {\\r\\n    background-repeat: no-repeat;\\r\\n    background-size: cover;\\r\\n}\\r\\n\\r\\n.lead {\\r\\n    font-size: 18px;\\r\\n    line-height: 32px;\\r\\n}\\r\\n\\r\\n.white {\\r\\n    color: rgb(255, 255, 255);\\r\\n}\\r\\n@media(max-width: 767px){\\r\\n    .max-sm-width {\\r\\n        max-width: 450px;\\r\\n        margin-left: auto;\\r\\n        margin-right: auto;\\r\\n    }\\r\\n}\\r\\n\",\"@import url(http://fonts.googleapis.com/css?family=PT+Serif:400,700,400italic,700italic);\\n@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800);\\n@import url(https://fonts.googleapis.com/css?family=Dancing+Script:400,700);\\nbody {\\n  overflow-x: hidden;\\n  font-family: \\\"Open Sans\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n  background-color: #ffffff;\\n  font-weight: 400;\\n  line-height: 1.75;\\n  color: #333;\\n}\\n\\n.heading-font, .navbar-default .navbar-brand, .navbar-default .nav li a {\\n  font-family: \\\"Open Sans\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n  text-transform: none;\\n}\\n\\n.secondary-font {\\n  font-family: \\\"Dancing Script\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n  text-transform: none;\\n}\\n\\n.theme-accent-color {\\n  color: #C10E1F;\\n}\\n\\n.text-muted {\\n  color: #444;\\n}\\n\\n.text-primary {\\n  color: #333;\\n}\\n\\np {\\n  font-size: 14px;\\n  line-height: 26px;\\n}\\n\\np.large {\\n  font-size: 16px;\\n}\\n\\na,\\na:hover,\\na:focus,\\na:active,\\na.active {\\n  outline: 0;\\n  text-decoration: none;\\n}\\n\\na {\\n  color: #333;\\n}\\n\\na:hover,\\na:focus,\\na:active,\\na.active {\\n  color: #C10E1F;\\n}\\n\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6 {\\n  font-family: \\\"Open Sans\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n  text-transform: uppercase;\\n  font-weight: 700;\\n  letter-spacing: 1px;\\n}\\n\\n.img-centered {\\n  margin: 0 auto;\\n}\\n\\n.gap {\\n  margin-bottom: 60px;\\n}\\n\\n.mb30 {\\n  margin-bottom: 30px;\\n  display: block;\\n}\\n\\n.mb-45 {\\n  margin-bottom: 45px;\\n}\\n\\n.mb50 {\\n  margin-bottom: 50px;\\n  display: block;\\n}\\n\\n.mb100 {\\n  margin-bottom: 100px;\\n}\\n\\n.nomarginbottom {\\n  margin-bottom: 0;\\n}\\n\\n.mt20 {\\n  margin-top: 20px;\\n}\\n\\n.mt30 {\\n  margin-top: 30px;\\n}\\n\\n.mt60 {\\n  margin-top: 60px;\\n}\\n\\n.mt120 {\\n  margin-top: 120px;\\n}\\n\\n.ptb {\\n  padding-top: 45px;\\n  padding-bottom: 45px;\\n}\\n\\n.nopaddingtop {\\n  padding-top: 0 !important;\\n}\\n\\n.nopaddingbottom {\\n  padding-bottom: 0 !important;\\n}\\n\\n.nopadding-lr {\\n  padding-left: 0 !important;\\n  padding-right: 0 !important;\\n}\\n\\n.nopadding-l {\\n  padding-left: 0 !important;\\n}\\n\\n.pad-sides-60 {\\n  padding-left: 60px !important;\\n  padding-right: 60px !important;\\n}\\n\\n.thin {\\n  font-weight: 300;\\n}\\n\\n.btn:focus,\\n.btn:active,\\n.btn.active,\\n.btn:active:focus {\\n  outline: 0;\\n}\\n\\n::-moz-selection {\\n  color: #fff;\\n  text-shadow: none;\\n  background: #333;\\n}\\n\\n::selection {\\n  color: #fff;\\n  text-shadow: none;\\n  background: #333;\\n}\\n\\n.list-unstyled {\\n  margin-bottom: 0;\\n}\\n\\nimg::selection {\\n  background: 0 0;\\n}\\n\\nimg::-moz-selection {\\n  background: 0 0;\\n}\\n\\n.img-responsive,\\n.thumbnail > img,\\n.thumbnail a > img,\\n.carousel-inner > .item > img,\\n.carousel-inner > .item > a > img {\\n  width: 100%;\\n}\\n\\n.img-thumbnail {\\n  border: none;\\n}\\n\\n.smoothie,\\n.smoothie:hover {\\n  -webkit-transition: all 0.5s ease-in-out;\\n  -moz-transition: all 0.5s ease-in-out;\\n  -o-transition: all 0.5s ease-in-out;\\n  -ms-transition: all 0.5s ease-in-out;\\n  transition: all 0.5s ease-in-out;\\n}\\n\\n.col-md-5th {\\n  width: 20%;\\n}\\n\\n.thin-hr {\\n  width: 180px;\\n  margin: 45px auto;\\n}\\n.light-wrapper .thin-hr {\\n  border-color: #333333;\\n}\\n.dark-wrapper .thin-hr {\\n  border-color: #f3f3f3;\\n}\\n\\n/*.thin-hr {\\r\\n    margin: 30px 0 40px;\\r\\n    width: 100%;\\r\\n    clear: both;\\r\\n    display: block;\\r\\n    position: relative;\\r\\n    border: none;\\r\\n    text-align: center;\\r\\n}*/\\n/*.thin-hr.bordered {\\r\\n    margin: 20px 0;\\r\\n    width: 100%;\\r\\n    clear: both;\\r\\n    display: block;\\r\\n    position: relative;\\r\\n    border: 1px solid #333;\\r\\n}\\r\\n\\r\\n.thin-hr:after {\\r\\n    content: '';\\r\\n    position: absolute;\\r\\n    width: 180px;\\r\\n    height: 2px;\\r\\n    background-color: #333;\\r\\n    left: 50%;\\r\\n    margin-left: -80px;\\r\\n}\\r\\n\\r\\n.thin-hr:before {\\r\\n    font-family: 'FontAwesome';\\r\\n    content: \\\"\\\\f004\\\";\\r\\n    color: #C10E1F;\\r\\n    position: absolute;\\r\\n    width: 180px;\\r\\n    margin-left: -80px;\\r\\n    margin-top: -10px;\\r\\n    z-index: 5;\\r\\n}*/\\n.rotate-45 {\\n  -moz-transform: rotate(45deg);\\n  -webkit-transform: rotate(45deg);\\n  -o-transform: rotate(45deg);\\n  -ms-transform: rotate(45deg);\\n  transform: rotate(45deg);\\n}\\n\\n.icon-large {\\n  font-size: 40px;\\n}\\n\\n.background-cover {\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n}\\n\\n.lead {\\n  font-size: 18px;\\n  line-height: 32px;\\n}\\n\\n.white {\\n  color: white;\\n}\\n\\n@media (max-width: 767px) {\\n  .max-sm-width {\\n    max-width: 450px;\\n    margin-left: auto;\\n    margin-right: auto;\\n  }\\n}\\n.btn {\\n  font-family: \\\"Open Sans\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n}\\n\\n.btn:focus,\\n.btn:active:focus,\\n.btn.active:focus,\\n.btn:active,\\n.btn.active {\\n  outline: none;\\n  box-shadow: none;\\n}\\n\\n.btn-primary {\\n  border-color: #333333;\\n  border-radius: 0;\\n  text-transform: uppercase;\\n  font-weight: 700;\\n  color: #333333;\\n  background-color: transparent;\\n  padding: 15px 30px;\\n  letter-spacing: 1px;\\n  -webkit-transition: all 0.5s ease-in-out;\\n  -moz-transition: all 0.5s ease-in-out;\\n  -o-transition: all 0.5s ease-in-out;\\n  -ms-transition: all 0.5s ease-in-out;\\n  transition: all 0.5s ease-in-out;\\n}\\n\\n.btn-primary.btn-transparent {\\n  border-color: transparent !important;\\n}\\n\\n.btn-primary.btn-transparent:hover,\\n.btn-primary.btn-transparent:active,\\n.btn-primary.btn-transparent:focus,\\n.btn-primary.btn-transparent.active {\\n  color: #a7a7a7;\\n  border-color: transparent !important;\\n  background-color: transparent !important;\\n}\\n\\n.btn-primary:hover,\\n.btn-primary:focus,\\n.btn-primary:active,\\n.btn-primary.active,\\n.open .dropdown-toggle.btn-primary {\\n  border-color: #333333;\\n  color: #f3f3f3;\\n  background-color: #333333;\\n  -webkit-transition: all 0.5s ease-in-out;\\n  -moz-transition: all 0.5s ease-in-out;\\n  -o-transition: all 0.5s ease-in-out;\\n  -ms-transition: all 0.5s ease-in-out;\\n  transition: all 0.5s ease-in-out;\\n}\\n\\n.btn-primary:active,\\n.btn-primary.active,\\n.open .dropdown-toggle.btn-primary {\\n  background-image: none;\\n}\\n\\n.btn-primary.disabled,\\n.btn-primary[disabled],\\nfieldset[disabled] .btn-primary,\\n.btn-primary.disabled:hover,\\n.btn-primary[disabled]:hover,\\nfieldset[disabled] .btn-primary:hover,\\n.btn-primary.disabled:focus,\\n.btn-primary[disabled]:focus,\\nfieldset[disabled] .btn-primary:focus,\\n.btn-primary.disabled:active,\\n.btn-primary[disabled]:active,\\nfieldset[disabled] .btn-primary:active,\\n.btn-primary.disabled.active,\\n.btn-primary[disabled].active,\\nfieldset[disabled] .btn-primary.active {\\n  border-color: #333333;\\n  background-color: #333333;\\n}\\n\\n.btn-default,\\n.btn-default.disabled {\\n  border-color: transparent;\\n}\\n\\n.btn-white {\\n  border-color: #f3f3f3;\\n  color: #f3f3f3;\\n}\\n\\n.btn-primary:hover,\\n.btn-primary:focus,\\n.btn-primary:active,\\n.btn-primary.active {\\n  border-color: #f3f3f3;\\n  color: #333333;\\n  background-color: #f3f3f3;\\n}\\n\\n.navbar-nav {\\n  float: none;\\n  margin: 0 auto;\\n}\\n\\n.navbar-nav > li {\\n  float: none;\\n  display: inline-block;\\n}\\n\\n.navbar-default {\\n  border-color: transparent;\\n  background-color: transparent;\\n}\\n\\n.navbar-default .navbar-brand, .navbar-default .nav li a.navbar-brand {\\n  margin-top: 0;\\n  letter-spacing: 5px;\\n  font-size: 40px;\\n  font-weight: 700;\\n  font-family: \\\"Dancing Script\\\";\\n  text-transform: none;\\n  color: white;\\n  line-height: 40px;\\n  padding: 21px 25px 30px;\\n}\\n\\n.navbar-default .navbar-brand:hover,\\n.navbar-default .navbar-brand:focus,\\n.navbar-default .navbar-brand:active,\\n.navbar-default .navbar-brand.active {\\n  color: #333333;\\n}\\n\\n.navbar-default .navbar-collapse {\\n  border-color: rgba(255, 255, 255, 0.02);\\n}\\n\\n.navbar-default .navbar-toggle,\\n.navbar-default .navbar-toggle:hover,\\n.navbar-default .navbar-toggle:focus {\\n  border-color: transparent;\\n  background-color: transparent;\\n}\\n\\n.navbar-default .navbar-toggle .icon-bar {\\n  background-color: white;\\n}\\n\\n.caret {\\n  margin-top: -3px;\\n}\\n\\n.navbar-default .nav li a {\\n  text-transform: uppercase;\\n  font-weight: 700;\\n  font-size: 14px;\\n  color: #333333;\\n  padding: 25px 15px;\\n  -webkit-transition: all 0.5s ease-in-out;\\n  -moz-transition: all 0.5s ease-in-out;\\n  -o-transition: all 0.5s ease-in-out;\\n  -ms-transition: all 0.5s ease-in-out;\\n  transition: all 0.5s ease-in-out;\\n  letter-spacing: 1px;\\n}\\n\\n.navbar-default.background--dark .nav li > a,\\n.navbar-default.background--dark .navbar-brand,\\n#headerwrap.background--dark .intro-text, .navbar-default .nav li > a,\\n.navbar-default .navbar-brand,\\n#headerwrap .intro-text {\\n  color: #f3f3f3;\\n}\\n\\n.navbar-default .nav li a:hover, .navbar-default .nav li a:focus {\\n  color: white;\\n}\\n\\n.navbar-default .nav li.dropdown.open > a, .navbar-default .dropdown-menu a {\\n  color: #333333 !important;\\n}\\n\\n.navbar-default .nav .dropdown-menu li a {\\n  padding: 15px 20px;\\n  font-size: 14px;\\n}\\n\\n#headerwrap .btn-primary {\\n  border-color: #f3f3f3;\\n  color: #f3f3f3;\\n}\\n\\n.navbar-default .nav li a:hover,\\n.navbar-default .nav li a:focus {\\n  outline: 0;\\n  color: #333333;\\n}\\n\\n.navbar-default .navbar-nav > .active > a {\\n  border-radius: 0;\\n  background-color: transparent;\\n  color: white;\\n  -webkit-transition: all 0.5s ease-in-out;\\n  -moz-transition: all 0.5s ease-in-out;\\n  -o-transition: all 0.5s ease-in-out;\\n  -ms-transition: all 0.5s ease-in-out;\\n  transition: all 0.5s ease-in-out;\\n}\\n\\n.navbar-default.navbar-shrink .nav li > a,\\n.navbar-default.navbar-shrink .navbar-brand {\\n  color: #333333;\\n}\\n\\n.navbar-default .navbar-nav > .active > a:hover,\\n.navbar-default .navbar-nav > .active > a:focus {\\n  color: #c10e1f;\\n  background-color: transparent;\\n}\\n\\n.dropdown-menu {\\n  position: absolute;\\n  top: 100%;\\n  left: 0;\\n  z-index: 1000;\\n  display: none;\\n  float: left;\\n  min-width: 160px;\\n  padding: 0;\\n  margin: 2px 0 0;\\n  font-size: 12px;\\n  text-align: left;\\n  list-style: none;\\n  background-color: white;\\n  -webkit-background-clip: padding-box;\\n  background-clip: padding-box;\\n  border: none;\\n  border-radius: 0;\\n  -webkit-box-shadow: none;\\n  box-shadow: none;\\n}\\n\\n.navbar-default.navbar-shrink .nav .dropdown-menu li a {\\n  color: #333333;\\n}\\n\\n.navbar-default.navbar-shrink .nav .dropdown-menu li a:hover,\\n.navbar-default .nav .dropdown-menu li a:hover {\\n  color: #333333;\\n  background-color: #eeeeee;\\n}\\n\\n@media (max-width: 767px) {\\n  .navbar-default .nav li > a,\\n.navbar-default.navbar-shrink .nav li > a {\\n    color: #333333;\\n  }\\n\\n  .navbar-default,\\n.navbar-default.navbar-shrink {\\n    background-color: white;\\n  }\\n\\n  .navbar-default .navbar-brand.logo {\\n    padding: 0;\\n    color: #333333;\\n  }\\n\\n  #main-navigation {\\n    background-color: white;\\n  }\\n\\n  .navbar-default .navbar-toggle .icon-bar {\\n    background-color: #333333;\\n  }\\n}\\n@media (max-width: 419px) {\\n  .navbar-default .nav li a {\\n    padding: 15px 9px;\\n  }\\n\\n  .navbar-default .navbar-brand.logo {\\n    font-size: 24px;\\n    line-height: 50px;\\n  }\\n}\\n/*-----------------------------------------------------------------------------------*/\\n/*  5 - HEADER\\r\\n/*-----------------------------------------------------------------------------------*/\\n#headerwrap {\\n  overflow: hidden;\\n}\\n\\n.opaque {\\n  background-color: transparent !important;\\n}\\n\\n.backstretch:before {\\n  content: \\\"\\\";\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  background-color: rgba(91, 91, 88, 0.4);\\n  top: 0;\\n  left: 0;\\n}\\n\\n#tubular-container {\\n  z-index: -1 !important;\\n  position: absolute !important;\\n}\\n\\nheader {\\n  text-align: center;\\n  color: #333;\\n}\\n\\nheader .intro-text {\\n  padding-top: 100px;\\n  padding-bottom: 50px;\\n  color: #333;\\n}\\n\\nheader .intro-text .intro-lead-in {\\n  margin-bottom: 25px;\\n  font-size: 22px;\\n  text-transform: none;\\n  line-height: 22px;\\n}\\n\\nheader .intro-text .intro-heading {\\n  font-size: 48px;\\n  margin-bottom: 60px;\\n  text-transform: uppercase;\\n  font-size: 30px;\\n  font-weight: 300;\\n  line-height: 30px;\\n}\\n\\n.intro-heading span {\\n  clear: both;\\n  display: block;\\n  margin-bottom: 24px;\\n  font-size: 70px;\\n  line-height: 1;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  6 - SECTIONS\\r\\n/*-----------------------------------------------------------------------------------*/\\nsection {\\n  /*background-color: #ffffff;*/\\n  clear: both;\\n  position: relative;\\n}\\n\\n/*.silver-bg {\\r\\n    background-color: #DADFE1\\r\\n}\\r\\n\\r\\n.dark-wrapper {\\r\\n    background-color: #111111\\r\\n}*/\\n.white-bg {\\n  background-color: white;\\n}\\n\\n.dark-wrapper.opaqued, .dark-opaqued {\\n  position: relative;\\n  /*background-color: rgba(91, 91, 88, 0.6);*/\\n}\\n.dark-wrapper.opaqued:before, .dark-opaqued:before {\\n  content: \\\"\\\";\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n  background-color: rgba(91, 91, 88, 0.6);\\n}\\n\\n.light-opaqued {\\n  position: relative;\\n  /*background-color: rgba(91, 91, 88, 0.6);*/\\n}\\n.light-opaqued:before {\\n  content: \\\"\\\";\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n  background-color: rgba(91, 91, 88, 0.6);\\n}\\n\\n#headerwrap.opaqued {\\n  background-color: rgba(0, 0, 0, 0.4);\\n}\\n\\n.dark-wrapper h1,\\n.dark-wrapper h2,\\n.dark-wrapper h3,\\n.dark-wrapper h4,\\n.dark-wrapper h5,\\n.dark-wrapper h6,\\n.dark-wrapper p,\\n.dark-wrapper a,\\n.dark-wrapper {\\n  color: #f3f3f3;\\n}\\n\\n.section-inner {\\n  padding: 120px 0;\\n}\\n@media (max-width: 575px) {\\n  .section-inner {\\n    padding: 45px 0;\\n  }\\n}\\n\\nsection h2.section-heading, .section-heading {\\n  margin-top: 0;\\n  margin-bottom: 10px;\\n  font-size: 34px;\\n  letter-spacing: 5px;\\n}\\n\\nsection h3.section-subheading {\\n  text-transform: lowercase;\\n  font-size: 25px;\\n  font-weight: 400;\\n  clear: both;\\n  display: block;\\n  padding-top: 10px;\\n  letter-spacing: 1px;\\n}\\n\\n.cl-effect-3 a {\\n  padding: 8px 0;\\n}\\n\\n.cl-effect-3 a::after {\\n  position: absolute;\\n  top: 100%;\\n  left: 0;\\n  width: 100%;\\n  height: 3px;\\n  background: rgba(255, 255, 255, 0.5);\\n  content: \\\"\\\";\\n  opacity: 0;\\n  margin-top: -3px;\\n  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;\\n  -moz-transition: opacity 0.3s, -moz-transform 0.3s;\\n  transition: opacity 0.3s, transform 0.3s;\\n  -webkit-transform: translateY(10px);\\n  -moz-transform: translateY(10px);\\n  transform: translateY(10px);\\n}\\n\\n.navbar-shrink .cl-effect-3 a::after {\\n  background: rgba(0, 0, 0, 0.2);\\n}\\n\\n.cl-effect-3 a:hover::after,\\n.cl-effect-3 a:focus::after {\\n  opacity: 1;\\n  -webkit-transform: translateY(0px);\\n  -moz-transform: translateY(0px);\\n  transform: translateY(0px);\\n}\\n\\nfooter {\\n  padding: 15px 0;\\n}\\n\\n.item-caption .lead {\\n  font-size: 14px;\\n  text-align: center;\\n}\\n.item-caption .lead.secondary-font {\\n  font-size: 21px;\\n  text-align: right;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  10 - HOVER CAPTIONS \\r\\n/*-----------------------------------------------------------------------------------*/\\n.hover-item {\\n  position: relative;\\n  overflow: hidden;\\n}\\n\\n.hover-item img {\\n  -moz-transform: scale(1);\\n  -webkit-transform: scale(1);\\n  -o-transform: scale(1);\\n  -ms-transform: scale(1);\\n  transform: scale(1);\\n}\\n\\n.overlay-item-caption {\\n  opacity: 1;\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  left: 0;\\n  top: 0;\\n  background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0.75) 100%);\\n  /* FF3.6+ */\\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(28%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0.75)));\\n  /* Chrome,Safari4+ */\\n  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0.75) 100%);\\n  /* Chrome10+,Safari5.1+ */\\n  background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0.75) 100%);\\n  /* Opera 11.10+ */\\n  background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0.75) 100%);\\n  /* IE10+ */\\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0.75) 100%);\\n  /* W3C */\\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\\\"#00000000\\\", endColorstr=\\\"#a6000000\\\",GradientType=0 );\\n  /* IE6-9 */\\n  text-align: center;\\n  text-shadow: 0 0 1px #000;\\n}\\n\\n.hover-item-caption {\\n  opacity: 0;\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  left: 0;\\n  top: 0px;\\n  background-color: rgba(0, 0, 0, 0.8);\\n  text-align: center;\\n  z-index: 2;\\n}\\n\\n.hover-item:hover .hover-item-caption {\\n  opacity: 1;\\n}\\n\\n.hover-item-caption h3, .hover-item-caption .smoothie {\\n  top: 30px;\\n  position: relative;\\n}\\n\\n.hover-item:hover .hover-item-caption h3, .hover-item:hover .smoothie {\\n  top: 0px;\\n}\\n\\n.hover-item:hover .overlay-item-caption {\\n  opacity: 0;\\n  top: 30px;\\n}\\n\\n.hover-item:hover .overlay-item-caption .vertical-center {\\n  opacity: 0;\\n}\\n\\n.hover-item:hover img {\\n  -moz-transform: scale(1.2);\\n  -webkit-transform: scale(1.2);\\n  -o-transform: scale(1.2);\\n  -ms-transform: scale(1.2);\\n  transform: scale(1.2);\\n}\\n\\n.hover-item-caption h3, .overlay-item-caption h3 {\\n  font-size: 26px;\\n  margin: 0;\\n  color: #fefefe;\\n  font-weight: 400;\\n  letter-spacing: 7px;\\n}\\n\\n.overlay-item-caption strong {\\n  color: #fefefe;\\n  padding-bottom: 16px;\\n  font-weight: 400;\\n  text-transform: uppercase;\\n  display: block;\\n  letter-spacing: 4px;\\n}\\n\\n.overlay-item-caption .thin-hr:after, .dark-wrapper .thin-hr:after {\\n  background-color: #fff;\\n}\\n\\n.overlay-item-caption .post-excerpt {\\n  font-style: italic;\\n  color: #fefefe;\\n  padding-top: 16px;\\n  font-size: 16px;\\n  padding-left: 15%;\\n  padding-right: 15%;\\n}\\n\\n.hover-item-caption h3 span, .overlay-item-caption h3 span, .hover-item-caption h2 span {\\n  clear: both;\\n  display: block;\\n  text-transform: none;\\n  font-size: 20px;\\n  color: #fefefe;\\n}\\n\\n.hover-item-caption h2 span {\\n  display: inline-block;\\n}\\n\\n.hover-item-caption a, .overlay-item-caption a {\\n  color: #fefefe;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  11 - FOOTER\\r\\n/*-----------------------------------------------------------------------------------*/\\n#footer-widgets {\\n  border-top: 1px solid #333;\\n}\\n\\n#footer-widgets .section-inner {\\n  padding-bottom: 80px;\\n}\\n\\nfooter.white-wrapper {\\n  padding: 120px 0;\\n  clear: both;\\n}\\n\\nfooter.white-wrapper span.copyright {\\n  letter-spacing: 1px;\\n  text-transform: uppercase;\\n  text-transform: none;\\n  line-height: 40px;\\n}\\n\\nfooter.white-wrapper .social-links li {\\n  padding: 15px 30px;\\n}\\n\\nfooter.white-wrapper .social-links li a {\\n  text-transform: uppercase;\\n  letter-spacing: 1px;\\n  font-size: 26px;\\n}\\n\\n.widget-title {\\n  margin-bottom: 30px;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  12 - CAROUSEL STYLES\\r\\n/*-----------------------------------------------------------------------------------*/\\n.fw-carousel .owl-item {\\n  padding: 0;\\n}\\n.fw-carousel .hover-item-caption h3 {\\n  font-size: 20px;\\n}\\n\\n.owl-theme .owl-controls {\\n  counter-reset: owl;\\n}\\n.owl-theme .owl-controls .owl-page {\\n  /*&:first-child{\\r\\n      transform: rotate(180deg);\\r\\n  }*/\\n}\\n.owl-theme .owl-controls .owl-page span {\\n  position: relative;\\n  border: none;\\n  /*width: 10px;\\r\\n  height: 18px;\\r\\n  border: 9px solid transparent;\\r\\n  border-left: 10px solid rgb(255, 255, 255);*/\\n}\\n.owl-theme .owl-controls .owl-page span:before {\\n  counter-increment: owl;\\n  content: counter(owl);\\n  position: absolute;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  14 - SPLASH\\r\\n/*-----------------------------------------------------------------------------------*/\\n.preloader {\\n  background-color: #ffffff;\\n  position: fixed;\\n  width: 100%;\\n  height: 100%;\\n  z-index: 9999999;\\n  top: 0;\\n  left: 0;\\n}\\n\\n.preloader span {\\n  text-transform: none;\\n  font-size: 34px;\\n}\\n\\n.preloader .preloader-img {\\n  width: 40px;\\n  height: 40px;\\n  position: absolute;\\n  top: 50%;\\n  left: 50%;\\n  margin-left: -20px;\\n  margin-top: -40px;\\n}\\n\\n.preloader .preloader-img img {\\n  max-height: 40px;\\n}\\n\\n@keyframes flickerAnimation {\\n  0% {\\n    opacity: 1;\\n  }\\n  50% {\\n    opacity: 0.8;\\n  }\\n  100% {\\n    opacity: 1;\\n  }\\n}\\n@-o-keyframes flickerAnimation {\\n  0% {\\n    opacity: 1;\\n  }\\n  50% {\\n    opacity: 0.8;\\n  }\\n  100% {\\n    opacity: 1;\\n  }\\n}\\n@-moz-keyframes flickerAnimation {\\n  0% {\\n    opacity: 1;\\n  }\\n  50% {\\n    opacity: 0.8;\\n  }\\n  100% {\\n    opacity: 1;\\n  }\\n}\\n@-webkit-keyframes flickerAnimation {\\n  0% {\\n    opacity: 1;\\n  }\\n  50% {\\n    opacity: 0.8;\\n  }\\n  100% {\\n    opacity: 1;\\n  }\\n}\\n.animate-flicker {\\n  -webkit-animation: flickerAnimation 2s infinite;\\n  -moz-animation: flickerAnimation 2s infinite;\\n  -o-animation: flickerAnimation 2s infinite;\\n  animation: flickerAnimation 2s infinite;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  15 - MAP\\r\\n/*-----------------------------------------------------------------------------------*/\\n#mapwrapper {\\n  max-height: 230px;\\n  clear: both;\\n  position: relative;\\n  display: block;\\n}\\n\\n#mapwrapper iframe {\\n  /*-webkit-filter: grayscale(100%);\\r\\n  -moz-filter: grayscale(100%);\\r\\n  -ms-filter: grayscale(100%);\\r\\n  -o-filter: grayscale(100%);\\r\\n  filter: grayscale(100%);\\r\\n  filter: url(grayscale.svg);*/\\n  /* Firefox 4+ */\\n  filter: gray;\\n  /* IE 6-9 */\\n  max-width: 100%;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  16 - FORM CONTROL\\r\\n/*-----------------------------------------------------------------------------------*/\\n.dark-wrapper textarea.form-control {\\n  background-color: rgba(213, 223, 220, 0.2);\\n  border: 1px solid #d5dfdc;\\n  margin-bottom: 10px;\\n  height: 180px;\\n}\\n\\n.dark-wrapper input.form-control {\\n  background-color: rgba(213, 223, 220, 0.2);\\n  border: 1px solid #d5dfdc;\\n  margin-bottom: 10px;\\n  float: left;\\n  width: calc(50% - 5px);\\n}\\n@media (max-width: 575px) {\\n  .dark-wrapper input.form-control {\\n    width: 100%;\\n  }\\n}\\n.dark-wrapper input.form-control:first-child {\\n  margin-right: 5px;\\n}\\n@media (max-width: 575px) {\\n  .dark-wrapper input.form-control:first-child {\\n    margin-right: 0;\\n  }\\n}\\n.dark-wrapper input.form-control:nth-child(2) {\\n  margin-left: 5px;\\n}\\n@media (max-width: 575px) {\\n  .dark-wrapper input.form-control:nth-child(2) {\\n    margin-left: 0;\\n  }\\n}\\n.dark-wrapper input[type=submit] {\\n  font-family: \\\"Dancing Script\\\";\\n  font-size: 30px;\\n  font-weight: 700;\\n  background-color: white;\\n  color: black;\\n  height: 62px;\\n  border: none;\\n  padding: 0 30px;\\n}\\n\\n.form-control {\\n  display: block;\\n  width: 100%;\\n  height: 40px;\\n  padding: 29px 30px;\\n  font-size: 14px;\\n  line-height: 1.42857143;\\n  color: white;\\n  background-image: none;\\n  border-radius: 0;\\n  -webkit-box-shadow: none;\\n  box-shadow: none;\\n}\\n\\n.form-control :-moz-placeholder, .form-control:-moz-placeholder,\\n.form-control :-ms-input-placeholder, .form-control:-ms-input-placeholder,\\n.form-control ::-moz-placeholder, .form-control::-moz-placeholder,\\n.form-control ::-webkit-input-placeholder, .form-control::-webkit-input-placeholder {\\n  color: white;\\n  font-weight: 300;\\n}\\n\\n.form-control::-webkit-input-placeholder {\\n  color: white;\\n  font-weight: 300;\\n}\\n\\n.form-control:-moz-placeholder {\\n  color: white;\\n  font-weight: 300;\\n}\\n\\n.main-contact-form {\\n  overflow: hidden;\\n  width: 100%;\\n}\\n\\n/**/\\n/*.form-control:-moz-placeholder {\\r\\n    color: rgba(255, 255, 255, 1);\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n    /*.form-control::-moz-placeholder {\\r\\n    /* Firefox 19+ */\\n/*color: rgba(255, 255, 255, 1);\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.form-control:-ms-input-placeholder {\\r\\n    color: rgba(255, 255, 255, 1);\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n/*.dark-wrapper .form-control::-webkit-input-placeholder,\\r\\n.white-text .form-control::-webkit-input-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control:-moz-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control::-moz-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control:-ms-input-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}*/\\n/**/\\n/*.form-control:focus, .form-control.col-md-6:focus {\\r\\n    border: 1px solid #333;\\r\\n    -webkit-box-shadow: none;\\r\\n    box-shadow: none\\r\\n}\\r\\n\\r\\n\\r\\n.dark-wrapper .form-control {\\r\\n    border: none;\\r\\n    background-color: rgba(0,0,0,0.2);\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control:focus, .dark-wrapper .form-control.col-md-6:focus {\\r\\n    border: none;\\r\\n    color: #f6f6f6;\\r\\n    -webkit-box-shadow: 0 0 0 1px #ffffff;\\r\\n    box-shadow: 0 0 0 1px #ffffff;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control.col-md-6, .dark-wrapper .form-control.col-md-6:focus {\\r\\n    width: 32.33333%;\\r\\n    border-bottom: none;\\r\\n    border: none;\\r\\n    background-color: rgba(0,0,0,0.2);\\r\\n    margin: 0 0.5% 10px;\\r\\n}\\r\\n\\r\\n.form-control.col-md-6,\\r\\n.form-control.col-md-6:focus {\\r\\n    width: 49%;\\r\\n    border-bottom: none;\\r\\n    border: 1px solid;\\r\\n    background-color: transparent;\\r\\n    margin: 0 0.5% 10px;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control.col-md-6:first-of-type {\\r\\n    border-left: none;\\r\\n}\\r\\n\\r\\n\\r\\n\\r\\n.main-contact-form textarea,\\r\\n.main-contact-form textarea:focus,\\r\\n#commentform .main-contact-form textarea,\\r\\n#commentform .main-contact-form textarea:focus {\\r\\n    min-height: 250px !important;\\r\\n}\\r\\n*/\\n/*-----------------------------------------------------------------------------------*/\\n/*  17 -  TABS\\r\\n/*-----------------------------------------------------------------------------------*/\\n.nav.nav-justified > li > a {\\n  position: relative;\\n}\\n\\n.icon-tabs li {\\n  border-right: 1px solid #111;\\n}\\n\\n.icon-tabs li a {\\n  opacity: 0.4;\\n}\\n\\n.icon-tabs li.active a {\\n  opacity: 1;\\n}\\n\\n.icon-tabs li:last-of-type, .dark-wrapper .icon-tabs li:last-of-type {\\n  border-right: none;\\n}\\n\\n.dark-wrapper .icon-tabs li {\\n  border-right: 1px solid #fefefe;\\n}\\n\\n.icon-tabs li .tabtitle {\\n  clear: both;\\n  display: block;\\n  margin: 15px 0 0;\\n  font-size: 20px;\\n  text-transform: uppercase;\\n  letter-spacing: 8px;\\n}\\n\\n.nav.nav-justified > li {\\n  display: table-cell;\\n  width: 1%;\\n}\\n\\n.nav.nav-justified > li > a:hover,\\n.nav.nav-justified > li > a:focus {\\n  background-color: transparent;\\n}\\n\\n.nav.nav-justified > li > a > .quote {\\n  position: absolute;\\n  left: 0px;\\n  top: 0;\\n  opacity: 0;\\n  width: 30px;\\n  height: 30px;\\n  padding: 5px;\\n  background-color: #13c0ba;\\n  border-radius: 15px;\\n  color: #fff;\\n}\\n\\n.nav.nav-justified > li.active > a > .quote {\\n  opacity: 1;\\n}\\n\\n.nav.nav-justified > li > a > img {\\n  box-shadow: 0 0 0 5px #13c0ba;\\n}\\n\\n.nav.nav-justified > li > a > img {\\n  max-width: 100%;\\n  opacity: 0.3;\\n  -webkit-transform: scale(0.8, 0.8);\\n  transform: scale(0.8, 0.8);\\n  -webkit-transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\n  transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\n}\\n\\n.nav.nav-justified > li.active > a > img,\\n.nav.nav-justified > li:hover > a > img,\\n.nav.nav-justified > li:focus > a > img {\\n  opacity: 1;\\n  -webkit-transform: none;\\n  transform: none;\\n  -webkit-transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\n  transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\n}\\n\\n.tab-pane .tab-inner {\\n  padding: 30px 0 20px;\\n}\\n\\n@media (min-width: 768px) {\\n  .nav.nav-justified > li > a > .quote {\\n    left: auto;\\n    top: auto;\\n    right: 20px;\\n    bottom: 0px;\\n  }\\n\\n  .nav.nav-justified > li > a {\\n    padding: 10px 15px;\\n  }\\n\\n  .tab-content {\\n    margin-top: 60px;\\n  }\\n}\\n.icon-tabs li.silver-bg.active {\\n  background-color: #edeff0;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  18 - COUNTDOWN\\r\\n/*-----------------------------------------------------------------------------------*/\\n#countdown span {\\n  width: 25%;\\n  display: inline-block;\\n  float: left;\\n  font-size: 70px;\\n  font-weight: 300;\\n}\\n\\n#countdown small {\\n  font-weight: 300;\\n  font-size: 18px;\\n  display: block;\\n  clear: both;\\n  text-transform: uppercase;\\n  letter-spacing: 2px;\\n}\\n\\n#countdown {\\n  overflow: hidden;\\n  padding-bottom: 80px;\\n}\\n\\n#when .lead, #where .lead, #when p, #where p {\\n  font-size: 16px;\\n}\\n\\n/*-----------------------------------------------------------------------------------*/\\n/*  19 - MEDIA QUERIES\\r\\n/*-----------------------------------------------------------------------------------*/\\n@media (max-width: 991px) {\\n  #where .lead,\\n#when .lead {\\n    font-size: 40px;\\n    font-weight: 700;\\n    text-transform: uppercase;\\n    letter-spacing: 2px;\\n  }\\n}\\n@media (min-width: 767px) {\\n  header .intro-text {\\n    padding-top: 420px;\\n    padding-bottom: 100px;\\n  }\\n\\n  header .intro-text .intro-lead-in {\\n    margin-bottom: 20px;\\n    font-size: 40px;\\n    font-style: normal;\\n    line-height: 40px;\\n    letter-spacing: -1px;\\n  }\\n\\n  header .intro-text .intro-heading {\\n    margin-bottom: 40px;\\n    text-transform: uppercase;\\n    font-size: 36px;\\n    font-weight: 700;\\n    letter-spacing: 4px;\\n    line-height: 38px;\\n  }\\n\\n  .navbar-fixed-top .container-fluid {\\n    padding-left: 30px;\\n    padding-right: 30px;\\n  }\\n\\n  li.dropdown:hover ul.dropdown-menu {\\n    opacity: 1;\\n  }\\n\\n  li.dropdown:hover ul.dropdown-menu {\\n    display: block;\\n    -webkit-animation: fadeIn 0.4s;\\n    animation: fadeIn 0.4s;\\n    -webkit-animation-fill-mode: forwards;\\n    animation-fill-mode: forwards;\\n  }\\n}\\n@media (min-width: 768px) {\\n  .navbar-default {\\n    padding: 0px 0;\\n    border: 0;\\n    background-color: transparent;\\n    -webkit-transition: all 0.5s ease-in-out;\\n    -moz-transition: all 0.5s ease-in-out;\\n    -o-transition: all 0.5s ease-in-out;\\n    -ms-transition: all 0.5s ease-in-out;\\n    transition: all 0.5s ease-in-out;\\n  }\\n\\n  .navbar-default .navbar-brand {\\n    font-size: 2em;\\n    -webkit-transition: all 0.3s;\\n    -moz-transition: all 0.3s;\\n    transition: all 0.3s;\\n  }\\n\\n  .navbar-default.navbar-shrink {\\n    padding: 0;\\n    background-color: #ffffff;\\n    -webkit-transition: all 0.5s ease-in-out;\\n    -moz-transition: all 0.5s ease-in-out;\\n    -o-transition: all 0.5s ease-in-out;\\n    -ms-transition: all 0.5s ease-in-out;\\n    transition: all 0.5s ease-in-out;\\n  }\\n}\\n@media (max-width: 768px) {\\n  .fullheight, .fullheight .article-slide, .fullheight .article-slide .carousel-inner, .fullheight .article-slide .item, .fullheight .article-slide .item img {\\n    height: auto !important;\\n    min-height: 600px;\\n  }\\n\\n  .icon-tabs .fa-4x {\\n    font-size: 46px;\\n  }\\n\\n  .icon-tabs li .tabtitle {\\n    font-size: 12px;\\n    letter-spacing: 4px;\\n    margin: 0;\\n  }\\n\\n  .dark-wrapper .icon-tabs li {\\n    border-right: none;\\n  }\\n\\n  .form-control.col-md-4, .dark-wrapper.form-control.col-md-4 {\\n    width: 100% !important;\\n  }\\n}\\n@media (max-width: 575px) {\\n  #where .lead,\\n#when .lead {\\n    font-size: 24px;\\n  }\\n}\\n@media (max-width: 460px) {\\n  .fullheight, .fullheight .article-slide, .fullheight .article-slide .carousel-inner, .fullheight .article-slide .item, .fullheight .article-slide .item img {\\n    height: auto !important;\\n    min-height: 400px;\\n  }\\n}\\n.testimonial-owl .hover-item {\\n  margin-left: 0;\\n  margin-right: 0;\\n}\\n\\n.testimonial-owl .hover-item .col-xs-12 {\\n  padding-left: 0;\\n  padding-right: 0;\\n}\\n\\n.testimonial-author {\\n  max-width: 100px;\\n  margin: 0 auto;\\n}\\n\\n@media (max-width: 768px) {\\n  #side-wrapper {\\n    display: none;\\n    background-color: #ffffff;\\n  }\\n\\n  .side-nav-active .master-wrapper {\\n    padding-left: 0;\\n  }\\n\\n  #side-wrapper .navbar-default .nav li a {\\n    padding: 10px 20px;\\n  }\\n}\\n.nopadding-bottom {\\n  padding-bottom: 0 !important;\\n}\\n\\n.footer-goodbye {\\n  font-family: \\\"Dancing Script\\\";\\n  text-transform: none !important;\\n  font-size: 45px;\\n  margin-bottom: 44px;\\n  letter-spacing: 2px;\\n  font-weight: 700;\\n}\\n\\n#fettiwrap {\\n  position: absolute;\\n  left: 0;\\n  top: 0;\\n  height: 100%;\\n  width: 100%;\\n}\\n\\n/* INSTAGRAM */\\n.instafeed-wrapper {\\n  position: relative;\\n  overflow: hidden;\\n}\\n\\n.instafeed-overlay {\\n  background-color: rgba(0, 0, 0, 0.6);\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  top: 0;\\n  left: 0;\\n  text-align: center;\\n}\\n\\n.instafeed-overlay .lead {\\n  font-size: 80px;\\n}\\n\\n#instafeed img {\\n  width: 16.666666%;\\n}\\n\\n.a-quote {\\n  font-size: 73px;\\n  line-height: 68px;\\n  color: white;\\n}\\n@media (max-width: 575px) {\\n  .a-quote {\\n    font-size: 30px;\\n    line-height: 25px;\\n  }\\n}\\n\\n/*#contact-tabs .tabtitle {\\r\\n    margin-top: 0;\\r\\n}\\r\\n\\r\\n#contact-tabs .icon-tabs li {\\r\\n    border-right: none;\\r\\n}*/\",\"$white      : rgb(255, 255, 255);\\r\\n$light-gray : rgb(243, 243, 243);\\r\\n$dark-gray  : rgb( 51, 51, 51);\\r\\n$theme-color: rgb(193, 14, 31);\\r\\n\",\"@import \\\"variables\\\";\\r\\n.btn {\\r\\n    font-family: 'Open Sans', \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\r\\n}\\r\\n\\r\\n.btn:focus,\\r\\n.btn:active:focus,\\r\\n.btn.active:focus,\\r\\n.btn:active,\\r\\n.btn.active {\\r\\n    outline: none;\\r\\n    box-shadow: none\\r\\n}\\r\\n\\r\\n.btn-primary {\\r\\n    border-color: $dark-gray;\\r\\n    border-radius: 0;\\r\\n    text-transform: uppercase;\\r\\n    font-weight: 700;\\r\\n    color: $dark-gray;\\r\\n    background-color: transparent;\\r\\n    padding: 15px 30px;\\r\\n    letter-spacing: 1px;\\r\\n    -webkit-transition: all .5s ease-in-out;\\r\\n    -moz-transition: all .5s ease-in-out;\\r\\n    -o-transition: all .5s ease-in-out;\\r\\n    -ms-transition: all .5s ease-in-out;\\r\\n    transition: all .5s ease-in-out\\r\\n}\\r\\n\\r\\n.btn-primary.btn-transparent {\\r\\n    border-color: transparent !important\\r\\n}\\r\\n\\r\\n.btn-primary.btn-transparent:hover,\\r\\n.btn-primary.btn-transparent:active,\\r\\n.btn-primary.btn-transparent:focus,\\r\\n.btn-primary.btn-transparent.active {\\r\\n    color: rgb(167, 167, 167);\\r\\n    border-color: transparent !important;\\r\\n    background-color: transparent !important\\r\\n}\\r\\n\\r\\n.btn-primary:hover,\\r\\n.btn-primary:focus,\\r\\n.btn-primary:active,\\r\\n.btn-primary.active,\\r\\n.open .dropdown-toggle.btn-primary {\\r\\n    border-color: $dark-gray;\\r\\n    color: $light-gray ;\\r\\n    background-color: $dark-gray;\\r\\n    -webkit-transition: all .5s ease-in-out;\\r\\n    -moz-transition: all .5s ease-in-out;\\r\\n    -o-transition: all .5s ease-in-out;\\r\\n    -ms-transition: all .5s ease-in-out;\\r\\n    transition: all .5s ease-in-out\\r\\n}\\r\\n\\r\\n.btn-primary:active,\\r\\n.btn-primary.active,\\r\\n.open .dropdown-toggle.btn-primary {\\r\\n    background-image: none\\r\\n}\\r\\n\\r\\n.btn-primary.disabled,\\r\\n.btn-primary[disabled],\\r\\nfieldset[disabled] .btn-primary,\\r\\n.btn-primary.disabled:hover,\\r\\n.btn-primary[disabled]:hover,\\r\\nfieldset[disabled] .btn-primary:hover,\\r\\n.btn-primary.disabled:focus,\\r\\n.btn-primary[disabled]:focus,\\r\\nfieldset[disabled] .btn-primary:focus,\\r\\n.btn-primary.disabled:active,\\r\\n.btn-primary[disabled]:active,\\r\\nfieldset[disabled] .btn-primary:active,\\r\\n.btn-primary.disabled.active,\\r\\n.btn-primary[disabled].active,\\r\\nfieldset[disabled] .btn-primary.active {\\r\\n    border-color: $dark-gray;\\r\\n    background-color: $dark-gray\\r\\n}\\r\\n\\r\\n.btn-default,\\r\\n.btn-default.disabled {\\r\\n    border-color: transparent\\r\\n}\\r\\n\\r\\n.btn-white {\\r\\n    border-color: $light-gray ;\\r\\n    color: $light-gray ;\\r\\n}\\r\\n\\r\\n.btn-primary:hover,\\r\\n.btn-primary:focus,\\r\\n.btn-primary:active,\\r\\n.btn-primary.active {\\r\\n    border-color: $light-gray ;\\r\\n    color: $dark-gray;\\r\\n    background-color: $light-gray ;\\r\\n}\\r\\n\",\"@import \\\"variables\\\";\\r\\n.navbar-nav {\\r\\n    float: none;\\r\\n    margin: 0 auto;\\r\\n}\\r\\n\\r\\n.navbar-nav > li {\\r\\n    float: none;\\r\\n    display: inline-block;\\r\\n}\\r\\n\\r\\n.navbar-default {\\r\\n    border-color: transparent;\\r\\n    background-color: transparent;\\r\\n}\\r\\n\\r\\n\\r\\n.navbar-default .navbar-brand, .navbar-default .nav li a.navbar-brand {\\r\\n    margin-top: 0;\\r\\n    letter-spacing: 5px;\\r\\n    font-size: 40px;\\r\\n    font-weight: 700;\\r\\n    font-family: 'Dancing Script';\\r\\n    text-transform: none;\\r\\n    color: $white;\\r\\n    line-height: 40px;\\r\\n    padding: 21px 25px 30px;\\r\\n}\\r\\n\\r\\n.navbar-default .navbar-brand:hover,\\r\\n.navbar-default .navbar-brand:focus,\\r\\n.navbar-default .navbar-brand:active,\\r\\n.navbar-default .navbar-brand.active {\\r\\n    color: $dark-gray;\\r\\n}\\r\\n\\r\\n.navbar-default .navbar-collapse {\\r\\n    border-color: rgba(255, 255, 255, .02)\\r\\n}\\r\\n\\r\\n.navbar-default .navbar-toggle,\\r\\n.navbar-default .navbar-toggle:hover,\\r\\n.navbar-default .navbar-toggle:focus {\\r\\n    border-color: transparent;\\r\\n    background-color: transparent\\r\\n}\\r\\n\\r\\n.navbar-default .navbar-toggle .icon-bar {\\r\\n    background-color: $white;\\r\\n}\\r\\n\\r\\n.caret {\\r\\n    margin-top: -3px\\r\\n}\\r\\n\\r\\n.navbar-default .nav li a {\\r\\n    text-transform: uppercase;\\r\\n    font-weight: 700;\\r\\n    font-size: 14px;\\r\\n    color: $dark-gray;\\r\\n    padding: 25px 15px;\\r\\n    -webkit-transition: all .5s ease-in-out;\\r\\n    -moz-transition: all .5s ease-in-out;\\r\\n    -o-transition: all .5s ease-in-out;\\r\\n    -ms-transition: all .5s ease-in-out;\\r\\n    transition: all .5s ease-in-out;\\r\\n    letter-spacing: 1px;\\r\\n}\\r\\n\\r\\n.navbar-default.background--dark .nav li > a,\\r\\n.navbar-default.background--dark .navbar-brand,\\r\\n#headerwrap.background--dark .intro-text, .navbar-default .nav li > a,\\r\\n.navbar-default .navbar-brand,\\r\\n#headerwrap .intro-text {\\r\\n    color: $light-gray;\\r\\n}\\r\\n\\r\\n.navbar-default .nav li a:hover, .navbar-default .nav li a:focus {\\r\\n    color: $white;\\r\\n}\\r\\n\\r\\n\\r\\n.navbar-default .nav li.dropdown.open > a, .navbar-default .dropdown-menu a {\\r\\n    color: $dark-gray !important;\\r\\n}\\r\\n\\r\\n.navbar-default .nav .dropdown-menu li a {\\r\\n    padding: 15px 20px;\\r\\n    font-size: 14px;\\r\\n}\\r\\n\\r\\n#headerwrap .btn-primary {\\r\\n    border-color: $light-gray;\\r\\n    color: $light-gray;\\r\\n}\\r\\n\\r\\n.navbar-default .nav li a:hover,\\r\\n.navbar-default .nav li a:focus {\\r\\n    outline: 0;\\r\\n    color: $dark-gray;\\r\\n}\\r\\n\\r\\n.navbar-default .navbar-nav > .active > a {\\r\\n    border-radius: 0;\\r\\n    background-color: transparent;\\r\\n    color: $white;\\r\\n    -webkit-transition: all .5s ease-in-out;\\r\\n    -moz-transition: all .5s ease-in-out;\\r\\n    -o-transition: all .5s ease-in-out;\\r\\n    -ms-transition: all .5s ease-in-out;\\r\\n    transition: all .5s ease-in-out\\r\\n}\\r\\n\\r\\n.navbar-default.navbar-shrink .nav li > a,\\r\\n.navbar-default.navbar-shrink .navbar-brand {\\r\\n    color: $dark-gray;\\r\\n}\\r\\n\\r\\n.navbar-default .navbar-nav > .active > a:hover,\\r\\n.navbar-default .navbar-nav > .active > a:focus {\\r\\n    color: $theme-color;\\r\\n    background-color: transparent;\\r\\n}\\r\\n\\r\\n.dropdown-menu {\\r\\n    position: absolute;\\r\\n    top: 100%;\\r\\n    left: 0;\\r\\n    z-index: 1000;\\r\\n    display: none;\\r\\n    float: left;\\r\\n    min-width: 160px;\\r\\n    padding: 0;\\r\\n    margin: 2px 0 0;\\r\\n    font-size: 12px;\\r\\n    text-align: left;\\r\\n    list-style: none;\\r\\n    background-color: $white;\\r\\n    -webkit-background-clip: padding-box;\\r\\n    background-clip: padding-box;\\r\\n    border: none;\\r\\n    border-radius: 0;\\r\\n    -webkit-box-shadow: none;\\r\\n    box-shadow: none\\r\\n}\\r\\n\\r\\n.navbar-default.navbar-shrink .nav .dropdown-menu li a {\\r\\n    color: $dark-gray;\\r\\n}\\r\\n\\r\\n.navbar-default.navbar-shrink .nav .dropdown-menu li a:hover,\\r\\n.navbar-default .nav .dropdown-menu li a:hover {\\r\\n    color: $dark-gray;\\r\\n    background-color: rgb(238, 238, 238);\\r\\n}\\r\\n\\r\\n\\r\\n@media(max-width: 767px){\\r\\n    .navbar-default .nav li > a,\\r\\n    .navbar-default.navbar-shrink .nav li > a {\\r\\n        color: $dark-gray;\\r\\n    }\\r\\n    .navbar-default,\\r\\n    .navbar-default.navbar-shrink {\\r\\n        background-color: rgb(255, 255, 255);\\r\\n    }\\r\\n    .navbar-default .navbar-brand.logo {\\r\\n        padding: 0;\\r\\n        color: rgb(51, 51, 51);\\r\\n    }\\r\\n    #main-navigation{\\r\\n        background-color: rgb(255, 255, 255);\\r\\n    }\\r\\n    .navbar-default .navbar-toggle .icon-bar {\\r\\n        background-color: rgb(51, 51, 51);\\r\\n    }\\r\\n}\\r\\n\\r\\n@media(max-width: 419px){\\r\\n    .navbar-default .nav li a{\\r\\n        padding: 15px 9px;\\r\\n    }\\r\\n    .navbar-default .navbar-brand.logo {\\r\\n        font-size: 24px;\\r\\n        line-height: 50px;\\r\\n    }\\r\\n}\",\"@import \\\"fonts\\\";\\r\\n\\r\\n@import \\\"component/base\\\";\\r\\n@import \\\"component/buttons\\\";\\r\\n@import \\\"component/navbar\\\";\\r\\n\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n/*  5 - HEADER\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n#headerwrap {\\r\\n    overflow: hidden;\\r\\n}\\r\\n\\r\\n.opaque {\\r\\n    background-color: transparent !important\\r\\n}\\r\\n\\r\\n.backstretch:before {\\r\\n    content: '';\\r\\n    position: absolute;\\r\\n    width: 100%;\\r\\n    height: 100%;\\r\\n    background-color: rgba(91, 91, 88, 0.4);\\r\\n    top: 0;\\r\\n    left: 0\\r\\n}\\r\\n\\r\\n#tubular-container {\\r\\n    z-index: -1 !important;\\r\\n    position: absolute !important\\r\\n}\\r\\n\\r\\nheader {\\r\\n    text-align: center;\\r\\n    color: #333\\r\\n}\\r\\n\\r\\nheader .intro-text {\\r\\n    padding-top: 100px;\\r\\n    padding-bottom: 50px;\\r\\n    color: #333\\r\\n}\\r\\n\\r\\nheader .intro-text .intro-lead-in {\\r\\n    margin-bottom: 25px;\\r\\n    font-size: 22px;\\r\\n    text-transform: none;\\r\\n    line-height: 22px\\r\\n}\\r\\n\\r\\nheader .intro-text .intro-heading {\\r\\n    font-size: 48px;\\r\\n    margin-bottom: 60px;\\r\\n    text-transform: uppercase;\\r\\n    font-size: 30px;\\r\\n    font-weight: 300;\\r\\n    line-height: 30px\\r\\n}\\r\\n\\r\\n.intro-heading span {\\r\\n    clear: both;\\r\\n    display: block;\\r\\n    margin-bottom: 24px;\\r\\n    font-size: 70px;\\r\\n    line-height: 1\\r\\n}\\r\\n\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n/*  6 - SECTIONS\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n\\r\\n@import \\\"component/sections\\\";\\r\\n\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n/*  10 - HOVER CAPTIONS \\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n\\r\\n.hover-item {\\r\\n    position: relative;\\r\\n    overflow: hidden\\r\\n}\\r\\n\\r\\n.hover-item img {\\r\\n    -moz-transform: scale(1.0);\\r\\n    -webkit-transform: scale(1.0);\\r\\n    -o-transform: scale(1.0);\\r\\n    -ms-transform: scale(1.0);\\r\\n    transform: scale(1.0)\\r\\n}\\r\\n\\r\\n.overlay-item-caption {\\r\\n    opacity: 1;\\r\\n    position: absolute;\\r\\n    width: 100%;\\r\\n    height: 100%;\\r\\n    left: 0;\\r\\n    top: 0;\\r\\n    background: -moz-linear-gradient(top, rgba(0,0,0,0) 28%, rgba(0,0,0,0.75) 100%); /* FF3.6+ */\\r\\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(28%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,0.75))); /* Chrome,Safari4+ */\\r\\n    background: -webkit-linear-gradient(top, rgba(0,0,0,0) 28%,rgba(0,0,0,0.75) 100%); /* Chrome10+,Safari5.1+ */\\r\\n    background: -o-linear-gradient(top, rgba(0,0,0,0) 28%,rgba(0,0,0,0.75) 100%); /* Opera 11.10+ */\\r\\n    background: -ms-linear-gradient(top, rgba(0,0,0,0) 28%,rgba(0,0,0,0.75) 100%); /* IE10+ */\\r\\n    background: linear-gradient(to bottom, rgba(0,0,0,0) 28%,rgba(0,0,0,0.75) 100%); /* W3C */\\r\\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 ); /* IE6-9 */\\r\\n    text-align: center;\\r\\n    text-shadow: 0 0 1px #000;\\r\\n}\\r\\n\\r\\n.hover-item-caption {\\r\\n    opacity: 0;\\r\\n    position: absolute;\\r\\n    width: 100%;\\r\\n    height: 100%;\\r\\n    left: 0;\\r\\n    top: 0px;\\r\\n    background-color: rgba(0,0,0, 0.8);\\r\\n    text-align: center;\\r\\n    z-index: 2;\\r\\n}\\r\\n\\r\\n.hover-item:hover .hover-item-caption {\\r\\n    opacity: 1;\\r\\n}\\r\\n\\r\\n.hover-item-caption h3, .hover-item-caption .smoothie {\\r\\n    top: 30px;\\r\\n    position: relative;\\r\\n}\\r\\n\\r\\n.hover-item:hover .hover-item-caption h3, .hover-item:hover .smoothie {\\r\\n    top: 0px;\\r\\n}\\r\\n\\r\\n.hover-item:hover .overlay-item-caption {\\r\\n    opacity: 0;\\r\\n    top: 30px;\\r\\n}\\r\\n\\r\\n.hover-item:hover .overlay-item-caption .vertical-center {\\r\\n    opacity: 0;\\r\\n}\\r\\n\\r\\n.hover-item:hover img {\\r\\n    -moz-transform: scale(1.2);\\r\\n    -webkit-transform: scale(1.2);\\r\\n    -o-transform: scale(1.2);\\r\\n    -ms-transform: scale(1.2);\\r\\n    transform: scale(1.2)\\r\\n}\\r\\n\\r\\n.hover-item-caption h3, .overlay-item-caption h3 {\\r\\n    font-size: 26px;\\r\\n    margin: 0;\\r\\n    color: #fefefe;\\r\\n    font-weight: 400;\\r\\n    letter-spacing: 7px;\\r\\n}\\r\\n\\r\\n.overlay-item-caption strong {\\r\\n    color: #fefefe;\\r\\n    padding-bottom: 16px;\\r\\n    font-weight: 400;\\r\\n    text-transform: uppercase;\\r\\n    display: block;\\r\\n    letter-spacing: 4px;\\r\\n}\\r\\n\\r\\n.overlay-item-caption .thin-hr:after, .dark-wrapper .thin-hr:after {\\r\\n    background-color: #fff;\\r\\n}\\r\\n\\r\\n.overlay-item-caption .post-excerpt {\\r\\n    font-style: italic;\\r\\n    color: #fefefe;\\r\\n    padding-top: 16px;\\r\\n    font-size: 16px;\\r\\n    padding-left: 15%;\\r\\n    padding-right: 15%;\\r\\n}\\r\\n\\r\\n.hover-item-caption h3 span, .overlay-item-caption h3 span, .hover-item-caption h2 span {\\r\\n    clear: both;\\r\\n    display: block;\\r\\n    text-transform: none;\\r\\n    font-size: 20px;\\r\\n    color: #fefefe;\\r\\n}\\r\\n\\r\\n.hover-item-caption h2 span {\\r\\n    display: inline-block;\\r\\n}\\r\\n\\r\\n.hover-item-caption a, .overlay-item-caption a {\\r\\n    color: #fefefe;\\r\\n}\\r\\n\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n/*  11 - FOOTER\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n\\r\\n#footer-widgets {\\r\\n    border-top: 1px solid #333\\r\\n}\\r\\n\\r\\n#footer-widgets .section-inner {\\r\\n    padding-bottom: 80px\\r\\n}\\r\\n\\r\\nfooter.white-wrapper {\\r\\n    padding: 120px 0;\\r\\n    clear: both;\\r\\n}\\r\\n\\r\\nfooter.white-wrapper span.copyright {\\r\\n    letter-spacing: 1px;\\r\\n    text-transform: uppercase;\\r\\n    text-transform: none;\\r\\n    line-height: 40px\\r\\n}\\r\\n\\r\\nfooter.white-wrapper .social-links li {\\r\\n    padding: 15px 30px\\r\\n}\\r\\n\\r\\nfooter.white-wrapper .social-links li a {\\r\\n    text-transform: uppercase;\\r\\n    letter-spacing: 1px;\\r\\n    font-size: 26px;\\r\\n}\\r\\n\\r\\n.widget-title {\\r\\n    margin-bottom: 30px;\\r\\n}\\r\\n\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n/*  12 - CAROUSEL STYLES\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n\\r\\n@import \\\"component/carousel\\\";\\r\\n\\r\\n\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n/*  14 - SPLASH\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n\\r\\n.preloader {\\r\\n    background-color: #ffffff;\\r\\n    position: fixed;\\r\\n    width: 100%;\\r\\n    height: 100%;\\r\\n    z-index: 9999999;\\r\\n    top: 0;\\r\\n    left: 0;\\r\\n}\\r\\n\\r\\n.preloader span {\\r\\n    text-transform: none;\\r\\n    font-size: 34px\\r\\n}\\r\\n\\r\\n.preloader .preloader-img {\\r\\n    width: 40px;\\r\\n    height: 40px;\\r\\n    position: absolute;\\r\\n    top: 50%;\\r\\n    left: 50%;\\r\\n    margin-left: -20px;\\r\\n    margin-top: -40px;\\r\\n}\\r\\n\\r\\n.preloader .preloader-img img {\\r\\n    max-height: 40px;\\r\\n}\\r\\n\\r\\n@keyframes flickerAnimation {\\r\\n    0% {\\r\\n        opacity: 1;\\r\\n    }\\r\\n\\r\\n    50% {\\r\\n        opacity: 0.8;\\r\\n    }\\r\\n\\r\\n    100% {\\r\\n        opacity: 1;\\r\\n    }\\r\\n}\\r\\n\\r\\n@-o-keyframes flickerAnimation {\\r\\n    0% {\\r\\n        opacity: 1;\\r\\n    }\\r\\n\\r\\n    50% {\\r\\n        opacity: 0.8;\\r\\n    }\\r\\n\\r\\n    100% {\\r\\n        opacity: 1;\\r\\n    }\\r\\n}\\r\\n\\r\\n@-moz-keyframes flickerAnimation {\\r\\n    0% {\\r\\n        opacity: 1;\\r\\n    }\\r\\n\\r\\n    50% {\\r\\n        opacity: 0.8;\\r\\n        ;\\r\\n    }\\r\\n\\r\\n    100% {\\r\\n        opacity: 1;\\r\\n    }\\r\\n}\\r\\n\\r\\n@-webkit-keyframes flickerAnimation {\\r\\n    0% {\\r\\n        opacity: 1;\\r\\n    }\\r\\n\\r\\n    50% {\\r\\n        opacity: 0.8;\\r\\n    }\\r\\n\\r\\n    100% {\\r\\n        opacity: 1;\\r\\n    }\\r\\n}\\r\\n\\r\\n.animate-flicker {\\r\\n    -webkit-animation: flickerAnimation 2s infinite;\\r\\n    -moz-animation: flickerAnimation 2s infinite;\\r\\n    -o-animation: flickerAnimation 2s infinite;\\r\\n    animation: flickerAnimation 2s infinite;\\r\\n}\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n/*  15 - MAP\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n#mapwrapper {\\r\\n    max-height: 230px;\\r\\n    clear: both;\\r\\n    position: relative;\\r\\n    display: block;\\r\\n}\\r\\n\\r\\n#mapwrapper iframe {\\r\\n    /*-webkit-filter: grayscale(100%);\\r\\n    -moz-filter: grayscale(100%);\\r\\n    -ms-filter: grayscale(100%);\\r\\n    -o-filter: grayscale(100%);\\r\\n    filter: grayscale(100%);\\r\\n    filter: url(grayscale.svg);*/ /* Firefox 4+ */\\r\\n    filter: gray; /* IE 6-9 */\\r\\n    max-width: 100%;\\r\\n}\\r\\n\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n/*  16 - FORM CONTROL\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n\\r\\n@import \\\"component/form-control\\\";\\r\\n\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n/*  17 -  TABS\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n\\r\\n@import \\\"component/tabs\\\";\\r\\n\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n/*  18 - COUNTDOWN\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n#countdown span {\\r\\n    width: 25%;\\r\\n    display: inline-block;\\r\\n    float: left;\\r\\n    font-size: 70px;\\r\\n    font-weight: 300\\r\\n}\\r\\n\\r\\n#countdown small {\\r\\n    font-weight: 300;\\r\\n    font-size: 18px;\\r\\n    display: block;\\r\\n    clear: both;\\r\\n    text-transform: uppercase;\\r\\n    letter-spacing: 2px;\\r\\n}\\r\\n\\r\\n#countdown {\\r\\n    overflow: hidden;\\r\\n    padding-bottom: 80px;\\r\\n}\\r\\n\\r\\n.lead, p {\\r\\n    #when &,\\r\\n    #where & {\\r\\n        font-size: 16px;\\r\\n    }\\r\\n}\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n/*  19 - MEDIA QUERIES\\r\\n/*-----------------------------------------------------------------------------------*/\\r\\n    @media(max-width: 991px){\\r\\n        #where .lead,\\r\\n        #when .lead {\\r\\n            font-size: 40px;\\r\\n            font-weight: 700;\\r\\n            text-transform: uppercase;\\r\\n            letter-spacing: 2px;\\r\\n        }\\r\\n    }\\r\\n    \\r\\n    @media(min-width:767px) {\\r\\n        header .intro-text {\\r\\n            padding-top: 420px;\\r\\n            padding-bottom: 100px\\r\\n        }\\r\\n\\r\\n        header .intro-text .intro-lead-in {\\r\\n            margin-bottom: 20px;\\r\\n            font-size: 40px;\\r\\n            font-style: normal;\\r\\n            line-height: 40px;\\r\\n            letter-spacing: -1px\\r\\n        }\\r\\n\\r\\n        header .intro-text .intro-heading {\\r\\n            margin-bottom: 40px;\\r\\n            text-transform: uppercase;\\r\\n            font-size: 36px;\\r\\n            font-weight: 700;\\r\\n            letter-spacing: 4px;\\r\\n            line-height: 38px;\\r\\n        }\\r\\n\\r\\n        .navbar-fixed-top .container-fluid {\\r\\n            padding-left: 30px;\\r\\n            padding-right: 30px;\\r\\n        }\\r\\n\\r\\n        li.dropdown:hover ul.dropdown-menu {\\r\\n            opacity: 1;\\r\\n        }\\r\\n\\r\\n        li.dropdown:hover ul.dropdown-menu {\\r\\n            display: block;\\r\\n            -webkit-animation: fadeIn 0.4s;\\r\\n            animation: fadeIn 0.4s;\\r\\n            -webkit-animation-fill-mode: forwards;\\r\\n            animation-fill-mode: forwards;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @media(min-width:768px) {\\r\\n        .navbar-default {\\r\\n            padding: 0px 0;\\r\\n            border: 0;\\r\\n            background-color: transparent;\\r\\n            -webkit-transition: all .5s ease-in-out;\\r\\n            -moz-transition: all .5s ease-in-out;\\r\\n            -o-transition: all .5s ease-in-out;\\r\\n            -ms-transition: all .5s ease-in-out;\\r\\n            transition: all .5s ease-in-out\\r\\n        }\\r\\n\\r\\n        .navbar-default .navbar-brand {\\r\\n            font-size: 2em;\\r\\n            -webkit-transition: all .3s;\\r\\n            -moz-transition: all .3s;\\r\\n            transition: all .3s\\r\\n        }\\r\\n\\r\\n        .navbar-default.navbar-shrink {\\r\\n            padding: 0;\\r\\n            background-color: #ffffff;\\r\\n            -webkit-transition: all .5s ease-in-out;\\r\\n            -moz-transition: all .5s ease-in-out;\\r\\n            -o-transition: all .5s ease-in-out;\\r\\n            -ms-transition: all .5s ease-in-out;\\r\\n            transition: all .5s ease-in-out\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @media(max-width:768px) {\\r\\n        .fullheight, .fullheight .article-slide, .fullheight .article-slide .carousel-inner, .fullheight .article-slide .item, .fullheight .article-slide .item img {\\r\\n            height: auto !important;\\r\\n            min-height: 600px\\r\\n        }\\r\\n\\r\\n        .icon-tabs .fa-4x {\\r\\n            font-size: 46px;\\r\\n        }\\r\\n\\r\\n        .icon-tabs li .tabtitle {\\r\\n            font-size: 12px;\\r\\n            letter-spacing: 4px;\\r\\n            margin: 0;\\r\\n        }\\r\\n\\r\\n        .dark-wrapper .icon-tabs li {\\r\\n            border-right: none;\\r\\n        }\\r\\n\\r\\n        .form-control.col-md-4, .dark-wrapper.form-control.col-md-4 {\\r\\n            width: 100% !important;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @media(max-width: 575px){\\r\\n        #where .lead,\\r\\n        #when .lead {\\r\\n            font-size: 24px;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @media(max-width:460px) {\\r\\n        .fullheight, .fullheight .article-slide, .fullheight .article-slide .carousel-inner, .fullheight .article-slide .item, .fullheight .article-slide .item img {\\r\\n            height: auto !important;\\r\\n            min-height: 400px\\r\\n        }\\r\\n    }\\r\\n\\r\\n    .testimonial-owl .hover-item {\\r\\n        margin-left: 0;\\r\\n        margin-right: 0;\\r\\n    }\\r\\n\\r\\n    .testimonial-owl .hover-item .col-xs-12 {\\r\\n        padding-left: 0;\\r\\n        padding-right: 0;\\r\\n    }\\r\\n\\r\\n    .testimonial-author {\\r\\n        max-width: 100px;\\r\\n        margin: 0 auto;\\r\\n    }\\r\\n\\r\\n    @media(max-width:768px) {\\r\\n        #side-wrapper {\\r\\n            display: none;\\r\\n            background-color: #ffffff;\\r\\n        }\\r\\n\\r\\n        .side-nav-active .master-wrapper {\\r\\n            padding-left: 0;\\r\\n        }\\r\\n\\r\\n        #side-wrapper .navbar-default .nav li a {\\r\\n            padding: 10px 20px;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    .nopadding-bottom {\\r\\n        padding-bottom: 0 !important;\\r\\n    }\\r\\n\\r\\n    .footer-goodbye {\\r\\n        font-family: 'Dancing Script';\\r\\n        text-transform: none !important;\\r\\n        font-size: 45px;\\r\\n        margin-bottom: 44px;\\r\\n        letter-spacing: 2px;\\r\\n        font-weight: 700;\\r\\n    }\\r\\n\\r\\n    #fettiwrap {\\r\\n        position: absolute;\\r\\n        left: 0;\\r\\n        top: 0;\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n    }\\r\\n    /* INSTAGRAM */\\r\\n    .instafeed-wrapper {\\r\\n        position: relative;\\r\\n        overflow: hidden;\\r\\n    }\\r\\n\\r\\n    .instafeed-overlay {\\r\\n        background-color: rgba(0,0,0,0.6);\\r\\n        position: absolute;\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        text-align: center;\\r\\n    }\\r\\n\\r\\n    .instafeed-overlay .lead {\\r\\n        font-size: 80px;\\r\\n    }\\r\\n\\r\\n    #instafeed img {\\r\\n        width: 16.666666%;\\r\\n    }\\r\\n\\r\\n.a-quote {\\r\\n    font-size: 73px;\\r\\n    line-height: 68px;\\r\\n    color: rgb(255, 255, 255);\\r\\n\\r\\n    @media(max-width: 575px) {\\r\\n        font-size: 30px;\\r\\n        line-height: 25px;\\r\\n    }\\r\\n}\\r\\n//@import \\\"component/jquery-confirm\\\";\\r\\n/*#contact-tabs .tabtitle {\\r\\n    margin-top: 0;\\r\\n}\\r\\n\\r\\n#contact-tabs .icon-tabs li {\\r\\n    border-right: none;\\r\\n}*/\",\"@import \\\"variables\\\";\\r\\n\\r\\nsection {\\r\\n    /*background-color: #ffffff;*/\\r\\n    clear: both;\\r\\n    position: relative;\\r\\n}\\r\\n\\r\\n/*.silver-bg {\\r\\n    background-color: #DADFE1\\r\\n}\\r\\n\\r\\n.dark-wrapper {\\r\\n    background-color: #111111\\r\\n}*/\\r\\n\\r\\n.white-bg{\\r\\n    background-color: rgb(255, 255, 255);\\r\\n}\\r\\n\\r\\n.dark-wrapper.opaqued, .dark-opaqued {\\r\\n    position: relative;\\r\\n    /*background-color: rgba(91, 91, 88, 0.6);*/\\r\\n\\r\\n    &:before {\\r\\n        content: '';\\r\\n        position: absolute;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n        background-color: rgba(91, 91, 88, 0.6);\\r\\n    }\\r\\n}\\r\\n\\r\\n\\r\\n.light-opaqued {\\r\\n    position: relative;\\r\\n    /*background-color: rgba(91, 91, 88, 0.6);*/\\r\\n\\r\\n    &:before {\\r\\n        content: '';\\r\\n        position: absolute;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n        background-color: rgba(91, 91, 88, 0.6);\\r\\n    }\\r\\n}\\r\\n\\r\\n\\r\\n#headerwrap.opaqued {\\r\\n    background-color: rgba(0,0,0, 0.4);\\r\\n}\\r\\n\\r\\n.dark-wrapper h1,\\r\\n.dark-wrapper h2,\\r\\n.dark-wrapper h3,\\r\\n.dark-wrapper h4,\\r\\n.dark-wrapper h5,\\r\\n.dark-wrapper h6,\\r\\n.dark-wrapper p,\\r\\n.dark-wrapper a,\\r\\n.dark-wrapper {\\r\\n    color: $light-gray\\r\\n}\\r\\n\\r\\n.section-inner {\\r\\n    padding: 120px 0;\\r\\n\\r\\n    @media(max-width: 575px) {\\r\\n        padding: 45px 0;\\r\\n    }\\r\\n}\\r\\n\\r\\nsection h2.section-heading, .section-heading {\\r\\n    margin-top: 0;\\r\\n    margin-bottom: 10px;\\r\\n    font-size: 34px;\\r\\n    letter-spacing: 5px;\\r\\n}\\r\\n\\r\\nsection h3.section-subheading {\\r\\n    text-transform: lowercase;\\r\\n    font-size: 25px;\\r\\n    font-weight: 400;\\r\\n    clear: both;\\r\\n    display: block;\\r\\n    padding-top: 10px;\\r\\n    letter-spacing: 1px;\\r\\n}\\r\\n\\r\\n.cl-effect-3 a {\\r\\n    padding: 8px 0;\\r\\n}\\r\\n\\r\\n.cl-effect-3 a::after {\\r\\n    position: absolute;\\r\\n    top: 100%;\\r\\n    left: 0;\\r\\n    width: 100%;\\r\\n    height: 3px;\\r\\n    background: rgba(255,255,255,0.5);\\r\\n    content: '';\\r\\n    opacity: 0;\\r\\n    margin-top: -3px;\\r\\n    -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;\\r\\n    -moz-transition: opacity 0.3s, -moz-transform 0.3s;\\r\\n    transition: opacity 0.3s, transform 0.3s;\\r\\n    -webkit-transform: translateY(10px);\\r\\n    -moz-transform: translateY(10px);\\r\\n    transform: translateY(10px);\\r\\n}\\r\\n\\r\\n.navbar-shrink .cl-effect-3 a::after {\\r\\n    background: rgba(0,0,0,0.2);\\r\\n}\\r\\n\\r\\n.cl-effect-3 a:hover::after,\\r\\n.cl-effect-3 a:focus::after {\\r\\n    opacity: 1;\\r\\n    -webkit-transform: translateY(0px);\\r\\n    -moz-transform: translateY(0px);\\r\\n    transform: translateY(0px);\\r\\n}\\r\\nfooter{\\r\\n    padding: 15px 0;\\r\\n}\\r\\n\\r\\n.item-caption {\\r\\n    .lead {\\r\\n        font-size: 14px;\\r\\n        text-align: center;\\r\\n        &.secondary-font{\\r\\n            font-size: 21px;\\r\\n            text-align: right;\\r\\n        }\\r\\n    }\\r\\n}\",\".fw-carousel {\\r\\n    .owl-item {\\r\\n        padding: 0\\r\\n    }\\r\\n\\r\\n    .hover-item-caption h3 {\\r\\n        font-size: 20px\\r\\n    }\\r\\n}\\r\\n\\r\\n.owl-theme .owl-controls {\\r\\n    counter-reset: owl;\\r\\n\\r\\n    .owl-page {\\r\\n        /*&:first-child{\\r\\n        transform: rotate(180deg);\\r\\n    }*/\\r\\n        span {\\r\\n            position: relative;\\r\\n            border: none;\\r\\n            &:before {\\r\\n                counter-increment: owl;\\r\\n                content: counter(owl);\\r\\n                position: absolute;\\r\\n            }\\r\\n            /*width: 10px;\\r\\n        height: 18px;\\r\\n        border: 9px solid transparent;\\r\\n        border-left: 10px solid rgb(255, 255, 255);*/\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\\r\\n\",\".dark-wrapper textarea {\\r\\n    &.form-control {\\r\\n        background-color: rgba(213, 223, 220, 0.2);\\r\\n        border: 1px solid rgb(213, 223, 220);\\r\\n        margin-bottom: 10px;\\r\\n        height: 180px;\\r\\n    }\\r\\n}\\r\\n.dark-wrapper input {\\r\\n    &.form-control {\\r\\n        background-color: rgba(213, 223, 220, 0.2);\\r\\n        border: 1px solid rgb(213, 223, 220);\\r\\n        margin-bottom: 10px;\\r\\n        float: left;\\r\\n        width: calc(50% - 5px);\\r\\n\\r\\n        @media(max-width: 575px) {\\r\\n            width: 100%;\\r\\n        }\\r\\n\\r\\n        &:first-child {\\r\\n            margin-right: 5px;\\r\\n\\r\\n            @media(max-width: 575px) {\\r\\n                margin-right: 0;\\r\\n            }\\r\\n        }\\r\\n\\r\\n        &:nth-child(2) {\\r\\n            margin-left: 5px;\\r\\n\\r\\n            @media(max-width: 575px) {\\r\\n                margin-left: 0;\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n\\r\\n    &[type=submit] {\\r\\n        font-family: \\\"Dancing Script\\\";\\r\\n        font-size: 30px;\\r\\n        font-weight: 700;\\r\\n        background-color: rgb(255, 255, 255);\\r\\n        color: rgb(0, 0, 0);\\r\\n        height: 62px;\\r\\n        border: none;\\r\\n        padding: 0 30px;\\r\\n    }\\r\\n}\\r\\n.form-control {\\r\\n    display: block;\\r\\n    width: 100%;\\r\\n    height: 40px;\\r\\n    padding: 29px 30px;\\r\\n    font-size: 14px;\\r\\n    line-height: 1.42857143;\\r\\n    color: rgba(255, 255, 255, 1);\\r\\n    background-image: none;\\r\\n    border-radius: 0;\\r\\n    -webkit-box-shadow: none;\\r\\n    box-shadow: none;\\r\\n}\\r\\n\\r\\n.form-control {\\r\\n    :-moz-placeholder,\\r\\n    &:-moz-placeholder,\\r\\n    :-ms-input-placeholder,\\r\\n    &:-ms-input-placeholder,\\r\\n    ::-moz-placeholder,\\r\\n    &::-moz-placeholder,\\r\\n    ::-webkit-input-placeholder,\\r\\n    &::-webkit-input-placeholder {\\r\\n        color: rgba(255, 255, 255, 1);\\r\\n        font-weight: 300;\\r\\n    }\\r\\n}\\r\\n.form-control::-webkit-input-placeholder {\\r\\n    color: rgba(255, 255, 255, 1);\\r\\n    font-weight: 300;\\r\\n}\\r\\n.form-control:-moz-placeholder {\\r\\n    color: rgba(255, 255, 255, 1);\\r\\n    font-weight: 300;\\r\\n}\\r\\n.main-contact-form{\\r\\n    overflow: hidden;\\r\\n    width: 100%;\\r\\n}\\r\\n@media(max-width: 1199px) {\\r\\n}\\r\\n\\r\\n\\r\\n    /**/\\r\\n\\r\\n    /*.form-control:-moz-placeholder {\\r\\n    color: rgba(255, 255, 255, 1);\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n    /*.form-control::-moz-placeholder {\\r\\n    /* Firefox 19+ */\\r\\n    /*color: rgba(255, 255, 255, 1);\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.form-control:-ms-input-placeholder {\\r\\n    color: rgba(255, 255, 255, 1);\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n/*.dark-wrapper .form-control::-webkit-input-placeholder,\\r\\n.white-text .form-control::-webkit-input-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control:-moz-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control::-moz-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control:-ms-input-placeholder {\\r\\n    color: #f6f6f6;\\r\\n    font-weight: 300;\\r\\n    text-transform: uppercase;\\r\\n}*/\\r\\n    /**/\\r\\n    /*.form-control:focus, .form-control.col-md-6:focus {\\r\\n    border: 1px solid #333;\\r\\n    -webkit-box-shadow: none;\\r\\n    box-shadow: none\\r\\n}\\r\\n\\r\\n\\r\\n.dark-wrapper .form-control {\\r\\n    border: none;\\r\\n    background-color: rgba(0,0,0,0.2);\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control:focus, .dark-wrapper .form-control.col-md-6:focus {\\r\\n    border: none;\\r\\n    color: #f6f6f6;\\r\\n    -webkit-box-shadow: 0 0 0 1px #ffffff;\\r\\n    box-shadow: 0 0 0 1px #ffffff;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control.col-md-6, .dark-wrapper .form-control.col-md-6:focus {\\r\\n    width: 32.33333%;\\r\\n    border-bottom: none;\\r\\n    border: none;\\r\\n    background-color: rgba(0,0,0,0.2);\\r\\n    margin: 0 0.5% 10px;\\r\\n}\\r\\n\\r\\n.form-control.col-md-6,\\r\\n.form-control.col-md-6:focus {\\r\\n    width: 49%;\\r\\n    border-bottom: none;\\r\\n    border: 1px solid;\\r\\n    background-color: transparent;\\r\\n    margin: 0 0.5% 10px;\\r\\n}\\r\\n\\r\\n.dark-wrapper .form-control.col-md-6:first-of-type {\\r\\n    border-left: none;\\r\\n}\\r\\n\\r\\n\\r\\n\\r\\n.main-contact-form textarea,\\r\\n.main-contact-form textarea:focus,\\r\\n#commentform .main-contact-form textarea,\\r\\n#commentform .main-contact-form textarea:focus {\\r\\n    min-height: 250px !important;\\r\\n}\\r\\n*/\\r\\n\",\".nav.nav-justified > li > a {\\r\\n    position: relative;\\r\\n}\\r\\n\\r\\n.icon-tabs li {\\r\\n    border-right: 1px solid #111;\\r\\n}\\r\\n\\r\\n.icon-tabs li a {\\r\\n    opacity: 0.4;\\r\\n}\\r\\n\\r\\n.icon-tabs li.active a {\\r\\n    opacity: 1;\\r\\n}\\r\\n\\r\\n.icon-tabs li:last-of-type, .dark-wrapper .icon-tabs li:last-of-type {\\r\\n    border-right: none;\\r\\n}\\r\\n\\r\\n.dark-wrapper .icon-tabs li {\\r\\n    border-right: 1px solid #fefefe;\\r\\n}\\r\\n\\r\\n.icon-tabs li .tabtitle {\\r\\n    clear: both;\\r\\n    display: block;\\r\\n    margin: 15px 0 0;\\r\\n    font-size: 20px;\\r\\n    text-transform: uppercase;\\r\\n    letter-spacing: 8px;\\r\\n}\\r\\n\\r\\n.nav.nav-justified > li {\\r\\n    display: table-cell;\\r\\n    width: 1%;\\r\\n}\\r\\n\\r\\n.nav.nav-justified > li > a:hover,\\r\\n.nav.nav-justified > li > a:focus {\\r\\n    background-color: transparent;\\r\\n}\\r\\n\\r\\n.nav.nav-justified > li > a > .quote {\\r\\n    position: absolute;\\r\\n    left: 0px;\\r\\n    top: 0;\\r\\n    opacity: 0;\\r\\n    width: 30px;\\r\\n    height: 30px;\\r\\n    padding: 5px;\\r\\n    background-color: #13c0ba;\\r\\n    border-radius: 15px;\\r\\n    color: #fff;\\r\\n}\\r\\n\\r\\n.nav.nav-justified > li.active > a > .quote {\\r\\n    opacity: 1;\\r\\n}\\r\\n\\r\\n.nav.nav-justified > li > a > img {\\r\\n    box-shadow: 0 0 0 5px #13c0ba;\\r\\n}\\r\\n\\r\\n.nav.nav-justified > li > a > img {\\r\\n    max-width: 100%;\\r\\n    opacity: .3;\\r\\n    -webkit-transform: scale(.8, .8);\\r\\n    transform: scale(.8, .8);\\r\\n    -webkit-transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\r\\n    transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\r\\n}\\r\\n\\r\\n.nav.nav-justified > li.active > a > img,\\r\\n.nav.nav-justified > li:hover > a > img,\\r\\n.nav.nav-justified > li:focus > a > img {\\r\\n    opacity: 1;\\r\\n    -webkit-transform: none;\\r\\n    transform: none;\\r\\n    -webkit-transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\r\\n    transition: all 0.3s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);\\r\\n}\\r\\n\\r\\n.tab-pane .tab-inner {\\r\\n    padding: 30px 0 20px;\\r\\n}\\r\\n\\r\\n@media (min-width: 768px) {\\r\\n    .nav.nav-justified > li > a > .quote {\\r\\n        left: auto;\\r\\n        top: auto;\\r\\n        right: 20px;\\r\\n        bottom: 0px;\\r\\n    }\\r\\n    .nav.nav-justified > li > a {\\r\\n        padding: 10px 15px;\\r\\n    }\\r\\n    .tab-content {\\r\\n        margin-top: 60px;\\r\\n    }\\r\\n}\\r\\n.icon-tabs li.silver-bg.active {\\r\\n    background-color: #edeff0;\\r\\n}\\r\\n\"],\"sourceRoot\":\"\"}]);\n\n// exports\n\n\n//# sourceURL=webpack:///./ClientApp/src/assets/scss/style.scss?./node_modules/css-loader??ref--5-1!./node_modules/sass-loader/lib/loader.js??ref--5-2");

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/html-entities/index.js":
/*!*********************************************!*\
  !*** ./node_modules/html-entities/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = {\n  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ \"./node_modules/html-entities/lib/xml-entities.js\"),\n  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ \"./node_modules/html-entities/lib/html4-entities.js\"),\n  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ \"./node_modules/html-entities/lib/html5-entities.js\"),\n  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ \"./node_modules/html-entities/lib/html5-entities.js\")\n};\n\n\n//# sourceURL=webpack:///./node_modules/html-entities/index.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/html4-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html4-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];\nvar HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];\n\nvar alphaIndex = {};\nvar numIndex = {};\n\nvar i = 0;\nvar length = HTML_ALPHA.length;\nwhile (i < length) {\n    var a = HTML_ALPHA[i];\n    var c = HTML_CODES[i];\n    alphaIndex[a] = String.fromCharCode(c);\n    numIndex[c] = a;\n    i++;\n}\n\n/**\n * @constructor\n */\nfunction Html4Entities() {}\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.prototype.decode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    return str.replace(/&(#?[\\w\\d]+);?/g, function(s, entity) {\n        var chr;\n        if (entity.charAt(0) === \"#\") {\n            var code = entity.charAt(1).toLowerCase() === 'x' ?\n                parseInt(entity.substr(2), 16) :\n                parseInt(entity.substr(1));\n\n            if (!(isNaN(code) || code < -32768 || code > 65535)) {\n                chr = String.fromCharCode(code);\n            }\n        } else {\n            chr = alphaIndex[entity];\n        }\n        return chr || s;\n    });\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.decode = function(str) {\n    return new Html4Entities().decode(str);\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.prototype.encode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var alpha = numIndex[str.charCodeAt(i)];\n        result += alpha ? \"&\" + alpha + \";\" : str.charAt(i);\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.encode = function(str) {\n    return new Html4Entities().encode(str);\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.prototype.encodeNonUTF = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var cc = str.charCodeAt(i);\n        var alpha = numIndex[cc];\n        if (alpha) {\n            result += \"&\" + alpha + \";\";\n        } else if (cc < 32 || cc > 126) {\n            result += \"&#\" + cc + \";\";\n        } else {\n            result += str.charAt(i);\n        }\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.encodeNonUTF = function(str) {\n    return new Html4Entities().encodeNonUTF(str);\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.prototype.encodeNonASCII = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var c = str.charCodeAt(i);\n        if (c <= 255) {\n            result += str[i++];\n            continue;\n        }\n        result += '&#' + c + ';';\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.encodeNonASCII = function(str) {\n    return new Html4Entities().encodeNonASCII(str);\n};\n\nmodule.exports = Html4Entities;\n\n\n//# sourceURL=webpack:///./node_modules/html-entities/lib/html4-entities.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/html5-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html5-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];\n\nvar alphaIndex = {};\nvar charIndex = {};\n\ncreateIndexes(alphaIndex, charIndex);\n\n/**\n * @constructor\n */\nfunction Html5Entities() {}\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml5Entities.prototype.decode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    return str.replace(/&(#?[\\w\\d]+);?/g, function(s, entity) {\n        var chr;\n        if (entity.charAt(0) === \"#\") {\n            var code = entity.charAt(1) === 'x' ?\n                parseInt(entity.substr(2).toLowerCase(), 16) :\n                parseInt(entity.substr(1));\n\n            if (!(isNaN(code) || code < -32768 || code > 65535)) {\n                chr = String.fromCharCode(code);\n            }\n        } else {\n            chr = alphaIndex[entity];\n        }\n        return chr || s;\n    });\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n Html5Entities.decode = function(str) {\n    return new Html5Entities().decode(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml5Entities.prototype.encode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var charInfo = charIndex[str.charCodeAt(i)];\n        if (charInfo) {\n            var alpha = charInfo[str.charCodeAt(i + 1)];\n            if (alpha) {\n                i++;\n            } else {\n                alpha = charInfo[''];\n            }\n            if (alpha) {\n                result += \"&\" + alpha + \";\";\n                i++;\n                continue;\n            }\n        }\n        result += str.charAt(i);\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n Html5Entities.encode = function(str) {\n    return new Html5Entities().encode(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml5Entities.prototype.encodeNonUTF = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var c = str.charCodeAt(i);\n        var charInfo = charIndex[c];\n        if (charInfo) {\n            var alpha = charInfo[str.charCodeAt(i + 1)];\n            if (alpha) {\n                i++;\n            } else {\n                alpha = charInfo[''];\n            }\n            if (alpha) {\n                result += \"&\" + alpha + \";\";\n                i++;\n                continue;\n            }\n        }\n        if (c < 32 || c > 126) {\n            result += '&#' + c + ';';\n        } else {\n            result += str.charAt(i);\n        }\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n Html5Entities.encodeNonUTF = function(str) {\n    return new Html5Entities().encodeNonUTF(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml5Entities.prototype.encodeNonASCII = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var c = str.charCodeAt(i);\n        if (c <= 255) {\n            result += str[i++];\n            continue;\n        }\n        result += '&#' + c + ';';\n        i++\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n Html5Entities.encodeNonASCII = function(str) {\n    return new Html5Entities().encodeNonASCII(str);\n };\n\n/**\n * @param {Object} alphaIndex Passed by reference.\n * @param {Object} charIndex Passed by reference.\n */\nfunction createIndexes(alphaIndex, charIndex) {\n    var i = ENTITIES.length;\n    var _results = [];\n    while (i--) {\n        var e = ENTITIES[i];\n        var alpha = e[0];\n        var chars = e[1];\n        var chr = chars[0];\n        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;\n        var charInfo;\n        if (addChar) {\n            charInfo = charIndex[chr] = charIndex[chr] || {};\n        }\n        if (chars[1]) {\n            var chr2 = chars[1];\n            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);\n            _results.push(addChar && (charInfo[chr2] = alpha));\n        } else {\n            alphaIndex[alpha] = String.fromCharCode(chr);\n            _results.push(addChar && (charInfo[''] = alpha));\n        }\n    }\n}\n\nmodule.exports = Html5Entities;\n\n\n//# sourceURL=webpack:///./node_modules/html-entities/lib/html5-entities.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/xml-entities.js":
/*!********************************************************!*\
  !*** ./node_modules/html-entities/lib/xml-entities.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var ALPHA_INDEX = {\n    '&lt': '<',\n    '&gt': '>',\n    '&quot': '\"',\n    '&apos': '\\'',\n    '&amp': '&',\n    '&lt;': '<',\n    '&gt;': '>',\n    '&quot;': '\"',\n    '&apos;': '\\'',\n    '&amp;': '&'\n};\n\nvar CHAR_INDEX = {\n    60: 'lt',\n    62: 'gt',\n    34: 'quot',\n    39: 'apos',\n    38: 'amp'\n};\n\nvar CHAR_S_INDEX = {\n    '<': '&lt;',\n    '>': '&gt;',\n    '\"': '&quot;',\n    '\\'': '&apos;',\n    '&': '&amp;'\n};\n\n/**\n * @constructor\n */\nfunction XmlEntities() {}\n\n/**\n * @param {String} str\n * @returns {String}\n */\nXmlEntities.prototype.encode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    return str.replace(/<|>|\"|'|&/g, function(s) {\n        return CHAR_S_INDEX[s];\n    });\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n XmlEntities.encode = function(str) {\n    return new XmlEntities().encode(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nXmlEntities.prototype.decode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {\n        if (s.charAt(1) === '#') {\n            var code = s.charAt(2).toLowerCase() === 'x' ?\n                parseInt(s.substr(3), 16) :\n                parseInt(s.substr(2));\n\n            if (isNaN(code) || code < -32768 || code > 65535) {\n                return '';\n            }\n            return String.fromCharCode(code);\n        }\n        return ALPHA_INDEX[s] || s;\n    });\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n XmlEntities.decode = function(str) {\n    return new XmlEntities().decode(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nXmlEntities.prototype.encodeNonUTF = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var c = str.charCodeAt(i);\n        var alpha = CHAR_INDEX[c];\n        if (alpha) {\n            result += \"&\" + alpha + \";\";\n            i++;\n            continue;\n        }\n        if (c < 32 || c > 126) {\n            result += '&#' + c + ';';\n        } else {\n            result += str.charAt(i);\n        }\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n XmlEntities.encodeNonUTF = function(str) {\n    return new XmlEntities().encodeNonUTF(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nXmlEntities.prototype.encodeNonASCII = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLenght = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLenght) {\n        var c = str.charCodeAt(i);\n        if (c <= 255) {\n            result += str[i++];\n            continue;\n        }\n        result += '&#' + c + ';';\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n XmlEntities.encodeNonASCII = function(str) {\n    return new XmlEntities().encodeNonASCII(str);\n };\n\nmodule.exports = XmlEntities;\n\n\n//# sourceURL=webpack:///./node_modules/html-entities/lib/xml-entities.js?");

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\n// If obj.hasOwnProperty has been overridden, then calling\n// obj.hasOwnProperty(prop) will break.\n// See: https://github.com/joyent/node/issues/1707\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\nmodule.exports = function(qs, sep, eq, options) {\n  sep = sep || '&';\n  eq = eq || '=';\n  var obj = {};\n\n  if (typeof qs !== 'string' || qs.length === 0) {\n    return obj;\n  }\n\n  var regexp = /\\+/g;\n  qs = qs.split(sep);\n\n  var maxKeys = 1000;\n  if (options && typeof options.maxKeys === 'number') {\n    maxKeys = options.maxKeys;\n  }\n\n  var len = qs.length;\n  // maxKeys <= 0 means that we should not limit keys count\n  if (maxKeys > 0 && len > maxKeys) {\n    len = maxKeys;\n  }\n\n  for (var i = 0; i < len; ++i) {\n    var x = qs[i].replace(regexp, '%20'),\n        idx = x.indexOf(eq),\n        kstr, vstr, k, v;\n\n    if (idx >= 0) {\n      kstr = x.substr(0, idx);\n      vstr = x.substr(idx + 1);\n    } else {\n      kstr = x;\n      vstr = '';\n    }\n\n    k = decodeURIComponent(kstr);\n    v = decodeURIComponent(vstr);\n\n    if (!hasOwnProperty(obj, k)) {\n      obj[k] = v;\n    } else if (isArray(obj[k])) {\n      obj[k].push(v);\n    } else {\n      obj[k] = [obj[k], v];\n    }\n  }\n\n  return obj;\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\n\n//# sourceURL=webpack:///./node_modules/querystring-es3/decode.js?");

/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar stringifyPrimitive = function(v) {\n  switch (typeof v) {\n    case 'string':\n      return v;\n\n    case 'boolean':\n      return v ? 'true' : 'false';\n\n    case 'number':\n      return isFinite(v) ? v : '';\n\n    default:\n      return '';\n  }\n};\n\nmodule.exports = function(obj, sep, eq, name) {\n  sep = sep || '&';\n  eq = eq || '=';\n  if (obj === null) {\n    obj = undefined;\n  }\n\n  if (typeof obj === 'object') {\n    return map(objectKeys(obj), function(k) {\n      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;\n      if (isArray(obj[k])) {\n        return map(obj[k], function(v) {\n          return ks + encodeURIComponent(stringifyPrimitive(v));\n        }).join(sep);\n      } else {\n        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));\n      }\n    }).join(sep);\n\n  }\n\n  if (!name) return '';\n  return encodeURIComponent(stringifyPrimitive(name)) + eq +\n         encodeURIComponent(stringifyPrimitive(obj));\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\nfunction map (xs, f) {\n  if (xs.map) return xs.map(f);\n  var res = [];\n  for (var i = 0; i < xs.length; i++) {\n    res.push(f(xs[i], i));\n  }\n  return res;\n}\n\nvar objectKeys = Object.keys || function (obj) {\n  var res = [];\n  for (var key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);\n  }\n  return res;\n};\n\n\n//# sourceURL=webpack:///./node_modules/querystring-es3/encode.js?");

/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.decode = exports.parse = __webpack_require__(/*! ./decode */ \"./node_modules/querystring-es3/decode.js\");\nexports.encode = exports.stringify = __webpack_require__(/*! ./encode */ \"./node_modules/querystring-es3/encode.js\");\n\n\n//# sourceURL=webpack:///./node_modules/querystring-es3/index.js?");

/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar ansiRegex = __webpack_require__(/*! ansi-regex */ \"./node_modules/ansi-regex/index.js\")();\n\nmodule.exports = function (str) {\n\treturn typeof str === 'string' ? str.replace(ansiRegex, '') : str;\n};\n\n\n//# sourceURL=webpack:///./node_modules/strip-ansi/index.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === 'function'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client-overlay.js":
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/client-overlay.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*eslint-env browser*/\n\nvar clientOverlay = document.createElement('div');\nclientOverlay.id = 'webpack-hot-middleware-clientOverlay';\nvar styles = {\n  background: 'rgba(0,0,0,0.85)',\n  color: '#E8E8E8',\n  lineHeight: '1.2',\n  whiteSpace: 'pre',\n  fontFamily: 'Menlo, Consolas, monospace',\n  fontSize: '13px',\n  position: 'fixed',\n  zIndex: 9999,\n  padding: '10px',\n  left: 0,\n  right: 0,\n  top: 0,\n  bottom: 0,\n  overflow: 'auto',\n  dir: 'ltr',\n  textAlign: 'left'\n};\n\nvar ansiHTML = __webpack_require__(/*! ansi-html */ \"./node_modules/ansi-html/index.js\");\nvar colors = {\n  reset: ['transparent', 'transparent'],\n  black: '181818',\n  red: 'E36049',\n  green: 'B3CB74',\n  yellow: 'FFD080',\n  blue: '7CAFC2',\n  magenta: '7FACCA',\n  cyan: 'C3C2EF',\n  lightgrey: 'EBE7E3',\n  darkgrey: '6D7891'\n};\n\nvar Entities = __webpack_require__(/*! html-entities */ \"./node_modules/html-entities/index.js\").AllHtmlEntities;\nvar entities = new Entities();\n\nfunction showProblems(type, lines) {\n  clientOverlay.innerHTML = '';\n  lines.forEach(function(msg) {\n    msg = ansiHTML(entities.encode(msg));\n    var div = document.createElement('div');\n    div.style.marginBottom = '26px';\n    div.innerHTML = problemType(type) + ' in ' + msg;\n    clientOverlay.appendChild(div);\n  });\n  if (document.body) {\n    document.body.appendChild(clientOverlay);\n  }\n}\n\nfunction clear() {\n  if (document.body && clientOverlay.parentNode) {\n    document.body.removeChild(clientOverlay);\n  }\n}\n\nfunction problemType (type) {\n  var problemColors = {\n    errors: colors.red,\n    warnings: colors.yellow\n  };\n  var color = problemColors[type] || colors.red;\n  return (\n    '<span style=\"background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px\">' +\n      type.slice(0, -1).toUpperCase() +\n    '</span>'\n  );\n}\n\nmodule.exports = function(options) {\n  for (var color in options.overlayColors) {\n    if (color in colors) {\n      colors[color] = options.overlayColors[color];\n    }\n    ansiHTML.setColors(colors);\n  }\n\n  for (var style in options.overlayStyles) {\n    styles[style] = options.overlayStyles[style];\n  }\n\n  for (var key in styles) {\n    clientOverlay.style[key] = styles[key];\n  }\n\n  return {\n    showProblems: showProblems,\n    clear: clear\n  }\n};\n\nmodule.exports.clear = clear;\nmodule.exports.showProblems = showProblems;\n\n\n//# sourceURL=webpack:///(webpack)-hot-middleware/client-overlay.js?");

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client.js?path=__webpack_hmr&dynamicPublicPath=true":
/*!************************************************************************************!*\
  !*** (webpack)-hot-middleware/client.js?path=__webpack_hmr&dynamicPublicPath=true ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/\n/*global __resourceQuery __webpack_public_path__*/\n\nvar options = {\n  path: \"/__webpack_hmr\",\n  timeout: 20 * 1000,\n  overlay: true,\n  reload: false,\n  log: true,\n  warn: true,\n  name: '',\n  autoConnect: true,\n  overlayStyles: {},\n  overlayWarnings: false,\n  ansiColors: {}\n};\nif (true) {\n  var querystring = __webpack_require__(/*! querystring */ \"./node_modules/querystring-es3/index.js\");\n  var overrides = querystring.parse(__resourceQuery.slice(1));\n  setOverrides(overrides);\n}\n\nif (typeof window === 'undefined') {\n  // do nothing\n} else if (typeof window.EventSource === 'undefined') {\n  console.warn(\n    \"webpack-hot-middleware's client requires EventSource to work. \" +\n    \"You should include a polyfill if you want to support this browser: \" +\n    \"https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools\"\n  );\n} else {\n  if (options.autoConnect) {\n    connect();\n  }\n}\n\n/* istanbul ignore next */\nfunction setOptionsAndConnect(overrides) {\n  setOverrides(overrides);\n  connect();\n}\n\nfunction setOverrides(overrides) {\n  if (overrides.autoConnect) options.autoConnect = overrides.autoConnect == 'true';\n  if (overrides.path) options.path = overrides.path;\n  if (overrides.timeout) options.timeout = overrides.timeout;\n  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';\n  if (overrides.reload) options.reload = overrides.reload !== 'false';\n  if (overrides.noInfo && overrides.noInfo !== 'false') {\n    options.log = false;\n  }\n  if (overrides.name) {\n    options.name = overrides.name;\n  }\n  if (overrides.quiet && overrides.quiet !== 'false') {\n    options.log = false;\n    options.warn = false;\n  }\n\n  if (overrides.dynamicPublicPath) {\n    options.path = __webpack_require__.p + options.path;\n  }\n\n  if (overrides.ansiColors) options.ansiColors = JSON.parse(overrides.ansiColors);\n  if (overrides.overlayStyles) options.overlayStyles = JSON.parse(overrides.overlayStyles);\n\n  if (overrides.overlayWarnings) {\n    options.overlayWarnings = overrides.overlayWarnings == 'true';\n  }\n}\n\nfunction EventSourceWrapper() {\n  var source;\n  var lastActivity = new Date();\n  var listeners = [];\n\n  init();\n  var timer = setInterval(function() {\n    if ((new Date() - lastActivity) > options.timeout) {\n      handleDisconnect();\n    }\n  }, options.timeout / 2);\n\n  function init() {\n    source = new window.EventSource(options.path);\n    source.onopen = handleOnline;\n    source.onerror = handleDisconnect;\n    source.onmessage = handleMessage;\n  }\n\n  function handleOnline() {\n    if (options.log) console.log(\"[HMR] connected\");\n    lastActivity = new Date();\n  }\n\n  function handleMessage(event) {\n    lastActivity = new Date();\n    for (var i = 0; i < listeners.length; i++) {\n      listeners[i](event);\n    }\n  }\n\n  function handleDisconnect() {\n    clearInterval(timer);\n    source.close();\n    setTimeout(init, options.timeout);\n  }\n\n  return {\n    addMessageListener: function(fn) {\n      listeners.push(fn);\n    }\n  };\n}\n\nfunction getEventSourceWrapper() {\n  if (!window.__whmEventSourceWrapper) {\n    window.__whmEventSourceWrapper = {};\n  }\n  if (!window.__whmEventSourceWrapper[options.path]) {\n    // cache the wrapper for other entries loaded on\n    // the same page with the same options.path\n    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();\n  }\n  return window.__whmEventSourceWrapper[options.path];\n}\n\nfunction connect() {\n  getEventSourceWrapper().addMessageListener(handleMessage);\n\n  function handleMessage(event) {\n    if (event.data == \"\\uD83D\\uDC93\") {\n      return;\n    }\n    try {\n      processMessage(JSON.parse(event.data));\n    } catch (ex) {\n      if (options.warn) {\n        console.warn(\"Invalid HMR message: \" + event.data + \"\\n\" + ex);\n      }\n    }\n  }\n}\n\n// the reporter needs to be a singleton on the page\n// in case the client is being used by multiple bundles\n// we only want to report once.\n// all the errors will go to all clients\nvar singletonKey = '__webpack_hot_middleware_reporter__';\nvar reporter;\nif (typeof window !== 'undefined') {\n  if (!window[singletonKey]) {\n    window[singletonKey] = createReporter();\n  }\n  reporter = window[singletonKey];\n}\n\nfunction createReporter() {\n  var strip = __webpack_require__(/*! strip-ansi */ \"./node_modules/strip-ansi/index.js\");\n\n  var overlay;\n  if (typeof document !== 'undefined' && options.overlay) {\n    overlay = __webpack_require__(/*! ./client-overlay */ \"./node_modules/webpack-hot-middleware/client-overlay.js\")({\n      ansiColors: options.ansiColors,\n      overlayStyles: options.overlayStyles\n    });\n  }\n\n  var styles = {\n    errors: \"color: #ff0000;\",\n    warnings: \"color: #999933;\"\n  };\n  var previousProblems = null;\n  function log(type, obj) {\n    var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\\n');\n    if (previousProblems == newProblems) {\n      return;\n    } else {\n      previousProblems = newProblems;\n    }\n\n    var style = styles[type];\n    var name = obj.name ? \"'\" + obj.name + \"' \" : \"\";\n    var title = \"[HMR] bundle \" + name + \"has \" + obj[type].length + \" \" + type;\n    // NOTE: console.warn or console.error will print the stack trace\n    // which isn't helpful here, so using console.log to escape it.\n    if (console.group && console.groupEnd) {\n      console.group(\"%c\" + title, style);\n      console.log(\"%c\" + newProblems, style);\n      console.groupEnd();\n    } else {\n      console.log(\n        \"%c\" + title + \"\\n\\t%c\" + newProblems.replace(/\\n/g, \"\\n\\t\"),\n        style + \"font-weight: bold;\",\n        style + \"font-weight: normal;\"\n      );\n    }\n  }\n\n  return {\n    cleanProblemsCache: function () {\n      previousProblems = null;\n    },\n    problems: function(type, obj) {\n      if (options.warn) {\n        log(type, obj);\n      }\n      if (overlay) {\n        if (options.overlayWarnings || type === 'errors') {\n          overlay.showProblems(type, obj[type]);\n          return false;\n        }\n        overlay.clear();\n      }\n      return true;\n    },\n    success: function() {\n      if (overlay) overlay.clear();\n    },\n    useCustomOverlay: function(customOverlay) {\n      overlay = customOverlay;\n    }\n  };\n}\n\nvar processUpdate = __webpack_require__(/*! ./process-update */ \"./node_modules/webpack-hot-middleware/process-update.js\");\n\nvar customHandler;\nvar subscribeAllHandler;\nfunction processMessage(obj) {\n  switch(obj.action) {\n    case \"building\":\n      if (options.log) {\n        console.log(\n          \"[HMR] bundle \" + (obj.name ? \"'\" + obj.name + \"' \" : \"\") +\n          \"rebuilding\"\n        );\n      }\n      break;\n    case \"built\":\n      if (options.log) {\n        console.log(\n          \"[HMR] bundle \" + (obj.name ? \"'\" + obj.name + \"' \" : \"\") +\n          \"rebuilt in \" + obj.time + \"ms\"\n        );\n      }\n      // fall through\n    case \"sync\":\n      if (obj.name && options.name && obj.name !== options.name) {\n        return;\n      }\n      var applyUpdate = true;\n      if (obj.errors.length > 0) {\n        if (reporter) reporter.problems('errors', obj);\n        applyUpdate = false;\n      } else if (obj.warnings.length > 0) {\n        if (reporter) {\n          var overlayShown = reporter.problems('warnings', obj);\n          applyUpdate = overlayShown;\n        }\n      } else {\n        if (reporter) {\n          reporter.cleanProblemsCache();\n          reporter.success();\n        }\n      }\n      if (applyUpdate) {\n        processUpdate(obj.hash, obj.modules, options);\n      }\n      break;\n    default:\n      if (customHandler) {\n        customHandler(obj);\n      }\n  }\n\n  if (subscribeAllHandler) {\n    subscribeAllHandler(obj);\n  }\n}\n\nif (module) {\n  module.exports = {\n    subscribeAll: function subscribeAll(handler) {\n      subscribeAllHandler = handler;\n    },\n    subscribe: function subscribe(handler) {\n      customHandler = handler;\n    },\n    useCustomOverlay: function useCustomOverlay(customOverlay) {\n      if (reporter) reporter.useCustomOverlay(customOverlay);\n    },\n    setOptionsAndConnect: setOptionsAndConnect\n  };\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?path=__webpack_hmr&dynamicPublicPath=true\", __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///(webpack)-hot-middleware/client.js?");

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/process-update.js":
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/process-update.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Based heavily on https://github.com/webpack/webpack/blob/\n *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js\n * Original copyright Tobias Koppers @sokra (MIT license)\n */\n\n/* global window __webpack_hash__ */\n\nif (false) {}\n\nvar hmrDocsUrl = \"https://webpack.js.org/concepts/hot-module-replacement/\"; // eslint-disable-line max-len\n\nvar lastHash;\nvar failureStatuses = { abort: 1, fail: 1 };\nvar applyOptions = { \t\t\t\t\n  ignoreUnaccepted: true,\n  ignoreDeclined: true,\n  ignoreErrored: true,\n  onUnaccepted: function(data) {\n    console.warn(\"Ignored an update to unaccepted module \" + data.chain.join(\" -> \"));\n  },\n  onDeclined: function(data) {\n    console.warn(\"Ignored an update to declined module \" + data.chain.join(\" -> \"));\n  },\n  onErrored: function(data) {\n    console.error(data.error);\n    console.warn(\"Ignored an error while updating module \" + data.moduleId + \" (\" + data.type + \")\");\n  } \n}\n\nfunction upToDate(hash) {\n  if (hash) lastHash = hash;\n  return lastHash == __webpack_require__.h();\n}\n\nmodule.exports = function(hash, moduleMap, options) {\n  var reload = options.reload;\n  if (!upToDate(hash) && module.hot.status() == \"idle\") {\n    if (options.log) console.log(\"[HMR] Checking for updates on the server...\");\n    check();\n  }\n\n  function check() {\n    var cb = function(err, updatedModules) {\n      if (err) return handleError(err);\n\n      if(!updatedModules) {\n        if (options.warn) {\n          console.warn(\"[HMR] Cannot find update (Full reload needed)\");\n          console.warn(\"[HMR] (Probably because of restarting the server)\");\n        }\n        performReload();\n        return null;\n      }\n\n      var applyCallback = function(applyErr, renewedModules) {\n        if (applyErr) return handleError(applyErr);\n\n        if (!upToDate()) check();\n\n        logUpdates(updatedModules, renewedModules);\n      };\n\n      var applyResult = module.hot.apply(applyOptions, applyCallback);\n      // webpack 2 promise\n      if (applyResult && applyResult.then) {\n        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`\n        applyResult.then(function(outdatedModules) {\n          applyCallback(null, outdatedModules);\n        });\n        applyResult.catch(applyCallback);\n      }\n\n    };\n\n    var result = module.hot.check(false, cb);\n    // webpack 2 promise\n    if (result && result.then) {\n        result.then(function(updatedModules) {\n            cb(null, updatedModules);\n        });\n        result.catch(cb);\n    }\n  }\n\n  function logUpdates(updatedModules, renewedModules) {\n    var unacceptedModules = updatedModules.filter(function(moduleId) {\n      return renewedModules && renewedModules.indexOf(moduleId) < 0;\n    });\n\n    if(unacceptedModules.length > 0) {\n      if (options.warn) {\n        console.warn(\n          \"[HMR] The following modules couldn't be hot updated: \" +\n          \"(Full reload needed)\\n\" +\n          \"This is usually because the modules which have changed \" +\n          \"(and their parents) do not know how to hot reload themselves. \" +\n          \"See \" + hmrDocsUrl + \" for more details.\"\n        );\n        unacceptedModules.forEach(function(moduleId) {\n          console.warn(\"[HMR]  - \" + (moduleMap[moduleId] || moduleId));\n        });\n      }\n      performReload();\n      return;\n    }\n\n    if (options.log) {\n      if(!renewedModules || renewedModules.length === 0) {\n        console.log(\"[HMR] Nothing hot updated.\");\n      } else {\n        console.log(\"[HMR] Updated modules:\");\n        renewedModules.forEach(function(moduleId) {\n          console.log(\"[HMR]  - \" + (moduleMap[moduleId] || moduleId));\n        });\n      }\n\n      if (upToDate()) {\n        console.log(\"[HMR] App is up to date.\");\n      }\n    }\n  }\n\n  function handleError(err) {\n    if (module.hot.status() in failureStatuses) {\n      if (options.warn) {\n        console.warn(\"[HMR] Cannot check for update (Full reload needed)\");\n        console.warn(\"[HMR] \" + (err.stack || err.message));\n      }\n      performReload();\n      return;\n    }\n    if (options.warn) {\n      console.warn(\"[HMR] Update check failed: \" + (err.stack || err.message));\n    }\n  }\n\n  function performReload() {\n    if (reload) {\n      if (options.warn) console.warn(\"[HMR] Reloading page\");\n      window.location.reload();\n    }\n  }\n};\n\n\n//# sourceURL=webpack:///(webpack)-hot-middleware/process-update.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ 2:
/*!********************************************************************************************************************************!*\
  !*** multi webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true ./ClientApp/src/assets/js/custom_styles.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true */\"./node_modules/webpack-hot-middleware/client.js?path=__webpack_hmr&dynamicPublicPath=true\");\nmodule.exports = __webpack_require__(/*! ./ClientApp/src/assets/js/custom_styles.js */\"./ClientApp/src/assets/js/custom_styles.js\");\n\n\n//# sourceURL=webpack:///multi_webpack-hot-middleware/client?");

/***/ })

/******/ });