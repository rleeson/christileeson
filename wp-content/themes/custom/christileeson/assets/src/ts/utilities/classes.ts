type ClassMap = {
    [index: string]: string;
}

/**
 * DOM Class Collection 
 * - Coordinates management of classes which are not yet bound to a DOM element
 */
export default class Classes {
    protected classList: string[] = [];

    /**
     * Adds a single class name to the current list, avoids duplicates
     * 
     * @param className - Single class to add
     * @returns The revised Classes entity, chainable
     */
    add(className: string): Classes {
        '' !== className && !this.classList.includes(className) ? this.classList.push(className) : null;

        return this;
    }

    /**
     * Adds a group of class names to the current list, avoids duplicates
     * 
     * @param classes - Set of classes to add
     * @returns The revised Classes entity, chainable
     */
    addMany(classes: string[]): Classes {
        classes.forEach((className: string) => this.add(className));

        return this;
    }

    /**
     * Removes a single class from the listing
     * 
     * @param className - Single class to remove
     * @returns The revised Classes entity, chainable
     */
    remove(className: string): Classes {
        return this.removeMany([className]);
    }

    /**
     * Removes a set of class names from the listing
     * 
     * @param classes - Set of classes to remove
     * @returns The revised Classes entity, chainable
     */
    removeMany(classes: string[]): Classes {
        const classMap: ClassMap = {};
        classes.forEach((className: string) => {
            classMap[className] = '';
        });

        this.classList = this.classList.filter((indexClass: string) => {
            return 'undefined' !== typeof classMap[indexClass];
        });

        return this;
    }

    /**
     * Join all of the class names together separated by the provided listSeparator
     * 
     * @param listSeparator String to insert between each class in the list
     * @returns Joined string of class names
     */
    toString(listSeparator = ' '): string {
        return this.classList.join(listSeparator);
    }

    /**
     * Factory method to build the classes instance from a single class
     * 
     * @param className - Single class to add
     * @returns The revised Classes entity, chainable
     */
    static from(className: string) {
        return new Classes().add(className);
    }

    /**
     * Factory method to build the classes instance from a single class
     * 
     * @param classes - Set of class names to add
     * @returns The revised Classes entity, chainable
     */
    static fromMany(classes: string[]) {
        return new Classes().addMany(classes);
    }
}