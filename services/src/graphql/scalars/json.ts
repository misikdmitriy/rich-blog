import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

const JSONScalar = new GraphQLScalarType({
	name: 'JSON',
	description: 'Should be a valid JSON.',
	serialize(value: unknown): string {
		if (typeof value === 'string') {
			// just to check it can be done
			JSON.parse(value);
			return value;
		}

		if (typeof value === 'object' && value !== null) {
			return JSON.stringify(value);
		}

		throw new TypeError('Cannot serialize JSON from non-string/non-object');
	},
	parseValue(value: unknown) {
		if (typeof value !== 'string') {
			throw new TypeError('JSON cannot be parsed from non-string');
		}

		return JSON.parse(value);
	},
	parseLiteral(ast: ValueNode) {
		if (ast.kind !== Kind.STRING) {
			throw new TypeError(`JSON cannot represent non string type ${ast.kind}`);
		}

		return JSON.parse(ast.value);
	},
});

export default JSONScalar;
