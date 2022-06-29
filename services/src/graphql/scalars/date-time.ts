import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

const DateTimeScalar = new GraphQLScalarType<Date, string>({
	name: 'DateTime',
	description: 'A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the \'date-time\' format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.',
	serialize(value: unknown): string {
		if (!(value instanceof Date)) {
			throw new TypeError('DateTime cannot represent non-date type');
		}

		return value.toISOString();
	},
	parseValue(value: unknown): Date {
		if (typeof value !== 'string') {
			throw new TypeError('DateTime cannot be parsed from non-string');
		}

		return new Date(value);
	},
	parseLiteral(ast: ValueNode): Date {
		if (ast.kind !== Kind.STRING) {
			throw new TypeError(`DateTime cannot represent non string type ${ast.kind}`);
		}

		return new Date(ast.value);
	},
});

export default DateTimeScalar;
