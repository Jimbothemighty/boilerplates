// export default class edApp {
//     static rootElement = null;
//     static #components = {}
//     static #state = {}
//     static #pushManagerInstance = undefined
//     static #globalIncrement = 0
//     static getNewIncrement = () => this.#globalIncrement++

//     setApplicationRoot(rootElement) {
//         this.rootElement = rootElement;
//     }

//     static getApplicationRoot() {
//         return this.rootElement;
//     }

//     static swapModuleInstances(newModule) {
//         console.log(newModule);
//         for (const key in this.#components) {
//             if (Object.hasOwnProperty.call(this.#components, key)) {
//                 const component = this.#components[key]
//                 console.log(component)
//             }
//         }
//     }

//     static pushManager() {
//         if (typeof this.#pushManagerInstance == "undefined") {
//             this.#pushManagerInstance = new edAppPushManager()
//         }

//         return this.#pushManagerInstance
//     }

//     static getComponent(chosenClass, props, domLocation) {
//         let hash = (chosenClass.toString() + JSON.stringify(props) + domLocation).hashValue();
//         let element = this.#components[hash]
//         return element ? element : false
//     }

//     static registerComponent(chosenClass, props, domLocation) {
//         let hash = (chosenClass.toString() + JSON.stringify(props) + domLocation).hashValue();
//         this.#components[hash] = new chosenClass(props)
//         return this.#components[hash]
//     }

//     static getState(key) {
//         return this.#state[key]
//     }

//     static setState(key, value) {
//         this.#state[key] = value
//         this.pushManager().propagate(key)
//     }
// }

// class edAppPushManager {
//     constructor() {
//         this.listeningObjects = {}
//     }

//     async propagate(actionTriggers = []) {
//         if (typeof actionTriggers == "string") {
//             actionTriggers = [actionTriggers]
//         }

//         for (const [key, element] of Object.entries(this.listeningObjects)) {
//             for (const actionTrigger of element.actions) {
//                 if (actionTriggers.includes(actionTrigger)) {
//                     if (typeof element.callback == "function") {
//                         await element.callback(actionTrigger)
//                     }
//                     else {
//                         delete this.listeningObjects[element.key]
//                     }
//                 }
//             }
//         }
//     }

//     register(element) {
//         var instance = this

//         function generateUniqueKey() {
//             function makeid(length) {
//                 var result           = ''
//                 var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//                 var charactersLength = characters.length
//                 for ( var i = 0; i < length; i++ ) {
//                     result += characters.charAt(Math.floor(Math.random() * charactersLength))
//                 }
//                 return result
//             }

//             var unique_key

//             do {
//                 unique_key = makeid(16)
//             } while (instance.listeningObjects.hasOwnProperty(unique_key))

//             return unique_key
//         }

//         var unique_key = generateUniqueKey()

//         element["key"] = unique_key
//         instance.listeningObjects[unique_key] = element

//         return unique_key
//     }
// }

// (function() {
//     if (import.meta.hot) {
//         import.meta.hot.accept(function(newModule) {
//             getEdApp().swapModuleInstances(newModule);
//         });
//     }
// })
