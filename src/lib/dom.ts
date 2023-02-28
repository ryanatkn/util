export const isEditable = (el: any): boolean => {
	if (!el) return false;
	const {tagName} = el;
	return tagName === 'INPUT'
		? el.type !== 'checkbox' && el.type !== 'radio' && el.type !== 'range'
		: tagName === 'TEXTAREA' || tagName === 'SELECT' || el.contentEditable === 'true';
};

/**
 * Stops an event from bubbling and doing default behavior.
 * @param event
 * @param immediate Defaults to `true` to use `stopImmediatePropagation` over `stopPropagation`.
 * @param preventDefault Defaults to `true`.
 * @returns
 */
export const swallow = <T extends Event>(event: T, immediate = true, preventDefault = true): T => {
	if (preventDefault) event.preventDefault();
	if (immediate) {
		event.stopImmediatePropagation();
	} else {
		event.stopPropagation();
	}
	return event;
};

// TODO improve these types, the motivation was the strictness of Svelte DOM types
export const handleTargetValue =
	(cb: (value: any, event: any) => void, swallowEvent = true) =>
	(e: any): void => {
		if (swallowEvent) swallow(e);
		cb(e.target.value, e);
	};
