import { strict as assert } from 'assert';

/** 要組合的對象 */
export interface Item {
	/** 種類，不得重複 */
	type: string;
	/** 數量，需為正整數 */
	amount: number;
}

/**
 * 列出所有組合
 * @param items 要撿的東西
 * @param pick 要挑幾個
 */
function combination<T extends Item = Item>(items: Array<T>, pick: number): Array<Array<T>> {
	// 問題等同於以下方程式求解
	// k1 + k2 + k3 + ... + ki = p
	// 其中k1, k2, ..., ki 分別對應到m種類型m1, m2, ..., mi的可能數解

	const answers: Array<Array<T>> = [];
	const temp: Array<number> = [];

	dfs<T>(items, pick, 0, temp, answers);

	// console.log('answers: ', JSON.stringify(answers, null, 2));
	return answers;
}

function dfs<T extends Item = Item>(items: Array<T>, pick: number, index: number, temp: Array<number>, answers: Array<Array<T>>): void {

	const max = items[index].amount;

	for (let i = 0; i <= max; i++) {
		temp.push(i);

		// If reached to the end, check if the answer is correct
		if (index === items.length - 1) {
			const sum = temp.reduce((prev, curr) => {
				return prev + curr;
			}, 0);
			if (sum == pick) {
				// Push the answer.
				answers.push(temp.map<T>((k, i) => {
					return {
						type: items[i].type,
						amount: k
					} as T;
				}));
			}
		} else {
			// If not, going down one level
			dfs(items, pick, index + 1, temp, answers);
		}

		temp.pop();
	}

}

let result = combination([
	{ type: 'Apple', amount: 2 },
	{ type: 'Banana', amount: 3 },
	{ type: 'Cat', amount: 2 },
	{ type: 'Dog', amount: 4 },
	{ type: 'Egg', amount: 1 },
], 12);
assert(result.length === 1);

result = combination([
	{ type: 'Apple', amount: 2 },
	{ type: 'Banana', amount: 3 },
	{ type: 'Cat', amount: 2 },
	{ type: 'Dog', amount: 4 },
	{ type: 'Egg', amount: 1 },
], 7);
result.forEach(ans => {
	const sum = ans.reduce((prev, curr) => {
		return prev + curr.amount;
	}, 0);
	assert(sum === 7);
});

result = combination([
	{ type: 'Apple', amount: 2 },
	{ type: 'Banana', amount: 3 },
	{ type: 'Cat', amount: 2 },
	{ type: 'Dog', amount: 4 },
	{ type: 'Egg', amount: 1 },
], 13);
assert(result.length === 0);

result = combination([
	{ type: 'Apple', amount: 1 },
	{ type: 'Banana', amount: 2 },
	{ type: 'Cat', amount: 3 },
], 2);
/** A1B1 A1C1 B1C1 B2 C2 */
assert(result.length === 5);
