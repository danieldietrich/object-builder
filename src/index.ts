/**
 * A generic builder that works for *ALL* object types.
 *
 * @typeparam T type type of the object that will be built
 * @param options an object containing default values, at least for required properties of T
 * @returns a new object of type T
 */
function builder<T>(options: builder.Options<T>): builder.Builder<T> {
    return {
        with: _with,
        build: () => ({...options.defaultValues})
    };
    function _with(t1: Partial<T>): builder.Builder<T> {
        return {
            with: t2 => _with({...t1, ...t2}),
            build: () => ({...options.defaultValues, ...t1})
        };
    }
}

namespace builder {

    export type Options<T> = {
        defaultValues: T
    }

    export type Builder<T> = {
        with: (t: Partial<T>) => Builder<T>,
        build: () => T
    }

}

export = builder;
