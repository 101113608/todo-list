class Valid {
    static setterValue({ variableName, currentValue, newValue }) {
        let valid = false;

        if (!newValue) {
            console.warn(`'${variableName}' was not updated: provided value is null/empty.`);
            return valid;
        }

        if (currentValue === newValue) {
            console.warn(`'${variableName}' was not updated: provided value is the same as the current value.`);
            return valid;
        }

        valid = true;
        return valid;
    }

    static indexValue(index) {
        if (index !== -1 && index !== null && index !== undefined && typeof index === "number") {
            return true;
        }

        return false;
    }

    static objectValue(object) {
        if (object !== null && object !== undefined && typeof object === "object") {
            return true;
        }

        return false;
    }
}

class Extract {
    static formValues(form) {
        const formData = new FormData(form);
        const object = {}

        for (let [key, value] of formData.entries()) {
            object[key] = value;
        }

        return object;
    }
}

function capitaliseString(string) {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export { Valid, Extract, capitaliseString };