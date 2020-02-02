import builder from '.';

describe('Object builder', () => {

    test('Should build empty object', () => {
        expect(builder({ defaultValues: {}}).build()).toEqual({});
    });

    test('Should apply default values', () => {

        type Person = {
            forename: string
            surname: string
        }

        const personBuilder = builder<Person>({ defaultValues: { forename: "Daniel", surname: "" }});

        const daniel = personBuilder.with({ surname: "Dietrich" }).build();

        expect(daniel).toEqual({ forename: 'Daniel', surname: 'Dietrich' });
    });

    test('Should build cascaded object', () => {

        type Person = {
            forename: string
            surname: string
            phone?: number
            address?: Address[]
        }

        type Address = {
            street?: string
            zip?: number
            city?: string
            country?: 'foo' | 'bar' | 'baz'
        }

        const personBuilder = builder<Person>({ defaultValues: { forename: "(unknown)", surname: "(unknown)" }});
        const addressBuilder = builder<Address>({ defaultValues: {}});

        const daniel = personBuilder
            .with({ forename: 'Daniel', surname: 'Dietrich' }) // setting multiple attributes at once
            .with({ phone: 123 })
            .with({ address: [
                addressBuilder.with({ street: 'Milkyway', country: 'foo' }).build(), // setting only some optional attributes
                addressBuilder.with({ street: 'Elmstreet', country: 'bar' }).build()
            ]})
            .build();

        expect(daniel).toEqual({
            forename: 'Daniel',
            surname: 'Dietrich',
            phone: 123,
            address: [
                { street: 'Milkyway', country: 'foo' },
                { street: 'Elmstreet', country: 'bar' }
            ]
        });
    });

});
