// Publisher/Subscriber Component
const PubSub = (function () {
    const events = {
        // e.g., event1: [fnForEvent1, fnForEvent2, etc.]
    };
    const subscribe = ({ eventName, callbackFn }) => {
        // Create new array to store functions if does not exist
        if (!events[eventName]) {
            events[eventName] = [];
        }
        // Subscribe to event
        events[eventName].push(callbackFn);
    }
    const publish = ({ eventName, data = null }) => {
        // Notify that the event has occurred
        if (events[eventName]) {
            events[eventName].forEach(callbackFn => {
                // Perform given action for specific subscriber
                callbackFn(data);
            });
        }
    }
    const unsubscribe = ({ eventName, callbackFn }) => {
        // Remove callback function from being called by specific event
        if (events[eventName]) {
            events[eventName] = events[eventName].filter(fn => {
                fn !== callbackFn;
            });
        }
    }
    return { subscribe, publish, unsubscribe };
})();

export { PubSub }

