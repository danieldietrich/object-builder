[![npm version](https://img.shields.io/npm/v/@danieldietrich/object-builder?logo=npm&style=flat-square)](https://www.npmjs.com/package/@danieldietrich/object-builder/)[![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@danieldietrich/object-builder?style=flat-square)](https://snyk.io/test/npm/@danieldietrich/object-builder)[![minzipped size](https://img.shields.io/bundlephobia/minzip/@danieldietrich/object-builder?style=flat-square)](https://bundlephobia.com/result?p=@danieldietrich/object-builder@latest)
&nbsp;
[![build](https://img.shields.io/travis/danieldietrich/object-builder?logo=github&style=flat-square)](https://travis-ci.org/danieldietrich/object-builder/)[![coverage](https://img.shields.io/codecov/c/github/danieldietrich/object-builder?style=flat-square)](https://codecov.io/gh/danieldietrich/object-builder/)
&nbsp;
![Platform](https://img.shields.io/badge/platform-Node%20v10%20+%20Browser%20%28ES6%2fES2015%29-decc47?logo=TypeScript&style=flat-square)
&nbsp;
[![Sponsor](https://img.shields.io/badge/GitHub-💖Sponsors-b5b7b9?logo=github&style=flat-square)](https://github.com/sponsors/danieldietrich)[![donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/danieldietrich13)[![license](https://img.shields.io/github/license/danieldietrich/object-builder?style=flat-square)](https://opensource.org/licenses/MIT/)
&nbsp;
[![Follow](https://img.shields.io/twitter/follow/danieldietrich?label=Follow&style=social)](https://twitter.com/danieldietrich/)

# object-builder

A generic functional object builder for TypeScript.

Builders guide the user through the construction process of possibly complex object types. Take advantage of TypeScript's type system and model your domain wisely!

Please consider to directly use an object literal {} instead, if possible. Keep it simple!

Features:

* one generic builder that covers all existing object types
* dynamically build deep object structures
* provide default attributes
* set multiple attributes at once
* set attributes in arbitrary order

## Installation

```bash
npm i @danieldietrich/object-builder
```

## Usage

The module supports ES6 _import_ and CommonJS _require_ style.

### Basic example

```ts
import builder from '@danieldietrich/object-builder';

type Person = {
    forename: string
    surname: string
}

const personBuilder = builder<Person>({ defaultValues: { forename: "Daniel", surname: "" }});

const daniel = personBuilder.with({ surname: "Dietrich" }).build();
```

Result:

```ts
{
    forename: 'Daniel',  // default value of person builder
    surname: 'Dietrich'  // manually set
}
```

### Example with nested objects

```ts
import builder from '@danieldietrich/object-builder';

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

// inferred type: Person
const daniel = personBuilder
    .with({ forename: 'Daniel', surname: 'Dietrich' })
    .with({ phone: 123 })
    .with({ address: [
        addressBuilder.with({ street: 'Milkyway', country: 'foo' }).build(),
        addressBuilder.with({ street: 'Elmstreet', country: 'bar' }).build()
    ]})
    .build();
```

Result:

```ts
{
    forename: 'Daniel',
    surname: 'Dietrich',
    phone: 123,
    address: [
        { street: 'Milkyway', country: 'foo' },
        { street: 'Elmstreet', country: 'bar' }
    ]
}
```

## Options

| Option | Description |
| -- | -- |
| <tt>defaultValues</tt> | An object containing default values, at least for all required properties |

---

Copyright &copy; 2020 by [Daniel Dietrich](cafebab3@gmail.com). Released under the [MIT](https://opensource.org/licenses/MIT/) license.