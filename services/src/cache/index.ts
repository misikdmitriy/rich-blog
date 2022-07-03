import NodeCache from 'node-cache';

const cache = new NodeCache();

export const getOrSet = <T = unknown>(
	key: string,
	itemFactory: () => T,
	ttl: number = 15 * 60, // 15 mins
): T => {
	const item = cache.get(key);
	if (item !== undefined) {
		return item as T;
	}

	const cacheItem = itemFactory();
	cache.set(key, cacheItem, ttl);
	return cacheItem;
};

export const getOrSetAsync = async <T = unknown>(
	key: string,
	itemFactory: () => Promise<T>,
	ttl: number = 15 * 60, // 15 mins
): Promise<T> => {
	const item = cache.get(key);
	if (item !== undefined) {
		return item as T;
	}

	const cacheItem = await itemFactory();
	cache.set(key, cacheItem, ttl);
	return cacheItem;
};
