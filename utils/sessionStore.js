const sessionMap = new Map();

function getContext(userId) {
	return sessionMap.get(userId) || [];
}

function appendContext(userId, messagePair) {
	const history = getContext(userId);
	history.push(messagePair);
	sessionMap.set(userId, history.slice(-5)); // keep last 5 pairs
}

function resetContext(userId) {
	sessionMap.set(userId, []);
}

export default { getContext, appendContext, resetContext };
